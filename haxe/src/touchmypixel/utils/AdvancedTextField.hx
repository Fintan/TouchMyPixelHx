/**
 * ...
 * @author Tonypee
 */

package touchmypixel.utils;

import flash.display.Shape;
import flash.display.Sprite;
import flash.text.TextField;

class AdvancedTextField
{
	static var tags:Array < String > = ["p", "h1", "h2", "h3", "li"];
	
	public static function replace(sourceTextField:TextField, ?paragraphSpacing:Float=10) 
	{
		var results = parse(sourceTextField.htmlText);
		
		var clip = new Sprite();
		
		clip.x = sourceTextField.x;
		clip.y = sourceTextField.y;
		
		var ty:Float = 0;
		
		for (r in results)
		{
			var t = new TextField();
			t.antiAliasType = sourceTextField.antiAliasType;
			t.multiline = sourceTextField.multiline;
			t.wordWrap = sourceTextField.wordWrap;
			t.defaultTextFormat = sourceTextField.defaultTextFormat;
			t.styleSheet = sourceTextField.styleSheet;
			t.embedFonts = sourceTextField.embedFonts;
			t.sharpness = sourceTextField.sharpness;
			t.thickness = sourceTextField.thickness;
			t.selectable = sourceTextField.selectable;
			
			t.htmlText = "<"+r.tag+">" + r.content + "</"+r.tag+">";
			
			switch(r.tag)
			{
				case "li":
					t.x -= 10;
					t.width = sourceTextField.width;
					var bullet = new Shape();
					
					bullet.graphics.beginFill(0xffffff, 1);
					bullet.graphics.drawCircle(15, ty+15, 4);
					clip.addChild(bullet);
					
				default : 
					t.width = sourceTextField.width;
			}
			t.y = ty;
			t.height = t.textHeight + paragraphSpacing;
			//ty = t.getBounds(sourceTextField.parent).bottom;
			ty = t.y + t.height;
			clip.addChild(t);
		}
		
		var parent = sourceTextField.parent;
		var index = parent.getChildIndex(sourceTextField);
		parent.removeChild(sourceTextField);
		parent.addChildAt(clip,index);
		
		//return clip;
	}
	

	static function parse(s)
	{
		var position = 0;
		var nextTag = null; 
		var results  = [];
		var c = 0;
		while (position != -1)
		{
			if (c > 9999)
			{
				throw "TextFormatter Infinate loop";
				break;
			}
			c++;
			var start = findTag(s, position, false); 
			if (start.pos == -1) break;	
			var end =  findTag(s, start.pos, true);
			var p1 = start.pos + start.tag.length+2;
			var p2 = end.pos;
			results.push({tag:start.tag, content:s.substr(p1,  p2 - p1)});
			position = end.pos;
		}
		return results;
	}
	
	static function findTag(s:String, start:Int, end:Bool)
	{
		var next = "";
		var pos = -1;
		for (t in tags)
		{
			var p = s.indexOf("<"+(end?"/":"") + t + ">", start);
			if (p != -1)
			{
				if (pos == -1)
				{
					next = t;
					pos = p;
				}
				else if (p < pos)
				{
					next = t;
					pos = p;
				}
			}
		}
		return { tag:next, pos:pos };
	}
}

typedef Result =
{
	var type:String;
	var content:String;
}