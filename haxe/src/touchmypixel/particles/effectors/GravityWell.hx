/**
 * ...
 * @author Tony Polinelli
 */

package peepee.particles.effectors;
import peepee.particles.Particle;

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
		var hw = 100;
		var hh = 100;
		if (particle.x > x - hw
			&& particle.x < x + hw
			&& particle.y > y - hh
			&& particle.y < y + hh)
		{
			var dx = x - particle.x;
			var dy = y - particle.y;
			var len = dx * dx + dy * dy;
			var distance = Math.sqrt(len);
			
			var e = effect/len;
			e = Math.min(e, 1);
			var forceX = e * dx / distance / particle.mass*force;
			var forceY = e * dy / distance / particle.mass*force;
			
			particle.vx += forceX * dt;
			particle.vy += forceY * dt;
		}
	}
	
}