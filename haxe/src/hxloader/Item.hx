/**
 * ...
 * @author Tony Polinelli
 */

package hxloader;

import flash.display.Loader;
import flash.events.Event;
import flash.events.IOErrorEvent;
import flash.events.ProgressEvent;
import flash.net.URLLoader;
import flash.net.URLLoaderDataFormat;
import flash.net.URLRequest;
import flash.net.URLVariables;
import flash.system.LoaderContext;
import flash.utils.ByteArray;
import hxsignals.AS3Signal;
import hxsignals.Signal;
import hxsignals.Signal1;

class Item
{
	public var type:ItemType;
	public var id:String;
	public var urlRequest:URLRequest;
	
	public var data:Dynamic;
	
	public var onStart:Signal;
	public var onLoaderComplete:AS3Signal<Event>;
	public var onLoaderProgress:AS3Signal<ProgressEvent>;
	public var onLoaderError:AS3Signal<IOErrorEvent>;

	public var active:Bool;
	public var progress:Float;
	
	public var remainingTries:Int;
	public var preventCache:Bool;
	public var variables:URLVariables;
	public var loaderContext:LoaderContext;
	
	
	public function new(type:ItemType, request:URLRequest, ?id:String, ?options:Dynamic)
	{
		if (options == null) options = { };
		
		this.type = type;
		this.urlRequest = request;
		this.id = id != null ? id : request.url;
		
		progress = 0;
		onStart = new Signal();
		
		remainingTries = options.maxTries != null ? options.maxTries : 3;
		preventCache = options.preventCache != null ? options.preventCache : false;
		loaderContext = options.loaderContext != null ? options.loaderContext : null;

		if (variables == null)
			variables = new URLVariables();
	}
	
	public function start()
	{
		remainingTries--;
		active = true;
		onStart.dispatch();
	}
	
	private function loaderProgress(e:ProgressEvent):Void
	{
		progress = e.bytesLoaded / e.bytesTotal;
	}
	
	public function loaderComplete(_)
	{
		active = false;
	}
	
	public function getData():Dynamic
	{
		return untyped switch(type)
		{
			case ItemType.XML: Xml.parse(data);
			default: data;
		}
	}
	
	public static function create(request:URLRequest, ?id:String, ?options:Dynamic):Item
	{
		var ext = request.url.substr(request.url.lastIndexOf('.') + 1);
		
		if (options != null)
			if (options.asBinary)
				return new URLLoaderItem(ItemType.BINARY, request, id, options);
				
		return untyped switch(ext.toUpperCase())
		{
			case "SWF": new LoaderItem(ItemType.SWF, request, id, options);
			case "JPG", "JPEG", "GIF", "PNG": new LoaderItem(ItemType.IMAGE, request, id, options);
			case "TXT", "HTML", "HTM", "PHP", "ASP", "ASPX": new URLLoaderItem(ItemType.TEXT, request, id, options);
			case "XML", "RSS", "": new URLLoaderItem(ItemType.XML, request, id, options);
			case "MP3", "M4A": new URLLoaderItem(ItemType.SOUND, request, id, options);
			default: new URLLoaderItem(ItemType.BINARY, request, id, options);
		}
	}
}

class LoaderItem extends Item
{
	public var loader:Loader;
	
	public function new(type:ItemType, request:URLRequest, ?id:String, ?options:Dynamic)
	{
		super(type, request, id, options);
		
		loader = new Loader();
		
		onLoaderComplete = new AS3Signal(loader.contentLoaderInfo, Event.COMPLETE);
		onLoaderProgress = new AS3Signal(loader.contentLoaderInfo, ProgressEvent.PROGRESS);
		onLoaderError = new AS3Signal(loader.contentLoaderInfo, IOErrorEvent.IO_ERROR);
		onLoaderComplete.add(loaderComplete,10);
		onLoaderProgress.add(loaderProgress,10);
	}
	
	override public function start()
	{
		super.start();
		
		if (preventCache)
			variables.preventCache = ""+Math.floor(Math.random() * 10000000000);
		if(variables.toString().length > 1)
			urlRequest.data = variables;
		
		loader.load(urlRequest, loaderContext);
	}
	
	override public function loaderComplete(_)
	{
		super.loaderComplete(_);
		data = loader.content;
	}
}

class URLLoaderItem extends Item
{
	public var loader:URLLoader;
	
	public function new(type:ItemType, request:URLRequest, ?id:String, ?options:Dynamic)
	{
		super(type, request, id, options);
		
		loader = new URLLoader();
		
		onLoaderComplete = new AS3Signal(loader, Event.COMPLETE);
		onLoaderProgress = new AS3Signal(loader, ProgressEvent.PROGRESS);
		onLoaderError = new AS3Signal(loader, IOErrorEvent.IO_ERROR);
		onLoaderComplete.add(loaderComplete,10);
		onLoaderProgress.add(loaderProgress, 10);
	}
	
	override public function start()
	{
		super.start();
		
		if (preventCache)
			variables.preventCache = ""+Math.floor(Math.random() * 10000000000);
		if(variables.toString().length > 1)
			urlRequest.data = variables;
		if (type == ItemType.BINARY)
			loader.dataFormat = URLLoaderDataFormat.BINARY;
			
		loader.load(urlRequest);
	}
	
	override public function loaderComplete(_)
	{
		super.loaderComplete(_);
		data = loader.data;
	}
}

enum ItemType
{
	SWF;
	IMAGE;
	TEXT;
	XML;
	SOUND;
	BINARY;
}