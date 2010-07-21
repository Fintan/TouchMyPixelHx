package ;

#if js
import touchmypixel.game.LayoutWriter;
#else 
import flash.Lib;
import test.RacingExample;
import test.SimpleExample;
#end

class Main 
{
	#if cpp
	public function new()
	{
		new RacingExample(true);
	}
	#end
	
	static function main() 
	{		
		#if js
			new touchmypixel.game.LayoutWriter();
		#elseif flash
			new RacingExample();
			//new RacingExample();
			//new test_creator.TestXML();
		#else
			flash.Lib.create(function() { flash.Lib.current.addChild(new test.RacingExample()); }, 800, 600, 100, 0xffffff, (1 * nme.Lib.HARDWARE) | nme.Lib.RESIZABLE);
		#end
	}	
	
}