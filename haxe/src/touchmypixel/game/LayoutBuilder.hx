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
import fboyle.animation.AnimationItem;
import fboyle.animation.AnimationSet;
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

typedef LayoutInfo = {
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
		return { width:Std.parseFloat(lo.att.w), height:Std.parseFloat(lo.att.h) };
	}
	
	public function buildLayout(layout:Fast, simulation:Box2dSimulation)
	{
		this.simulation = simulation;
		
		if (layout == null)
			throw "Layout does not exist";
			
		for (child in layout.x.elements())
		{
			switch(child.nodeName){
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
		object.name = objectInfo.att.name; //added to reference 'Player' displayobject instance for roation when walking on hills
		object.info = objectInfo;
		object.x = f(objectInfo.att.x);
		object.y = f(objectInfo.att.y);
		object.scaleX = f(objectInfo.att.sx);
		object.scaleY = f(objectInfo.att.sy);
		object.rotation = f(objectInfo.att.r);
		//flash.Lib.trace("objectInfo.att.name "+objectInfo.att.name);
		
		if (objectInfo.att.name != "")
			simulation.namedObjects.set(objectInfo.att.name, object);
		
		simulation.objects.push(object);
		simulation.addChild(object);
		
		for (child in objectInfo.x.elements())
		{
			switch(child.nodeName)
			{
				case "body": createBody(new Fast(child), object);
				//case "animations": trace("animations"); //handled in createBody() because it needs a reference to the body object - but could me more efficient?
			}
		}
	}
	
	private function createBitmap(objectInfo:Fast, ?addToScope:DisplayObjectContainer)
	{
		#if flash
			var bmp = Loader.loadBitmap(objectInfo.att.linkage);
		#else
			var bmp = Loader.loadBitmap(objectInfo.att.file);
		#end
		//var bmp = Loader.loadBitmap(objectInfo.att.file);
		bmp.smoothing = true;
		bmp.x = f(objectInfo.att.x);
		bmp.y = f(objectInfo.att.y);
		bmp.scaleX = f(objectInfo.att.sx);
		bmp.scaleY = f(objectInfo.att.sy);
		bmp.rotation = f(objectInfo.att.r);
		
		if (addToScope != null)
			addToScope.addChild(bmp);
			
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
		var body = new BuilderBodyObject(simulation);
		body.name = bodyInfo.att.name;//allows searching for instance names in collision checks
		body.info = bodyInfo;
		body.gameObject = gameObject;
		body.type = bodyInfo.att.type;
		body.scaleX = f(bodyInfo.att.sx);
		body.scaleY = f(bodyInfo.att.sy);
		
		if (bodyInfo.att.name != "")
			simulation.namedObjects.set(bodyInfo.att.name, body);
		
		var bodyDef = new B2BodyDef();
		if (gameObject != null){
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
			//trace("(bodyInfo.att.fixedRotation" +bodyInfo.att.fixedRotation);
			var rot = bodyInfo.att.fixedRotation=="true"?true:false;
			bodyDef.fixedRotation = rot;
			
			//TODO: add spritesheet functionality:
			/*
			//spritesheet-> library symbol name
			//linkage-> library symbol linkage name
			<animationedcharacter spritesheet="herosheet.png" linkage="herosheet">
				<animations>
					//sheetindices-> suffix of library symbol name
					//linkage-> library symbol linkage name
					//id-> library symbol linkage name
					<animation id="walk" linkage="walk" sheetindices="0123"/>
					<animation id="jump" linkage="jump" sheetindices="456"/>
					<animation id="stand" linkage="stand" sheetindices="7"/>
				</animations>
			</animationedcharacter>
			*/
			
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
				
			switch(elementInfo.nodeName){
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
				
				if (gameObject.info.att.autoSyncToBody == bodyInfo.att.name){
				
					var t = { x:f(bodyInfo.att.x), y:f(bodyInfo.att.y), rotation:f(bodyInfo.att.r) };
					
					gameObject.autoSyncToBody = body;
					gameObject.autoSyncTransform = t;
				}
				
				/*
				* NOTE: Fintan addition
				* Now build the Animations that are auto-synced to the gameObject 
				* (couldn't figure out how to nest <animations> node inside <body> node
				* so I'm using an autosync attribute instead (called autoSyncToAnimations) on the <gameObject> node
				*/
				if( gameObject.info.att.autoSyncToAnimations != "none" ){	
					//trace("autoSyncToAnimations: "+ bodyInfo.att.autoSyncToAnimations);
					setupAnimations(gameObject.info.att.autoSyncToAnimations, gameObject.info, body);
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
	
	
	/*
	*Fintan addition
	*
	* Adds animation sets that are associated with a gameobject
	* -will use AnimationController in implementation
	*/
	private function setupAnimations(id:String, gameObject:Fast, ?bod:BuilderBodyObject):Void{
		
		var animationItems:Array<fboyle.animation.AnimationItem> = new Array(); 

		var scaleFactor = 1.0;
		var pos = new flash.geom.Point();
		
		for (child in gameObject.x.elements())
		{
			//trace("child.nodeName "+child.nodeName);
			switch(child.nodeName)
			{
				case "animations": 
				var el = new haxe.xml.Fast(child);
				if( el.has.scalefactor ){
					scaleFactor = Std.parseFloat(el.att.scalefactor);
				 	//scaleFactor = el.att.scalefactor;
				 	//trace( el.att.scalefactor ); // optional attribute (because I defined it halfway through project
				 }
				 if( el.has.posX ){
					pos.x = Std.parseFloat(el.att.posX);
				 	//trace( el.att.posX ); // optional attribute (because I defined it halfway through project
				 }
 				 if( el.has.posY ){
					pos.y = Std.parseFloat(el.att.posY);
				 	//trace( el.att.posY ); // optional attribute (because I defined it halfway through project
				 }

				for( ani in el.nodes.animation ) {
				     //trace("ani.att.id "+ ani.att.id);
				     //use animationCache code and refer to createBitmap() to create animations
				    // trace("ani.att.scalefactor "+ ani.att.scalefactor);
				   // if( ani.has.scalefactor ) trace( ani.att.scalefactor ); // optional attribute
				     animationItems.push(new fboyle.animation.AnimationItem(ani.att.linkage));
					 
					 //TODO: so far I'm only using the linkage ID but I'll also need to record spritesheet info
					 
				}
				
			}
		}
		
		var aniSet = new fboyle.animation.AnimationSet(bod, id, animationItems, scaleFactor, pos);
		bod.animationSet = aniSet;
		
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
		//shape.fixedRotation =  f(bodyInfo.att.fixedRotation); //TODO
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
	
	private function parseShape(shapeInfo:Fast, bodyInfo:Fast):Array<B2ShapeDef>
	{
		// implement
		//trace("parseShape bitches");
		var shapes = new Array<B2ShapeDef>();
		for (childInfo in shapeInfo.x.elements())
		{
			var shape:B2ShapeDef = switch(childInfo.nodeName)
			{
				case "poly": parsePoly(new Fast(childInfo), bodyInfo);
				case "circle": parseCircle(new Fast(childInfo), bodyInfo);
				case "rect": parsePoly(new Fast(childInfo), bodyInfo);
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
