/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.utils;
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.PixelSnapping;
import flash.events.Event;
import flash.net.URLRequest;

class Loader 
{
	public static var loaded:Hash<Dynamic> = new Hash();
	
	public static function loadBitmap(src:String):Bitmap
	{
		if (loaded.exists(src))
		{
			return new Bitmap(loaded.get(src), PixelSnapping.AUTO, true);
		}
		
		var bd:BitmapData = null;
		
		#if cpp
			bd = BitmapData.load(src);
		#else
			bd = Type.createInstance(Type.resolveClass(src), [50, 50]);
		#end
		
		loaded.set(src, bd);
		
		return new Bitmap(bd);
	}
}