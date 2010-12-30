package fboyle.game.gameplay;

import box2D.dynamics.B2Body;
import box2D.common.math.B2Vec2;
import fboyle.game.GameContainers;
import touchmypixel.game.objects.Object;
import touchmypixel.game.simulations.Box2dSimulation;


/**
*  modifies the properties of a box2d body (Actor) to move and rotate randomly 
*
*  based on: http://wonderfl.net/c/ut1Y/read
*
*/
class WanderController extends Object{

	var gameObject:Actor;
	var body:B2Body;
	
	var turnDeviation:Float;
    var vec:flash.geom.Point;
    var rot:Float;
	
	public function new(simulation:Box2dSimulation){
		super();
		simulation.objects.push(this);
		rot = turnDeviation = 0;
	}
	
	public function addActor(gameObject:Actor){
		this.gameObject = gameObject;
		this.body = gameObject.body.body;
	}
	
	override public function init(){
		
	}
	
	override public function update(dt:Float):Void{
	
		turnDeviation += (-1 + (Math.random() * 2));
        if(turnDeviation > 4) turnDeviation = 4;
        if(turnDeviation < -4) turnDeviation = -4;
        
        body.SetXForm(body.GetXForm().position,body.GetAngle()+(turnDeviation * Math.PI / 180));
				
		rot = (body.GetAngle() * 180/ Math.PI) * 0.0174532925;
        vec = flash.geom.Point.polar(0.3, rot);
        
        var x = body.m_linearVelocity.x;
        var y = body.m_linearVelocity.y;
        
       	x += (Math.random()>0.5)?vec.x:-vec.x;
        y += (Math.random()>0.5)?vec.y:-vec.y;
    
        body.m_linearVelocity.x = x;
        body.m_linearVelocity.y = y;	
			
	}
	
	override public function destroy(){
		if(this.gameObject!=null) this.gameObject = null;
		if(this.body!=null) this.body = null;
	}
	
}
