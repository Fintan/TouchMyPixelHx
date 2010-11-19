package fboyle.game.core;

import flash.geom.Point;
import flash.display.DisplayObject;

class FBGame{

	public static var camera:Point = new Point();
	
	/**
	 * The width of the screen in game pixels.
	 */
	public static var width:Int;
		
	/**
	 * The height of the screen in game pixels.
	 */
	public static var height:Int;
	
	/**
	 * Represents the amount of time in seconds that passed since last frame.
	 */
	public static var elapsed:Float;
	
	public static function scroll(canvas:DisplayObject):Void{
		
		/*var m = canvas.transform.matrix;
		//m.scale(-1,1);
		m.translate(camera.x,camera.y);
		canvas.transform.matrix = m;
		*/
		canvas.x = -camera.x;
		canvas.y = -camera.y;
	}
	
}
