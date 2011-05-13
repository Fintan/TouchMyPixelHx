/**
 * 
 * EaselLoader by Fintan Boyle
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
import Reflect;
import easelhx.geom.Point;
import easelhx.display.BitmapSequence;
import easelhx.display.SpriteSheet;

import easelhx.display.Bitmap;
import fboyle.display.DisplayTypeDefs;

import js.Dom;

/*
typedef AnimationSequenceInfo = {
	
	var frameWidth:Float;
	var frameHeight:Float;
	var registrationPoint:Point;
	var name:String;
	var startFrame:Int;
	var endFrame:Int;
	
}
*/

class EaselLoader {
	public static var loaded:Hash<Dynamic> = new Hash();
	
	public static function loadBitmap(src:String):BitmapHx{
		return cast new Bitmap(loadImage(src));
	}
	
	public static function loadImage(src:String):Image{
		//trace("loadBitmap "+ src);
		// already loaded
		if (loaded.exists(src)){
			return cast loaded.get(src);
		}
		
		//var img = untyped __js__("new Image()");
		var img:Image = cast js.Lib.document.createElement("img");
		
		img.onload = function(e):Void{
			loaded.set(src, img);	
			//trace("LOADED: "+ src);
		};
		
		img.src = src;
	
		return img;
	} 
	
	//need frameW, frameH, frameOrigin, startFrame,endFrame, sequenceName 
	public static function loadMovieClip(src:String, sequenceInfo:AnimationSequenceInfo):ContainerHx{
		//trace("loadMovieClip "+src);
		
		var seqArr = sequenceInfo.sheetindicies.split(",");
	
		if(seqArr.length <=1){
			var bmp = loadBitmap(sequenceInfo.file);
			return cast bmp;
		}
		
		var img = loadImage(src);
		
		var frameData:Dynamic<String> = { };
		//Reflect.setField(frameData, sequenceInfo.name, [sequenceInfo.startFrame,sequenceInfo.endFrame]);
		Reflect.setField(frameData, sequenceInfo.name, [ seqArr[0], seqArr[seqArr.length-1] ]);
		
		// create spritesheet and assign the initial frameData
		// frameData defines the sequences that can be played
		// in this format: {nameOfSequence:[startFrame, endFrame, optionalNameOfNextSequence]}
		var spriteSheet  = new SpriteSheet(img, sequenceInfo.frameWidth, sequenceInfo.frameHeight, frameData);
	
		// create a BitmapSequence instance to display and play back the sprite sheet:
		var bmpSeq = new BitmapSequence(spriteSheet);

		// set the registration point (the point it will be positioned and rotated around)
		// to the center of the frame dimensions:
		//bmpSeq.regX = Std.int( bmpSeq.spriteSheet.frameWidth/2)|0;
		//bmpSeq.regY = Std.int( bmpSeq.spriteSheet.frameHeight/2)|0;
		bmpSeq.regX = Std.int( sequenceInfo.registrationPoint.x );
		bmpSeq.regY = Std.int( sequenceInfo.registrationPoint.y );
		
		// draw the first frame:
		//trace("seqArr.toString() "+seqArr.toString());
		bmpSeq.gotoAndStop(seqArr[0]);//stop on first frame
		
		return cast bmpSeq;
		
	}
}