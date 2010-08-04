/**
 * ...
 * @author Tony Polinelli
 */

package touchmypixel.particles.effectors;

import touchmypixel.particles.Particle;

class Random implements Effector
{
	public var amountX:Float;
	public var amountY:Float;
	
	public function new(?amountY:Float=.2, ?amountX:Float=.2) 
	{
		this.amountX = amountX;
		this.amountY = amountY;
	}

	public function apply(p:Particle, dt:Float):Void
	{
		var r = Math.random()-.5;
		p.vx += amountX*r*dt;
		p.vy += amountY*r*dt;
	}
	
}