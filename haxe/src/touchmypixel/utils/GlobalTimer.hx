
package touchmypixel.utils;

import haxe.Timer;

class GlobalTimer 
{
	public static var timers:Array<Timer> = new Array();
	
	public static function setInterval(func:Dynamic, milliseconds:Int, rest:Array<Dynamic>):Int
	{
		var timer:Timer = new Timer(milliseconds);
		timers.push(timer);
		var id = timers.length - 1;
		timer.run = function() 
		{
			Reflect.callMethod(null, func, rest);
		}
		
		return id;
	}
	
	public static function clearInterval(id:Int) 
	{
		timers[id].stop();
		timers[id] = null;
	}
	
	public static function setTimeout(func:Dynamic, milliseconds:Int, rest:Array<Dynamic>):Int
	{
		var timer:Timer = new Timer(milliseconds);
		timers.push(timer);
		var id = timers.length-1;
		timer.run = function() 
		{
			Reflect.callMethod(null, func, rest);
			clearTimeout(id);
		}
		
		return id;
	}

	public static function clearTimeout(id:Int) 
	{
		timers[id].stop();
		timers[id] = null;
	}
	
}