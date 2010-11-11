/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.objects;

import box2D.collision.shapes.B2Shape;
import box2D.dynamics.B2Body;

class LBGeometry
{
	public var name : String;
	public var shapes : Array<B2Shape>;
	public var body : BuilderBodyObject;
	
	public var contacts : Array<Dynamic>;
	public var cacheContacts : Bool;
	
	public function new() 
	{
		//contacts = new Array<Dynamic>();
	}
	
	public function destroy() : Void
	{
		//for ( s in sha
	}
}