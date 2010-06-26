 /* 
 * Based on JSFL util by mayobutter (Box2D Forums)
 * and  Eric Jordan (http://www.ewjordan.com/earClip/) Ear Clipping experiment in Processing
 * 
 * Tarwin Stroh-Spijer - Touch My Pixel - http://www.touchmypixel.com/
 * */

package com.touchmypixel.geom;
	
public class Triangle {
	
	public var x:Array = new Array();
	public var y:Array = new Array();
	
	public function Triangle(x1:Float, y1:Float, x2:Float, y2:Float, x3:Float, y3:Float) {
	  
		var dx1:Number = x2-x1;
		var dx2:Number = x3-x1;
		var dy1:Number = y2-y1;
		var dy2:Number = y3-y1;
		var cross:Number = (dx1*dy2)-(dx2*dy1);
		var ccw:Boolean = (cross>0);
		if (ccw){
			x[0] = x1; x[1] = x2; x[2] = x3;
			y[0] = y1; y[1] = y2; y[2] = y3;
		} else{
			x[0] = x1; x[1] = x3; x[2] = x2;
			y[0] = y1; y[1] = y3; y[2] = y2;
		}			
	}
	
	public function isInside(_x:Number, _y:Number){
		var vx2:Number = _x - x[0]; var vy2 = _y - y[0];
		var vx1:Number = x[1] - x[0]; var vy1 = y[1] - y[0];
		var vx0:Number = x[2] - x[0]; var vy0 = y[2] - y[0];
		
		var dot00:Number = vx0 * vx0 + vy0 * vy0;
		var dot01:Number = vx0 * vx1 + vy0 * vy1;
		var dot02:Number = vx0 * vx2 + vy0 * vy2;
		var dot11:Number = vx1 * vx1 + vy1 * vy1;
		var dot12:Number = vx1 * vx2 + vy1 * vy2;
		var invDenom:Number = 1.0 / (dot00 * dot11 - dot01 * dot01);
		var u:Number = (dot11 * dot02 - dot01 * dot12) * invDenom;
		var v:Number = (dot00 * dot12 - dot01 * dot02) * invDenom;
		
		return ((u > 0) && (v > 0) && (u + v < 1));
	}		
}
