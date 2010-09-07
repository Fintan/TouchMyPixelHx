/**
 * ...
 * @author Tony Polinelli
 */

package touchmypixel.particles.effectors;

import deadsun.Deadsun;
import touchmypixel.game.geom.AABB;
import touchmypixel.particles.Particle;
import touchmypixel.utils.FastMath;

class GravityWell implements Effector
{
	public var x:Float;
	public var y:Float;
	public var force:Float;
	public var effect:Float;
	public var size:Float;
	
	public var aabb:AABB;
	
	public function new(x:Float,y:Float,?force:Float=10, ?effect:Float=1000, ?size:Float=70) 
	{	
		this.x = x;
		this.y = y;
		this.force = force;
		this.effect = effect;
		this.size = size * 1.2;
		
		aabb = new AABB();
		aabb.fromCircle(x, y, this.size);
	}
	
	public function update()
	{
		aabb.fromCircle(x, y, this.size);
	}
	
	public function apply(particle:Particle, dt:Float):Void
	{
		if (aabb.contains(particle.x, particle.y))
		{
			var dx = x - particle.x;
			var dy = y - particle.y;
			var lenM = dx * dx + dy * dy;
			var len = Math.sqrt(lenM);
				
			if(lenM < size*size*1){
				var e = (effect*size)/len;
				e = Math.min(e, .7);
				var forceX = e * dx / len / particle.mass*force*(1-len/size);
				var forceY = e * dy / len / particle.mass*force*(1-len/size);
				
				particle.vx += forceX * dt;
				particle.vy += forceY * dt;
			}
		}
	}
}