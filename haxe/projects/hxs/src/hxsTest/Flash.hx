
/**
 * HXS - Haxe Signals Library
 * @author Tony Polinelli
 */

 
package hxsTest;

import hxs.core.Info;
import hxs.Signal;
import hxs.Signal1;
import hxs.Signal2;
import hxs.Signal3;
import hxs.Signal4;
import hxs.Signal5;

import flash.display.Sprite;
import flash.events.Event;
import flash.events.MouseEvent;
import flash.Lib;
import flash.text.TextField;
import hxs.extras.AS3Signal;

using hxs.shortcuts.as3.Common;


class Flash extends Sprite
{	
	/*
	
	Comment / uncomment the examples to view each example
	
	*/
	public function new()
	{
		super();
		
		Lib.current.addChild(this);

		//testAS3();
		testAS3Shortcuts();

	}
	
	/*
	
	An AS3 event expects to be bound to a listener which expects 1 argument (the native flash event). it is a simple way to use Signal style events with Native Flash events. 
	
	*/
	public function testAS3()
	{
		var box = new Box(0xffff00);
		addChild(box);
		
		var onClick = new AS3Signal(box, MouseEvent.CLICK);
		
		onClick.add(function(e){
			trace("clicked");
		});	
	}
	
	/* 
	
	Signals can be injected to InteractiveObjects via the 'using' feature. This makes for very concise code.
	
	*/
	public function testAS3Shortcuts()
	{
		var box = new Box(0xff0000);
		box.x = 200;
		addChild(box);
		
		box.onClick().add(function(e) {
			trace("onClick");
		});
		
		box.onRollOver().add(function(e) {
			trace("onRollOver");
		});
		
		box.onRollOut().add(function(e) {
			trace("onRollOut");
		});
		
		box.onMouseDown().add(function(e) {
			trace("onMouseDown");
		});
		
		box.onMouseUp().add(function(e) {
			trace("onMouseUp");
		});
		
		box.onReleaseOutside().add(function(e) {
			trace("** onReleaseOutside ** (HELL YEAH!)");
		});
	}
	
}

class Box extends flash.display.Sprite
{
	public function new(color:Int)
	{
		super();
		
		graphics.beginFill(color, 1);
		graphics.drawRect(0, 0, 100, 100);
		
		var tf = new TextField();
		tf.y = 110;
		tf.text = "click the box";
		addChild(tf);
	}
}