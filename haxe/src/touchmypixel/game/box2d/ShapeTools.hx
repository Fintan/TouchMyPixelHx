package com.touchmypixel.game.box2d;

import box2D.collision.shapes.B2CircleDef;
import box2D.collision.shapes.B2PolygonDef;
//import box2D.collision.shapes.B2ConcaveArcDef;
//import box2D.collision.shapes.B2ConvexArcDef;
import box2D.common.math.B2Vec2;
//import com.touchmypixel.geom.Triangulator;
import flash.geom.Point;

/**
* ...
* @author Tony Polinelli (tonyp@touchmypixel.com)
*/

class ShapeTools 
{
	
	public function ShapeTools() 
	{
		
	}
	
	public static function polygon(worldScale:Float, points:Array<Array<Float>>, ?offsetX:Float = 0, ?offsetY:Float = 0, ?rotation:Float = 0, ?scaleX:Float = 1, ?scaleY:Float = 1):B2PolygonDef
	{
		// Rotate points around center if needed
		if (rotation != 0)
		{
			var newPoints:Array <Array<Float>> = [];
			var r = rotation* Math.PI/180;
			for (p in points)
			{
				var nx = p[0] * Math.cos(r) - p[1] * Math.sin(r);
				var ny = p[1] * Math.cos(r) + p[0] * Math.sin(r);
				newPoints.push([nx, ny]);
			}
			points = newPoints;
		}
		
		var s:B2PolygonDef = new B2PolygonDef();
		s.vertexCount = points.length;
		
		var i = points.length-1;
		for(c in 0...points.length)
		{
			s.vertices[c].Set((points[i][0]* scaleX + offsetX)/ worldScale , (points[i][1]* scaleY + offsetY)/ worldScale );
			i--;
		}
			
		return s;
	}
	
	public static inline function box(worldScale:Float, width:Float, height:Float, ?centerX:Float = 0., ?centerY:Float = 0., rotation:Float = 0., ?scaleX:Float = 1., ?scaleY:Float = 1.):B2PolygonDef 
	{
		return polygon(worldScale, [[-width/2, -height/2], [-width/2, height/2], [width/2, height/2], [width/2, -height/2]], centerX, centerY, rotation, scaleX,scaleY);
	}
	
	public static inline function circle(worldScale:Float, ?centerX:Float = 0, ?centerY:Float = 0, radius:Float, ?scaleX:Float = 1, ?scaleY:Float = 1):B2CircleDef 
	{
		var s:B2CircleDef = new B2CircleDef();
		s.radius = (radius* scaleX) /  worldScale ;
		s.localPosition = new B2Vec2((centerX)/worldScale , (centerY) /worldScale);
		return s;
	}
}
