package fboyle.game.input;

import hxs.Signal2;
import touchmypixel.game.objects.Object;
import touchmypixel.game.simulations.Box2dSimulation;
import touchmypixel.io.Keys;
import flash.ui.Keyboard;

class KeyboardInput extends Object{

	var directionX:String;
	var directionY:String;
	
	public var inputSignal:Signal2<String,String>;
	
	public function new(simulation:Box2dSimulation){
		super();
		inputSignal = new Signal2<String,String>();
		simulation.objects.push(this);
	}
	
	override public function init(){
		directionX = directionY = "";
	}
	
	override public function update(dt:Float):Void{
		
		var keyLeft = Keys.isDownOnce(Keyboard.LEFT, "KeyboardInput");
		var keyRight = Keys.isDownOnce(Keyboard.RIGHT, "KeyboardInput");
		var keyUp = Keys.isDownOnce(Keyboard.UP, "KeyboardInput");
		var keyDown = Keys.isDownOnce(Keyboard.DOWN, "KeyboardInput");
		
		if(keyLeft){
			directionX = "LEFT";
		}else if(keyRight){
			directionX ="RIGHT";
		}else{
			//directionX = "";
		}
		
		if(keyUp){
			directionY = "DOWN";
		}else if(keyDown){
			directionY ="UP";
		}else{
			//directionY = "";
		}
		
		inputSignal.dispatch(directionX,directionY);
		
	}
	
	override public function destroy(){
		inputSignal.removeAll();
	}

}
