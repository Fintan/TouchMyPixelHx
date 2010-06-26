package com.touchmypixel.sound 
{
	import flash.display.DisplayObject;
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.geom.Point;
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import flash.media.SoundTransform;
	
	public class SoundSample extends EventDispatcher
	{
		public var soundManager:SoundManager;
		
		public var sound:Sound;
		public var channel:SoundChannel;
		public var soundTransform:SoundTransform = new SoundTransform();
		public var initialOffset:Number;
		public var initialLoopsRemaining:Number;
		public var loopsRemaining:Number;
		
		public var soundPosition:Object;
		public var listenerPosition:Object;
		public var volumeRangeMin:Number = 0;
		public var volumeRangeMax:Number = 1000;
		public var doPanning:Boolean = false;
		public var panRangeMin:Number = 0;
		public var panRangeMax:Number = 1000;
		public var panAmount:Number = 1;
		
		public var distanceSoundTransform:SoundTransform = new SoundTransform();
		
		private var onComplete:Function;
		
		var p1:Point = new Point();
		var p2:Point = new Point();
		var lastPosition:Number;
		
		public var isPlaying:Boolean = false;
		
		public function SoundSample( soundManager:SoundManager, sound:Sound, startOffset:Number = 0, loops:Number = 0, soundTransform:SoundTransform = null, onComplete:Function=null) 
		{
			this.soundManager = soundManager;
			this.sound = sound;
			this.initialOffset = startOffset;
			this.initialLoopsRemaining = loops;
			this.loopsRemaining = loops;
			if (soundTransform) this.soundTransform = soundTransform;
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
		
		public function play() 
		{
			try {
				isPlaying = true;
				
				if (channel != null) {
					channel.stop();
					channel.removeEventListener(Event.SOUND_COMPLETE, onComplete);
				}
				
				channel = sound.play(initialOffset, initialLoopsRemaining);
				
				channel.addEventListener(Event.SOUND_COMPLETE, soundComplete, false, 0, false);
				if (onComplete is Function) channel.addEventListener(Event.SOUND_COMPLETE, onComplete, false, 0, true);
				
				updateSoundTransform();
			} catch (e:*) {
				trace("SoundSample: play - error?!");
			}
		}
		
		private function soundComplete(e:Event):void 
		{
			dispatchEvent(new Event(Event.SOUND_COMPLETE));
		}
		
		public function stop()
		{
			isPlaying = false;
			if (channel) channel.stop();
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
				
				var volume:Number = (Point.distance(p1, p2) - volumeRangeMin) / (volumeRangeMax - volumeRangeMin);
				if (volume > 1) volume = 1;
				if (volume < 0) volume = 0;
				volume = 1 - volume;
				volume *= soundTransform.volume;
				distanceSoundTransform.volume = volume;
				//trace(sound, volume, Point.distance(p1, p2));
				
				if (doPanning)
				{
					var pan = (Math.abs(soundPosition.x - listenerPosition.x)-panRangeMin) / (panRangeMax-panRangeMin)
					if (pan > 1) pan = 1;
					if (pan < 0) pan = 0;
					pan *= soundPosition.x > listenerPosition.x ? 1: -1;
					distanceSoundTransform.pan = pan * panAmount;
				}
				
				updateSoundTransform();
			}catch(e:*){
				//trace("SoundSample: updateDistanceTransform error");
			}
		}
		
		public function updateSoundTransform() 
		{
			if (channel) 
			{
				var volume:Number = soundManager.soundTransform.volume * soundTransform.volume * distanceSoundTransform.volume;
				var pan:Number = ((soundManager.soundTransform.pan + 1) * (soundTransform.pan + 1) * (distanceSoundTransform.pan +1) - 1)* panAmount;
				channel.soundTransform = new SoundTransform(volume, pan);
			}
		}
		
		public function destroy() 
		{
			if (channel) {
				channel.removeEventListener(Event.SOUND_COMPLETE, soundComplete);
				if (onComplete != null) channel.removeEventListener(Event.SOUND_COMPLETE, onComplete);
			}
			stop();
			soundManager.removeDistanceTransform(this);
			
			listenerPosition = null;
			soundPosition = null;
		}
		
	}
}