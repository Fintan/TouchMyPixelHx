/**
 * ...
 * @author Matt Benton
 */

package touchmypixel.io.multitouch;

import flash.display.DisplayObject;
import flash.events.Event;
import flash.events.IEventDispatcher;
import flash.events.MouseEvent;
import flash.Lib;

import flash.events.TouchEvent;

typedef Bob = TouchEvent -> Void;

class MultiTouch 
{
	public var touches : IntHash<TouchPoint>;
	
	static var touchColors : Array<Int> = [0x0000ff, 0xff0000, 0xff00ff, 0xffff00, 0x00ffff];
	
	public var maxTapDuration : Int; // Milliseconds
	public var minSwipeDistance : Float;
	public var maxSwipeDuration : Float; // Milliseconds
	
	var scope : DisplayObject;
	var minSwipeDistSquared : Float;
	
	var mouseDownEvent : MouseEvent;
	var mouseUpEvent : MouseEvent;
	var mouseMoveEvent : MouseEvent;
	
	public function new(scope:DisplayObject)
	{
		this.scope = scope;
		
		touches = new IntHash<TouchPoint>();
		
		maxTapDuration = 250;
		minSwipeDistance = 100;
		maxSwipeDuration = 500;
		
		minSwipeDistSquared = minSwipeDistance * minSwipeDistance;
		
		#if iphone
		//Main.log("enabling MultiTouch!");
		nme.ui.Multitouch.inputMode = nme.ui.MultitouchInputMode.TOUCH_POINT;	
		
		//Main.log("adding listeners");
		scope.addEventListener(TouchEvent.TOUCH_BEGIN, onTouchBegin);
		scope.addEventListener(TouchEvent.TOUCH_END, onTouchEnd);
		scope.addEventListener(TouchEvent.TOUCH_MOVE, onTouchMove);
		//scope.stage.addEventListener(TouchEvent.TOUCH_BEGIN, onTouchBegin);
		#else
		scope.addEventListener(MouseEvent.MOUSE_DOWN, onMouseEvent);
		scope.addEventListener(MouseEvent.MOUSE_MOVE, onMouseEvent);
		scope.addEventListener(MouseEvent.MOUSE_UP, onMouseEvent);
		#end
		
	}
	
	function onMouseEvent(me:MouseEvent):Void 
	{
		if ( me.type == MouseEvent.MOUSE_DOWN )
		{
			mouseDownEvent = me;
			onTouchBegin(mouseToTouchEvent(TouchEvent.TOUCH_BEGIN, me));
		}
		else if ( me.type == MouseEvent.MOUSE_UP )
		{
			mouseUpEvent = me;
			onTouchEnd(mouseToTouchEvent(TouchEvent.TOUCH_END, me));
		}
		else if ( me.type == MouseEvent.MOUSE_MOVE )
		{
			mouseMoveEvent = me;
			onTouchMove(mouseToTouchEvent(TouchEvent.TOUCH_MOVE, me));
		}
	}
	
	inline function mouseToTouchEvent( type : String, e : MouseEvent ) : TouchEvent
	{
		return new TouchEvent(type, e.bubbles, e.cancelable, e.localX, e.localY, e.relatedObject, e.ctrlKey, e.altKey, e.shiftKey, e.buttonDown, e.delta);
	}
	
	//function onTouchMove(e:TouchEvent, ?me:MouseEvent=null):Void
	function onTouchMove(e:TouchEvent):Void
	{
		if ( touches.exists(e.touchPointID) )
		{
			var touch = touches.get(e.touchPointID);
			var target : IEventDispatcher = null;
			var me = mouseMoveEvent;
			if ( me == null )
			{
				target = e.target;
				touch.stageX = e.stageX;
				touch.stageY = e.stageY;
				touch.info.x = e.stageX;
				touch.info.y = e.stageY;
			}
			else
			{
				target = me.target;
				touch.stageX = me.stageX;
				touch.stageY = me.stageY;
				touch.info.x = me.stageX;
				touch.info.y = me.stageY;
			}
			
			var dx = touch.originX - touch.stageX;
			var dy = touch.originY - touch.stageY;
			var distSq = dx * dx + dy * dy;
			
			//trace("moveTarget: " + target);
			
			if ( touch.gesture == null )
			{
				var time = Lib.getTimer();
				if ( distSq >= minSwipeDistSquared && (time - touch.beginTime) <= maxSwipeDuration )
				{
					//Main.log("swipe!");
					touch.gesture = new SwipeGesture();
					if ( touch.beginTarget != null )
						touch.beginTarget.dispatchEvent(new GestureEvent(GestureEvent.SWIPE_BEGIN, true, true));
				}
			}
		}
	}
	
	function onTouchEnd(e:TouchEvent):Void 
	{
		//trace("onTouchEnd");
		
		if ( touches.exists(e.touchPointID) )
		{
			var touch = touches.get(e.touchPointID);
			
			var time = Lib.getTimer();
			var duration = time - touch.beginTime;
			
			var dx = touch.originX - touch.stageX;
			var dy = touch.originY - touch.stageY;
			var dist = Math.sqrt(dx * dx + dy * dy);
			//Main.log("dur: " + duration, touch.id);
			//Main.log("dist: " + dist, touch.id);
			
			Main.removeTouch(touch.info);
			touches.remove(e.touchPointID);
		}
	}
	
	function onTouchBegin(e:TouchEvent):Void 
	{
		//trace("onTouchBegin");
		
		var touch = new TouchPoint();
		touch.id = getNextID();
		touch.touchID = e.touchPointID;
		touch.beginTime = Lib.getTimer();
		
		//var target : IEventDispatcher = null;
		var me = mouseDownEvent;
		if ( me == null )
		{
			touch.originX = e.stageX;
			touch.originY = e.stageY;
			touch.stageX = e.stageX;
			touch.stageY = e.stageY;
			
			touch.beginTarget = e.target;
			//Main.log("ct: " + e.currentTarget); 
			//Main.log("t: " + e.target);
			//Main.log("ro: " + e.relatedObject);
			
			if ( e.target != scope )
				cast(e.target, IEventDispatcher).dispatchEvent(e);
		}
		else
		{
			touch.originX = me.stageX;
			touch.originY = me.stageY;
			touch.stageX = me.stageX;
			touch.stageY = me.stageY;
			
			touch.beginTarget = me.target;
			
			if ( me.target != scope )
				cast(me.target, IEventDispatcher).dispatchEvent(e);
		}
		
		//Main.log("beginTarget: " + touch.beginTarget);
		
		var info = new TouchInfo();
		info.color = touchColors[touch.id];
		info.id = touch.id;
		info.x = touch.stageX;
		info.y = touch.stageY;
		info.render();
		Main.addTouch(info);
		
		touch.info = info;
		
		touches.set(e.touchPointID, touch);
	}

	function getNextID() : Int
	{
		var lowestId = 0;
		
		while ( true )
		{
			var ok = true;
			for ( touch in touches )
			{
				if ( touch.id == lowestId )
				{
					lowestId++;
					ok = false;
					break;
				}
			}
			if ( ok == true )
				break;
		}
		
		return lowestId;
	}
	
	public function update() : Void
	{
		
	}
	
}