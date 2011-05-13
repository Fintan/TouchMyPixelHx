//
//  EaselDisplayUtil
//
//  Created by Fintan Boyle on 2011-01-29.
//  Copyright (c) 2011 Modello Design Ltd. All rights reserved.
//
package fboyle.utils;
import Reflect;
import easelhx.display.Stage;

import easelhx.display.BitmapSequence;
import easelhx.display.SpriteSheet;
import easelhx.display.Bitmap;
import fboyle.display.DisplayTypeDefs;
import hxs.Signal1;
import js.Lib;
import js.Dom;

/**
 *  Asychronous loading support for EaselJs displayobject types
 **/
class EaselLoadUtil {
	
	public static var loaded:Hash<Dynamic> = new Hash();
	
	public function new(){
		loaded= new Hash();
	}
	
	public function loadBitmap(src:String, ?onLoadCallback):BitmapHx{
		return cast new Bitmap(loadImage(src, onLoadCallback));
	}
	
	public function loadImage(src:String, ?onLoadCallback):Image{
		
		//var img = untyped __js__("new Image()");
		var img:Image = cast js.Lib.document.createElement("img");
		
		img.onload = function(e):Void{
			loaded.set(src, img);	
			if(onLoadCallback!=null){
				onLoadCallback(src);
			}
		};
		
		img.src = src;
	
		return img;
	}
	
	//need frameW, frameH, frameOrigin, startFrame,endFrame, sequenceName 
	public function loadMovieClip(src:String, sequenceInfo:AnimationSequenceInfo, ?onLoadCallback):ContainerHx{
		//trace("loadMovieClip "+src);
		
		var seqArr = sequenceInfo.sheetindicies.split(",");
	
		if(seqArr.length <=1){
			var bmp = loadBitmap(sequenceInfo.file, onLoadCallback);
			return cast bmp;
		}
		
		var img = loadImage(src, onLoadCallback);
		
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
	
	public function nullCallbackReference(id){
		//I don't think I need this because I am not holding any references to onLoadCallback if I just remove loaded hash?
		if (loaded.exists(id)){
			loaded.set(id, null);
		}
	}
	
}