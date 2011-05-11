/**
 * 
 * DisplayTypeDefs by Fintan Boyle
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

package fboyle.display;

// - cascading typedefs to align EaselJs display list with Flash display list

#if (flash || cpp)

typedef DisplayObjectHx = flash.display.DisplayObject;
typedef ContainerHx = flash.display.MovieClip;
typedef BitmapHx = flash.display.Bitmap;
typedef StageHx = flash.display.Stage;
typedef ShapeHx = flash.display.Sprite;
typedef GraphicsHx = flash.display.Graphics;
typedef TextFieldHx = flash.text.TextField;

#elseif easeljs

typedef DisplayObjectHx = easelhx.display.DisplayObject;
typedef ContainerHx = easelhx.display.Container;
typedef BitmapHx = easelhx.display.Bitmap;
typedef StageHx = easelhx.display.Stage;
typedef ShapeHx = easelhx.display.Shape;
typedef GraphicsHx = easelhx.display.Graphics;
typedef TextFieldHx = easelhx.display.Text;


#end

//js and cpp will use spritesheets

typedef AnimationSequenceInfo = {

	var frameWidth:Float;
	var frameHeight:Float;
	#if js
	var registrationPoint:easelhx.geom.Point;
	#elseif cpp
	var registrationPoint:nme.geom.Point;
	#end
	var name:String;
	var file:String;
	var sheetindicies:String;
	var startFrame:Int;
	var endFrame:Int;
	var scope:ContainerHx;

}