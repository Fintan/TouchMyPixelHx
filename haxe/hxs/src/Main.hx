
/**
 * HXS - Haxe Signals Library
 * @author Tony Polinelli
 */

 
package ;

import test.General;

#if flash
import test.Flash;
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