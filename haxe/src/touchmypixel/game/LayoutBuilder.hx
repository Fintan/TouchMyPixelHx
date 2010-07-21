/*
 * JSFL Layout Builder - Tony Polinelli
 * Parses layout xml files & creates (in this case) box2d simulations
 * 
 * */

package touchmypixel.game;
import box2D.collision.shapes.B2ShapeDef;
import box2D.dynamics.B2BodyDef;
import box2D.dynamics.B2World;
import flash.display.Sprite;
import touchmypixel.game.box2d.ShapeTools;
import haxe.xml.Fast;
import touchmypixel.game.objects.Box2dObject;
import touchmypixel.game.objects.BuilderBodyObject;
import touchmypixel.game.objects.BuilderGameObject;
import touchmypixel.game.objects.Object;
import touchmypixel.game.simulations.Box2dSimulation;
import touchmypixel.game.utils.Loader;

class LayoutBuilder
{
	public var xml:Xml;
	public var fast:Fast;
	public var layouts:Hash<Fast>;
	public var simulation:Box2dSimulation;
	
	public var objects:Array<Object>;
	public var gameObjects:Array<BuilderGameObject>;
	
	public function new(xml:String) 
	{
		objects = [];
		gameObjects = [];
		
		this.xml = Xml.parse(xml);
		fast = new Fast(this.xml);
		
		layouts = new Hash();
		for (n in fast.nodes.layout)
			layouts.set(n.att.name, n);
	}
	
	public function buildLayout(layout:Fast, simulation:Box2dSimulation)
	{
		this.simulation = simulation;
		
		if (layout == null)
			throw "Layout does not exist";
			
		parseNode(layout);
	}
	
	/***********/
	
	private function parseNode(node:Fast, ?parentObject:BuilderGameObject)
	{
		for (child in node.x.elements())
		{
			switch(child.nodeName)
			{
				case "body": createBody(new Fast(child), parentObject);
				case "object": createObject(new Fast(child));
				case "gameObject": createGameObject(new Fast(child));
				//case "bitmap": createBitmap(new Fast(child), cast parentObject);
			}
		}
	}
	
	private function createGameObject(objectInfo:Fast)
	{
		var n = objectInfo.att.resolve("definition");
		var c = Type.resolveClass(n);
		
		if (c == null)
			throw "Class: " + n + " cannot be built, as it doesnt exist";
		
		/*
		 * Create the gameObject via instantiating it from its defined 'class'
		 */
		var object:BuilderGameObject = Type.createInstance(c, [simulation]);
		object.info = objectInfo;
		object.x = f(objectInfo.att.x);
		object.y = f(objectInfo.att.y);
		object.scaleX = f(objectInfo.att.sx);
		object.scaleY = f(objectInfo.att.sy);
		object.rotation = f(objectInfo.att.r);
		
		gameObjects.push(object);
		
		
		simulation.objects.push(object);
		simulation.addChild(object);
		
		for (child in objectInfo.x.elements())
		{
			switch(child.nodeName)
			{
				case "body": createBody(new Fast(child), object);
			}
		}
	}
	
	private function createBitmap(objectInfo:Fast, ?bodyObject:BuilderBodyObject)
	{
		var bmp = Loader.loadBitmap(objectInfo.att.file);
		bmp.smoothing = true;
		bmp.x = f(objectInfo.att.x);
		bmp.y = f(objectInfo.att.y);
		bmp.scaleX = f(objectInfo.att.sx);
		bmp.scaleY = f(objectInfo.att.sy);
		bmp.rotation = f(objectInfo.att.r);
		
		if (bodyObject != null)
			bodyObject.addChild(bmp);
	}
	
	private function createObject(objectInfo:Fast)
	{
		//
	}
	
	private function createBody(bodyInfo:Fast, ?gameObject:BuilderGameObject)
	{ 
		var body = new BuilderBodyObject(simulation);
		body.info = bodyInfo;
		body.scaleX = f(bodyInfo.att.sx);
		body.scaleY = f(bodyInfo.att.sy);
			
		var bodyDef = new B2BodyDef();
		if (gameObject != null)
		{
			/*
			 * inside a gameObject bodies have an extra level of transformation
			 */ 
			var r = gameObject.rotation * Math.PI / 180;
			var ox = f(bodyInfo.att.x) * gameObject.scaleX;
			var oy = f(bodyInfo.att.y) * gameObject.scaleY;
			var nx = ox * Math.cos(r) - oy * Math.sin(r);
			var ny = oy * Math.cos(r) + ox * Math.sin(r);
			
			// add parent tranforms to the bodies x,y,r 
			bodyDef.position.x = (nx + gameObject.x) / simulation.scale;
			bodyDef.position.y = (ny + gameObject.y) / simulation.scale;
			bodyDef.angle = r + f(bodyInfo.att.r) * Math.PI / 180;
			
			
		} else {
			
			/*
			 * Basic transformations read directly from xml
			 */
			bodyDef.position.x = f(bodyInfo.att.x) / simulation.scale;
			bodyDef.position.y = f(bodyInfo.att.y) / simulation.scale;
			bodyDef.angle = f(bodyInfo.att.r)*Math.PI/180;		
		}
		bodyDef.isBullet = true;
		
		var b2body = simulation.world.CreateBody(bodyDef);
		
		/*
		 * Build shapes that are inside the body
		 */
		for (elementInfo in bodyInfo.x.elements())
		{
			var shape:B2ShapeDef = switch(elementInfo.nodeName)
			{
				case "poly": parsePoly(new Fast(elementInfo), bodyInfo);
				case "circle": parseCircle(new Fast(elementInfo), bodyInfo);
				case "rect": parsePoly(new Fast(elementInfo), bodyInfo);
				case "shape": parseShape(new Fast(elementInfo), bodyInfo);
				case "bitmap": createBitmap(new Fast(elementInfo),body); null;
			}
			if(shape != null)
				b2body.CreateShape(shape);
				
			switch(elementInfo.nodeName)
			{
				case "bitmap": createBitmap(new Fast(elementInfo), body);
			}
		}
		b2body.SetMassFromShapes();
		
		body.body = b2body;
		
		/*
		 * If we are inside a gameObject setup some extra features
		 */
		
		if (gameObject != null)
		{
			gameObject.bodies.push(body);
			
			if(bodyInfo.att.name != null && bodyInfo.att.name != "")
			{
				
				//  Auto 'sync' the gameObject's transform to a defined body - useful for graphics alignment
				
				if (gameObject.info.att.autoSyncToBody == bodyInfo.att.name)
				{
					var t = { x:f(bodyInfo.att.x), y:f(bodyInfo.att.y), rotation:f(bodyInfo.att.r) };
					
					gameObject.autoSyncToBody = body;
					gameObject.autoSyncTransform = t;
				}
				
				// set the body as a property on the game Object (defined by its 'name');
				 
				
				var fields = Type.getInstanceFields(Type.getClass(gameObject));
				if (Lambda.has(fields, bodyInfo.att.name))
					Reflect.setField(gameObject, bodyInfo.att.name, body);
			} 
		}
		
		simulation.objects.push(body);
		simulation.addChild(body);
	}
	
	
	/***********/
	
	
	private function parsePoly(el:Fast, bodyInfo:Fast):B2ShapeDef
	{
		var verts = [];
		for (vert in el.nodes.vert)
		{
			verts.push([f(vert.att.x), 
						f(vert.att.y)]);
		}
		var shape = ShapeTools.polygon(	simulation.scale, 
										verts, 	
										f(el.att.x) * f(bodyInfo.att.sx), 
										f(el.att.y) * f(bodyInfo.att.sy), 
										f(el.att.r), 
										f(el.att.sx) * f(bodyInfo.att.sx),
										f(el.att.sy) * f(bodyInfo.att.sy)
										);
										
		var isStatic = bodyInfo.att.resolve("static") == "true"; 
		shape.density = isStatic ? 0 : f(bodyInfo.att.density);
		shape.restitution = f(bodyInfo.att.restitution);
		shape.friction = f(bodyInfo.att.friction);
		return shape;
	}
	
	private function parseCircle(el:Fast, bodyInfo:Fast):B2ShapeDef
	{
		var shape = ShapeTools.circle(	simulation.scale, 	
										f(el.att.x) * f(bodyInfo.att.sx), 
										f(el.att.y) * f(bodyInfo.att.sy),
										f(el.att.w)/2,
										f(bodyInfo.att.sx),
										f(bodyInfo.att.sy)
										);
		var isStatic = bodyInfo.att.resolve("static") == "true"; 
		shape.density = isStatic ? 0 : f(bodyInfo.att.density);
		shape.restitution = f(bodyInfo.att.restitution);
		shape.friction = f(bodyInfo.att.friction);
		return shape;
	}
	
	private function parseShape(el:Fast, body:Fast):B2ShapeDef
	{
		// implement
		return null;
	}
	
	public inline function f(v:String)
	{
		return Std.parseFloat(v);
	}
	
}