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
		// already loaded
		if (loaded.exists(src))
		{
			return new Bitmap(loaded.get(src), PixelSnapping.AUTO, true);
		}
		
		// load bitmap
		var bd:BitmapData = null;
		
		#if iphone
			bd = BitmapData.load(src);
		#elseif cpp
			bd = BitmapData.load("assets/"+src);
		#else
			var cl = Type.resolveClass(src);
			if (cl == null)
				throw "Cannot Attach Bitmap: " + src;
			bd = Type.createInstance(cl, [50, 50]);
		#end
		
		loaded.set(src, bd);
		
		return new Bitmap(loaded.get(src), PixelSnapping.AUTO, true);
	}
}