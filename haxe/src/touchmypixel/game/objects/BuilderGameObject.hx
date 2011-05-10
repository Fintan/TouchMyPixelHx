/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.objects;
import box2D.dynamics.B2Body;
import haxe.xml.Fast;

class BuilderGameObject extends Box2dObject
{
	public var info:Fast;
	public var fixedRotation:Bool;
	public var autoSyncToBody:BuilderBodyObject;
	
	public var autoSyncTransform: { x:Float, y:Float, rotation:Float };
	
	public function new(s) 
	{
		super(s);
		
		bodies = [];
	}
	
	override public function update(dt:Float)
	{
		if (this.autoSyncToBody != null)
		{
			trace("got an autoSyncToBody!");
			this.simulation.sync(cast this.container, autoSyncToBody.body, autoSyncTransform);
		}
	}
}
