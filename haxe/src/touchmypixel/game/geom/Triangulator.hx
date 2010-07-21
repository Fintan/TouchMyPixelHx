 /* 
 * Based on JSFL util by mayobutter (Box2D Forums)
 * and  Eric Jordan (http://www.ewjordan.com/earClip/) Ear Clipping experiment in Processing
 * 
 * Tarwin Stroh-Spijer - Touch My Pixel - http://www.touchmypixel.com/
 * Tony Polinelli - Touch My Pixel - http://www.touchmypixel.com/
 * */

package touchmypixel.game.geom;

import flash.geom.Point;

class Triangulator {
	
	public function new()
	{	
	}
	
	/* give it an array of points (vertexes)
	 * returns an array of Triangles
	 * */
	public static function triangulatePolygon(v:Array<Point>):Array<Float>
	{
		var xA = new Array();
		var yA = new Array();
		
		for(p in v) {
			xA.push(p.x);
			yA.push(p.y);
		}
		
		return(triangulatePolygonFromFlatArray(xA, yA));
	}
	
	/* give it a list of vertexes as flat arrays
	 * returns an array of Triangles
	 * */
	public static function triangulatePolygonFromFlatArray(xv:Array<Float>, yv:Array<Float>):Array<Float>
	{
		if (xv.length < 3 || yv.length < 3 || yv.length != xv.length) {
			trace("Please make sure both arrays or of the same length and have at least 3 vertices in them!");
			return null;
		}
		
		var i:int = 0;
		var vNum:int = xv.length;
	  
		var buffer:Array = new Array();
		var bufferSize:Int = 0;
		var xrem:Array = new Array();
		var yrem = new Array();
		
		//for (i = 0; i < vNum; ++i) {
		var i = 0; 
		while (i < vNum)
		{
			xrem[i] = xv[i];
			yrem[i] = yv[i];
			i++;
		}

		while (vNum > 3){
			//Find an ear
			var earIndex = -1;
			//for (i = 0; i < vNum; ++i) {
			var i = 0; 
			while (i < vNum)
			{
				if (isEar(i, xrem, yrem)) {
					earIndex = i;
					break;
				}
				i++;
			}

			//If we still haven't found an ear, we're screwed.
			//The user did Something Bad, so return null.
			//This will probably crash their program, since
			//they won't bother to check the return value.
			//At this we shall laugh, heartily and with great gusto.
			if (earIndex == -1) {
				trace('no ear found');
				return null;
			}

			//Clip off the ear:
			//  - remove the ear tip from the list

			//Opt note: actually creates a new list, maybe
			//this should be done in-place instead.  A linked
			//list would be even better to avoid array-fu.
			--vNum;
			var newx:Array<Float> = new Array();
			var newy:Array<Float> = new Array();
			var currDest:Int = 0;
			//for (i = 0; i < vNum; ++i) {
			var i = 0;
			while (i < vNum)
			{
				if (currDest == earIndex) ++currDest;
				newx[i] = xrem[currDest];
				newy[i] = yrem[currDest];
				++currDest;
				i++;
			}

			//  - add the clipped triangle to the triangle list
			var under:Int = (earIndex == 0)?(xrem.length - 1):(earIndex - 1);
			var over:Int = (earIndex == xrem.length - 1)?0:(earIndex + 1);
			var toAdd:Triangle = new Triangle(xrem[earIndex], yrem[earIndex], xrem[over], yrem[over], xrem[under], yrem[under]);
			buffer[bufferSize] = toAdd;
			++bufferSize;
				
			//  - replace the old list with the new one
			xrem = newx;
			yrem = newy;
		}
		
		var toAddMore:Triangle = new Triangle(xrem[1], yrem[1], xrem[2], yrem[2], xrem[0], yrem[0]);
		buffer[bufferSize] = toAddMore;
		++bufferSize;

		var res:Array = new Array();
		for (i = 0; i < bufferSize; i++) {
			res[i] = buffer[i];
		}
		return res;
	}
	
	/* takes: array of Triangles 
	 * returns: array of Polygons
	 * */
	public static function polygonizeTriangles(triangulated:Array):Array
	{
		var polys:Array;
		var polyIndex:int = 0;

		var i:int = 0;
		
		if (triangulated == null){
			return null;
		} else {
			polys = new Array();
			var covered:Array = new Array();
			for (i = 0; i < triangulated.length; i++) {
				covered[i] = false;
			}

			var notDone:Boolean = true;

			while(notDone){
				var currTri:int = -1;
				for (i = 0; i < triangulated.length; i++) {
					if (covered[i]) continue;
					currTri = i;
					break;
				}
				if (currTri == -1){
					notDone = false;
				} else{
					var poly:Polygon = new Polygon(triangulated[currTri].x, triangulated[currTri].y);
					covered[currTri] = true;
					for (i = 0; i < triangulated.length; i++) {
						if (covered[i]) continue;
						var newP:Polygon = poly.add(triangulated[i]);
						if (newP == null) continue;
						if (newP.isConvex()){
							poly = newP;
							covered[i] = true;
						}
					}
				}
				polys[polyIndex] = poly;
				polyIndex++;
			}
		}
		
		var ret:Array = new Array();
		for (i = 0; i < polyIndex; i++) {
			ret[i] = polys[i];
		}
		return ret;
	}

	//Checks if vertex i is the tip of an ear
	/*
	 * */
	public static function isEar(i:int, xv:Array, yv:Array):Boolean
	{
		var dx0:Number, dy0:Number, dx1:Number, dy1:Number;
		dx0 = dy0 = dx1 = dy1 = 0;
		if (i >= xv.length || i < 0 || xv.length < 3) {
			return false;
		}
		var upper:int = i + 1;
		var lower:int = i - 1;
		if (i == 0){
			dx0 = xv[0] - xv[xv.length - 1];
			dy0 = yv[0] - yv[yv.length - 1];
			dx1 = xv[1] - xv[0];
			dy1 = yv[1] - yv[0];
			lower = xv.length - 1;
		} else if (i == xv.length - 1) {
			dx0 = xv[i] - xv[i - 1];
			dy0 = yv[i] - yv[i - 1];
			dx1 = xv[0] - xv[i];
			dy1 = yv[0] - yv[i];
			upper = 0;
		} else{
			dx0 = xv[i] - xv[i - 1];
			dy0 = yv[i] - yv[i - 1];
			dx1 = xv[i + 1] - xv[i];
			dy1 = yv[i + 1] - yv[i];
		}
		
		var cross:Number = (dx0*dy1)-(dx1*dy0);
		if (cross > 0) return false;
		var myTri:Triangle = new Triangle(xv[i], yv[i], xv[upper], yv[upper], xv[lower], yv[lower]);

		for (var j:int = 0; j < xv.length; ++j) {
			if (!(j == i || j == lower || j == upper)) {
				if (myTri.isInside(xv[j], yv[j])) return false;
			}
		}
		return true;
	}	
}
