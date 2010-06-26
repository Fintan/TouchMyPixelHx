/**
 * ...
 * @author Tony Polinelli
 */

package peepee.particles.effectors;
import peepee.particles.Particle;

interface Effector 
{
	function apply(particle:Particle, dt:Float):Void;
}