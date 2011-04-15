/**
 * 
 * FlaLayout by Fintan Boyle
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

import fboyle.display.DisplayTypeDefs;
import fboyle.display.DisplayFactory;
import fboyle.layout.LayoutTypeDefs;
//import flash.display.DisplayObjectContainer;
import haxe.xml.Fast;


/**
 *  Corresponds to an xml layout file generated using fboyle.layout.FlaLayoutExport 
 *  (which created a jsfl script to be used with the layout fla file)
 **/
class FlaLayout {
	
	public var xml:Xml;
	public var fast:Fast;
	public var layouts:Hash<Fast>;
	
	var displayList:AbstractDisplayList;
	
	var container:fboyle.layout.ILayoutContainer;
		
	public function new(xml:String){
		this.xml = Xml.parse(xml);
		fast = new Fast(this.xml);
		
		layouts = new Hash();
		for (n in fast.nodes.layout)
			layouts.set(n.att.name, n);
		
		var displayType = "flash";
		#if easeljs
		displayType = "easeljs";
		#elseif cpp
		displayType = "cpp";
		#end
		displayList = DisplayFactory.setDisplayList(displayType);
	}
	
	/**
	 *  returns dimensions of layout
	 **/
	public function getLayoutInfo(name:String):LayoutInfo{
		if ( !layouts.exists(name) )
			return null;

		var lo = layouts.get(name);
		return { width:Std.parseFloat(lo.att.w), height:Std.parseFloat(lo.att.h) };
	}
		
	//public function buildLayout(layout:Fast, addToScope:ContainerHx){
	public function buildLayout(layout:Fast, addToScope:ILayoutContainer){
	
		/*if(!Std.is(addToScope, fboyle.layout.ILayoutContainer)){
			trace("WARNING: addToScope needs to implement fboyle.layout.ILayoutContainer");
		}*/
		
		this.container = cast addToScope;
		
		if (layout == null)
			throw "Layout does not exist";

		for (child in layout.x.elements()){
			switch(child.nodeName){
				case "movieclip": createMovieClip(new Fast(child), addToScope.container);
				case "bitmap": createBitmap(new Fast(child), addToScope.container);
				case "empty": createEmpty(new Fast(child));
			}
		}
	}
	
	public function createEmpty(objectInfo:Fast){
		
		var rot = 0.0;
		if(objectInfo.has.r){
			//rotation added in middle of project
			rot = f(objectInfo.att.r);
		}
		var empty = new EmptyVo(objectInfo.att.name, objectInfo.att.id, objectInfo.att.extraInfo, f(objectInfo.att.x), f(objectInfo.att.y), rot);
		
		if(container !=null)if(container.emptyObjects !=null)
		container.emptyObjects.set(objectInfo.att.name, empty);
		
	}
	
	public function createBitmap(objectInfo:Fast, ?addToScope:ContainerHx){
		#if flash
			var bmp = displayList.loadBitmap(objectInfo.att.linkage);
			var bitmap:flash.display.Bitmap = bmp;
			bitmap.smoothing = true;
			bmp.scaleX = f(objectInfo.att.sx);
			bmp.scaleY = f(objectInfo.att.sy);
				
		#elseif easeljs
			var bmp = displayList.loadBitmap(objectInfo.att.file);
			
		#elseif cpp
			var bmp = displayList.loadBitmap(objectInfo.att.file);
			var bitmap:flash.display.Bitmap = bmp;
			bitmap.smoothing = true;
		
		#end
		bmp.x = f(objectInfo.att.x); 
		bmp.y = f(objectInfo.att.y); 
		
		bmp.rotation = f(objectInfo.att.r);

		if (addToScope != null){
			//addToScope.addChild(cast bmp);
			displayList.addChild(bmp, addToScope);
		}
		
		//trace("bitmap should be added");
		if(container !=null)if(container.bitmaps !=null)
		container.bitmaps.push(bmp);
		
	}
	
	
	public function createMovieClip(objectInfo:Fast, ?addToScope:ContainerHx){
		
		//trace("createMovieClip !!!"+ objectInfo.att.linkageId);
		
		#if flash
			var mc = displayList.loadMovieClip(objectInfo.att.linkageId, true);
			mc.scaleX = f(objectInfo.att.sx);
			mc.scaleY = f(objectInfo.att.sy);
			
		#elseif easeljs
		
			var frames = objectInfo.att.sheetindicies.split(",");
			
			var sFrame = frames.length == 0?Std.parseInt(frames[0]):0;
			var eFrame = frames.length >= 0?Std.parseInt(frames[frames.length - 1]):0;
			//trace("sFrame "+sFrame+"  eFrame "+ eFrame);
			var seqInfo:AnimationSequenceInfo = cast {
				name:objectInfo.att.name,
				file:objectInfo.att.file,
				frameWidth:f(objectInfo.att.frameWidth),
				frameHeight:f(objectInfo.att.frameHeight),
				registrationPoint:{ x:objectInfo.att.regX, y:objectInfo.att.regY },
				sheetindicies:objectInfo.att.sheetindicies,
				startFrame:sFrame,
				endFrame:eFrame,
				scope:addToScope
			};
			//TODO:retrieve registrationPoint from Fla file
			//note: registrationPoint is currently redundant (just using center point currently)
			
			var mc = displayList.loadMovieClip(objectInfo.att.file, seqInfo);
			
		#elseif cpp
		
			//TODO: if frames.length == 1 then createBitmap()
			
			var frames = objectInfo.att.sheetindicies.split(",");
			var seqInfo:AnimationSequenceInfo = cast {
				name:objectInfo.att.name,
				file:objectInfo.att.file,
				frameWidth:f(objectInfo.att.frameWidth),
				frameHeight:f(objectInfo.att.frameHeight),
				registrationPoint:{ x:objectInfo.att.regX, y:objectInfo.att.regY },
				sheetindicies:frames,
				startFrame:frames[0],
				endFrame:frames[1],
				scope:addToScope
			};
			
			var mc = displayList.loadMovieClip(objectInfo.att.file, seqInfo);
			//mc.scaleX = f(objectInfo.att.sx);
			//mc.scaleY = f(objectInfo.att.sy);
		#end
	
		//#if !flash
		mc.x = f(objectInfo.att.x);
		mc.y = f(objectInfo.att.y);
		//#else
		//mc.x = f(objectInfo.att.x) + f(objectInfo.att.regX);
		//mc.y = f(objectInfo.att.y) + f(objectInfo.att.regY);
		//#end
		
		//#if !flash
			//	mc.x -= f(objectInfo.att.regX);
			//	mc.y -= f(objectInfo.att.regY);
		//#end
		
		mc.rotation = f(objectInfo.att.r);
		if (addToScope != null){
			displayList.addChild(mc, addToScope);
		}
		
		if (objectInfo.att.name != "")
			if(container !=null)if(container.namedObjects !=null)
			container.namedObjects.set(objectInfo.att.name, mc);
		
	}
	
	public inline function f(v:String){
		return Std.parseFloat(v);
	}
	
}