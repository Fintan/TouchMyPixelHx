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
	
	//public var namedShapes : Hash<B2Shape>;
	public var geometry : Array<LBGeometry>;
	public var namedGeometry : Hash<LBGeometry>;
	
	public function new(s) 
	{
		super(s);
		
		//namedShapes = new Hash<B2Shape>();
		geometry = new Array<LBGeometry>();
		namedGeometry = new Hash<LBGeometry>();
	}
	
	override public function destroy() : Void
	{
		info = null;
		
		if ( geometry != null )
		{
			for ( geo in geometry )
				geo.destroy();
			geometry = null;
		}
		if ( namedGeometry != null )
		{
			for ( geo in namedGeometry )
				geo.destroy();
			namedGeometry = null;
		}
			
		super.destroy();
	}
}
