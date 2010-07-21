package touchmypixel.bitmap;

import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.MovieClip;
import flash.display.PixelSnapping;
import flash.display.Sprite;
import flash.events.Event;
import flash.geom.Matrix;
import flash.geom.Point;
import flash.geom.Rectangle;

class Animation extends Sprite
{
	public var bitmap:Bitmap;
	public var clip:MovieClip;
	public var frames:Array<BitmapData>;
	
	private var cache:Bool;
	
	private var clipData:MovieClip;
	
	public var repeat:Bool;
	public var treatAsLoopedGraphic:Bool;
	public var reverse:Bool;
	public var onEnd:Void->Void;
	
	public var totalFrames(getTotalFrames, null):Int;
	public var currentFrame:Int;
	
	private var _playing:Bool;
		
	public function new() 
	{
		super();
		
		frames = [];
		currentFrame = 1;
		cache = true;
		repeat = true;
		reverse = false;
		treatAsLoopedGraphic = false;
		
		_playing = false;
		
		bitmap = new Bitmap();
		bitmap.smoothing = false;
		addChild(bitmap);
	}
	
	public function getTotalFrames():Int { return frames.length; }
	
	public function isPlaying():Bool { return _playing; }
	
	public function buildCacheFromLibrary(identifier:String, ?rectangle:Rectangle=null):Void
	{
		var instance = Type.createInstance(Type.resolveClass(identifier), []);
		
		buildCacheFromClip(instance, rectangle);
		
		// Cant get identifiers in the cpp as afaik
	}
	
	public function buildCacheFromClip(clip:MovieClip, ?rectangle:Rectangle=null):Void
	{
		trace("BUILDING FROM CLIP");
		this.clip = clip;

		
		var rect:Rectangle; 
		var bounds = Reflect.field(clip, "e_bounds");
		
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
		
		// Hard coded rect as rect's arnt supported in cpp yet
		//rect = new Rectangle(0, 0, 90, 90);
		
		
		for (i in 1...clip.totalFrames+1)
		{
			clip.gotoAndStop(i);
			makeAllChildrenGoToFrame(clip, i);
			trace(Std.int(rect.width) +" : " +Std.int(rect.height));
			var bitmapData:BitmapData = new BitmapData(Std.int(rect.width), Std.int(rect.height), true, 0x00000000);
			var m:Matrix = new Matrix();
			m.translate(-rect.x, -rect.y);
			m.scale(clip.scaleX, clip.scaleY);
			bitmapData.draw(clip,m);
			frames.push(bitmapData);
		}
		bitmap.x = rect.x;
		bitmap.y = rect.y;
		
		
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
		if (!cache)
		{
			// non cached display
			/*
			if (clipData != null)
			{
				var c = getQualifiedClassName(clip);
				clipData = new(getDefinitionByName(c))();
				var r:Rectangle = clipData.getRect(clipData);
				clipData.x = r.x;
				clipData.y = r.y;
				addChild(clipData);
			}
			clipData.gotoAndStop(frame);
			*/
		} else {
			currentFrame = Math.round(frame);
			bitmap.bitmapData = frames[currentFrame - 1];
			bitmap.smoothing = true;
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
			if (onEnd != null) onEnd();
		}
	}
	
	public function update():Void
	{
		stop();
		frames = [];
		buildCacheFromClip(clip);
	}
	
	public function destroy():Void
	{
		stop();
		if (parent != null) parent.removeChild(this);
	}
}
