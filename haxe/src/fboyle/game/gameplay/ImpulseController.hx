package fboyle.game.gameplay;

import box2D.common.math.B2Vec2;
import box2D.dynamics.B2Body;
import fboyle.game.GameContainers;
import touchmypixel.game.objects.Object;
import touchmypixel.game.simulations.Box2dSimulation;

/**
*  applies ApplyImpulse() to a box2d body (Actor) in a direction based on input (left,right,up,down)
*
*/
class ImpulseController extends Object{

	var gameObject:Actor;
	var body:B2Body;
	var inputSource:InputSource;
	
	var directionX:String;
	var directionY:String;
	
	var b2VecLeft:B2Vec2;
	var b2VecRight:B2Vec2;
	var b2VecUp:B2Vec2;
	var b2VecDown:B2Vec2;
	
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
		
		b2VecLeft = new B2Vec2( -2, 0);
		b2VecRight = new B2Vec2( 2, 0);
		b2VecUp = new B2Vec2( 0, 2);
		b2VecDown = new B2Vec2( 0,-2);
	}
	
	override public function update(dt:Float):Void{
		
		if(directionX=="LEFT"){
			body.ApplyImpulse(b2VecLeft, body.GetWorldCenter());
		}else if(directionX=="RIGHT"){
			body.ApplyImpulse(b2VecRight, body.GetWorldCenter());
		}
		
		if(directionY=="UP"){
			body.ApplyImpulse(b2VecUp, body.GetWorldCenter());	
		}else if(directionY=="DOWN"){
			body.ApplyImpulse(b2VecDown, body.GetWorldCenter());
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
