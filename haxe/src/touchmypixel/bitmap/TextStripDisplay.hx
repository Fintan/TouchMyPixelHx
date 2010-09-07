package touchmypixel.bitmap;
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.Sprite;

/**
 * ...
 * @author Tonypee
 */

class TextStripDisplay extends Sprite
{
	var strip:TextStrip;
	var align:Align;
	var bitmap:Bitmap;
	var oldText:String;
	
	public function new(text:String, strip:TextStrip, ?align:Align) 
	{
		super();
		
		if (align == null)
			align = LEFT;
			
		this.strip = strip;
		this.align = align;
		
		bitmap = new Bitmap(new BitmapData(1,1));
		addChild(bitmap);
		
		if (text != "")
			display(text);
	}
	
	public function display(text:String)
	{
		if (text != oldText)
		{
			if (text == "") {
				bitmap.bitmapData = null;
			}
			else {
				bitmap.bitmapData = strip.getText(text);
			}
			oldText = text;
		}
		
		bitmap.x = switch(align)
		{
			case LEFT: 0;
			case RIGHT: -bitmap.width;
			case CENTER: -bitmap.width / 2;
		}
	}
}

enum Align {
	LEFT;
	RIGHT;
	CENTER;
}