
//
//  JsLevelBase
//
//  Created by Fintan Boyle on 2011-02-04.
//  Copyright (c) 2011 Modello Design Ltd. All rights reserved.
//
package fboyle.display;

import easelhx.utils.Ticker;
import fboyle.display.DisplayTypeDefs;
import fboyle.display.ILevel;

import easelhx.display.Container;


class JsLevelBase implements ILevel {
	public var lastFrameTime:Float;
	public var container:Container;
	private var maxDT:Float;
	
	private var stage:StageHx;
	
	public function new(){
		
		maxDT = 1 / 10;
		
		container = new Container();
		
		stage = cast (fboyle.utils.DisplayObjectUtil.getStage()); 
		init();
	}
	
	public function init():Void{
		//override
	}
	
	public function start():Void {
		lastFrameTime = haxe.Timer.stamp();
		Ticker.setInterval(20);		// 50 ms = 20 fps
		Ticker.addListener(this);
	}
	
	public function stop():Void {
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
	
	public function update(dt:Float):Void { 
		// update the stage:
		stage.tick();
	}
}