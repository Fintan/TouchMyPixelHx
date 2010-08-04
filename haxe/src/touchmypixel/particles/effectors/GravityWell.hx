/**
 * ...
 * @author Tony Polinelli
 */

package touchmypixel.particles.effectors;

import touchmypixel.particles.Particle;
import touchmypixel.utils.FastMath;

class GravityWell implements Effector
{
	public var x:Float;
	public var y:Float;
	public var force:Float;
	public var effect:Float;
	
	public function new(x:Float,y:Float,?force:Float=10, ?effect:Float=1000) 
	{	
		this.x = x;
		this.y = y;
		this.force = force;
		this.effect = effect;
	}
	
	public function apply(particle:Particle, dt:Float):Void
	{
		var dx = particle.x - x;
		var dy = particle.y - y;
		var d = Math.sqrt(dx * dx + dy * dy);
		//var d = FastMath.sqrt(dx * dx + dy * dy);
		/*
		var hw = 100;
		var hh = 100;
		if (particle.x > x - hw
			&& particle.x < x + hw
			&& particle.y > y - hh
			&& particle.y < y + hh)
		{
		*/
		//trace(d);
		if(d < 100){
			var dx = x - particle.x;
			var dy = y - particle.y;
			var len = dx * dx + dy * dy;
			var distance = Math.sqrt(len);
			//var distance = FastMath.sqrt(len);
			
			var e = effect/len;
			e = Math.min(e, .7);
			var forceX = e * dx / distance / particle.mass*force*(1-d/100);
			var forceY = e * dy / distance / particle.mass*force*(1-d/100);
			
			particle.vx += forceX * dt;
			particle.vy += forceY * dt;
		}
	}
	
}