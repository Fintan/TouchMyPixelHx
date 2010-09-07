package touchmypixel.tween;
import feffects.easing.Cubic;
import feffects.Tween;
import haxe.Timer;
/**
 * ...
 * @author Tonypee
 */

class Tweens
{
	public static var delayedTweens:ObjectHash<Timer,Tween> = new ObjectHash();
	
	public static var get:Dynamic->String->Dynamic = Reflect.field;
	public static var set:Dynamic->String->Dynamic->Void = Reflect.setField;
	
	public static function addTweens(object:Dynamic, properties:Dynamic, settings:Dynamic):Void
	{
		var time = get(settings, "time") != null ? get(settings, "time") : 1000;
		var easing = get(settings, "easing") != null ? get(settings, "easing") : Cubic.easeOut;
		var delay = get(settings, "delay");
		
		var isFirst:Bool = true;
		var propertyFields = Reflect.fields(properties);
		for (p in propertyFields)
		{
			var init = get(object, p);
			
			var tween:Tween = new Tween(init, get(properties, p), time, object, p, easing);	
			
			if(isFirst)
				tween.setTweenHandlers(get(settings, "onUpdate"), get(settings, "onEnd"));
			
			if (delay == null)
				tween.start();
			else 
				Tweens.delay(tween, delay);
				
			isFirst = false;
		}
	}
	
	public static function removeTweens(object:Dynamic)
	{
		var tweens = Tween.getActiveTweens();
		for (t in tweens)
			if (untyped t.obj == object)
				t.stop();
		
		for (k in delayedTweens.keys())
			if (untyped delayedTweens.get(k).obj == object)
				k.stop();
	}
	
	public static function delay(tween:Tween, time:Int)
	{
		var timer = new Timer(time);
		timer.run = function()
		{
			delayedTweens.remove(timer);
			
			tween.start();
			
			timer.stop();
		}
		
		delayedTweens.set( timer, tween );
	}
}