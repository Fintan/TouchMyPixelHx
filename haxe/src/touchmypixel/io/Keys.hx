package peepee.io;

import flash.display.Sprite;
import flash.events.KeyboardEvent;
import flash.Lib;

class Keys
{
	static private var keycodes: IntHash<Bool> = new IntHash();
	static private var keyDownUsed: IntHash<Hash<Bool>> = new IntHash();
	
	static public function init():Void
	{
		Lib.current.stage.addEventListener( KeyboardEvent.KEY_DOWN, onKeyDown );
		Lib.current.stage.addEventListener( KeyboardEvent.KEY_UP, onKeyUp );
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
	
	static private function onKeyDown( event: KeyboardEvent ):Void
	{
		keycodes.set(event.keyCode, true);
		if(!keyDownUsed.exists(event.keyCode)) keyDownUsed.set(event.keyCode, new Hash());
	}
	
	static private function onKeyUp( event: KeyboardEvent ):Void
	{
		keycodes.set(event.keyCode, false);
		keyDownUsed.remove(event.keyCode);
	}
	
}