/**
 * ...
 * @author Tony Polinelli
 */

package touchmypixel.particles;
import touchmypixel.particles.Particle;
import flash.display.Sprite;
import flash.geom.Point;
import flash.geom.Rectangle;
import haxe.Timer;
import haxe.FastList;

class Emitter 
{
	public var emitType:Class<Particle>;
	public var amount:Float;
	public var x:Float;
	public var y:Float;
	
	var num:Float;
	
	public function new(type:Class<Particle>) 
	{
		var ths = this;
		emitType = type;
		amount = 1;
		//particles = new FastList<Particle>();
		x = y = 0;
		num = 0;
	}
	
	
	/**
	 * If enough time has passed, emit a particle
	**/
	public function update(dt:Float)
	{
		num += amount * dt;
		if (num > 1) 
		{
			for (i in 0...Math.floor(num))
			{
				var p:Particle = ParticlePool.instance.getParticle();
				//var p:Particle = Pool.get(emitType, []);
				//var p = Type.createInstance(emitType, []);
				p.reset();
				p.isAlive = true;
				p.emitter = this;
				p.x = x;
				p.y = y;
				initParticle(p, dt);
			}
			num = num % 1;
		}
	}
	
	public function initParticle(particle:Particle, dt:Float):Void
	{
		//override
	}
}