package fboyle.game.gameplay;

import box2D.dynamics.B2Body;
import box2D.common.math.B2Vec2;
import fboyle.game.GameContainers;
import touchmypixel.game.objects.Object;
import touchmypixel.game.simulations.Box2dSimulation;


/**
*
*  The gameObject follows the followObject (with some random variation) when the distance apart is greater than
*  the distanceThreshold.  The gameObject move around randomly when the distance apart is greater than the
*  distanceThreshold.
*
*/
class FollowWhenCloseController extends Object{

	var gameObject:Actor;
	var followObject:Actor;
	var body:B2Body;
	var followBody:B2Body;
	
	//close by settings
	var ax:Float;
	var ay:Float;
	var vx:Float;
	var vy:Float;
	var angleOffset:Float;//if animation default orientation needs adjusting (radians)
	
	//far away settings
	var turnDeviation:Float;
    var vec:flash.geom.Point;
    var rot:Float;
    var distanceThreshold:Float;
	
	public function new(simulation:Box2dSimulation){
		super();
		simulation.objects.push(this);
		ay = ax = 0.01;
		vy = vx = 0.001;
		angleOffset = 0;
		distanceThreshold = 10;
		rot = turnDeviation = 0.0;
	}
	
	public function addActor(gameObject:Actor){
		this.gameObject = gameObject;
		this.body = gameObject.body.body;
		
		body.m_angularDamping = 100000;
		//a high damping value mitigates against missing collisions when calling body.SetXForm() 
		//(stops object escaping boundaries)
		
	}
	
	public function addRotationOffset(angle:Float){
		angleOffset = angle * Math.PI / 180;
	}
	
	public function setDistanceThreshold(distance:Float){
		distanceThreshold = distance;
	}
	
	public function addActorToFollow(followObject:Actor){
		this.followObject = followObject;
		this.followBody = followObject.body.body;
	}
	
	override public function init(){
		if(this.gameObject==null){
			trace("warning: FollowWhenCloseController has no defined gameObject");
		}	
	}
	
	override public function update(dt:Float):Void{
	
		//calc distance between followBody and body (the hypotenuse)
		var dx = followBody.GetPosition().x - body.GetPosition().x;
		var dy = followBody.GetPosition().y - body.GetPosition().y;
		var hypotenuse = Math.sqrt(dx*dx + dy*dy);
		
		if(hypotenuse<distanceThreshold){	//when close by, follow the subject	
			
				vx =  (followBody.m_linearVelocity.x - body.m_linearVelocity.x + fboyle.util.Rnd.float(-40,40)) 
							* (0.02+fboyle.util.Rnd.float(0.01,0.03));
				vy =  (followBody.m_linearVelocity.y - body.m_linearVelocity.y + fboyle.util.Rnd.float(-40,40))
							* (0.02+fboyle.util.Rnd.float(0.01,0.03));
				
				body.m_linearVelocity.x += vx;
				body.m_linearVelocity.y += vy;
			
				var bodyPos = body.GetPosition();
				var followBodyPos = followBody.GetPosition();
				
				var pa = Math.atan2(-bodyPos.x + followBodyPos.x, bodyPos.y - followBodyPos.y);
		        var ao = pa - body.GetAngle();
		       
		        body.SetXForm(body.GetPosition(),pa + angleOffset);
				
		}else{ //when far away, move around randomly
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
			
	}
	
	
    inline function rotateAroundPoint(point:B2Vec2, angle:Float, body:B2Body){
    
	   var cosAngle:Float = Math.cos(angle);
	   var sinAngle:Float = Math.sin(angle);
	   
	   var distX:Float = body.GetPosition().x - point.x;
	   var distY:Float = body.GetPosition().y - point.y;
	   var newPoint = new B2Vec2(cosAngle * distX - sinAngle * distY + point.x,
	                        cosAngle * distY + sinAngle * distX + point.y);
	  body.SetXForm(newPoint, angle);
	  
	}

	
	override public function destroy(){
		if(this.gameObject!=null) this.gameObject = null;
		if(this.body!=null) this.body = null;
		if(this.followObject!=null) this.followObject = null;
		if(this.followBody!=null) this.followBody = null;
		
	}

}
