/**
 * ...
 * @author Tony Polinelli
 */

package peepee.particles;

class ParticlePool
{
	public static var instance:ParticlePool;
	
	public var pool:Array<Particle>;
	public var next:Int;
	public var length:Int;
	
	public function new(amount) 
	{
		instance = this;
		
		length = amount;
		next = 0;
		
		pool = [];
		for (i in 0...amount)
			pool.push(new Particle());
	}
	
	public static function init(amount:Int)
	{
		return new ParticlePool(amount);
	}
	
	/**
	 * Return a fresh particle
	**/
	public inline function getParticle()
	{
		next++;
		if (next >= length) next = 0;
		
		return pool[next];
		
	}
	
}