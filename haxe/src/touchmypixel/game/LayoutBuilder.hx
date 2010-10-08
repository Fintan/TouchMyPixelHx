/*
 * JSFL Layout Builder - Tony Polinelli
 * Parses layout xml files & creates (in this case) box2d simulations
 * 
 * */

package touchmypixel.game;
import box2D.collision.shapes.B2Shape;
import box2D.collision.shapes.B2ShapeDef;
import box2D.dynamics.B2BodyDef;
import box2D.dynamics.B2World;
import flash.display.DisplayObject;
import flash.display.DisplayObjectContainer;
import flash.display.Sprite;
import touchmypixel.game.box2d.ShapeTools;
import haxe.xml.Fast;
import touchmypixel.game.objects.Box2dObject;
import touchmypixel.game.objects.BuilderBodyObject;
import touchmypixel.game.objects.BuilderGameObject;
import touchmypixel.game.objects.LBGeometry;
import touchmypixel.game.objects.Object;
import touchmypixel.game.simulations.Box2dSimulation;
import touchmypixel.game.utils.Loader;

typedef LayoutInfo = 
{
	var width : Float;
	var height : Float;
}

class LayoutBuilder
{
	public var xml:Xml;
	public var fast:Fast;
	public var layouts:Hash<Fast>;
	public var simulation:Box2dSimulation;
	
	public function new(xml:String) 
	{
		this.xml = Xml.parse(xml);
		fast = new Fast(this.xml);
		
		
		
		layouts = new Hash();
		for (n in fast.nodes.layout)
			layouts.set(n.att.name, n);
	}
	
	public function getLayoutInfo(name:String) : LayoutInfo
	{
		if ( !layouts.exists(name) )
			return null;
		
		var lo = layouts.get(name);
		return { width:Std.parseFloat(lo.att.w)/Std.parseFloat(lo.att.sx), height:Std.parseFloat(lo.att.h)/Std.parseFloat(lo.att.sy) };
		//return { width:Std.parseFloat(lo.att.w), height:Std.parseFloat(lo.att.h)/Std.parseFloat(lo.att.sy) };
	}
	
	public function buildLayout(layout:Fast, simulation:Box2dSimulation)
	{
		this.simulation = simulation;
		
		if (layout == null)
			throw "Layout does not exist";
			
		for (child in layout.x.elements())
		{
			switch(child.nodeName)
			{
				case "body": createBody(new Fast(child));
				case "object": createObject(new Fast(child));
				case "gameObject": createGameObject(new Fast(child));
				case "bitmap": createBitmap(new Fast(child), cast simulation);
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
		
		if (objectInfo.att.name != "")
			simulation.namedObjects.set(objectInfo.att.name, object);
		
		simulation.objects.push(object);
		simulation.addChild(object);
		
		for (child in objectInfo.x.elements())
		{
			switch(child.nodeName)
			{
				case "body": createBody(new Fast(child), object);
				case "bitmap": createBitmap(new Fast(child), object);
			}
		}
	}
	
	private function createBitmap(objectInfo:Fast, ?addToScope:DisplayObjectContainer)
	{
		var bmp = Loader.loadBitmap(objectInfo.att.file);
		bmp.smoothing = true;
		bmp.x = f(objectInfo.att.x);
		bmp.y = f(objectInfo.att.y);
		bmp.scaleX = f(objectInfo.att.sx);
		bmp.scaleY = f(objectInfo.att.sy);
		bmp.rotation = f(objectInfo.att.r);
		
		if (addToScope != null)
			addToScope.addChild(bmp);
			
		//trace("addbitmap: " + bmp);
		simulation.bitmaps.push(bmp);
	}
	
	private function createObject(objectInfo:Fast)
	{
		var n = objectInfo.att.resolve("definition");
		var c = Type.resolveClass(n);
		
		if (c == null)
			throw "Class: " + n + " cannot be built, as it doesnt exist";
		
		var object:Object = Type.createInstance(c, []);
		//var object:DisplayObject = Type.createInstance(c, []);
		object.x = f(objectInfo.att.x);
		object.y = f(objectInfo.att.y);
		object.scaleX = f(objectInfo.att.sx);
		object.scaleY = f(objectInfo.att.sy);
		object.rotation = f(objectInfo.att.r);
		simulation.addChild(object);
		
		simulation.objects.push(object);
	}
	
	private function createBody(bodyInfo:Fast, ?gameObject:BuilderGameObject)
	{ 
		var clazzName = bodyInfo.att.resolve("definition");
		var body : BuilderBodyObject = null;
		if ( clazzName != "" )
		{
			var clazz = Type.resolveClass(clazzName);
			
			if (clazz == null)
				throw "Body Class: " + clazzName + " cannot be built, as it doesnt exist";
				
			body = Type.createInstance(clazz, [simulation]);
		}
		else
		{
			body = new BuilderBodyObject(simulation);
		}
		
		body.info = bodyInfo;
		body.gameObject = gameObject;
		body.type = bodyInfo.att.type;
		body.scaleX = f(bodyInfo.att.sx);
		body.scaleY = f(bodyInfo.att.sy);
		
		if (bodyInfo.att.name != "")
			simulation.namedObjects.set(bodyInfo.att.name, body);
		
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
		b2body.SetUserData(body);
		/*
		 * Build shapes that are inside the body
		 */
		for (elementInfo in bodyInfo.x.elements())
		{	
			var fastEl = new Fast(elementInfo);
			var shapes:Array<B2ShapeDef> = switch(elementInfo.nodeName)
			{
				case "poly": [parsePoly(fastEl, bodyInfo)];
				case "circle": [parseCircle(fastEl, bodyInfo)];
				case "rect": [parsePoly(fastEl, bodyInfo)];
				case "shape": parseShape(fastEl, bodyInfo);
				case "bitmap": null;
			}
			
			if ( shapes != null )
			{
				var geom = new LBGeometry();
				geom.body = body;
				geom.shapes = new Array<B2Shape>();
				
				if ( fastEl.has.name )
				{
					geom.name = fastEl.att.name;				
					body.namedGeometry.set(geom.name, geom);
				}
				
				geom.cacheContacts = fastEl.has.cacheContacts && (fastEl.att.cacheContacts == "true");
				
				for ( shape in shapes )
				{
					if (shape != null)
					{
						if (bodyInfo.has.categoryBits)
							shape.filter.categoryBits = Std.parseInt(bodyInfo.att.categoryBits);
						if (bodyInfo.has.maskBits)
							shape.filter.maskBits = Std.parseInt(bodyInfo.att.maskBits);
						if (bodyInfo.has.groupIndex)
							shape.filter.groupIndex = Std.parseInt(bodyInfo.att.groupIndex);
						if(bodyInfo.x.exists("sensor"))
							shape.isSensor = bodyInfo.att.sensor == "true";
						var s = b2body.CreateShape(shape);
						s.m_userData = geom;
						geom.shapes.push(s);
					}
				}
				
				body.geometry.push(geom);
			}
				
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
			
			//body.
			
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
	
	
	private function parsePoly(el:Fast, bodyInfo:Fast, ?shapeInfo:Fast=null):B2ShapeDef
	{
		var verts = [];
		for (vert in el.nodes.vert)
		{
			verts.push([f(vert.att.x), 
						f(vert.att.y)]);
		}
		var shape = null;
		if ( shapeInfo == null )
		{
			shape = ShapeTools.polygon(	simulation.scale, 
										verts, 	
										f(el.att.x) * f(bodyInfo.att.sx), 
										f(el.att.y) * f(bodyInfo.att.sy), 
										f(el.att.r), 
										f(el.att.sx) * f(bodyInfo.att.sx),
										f(el.att.sy) * f(bodyInfo.att.sy)
										);
		}
		else
		{
			shape = ShapeTools.polygon(	simulation.scale, 
										verts, 	
										(f(el.att.x) + f(shapeInfo.att.x)) * f(bodyInfo.att.sx) * f(shapeInfo.att.sx), 
										(f(el.att.y) + f(shapeInfo.att.y)) * f(bodyInfo.att.sy) * f(shapeInfo.att.sy), 
										f(el.att.r), 
										f(el.att.sx) * f(bodyInfo.att.sx) * f(shapeInfo.att.sx),
										f(el.att.sy) * f(bodyInfo.att.sy) * f(shapeInfo.att.sy)
										);
		}
										
		var isStatic = bodyInfo.att.resolve("static") == "true"; 
		shape.density = isStatic ? 0 : f(bodyInfo.att.density);
		shape.restitution = f(bodyInfo.att.restitution);
		shape.friction = f(bodyInfo.att.friction);
		return shape;
	}
	
	private function parseCircle(el:Fast, bodyInfo:Fast, ?shapeInfo:Fast=null):B2ShapeDef
	{
		var shape = null;
		if ( shapeInfo == null ) 
		{
			shape = ShapeTools.circle(	simulation.scale, 	
										f(el.att.x) * f(bodyInfo.att.sx), 
										f(el.att.y) * f(bodyInfo.att.sy),
										f(el.att.w)/2,
										f(bodyInfo.att.sx),
										f(bodyInfo.att.sy)
										);
		}
		else
		{
			shape = ShapeTools.circle(	simulation.scale, 
										(f(el.att.x) + f(shapeInfo.att.x)) * f(bodyInfo.att.sx) * f(shapeInfo.att.sx), 
										(f(el.att.y) + f(shapeInfo.att.y)) * f(bodyInfo.att.sy) * f(shapeInfo.att.sy), 
										f(el.att.w)/2, 
										f(bodyInfo.att.sx) * f(shapeInfo.att.sx),
										f(bodyInfo.att.sy) * f(shapeInfo.att.sy)
										);
		}
		
		var isStatic = bodyInfo.att.resolve("static") == "true"; 
		shape.density = isStatic ? 0 : f(bodyInfo.att.density);
		shape.restitution = f(bodyInfo.att.restitution);
		shape.friction = f(bodyInfo.att.friction);
		return shape;
	}
	
	private function parseShape(shapeInfo:Fast, bodyInfo:Fast):Array<B2ShapeDef>
	{
		// implement
		//trace("parseShape bitches");
		var shapes = new Array<B2ShapeDef>();
		for (childInfo in shapeInfo.x.elements())
		{
			var shape:B2ShapeDef = switch(childInfo.nodeName)
			{
				case "poly": parsePoly(new Fast(childInfo), bodyInfo, shapeInfo);
				case "circle": parseCircle(new Fast(childInfo), bodyInfo, shapeInfo);
				case "rect": parsePoly(new Fast(childInfo), bodyInfo, shapeInfo);
			}
			
			if (shape != null)
			{
				//shape.userData = { name232:"Yo Mamma!" };
				if ( shapeInfo.att.name != "" )
				{
					//trace("SHAPE DATA!@!" + shapeInfo.x);
					//trace("bodyInfo: " + bodyInfo.x);
				}
				shape.isSensor = (shapeInfo.att.isSensor == "true");
				shapes.push(shape);
			}
		}
		
		return shapes;
	}
	
	public inline function f(v:String)
	{
		return Std.parseFloat(v);
	}
	
}