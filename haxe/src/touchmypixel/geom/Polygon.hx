/**
 * ...
 * @author Matt Benton
 */

package touchmypixel.geom;

class Polygon 
{	
	public var nVertices : Int;
	public var x : Array<Float>;
	public var y : Array<Float>;
		
	public function new(_x : Array<Float>, _y:Array<Float>)
	{
		x = new Array<Float>();
		y = new Array<Float>();
		
		//if (_y == null) 
		//{
			//_y = _x.y;
			//_x = _x.x;
		//}
		
		nVertices = _x.length;

		for ( i in 0 ... nVertices )
		{
			x[i] = _x[i];
			y[i] = _y[i];
		}
	}
	
	public function set(p:Polygon)
	{
		nVertices = p.nVertices;
		x = new Array<Float>();
		y = new Array<Float>();
		var i = 0;
		for ( i in 0 ... nVertices )
		{
			x[i] = p.x[i];
			y[i] = p.y[i];
		}
	}
	
	/*
	 * Assuming the polygon is simple, checks
	 * if it is convex.
	 */
	public function isConvex()
	{
		var isPositive  = false;
		for ( i in 0 ... nVertices )
		{
			var lower = (i == 0) ? (nVertices - 1) : (i - 1);
			var middle = i;
			var upper = (i == nVertices - 1)?(0):(i + 1);
			var dx0 = x[middle] - x[lower];
			var dy0 = y[middle] - y[lower];
			var dx1 = x[upper]-x[middle];
			var dy1 = y[upper]-y[middle];
			var cross = dx0 * dy1 - dx1 * dy0;
			//Cross product should have same sign
			//for each vertex if poly is convex.
			var newIsP = (cross > 0);
			if (i == 0) 
				isPositive = newIsP;
			else if (isPositive != newIsP)
				return false;
		}
		return true;
	}
	
	/*
	 * Tries to add a triangle to the polygon.
	 * Returns null if it can't connect properly.
	 * Assumes bitwise equality of join vertices.
	 */
	public function add(t:Triangle)
	{
		//First, find vertices that connect
		var firstP = -1; 
		var firstT = -1;
		var secondP = -1; 
		var secondT = -1;
		
		for ( i in 0 ... nVertices )
		{
			if (t.x[0] == this.x[i] && t.y[0] == this.y[i]){
				if (firstP == -1){
					firstP = i; firstT = 0;
				} else{
					secondP = i; secondT = 0;
				}
			} else if (t.x[1] == this.x[i] && t.y[1] == this.y[i]) {
				if (firstP == -1){
					firstP = i; firstT = 1;
				} else{
					secondP = i; secondT = 1;
				}
			} else if (t.x[2] == this.x[i] && t.y[2] == this.y[i]){
				if (firstP == -1){
					firstP = i; firstT = 2;
				} else{
					secondP = i; secondT = 2;
				}
			} else {
				//println(t.x[0]+" "+t.y[0]+" "+t.x[1]+" "+t.y[1]+" "+t.x[2]+" "+t.y[2]);
				//println(x[0]+" "+y[0]+" "+x[1]+" "+y[1]);
			}
		}
		
		//Fix ordering if first should be last vertex of poly
		if (firstP == 0 && secondP == nVertices - 1) {
			firstP = nVertices-1;
			secondP = 0;
		}
		
		//Didn't find it
		if (secondP == -1) return null;
		
		//Find tip index on triangle
		var tipT = 0;
		if (tipT == firstT || tipT == secondT) tipT = 1;
		if (tipT == firstT || tipT == secondT) tipT = 2;
		
		var newx = new Array<Float>();
		var newy = new Array<Float>();
		var currOut = 0;
		
		for ( i in 0 ... nVertices )
		{
			newx[currOut] = x[i];
			newy[currOut] = y[i];
			if (i == firstP){
				++currOut;
				newx[currOut] = t.x[tipT];
				newy[currOut] = t.y[tipT];
			}
			++currOut;
		}
		return new Polygon(newx, newy);
	}
	
}