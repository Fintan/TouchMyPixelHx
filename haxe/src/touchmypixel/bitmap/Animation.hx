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
import flash.errors.Error;
import flash.system.ApplicationDomain;
import org.casalib.time.FrameTime;

//using fboyle.util.FlipUtil;

class Animation extends Sprite
{

	//The number of ticks that will happen every second.

	public static var TICKS_PER_SECOND:Int = 12;
	
	//The rate at which ticks are fired, in seconds.
	
	public static var TICK_RATE:Float = 1.0 / cast(TICKS_PER_SECOND, Float);
	
	// The rate at which ticks are fired, in milliseconds.
	
	public static var TICK_RATE_MS:Float = TICK_RATE * 1000;
	
	public static var MAX_TICKS_PER_FRAME:Int = 1; 
	
	private var lastTime:Float;

	private var elapsed:Float; 
	
	private var _timeScale:Float; 

	//--------------

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
	
	private var frameOrigins:Array<Point>;
		
	public function new() 
	{
		super();
		//----
		lastTime = -1.0;
		elapsed = 0.0;
		_timeScale = 1.0;
		//----
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
	
	public function buildCacheFromLibrary(identifier:String, ?rectangle:Rectangle=null):Void{
	
		var LibItem = Type.resolveClass(identifier);
			if (LibItem == null)
				throw "Cannot retrieve Library Item: " + identifier;
		
		var instance = Type.createInstance(LibItem, []);
			
		//var instance = Type.createInstance(ApplicationDomain.currentDomain.getDefinition(identifier), [60,60]);
		
		buildCacheFromClip(instance, new Rectangle(0,0,instance.width,instance.height));
		
		// Cant get identifiers in the cpp as afaik
	}
	
	/*
	*
	* Alternative to buildCacheFromClip() for a more platofrm neutral approach
	*
	*/
	public function buildCacheFromBitmaps(bitmaps:Array<Bitmap>, ?rectangle:Rectangle=null):Void{
		trace("BUILDING FROM IMAGE SEQUENCE");
	
		if(bitmaps.length==-1){
			throw(new Error("no images in the sequence!"));
		}
		var rect:Rectangle; 
		var bounds = Reflect.field(clip, "e_bounds");
		
		if (rectangle == null)
		{	
			//trace("test "+ bitmaps.toString());
			var bm = bitmaps[0];
			//trace(" bm.bitmapData "+bm.bitmapData.width);	
			rect = new Rectangle(0, 0, bm.bitmapData.width,  bm.bitmapData.height);
				
		} else {
			rect = rectangle;
		}
		
		var j = 0;
		for (i in bitmaps)
		{	
			var bitmapData:BitmapData = new BitmapData(Std.int(rect.width), Std.int(rect.height), true, 0x00000000);
			var m:Matrix = new Matrix();
			m.translate(-rect.x, -rect.y);
			//m.scale(clip.scaleX, clip.scaleY);
			var bm = bitmaps[j];
			bitmapData.draw(bm,m);
			frames.push(bitmapData);
			j++;
		}
		
	}
	
	public function buildCacheFromClip(clip:MovieClip, ?rectangle:Rectangle=null, ?flipHorizontal:Bool=false):Void
	{
		trace("BUILDING FROM CLIP");
		this.clip = clip;

		frameOrigins = new Array<Point>();
		
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
			
			if(flipHorizontal){
				//fboyle.util.FlipUtil
				//clip.flipHorizontal(); //TODO: doesn't work!
			}
			
			frameOrigins[i-1] = org.casalib.util.DisplayObjectUtil.getOffsetPosition(clip);
			//trace("frameOrigins[i-1] "+frameOrigins[i-1]);
			makeAllChildrenGoToFrame(clip, i);
			//trace(Std.int(rect.width) +" : " +Std.int(rect.height));
			var bitmapData:BitmapData = new BitmapData(Std.int(rect.width), Std.int(rect.height), true, 0x00000000);
			//var bitmapData:BitmapData = new BitmapData(Std.int(rect.width), Std.int(rect.height), true, 0x00000000);
			var m:Matrix = new Matrix();
			m.translate(-rect.x, -rect.y + Std.int(frameOrigins[i-1].y));
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
			
			if(bitmap.parent != null){
				bitmap.parent.x = -(frameOrigins[currentFrame-1].x);
				bitmap.parent.y = -(frameOrigins[currentFrame-1].y);
			}
		}
	}
	
	/*public function enterFrame2(e:Event = null):Void
	{
		if(reverse){
			prevFrame();
		}else {
			nextFrame();
		}
		
		//TODO: set a frame rate to control speed
		if (currentFrame == totalFrames) {
			
			if (!repeat) {
				stop();
			}
			dispatchEvent(new Event(Event.COMPLETE));
			if (onEnd != null) onEnd();
		}
	}*/
	
	private function enterFrame(e:Event = null):Void{
	
		// Track current time.		
		var currentTime = FrameTime.getInstance().time;
		
		if (lastTime < 0){
		
			lastTime = currentTime;
		
			return;
		
		}
		
		// Calculate time since last frame and advance that much.
		
		var deltaTime = (currentTime - lastTime) * _timeScale;
		
		advance(deltaTime);
		
		// Note new last time.
		
		lastTime = currentTime;
	
	}
	
	private function advance(deltaTime:Float):Void{

		// Add time to the accumulator.
		
		elapsed += deltaTime;
		
		// Perform ticks, respecting tick caps.
		
		var tickCount = 0;
		
		while (elapsed >= TICK_RATE_MS && (tickCount < MAX_TICKS_PER_FRAME)){
		
			//------	
			
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
			//-------
			
			elapsed -= TICK_RATE_MS;
			
			tickCount++;
		
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
		
		frameOrigins = null;
	}
}
