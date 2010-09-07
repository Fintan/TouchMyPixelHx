package touchmypixel.particles.effectors;
import touchmypixel.game.geom.AABB;
import touchmypixel.particles.Particle;

/**
 * ...
 * @author Tonypee
 */

class Direction implements Effector
{
	public var x:Float;
	public var y:Float;
	public var radius : Float;
	public var angle : Float;
	
	inline static var PI : Float = 3.14159;
	inline static var DEG_TO_RAD : Float = PI / 180;
	inline static var RAD_TO_DEG : Float = 180 / PI;
	
	public var strength:Float;
	
	public var aabb:AABB;
	
	public function new(x:Float, y:Float, radius:Float, angle:Float, strength:Float=.5) 
	{
		this.radius = radius;
		this.angle = angle;
		this.x = x;
		this.y = y;
		this.strength = strength;
		
		aabb = new AABB();
		aabb.fromCircle(x, y, this.radius);
	}
	
	public function update()
	{
		aabb.fromCircle(x, y, radius);
	}
	
	public function apply( p:Particle, dt:Float ):Void
	{
		if (aabb.contains(p.x, p.y))
		{
			var dx = x - p.x;
			var dy = y - p.y;
			var distSq = dx * dx + dy * dy;
			
			if ( distSq < radius * radius )
			{
				var mag = Math.sqrt( p.vx * p.vx + p.vy * p.vy );
				var pa = Math.atan2( p.vy, p.vx ) + PI / 2;
				var smoothing = 5/dt/strength;
				
				var incident = shortestAngleBetween( angle*DEG_TO_RAD, pa ) / smoothing;
				
				pa -= incident;
				p.vx = Math.sin( pa ) * mag*1.01;
				p.vy = -Math.cos( pa ) * mag*1.01;
			}
		}
	}
	/**
	 * Normalizes a value in a wrap-around numeric range.
	 * @param	value	the value to be normalized.
	 * @param	lower	the lower wrap-around point (inclusive).
	 * @param	upper	the upper wrap-around point (exclusive).
	 * @return	the normalized input value.
	 */
	public static function wrap( value : Float, lower : Float, upper : Float ) : Float 
	{ 
		var distance = upper - lower; 
		var times = Math.floor( (value - lower) / distance ); 
		return value - (times * distance); 
	}
	
	/// <summary> 
	///   Calculates the smallest angle between two absolute directions 
	/// </summary> 
	/// <param name="firstPhi">First absolute direction in radians</param> 
	/// <param name="secondPhi">Second absolute direction in radians</param> 
	/// <returns>The smallest angle between both directions</returns> 
	public static function shortestAngleBetween( a1 : Float, a2 : Float ) : Float
	{ 
		var difference = a2 - a1; 

		// Just unroll the difference of both angles and we have the angle 
		var angle = wrap( difference, 0.0, 2 * 3.14159 ); 

		// Go the other way around if we got the longer path 
		if( angle >= PI ) 
		angle -= 2 * PI; 

		return angle; 
	} 
}