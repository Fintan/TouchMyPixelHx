package com.touchmypixel.sound 
{

	import caurina.transitions.Tweener;
	import flash.events.Event;
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import flash.media.SoundTransform;
	import flash.utils.clearTimeout;
	import flash.utils.Dictionary;
	import flash.utils.setTimeout;
	import flash.utils.getDefinitionByName;
	import flash.utils.getQualifiedClassName;
	
	public class SoundManager
	{
		private static var cache:Dictionary = new Dictionary(true);
		
		public var maxSounds:Number = 9999;
		public var minInterval:Number = 0;
		public var soundTransform:SoundTransform = new SoundTransform();
		
		var playingSounds:Dictionary = new Dictionary(true);
		var playingSoundsCount:int = 0;
		
		var lastPlayTime:Number = 0;
		private var distanceSounds:Dictionary = new Dictionary(true);
		private var delayTimeouts:Dictionary = new Dictionary(true);
		
		public function SoundManager(minInterval:Number=0, maxSounds:int=int.MAX_VALUE, volume:Number=1, pan:Number=0)
		{
			this.minInterval = minInterval;
			this.maxSounds = maxSounds;
			this.soundTransform.volume = volume;
			this.soundTransform.pan = pan;
		}
		
		public function playWithDefault(sound:Object, defaultSound:Object, delay:Number = 0, startOffset:Number = 0, loops:Number = 0, soundTransform=null, onComplete:Function = null, force:Boolean=false):SoundSample
		{
			var s = play(sound, delay, startOffset, loops, soundTransform, onComplete, force);
			if (!s)
			{
				s = play(defaultSound, delay, startOffset, loops, soundTransform, onComplete, force);
			}
			return s;
		}
		
		public function play(sound:Object, delay:Number = 0, startOffset:Number = 0, loops:Number = 0, soundTransform=null, onComplete:Function = null, force:Boolean=false):SoundSample
		{
			var soundObject:Sound = getSound(sound);

			if (soundObject)
			{
				var sample:SoundSample = sample = new SoundSample(this, soundObject, startOffset, loops, soundTransform, onComplete);
				
				if (delay)
					delayTimeouts[sample] = setTimeout(doPlay, delay, sample, force);
				else 
					return doPlay(sample, force);
					
				return sample
			} else {
				return null;
			}
		}
		
		/* HELPERS */
		
		public function force(sound:Object, delay:Number = 0, startOffset:Number = 0, loops:Number = 0, soundTransform=null, onComplete:Function = null):SoundSample
		{
			return play(sound, delay, startOffset, loops, soundTransform, onComplete, true);
		}
		
		public function playRepeated(sound:Object, delay:Number = 0, force:Boolean = false, soundTransform=null):SoundSample
		{
			return play(sound, delay, 0, 9999999999, soundTransform, null, force)
		}
		
		public function playRandomWithDefault(sound:Array, defaultSound:Object, delay:Number = 0, startOffset:Number = 0, loops:Number = 0, soundTransform=null, onComplete:Function = null, force:Boolean=false):SoundSample
		{
			var s = playRandom(sound, delay, startOffset, loops, soundTransform, onComplete);
			if (!s)
			{
				s = play(defaultSound, delay, startOffset, loops, soundTransform, onComplete);
			}
			return s;
		}
		
		public function playRandom(sounds:Array, delay:Number = 0, startOffset:Number=0, loops:Number = 0, soundTransform=null, onComplete:Function=null ):SoundSample
		{
			var sound = sounds[Math.floor(Math.random() * sounds.length)];
			return play(sound, delay, 9999999999, loops, soundTransform, onComplete, false)
		}
		
		public function forceRandom(sounds:Array, delay:Number = 0, startOffset:Number=0, loops:Number = 0, soundTransform=null, onComplete:Function=null ):SoundSample
		{
			var sound = sounds[Math.floor(Math.random() * sounds.length)];
			return force(sound, delay, startOffset, loops, soundTransform, onComplete);
		}
		
		private function fadeTween():void
		{
			for (var sample in playingSounds) {
				sample.updateSoundTransform();
			}
		}
		
		public function fadeOut(time:Number=2, stopOnComplete:Boolean = false):void
		{
			fadeToVolume(0, time, stopOnComplete);
		}
		
		public function fadeIn(time:Number=2):void
		{
			fadeToVolume(1, time);
		}
		
		/*public function pause():void
		{
			for each(var sample:SoundSample in playingSounds) 
				sample.pause();
		}
		
		public function unpause():void
		{
			for each(var sample:SoundSample in playingSounds)
				sample.resume();
		}*/
		
		
		public function addDistanceTransform(sample:SoundSample, soundPosition:Object, listenerPosition:Object, volumeRangeMin:Number, volumeRangeMax:Number, panRangeMin:Number=NaN, panRangeMax:Number=NaN, panAmount:Number=1):void
		{
			distanceSounds[sample] = 1;
			sample.soundPosition = soundPosition;
			sample.listenerPosition = listenerPosition;
			sample.volumeRangeMin = volumeRangeMin;
			sample.volumeRangeMax = volumeRangeMax;
			sample.doPanning = (!isNaN(panRangeMin) && !isNaN(panRangeMax))
			sample.panRangeMin = panRangeMin;
			sample.panRangeMax = panRangeMax;
			sample.panAmount = panAmount;
			sample.updateDistanceTransform();
		}
		
		public function removeDistanceTransform(sample):void
		{
			distanceSounds[sample] = null;
			delete distanceSounds[sample];
		}
		
		public function updateDistanceSounds(e:*):void
		{
			for(var sample:* in distanceSounds)
			{
				if(sample is SoundSample) sample.updateDistanceTransform();
			}
		}
		
		public function stopAllSounds():void
		{
			for(var sample in playingSounds){
				sample.destroy();
				distanceSounds = new Dictionary(true);
				delayTimeouts = new Dictionary(true);
			}
		}
		
		public function fadeToVolume(volume:Number, time:Number, stopOnComplete:Boolean = false):void
		{
			var tP:Object = { volume:volume, onUpdate:fadeTween, time:time, transition:"linear" };
			if (stopOnComplete) tP.onComplete = stopAllSounds;
			Tweener.addTween(soundTransform,  tP);
		}
		
		/* ********** */
		
		private function doPlay(sample:SoundSample, force:Boolean=false):SoundSample
		{
			if (canPlay() || force)
			{				
				sample.play();
				
				if (sample.channel)
				{
					sample.addEventListener(Event.SOUND_COMPLETE, soundComplete, false, 0, false);
					
					playingSounds[sample] = 1;
					playingSoundsCount++;
					lastPlayTime = new Date().getTime();
				}
			} else {
				sample.destroy();
			}
			return sample;
		}
		
		function getSound(sound:*) :Sound
		{
			var snd:Sound;
			if (sound == null) {
				trace("SOUND NULL ERROR");
				return null;
			}
			
			if (sound is String)
			{
				if (cache[sound] != null)
				{
					snd = cache[sound as String];
				} else {
					
					var c;
					try
					{
						c = getDefinitionByName(sound as String)
						snd = cache[sound as String] = new c() as Sound;
					} catch (e){}
				}
			}
			else if (sound is Class)
			{
				snd = new (sound)();
			} 
			else if (sound is Sound)
			{
				snd = sound;
			} 
			
			if (snd == null) {
				trace("SoundManager: null sound - " + sound);
				return null;
			}
			
			return snd;
		}
		
		public function canPlay():Boolean
		{
			var interval = new Date().getTime() - lastPlayTime;
			return playingSoundsCount < maxSounds && minInterval <= interval
		}
		
		private function soundComplete(e:Event):void 
		{
			var sample:SoundSample = e.target as SoundSample;
			
			sample.removeEventListener(Event.SOUND_COMPLETE, soundComplete);
			
			if (sample) {
				clearTimeout(delayTimeouts[sample]);
				
				delete delayTimeouts[sample];
				delete distanceSounds[sample];
				
				if (playingSounds[sample]) playingSoundsCount--;
				delete playingSounds[sample];
				
				sample.destroy();
			}else {
				trace("soundComplete: no sample");
			}
		}
	}
}