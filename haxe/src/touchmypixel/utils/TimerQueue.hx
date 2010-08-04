/**
 * ...
 * @author Tonypee
 * 

var queue = new TimerQueue()

queue.add( bg.open, 500);
queue.add( bench.open, 1500);
queue.add( bench.open, 1500);
 
 
 */

package touchmypixel.utils;
import haxe.Timer;

class TimerQueue 
{
	var timer : haxe.Timer;
	var queue : Array<TimerQueueItem>;
	
	public var onComplete:Void->Void;
	
	public function new() {
		queue = new Array();
		onComplete = function() { }
	}
	
	public function add(f, ?delay:Int=0) {
		queue.push({func:f, delay:delay});
	}
	
	public function start()
	{
		process();
	}
	public function stop()
	{
		if (timer != null)
			timer.stop();
	}
	
	function process() {
		var current = queue.shift();
		if( current == null ) {
			if (timer != null)
				timer.stop();
			timer = null;
			onComplete();
			return;
		}
		var ths = this;
		timer = Timer.delay(function()
		{
			ths.process();
			current.func();
		}, current.delay);
	}
}

typedef TimerQueueItem = {
	var func:Dynamic;
	var delay:Int;
}