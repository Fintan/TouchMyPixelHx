/**
 * ...
 * @author Matt Benton
 */

package touchmypixel.geom;

class Triangle 
{
	public var x : Array<Float>;
	public var y : Array<Float>;
	
	public function new( x1 : Float, y1 : Float, x2 : Float, y2 : Float, x3 : Float, y3 : Float) 
	{
		x = new Array<Float>();
		y = new Array<Float>();
		
		var dx1 = x2 - x1;
		var dx2 = x3 - x1;
		var dy1 = y2 - y1;
		var dy2 = y3 - y1;
		var cross = (dx1 * dy2) - (dx2 * dy1);
		var ccw = (cross > 0);
		if ( ccw )
		{
			x[0] = x1; x[1] = x2; x[2] = x3;
			y[0] = y1; y[1] = y2; y[2] = y3;
		}
		else
		{
			x[0] = x1; x[1] = x3; x[2] = x2;
			y[0] = y1; y[1] = y3; y[2] = y2;
		}
	}
	
	public function isInside( px : Float, py : Float ) : Bool
	{
		var vx2 = px - x[0];
		var vy2 = py - y[0];
		var vx1 = x[1] - x[0];
		var vy1 = y[1] - y[0];
		var vx0 = x[2] - x[0];
		var vy0 = y[2] - y[0];
		
		var dot00 = vx0 * vx0 + vy0 + vy0;
		var dot01 = vx0 * vx1 + vy0 * vy1;
		var dot02 = vx0 * vx2 + vy0 * vy2;
		var dot11 = vx1 * vx1 + vy1 * vy1;
		var dot12 = vx1 * vx2 + vy1 * vy2;
		var invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
		var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
		var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
		
		return ((u > 0) && (v > 0) && (u + v < 1));
	}
	
}