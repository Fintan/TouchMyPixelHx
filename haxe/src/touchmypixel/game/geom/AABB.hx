/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.geom;

import flash.display.DisplayObject;
import flash.geom.Rectangle;

class AABB
{
	public var xmin:Float;
	public var xmax:Float;
	public var ymin:Float;
	public var ymax:Float;
	
	public function new(xmin, xmax, ymin, ymax)
	{
		this.xmin = xmin;
		this.xmax = xmax;
		this.ymin = ymin;
		this.ymax = ymax;
	}
	
	public inline function getHeight()
	{
		return ymax - ymin;
	}
	
	public inline function getWidth()
	{
		return xmax - xmin;
	}
	
	public inline function contains(x:Float, y:Float)
	{
		return x > xmin && x<xmax && y > ymin && y < ymax;
	}
	
	/*******************************************/
}