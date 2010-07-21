package touchmypixel.sound;

import flash.display.DisplayObject;
import flash.events.Event;
import flash.events.EventDispatcher;
import flash.events.IEventDispatcher;
import flash.geom.Point;
import flash.media.Sound;
import flash.media.SoundChannel;
import flash.media.SoundTransform;
import touchmypixel.sound.SoundManager;

class SoundSample extends EventDispatcher
{
	public var soundManager:SoundManager;
	
	public var sound:Sound;
	public var channel:SoundChannel;
	public var soundTransform:SoundTransform;
	public var initialOffset:Int;
	public var initialLoopsRemaining:Int;
	public var loopsRemaining:Int;
	
	public var soundPosition:Locatable2d;
	public var listenerPosition:Locatable2d;
	public var volumeRangeMin:Float;
	public var volumeRangeMax:Float;
	public var doPanning:Bool;
	public var panRangeMin:Float;
	public var panRangeMax:Float;
	public var panAmount:Float;
	
	public var distanceSoundTransform:SoundTransform;
	
	private var onComplete:Event -> Void;
	
	var p1:Point;
	var p2:Point;
	var lastPosition:Float;
	
	public var isPlaying:Bool;
	
	public function new( soundManager:SoundManager, sound:Sound, startOffset:Int = 0, loops:Int = 0, _soundTransform:SoundTransform = null, onComplete:Event -> Void = null) 
	{
		super();
		
		if (_soundTransform == null) _soundTransform = new SoundTransform();
		
		volumeRangeMin = 0;
		volumeRangeMax = 1000;
		doPanning = false;
		panRangeMin = 0;
		panRangeMax = 1000;
		panAmount = 1;
		
		isPlaying = false;
		
		distanceSoundTransform = new SoundTransform();
		p1 = new Point();
		p2 = new Point();
		
		
		this.soundManager = soundManager;
		this.sound = sound;
		this.initialOffset = startOffset;
		this.initialLoopsRemaining = loops;
		this.loopsRemaining = loops;
		soundTransform = _soundTransform;
		this.onComplete = onComplete;
	}
	
	/*public function pause() 
	{
		if (isPlaying) {
			isPlaying = false;
			lastPosition = channel.position;
			channel.stop();
		}
	}
	
	public function resume() 
	{
		if (!isPlaying) {
			isPlaying = true;
			var volume:Number = soundManager.soundTransform.volume * soundTransform.volume * distanceSoundTransform.volume;
			channel = sound.play(0, initialLoopsRemaining, new SoundTransform(volume,0));
		}
	}
	*/
	
	public function play():Void
	{
		try {
			isPlaying = true;
			
			if (channel != null) {
				channel.stop();
				channel.removeEventListener(Event.SOUND_COMPLETE, onComplete);
			}
			
			channel = sound.play(initialOffset, initialLoopsRemaining);
			
			channel.addEventListener(Event.SOUND_COMPLETE, soundComplete, false, 0, false);
			if (Reflect.isFunction(onComplete)) channel.addEventListener(Event.SOUND_COMPLETE, onComplete, false, 0, true);
			
			updateSoundTransform();
		} catch (e:Dynamic) {
			trace("SoundSample: play - error?!");
		}
	}
	
	private function soundComplete(e:Event):Void 
	{
		dispatchEvent(new Event(Event.SOUND_COMPLETE));
	}
	
	public function stop():Void
	{
		isPlaying = false;
		if (channel != null) channel.stop();
		lastPosition = 0;
		dispatchEvent(new Event(Event.SOUND_COMPLETE));
	}
	
	public function updateDistanceTransform() 
	{
		try 
		{
			/*var pt1:Point = new Point(soundPosition.x, soundPosition.y);
			if (soundPosition is DisplayObject) pt1 = DisplayObject(soundPosition).parent.localToGlobal(pt1);
			var pt2:Point = new Point(listenerPosition.x, listenerPosition.y);
			if (listenerPosition is DisplayObject) pt2 = DisplayObject(soundPosition).parent.localToGlobal(pt2);
			
			p1.x = pt1.x;
			p1.y = pt1.y;
			p2.x = pt2.x;
			p2.y = pt2.y;*/
			
			p1.x = soundPosition.x;
			p1.y = soundPosition.y;
			p2.x = listenerPosition.x;
			p2.y = listenerPosition.y;
			
			var volume:Float = (Point.distance(p1, p2) - volumeRangeMin) / (volumeRangeMax - volumeRangeMin);
			if (volume > 1) volume = 1;
			if (volume < 0) volume = 0;
			volume = 1 - volume;
			volume *= soundTransform.volume;
			distanceSoundTransform.volume = volume;
			//trace(sound, volume, Point.distance(p1, p2));
			
			if (doPanning)
			{
				var pan = (Math.abs(soundPosition.x - listenerPosition.x) - panRangeMin) / (panRangeMax - panRangeMin);
				if (pan > 1) pan = 1;
				if (pan < 0) pan = 0;
				pan *= soundPosition.x > listenerPosition.x ? 1: -1;
				distanceSoundTransform.pan = pan * panAmount;
			}
			
			updateSoundTransform();
		}catch(e:Dynamic){
			//trace("SoundSample: updateDistanceTransform error");
		}
	}
	
	public function updateSoundTransform() 
	{
		if (channel != null) 
		{
			var volume:Float = soundManager.soundTransform.volume * soundTransform.volume * distanceSoundTransform.volume;
			var pan:Float = ((soundManager.soundTransform.pan + 1) * (soundTransform.pan + 1) * (distanceSoundTransform.pan +1) - 1)* panAmount;
			channel.soundTransform = new SoundTransform(volume, pan);
		}
	}
	
	public function destroy() 
	{
		if (channel != null) {
			channel.removeEventListener(Event.SOUND_COMPLETE, soundComplete);
			if (onComplete != null) channel.removeEventListener(Event.SOUND_COMPLETE, onComplete);
		}
		stop();
		soundManager.removeDistanceTransform(this);
		
		listenerPosition = null;
		soundPosition = null;
	}
	
}