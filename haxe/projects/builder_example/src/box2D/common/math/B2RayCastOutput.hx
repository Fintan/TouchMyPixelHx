/**
 * ...
 * @author Matt Benton
 */

package box2D.common.math;

class B2RayCastOutput
{
	public var normal : B2Vec2;
	public var fraction : Float;
	
	public function new()
	{
	}
	
	public function toString() : String
	{
		return "{raycast normal=(" + normal.x + "," + normal.y + ") fraction=" + fraction + "}";
	}
}
