/**
 * ...
 * @author Matt Benton
 */

package ui;

import flash.events.Event;

class GestureEvent extends Event
{
	public static var SWIPE_BEGIN : String = "swipeBegin";
	
	public var touchPoint : TouchPoint;
	
	public function new(type:String, bubbles:Bool, cancelable:Bool) 
	{
		super(type, bubbles, cancelable);
	}
	
}