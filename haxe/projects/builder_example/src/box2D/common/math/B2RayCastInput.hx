/**
 * ...
 * @author Matt Benton
 */

package box2D.common.math;

class B2RayCastInput
{
	public var p1 : B2Vec2;
	public var p2 : B2Vec2;
	public var maxFraction : Float;
	
	public function new( p1:B2Vec2, p2:B2Vec2, maxFraction )
	{
		this.p1 = p1;
		this.p2 = p2;
		this.maxFraction = maxFraction;
	}
}