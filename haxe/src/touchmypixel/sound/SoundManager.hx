package touchmypixel.sound ;

import caurina.transitions.Tweener;
import flash.events.Event;
import flash.media.Sound;
import flash.media.SoundChannel;
import flash.media.SoundTransform;
import flash.net.URLRequest;
import flash.utils.TypedDictionary;

// timeouts
import touchmypixel.utils.GlobalTimer;

typedef Locatable2d = {
	public var x:Float;
	public var y:Float;
}

// getDefinitionByName = Type.getClass

class SoundManager
{
	private static var cache:Hash<Sound>;
	
	public var maxSounds:Int;
	public var minInterval:Int;
	public var soundTransform:SoundTransform;
	
	var playingSounds:TypedDictionary<SoundSample, Int>;
	var playingSoundsCount:Int;
	
	var lastPlayTime:Float;
	private var distanceSounds:TypedDictionary<SoundSample, Int>;
	private var delayTimeouts:TypedDictionary<SoundSample, Int>;
	private var faderSoundTransformObject:Dynamic;
	
	public function new(?minInterval:Int = 0, ?maxSounds:Int = 32, ?volume:Int = 1, ?pan:Int = 0)
	{
		cache = new Hash();

		soundTransform = new SoundTransform();
		
		playingSounds = new TypedDictionary(true);
		playingSoundsCount = 0;
		
		lastPlayTime = 0;
		distanceSounds = new TypedDictionary(true);
		delayTimeouts = new TypedDictionary(true);
		
		this.minInterval = minInterval;
		this.maxSounds = maxSounds;
		this.soundTransform.volume = volume;
		this.soundTransform.pan = pan;
	}
	
	public function play(sound:Dynamic, ?delay:Int = 0, ?startOffset:Int = 0, ?loops:Int = 0, ?soundTransform:SoundTransform = null, ?onComplete:Event -> Void = null, ?force:Bool = false):SoundSample
	{
		var soundObject:Sound = getSound(sound);

		if (soundObject != null)
		{
			var sample:SoundSample = new SoundSample(this, soundObject, startOffset, loops, soundTransform, onComplete);
			
			
			if (delay != 0)
				delayTimeouts.set(sample, GlobalTimer.setTimeout(doPlay, delay, [sample, force]));
			else 
				return doPlay(sample, force);
				
			return sample;
		} else {
			return null;
		}
	}
	
	/* HELPERS */
	
	public function getHolder()
	{
		return new SoundSample(this, new Sound());
	}
	
	public function force(sound:Dynamic, ?delay:Int = 0, ?startOffset:Int = 0, ?loops:Int = 0, ?soundTransform:SoundTransform = null, ?onComplete:Event -> Void = null):SoundSample
	{
		return play(sound, delay, startOffset, loops, soundTransform, onComplete, true);
	}
	
	public function playRepeated(sound:Dynamic, ?delay:Int = 0, ?force:Bool = false, ?soundTransform:SoundTransform = null):SoundSample
	{
		return play(sound, delay, 0, 0xffffff, soundTransform, null, force);
	}
	
	public function playRandom(sounds:Array<Dynamic>, delay:Int = 0, startOffset:Int = 0, loops:Int = 0, soundTransform:SoundTransform = null, onComplete:Event -> Void = null ):SoundSample
	{
		var sound:Dynamic = sounds[Math.floor(Math.random() * sounds.length)];
		return play(sound, delay, 0xffffff, loops, soundTransform, onComplete, false);
	}
	
	public function forceRandom(sounds:Array<Dynamic>, ?delay:Int = 0, ?startOffset:Int = 0, ?loops:Int = 0, ?soundTransform:SoundTransform = null, ?onComplete:Event -> Void = null ):SoundSample
	{
		var sound = sounds[Math.floor(Math.random() * sounds.length)];
		return force(sound, delay, startOffset, loops, soundTransform, onComplete);
	}
	
	private function fadeTween():Void
	{
		for (sample in playingSounds) {
			sample.updateSoundTransform();
		}
	}
	
	public function fadeOut(?time:Float = 2, ?stopOnComplete:Bool = false):Void
	{
		fadeToVolume(0, time, stopOnComplete);
	}
	
	public function fadeIn(?time:Float = 2):Void
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
	
	public function addDistanceTransform(sample:SoundSample, soundPosition:Locatable2d, listenerPosition:Locatable2d, volumeRangeMin:Float, volumeRangeMax:Float, ?panRangeMin:Float = null, ?panRangeMax:Float = null, ?panAmount:Float = 1):Void
	{
		distanceSounds.set(sample, 1);
		sample.soundPosition = soundPosition;
		sample.listenerPosition = listenerPosition;
		sample.volumeRangeMin = volumeRangeMin;
		sample.volumeRangeMax = volumeRangeMax;
		sample.doPanning = (!Math.isNaN(panRangeMin) && !Math.isNaN(panRangeMax));
		sample.panRangeMin = panRangeMin;
		sample.panRangeMax = panRangeMax;
		sample.panAmount = panAmount;
		sample.updateDistanceTransform();
	}
	
	public function removeDistanceTransform(sample:SoundSample):Void
	{
		distanceSounds.delete(sample);
	}
	
	public function updateDistanceSounds(?e:Dynamic = null):Void
	{
		var sample:SoundSample;
		for(sample in distanceSounds)
			sample.updateDistanceTransform();
	}
	
	public function stopAllSounds():Void
	{
		var sample:SoundSample;
		for(sample in playingSounds){
			sample.destroy();
			distanceSounds = new TypedDictionary(true);
			delayTimeouts = new TypedDictionary(true);
		}
	}
	
	public function fadeToVolume(volume:Float, seconds:Float, ?stopOnComplete:Bool = false):Void
	{
		if (faderSoundTransformObject != null) Tweener.removeTweens(faderSoundTransformObject);
		
		faderSoundTransformObject = { volume:volume, onUpdate:fadeTween, time:seconds, transition:"linear" };
		if (stopOnComplete) faderSoundTransformObject.onComplete = stopAllSounds;
		
		Tweener.addTween(soundTransform,  faderSoundTransformObject);
	}
	
	/* ********** */
	
	private function doPlay(sample:SoundSample, ?force:Bool = false):SoundSample
	{
		if (canPlay() || force)
		{				
			sample.play();
			
			if (sample.channel != null)
			{
				sample.addEventListener(Event.SOUND_COMPLETE, soundComplete, false, 0, false);
				
				playingSounds.set(sample, 1);
				playingSoundsCount++;
				lastPlayTime = Date.now().getTime();
			}
		} else {
			sample.destroy();
		}
		return sample;
	}
	
	function getSound(sound:Dynamic):Sound
	{
		var snd:Sound = null;
		if (sound == null) {
			trace("SOUND NULL ERROR");
			return null;
		}
		
		if (Std.is(sound, URLRequest))
		{
			snd = new Sound(cast(sound, URLRequest));
		}
		if (Std.is(sound, String))
		{
			if (cache.exists(sound))
			{
				snd = cache.get(cast(sound, String));
			} else {
				
				var c;
				try
				{
					c = Type.resolveClass(sound);
					snd = cast Type.createInstance(c, []);
					cache.set(cast(sound, String), snd);
				} catch (e:Dynamic){}
			}
		}
		if (Std.is(sound, Class))
		{
			snd = cast Type.createInstance(sound, []);
		} 
		if (Std.is(sound, Sound))
		{
			snd = sound;
		} 
		
		if (snd == null) {
			trace("SoundManager: null sound - " + sound);
			return null;
		}
		
		return snd;
	}
	
	public function canPlay():Bool
	{
		var interval = Date.now().getTime() - lastPlayTime;
		return playingSoundsCount < maxSounds && minInterval <= interval;
	}
	
	private function soundComplete(?e:Event = null):Void 
	{
		var sample:SoundSample = cast(e.target, SoundSample);
		
		sample.removeEventListener(Event.SOUND_COMPLETE, soundComplete);
		
		if (sample != null) {
			if (delayTimeouts.exists(sample))
				GlobalTimer.clearTimeout(delayTimeouts.get(sample));
			
			delayTimeouts.delete(sample);
			distanceSounds.delete(sample);
			
			if (playingSounds.get(sample) != null) playingSoundsCount--;
			playingSounds.delete(sample);
			
			sample.destroy();
		}else {
			trace("soundComplete: no sample");
		}
	}
}