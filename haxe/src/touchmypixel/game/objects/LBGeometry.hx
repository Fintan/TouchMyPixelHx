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
	
	public var contacts : Array<B2Body>;
	public var cacheContacts : Bool;
	
	public function new() 
	{
		//contacts = new Array<Dynamic>();
	}
	
}