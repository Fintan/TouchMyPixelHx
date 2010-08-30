/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.geom;
import touchmypixel.utils.Tools;

class Line
{
	public var bounds:AABB;
	public var p1:Vector;
	public var p2:Vector;
	public var normal:Vector;
	public var tangent:Vector;
	
	public function new(x1, y1, x2, y2)
	{
		p1 = new Vector(x1, y1);
		p2 = new Vector(x2, y2);
		
		recalculate();
	}
	
	public inline function checkCrossed(x:Float, y:Float)
	{
		return !((x -  p1.x) * (p2.y - p1.y) + (y - p1.y) * ( -p2.x + p1.x) > 0);
	}
	
	public inline function checkIntersection(x1:Float, y1:Float, x2:Float, y2:Float)
	{
		// Use the bounding box to truncate the ray to a line
		if (!bounds.contains(x2, y2)) 
			return false; 
		else
			return (!checkCrossed(x1, y1) && checkCrossed(x2, y2));
	}
	
	// Do as much precalculating as possible
	public function recalculate()
	{
		bounds = new AABB(	Math.min(p1.x, p2.x),
							Math.max(p1.x, p2.x),
							Math.min(p1.y, p2.y),
							Math.max(p1.y, p2.y) );
							
		// Add extra bounds for straight lines - so they are able to check collisions
		if (bounds.getHeight() < 10) { bounds.ymin -= 5; bounds.ymax += 5; }
		if (bounds.getWidth() < 10) { bounds.xmin -= 5; bounds.xmax += 5; }
		
		tangent = new Vector(p2.x - p1.x, p2.y - p1.y);
		tangent.normalize();
		
		normal = Vector.getLeftNormal(tangent);
	}
	
	
	// draw the line + normals
	#if flash
	public function debugDraw(s:flash.display.Sprite)
	{
		s.graphics.lineStyle(1, 0xffffff);
		s.graphics.moveTo(p1.x, p1.y);
		s.graphics.lineTo(p2.x, p2.y);
		
		s.graphics.lineStyle(1, 0xff0000);
		s.graphics.moveTo(p1.x, p1.y);
		s.graphics.lineTo(p1.x + normal.x * 10, p1.y + normal.y * 10);
	}
	#end
}