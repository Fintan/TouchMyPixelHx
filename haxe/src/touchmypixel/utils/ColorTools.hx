package touchmypixel.utils;

import flash.display.DisplayObject;
import flash.geom.ColorTransform;

class ColorTools
{
	public static function tint(clip:DisplayObject, tintColor:Int, tintMultiplier:Float):Void
	{
		var ct = new ColorTransform();
		ct.redMultiplier = ct.greenMultiplier = ct.blueMultiplier = 1 - tintMultiplier;
		var r:Int = (tintColor >> 16) & 0xFF;
		var g:Int = (tintColor >>  8) & 0xFF;
		var b:Int =  tintColor        & 0xFF;
		ct.redOffset   = Math.round(r * tintMultiplier);
		ct.greenOffset = Math.round(g * tintMultiplier);
		ct.blueOffset  = Math.round(b * tintMultiplier);
		
		clip.transform.colorTransform = ct;
	}
	
	public static function interpolateColor(fromColor:Int, toColor:Int, progress:Int):Int
	{
		var q:Float = 1-progress;
		var fromA:Int = (fromColor >> 24) & 0xFF;
		var fromR:Int = (fromColor >> 16) & 0xFF;
		var fromG:Int = (fromColor >>  8) & 0xFF;
		var fromB:Int =  fromColor        & 0xFF;

		var toA:Int = (toColor >> 24) & 0xFF;
		var toR:Int = (toColor >> 16) & 0xFF;
		var toG:Int = (toColor >>  8) & 0xFF;
		var toB:Int =  toColor        & 0xFF;
		
		var resultA:Int = Std.int(fromA*q + toA*progress);
		var resultR:Int = Std.int(fromR*q + toR*progress);
		var resultG:Int = Std.int(fromG*q + toG*progress);
		var resultB:Int = Std.int(fromB*q + toB*progress);
		var resultColor:Int = resultA << 24 | resultR << 16 | resultG << 8 | resultB;
		return resultColor;		
	}
	
	/* Port me!
	public static function interpolateTransform(fromColor:ColorTransform, toColor:ColorTransform, progress:Number):ColorTransform
	{
		var q:Number = 1-progress;
		var resultColor:ColorTransform = new ColorTransform
		(
			  fromColor.redMultiplier*q   + toColor.redMultiplier*progress
			, fromColor.greenMultiplier*q + toColor.greenMultiplier*progress
			, fromColor.blueMultiplier*q  + toColor.blueMultiplier*progress
			, fromColor.alphaMultiplier*q + toColor.alphaMultiplier*progress
			, fromColor.redOffset*q       + toColor.redOffset*progress
			, fromColor.greenOffset*q     + toColor.greenOffset*progress
			, fromColor.blueOffset*q      + toColor.blueOffset*progress
			, fromColor.alphaOffset*q     + toColor.alphaOffset*progress
		)
		return resultColor;		
	}*/
	
}
