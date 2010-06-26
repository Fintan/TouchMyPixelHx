/**
 * ...
 * @author Tonypee
 */

package com.touchmypixel.game.objects;

import box2D.common.math.B2Vec2;
import box2D.dynamics.B2Body;
import box2D.dynamics.B2BodyDef;
import box2D.collision.shapes.B2ShapeDef;
import com.touchmypixel.game.box2d.ContactPoint;
import com.touchmypixel.game.ds.ObjectHash;
import com.touchmypixel.game.simulations.Box2dSimulation;
import flash.display.Sprite;

class Box2dObject extends Object
{
	public var simulation:Box2dSimulation;
	public var body:B2Body;
	public var bodyDef:B2BodyDef;
	
	public var contacts_add:ObjectHash<Array<ContactPoint>>;
	public var contacts_persist:ObjectHash<Array<ContactPoint>>;
	public var contacts_remove:ObjectHash<Array<ContactPoint>>;
	
	public var cacheContacts:Bool;
	
	public function new(simulation:Box2dSimulation)
	{
		super();
		
		cacheContacts = false;
		
		contacts_add = new ObjectHash();
		contacts_persist = new ObjectHash();
		contacts_remove = new ObjectHash();	
		
		this.simulation = simulation;
		
		bodyDef = new B2BodyDef();
	}
	
	public function setupTransform(x:Float, y:Float, rotation:Float)
	{
		bodyDef.position.Set(x / simulation.scale, y / simulation.scale);
		bodyDef.angle = rotation*Math.PI/180;
	}
	
	public function createBody()
	{
		body = simulation.world.CreateBody(bodyDef);
		body.SetUserData(this);
	}
	
	public function createShape(def:B2ShapeDef)
	{
		if (body == null)
			createBody();
			 
		body.CreateShape(def);
			
		body.SetMassFromShapes();
	}
	
	public function sync()
	{
		if (body != null) {
			var position:B2Vec2 = body.GetPosition();
			x = position.x * simulation.scale;
			y = position.y * simulation.scale;
			rotation = body.GetXForm().R.GetAngle() * 180 / Math.PI;
		}
	}
	
	override public function update(dt:Float)
	{
		sync();
	}
	
	override public function destroy():Void
	{
		super.destroy();
		
		simulation.world.DestroyBody(body);
	}
}