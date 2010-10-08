/**
 * ...
 * @author Matt Benton
 */

package flash.events;

import flash.display.InteractiveObject;

class TouchEvent extends MouseEvent 
{
	public static var TOUCH_BEGIN : String = "touchBegin";
	public static var TOUCH_END : String = "touchEnd";
	public static var TOUCH_MOVE : String = "touchMove";
	public static var TOUCH_OUT : String = "touchOut";
	public static var TOUCH_OVER : String = "touchOver";
	public static var TOUCH_ROLL_OUT : String = "touchRollOut";
	public static var TOUCH_ROLL_OVER : String = "touchRollOver";
	public static var TOUCH_TAP : String = "touchTap";
	
	public var touchPointID : Int;
	public var isPrimaryTouchPoint : Bool;
   
	public function new(type : String,
		bubbles : Bool = true, 
		cancelable : Bool = false,
		in_localX : Float = 0,
		in_localY : Float = 0,
		in_relatedObject : InteractiveObject = null,
		in_ctrlKey : Bool = false,
		in_altKey : Bool = false,
		in_shiftKey : Bool = false,
		in_buttonDown : Bool = false,
		in_delta : Int = 0,
		in_commandKey:Bool = false,
		in_clickCount:Int = 0 )
	{
		super(type,bubbles,cancelable,in_localX,in_localY, in_relatedObject,
			in_ctrlKey, in_altKey, in_shiftKey, in_buttonDown, in_delta);
		
		touchPointID = 0;
		isPrimaryTouchPoint = true;
	}
	
}