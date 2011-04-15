/**
 * 
 * BitmapDataUtil by Fintan Boyle
 * Visit www.fboyle.com
 * 
 * Copyright (c) 2010 Fintan Boyle 
 * 
 * 
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php 
 * 
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
package fboyle.utils;

import flash.display.MovieClip;
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.geom.Matrix;

class BitmapDataUtil{

	//static var flipHorizontalMatrix = new Matrix();
	//static var flipVerticalMatrix = new Matrix();
	
	inline public static function flipHorizontal(myBitmap:BitmapData):BitmapData{
		
		//flip horizontal matrix
		var flipHorizontalMatrix = new Matrix();
		flipHorizontalMatrix.scale(-1,1);
		flipHorizontalMatrix.translate(myBitmap.width,0);
		
		var flippedBitmap = new BitmapData(Std.int(myBitmap.width),Std.int(myBitmap.height),true,0x00000000);
		flippedBitmap.draw(myBitmap,flipHorizontalMatrix);
		
		return flippedBitmap;
		
	}
		
	inline public static function flipVertical(myBitmap:BitmapData):BitmapData{
		
		//flip vertical matrix
		var flipVerticalMatrix = new Matrix();
		flipVerticalMatrix.scale(1,-1);
		flipVerticalMatrix.translate(0,myBitmap.height);
		
		var flippedBitmap = new BitmapData(Std.int(myBitmap.width),Std.int(myBitmap.height),true, 0x00000000);
		flippedBitmap.draw(myBitmap,flipVerticalMatrix);
		
		return flippedBitmap;
		
	}

}
