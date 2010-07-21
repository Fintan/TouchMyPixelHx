/**
 * ...
 * @author Tonypee
 */

package ;

class FPS extends flash.text.TextField
{
	var times:Array<Float>;
	public function new()
	{
		super();
		x = 10;
		y = 10;
		flash.Lib.current.stage.addEventListener(flash.events.Event.ENTER_FRAME, onEnterFrame);
		text = "FPS:";
		times = [];
	}

	function onEnterFrame(_)
	{
		var now = haxe.Timer.stamp();
		times.push(now);
		while(times[0]<now-1)
			times.shift();
		text = "FPS:" + times.length;
	}
}