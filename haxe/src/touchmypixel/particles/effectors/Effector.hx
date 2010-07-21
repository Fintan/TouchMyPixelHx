/**
 * ...
 * @author Tony Polinelli
 */

package touchmypixel.particles.effectors;
import touchmypixel.particles.Particle;

interface Effector 
{
	function apply(particle:Particle, dt:Float):Void;
}