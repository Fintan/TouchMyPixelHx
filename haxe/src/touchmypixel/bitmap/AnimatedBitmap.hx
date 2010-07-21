/**
 * ...
 * @author Tonypee
 */

package touchmypixel.bitmap;
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.MovieClip;
import flash.events.Event;
import flash.geom.Matrix;
import flash.geom.Rectangle;
import hxs.Signal;

class AnimatedBitmap extends Bitmap
{
	public var frames:Array<BitmapData>;
	
	public var repeat:Bool;
	public var totalFrames(getTotalFrames, null):Int;
	public var currentFrame(default, null):Int;
	
	public var treatAsLoopedGraphic:Bool;
	
	public var reverse:Bool;
	var _playing:Bool;
	
	public var onTimelineEnd:Signal;
	
	public function new() 
	{
		super();
		
		frames = [];
		currentFrame = 1;
		reverse = false;
		repeat = true;
		treatAsLoopedGraphic = true;
		_playing = false;
		
		onTimelineEnd = new Signal();
	}
	
	public function getTotalFrames():Int { return frames.length; }
	
	public function isPlaying():Bool { return _playing; }
	
	
	public function buildCacheFromLibrary(identifier:String, ?rectangle:Rectangle=null):Void
	{
		var instance = Type.createInstance(Type.resolveClass(identifier), []);
		
		buildCacheFromClip(instance, rectangle);
	}
	
	public function buildCacheFromClip(clip:MovieClip, ?rectangle:Rectangle=null):Void
	{
		var rect:Rectangle; 
		var bounds = Reflect.field(clip, "bounds");
		
		if (rectangle == null)
		{
			if (bounds != null)
			{
				rect = new Rectangle(bounds.x, bounds.y, bounds.width, bounds.height);
				bounds.visible = false;
			} else {
				rect = clip.getRect(clip);
			}
		} else {
			rect = rectangle;
		}
		
		for (i in 1...clip.totalFrames+1)
		{
			clip.gotoAndStop(i);
			
			makeAllChildrenGoToFrame(clip, i);
			
			var bitmapData:BitmapData = new BitmapData(Std.int(rect.width), Std.int(rect.height), true, 0x00000000);
			var m:Matrix = new Matrix();
			m.translate(-rect.x, -rect.y);
			m.scale(clip.scaleX, clip.scaleY);
			bitmapData.draw(clip,m);
			frames.push(bitmapData);
		}
	}
	
	private function makeAllChildrenGoToFrame(clip:MovieClip, frame:Int):Void
	{
		for (i in 0...clip.numChildren) {
			var child:Dynamic = clip.getChildAt(i);
			if (Std.is(child,MovieClip)) {
				makeAllChildrenGoToFrame(child, frame);
				child.gotoAndStop(frame);
			}
		}
	}
	
	public function enterFrame(e:Event = null):Void
	{
		if(reverse){
			prevFrame();
		}else {
			nextFrame();
		}
		
		if (currentFrame == totalFrames) {
			
			if (!repeat) {
				stop();
			}
			dispatchEvent(new Event(Event.COMPLETE));
			
			onTimelineEnd.dispatch();
		}
	}
	
	public function play():Void
	{
		_playing = true;
		addEventListener(Event.ENTER_FRAME, enterFrame, false, 0, true);
	}
	
	public function stop():Void
	{
		_playing = false;
		removeEventListener(Event.ENTER_FRAME, enterFrame);
	}
	
	public function gotoAndStop(frame:Int):Void
	{
		if (treatAsLoopedGraphic) {
			if (frame > totalFrames) {
				frame = frame % totalFrames;
			}
		}
		currentFrame = frame;
		
		gotoFrame(currentFrame);
		stop();
	}
	
	public function gotoAndPlay(frame:Int):Void
	{
		currentFrame = frame;
		gotoFrame(currentFrame);
		play();
	}
	
	public function gotoAndPlayRandomFrame():Void
	{
		gotoAndPlay(Math.ceil(Math.random() * totalFrames));
	}
	
	public function nextFrame():Void
	{
		currentFrame++;
		if (currentFrame > totalFrames) currentFrame = 1;
		gotoFrame(currentFrame);
	}
	public function prevFrame():Void
	{
		currentFrame--;
		if (currentFrame < 1) currentFrame = totalFrames;
		gotoFrame(currentFrame);
	}

	private function gotoFrame(frame:Int):Void
	{		
		currentFrame = Math.round(frame);
		bitmapData = frames[currentFrame - 1];
		smoothing = true;
	}
}