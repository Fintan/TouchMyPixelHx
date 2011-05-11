/**
 * 
 * DisplayFactory by Fintan Boyle on 2010-09-27
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

#if flash
import fboyle.utils.Loader;
#elseif cpp
import fboyle.utils.Loader;
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.geom.Point;
#elseif easeljs
import fboyle.utils.EaselLoader;
#end
import fboyle.display.DisplayTypeDefs;

class DisplayFactory {

	function new(){}
	
	public static function setDisplayList(type:String=""):AbstractDisplayList{
		
		var displayList:AbstractDisplayList = null;
		
		#if easeljs
		displayList = new EaselDisplayList();
		#elseif cpp
		displayList = new CppDisplayList();
		#else
		displayList = new FlashDisplayList();
		#end
			
		return displayList;
	}
	
}


class AbstractDisplayList{
	
	function new(){} 
		
	public function loadBitmap(src:String):BitmapHx {
		return throw "this is an abstract class";
	}
	
	public function loadMovieClip(src:String, ?infoOb):ContainerHx{
		return throw "this is an abstract class";
	}
	
	public function addChild(child:DisplayObjectHx, parent:ContainerHx):Void{
		trace("this is an abstract class");
	}
	
	public function removeChild(child:DisplayObjectHx, ?parent:ContainerHx):Void{
		trace("this is an abstract class");
	}
	
}


#if easeljs
class EaselDisplayList extends AbstractDisplayList{
	
	
	var easelLoader:fboyle.utils.EaselLoadUtil;
	
	
	public function new(){
		super();
		easelLoader = new fboyle.utils.EaselLoadUtil();
	}

	override public function loadBitmap(src:String):BitmapHx {
	
		//load an external bitmap
		return EaselLoader.loadBitmap(src);
		
		/*return easelLoader.loadBitmap(src, function(e):Void{
			trace("LOADED worked so it did!!");
			});*/
	}
	
	override public function loadMovieClip(src:String, ?infoOb):ContainerHx{

		//load a spriteSheet 
		return EaselLoader.loadMovieClip(src, infoOb);
		
		/*
		var here = this;
		var bmp = null;
		
		//TODO:  resume at this point <<<<<<<  need to return COntainerHx from callback somehow
		//possibly just pass in parent to loadMovieClip ??
		
		bmp = cast easelLoader.loadBitmap(src, function(e):Void{
			trace("LOADED worked so it did!!");
			 
			//var parentContainer = cast infoOb.scope;
			//parentContainer.addChild(cast here.easelLoader.loadBitmapSequence(bmp, infoOb));
			//return 
			here.easelLoader.loadBitmapSequence(bmp, infoOb);
			
			});
		return null;
		*/
	}
	
	override public function addChild(child:DisplayObjectHx, parent:ContainerHx):Void{
		parent.addChild(child);
	}

	override public function removeChild(child:DisplayObjectHx, ?parent:ContainerHx):Void{
		if(cast(child.parent, ContainerHx) != null)
			cast(child.parent, ContainerHx).removeChild(child);
	}
	

}
#end

class FlashDisplayList extends AbstractDisplayList{
	
	public function new(){
		super();
	}
	
	#if flash
	
	override public function loadBitmap(src:String):BitmapHx {
		return Loader.loadBitmap(src);
	}
	
	override public function loadMovieClip(src:String, ?infoOb):ContainerHx{
		return Loader.loadMovieClip(src, infoOb);
		//#if !flash
		//Loader.buildCacheFromBitmaps(bitmaps:Array<Bitmap>, ?rectangle:Rectangle=null)
	}
	
	override public function addChild(child:DisplayObjectHx, parent:ContainerHx):Void{
		parent.addChild(child);
	}

	override public function removeChild(child:DisplayObjectHx, ?parent:ContainerHx):Void{
		var c = cast(child, flash.display.DisplayObject);
		if(c.parent != null)c.parent.removeChild(c);
	}
	
	#end
}



class CppDisplayList extends AbstractDisplayList{
	
	public function new(){
		super();
	}
	
	#if cpp
	
	override public function loadBitmap(src:String):BitmapHx {
		var data = nme.display.BitmapData.load(src);
		return new flash.display.Bitmap(data);
	}
	
	override public function loadMovieClip(src:String, ?infoOb):ContainerHx{
		var ob:AnimationSequenceInfo = infoOb;
		if(ob==null)trace("Warning: AnimationSequenceInfo is null for "+src);
		
		trace("src "+src);
	
		var data = nme.display.BitmapData.load(src);
		
		var sheet = new gm2d.blit.Tilesheet(data);
		var tiles:Array<gm2d.blit.Tile> = sheet.partition(Std.int(ob.frameWidth),Std.int(ob.frameHeight));
		var bmps:Array<Bitmap> = [];
		
		var aTile = null;
		for (i in 0...tiles.length){
			aTile = tiles[i];
			var bitmapDat = new BitmapData(Std.int(aTile.rect.width), Std.int(aTile.rect.height), true, 0x00000000);

			//var p = new Point(-aTile.rect.width/2,-aTile.rect.height/2);
			var p = new Point(0,0);
				
			bitmapDat.copyPixels(aTile.sheet.gm2dData, aTile.rect, p, null, null, aTile.sheet.useAlpha);
			//bitmapDat.copyPixels(aTile.sheet.gm2dData, new flash.geom.Rectangle(-p.x, -p.y, Std.int(ob.frameWidth),Std.int(ob.frameHeight)), p, null, null, aTile.sheet.useAlpha);
			
			var bitmap:Bitmap = new Bitmap(bitmapDat);
			bmps.push(bitmap);
		} 
	
		var ani = new touchmypixel.bitmap.Animation();
		//ani.buildCacheFromBitmaps(bmps, new flash.geom.Rectangle(-aTile.rect.width/2,-aTile.rect.height/2, Std.int(ob.frameWidth),Std.int(ob.frameHeight)));
		ani.buildCacheFromBitmaps(bmps, new flash.geom.Rectangle(0, 0, Std.int(ob.frameWidth),Std.int(ob.frameHeight)));
		ani.play();
		
		return cast ani;
		
	}
	
	override public function addChild(child:DisplayObjectHx, parent:ContainerHx):Void{
		parent.addChild(child);
	}

	override public function removeChild(child:DisplayObjectHx, ?parent:ContainerHx):Void{
		var c = cast(child, flash.display.DisplayObject);
		if(c.parent != null)c.parent.removeChild(c);
	}
	
	#end
}