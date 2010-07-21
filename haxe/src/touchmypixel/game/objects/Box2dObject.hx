/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.objects;

import box2D.common.math.B2Vec2;
import box2D.dynamics.B2Body;
import box2D.dynamics.B2BodyDef;
import box2D.collision.shapes.B2ShapeDef;
import flash.display.DisplayObject;
import haxe.xml.Fast;
import touchmypixel.game.ds.ObjectHash;
import touchmypixel.game.simulations.Box2dSimulation;
import flash.display.Sprite;

class Box2dObject extends Object
{
	public var simulation:Box2dSimulation;
	
	public var bodies:Array<Box2dBodyObject>;
	
	public function new(simulation:Box2dSimulation)
	{
		super();
		
		this.simulation = simulation;
	}
	
	public function init()
	{
		// override
	}
	
	
	override public function update(dt:Float)
	{
	}
	
	override public function destroy():Void
	{
		super.destroy();
		
		for (b in bodies)	
			b.destroy();
	}
}