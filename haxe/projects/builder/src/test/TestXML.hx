/**
 * ...
 * @author Tonypee
 */

package test;

import flash.display.Sprite;
import haxe.xml.Fast;

class TestXML extends Sprite
{

	public function new() 
	{
		super();
		
		var xmlStr = "	<root>
							<item>1</item>
							<item>2</item>
							<item>3</item>
						</root>";
		
		var x = Xml.parse(xmlStr);
		
		var f = new Fast(x);
		
		
		trace(x.firstElement().elements());

		trace(f.node.root.elements);
		
		for (x in x.firstElement().elements())
			trace("x");
			
		var e = (f.node.root.x.elements());
		for (ee in e)
			trace(ee);
	}
	
}