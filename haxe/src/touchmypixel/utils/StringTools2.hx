/**
 * ...
 * @author Tonypee
 */

package touchmypixel.utils;

using StringTools;

class StringTools2 
{

	public static function toUpperCaseFirst(string:String) 
	{
		return string.charAt(0).toUpperCase() + string.substr(1);
	}
	
}