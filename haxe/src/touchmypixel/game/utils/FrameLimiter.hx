/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.utils;
import flash.events.Event;
import haxe.Timer;
import nme.Lib;

class FrameLimiter 
{
	private static var lastTime:Float = Timer.stamp();
	private static var targetFPS:Float = 60;
	
	public static function init(?targetFPS:Int=60)
	{
		FrameLimiter.targetFPS = targetFPS;
		Lib.current.addEventListener(Event.ENTER_FRAME, update);
	}
	
	private static function update(e)
	{
		var dt:Float = Timer.stamp() - lastTime;
		
		if (dt < 1 / targetFPS)
			cpp.Sys.sleep(1 / targetFPS - dt);
		
		lastTime = Timer.stamp();
	}
	
}