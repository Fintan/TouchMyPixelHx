/**
* ...
* @author Tony Polinelli
* @version 0.1
*/

package touchmypixel.game.objects;

import flash.display.MovieClip;
import flash.geom.Point;
//import touchmypixel.utils.MemoryTracker;

class SimpleObject extends Object  
{
	public var updated:Bool;
	public var initialized:Bool;
	
	public var dampX:Float;
	public var dampY:Float;
	public var dampR:Float;
	
	public var minVx:Float;
	public var maxVx:Float;
	public var minVy:Float;
	public var maxVy:Float;
	public var vx:Float;
	public var vy:Float;
	public var vr:Float;
	
	public var autoMove:Bool;
	
	public function new() 
	{
		super();
		
		updated = false;
		
		vx = vy = vr = 0;
		maxVx = maxVy = 999999;
		minVx = minVy = -999999;
		dampX = dampY = dampR = .1;
		 
		autoMove = false;
	}
	
	public inline function applyRestrictions(dt:Float)
	{
		if (rotation > 180) rotation = -180;
		if (rotation < -180) rotation = 180;
		
		if (vx > maxVx) vx = maxVx;
		if (vy > maxVy) vy = maxVy;
		if (vx < minVx) vx = minVx;
		if (vy < minVy) vy = minVy;
	}
	
	public inline function applyForces(dt:Float)
	{
		var damp = .9;
		
		vx -= vx * dampX * dt;
		vy -= vy * dampY * dt;
		vr -= vr * dampR * dt;
		
		x += vx * dt;
		y += vy * dt;
		rotation += vr * dt;
	}
	
	override public function update(dt:Float):Void
	{
		if (autoMove)
		{
			applyForces(dt);
			applyRestrictions(dt);
		}
	}
}

