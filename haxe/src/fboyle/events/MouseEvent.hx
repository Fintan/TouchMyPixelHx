/**
 * 
 * Event by Fintan Boyle
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
package fboyle.events;

class MouseEvent {
	
	#if !easeljs
	
	public static var CLICK:String = flash.events.MouseEvent.CLICK;
	public static var ROLL_OVER:String = flash.events.MouseEvent.ROLL_OVER;
	public static var ROLL_OUT:String = flash.events.MouseEvent.ROLL_OUT;
	public static var MOUSE_MOVE:String = flash.events.MouseEvent.MOUSE_MOVE;
	public static var MOUSE_DOWN:String = flash.events.MouseEvent.MOUSE_DOWN;
	public static var MOUSE_UP:String = flash.events.MouseEvent.MOUSE_UP;
	
	#else
	
	public static var CLICK:String = "onClick";
	public static var ROLL_OVER:String = "onMouseOver";
	public static var ROLL_OUT:String = "onMouseOut";
	public static var MOUSE_MOVE:String = "onMouseMove";
	public static var MOUSE_DOWN:String = "onPress";
	public static var MOUSE_UP:String = "onMouseOut";//access in easeljs to mouseUp/onRelease??
	
	#end
	
}