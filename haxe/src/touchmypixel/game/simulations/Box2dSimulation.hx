/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.simulations;

import box2D.collision.B2AABB;
import box2D.collision.shapes.B2Shape;
import box2D.common.math.B2Vec2;
import box2D.dynamics.B2Body;
import box2D.dynamics.B2DebugDraw;	
import box2D.dynamics.B2World;
import touchmypixel.game.box2d.ContactManager;
import touchmypixel.game.objects.Object;

import fboyle.display.DisplayTypeDefs;
import fboyle.layout.LayoutTypeDefs;

class Box2dSimulation {
	
	public var world:B2World;
	
	public var scale:Float;
	public var iterations:Int;
	public var timeStep:Null<Float>;
	
	public var initAABB:B2AABB;
	public var initGravity:B2Vec2;
	public var initDoSleep:Bool;
	
	private var dbgDraw:B2DebugDraw;
	
	public var debugDrawScope:ShapeHx;
	
	public var running:Bool;
	public var debug:Bool;
	
	public var contactManager:ContactManager;

	public var objects:Array<Object>;
	public var namedObjects:Hash<Object>;
	public var bitmaps:Array<BitmapHx>;
	public var emptyObjects:Hash<EmptyVo>;
	public var nonGameObjects:Hash<ContainerHx>; //to accomodate mixing ui elements with the sim level xml
	
	public var autoUpdateObjects:Bool;
	
	public var mousePos:B2Vec2;
	
	#if easeljs
	public var container:easelhx.display.Container;
	var easelStage:easelhx.display.Stage;
	#else
	public var container:flash.display.MovieClip;
	#end
	
	public function new(?debug:Bool=true, ?stage, ?s) {
		
		#if easeljs
		container = cast stage;
		easelStage = s;
		
		#else
		container = stage;
		#end
		
		this.debug = debug;
		
		running = true;
		
		autoUpdateObjects = false;
		
		scale = 30.;
		iterations = 30;
		initAABB = new B2AABB();
		initAABB.lowerBound.Set(-1000 / scale, -1000 / scale);
		initAABB.upperBound.Set(1000/ scale, 1000 / scale);
		initGravity = new B2Vec2(0, 200/scale);
		
		initDoSleep = true;
		
		#if easeljs
		
		var debugShape = new easelhx.display.Shape();
		this.container.addChild(debugShape);
		
		debugDrawScope = cast debugShape;
		#else
		debugDrawScope = cast this.container;	
		#end
		objects = [];
		namedObjects = new Hash();
		bitmaps = [];
		emptyObjects = new Hash();
		nonGameObjects = new Hash();
		
		mousePos = new B2Vec2();
		
		timeStep = 1 / 50;
	
	}
	
	public function init()
	{
		world = new B2World(initAABB, initGravity, initDoSleep);
		
		contactManager = new ContactManager();
		world.SetContactListener(contactManager);
		
		dbgDraw = new B2DebugDraw();
		dbgDraw.m_sprite = cast debugDrawScope;
		dbgDraw.m_fillAlpha = .3;
		dbgDraw.m_lineThickness = 1;
		dbgDraw.m_xformScale = 1;
		dbgDraw.m_drawScale = scale;
		dbgDraw.m_drawFlags = B2DebugDraw.e_shapeBit | B2DebugDraw.e_jointBit  | B2DebugDraw.e_centerOfMassBit;
		if (debug)
			world.SetDebugDraw(dbgDraw);
	}
	
	public function update(dt:Float)
	{
		if (running) 
		{	
			contactManager.clear();
		
			world.Step(timeStep != null ? timeStep : dt, iterations);
			
			if(autoUpdateObjects)
				for (o in objects)
					o.update(dt);
		}
	}
	
	public function sync(gfx:DisplayObjectHx, body:B2Body, ?bodyOffset:{ x:Float, y:Float, rotation:Float })
	{
		var position:B2Vec2 = body.GetPosition();
		var gfx = cast gfx;
		gfx.x = position.x * scale;            
		gfx.y = position.y * scale;
		gfx.rotation = body.GetXForm().R.GetAngle() * 180 / Math.PI;
		
		if (bodyOffset != null){
			var r = body.GetXForm().R.GetAngle()+ bodyOffset.rotation * Math.PI / 180;
			var ox = bodyOffset.x * Math.cos(r) - bodyOffset.y * Math.sin(r);
			var oy = bodyOffset.x * Math.sin(r) + bodyOffset.y * Math.cos(r);
			gfx.x -= ox;
			gfx.y -= oy;
		}
	}
	
	public function stop()
	{
		running = false;
	}
	
	public function start()
	{
		running = true;
	}
	
	public function destroy()
	{
		stop();
		
		if (objects != null)
		{
			for (o in objects)
				o.destroy();
		}
			
		world = null;
		objects = null;
		namedObjects = null;
		bitmaps = null;
		emptyObjects = null;
		nonGameObjects = null;
		
		contactManager.clear();
	}
	
	public function getBodyAtMouse( ?includeStatic : Bool = false) : B2Body 
	{
		#if easeljs
		var mouseX = easelStage.mouseX;
		var mouseY = easelStage.mouseY;
		#else
		var mouseX = container.mouseX;
		var mouseY = container.mouseY;
		#end
		
		var mx = mouseX / scale;
		var my = mouseY / scale;
		mousePos.Set( mx, my );
		
		var aabb = new B2AABB();
		aabb.lowerBound.Set( mx - 0.005, my - 0.005 );
		aabb.upperBound.Set( mx + 0.005, mx + 0.005 );
		var maxCount = 10;
		var shapes = new Array<Dynamic>();
		var count = world.Query( aabb, shapes, maxCount );
		var body = null;
		
		for ( i in 0 ... count ) 
		{
			if ( shapes[i].GetBody().IsStatic() == false || includeStatic ) 
			{
				var tShape = cast( shapes[i], B2Shape );
				var inside = tShape.TestPoint( tShape.GetBody().GetXForm(), mousePos );
				if ( inside ) 
				{
					body = tShape.GetBody();
					break;
				}
			}
		}
		return body;
	}
}