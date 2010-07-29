/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.objects;
import box2D.dynamics.B2Body;
import haxe.xml.Fast;
import touchmypixel.game.ds.ObjectHash;
import touchmypixel.game.objects.Box2dObject;
import touchmypixel.game.simulations.Box2dSimulation;
import touchmypixel.game.box2d.ContactPoint;

class Box2dBodyObject extends Object
{
	public var type:String;
	public var simulation:Box2dSimulation;
	
	public var gameObject:Box2dObject;
	
	public var body:B2Body;
	
	public var contacts_add:ObjectHash<Array<ContactPoint>>;
	public var contacts_persist:ObjectHash<Array<ContactPoint>>;
	public var contacts_remove:ObjectHash<Array<ContactPoint>>;
	
	public var cacheContacts:Bool;
	
	public function new(s:Box2dSimulation) 
	{
		super();
		
		simulation = s;
		
		cacheContacts = false;
		
		contacts_add = new ObjectHash();
		contacts_persist = new ObjectHash();
		contacts_remove = new ObjectHash();	
	}
	
	override public function update(dt)
	{
		if(body != null)
			simulation.sync(this, body);
	}
	
	override public function destroy()
	{
		super.destroy();
		
		simulation.world.DestroyBody(body);
	}
}