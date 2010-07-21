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
	public static function loadBitmap(src:String):Bitmap
	{
		#if cpp
			
			var bd:BitmapData = BitmapData.load(src);
			var bmp = new Bitmap(bd, PixelSnapping.NEVER,true);
			return bmp;
			
		#else
		
			var bd = Type.createInstance(Type.resolveClass(src), [50,50]);
			var bmp = new Bitmap(bd);
			
			return bmp;
		#end
	}
}