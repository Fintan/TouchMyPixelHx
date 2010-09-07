package touchmypixel.particles.effectors;
import touchmypixel.game.geom.AABB;
import touchmypixel.game.geom.Vector;
import touchmypixel.particles.Particle;

/**
 * ...
 * @author Tonypee
 */

class Circle implements Effector
{
	public var x:Float;
	public var y:Float;
	public var size:Float;
	
	public var aabb:AABB;
	
	public function new(x:Float, y:Float, size:Float) 
	{
		this.x = x;
		this.y = y;
		this.size = size;
		
		updatePosition();
	}
	
	public function updatePosition()
	{
		aabb = new AABB(x - size / 2, x + size / 2, y - size / 2, y + size / 2);
	}
	
	public function apply(particle:Particle, dt:Float)
	{
		if (aabb.contains(particle.x, particle.y))
		{
			var dx = particle.x - x;
			var dy = particle.y - y;
			var len = Math.sqrt(dx * dx + dy * dy);
			if (len < size / 2 ) {
				particle.x -= particle.vx * dt;
				particle.y -= particle.vy * dt;
				
				// reflect point off the circle
				var incidence = new Vector(particle.vx, particle.vy);
				var normal = new Vector(dx, dy);
				normal.normalize();
				
				var v = Vector.reflect(incidence, normal);
				
				particle.vx = v.x;
				particle.vy = v.y;
			}
		}
	}	
}