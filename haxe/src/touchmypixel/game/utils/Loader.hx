/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.utils;
import flash.display.Bitmap;
import flash.display.MovieClip;
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
			return new Bitmap(loaded.get(src), PixelSnapping.NEVER, true);
		}
		
		// load bitmap
		var bd:BitmapData = null;
		
		#if iphone
			bd = BitmapData.load(src);
		#elseif cpp
			bd = BitmapData.load("assets/"+src);
		#elseif js
			//bd = BitmapData.load("assets/"+src);
			
			var loader = new flash.display.Loader();
    		loader.contentLoaderInfo.addEventListener(Event.COMPLETE, 
	    		function(e:Event):Void{
	    			//e.target.removeEventListener((Event.COMPLETE, this);
	    			bd = cast(cast(e.target, flash.display.LoaderInfo).content, Bitmap).bitmapData;
	    			//bd = cast(loader.contentLoaderInfo.content, Bitmap).bitmapData;
	    		
	    		}
    		);
    		loader.load(new flash.net.URLRequest("../../assets/"+src));
			//bd = Bitmap(loader.contentLoaderInfo.content).bitmapData;

		#else			
			var cl = Type.resolveClass(src);
			if (cl == null)
				throw "Cannot Attach Bitmap: " + src;
			bd = Type.createInstance(cl, [50, 50]);
		#end
		
		loaded.set(src, bd);
		
		return new Bitmap(loaded.get(src), PixelSnapping.NEVER, true);
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
	
	public static function loadMovieClip(src:String):MovieClip
	{
		// already loaded
		if (loaded.exists(src))
		{
			return cast(loaded.get(src), MovieClip);
		}
		
		
		var cl = Type.resolveClass(src);
		if (cl == null)
			throw "Cannot Attach Movieclip: " + src;
		var bd = Type.createInstance(cl, []);
		
		loaded.set(src, bd);
		
		return cast(loaded.get(src), MovieClip);
	}
	
}
