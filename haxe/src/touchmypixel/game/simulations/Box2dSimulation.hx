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
import flash.display.Bitmap;
import touchmypixel.game.box2d.ContactManager;
import touchmypixel.game.LevelBase;
import flash.display.DisplayObject;
import flash.display.Sprite;
import touchmypixel.game.objects.Object;

class Box2dSimulation extends Sprite
{
	public var world:B2World;
	
	public var scale:Float;
	public var iterations:Int;
	
	public var initAABB:B2AABB;
	public var initGravity:B2Vec2;
	public var initDoSleep:Bool;
	
	private var dbgDraw:B2DebugDraw;
	public var debugDrawScope:Sprite;
	
	public var running:Bool;
	public var debug:Bool;
	
	public var contactManager:ContactManager;

	public var objects:Array<Object>;
	public var namedObjects:Hash<Object>;
	public var bitmaps:Array<Bitmap>;
	
	public var autoUpdateObjects:Bool;
	
	public var mousePos:B2Vec2;
	
	public function new(?debug:Bool=true) 
	{
		super();
		
		this.debug = debug;
		
		running = true;
		
		autoUpdateObjects = false;
		
		scale = 30.;
		iterations = 10;
		
		initAABB = new B2AABB();
		initAABB.lowerBound.Set(-1000 / scale, -1000 / scale);
		initAABB.upperBound.Set(1000/ scale, 1000 / scale);
		
		initGravity = new B2Vec2(0, 200/scale);
		
		initDoSleep = true;
		
		debugDrawScope = this;	
		
		objects = [];
		namedObjects = new Hash();
		bitmaps = [];
		
		mousePos = new B2Vec2();
	}
	
	public function init()
	{
		world = new B2World(initAABB, initGravity, initDoSleep);
		
		contactManager = new ContactManager();
		//world.SetContactListener(contactManager);
		
		dbgDraw = new B2DebugDraw();
		dbgDraw.m_sprite = debugDrawScope;
		dbgDraw.m_fillAlpha = .3;
		dbgDraw.m_lineThickness = 1;
		dbgDraw.m_xformScale = 1;
		dbgDraw.m_drawScale = scale;
		dbgDraw.m_drawFlags = B2DebugDraw.e_shapeBit | B2DebugDraw.e_jointBit  | B2DebugDraw.e_centerOfMassBit;
		if (debug)
			world.SetDebugDraw(dbgDraw);
	}
	
	public function drawAABB( aabb : B2AABB, ?color : Int = 0xff0000 ) : Void
	{
		if ( debug )
		{
			debugDrawScope.graphics.lineStyle(2, color );
			debugDrawScope.graphics.drawRect(aabb.lowerBound.x * scale, aabb.lowerBound.y * scale, (aabb.upperBound.x - aabb.lowerBound.x) * scale, (aabb.upperBound.y - aabb.lowerBound.y) * scale);
		}
	}
	
	public function update(dt:Float)
	{
		if (running) 
		{	
			//contactManager.clear();
		
			world.Step(1/50, iterations);
			
			if(autoUpdateObjects)
				for (o in objects)
					o.update(dt);
		}
	}
	
	public function sync(gfx:DisplayObject, body:B2Body, ?bodyOffset:{ x:Float, y:Float, rotation:Float })
	{
		var position:B2Vec2 = body.GetPosition();
		gfx.x = position.x * scale;            
		gfx.y = position.y * scale;
		gfx.rotation = body.GetXForm().R.GetAngle() * 180 / Math.PI;
		
		if (bodyOffset != null)
		{
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
		
		contactManager.clear();
	}
	
	public function getBodyAtMouse( ?includeStatic : Bool = false) : B2Body 
	{
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