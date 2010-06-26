/**
* ...
* @author Tony Polinelli
* @version 0.1
*/

package peepee;

import flash.display.MovieClip;
import flash.geom.Point;
import peepee.utils.MemoryTracker;

class MemberBase extends MovieClip  
{
	public var updated:Bool;
	public var levelBase:LevelBase;
	public var initialized:Bool;
	
	public var e_aabb:MovieClip;
	
	public var dampX:Float;
	public var dampY:Float;
	public var dampR:Float;
	
	public var maxVx:Float;
	public var maxVy:Float;
	public var vx:Float;
	public var vy:Float;
	public var vr:Float;
	
	public function new() 
	{
		super();
		
		updated = false;
		
		vx = vy = vr = 0;
		maxVx = maxVy = 999999;
		dampX = dampY = dampR = .1;
	}
	
	public function init(level:LevelBase)
	{
		initialized = true;
		levelBase = level;
	}
	
	public function update(dt:Float):Void
	{
		applyForces(dt);
		applyRestrictions(dt);
	}
	
	public function applyRestrictions(dt:Float)
	{
		if (rotation > 180) rotation = -180;
		if (rotation < -180) rotation = 180;
		
		if (vx > maxVx) vx = maxVx;
		if (vy > maxVy) vy = maxVy;
		if (vx < -maxVx) vx = -maxVx;
		if (vy < -maxVy) vy = -maxVy;
	}
	
	public function applyForces(dt:Float)
	{
		var damp = .9;
		
		vx -= vx * dampX * dt;
		vy -= vy * dampY * dt;
		vr -= vr * dampR * dt;
		
		x += vx * dt;
		y += vy * dt;
		rotation += vr * dt;
	}
	
	public function destroy():Void
	{
		stop();
		
		if (levelBase != null) 
			levelBase.removeMember(this);
	}
}

