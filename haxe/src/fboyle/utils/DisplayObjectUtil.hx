/**
 * 
 * DisplayObjectUtil by Fintan Boyle
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

import fboyle.display.DisplayObjectInfo;
import fboyle.display.DisplayTypeDefs;
import fboyle.display.DisplayFactory;
import fboyle.layout.LayoutTypeDefs;

/*typedef DisplayObjectInfo = {
	//name,file,linkage,sX,sY,x,y, rotation
	//frameWidth, frameHeight
	var name:String;
	var file:String;
	var linkage:String;
	var scaleX:Float;
	var scaleY:Float;
	var x:Float;
	var y:Float;
	var rotation:Float;
	var frameWidth:String;
	var frameHeight:String;
}*/

class DisplayObjectUtil {

	private static var stage:StageHx;
	
	#if easeljs
	public static function setStage(canvas:js.DomCanvas):Void{
		
		stage = new StageHx(canvas);
		// enabled mouse over / out events
		//stage.enableMouseOver(10);
	
	}
	
	public static function enableMouseOver(rate:Int):Void{
		stage.enableMouseOver(rate);
	}
	
	#end
	
	inline public static function getStage():ContainerHx{
		#if easeljs
		if(stage == null)trace("warning: canvas/stage hasn't been defined!");
		//var canvas:js.DomCanvas = cast js.Lib.document.getElementById("testCanvas");
		//return new StageHx(canvas);
		return stage;
		#else
		return flash.Lib.current;
		#end
	}
	
	inline public static function createBitmap(objectInfo:DisplayObjectInfo, ?addToScope:ContainerHx):BitmapHx {
		
		var displayList = DisplayFactory.setDisplayList();
		#if flash
			var bmp = displayList.loadBitmap(objectInfo.linkage);
			var bitmap:flash.display.Bitmap = bmp;
			bitmap.smoothing = true;
			bmp.scaleX = objectInfo.scaleX;
			bmp.scaleY = objectInfo.scaleY;
				
		#elseif easeljs
			var bmp = displayList.loadBitmap(objectInfo.file);
			
		#elseif cpp
			var bmp = displayList.loadBitmap(objectInfo.file);
			var bitmap:flash.display.Bitmap = bmp;
			bitmap.smoothing = true;
		
		#end
		bmp.x = objectInfo.x;
		bmp.y = objectInfo.y;
		
		bmp.rotation = objectInfo.rotation;

		if (addToScope != null){
			//addToScope.addChild(cast bmp);
			displayList.addChild(bmp, addToScope);
		}
		
		return bmp;
		
	}
	
	//name,file,linkage,sX,sY,x,y, rotation
	//frameWidth, frameHeight
	/*inline*/ public static function createMovieClip(objectInfo:DisplayObjectInfo, ?addToScope:ContainerHx):ContainerHx{
		
		//trace("createMovieClip !!!"+ objectInfo.att.linkageId);
		var displayList = DisplayFactory.setDisplayList();
		#if flash
			var mc = displayList.loadMovieClip(objectInfo.linkage, true);
			mc.scaleX = objectInfo.scaleX;
			mc.scaleY = objectInfo.scaleY;
			
		#elseif easeljs
			var frames = objectInfo.sheetindicies.split(",");
			
			if(frames.length==1){
				return cast createBitmap(objectInfo, addToScope);
			}
		
			var seqInfo:AnimationSequenceInfo = cast {
				name:objectInfo.name,
				frameWidth:objectInfo.frameWidth,
				frameHeight:objectInfo.frameHeight,
				registrationPoint:{x:0,y:0},
				startFrame:frames[0],
				endFrame:frames[1],
				scope:addToScope
			};
			//note: registrationPoint is currently redundant (just using center point currently)
			
			var mc = displayList.loadMovieClip(objectInfo.file, seqInfo);
		#elseif cpp
			var frames = objectInfo.att.sheetindicies.split(",");
			var seqInfo:AnimationSequenceInfo = cast {
				name:objectInfo.att.name,
				frameWidth:objectInfo.frameWidth,
				frameHeight:objectInfo.frameHeight,
				registrationPoint:{x:0,y:0},
				startFrame:frames[0],
				endFrame:frames[1],
				scope:addToScope
			};
			
			var mc = displayList.loadMovieClip(objectInfo.file, seqInfo);
			//mc.scaleX = f(objectInfo.att.sx);
			//mc.scaleY = f(objectInfo.att.sy);
		#end
	
		mc.x = objectInfo.x;
		mc.y = objectInfo.y;
		mc.rotation = objectInfo.rotation;
		if (addToScope != null){
			displayList.addChild(mc, addToScope);
		}
		
		return mc;
		
	}
	
	//inline public static function addChild(object:ContainerHx, container:ContainerHx):Void {
	inline public static function addChild(object:DisplayObjectHx, container:ContainerHx):Void {
		var displayList = DisplayFactory.setDisplayList();
		displayList.addChild(object, container);
	}
	
	//inline public static function removeChild(object:ContainerHx):Void {
	inline public static function removeChild(object:DisplayObjectHx, ?container:ContainerHx):Void {
		var displayList = DisplayFactory.setDisplayList();
		if(container !=null){
			displayList.removeChild(object, container);
		}else{
			displayList.removeChild(object);
		}
	}
	
}