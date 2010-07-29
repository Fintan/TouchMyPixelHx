/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.box2d;
/**
* ...
* @author Tony Polinelli <tonyp[AT]touchmypixel.com>
*/

import box2D.collision.B2ContactPoint;
import box2D.dynamics.B2Body;
import box2D.dynamics.B2ContactListener;
import touchmypixel.game.objects.Box2dBodyObject;
import touchmypixel.game.objects.Box2dObject;
import touchmypixel.game.ds.ObjectHash;

class ContactManager extends B2ContactListener
{
	public var clearList:Array<Box2dBodyObject> ;
		
	public function new()
	{
		super();
		clearList = [];
		clear();
	}
	
	override public function Add(point:B2ContactPoint):Void 
	{
		registerContact("add", point);
	}
	
	override public function Persist(point:B2ContactPoint):Void 
	{
		registerContact("persist", point);
	}
	
	override public function Remove(point:B2ContactPoint):Void 
	{
		registerContact("remove",point);
	}
	
	public function registerContact(type:String, point:B2ContactPoint)
	{
		var o1:Box2dBodyObject = null;
		if ( Std.is(point.shape1.GetBody().GetUserData(), Box2dBodyObject)) o1 = cast point.shape1.GetBody().GetUserData();
			
		
		var o2:Box2dBodyObject = null;
		if ( Std.is(point.shape2.GetBody().GetUserData(), Box2dBodyObject)) o2 = cast point.shape2.GetBody().GetUserData();
			
		var h:ObjectHash<Array<ContactPoint>>;
			
		var cp:ContactPoint = { object1:o1, 
								object2:o2, 
								body1:point.shape1.GetBody(), 
								body2:point.shape2.GetBody(), 
								shape1:point.shape1, 
								shape2:point.shape2 };
			
		/***/
		
		if(o1.cacheContacts)
		{	
			h = Reflect.field(o1, "contacts_" + type);
			if (!h.exists(o2))
				h.set(o2, [cp]);
			else
				h.get(o2).push(cp);
				
			clearList.push(o1);
		}
		/***/
		
		if(o2.cacheContacts)
		{
			h = Reflect.field(o2, "contacts_" + type);
			if (!h.exists(o1))
				h.set(o1, [cp]);
			else
				h.get(o1).push(cp);
			
			clearList.push(o2);
		}
	}
	
	public function clear()
	{
		for (obj in clearList)
		{
			obj.contacts_add = new ObjectHash();
			obj.contacts_persist = new ObjectHash();
			obj.contacts_remove = new ObjectHash();
		}
		clearList = [];
	}
}