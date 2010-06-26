/**
 * ...
 * @author DefaultUser (Tools -> Custom Arguments...)
 */

package peepee.utils;
import flash.display.DisplayObject;
import flash.display.DisplayObjectContainer;
import flash.geom.Point;

class Tools 
{

	public function new() 
	{
		
	}
 
	#if flash
	public static inline function pointInScope(x:Float, y:Float, fromScope:DisplayObjectContainer, toScope:DisplayObjectContainer):Point
	{
		var p:Point = new Point(x, y);
		p = fromScope.localToGlobal(p);
		p = toScope.globalToLocal(p);
		return p;
	}
	
	/*public static function rotateAroundPoint(target:DisplayObject, x:Number, y:Number, degrees:Number)
	{
		var m:Matrix = target.transform.matrix;
		//MatrixTransformer.rotateAroundExternalPoint(m,x,y,degrees);
		m.tx -= x;
		m.ty -= y;
		m.rotate(degrees*(Math.PI/180));
		m.tx += x;
		m.ty += y;
		target.transform.matrix = m;
	}*/
	#end
	
	public static inline function getAngle(dx:Float, dy:Float):Float
	{
		var r = Math.atan2(dy, dx);
		var d = r * 180 / Math.PI - 90;
		if (d > 360) d -= 360;
		if (d < 0) d += 360;
		return d;
	}
	
	
	
}