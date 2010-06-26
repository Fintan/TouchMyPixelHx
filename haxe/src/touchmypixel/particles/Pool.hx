/**
 * ...
 * @author Tony Polinelli
 */

package peepee.particles;

class Pool 
{
	public static var pool:Hash < List < Dynamic >> = new Hash();
	
	public static inline function getPool(c:Class<Dynamic>)
	{
		var n = Type.getClassName(c);
		if (!pool.exists(n)) pool.set(n, new List());
		return pool.get(n);
	}
	
	public static inline function get(c:Class<Dynamic>, ?args)
	{
		if (args == null) args = [];
		
		var p:List<Dynamic> = getPool(c);
		
		if (p.length > 0)
			return p.pop();
		else 
			return Type.createInstance(c, args);
	}
	
	public static function store(obj:Dynamic)
	{
		getPool(Type.getClass(obj)).push(obj);
	}
}