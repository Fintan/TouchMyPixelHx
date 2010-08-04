/**
 * ...
 * @author Matt Benton
 */

package touchmypixel.particles.effectors;

import touchmypixel.particles.Particle;
import touchmypixel.utils.FastMath;

class GravityDeflector extends GravityWell
{	
	public function new(x:Float,y:Float,?force:Float=10, ?effect:Float=1000) 
	{	
		super( x, y, force, effect );
	}
	
	override public function apply(particle:Particle, dt:Float):Void
	{
		var dx = x - particle.x;
		var dy = y - particle.y;
		var distSq = dx * dx + dy * dy;
		
		
		
		
		if ( distSq == 0 )
			return;
			
		var f = -500;
		//if ( distSq > 500 )
			//f = -f;
			
		var ep = 50;
		var dist = Math.sqrt( distSq );
		if ( distSq < ep ) distSq = ep;
		var factor = ( f * dt ) / ( distSq * dist );
		particle.vx += dx * factor;
		particle.vy += dy * factor;
	}
	
}