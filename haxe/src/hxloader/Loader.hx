/**
 * ...
 * @author Tony Polinelli
 
 
 
	loader= new Loader();
	loader.add("index.html", "index");
	loader.add("myXml.xml", {maxTries:20, preventCache:true});
	loader.add("image1.jpg", "image1");
	loader.add("image2.jpg", "image2", {loaderContext:new LoaderContext()});
	loader.add("image3.jpg");
	
	loader.onItemComplete.add(itemComplete);
	loader.onItemProgress.add(itemProgress);
	loader.onItemStart.add(itemStart);
	
	loader.onStart.add(start);
	loader.onProgress.add(progress);
	loader.onComplete.add(complete);
	loader.onError.add(error);
	
	loader.start();
 
	function complete()
	{
		trace("all complete");
		
		var image1 = loader.get("image1");
		addChild(image1);
		
		var image2 = loader.getAs("image2", Bitmap);
		addChild(image2);
		
		var xml = getAs("myXml.xml", Xml);
		trace(xml.firstChild().firstElement());
	}
	
	... etc ...
 
 */

package hxloader;

import flash.events.IOErrorEvent;
import flash.events.ProgressEvent;
import flash.net.URLRequest;
import hxs.extras.AS3Signal;
import hxs.Signal;
import hxs.Signal1;
import hxs.Signal2;

class Loader 
{
	public static var instances:Hash<Loader> = new Hash();
	
	public var id:String;
	
	public var maxSimultaneousLoads:Int;
	
	public var onStart:Signal;
	public var onProgress:Signal1<Float>;
	public var onComplete:Signal;
	public var onError:Signal1<IOErrorEvent>;

	public var onItemStart:Signal1<Item>;
	public var onItemProgress:Signal2<Item, Float>;
	public var onItemComplete:Signal1<Item>;
	
	public var items:Hash<Item>;
	public var queue:Queue<Item>;
	
	public var progress:Float;
	public var loadingItems:List<Item>;
	
	public function new(?id:String) 
	{
		this.id = id;
		if (id != null) instances.set(id, this);
		
		maxSimultaneousLoads = 3;
		items = new Hash();
		queue = new Queue();
		loadingItems = new List();
		
		onStart = new Signal();
		onProgress = new Signal1();
		onComplete = new Signal();
		onError = new Signal1();
		onItemStart = new Signal1();
		onItemProgress = new Signal2();
		onItemComplete = new Signal1();
	}
	
	public function add(url:String, ?id:String, ?options:Dynamic):Item
	{
		return addURLRequest(new URLRequest(url), id, options);
	}

	public function addURLRequest(request:URLRequest, ?id:String, ?options:Dynamic):Item
	{
		if (id == null) id = request.url;
		if (options == null) options = {};
		
		var ths = this;
		var item = Item.create(request, id, options);
		
		item.onStart.add(function() { ths.itemStart(item); } );
		item.onLoaderComplete.add(function(_) { ths.itemComplete(item); } ); 
		item.onLoaderProgress.add(function(e:ProgressEvent) { ths.itemProgress(e, item); } ); 
		item.onLoaderError.add(function(e:IOErrorEvent) { ths.itemError(e, item); } ); 
		
		items.set(id, item);
		queue.add(item, (options.priority != null) ? options.priority : 0);
		
		return item;
	}
	
	public function get(id:String):Dynamic
	{
		return items.get(id).getData();
	}
	
	public function getAs<T>(id:String, type:Class<T>):T
	{
		return cast get(id);
	}
	
	public function start()
	{
		onStart.dispatch();
		
		for(i in 0... maxSimultaneousLoads)
			loadNext();
	}
	
	function loadNext()
	{
		if (queue.length == 0 && loadingItems.length == 0)
		{
			onComplete.dispatch();
		}
		else 
		{
			if (queue.hasNext())
			{
				var item = queue.shift();
				loadingItems.add(item);
				item.start();
			}
		}
	}
	
	function itemStart(item:Item)
	{
		onItemStart.dispatch(item);
	}
	
	function itemComplete(item:Item)
	{
		onItemComplete.dispatch(item);
		
		loadingItems.remove(item);
		
		if(loadingItems.length < maxSimultaneousLoads)
			loadNext();
	}
	
	function itemProgress(progressEvent:ProgressEvent, item:Item)
	{
		progress = 0;
		var count = Lambda.count(items);
		for (item in items)
			progress += item.progress / count;
		
		onItemProgress.dispatch(item, item.progress);
		onProgress.dispatch(progress);
	}
	
	function itemError(errorEvent:IOErrorEvent, item:Item)
	{
		if(item.remainingTries > 0)
		{
			item.start();
		} else {
			onError.dispatch(errorEvent);
			queue.remove(item);
			loadingItems.remove(item);
			loadNext();
		}
	}
	
	public static function getInstance(id:String)
	{
		return instances.get(id);
	}
	
}
