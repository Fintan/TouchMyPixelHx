/**
 * ...
 * @author Matt Benton
 */

package touchmypixel.io.iphone;

import flash.errors.IOError;
import flash.events.Event;
import flash.events.IOErrorEvent;
import flash.events.ProgressEvent;
import flash.net.Socket;
import haxe.Timer;

class AccelerationClient 
{
	public var socket : Socket;
	public var data : AccelerationData;
	
	public var connected : Bool;
	
	public var host : String;
	public var port : Int;
	public var retryTimeout : Int;
	public var maxRetries : Int;
	public var retryCount : Int;
	public var quiteMode : Bool;
	
	public function new()
	{
		socket = new Socket();
		
		socket.addEventListener(Event.CONNECT, onConnect);
		socket.addEventListener(Event.CLOSE, onClose);
		socket.addEventListener(ProgressEvent.SOCKET_DATA, onData);
		socket.addEventListener(IOErrorEvent.IO_ERROR, onIOError);
		
		connected = false;
		maxRetries = 5;
		retryTimeout = 2000;
		retryCount = 0;
		quiteMode = false;
		
		data = { deviceID:null, time:0.0, x:0.0, y:0.0, z:0.0 }; 
	}
	
	function onIOError(e:IOErrorEvent):Void 
	{
		if ( !connected )
		{
			if ( !quiteMode )
				trace("AccelerationClient: Could not connect");
			if ( maxRetries != -1 && (retryCount < maxRetries || maxRetries == 0) )
			{
				retryCount++;
				Timer.delay(retryConnect, retryTimeout);
			}
		}
		else
		{
			trace("AccelerationClient: Error, "+e);
		}
	}
	
	function retryConnect():Void
	{
		if ( !quiteMode )
			trace("AccelerationClient: Retrying connection ["+retryCount+"]");
		connect(host, port);
	}
	
	public function connect(host:String, port:Int):Void
	{
		this.host = host;
		this.port = port;
		socket.connect(host, port);
	}
	
	function onClose(e:Event):Void 
	{
		trace("AccelerationClient: Socket Closed");
		connected = false;
		data.x = data.y = data.z = data.time = 0;
		data.deviceID = null;
	}
	
	/**
	 * Packets are in the following form:
	 * 
	 * ACC: <device_id:string>,<time:float>,<x:float>,<y:float>,<z:float>
	 */
	function onData(e:ProgressEvent):Void 
	{
		var parts = socket.readUTFBytes(socket.bytesAvailable).split(",");
		data.deviceID = parts[0].substr(5); // Get rid of "ACC: "
		data.time = Std.parseFloat(parts[1]);
		data.x = Std.parseFloat(parts[2]);
		data.y = Std.parseFloat(parts[3]);
		data.z = Std.parseFloat(parts[4]);
	}
	
	function onConnect(e:Event):Void 
	{
		trace("AccelerationClient: Socket Connected!");
		connected = true;
	}
}