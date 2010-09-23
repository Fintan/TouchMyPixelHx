package touchmypixel.io;

import flash.display.Sprite;
import flash.events.KeyboardEvent;
import flash.Lib;

class Keys
{
	public static var inited:Bool = false;
	public static var keycodes: IntHash<Bool> = new IntHash();
	private static var keyDownUsed: IntHash<Hash<Bool>> = new IntHash();
	
	static public function init():Void
	{
		if (!inited)
		{
			Lib.current.stage.addEventListener( KeyboardEvent.KEY_DOWN, onKeyDown );
			Lib.current.stage.addEventListener( KeyboardEvent.KEY_UP, onKeyUp );
		}
		inited = true;
	}
	
	static public function isDown( key:Int):Bool
	{
		return keycodes.get(key) == true;
	}
	
	static public function isDownOnce(key:Int, id:String):Bool
	{
		if(keycodes.get(key) && keyDownUsed.exists(key)){
			if(!keyDownUsed.get(key).get(id)){
				keyDownUsed.get(key).set(id, true);
				return(true);
			}
		}
		return(false);
	}
	
	private static function onKeyDown( event: KeyboardEvent ):Void
	{
		//trace(event.keyCode);
		keycodes.set(event.keyCode, true);
		if(!keyDownUsed.exists(event.keyCode)) keyDownUsed.set(event.keyCode, new Hash());
	}
	
	private static function onKeyUp( event: KeyboardEvent ):Void
	{
		keycodes.set(event.keyCode, false);
		keyDownUsed.remove(event.keyCode);
	}
	
	public static function forceKeyDown( key:Int )
	{
		 keycodes.set(key, true);
	}
	
	public static function forceKeyUp( key:Int )
	{
		keycodes.set(key, false);
		keyDownUsed.remove(key);
	}
}