
/**
 * HXS - Haxe Signals Library
 * @author Tony Polinelli
 */

 
package ;

import hxsTest.General;

#if flash
import hxsTest.Flash;
#end

class Main
{
	/*
	
	Comment / uncomment to switch test file. Uncomment specific tests in that file later.
	
	*/
	static function main() 
	{
		
	//	new General();
		
		#if flash
		new Flash();
		#end
	}	
}