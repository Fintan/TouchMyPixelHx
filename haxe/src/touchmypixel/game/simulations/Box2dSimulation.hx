/**
 * ...
 * @author Tonypee
 */

package com.touchmypixel.game.simulations;

import box2D.collision.B2AABB;
import box2D.common.math.B2Vec2;
import box2D.dynamics.B2DebugDraw;	
import box2D.dynamics.B2World;
import com.touchmypixel.game.box2d.ContactManager;
import com.touchmypixel.game.LevelBase;
import flash.display.DisplayObject;
import flash.display.Sprite;

class Box2dSimulation extends Sprite
{
	public var world:B2World;
	
	public var scale:Float;
	public var iterations:Int;
	
	public var initAABB:B2AABB;
	public var initGravity:B2Vec2;
	public var initDoSleep:Bool;
	
	private var dbgDraw:B2DebugDraw;
	public var debugDrawScope:Box2dSimulation;
	
	public var running:Bool;
	public var debug:Bool;
	
	public var contactManager:ContactManager;
	
	public function new(?debug:Bool=true) 
	{
		super();
		
		this.debug = debug;
		
		running = true;
		
		scale = 30.;
		iterations = 30;
		
		initAABB = new B2AABB();
		initAABB.lowerBound.Set(-1000 / scale, -1000 / scale);
		initAABB.upperBound.Set(1000/ scale, 1000 / scale);
		
		initGravity = new B2Vec2(0, 2000/scale);
		
		initDoSleep = true;
		
		debugDrawScope = this;	
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
	
	public function update(dt:Float)
	{
		contactManager.clear();
		
		if (running) 
			world.Step(dt, 5);
	}
	
	public function stop()
	{
		running = false;
	}
	
	public function start()
	{
		running = true;
	}
	
}