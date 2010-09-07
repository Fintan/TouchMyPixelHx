package touchmypixel.bitmap;

import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.geom.Point;
import flash.geom.Rectangle;

/**
 * ...
 * @author Tonypee
 */

class TextStrip 
{
	public var strip:BitmapData;
	var characters:Hash<BitmapData>;
	var characterWidths:Hash<Int>;
	public var useCache:Bool;
	var cache:Hash<BitmapData>;
	
	public function new(strip:BitmapData, info:Array<CharInfo>) 
	{
		this.strip = strip;
		
		characters = new Hash();
		characterWidths = new Hash();
		cache = new Hash();
		
		useCache = false; 
		
		var x = 0;
		var h = strip.height;
		for (i in info)
		{
			var bd:BitmapData = new BitmapData(i.width, h, true, 0x00000000);
			bd.copyPixels(strip, new Rectangle(x, 0, i.width, h), new Point(), null, null, true);
			characters.set(i.char, bd);
			characterWidths.set(i.char, i.width);
			x += i.width;
		}
	}
	
	public function getCharacter(char:String):BitmapData
	{
		return characters.get(char);
	}
	
	public function getText(text:String, ?border:Int=0, ?preview:Bool = false ):BitmapData
	{
		if (useCache && cache.exists(text))
			return cache.get(text);
			
		var totalWidth = border;
		for (i in 0...text.length)
		{
			var w = characterWidths.get(text.charAt(i));
			if(w != null)
			{
				totalWidth += w + border;
			}
		}
		
		var bd:BitmapData = new BitmapData(totalWidth, strip.height + border * 2, !preview , preview ? 0xcccccc : 0x00000000);
		var c = border;
		for (i in 0...text.length)
		{
			var charBmp = characters.get(text.charAt(i));
			if (preview)
				bd.fillRect(new Rectangle(c, border, charBmp.width, charBmp.height), 0xffffff);
			bd.copyPixels(charBmp, new Rectangle(0, 0, charBmp.width, charBmp.height), new Point(c, border), null, null, true);
			c += charBmp.width+border;
		}
		
		if (useCache)
			cache.set(text, bd);
		
		return bd;
	}
}

typedef CharInfo =
{
	public var char:String;
	public var width:Int;
}