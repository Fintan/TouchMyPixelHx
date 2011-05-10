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
	
	//public var loaded:Hash<Dynamic>;
	//public var onBitmapLoaded:Signal1<Bitmap>;
	
	public function new(){
		//loaded= new Hash();
	//	onBitmapLoaded= new Signal1<Bitmap>();
	}
	
	public function loadBitmap(src:String, ?onLoadCallback):BitmapHx{
	
		//var img = untyped __js__("new Image()");
		var img:Image = cast Lib.document.createElement("img");
		
		if(onLoadCallback!=null)
			img.onload = onLoadCallback;
			
			//img.onload = function(e):Void{
				//loaded.set(src, img);
			//	onBitmapLoaded.dispatch(new Bitmap(img));
			//	return new Bitmap(img);
			//};
		
		img.src = src;
			
		return cast new Bitmap(img);
		
	}
	
	public function loadBitmapSequence(imgSeq:Bitmap, sequenceInfo:AnimationSequenceInfo):ContainerHx{
		trace("?? loadBitmapSequence");
		
		// frameData defines the sequences that can be played
		// in this format: {nameOfSequence:[startFrame, endFrame, optionalNameOfNextSequence]}
		var seqName = sequenceInfo.name;
		
		
		var frameData:Dynamic<String> = { };
		Reflect.setField(frameData, seqName, [sequenceInfo.startFrame,sequenceInfo.endFrame]);
		
		var spriteSheet  = new SpriteSheet(imgSeq.image, sequenceInfo.frameWidth, sequenceInfo.frameHeight, frameData);
	//	var spriteSheet  = new SpriteSheet(imgSeq.image, sequenceInfo.frameWidth, sequenceInfo.frameHeight, {frameData:[sequenceInfo.startFrame,sequenceInfo.endFrame]});
		//var spriteSheet  = new SpriteSheet(imgSeq, sequenceInfo.frameWidth, sequenceInfo.frameHeight, {walkUpRt:[sequenceInfo.startFrame,sequenceInfo.endFrame]});
		//var spriteSheet  = new SpriteSheet(imgSeq.image, 140, 122, {boy_jumping:[1,5]});
		
		// create a BitmapSequence instance to display and play back the sprite sheet:
		var bmpSeq = new BitmapSequence(spriteSheet);

		// set the registration point (the point it will be positioned and rotated around)
		// to the center of the frame dimensions:
		bmpSeq.regX = Std.int( bmpSeq.spriteSheet.frameWidth/2)|0;
		bmpSeq.regY = Std.int( bmpSeq.spriteSheet.frameHeight/2)|0;
	
		bmpSeq.x = 200;
		bmpSeq.y = 200;
	
		var parentContainer:Stage = cast sequenceInfo.scope;
		parentContainer.addChild(bmpSeq);
		//parentContainer.addChild(spriteSheet.image);
		//bmpSeq.gotoAndPlay("boy_jumping");		//animate
		bmpSeq.gotoAndPlay(sequenceInfo.name);
	
		return cast bmpSeq;
	}
}