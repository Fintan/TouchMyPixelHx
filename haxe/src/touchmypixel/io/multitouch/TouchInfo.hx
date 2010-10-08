/**
 * ...
 * @author Matt Benton
 */

package ui;

import flash.display.Sprite;
import flash.text.TextField;
import flash.text.TextFieldAutoSize;
import flash.text.TextFormat;

class TouchInfo extends Sprite
{
	public var tf : TextField;
	public var id : Int;
	public var color : Int;
	
	public function new() 
	{
		super();
		
		id = 0;
		
		tf = new TextField();
		tf.defaultTextFormat = new TextFormat(null, 40, 0x000000, true);
		tf.mouseEnabled = false;
		tf.autoSize = TextFieldAutoSize.LEFT;
		tf.selectable = false;
		addChild(tf);
		
		color = 0x0000ff;
		render();
	}
	
	public function render() : Void
	{
		tf.text = Std.string(id);
		//trace(tf.textWidth);
		tf.x = -tf.textWidth/2;
		tf.y = -tf.textHeight/2;
		
		graphics.clear();
		graphics.beginFill(color);
		graphics.drawCircle(0, 0, 40);
	}
}