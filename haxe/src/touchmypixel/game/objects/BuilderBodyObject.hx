/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.objects;
import box2D.collision.shapes.B2Shape;
import haxe.xml.Fast;

class BuilderBodyObject extends Box2dBodyObject
{
	public var info:Fast;
	
	public var namedShapes : Hash<B2Shape>;
	
	public function new(s) 
	{
		super(s);
		
		namedShapes = new Hash<B2Shape>();
	}
	
}