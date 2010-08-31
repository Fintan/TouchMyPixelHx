/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.geom;

import flash.display.DisplayObject;
import flash.display.Sprite;
import flash.geom.Rectangle;

class AABB
{
	public var xmin:Float;
	public var xmax:Float;
	public var ymin:Float;
	public var ymax:Float;
	
	public function new(?xmin=0., ?xmax=0., ?ymin=0., ?ymax=0.)
	{
		this.xmin = xmin;
		this.xmax = xmax;
		this.ymin = ymin;
		this.ymax = ymax;
	}
	
	public function fromCircle(x:Float, y:Float, radius:Float)
	{
		xmin = x - radius;
		xmax = x + radius;
		ymin = y - radius;
		ymax = y + radius;
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
		if (x < xmin) return false;
		else if (x > xmax) return false;
		else if (y < ymin) return false;
		else if (y > ymax) return false;
		else return true;
	}
	
	/*******************************************/
	
	public function debugDraw(scope:Sprite)
	{
		scope.graphics.lineStyle(1, 0x00ff00);
		scope.graphics.drawRect(xmin, ymin, getWidth(), getHeight());
	}
}