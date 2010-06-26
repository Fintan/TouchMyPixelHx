
package com.touchmypixel.game;

import flash.display.MovieClip;
import flash.display.Sprite;
import flash.events.Event;
import flash.events.EventDispatcher;
import flash.events.KeyboardEvent;
import flash.events.MouseEvent;
import flash.Lib;
import flash.ui.Keyboard;
import com.touchmypixel.io.Keys;
import haxe.FastList;

class LevelBase extends Sprite
{
	public var lastFrameTime:Float;
	private var maxDT:Float;
	
	public function new()
	{
		super();
		
		maxDT = 1 / 10;
		
		Keys.init();
	}
	
	public function find<T>(type:Class<T>):List<T>
	{
		var items = new List();
		for (i in 0...this.numChildren)
		{
			var child = getChildAt(i);
			if (Std.is(child, type))
				items.add(child);
		}
		return cast items;
	}
	
	public function start()
	{
		lastFrameTime = haxe.Timer.stamp();
		addEventListener(Event.ENTER_FRAME, loop);
	}
	
	public function stop()
	{
		removeEventListener(Event.ENTER_FRAME, loop);
	}
	
	public function destroy() 
	{
		stop();
			
		if (parent != null) parent.removeChild(this);
	}
	
	private function loop(e:Dynamic):Void
	{
		var currentTime = haxe.Timer.stamp();
		var dt = currentTime - lastFrameTime;
		
		if (dt > maxDT) 
			dt = maxDT;
		
		update(dt);
		
		lastFrameTime = currentTime;
	}
	
	public function update(dt:Float):Void { }
}