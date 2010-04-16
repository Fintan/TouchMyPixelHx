
/**
 * HXS - Haxe Signals Library
 * @author Tony Polinelli
 */

 
package ;

import flash.display.Sprite;
import flash.events.Event;
import flash.events.MouseEvent;
import flash.Lib;
import flash.text.TextField;

import hxs.extras.AS3Signal;
import hxs.Signal;
import hxs.Signal1;
import hxs.Signal2;
import hxs.Signal3;
import hxs.Signal4;
import hxs.Signal5;
import hxs.SignalInfo;


class Main extends Sprite
{
	static function main() 
	{
		Lib.current.addChild(new Main());
	}	
	/*
	
	Comment / uncomment the examples to view each example
	
	*/
	public function new()
	{
		super();
		
		//testSimple();
		//testMuteSignal();
		testMuteListener();
		//testBubbling();
		//testAS3();
		//testTriggers();
		
	}
	
	/*
	
	Quite Simply a Signal has listerner funcitons assigned to it (via the 'add' method) which is calls when 'dispatch' is called. 
	There are differnt Signal classes for the number of arguments you may want to dispatch to the listeners. 
	
	*/
	public function testSimple()
	{
		// A simple signal that dispatches to a listener function.
		
		var s = new Signal();
		s.add(function() {
			trace("test simple signal");
		});
		s.dispatch();
		
		// A Signal which will dispatch with 3 arguments. 
		//The variable s3 could be typed ( var s2:Signal3<String,Int,Float> ) or we can simply use type inference
		
		var s3 = new Signal3();
		s3.add(function(s:String, v1:Int, v2:Float) {
			trace("test " + s +" signal: product of " + v1 + " and " + v1 + " is: " + (v1 * v2));
		});
		s3.dispatch("more complex", 3,3.4);
	}
	
	/*
	
	A signal can be muted, so that when 'dispatch' is called on it, none of the listeners are called. 
	
	*/
	public function testMuteSignal()
	{
		var s1 = new Signal1();
		s1.add(function(v:Int) {
			trace("test muting step: " + v);
			
			SignalInfo.muteCurrentSignal();
		});
		
		// first one will dispatch
		s1.dispatch(1);
		
		// signal is muted after accesing it via the SignalInfo object - this dispatch will not occur
		s1.dispatch(2);
		
		// manually access the signal and tell it to be un-muted
		s1.unmute();
	
		// final dispatch will now occur
		s1.dispatch(3);
	}
	
	/*
	
	The listeners which are added to a signal can be indivitudally muted. 
	This can be done via the SignalInfo statics, or via accessing muteListener(xx) and unmuteLister(xx) in the signal object
	
	*/
	public function testMuteListener()
	{
		var s1 = new Signal1();
		var listener1 = function(v:Int) {
			trace("listener 1, step:" + v);
			
			// mute this listener
			SignalInfo.muteCurrentListener();
		}
		
		s1.add(listener1);

		s1.add(function(v:Int) {
			trace("listener 2, step:" + v);
		});
		
		s1.dispatch(1);
		
		trace("-");
		trace("the first listener is muted so would be here.. but isnt here");
		s1.dispatch(2);
		
		trace("-");
		// unmute it directly
		s1.unmuteListener(listener1);
		s1.dispatch(3);
		
	}
	
	/*
	
	Bubbling is not embedded into the event system as it is not needed. Signals can easily be bound together via a simple dispatch. 
	This gives you full flexability of mapping the arguments in which ever order you want, and between different numbers of arguments.
	
	For example we can map easily from a signal that takes 3 args to a signal that expects 2 - and use the 2nd and 3rd - as they are Ints (which is expected in this example)
	
	This might be changed - instead of 'add' you might call 'bubble' and these listeners will be treated differently. In perticular they will still fire when the signal is muted, as to make bubbling work with muted signals
	
	*/
	public function testBubbling()
	{
		var s2 = new Signal2();
		var s3 = new Signal3();
		
		s2.add(function(a:Int, b:Int) {
			var val = a * b;
			trace("signal 2 recieves bubbled event and calculates" + val);
		});
		s3.add(function(a:String, b:Int, c:Int) {
			var val = b + c;
			trace("signal 4 dispatches to say: " + a + "and calculates: " + val );
		});
		
		// set up the link
		s3.add(function (a, b, c) s2.dispatch(b, c));
		
		
		s3.dispatch("numbers", 3, 4);
	}
	
	/*
	
	An AS3 event expects to be bound to a listener which expects 1 argument (the native flash event). it is a simple way to use Signal style events with Native Flash events. 
	
	*/
	public function testAS3()
	{
		graphics.beginFill(0, 1);
		graphics.drawRect(300, 300, 100, 100);
		
		var tf = new TextField();
		tf.x = tf.y = 200;
		tf.text = "click the box";
		addChild(tf);
		
		var onClick = new AS3Signal(this, MouseEvent.CLICK);
		
		onClick.add(function(e){
			
			trace("clicked");
		});	
	}
	
	/*
	
	A trigger is holds a closure, with the data you want to fire when dispatch is called. 
	
	*/
	public function testTriggers()
	{
		
		var s2 = new Signal2();
		s2.add(function(a, b) {
			
			trace("triggered sum " + (a + b));
			
		});
		
		s2.add(function(a, b) {
			
			trace("triggered product " + (a * b));
			
		});
		
		var trigger = s2.getTrigger(2, 3);
		var trigger2 = s2.getTrigger(10, 2);
		
		
		// the trigger var can now simply be dispatched at any time - the values cannot be altered by the end used. 
		trigger.dispatch();
		
		trace("--- and trigger 2");
		
		trigger2.dispatch();
	}
}