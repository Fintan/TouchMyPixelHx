
package touchmypixel.utils;

import flash.display.Bitmap;
import flash.display.MovieClip;
import flash.Lib;
import touchmypixel.events.BitmapEvent;
import touchmypixel.events.ProcessEvent;
import flash.events.Event;
import flash.events.EventDispatcher;

class AnimationCache extends EventDispatcher
{
	public var cacheQueue:Array<AnimationCacheQueueItem>;
	public var currentlyProcessingItem:Int;
	public var replaceExisting:Bool;
	
	public var animations:Hash<Animation>;
	
	private static var instance:AnimationCache;
	
	public function new() 
	{	
		super();
		//if(AnimationCache.instance != null) throw(new Error("AnimationCache is a Singleton. Don't Instantiate!"));
		instance = this;
		
		animations = new Hash();
		cacheQueue = new Array();
		replaceExisting = false;
	}	
	
	public static function getInstance():AnimationCache
	{
		return instance == null ? new AnimationCache() : instance;
	}
	
	public function cacheAnimation(id:String, clip:MovieClip):Animation
	{
		var animation:Animation = null;
		try {
			if(animations.get(id) == null || replaceExisting){
				animation = new Animation();
				animation.buildCacheFromClip(clip);
				animations.set(id, animation);
			} else {
				animation = animations.get(id);
			}
		}catch (e:Dynamic) {
			//	dispatchEvent(new BitmapEvent(BitmapEvent.BITMAP_CREATION_FAIL, true, false, "Error caching tiles in AnimationCache::cacheAnimation"));
		}
		return animation;
	}
	
	public function getAnimation(id:String):Animation
	{
		var cachedAnimation = animations.get(id);
		
		if (cachedAnimation == null) {
			trace("MISSING ANIMATION (AnimationCache): "+ id);
			return null;
		}
		
		var animation:Animation = new Animation();
		animation.frames = cachedAnimation.frames;
		animation.bitmap.x = cachedAnimation.bitmap.x;
		animation.bitmap.y = cachedAnimation.bitmap.y;
		animation.clip = cachedAnimation.clip;
		animation.gotoAndStop(1);	
		return animation;
	}
	
	public function addToCacheQueue(id, clip:MovieClip):Void
	{
		cacheQueue.push( { id:id, clip:clip } );
	}
	
	public function processQueue():Void
	{
		currentlyProcessingItem = 0;
		dispatchEvent(new ProcessEvent(ProcessEvent.START));
		process();
	}
	
	private function process():Void
	{
		trace("process");
		var item = cacheQueue[currentlyProcessingItem++];
		if (item != null)
		{
			cacheAnimation(item.id, item.clip);
			dispatchEvent(new ProcessEvent(ProcessEvent.PROGRESS,currentlyProcessingItem/cacheQueue.length));
			
			// Should be called async' to avoid a hang
			process();
		} else {
			dispatchEvent(new ProcessEvent(ProcessEvent.COMPLETE));
			cacheQueue = [];
		}
	}
	
	public function clearAll():Void
	{
		for(animation in animations) {
			animation.destroy();
		}
		animations = new Hash();
	}
}

typedef AnimationCacheQueueItem = {
	var id:String;
	var clip:MovieClip;
}