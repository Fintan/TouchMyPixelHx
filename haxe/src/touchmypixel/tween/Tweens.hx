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
	
	public static function addTweens(object:Dynamic, properties:Dynamic, settings:Dynamic):Void
	{
		var time = Reflect.field(settings, "time") != null ? Reflect.field(settings, "time") : 1;
		var easing = Reflect.field(settings, "easing") != null ? Reflect.field(settings, "easing") : Cubic.easeOut;
		var delay:Dynamic =Reflect.field(settings, "delay");
		
		var isFirst:Bool = true;
		var propertyFields = Reflect.fields(properties);
		for (p in propertyFields)
		{
			var init = Reflect.field(object, p);
			
			var tween:Tween = new Tween(init, Reflect.field(properties, p), time*1000, object, p, easing);	
			
			if(isFirst)
				tween.setTweenHandlers(Reflect.field(settings, "onUpdate"), Reflect.field(settings, "onEnd"));
			
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
			delayedTweens.delete(timer);
			
			tween.start();
			
			timer.stop();
		}
		
		delayedTweens.set( timer, tween );
	}
}