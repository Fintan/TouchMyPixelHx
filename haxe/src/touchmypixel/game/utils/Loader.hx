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
	public static var loadedBitmaps:Hash<BitmapData> = new Hash();
	public static var loadedSounds:Hash<Sound> = new Hash();
	
	public static function loadBitmap(src:String):Bitmap
	{
		// already loaded
		if (loadedBitmaps.exists(src))
		{
			return new Bitmap(loadedBitmaps.get(src), PixelSnapping.AUTO, true);
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
		
		loadedBitmaps.set(src, bd);
		
		return new Bitmap(loadedBitmaps.get(src), PixelSnapping.AUTO, true);
	}
	
	public static function destroy() : Void
	{
		for ( bmp in loadedBitmaps )
			bmp.dispose();
		loadedBitmaps = new Hash<BitmapData>();
		
		for ( snd in loadedSounds )
			snd.close();
		loadedSounds = new Hash<Sound>();
	}
	
	public static function loadSound(url:String):Sound
	{
		if (loadedSounds.exists(url))
			return cast(loadedSounds.get(url), Sound);
		
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
		
		loadedSounds.set(url, sound);
		
		return sound;
	}
}