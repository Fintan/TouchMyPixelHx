/**
 * ...
 * @author Tony Polinelli
 */

package touchmypixel.particles.effectors;
import touchmypixel.particles.Particle;

class Gravity implements Effector
{
	public var amountX:Float;
	public var amountY:Float;
	
	public function new(?amountY:Float=.8, ?amountX:Float=0) 
	{
		this.amountX = amountX;
		this.amountY = amountY;
	}

	public function apply(p:Particle, dt:Float):Void
	{
		p.vx += amountX*dt;
		p.vy += amountY*dt;
	}
	
}