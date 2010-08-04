/**
 * ...
 * @author Matt Benton
 */

package touchmypixel.particles.effectors;

import touchmypixel.particles.Particle;
import touchmypixel.utils.FastMath;

typedef Vec2 = { var x:Float; var y:Float; }

class Redirector extends GravityWell
{	
	var max			:Int;
	var angle		:Float;
	
	inline static var PI : Float = 3.14159;
	inline static var DEG_TO_RAD : Float = PI / 180;
	inline static var RAD_TO_DEG : Float = 180 / PI;
	
	public function new(x:Float,y:Float,?force:Float=10, ?effect:Float=1000) 
	{	
		super( x, y, force, effect );
		
		trace( "Redirector!" );
		
		max = 50;
		angle = 0 * DEG_TO_RAD;
	}
	
	override public function apply( p:Particle, dt:Float ):Void
	{
		var dx = x - p.x;
		var dy = y - p.y;
		var distSq = dx * dx + dy * dy;
		
		if ( distSq < effect * effect )
		{
			var mag = Math.sqrt( p.vx * p.vx + p.vy * p.vy );
			var pa = Math.atan2( p.vy, p.vx ) + PI / 2;
			var m = 30;
			//if ( dx < 0 ) m *= -1;
			pa += ( angle - pa ) / m; // / 30;
			p.vx = Math.sin( pa ) * mag;
			p.vy = -Math.cos( pa ) * mag;
		}
	}
	/*
	public function rotate( degrees : Float ) : Void
	{
		var angle = Math.atan2( y , x ) + PI / 2 + degrees * DEG_TO_RAD;
		var mag = length();
		x = Math.sin( angle ) * mag;
		y = -Math.cos( angle ) * mag;
	}*/
	
	public static function rotate( v:Vec2, angle:Float ):Vec2
	{
		var ca = Math.cos( angle );
		var sa = Math.sin( angle );
		return { x : v.x * ca - v.y * sa, y : v.x * sa + v.y * sa };
	}
	/// <summary> 
	/// Returns the angle expressed in radians between -Pi and Pi. 
	/// <param name="radians">the angle to wrap, in radians.</param> 
	/// <returns>the input value expressed in radians from -Pi to Pi.</returns> 
	/// </summary> 
	private static function wrapAngle( radians : Float ) : Float 
	{ 
		while (radians < -PI) 
		{ 
			radians += 2* PI; 
		} 
		while (radians > PI) 
		{ 
			radians -= 2 * PI;
		} 
		return radians; 
	} 
}