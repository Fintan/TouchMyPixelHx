/**
 * 
 * LayoutTypeDefs by Fintan Boyle
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

typedef LayoutInfo = {
	var width:Float;
	var height:Float;
}

class LayoutTypeDefs {
	function new(){
		
	}
}

//value objects used in layout code

class EmptyVo{
	public var name:String;
	public var id:String;
	public var extraInfo:String;
	public var x:Float;
	public var y:Float;
	public var rotation:Float;
	
	public function new(name:String="", id:String="", extraInfo:String="", x:Float, y:Float, rotation:Float){
		this.name = name;
		this.id = id;
		this.extraInfo = extraInfo;
		this.x = x;
		this.y = y;
		
		this.rotation = rotation;
		
	}
}

class AnimationVo{
	
	//public var stripIds:Array;
}