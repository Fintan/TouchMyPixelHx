/**
 * ...
 * @author Matt Benton
 */

package touchmypixel.geom;

typedef Vertex =
{
	var x : Float;
	var y : Float;
}

class Triangulator 
{
	static public function triangulate( vertices : Array<Vertex> ) : Array<Triangle>
	{
		var xA = new Array<Float>();
		var yA = new Array<Float>();
		
		for ( v in vertices )
		{
			xA.push(v.x);
			yA.push(v.y);
		}
		
		return triangulateFromFlatArray(xA, yA);
	}
	
	static public function triangulateFromFlatArray( vx : Array<Float>, vy : Array<Float> ) : Array<Triangle>
	{
		if ( vx.length < 3 || vy.length < 3 || vx.length != vy.length )
		{
			throw "Plase make sure both arrays are of the same length and have at least 3 vertices in them!";
			return null;
		}
		
		var vNum = vx.length;
		
		var buffer = new Array<Triangle>();
		var bufferSize = 0;
		
		var xrem = new Array<Float>();
		var yrem = new Array<Float>();
		
		var i = 0;
		while ( i < vNum )
		{
			xrem[i] = vx[i];
			yrem[i] = vy[i];
			i++;
		}
		
		while ( vNum > 3 )
		{
			// Find an ear
			var earIndex = -1;
			i = 0;
			while ( i < vNum )
			{
				if ( isEar(i, xrem, yrem) )
				{
					earIndex = i;
					break;
				}
				i++;
			}
			
			// If we still haven't found an ear, we're screwed.
			// The user did Something Bad, so return null.
			// This will probably crash their program, since
			// they won't bother to check the return value.
			// At this we shall laugh, heartily and with great gusto.
			if (earIndex == -1) 
			{
				throw "Error: No ear found!";
				return null;
			}
			
			// Clip off the ear:
			// - remove the ear tip from the list

			// Opt note: actually creates a new list, maybe
			// this should be done in-place instead.  A linked
			// list would be even better to avoid array-fu.
			--vNum;
			var newx = new Array<Float>();
			var newy = new Array<Float>();
			var currDest = 0;
			i = 0;
			while ( i < vNum )
			{
				if (currDest == earIndex) 
					++currDest;
				newx[i] = xrem[currDest];
				newy[i] = yrem[currDest];
				++currDest;
				i++;
			}
			
			//  - add the clipped triangle to the triangle list
			var under = (earIndex == 0)?(xrem.length - 1):(earIndex - 1);
			var over = (earIndex == xrem.length - 1)?0:(earIndex + 1);
			var toAdd = new Triangle(xrem[earIndex], yrem[earIndex], xrem[over], yrem[over], xrem[under], yrem[under]);
			buffer[bufferSize] = toAdd;
			++bufferSize;
				
			//  - replace the old list with the new one
			xrem = newx;
			yrem = newy;
		}
		
		var toAddMore = new Triangle(xrem[1], yrem[1], xrem[2], yrem[2], xrem[0], yrem[0]);
		buffer[bufferSize] = toAddMore;
		++bufferSize;

		var res = new Array<Triangle>();
		i = 0;
		while ( i < bufferSize )
		{
			res[i] = buffer[i];
			i++;
		}
		
		return res;
	}
	
	
	/* takes: array of Triangles 
	 * returns: array of Polygons
	 * */
	static public function polygonizeTriangles( triangulated : Array<Triangle> ) : Array<Polygon>
	{
		var polys : Array<Polygon> = null; 
		var polyIndex = 0;
		
		if ( triangulated == null )
			return null;
		else 
		{
			polys = new Array<Polygon>();
			var covered = new Array<Bool>();
			for ( i in 0 ... triangulated.length )
				covered[i] = false;

			var notDone = true;

			while (notDone)
			{
				//trace("w");
				var currTri = -1;
				for ( i in 0 ... triangulated.length )
				{
					//trace("x");
					if (covered[i])	continue;
					currTri = i;
					break;
				}
				
				var poly : Polygon = null;
				
				if (currTri == -1)
				{
					notDone = false;
					continue;
				}
				else
				{
					poly = new Polygon(triangulated[currTri].x, triangulated[currTri].y);
					covered[currTri] = true;
					for ( i in 0 ... triangulated.length )
					{
						//trace("y");
						if (covered[i]) continue;
						var newP = poly.add(triangulated[i]);
						if (newP == null) continue;
						if (newP.isConvex())
						{
							poly = newP;
							covered[i] = true;
						}
					}
				}
				
				polys[polyIndex] = poly;
				polyIndex++;
			}
		}
		
		var ret = new Array<Polygon>();
		for ( i in 0 ... polyIndex )
		{
			//trace("z");
			ret[i] = polys[i];
		}
		return ret;
	}
	
	
	/**
	 * Checks if vertex at index i is the tip of an ear.
	 */
	static public function isEar( i : Int, vx : Array<Float>, vy : Array<Float> ) : Bool
	{
		if ( i >= vx.length || i < 0 || vx.length < 3 )
			return false;
		
		var upper = i + 1;
		var lower = i - 1;
		
		var dx0 = 0.0;
		var dy0 = 0.0;
		var dx1 = 0.0;
		var dy1 = 0.0;
		
		if ( i == 0 )
		{
			dx0 = vx[0] - vx[vx.length - 1];
			dy0 = vy[0] - vy[vy.length - 1];
			dx1 = vx[1] - vx[0];
			dy1 = vy[1] - vy[0];
			lower = vx.length - 1;
		}
		else if ( i == vx.length - 1 )
		{
			dx0 = vx[i] - vx[i - 1];
			dy0 = vy[i] - vy[i - 1];
			dx1 = vx[0] - vx[i];
			dy1 = vy[0] - vy[i];
			upper = 0;
		} 
		else
		{
			dx0 = vx[i] - vx[i - 1];
			dy0 = vy[i] - vy[i - 1];
			dx1 = vx[i + 1] - vx[i];
			dy1 = vy[i + 1] - vy[i];
		}
		
		var cross = (dx0 * dy1) - (dx1 * dy0);
		if ( cross > 0 ) 
			return false;
		
		var myTri:Triangle = new Triangle(vx[i], vy[i], vx[upper], vy[upper], vx[lower], vy[lower]);
		
		var j = 0;
		while ( j < vx.length )
		{
			if (!(j == i || j == lower || j == upper)) 
			{
				if (myTri.isInside(vx[j], vy[j])) 
					return false;
			}
			j++;
		}
		return true;
	}
	
	/**
	 * Determines the winding direction of a polygon.
	 * 
	 * Assumes that
	 * - the polygon is closed
	 * - the last point is not repeated
	 * - the polygon is simple (does not intersect itself or have holes)
	 * 
	 * Returns <code>true</code> for CCW, <code>false</code> for CC winding polygons or <code>null</code> 
	 * for incomputable polygons (e.g. colinear points).
	 * 
	 * @see http://debian.fmi.uni-sofia.bg/~sergei/cgsr/docs/clockwise.htm
	 */
	static public function isWindingDirectionCCW( vertices : Array<Vertex> ) : Null<Bool>
	{
		var count = 0;
		var n = vertices.length;
		
		if ( n < 3 )
			return null;
			
		var i = 0;
		while ( i < n )
		{
			var j = (i + 1) % n;
			var k = (i + 2) % n;
			//var z = (vertices[j][0] - vertices[i][0]) * (vertices[k][1] - vertices[j][1]);
			//z -= (vertices[j][1] - vertices[i][1]) * (vertices[k][0] - vertices[j][0]);
			var z = (vertices[j].x - vertices[i].x) * (vertices[k].y - vertices[j].y);
			z -= (vertices[j].y - vertices[i].y) * (vertices[k].x - vertices[j].x);
			
			if ( z < 0 )
				count--;
			else if ( z > 0 )
				count++;
		
			i++;
		}
		
		if ( count > 0 )
			return false;
		else if ( count < 0 )
			return true;
		else
			return null;
	}
	
}