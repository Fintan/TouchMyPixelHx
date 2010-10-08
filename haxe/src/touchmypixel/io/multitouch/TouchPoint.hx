/**
 * ...
 * @author Matt Benton
 */

package ui;

import flash.display.DisplayObject;

class TouchPoint 
{
	// Time the touch was created in milliseconds
	public var beginTime : Int;
	public var beginTarget : DisplayObject;
	
	public var stageX : Float;
	public var stageY : Float;
	
	public var info : TouchInfo;
	
	public var id : Int;
	public var touchID : Int;
	
	public var originX : Float;
	public var originY : Float;
	
	public var gesture : TouchGesture;
	
	public function new() 
	{
		gesture = null;
	}
	
}