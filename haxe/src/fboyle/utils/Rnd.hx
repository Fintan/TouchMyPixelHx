/**
* Rnd by Grant Skinner. Jan 15, 2008
* Visit www.gskinner.com/blog for documentation, updates and more free code.
*
*
* Copyright (c) 2008 Grant Skinner
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

package fboyle.util;
	
// Utility class provides common random functions.
	
class Rnd {

	// static interface:
	// random(); // returns a number between 0-1 exclusive.
	inline public static function random():Float {
		return Math.random();
	}
	/*
	* float(50); // returns a number between 0-50 exclusive
	* float(20,50); // returns a number between 20-50 exclusive
	*/
	inline public static function float(min:Float,max:Float):Float {
		//if (Math.isNaN(max)) { max = min; min=0; }
			return random()*(max-min)+min;
	}
		
	// boolean(); // returns true or false (50% chance of true)
	// boolean(0.8); // returns true or false (80% chance of true)
	inline public static function boolean(chance:Float=0.5):Bool {
		return (random() < chance);
	}
		
	// sign(); // returns 1 or -1 (50% chance of 1)
	// sign(0.8); // returns 1 or -1 (80% chance of 1)
	inline public static function sign(chance:Float=0.5):Int {
		return (random() < chance) ? 1 : -1;
	}
	
	// bit(); // returns 1 or 0 (50% chance of 1)
	// bit(0.8); // returns 1 or 0 (80% chance of 1)
	inline public static function bit(chance:Float=0.5):Int {
		return (random() < chance) ? 1 : 0;
	}
	
	// integer(50); // returns an integer between 0-49 inclusive
	// integer(20,50); // returns an integer between 20-49 inclusive
	inline public static function integer(min:Int,max:Int):Int {
		//if (Math.isNaN(max)) { max = min; min=0; }
		// Need to use floor instead of bit shift to work properly with negative values:
		return Math.floor(float(min,max));
	}

}
