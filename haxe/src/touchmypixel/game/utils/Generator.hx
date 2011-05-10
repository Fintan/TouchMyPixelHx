/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.utils;
import touchmypixel.game.ds.WeightedSet;
import hxs.Signal1;

#if cpp
import nme.Timer;
#else
import haxe.Timer;
#end

class Generator
{
	var timer:Timer;
	
	public var args:Array<Dynamic>;
	
	public var interval:Float;
	public var variation:Float;
	
	var items:WeightedSet<Dynamic>;
	
	public var onGenerateItem:Signal1<Dynamic>;
	
	public function new(?generateWithArgs:Array<Dynamic>) 
	{
		args = generateWithArgs;
		
		interval = 1000;
		variation = 200;
		
		items = new WeightedSet();
		
		onGenerateItem = new Signal1(this);
	}
	
	public function add(className:String, weight:Float)
	{
		this.items.addItem(className, weight);
	}
	
	public function addMultiple(items:Array < Array < Dynamic >> )
	{
		for (i in items)
			this.items.addItem(i[0], i[1]);
	}
	
	public function removeAll()
	{
		this.items = new WeightedSet();
	}
	
	public function start()
	{
		generateItem();
	}
	
	public function stop()
	{
		if (timer != null)
			timer.stop();
	}
	
	public function generateItem()
	{

		if (items.length() == 0) 
			return;
		
		var item = items.getRandom();
		
		try {
			
			var instance = Type.createInstance(Type.resolveClass(item), args);
			onGenerateItem.dispatch(instance);
		} catch (e:Dynamic)
		{
			trace("Generator Error Instantiating: " + item);
			trace(e);
		}

		timer = Timer.delay(generateItem, Std.int(interval + Math.random() * variation));
	}
	
	public function destroy()
	{
		//onGenerateItem.destroy();
	}
}