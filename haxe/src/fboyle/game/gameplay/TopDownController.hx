package fboyle.game.gameplay;

import box2D.dynamics.B2Body;
import fboyle.game.GameContainers;
import touchmypixel.game.objects.Object;
import touchmypixel.game.simulations.Box2dSimulation;

/**
*  applies m_linearVelocity and SetAngularVelocity() to a box2d body (Actor) in a direction based on input (left,right,up,down)
*
*/
class TopDownController extends Object{
	var gameObject:Actor;
	var body:B2Body;
	var inputSource:InputSource;
	
	var directionX:String;
	var directionY:String;
	
	public function new(simulation:Box2dSimulation){
		super();
		simulation.objects.push(this);
	}
	
	public function addActor(gameObject:Actor){
		this.gameObject = gameObject;
		this.body = gameObject.body.body;
		
	}
	
	public function addInput(source:InputSource){
		inputSource = source;
		inputSource.inputSignal.add(onInputReceived);
	}
	
	public function removeInput(){
		inputSource.inputSignal.remove(onInputReceived);
		inputSource = null;
	}
	
	function onInputReceived(directionX:String, directionY:String){
		this.directionX = directionX;
		this.directionY = directionY;
	}
	
	override public function init(){
		directionX = directionY = "";
	}
	
	override public function update(dt:Float):Void{
		
		if(directionX=="LEFT"){
			body.m_linearVelocity.x = -10;
			body.SetAngularVelocity(4); // rotate to left
		}else if(directionX=="RIGHT"){
			body.m_linearVelocity.x = 10;
			body.SetAngularVelocity(-4); // rotate to right
		}
		
		if(directionY=="UP"){
			body.m_linearVelocity.y = 10;
			body.SetAngularVelocity(4);
		}else if(directionY=="DOWN"){
			body.m_linearVelocity.y = -10;
			body.SetAngularVelocity(-4);
		}	
		
	}
	
	override public function destroy(){
		if(this.gameObject!=null) this.gameObject = null;
		if(this.body!=null) this.body = null;
		if(this.inputSource!=null)
			this.inputSource.inputSignal.remove(onInputReceived);
		this.inputSource = null;
	}


}
