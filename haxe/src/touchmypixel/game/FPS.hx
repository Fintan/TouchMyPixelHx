/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game;

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
		
		//autoSize = flash.text.TextFieldAutoSize.LEFT;
		
		this.mouseEnabled = false;
	}

	function onEnterFrame(_)
	{
		var now = haxe.Timer.stamp();
		times.push(now);
		while(times[0]<now-1)
			times.shift();
		text = Std.string(times.length);
	}
	
	public function destroy() : Void
	{
		flash.Lib.current.stage.removeEventListener(flash.events.Event.ENTER_FRAME, onEnterFrame);
		times = null;
	}
}