/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.objects;
import haxe.xml.Fast;

class BuilderBodyObject extends Box2dBodyObject
{
	public var info:Fast;
	
	public function new(s) 
	{
		super(s);
	}
	
}