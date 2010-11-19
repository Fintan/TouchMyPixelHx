package fboyle.animation;

import flash.utils.Dictionary;

import touchmypixel.bitmap.AnimationCache;
import touchmypixel.bitmap.Animation;

class AnimationSet{

	public var container:flash.display.Sprite;
	
	private var clip:Animation;
	private var animationCache:AnimationCache;
	private var animations:Hash<Animation>;
	
	private var title:String;
	private var animationItems:Array<AnimationItem>;
	
	public function new(container, title:String, animationItems:Array<AnimationItem>, scaleFactor:Float=1.0){
	
		this.container = container;
			
		this.animationItems = animationItems;
		this.title = title;
		
		animations = new Hash();
		animationCache = AnimationCache.getInstance();
		
		for(i in 0...animationItems.length){
			var item = animationItems[i];
			
			//TODO:  need to figure out how to handle libSymbols|SpriteSheet at this stage
			// if we are dealing with a spritesheet then don't use AnimationCache
			#if flash
				animations.set(item.libraryName, animationCache.cacheLibAnimation(item.libraryName, scaleFactor));
			#else
				trace("TODO: need to implement a spritesheet approach for animations sets");
				//animations.set(item.libraryName, animationCache.cacheAnimation(item.libraryName, scaleFactor));
				//animations.set(item.libraryName, animationCache.cacheImageSequence(item.libraryName, bitmaps:Array<Bitmap>));
			#end
			
		}
		trace("animationItems[0].libraryName "+animationItems[0].libraryName);
		clip = animations.get(animationItems[0].libraryName);
		container.addChild(clip);
		clip.gotoAndStop(1);
		//clip.play();
	}
	
	public function getClip():Animation{
		return clip;
	}

	public function playAnimation(label:String):Void{
		for(i in 0...animationItems.length){
			var item = animationItems[i];
			
			if (item.libraryName == label) {
				
				if (clip != null) {
					clip.stop();
					clip.onEnd = null;
					if (clip.parent!=null) clip.parent.removeChild(clip);
				}
				
				//clip = animationCache.getAnimation(item.libraryName);
				clip = animations.get(item.libraryName);
		
				clip.play();
				
				if(!item.loop){
					var c = clip;
					clip.onEnd = function(){
						//clip.stop();
						c.stop();
					}
				}
					
				if (container!=null) {
					container.addChild(clip);
				}else{
					trace("Warning: container is not defined");
				}	
				break;
			}
		}
	}
	
	public function pause():Void {
		if (clip!=null) clip.gotoAndStop(clip.currentFrame);
	}
		
	public function stop():Void {
		if (clip!=null) clip.stop();
	}
		
	public function gotoAndStop(frame:Int):Void {
		if (clip!=null) clip.gotoAndStop(frame);
	}
	
	public function reset():Void{
		trace("AnimationSet>reset");
		for(ani in animations) {
		//for(i in 0...animations.length){
		//	var ani = animationItems[i];
			ani.stop();
		}
	}
		
	public function destroy():Void{
		trace("AnimationSet>destroy");
		for(ani in animations) {
		//for(i in 0...animations.length){
		//	var ani = animationItems[i];
			ani.destroy();
		}
		animations = null;
	}
}
