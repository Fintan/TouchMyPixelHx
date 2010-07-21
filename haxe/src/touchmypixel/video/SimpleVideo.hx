/**
 * ...
 * @author Tonypee
 */
package touchmypixel.video;

import caurina.transitions.Tweener;
import flash.display.Bitmap;
import flash.display.Loader;
import flash.display.MovieClip;
import flash.display.SimpleButton;
import flash.display.Sprite;
import flash.display.StageDisplayState;
import flash.display.StageScaleMode;
import flash.events.AsyncErrorEvent;
import flash.events.Event;
import flash.events.IOErrorEvent;
import flash.events.MouseEvent;
import flash.events.NetStatusEvent;
import flash.events.SecurityErrorEvent;
import flash.geom.Point;
import flash.geom.Rectangle;
import flash.media.Video;
import flash.net.NetConnection;
import flash.net.NetStream;
import flash.net.URLRequest;
import flash.text.TextField;
import haxe.Serializer;
import haxe.Timer;
import hxs.Signal;
import hxs.Signal1;


import flash.display.MovieClip;
import flash.display.Sprite;
import flash.media.Video;

using hxs.shortcuts.as3.Common;

class SimpleVideo extends Sprite
{	
	var w:Int;
	var h:Int;
	
	public var url:String;
	public var video:Video;
	public var netStream:NetStream;
	public var conn:NetConnection;
	public var metaData:MetaData;
	
	public var position:Float;
	public var duration:Float;
	public var progress:Float;
	
	public var isPlaying:Bool;
	public var isBuffering:Bool;
	public var isLoading:Bool;
	
	private var firstBuffer:Bool;
	
	public var onStart:Signal;
	//public var onPause:Signal;
	//public var onUnpause:Signal;
	public var onComplete:Signal;
	
	public var onMetaData:Signal1<MetaData>;
	
	public var onProgress:Signal1<Float>;
	public var onLoadProgress:Signal1<Float>;
	public var onLoadComplete:Signal;
	public var onUnload:Signal;
	
	public var onBufferEmpty:Signal;
	public var onBufferProgress:Signal;
	public var onBufferFull:Signal;
	
	public var onError:Signal1<String>;
	public var loop:Bool;
	
	public function new(w:Int, h:Int) 
	{
		super();
		
		this.w = w;
		this.h = h;
		
		firstBuffer = true;
		position = 0;
		duration = 0;
		progress = 0;
		loop = false;
		
		isPlaying = false;
		isBuffering = false;
		
		conn = new NetConnection();
		conn.addEventListener(NetStatusEvent.NET_STATUS, netStatusHandler);// , false, 0, true);
		conn.addEventListener(IOErrorEvent.IO_ERROR, ioError,false,0,true);
		conn.addEventListener(SecurityErrorEvent.SECURITY_ERROR, netError);// , false, 0, true);
		conn.connect(null);
		
		//addEventListener(Event.ENTER_FRAME, update);
		
		onStart = new Signal(this);
		onComplete = new Signal(this);
		onError = new Signal1(this);
		
		//onPause = new Signal();
		//onUnpause = new Signal();
		//onTogglePause = new Signal();
		//onSeek = new Signal();
		//onLoad = new Signal1();
		//onUnload = new Signal();
		//onMetaData = new Signal1();
		
		onProgress = new Signal1<Float>(this);	
		onLoadProgress = new Signal1<Float>(this);	
		onLoadComplete = new Signal(this);	
		onUnload = new Signal(this);	
		
		onBufferEmpty = new Signal(this);	
		onBufferProgress = new Signal(this);	
		onBufferFull = new Signal(this);
		
		this.onEnterFrame().add(update);
	}
	
	private function update(e:Event):Void 
	{
		if (metaData != null)
		{
			position = netStream.time;
			progress = netStream.time / metaData.duration;
			onProgress.dispatch(progress);
		}
		
		if (isLoading)
		{
			var p:Float = netStream.bytesLoaded / netStream.bytesTotal;
			
			onLoadProgress.dispatch(p);
			
			if (p == 1) 
			{
				onLoadComplete.dispatch();
				isLoading = false;
			}
		}
	}
	
	public function load(url:String, ?beginPaused=false)
	{
		this.url = url;
		
		isLoading = true;
		firstBuffer = true;
		
		this.url = url;
		connectStream();
		
		isPlaying = !beginPaused;
	}
	
	public function unload()
	{
		createVideo();
		
		netStream.close();
		
		onUnload.dispatch();
	}
	
	public function pause()
	{
		isPlaying = false;
		netStream.pause();
	}
	
	public function unpause()
	{
		isPlaying = true;
		netStream.resume();
	}
	
	public function seekPercentage(percentage:Float)
	{
		if (percentage < 0) percentage = 0;
		if (percentage > 1) percentage = 1;
		
		netStream.seek(duration * percentage);
		if (!isPlaying)
			netStream.pause();
	}
	
	public function seek(offset:Float)
	{
		if (offset < 0) offset = 0;
		if (offset > duration) offset = duration;
		
		netStream.seek(offset);
		if (!isPlaying)
			pause();
	}
	
	public function goFullScreen():Void 
	{
		if (stage.displayState == StageDisplayState.NORMAL) {
			
			var p = new Point(x, y);
			p = parent.localToGlobal(p);
			
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.fullScreenSourceRect = new Rectangle(p.x,p.y, video.width, video.height);
			stage.displayState = StageDisplayState.FULL_SCREEN;
			//if(!Application.instance.dev){ try{Application.instance.tracker.trackEvent("Video", "FullScreen - Start");}catch(e:Dynamic){} }
		}else {
			stage.displayState = StageDisplayState.NORMAL;
			//if(!Application.instance.dev){ try{Application.instance.tracker.trackEvent("Video", "FullScreen - End");}catch(e:Dynamic){} }
		}
	}
	
	
	/*****************************************************/
	
	private function ioError(e:IOErrorEvent):Void 
	{
		onError.dispatch(e.text);
	}
	
	private function netError(e:SecurityErrorEvent):Void 
	{
		onError.dispatch(e.text);
	}
	
	private function netStatusHandler(e:NetStatusEvent):Void 
	{
		
		switch (e.info.code) {
			case "NetStream.Play.Start": 
				//trace("video.start");
				if (!isPlaying)
				{
					netStream.pause();
				} 
			case "NetStream.Buffer.Empty":
				//trace("video.Empty");
				isBuffering = true;
				onBufferEmpty.dispatch();
			case "NetStream.Buffer.Full":
				//trace("video.Full");
				isBuffering = false;
				onBufferFull.dispatch();
				
				if (firstBuffer && isPlaying)
				{
					onStart.dispatch();
					firstBuffer = false;
				}
			case "NetConnection.Connect.Success":
				//trace("video.Success");
				connectStream();
			case "NetStream.Play.StreamNotFound":
				//trace("video.StreamNotFound");
				onError.dispatch("StreamNotFound: " + url); 
			case "NetStream.Play.Stop":
				//trace("video.Stop");
				
				if (!loop)
				{
					onComplete.dispatch();
					isPlaying = false;
					isBuffering = false;
				} else {
					netStream.seek(0);
				}
				
		}
	}
	
	private function connectStream():Void
	{
		//if (netStream == null)
		//{
			netStream = new NetStream(conn);
			netStream.addEventListener(NetStatusEvent.NET_STATUS, netStatusHandler);// , false, 0, true);
			netStream.addEventListener(AsyncErrorEvent.ASYNC_ERROR, asyncErrorHandler);// , false, 0, true);
			
			var ths = this;
			var listener:Dynamic = { };
			listener.onMetaData = function(info:MetaData)
			{
				ths.metaData = info;
				ths.duration = info.duration;
				ths.onMetaData.dispatch(info);
			}
			netStream.client = listener;		
		//}
		
		
		createVideo();
		
		netStream.play(url);
	}
	
	private function createVideo():Void
	{
		if (video != null && video.parent == this)
			removeChild(video);
		video = new Video(w, h);
		video.width = w;
		video.height = h;
		video.smoothing = true;
		video.deblocking = 0;
		video.attachNetStream(netStream);
		addChild(video);
	}

	private function asyncErrorHandler(event:AsyncErrorEvent):Void 
	{
		onError.dispatch(event.error.message);
	}
	
	public function destroy()
	{
		netStream.close();
	}
}

typedef MetaData = {
	var width:Float;
	var height:Float;
	var duration:Float;
	var framerate:Float;
}