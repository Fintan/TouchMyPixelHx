 /* 
 * Based on JSFL util by mayobutter (Box2D Forums)
 * and  Eric Jordan (http://www.ewjordan.com/earClip/) Ear Clipping experiment in Processing
 * 
 * Tarwin Stroh-Spijer - Touch My Pixel - http://www.touchmypixel.com/
 * */

package touchmypixel.geom;
	
class Polygon {
	
	public var nVertices:int;
	public var x:Array = new Array();
	public var y:Array = new Array();
	
	public function Polygon(_x:Array, _y:Array = null)
	{
		if(_y == null) {
			_y = _x.y;
			_x = _x.x;
		}
		
		nVertices = _x.length;

		for (var i:int = 0; i < nVertices; ++i) {
			x[i] = _x[i];
			y[i] = _y[i];
		}
	}

	public function set(p:Polygon)
	{
		nVertices = p.nVertices;
		x = new Array();
		y = new Array();
		for (var i:int = 0; i < nVertices; ++i) {
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
		var isPositive:Boolean = false;
		for (var i:int = 0; i < nVertices; ++i) {
			var lower:int = (i == 0)?(nVertices - 1):(i - 1);
			var middle:int = i;
			var upper:int = (i == nVertices - 1)?(0):(i + 1);
			var dx0:Number = x[middle] - x[lower];
			var dy0:Number = y[middle] - y[lower];
			var dx1:Number = x[upper]-x[middle];
			var dy1:Number = y[upper]-y[middle];
			var cross:Number = dx0 * dy1 - dx1 * dy0;
			//Cross product should have same sign
			//for each vertex if poly is convex.
			var newIsP:Boolean = (cross>0)?true:false;
			if (i == 0) {
				isPositive = newIsP;
			} else if (isPositive != newIsP){
				return false;
			}
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
		var firstP:int = -1; 
		var firstT:int = -1;
		var secondP:int = -1; 
		var secondT:int = -1;
		
		var i:int = 0;
		
		for (i = 0; i < nVertices; i++) {
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
		var tipT:int = 0;
		if (tipT == firstT || tipT == secondT) tipT = 1;
		if (tipT == firstT || tipT == secondT) tipT = 2;
		
		var newx:Array = new Array();
		var newy:Array = new Array();
		var currOut = 0;
		
		for (i = 0; i < nVertices; i++) {
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