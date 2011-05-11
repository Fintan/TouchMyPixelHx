/**
 * 
 * FlLevelBase by Fintan Boyle
 * Visit www.fboyle.com
 * 
 * Copyright (c) 2010 Fintan Boyle 
 * 
 * 
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php 
 * 
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
package fboyle.display;

import fboyle.display.ILevel;
import flash.display.MovieClip;
import flash.display.Sprite;
import flash.events.Event;
import flash.events.EventDispatcher;
import flash.events.KeyboardEvent;
import flash.events.MouseEvent;
import flash.Lib;
import flash.ui.Keyboard;
import touchmypixel.io.Keys;
import haxe.FastList;

class FlLevelBase implements ILevel{
	
	public var container:MovieClip;
	public var lastFrameTime:Float;
	private var maxDT:Float;
	
	public function new(){
		
		container = new MovieClip();
		
		maxDT = 1 / 10;
		
		container.addEventListener(Event.ADDED_TO_STAGE, added);
	}
	
	private function added(e:Event):Void{
		container.removeEventListener(Event.ADDED_TO_STAGE, added);
		
		Keys.init();
		
		init();
	}
	
	public function init():Void{
		//override
	}
	
	public function find<T>(type:Class<T>):List<T>{
		var items = new List();
		for (i in 0...this.container.numChildren)
		{
			var child = container.getChildAt(i);
			if (Std.is(child, type))
				items.add(child);
		}
		return cast items;
	}
	
	public function start():Void{
		lastFrameTime = haxe.Timer.stamp();
		container.addEventListener(Event.ENTER_FRAME, loop);
	}
	
	public function stop():Void{
		container.removeEventListener(Event.ENTER_FRAME, loop);
	}
	
	public function destroy():Void{
		stop();
			
		if (container.parent != null) 
			container.parent.removeChild(container);
	}
	
	private function loop(e:Dynamic):Void{
		var currentTime = haxe.Timer.stamp();
		
		var dt = currentTime - lastFrameTime;
		
		if (dt > maxDT) 
			dt = maxDT;
		
		update(dt);
		
		lastFrameTime = currentTime;
	}
	
	public function update(dt:Float):Void { }
}