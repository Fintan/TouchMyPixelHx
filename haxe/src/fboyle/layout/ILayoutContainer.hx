/**
 * 
 * ILayoutContainer by Fintan Boyle
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
package fboyle.layout;

import touchmypixel.game.objects.Object;

import fboyle.layout.LayoutTypeDefs;
import fboyle.display.DisplayTypeDefs;

/**
 *  ensures that displayobject also has required datastructures for fboyle.layout.FlaLayout
 *  
 *  should be implemented along with touchmypixel.game.ILevel to faciliate garbage collection
 **/
interface ILayoutContainer {
	
	var namedObjects:Hash<ContainerHx>;
	var emptyObjects:Hash<EmptyVo>;
	//var animationObjects:Hash<AnimationVo>;
	var bitmaps:Array<BitmapHx>;
	
	var container:ContainerHx;//displayobject
	
}