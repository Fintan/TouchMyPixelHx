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

// other differences should be handled possibly with factory pattern determined with compiler if clause?

#if (flash || cpp)

typedef DisplayObjectHx = flash.display.DisplayObject;
//typedef ContainerHx = flash.display.DisplayObjectContainer;
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

//-gen-haxe-classes from swf extends MovieClip and Bitmap; 
//todo: I need to remap flash.display to fboyle.display if possible
//typedef MovieClip = ContainerHx;
//typedef Bitmap = BitmapHx;
//typedef DisplayObject = DisplayObjectHx;

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

	//
#if Simulation
//tmp
//entire box2d library gets added to swf even if SimulationHx is not used!!
typedef SimulationHx = {>ContainerHx,
	var container:ContainerHx;
	var world:box2D.dynamics.B2World;
	var scale:Float;
	var objects:Array<touchmypixel.game.objects.Object>;
	var namedObjects:Hash<touchmypixel.game.objects.Object>;
	var bitmaps:Array<BitmapHx>;	
}
#end
	
/*
//flash.display.DisplayObject/easeljs.display.DisplayObject
typedef DisplayObjectHx = {
	var alpha(default, default):Float;
	var name(default, default):String;
	var parent(default, null):DisplayObjectHx;
	var rotation(default, default):Float;
	var scaleX(default, default):Float;
	var scaleY(default, default):Float;
	var visible(default, default):Bool;
	var x(default, default):Float;
	var y(default, default):Float;
}
//flash.display.DisplayObjectContainer//easeljs.display.Container
typedef ContainerHx = {>DisplayObjectHx,
	function addChild(child:DisplayObjectHx):DisplayObjectHx;
	function addChildAt(child:DisplayObjectHx, index:Int):DisplayObjectHx;
	function removeChild(child:DisplayObjectHx):Dynamic;
	function removeChildAt(index:Int):Dynamic;
	function getChildAt(index:Int):DisplayObjectHx;
	function getChildIndex( child:DisplayObjectHx):Int;
	function toString():String;
}

typedef BitmapHx = {>DisplayObjectHx,
}


typedef StageHx = {>ContainerHx,
	var mouseX(default, default):Float; //defined in DisplayObjectContainer in Flash, here in EaselJs
	var mouseY(default, default):Float; //defined in DisplayObjectContainer in Flash, here in EaselJs
}

//flash.display.Sprite//easeljs.display.Shape
typedef ShapeHx = {>DisplayObjectHx,
	var graphics( default, default ) : GraphicsHx;
	function draw( ctx:Dynamic, ignoreCache:Bool ):Bool;
}


#if (flash||cpp)
typedef GraphicsHx = {
	function moveTo( x:Float, y:Float ):Void;
	function lineTo( x:Float, y:Float ):Void;
	function clear():Void;
	//function beginFill(color:String, ?alpha:Float):Dynamic; //color is a string for EaselJs
	function endFill():Void;
	function drawCircle( x:Float, y:Float, radius:Float) : Void;
	
	//easel specific
	//function setStrokeStyle( thickness:Float, ?caps:String, ?joints:String, ?miterLimit:Float):Graphics;
	//function beginStroke( color : String ) : Graphics;
	//flash specific
	//function lineStyle( ?thickness:Float, ?color:UInt, ?alpha:Float, ?pixelHinting:Bool, ?scaleMode:LineScaleMode, ?caps:CapsStyle, ?joints:JointStyle, ?miterLimit:Float):Void
	
}

#else
//easeljs.display.Graphics returns a Graphics object with each method call, flash.display.Grpahics returns Void
typedef GraphicsHx = {
	function moveTo( x:Float, y:Float ):Dynamic;
	function lineTo( x:Float, y:Float ):Dynamic;
	function clear():Dynamic;
	//function beginFill(color:String, ?alpha:Float):Dynamic; //color is a string for EaselJs
	function endFill():Dynamic;
	function drawCircle( x:Float, y:Float, radius:Float) : Dynamic;
	
	//easel specific
	//function setStrokeStyle( thickness:Float, ?caps:String, ?joints:String, ?miterLimit:Float):Graphics;
	//function beginStroke( color : String ) : Graphics;
	//flash specific
	//function lineStyle( ?thickness:Float, ?color:UInt, ?alpha:Float, ?pixelHinting:Bool, ?scaleMode:LineScaleMode, ?caps:CapsStyle, ?joints:JointStyle, ?miterLimit:Float):Void
	
}

#end

*/
//---------------------

