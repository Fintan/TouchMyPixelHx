/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.utils;
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.PixelSnapping;
import flash.events.Event;
import flash.media.Sound;
import flash.media.Sound;
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
	
	public static function loadSound(url:String):Sound
	{
		if (loaded.exists(url))
			return cast(loaded.get(url), Sound);
		
		var sound:Sound = null;
		
		#if iphone
			sound = new Sound(new URLRequest(url));
		#elseif cpp
			sound = new Sound(new URLRequest("assets/" + url));
		#else
			var cl = Type.resolveClass(url);
			if (cl == null)
				throw "Cannot Attach Sound: " + url;
			sound = Type.createInstance(cl, [url]);
		#end
		
		loaded.set(url, sound);
		
		return sound;
	}
}