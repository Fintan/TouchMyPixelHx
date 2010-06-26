/**
 * ...
 * @author Tony Polinelli
 */

package ;
import flash.display.Sprite;
import flash.events.Event;
import flash.events.IOErrorEvent;
import flash.events.ProgressEvent;
import flash.Lib;
import flash.system.LoaderContext;
import flash.utils.ByteArray;
import hxloader.Item;
import hxloader.Loader;
import hxloader.Queue;

class Main extends Sprite
{
	private var loader:Loader;
	private var test:Int;

	public static function main()
	{
		Lib.current.addChild(new Main());
	}
	
	public function new()
	{
		super();
		
		var list = new haxe.FastList<String>();
		list.add("sds");
		list.add("ssdgsdgs");
		
		
		loader = new Loader();
		loader.maxSimultaneousLoads = 2;
		loader.add("index.html", "index");
		loader.add("myXml.xml", "myXml");
		loader.add("image1.jpg", "image1");
		//loader.add("image2.jpg");
		//loader.add("index.html", "index fail", {maxTries:20, preventCache:true}); // due to prevent cache you need to load via server
		//loader.add("image1.jpgxx", "image1 fail", {loaderContext:new LoaderContext()});
		
		loader.onItemComplete.add(itemComplete);
		loader.onItemProgress.add(itemProgress);
		loader.onItemStart.add(itemStart);
		
		loader.onStart.add(start);
		loader.onProgress.add(progress);
		loader.onComplete.add(complete);
		loader.onError.add(error);
		
		loader.start();
		
		
		test = 0;
		switch(getTest())
		{
			case 0:trace("0");
			case 1:trace("1");
			case 2:trace("2");
		}
	
		//queueTest();
	}
	
	private function getTest():Int
	{
		return test++;
	}
	
	private function start():Void
	{
		trace("START");
	}
	
	private function progress(loaded:Float):Void
	{
		trace(loaded);
	}
	
	private function error(error:IOErrorEvent):Void
	{
		trace(error);
	}
	
	private function itemStart(item:Item):Void
	{
		trace("Started: " + item.id);
	}
	
	private function itemProgress(item:Item, p:Float):Void
	{
		//trace("Progress: " + item.id + " - " + p);
	}
	
	private function itemComplete(item:Item):Void
	{
		trace("Completed: " + item.id);
	}
	
	private function complete():Void
	{
		trace("COMPLETE");
		trace(loader.getAs("myXml", Xml).firstChild().firstElement());
	}
	
	/*
	public function queueTest()
	{
		var queue = new Queue<String>();
		queue.add("one",5);
		queue.add("two",2);
		queue.add("three",10);
		var four = queue.add("four",3);
		queue.add("four",-1);
		queue.add("five",2);
		trace(queue.items);
		
		four.priority = 100;
		
		trace(queue.items);
		
		queue.resort();
		
		trace(queue.items);
	}*/
	
}