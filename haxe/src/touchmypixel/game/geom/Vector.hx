/**
 * ...
 * @author Tonypee
 */

package com.touchmypixel.game.geom;

class Vector 
{
	public var x:Float;
	public var y:Float;
	
	public function new(x:Float, y:Float) 
	{
		this.x = x;
		this.y = y;
	}
	
	public inline function multiply(value:Float):Void
	{
		x *= value;
		y *= value;
	}
	
	public inline function divide(value:Float):Void
	{
		x /= value;
		y /= value;
	}
	
	public inline function normalize():Void
	{
		divide(getLenth());
	}
	
	public inline function getLenth():Float
	{
		return Math.sqrt(x*x+y*y);
	}

	public inline function getAngle():Float
	{
		var r = Math.atan2(y, x);
		var d = r * 180 / Math.PI;
		if (d > 360) d -= 360;
		if (d < 0) d += 360;
		return d;
	}
	
	public inline function copy():Vector
	{
		return new Vector(x, y);
	}
	
	/*************************************/

	public static inline function dot(v1:Vector, v2:Vector):Float
	{
		return (v1.x*v2.x) + (v1.y*v2.y);
	}
	
	public static inline function cross(v1:Vector, v2:Vector):Float
	{
		return (v1.x*v2.y) + (v1.y*v2.x);
	}
	
	public static inline function reflect(vector:Vector, normal:Vector):Vector
	{
		var d = dot(vector, normal);
		var nx = vector.x -2 * d * normal.x;
		var ny = vector.y -2 * d * normal.y;
		return new Vector(nx,ny);
	}
	
	public static inline function getLeftNormal(vector:Vector):Vector
	{
		return new Vector( vector.y, -vector.x );
	}
	
	public static inline function getRightNormal(vector:Vector):Vector
	{
		return new Vector( -vector.y, vector.y );
	}
	
	public static inline function getVector(angle:Float, distance:Float):Vector
	{
		var r = angle * (Math.PI / 180);
		return new Vector(
			distance*Math.sin(r),
			-distance*Math.cos(r)
		);
	}
}