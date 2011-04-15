/**
 * 
 * JsLevelBase by Fintan Boyle
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

import easelhx.utils.Ticker;
//import touchmypixel.io.Keys;
//import touchmypixel.game.ILevel;
import fboyle.display.ILevel;

import easelhx.display.Container;


class JsLevelBase implements ILevel {
	public var lastFrameTime:Float;
	public var container:Container;
	private var maxDT:Float;
	
	public function new(){
		//super();
		
		maxDT = 1 / 10;
		
		//Keys.init();
		container = new Container();
		init();
	}
	
	public function init():Void{
		//override
	}
	
/*	public function find<T>(type:Class<T>):List<T>{
		var items = new List();
		if(this.children!=null){
		for (i in 0...this.children.length){
			var child = getChildAt(i);
			if (Std.is(child, type))
				items.add(child);
		}
	}
		return cast items;
	}*/
	
	public function start():Void {
		//trace("hello fintan: start()");
		lastFrameTime = haxe.Timer.stamp();
		//addEventListener(Event.ENTER_FRAME, loop);
		Ticker.setInterval(50);		// 50 ms = 20 fps
		Ticker.addListener(this);
	}
	
	public function stop():Void {
		//removeEventListener(Event.ENTER_FRAME, loop);
		Ticker.removeListener(this);
	}
	
	public function destroy():Void {
		
		stop();

		if (container!=null) if (container.parent != null){		
			//var p:Container  = cast container.parent;
			//p.removeChild(container);
		} 
			
	}
	
	inline function tick() {
		var currentTime = haxe.Timer.stamp();
		var dt = currentTime - lastFrameTime;

		if (dt > maxDT) 
			dt = maxDT;

		update(dt);

		lastFrameTime = currentTime;
		
	}
	
	private function loop(e:Dynamic):Void {
	
	}
	
	public function update(dt:Float):Void { 
		// update the stage:
		cast (fboyle.utils.DisplayObjectUtil.getStage()).tick();
	}
}