package touchmypixel.utils;

import flash.Lib;
import haxe.PosInfos;

#if flash

import flash.external.ExternalInterface;

class RedirectTrace
{
	public static var traceCount1:Int = 0;
	public static var traceCount2:Int = 0;

	public static function toFD()
	{
		haxe.Log.trace = function(v, ?pos:PosInfos) 
		{ 
			if (v == null) v = "null";
			
			flash.Lib.fscommand("trace", traceCount1++ + "  " + pos.fileName+":"+pos.lineNumber+": " +v); 
		}
	}
	public static function toConsole()
	{
		haxe.Log.trace = function(v, ?pos) 
		{ 
			if (v == null) v = "null";
			
			ExternalInterface.call("console.log", traceCount2++ + "  " +pos.fileName + ":" + pos.lineNumber + ": " +v);
		}
	}
	
	public static function toBoth()
	{
		haxe.Log.trace = function(v, ?pos) 
		{ 
			if (v == null) v = "null";
			
			flash.Lib.fscommand("trace", traceCount1++ + "  " +pos.fileName+":"+pos.lineNumber+": " +v); 
			ExternalInterface.call("console.log", traceCount2++ + "  " +pos.fileName + ":" + pos.lineNumber + ": " +v);
		}
	}
}
#else
class RedirectTrace
{
	public static function toFD() {}
	public static function toConsole() {}
	public static function toBoth() { }
}
#end