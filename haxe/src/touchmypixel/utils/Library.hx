/**
 * ...
 * @author Tony Polinelli
 */

package touchmypixel.utils;

using StringTools;

class Library 
{
	
	public static function create(c:String, ?args:Array<Dynamic>):Dynamic
	{
		if (args == null) args = [];
		try {
			var cl = Type.resolveClass(c);
			return Type.createInstance(cl, args);
		} catch (e:Dynamic)
		{
			throw("Cannot Create Type: '" + c + "'");
		}
		
		return null;
	}	
	
}