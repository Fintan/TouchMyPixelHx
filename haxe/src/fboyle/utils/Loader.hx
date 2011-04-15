//
//  Loader
//
//  Created by Fintan Boyle on 2011-01-28.
//  Copyright (c) 2011 Modello Design Ltd. All rights reserved.
//
//  based on touchmypixel.game.utils.Loader (MIT License)
//
package fboyle.utils;

import fboyle.display.DisplayTypeDefs;

#if (flash || cpp)
import flash.display.Bitmap;
import flash.display.MovieClip;
import flash.display.BitmapData;
import flash.display.PixelSnapping;
import flash.events.Event;
import flash.media.Sound;
import flash.net.URLRequest; 
#end

class Loader 
{
	public static var loaded:Hash<Dynamic> = new Hash();
	
	public static function loadBitmap(src:String):BitmapHx
	{
		// already loaded
		if (loaded.exists(src)){
			return cast new Bitmap(loaded.get(src), PixelSnapping.NEVER, true);
		}
		
		// load bitmap
		//var bd:BitmapData = null;
		var bd = null;
		
		#if iphone
			bd = BitmapData.load(src);
		#elseif cpp
			//bd = BitmapData.load("assets/"+src);
			bd = BitmapData.load(src);
			
			var loader = new flash.display.Loader();
    		loader.contentLoaderInfo.addEventListener(Event.COMPLETE, 
	    		function(e:Event):Void{
	    			//e.target.removeEventListener((Event.COMPLETE, this);
	    			bd = cast(cast(e.target, flash.display.LoaderInfo).content, Bitmap).bitmapData;
	    			//bd = cast(loader.contentLoaderInfo.content, Bitmap).bitmapData;
	    		
	    		}
    		);
    		//loader.load(new flash.net.URLRequest("../../assets/"+src));
			loader.load(new flash.net.URLRequest("../../"+src));
			//bd = Bitmap(loader.contentLoaderInfo.content).bitmapData;

		#else			
			var cl = Type.resolveClass(src);
			if (cl == null)
				throw "Cannot Attach Bitmap: " + src;
			bd = Type.createInstance(cl, [50, 50]);
		#end
		
		loaded.set(src, bd);
		
		return cast new Bitmap(loaded.get(src), PixelSnapping.NEVER, true);
	}
	
	
	/*public static function loadSound(url:String):Sound
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
	}*/
	
	public static function loadMovieClip(src:String, ?duplicates:Bool=false):ContainerHx
	{
		// already loaded
		if (loaded.exists(src) && !duplicates){
			return cast loaded.get(src);
		}
		
		var cl = Type.resolveClass(src);
		if (cl == null){
			trace("Cannot Attach Movieclip: " + src);
			throw "Cannot Attach Movieclip: " + src;
		}
		var bd = Type.createInstance(cl, []);
		
		if(!duplicates)loaded.set(src, bd);
		
		return bd;
	}
	
	
}
