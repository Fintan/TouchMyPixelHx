/**
 * 
 * FlaLayoutExport by Fintan Boyle
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
//
//	Based on Touchmypixel library
//
package fboyle.layout;

import jsfl.ComponentInstance;
import jsfl.Document;
import jsfl.Fl;
import jsfl.FLfile;
import jsfl.Instance;
import jsfl.Library;
import jsfl.Oval;
import jsfl.Element;
import jsfl.Parameter;
import jsfl.Shape;
import jsfl.SymbolInstance;
import jsfl.SymbolItem;
import jsfl.Timeline;

import touchmypixel.geom.Triangulator;

import touchmypixel.game.utils.JSFLTools;

using touchmypixel.game.utils.JSFLTools;
using StringTools;

typedef Results = Array<Result>;

typedef Result = {
	var type:String;
	var info:ComponentInstance;
	var scope:SymbolInstance;
	var children:Results;
}
/**
 *  Creates a jsfl script that can export the contents of an fla file
 *  (and their properties) to an xml file
 *  
 *  
 *  one minor adjustment required in generated jsfl file:
 *  
 *  
 *  js.Boot.__trace = function(v,i) {
		var msg = (i != null?((i.fileName + ":") + i.lineNumber) + ": ":"");
		msg += js.Boot.__string_rec(v,"");
		fl.trace(msg);
	}
	js.Boot.__clear_trace = function() {
		fl.outputPanel.clear();
	}
 *  
 **/
class FlaLayoutExport {
	
	var doc:Document;
	var lib:Library;
	var root:Timeline;
	
	public function new()
	{
		doc = Fl.getDocumentDOM();
		lib = doc.library;
		root = doc.timelines[0];
		
		Fl.outputPanel.clear();
		
		var results = searchTimeline(root);
		
		var xml = parseResults(results);
		
		trace(xml);
		//trace("this is a test");
		
		
		saveXml(xml);
	}
	
	private function parseResults(results:Results):String{
		var xml = "";
		for (r in results){
			xml += switch(r.type){
				case "layout": parseLayout(r);
				//case "symbol":  parseSymbol(r);//
				case "bitmap":  parseBitmap(r);
				case "movieclip": parseMovieClip(r);
				case "empty":parseEmpty(r);
				//case "shape":  parseShape(r);
			}
		}
		return xml;
	}
	
	
	public function parseParameters(result:Result):String{
		var sc = result.scope;
		var xml = '';
		xml += ' name="' +sc.name+ '"';
		xml += ' x="' +sc.x+ '"';
		xml += ' y="' +sc.y+ '"';
		xml += ' sx="' +sc.scaleX+ '"';
		xml += ' sy="' +sc.scaleY+ '"';
		xml += ' r="' +sc.rotation+ '"';
		
		if (result.info.isComponent())
		{
			var def = result.info.getDefinitionValues();
			for (v in def.keys())
			{
				xml += ' ' + v + '="' + def.get(v) +'"';
			}
		}
		
		return xml;
	}
	
	function parseLayout(result:Result):String{
		
		var xml = '<layout' + parseParameters(result);
		xml += ' w="' + result.scope.width + '" h="' + result.scope.height + '"';
		xml += '>\n';
		
		xml += parseResults(result.children);
		
		xml += '</layout>\n';
		
		return xml;
	}
	
	/*function parseSymbol(result:Result):String{

		var xml = '<symbol' + parseParameters(result);
		xml += '>\n';

		xml += parseResults(result.children);

		xml += '</symbol>\n';

		return xml;
	}*/
		
	public function parseMovieClipParameters(result:Result):String{
		var sc = result.scope;
		var xml = '';
		xml += ' name="' +sc.name+ '"';
		xml += ' x="' +sc.x+ '"';
		xml += ' y="' +sc.y+ '"';
		//xml += ' sx="' +sc.scaleX+ '"';
		//xml += ' sy="' +sc.scaleY+ '"';
		xml += ' r="' +sc.rotation+ '"';
		
		if (result.info.isComponent())
		{
			var def = result.info.getDefinitionValues();
			for (v in def.keys())
			{
				xml += ' ' + v + '="' + def.get(v) +'"';
			}
		}
		
		return xml;
	}
	
	function parseEmpty(result:Result):String{
		var sc = result.scope;
		var xml = '<empty';

		xml += ' name="' +sc.name+ '"';
		xml += ' x="' +sc.x+ '"';
		xml += ' y="' +sc.y+ '"';
		xml += ' r="' +sc.rotation+ '"';
		
		if (result.info.isComponent())
		{
			var def = result.info.getDefinitionValues();
			for (v in def.keys())
			{
				xml += ' ' + v + '="' + def.get(v) +'"';
			}
		}
		xml += '/>\n';
		
		return xml;
	}
	
	function parseMovieClip(result:Result):String{

		var linkageId = result.scope.libraryItem.linkageClassName;
		
		var xml = '<movieclip';
		//var xml = '<movieclip' + parseMovieClipParameters(result);
			
		var sc = result.scope;
		xml += ' name="' +sc.name+ '"';//going to use the child instance name instead
	
		
		//retreive the child movieclip instance name from component
		var childname = "none";
		var spritesheet = "none";
		//var sheetindices = "none";
		var sheetindicies:Array<Dynamic> = [];
		var frameWidth = "60";
		var frameHeight = "60";
		
		var def = result.info.getDefinitionValues();
		for (v in def.keys()){
			/*if(v == "child"){
				//trace("found a child!!");
				childname = def.get(v);
			}*/
			switch(v){
				case "child": childname = def.get(v);
				case "spritesheet":  spritesheet = def.get(v);
				case "frameWidth":  frameWidth = def.get(v);
				case "frameHeight":  frameHeight = def.get(v);
				case "sheetindicies":
					var arr:Array<Dynamic> = cast (def.get(v), Array<Dynamic>);
					for(i in 0...arr.length){
						sheetindicies[i] = arr[i].value;
					}
				  	//sheetindicies = [arr[0].value,arr[1].value];
			}
		}
		
		//trace("childname - "+childname);
		//now match entered instance names to actual nested movieclips
		for (r in result.scope.getTimeline().getChildren()){
			
			if(r.elementType=="instance"){
				var el:SymbolInstance = cast r;
				var linkageId = el.libraryItem.linkageClassName;
				//trace(linkageId);
				var def = result.info.getDefinitionValues();
				if(r.name == childname){
					//xml += ' name="' +childname+ '"';
					xml += ' linkageId="' +linkageId+ '"';
					//xml += ' x="' +(sc.x+)+ '"';
					//xml += ' y="' +(sc.y)+ '"';
					xml += ' x="' +(sc.x+ r.x)+ '"';
					xml += ' y="' +(sc.y+ r.y)+ '"';
					xml += ' regX="' +r.x+ '"';
					xml += ' regY="' +r.y+ '"';
					xml += ' file="' +spritesheet+ '"'; //this will be a spritesheet for js target
					xml += ' sheetindicies="' +sheetindicies+ '"';
					xml += ' frameWidth="' +frameWidth+ '"'; //must enter this after making the spritesheet
					xml += ' frameHeight="' +frameHeight+ '"'; //must enter this after making the spritesheet
					xml += ' r="' +(sc.rotation + r.rotation)+ '"';
					xml += ' sx="' +(r.scaleX * sc.scaleX)+ '"';
					xml += ' sy="' +(r.scaleY * sc.scaleY)+ '"';
					
					break; //only want one
				}
			}
	
		}

		xml += '>\n';
		
		//xml += parseResults(result.children);
		
		xml += '</movieclip>\n';

		return xml;
	}
	
	/*
	function parseMovieClip(result:Result):String{

		var linkageId = result.scope.libraryItem.linkageClassName;
		
		var xml = '<movieclip' + parseParameters(result);
		
		xml += '>\n';
			
		//retreive the array of children instance names from component
		var childArr:Array<Dynamic> = [];
		
		var def = result.info.getDefinitionValues();
		for (v in def.keys()){
			if(v == "children"){
				childArr = cast (def.get(v), Array<Dynamic>);
				//trace("arr "+ childArr.length + " arr[0] "+childArr[0].value);
			}
		
			
		}
		
		//now match entered instance names to actual nested movieclips
		for (r in result.scope.getTimeline().getChildren()){
			
			if(r.elementType=="instance"){
				var el:SymbolInstance = cast r;
				var linkageId = el.libraryItem.linkageClassName;
				//trace(linkageId);
				var def = result.info.getDefinitionValues();
		
				for (ob in childArr){
					if(r.name == ob.value){
						
						xml += '\t\t<clip ';
						xml += ' name="' +r.name+ '"';
						xml += ' linkageId="' +linkageId+ '"';
						xml += ' />\n';
						
					}
				}

				
				
			}
	
		}

		//xml += '>\n';
		
		//xml += parseResults(result.children);
		
		xml += '</movieclip>\n';

		return xml;
	}
	*/
	
	/**
	 *  bitmaps should have a linkage id defined
	 **/
	public function parseBitmap(result:Result):String{
		
		var linkageID;
		var itemName = result.scope.libraryItem.name.replace("-", "/");
		if(result.scope.libraryItem.linkageClassName == null){
			trace("Warning: "+ result.scope.libraryItem.name + " has no linkage id");
			linkageID = itemName;
		}else{
			linkageID = result.scope.libraryItem.linkageClassName.replace("-", "/");
		}
		
		var xml = '<bitmap ' + parseParameters(result) + ' file="'+itemName + '" linkage="'+linkageID +'" />\n';
		
		return xml;
	}
	
	public function parseShape(result:Result):String{
		var xml  = '<shape ' + parseParameters(result) + '>\n';
		
		//xml += parseElements(result.scope);
		
		xml += '</shape>\n';
		return xml;
	}
	
	
	public function searchTimeline(inScope:Timeline, ?store:Result):Results{
		var results:Results = [];
		for (el in inScope.getChildren()){
			if (el.isInstance()){
				var el:SymbolInstance = cast el;
			
				//
				for (el2 in el.getTimeline().getChildren()){
					var el2:SymbolInstance = cast el2;
					
					if (el2.isComponent()){
						switch(el2.libraryItem.linkageClassName){
							case "Def_Layout":
							
								results.unshift( { type:"layout", info:cast el2, scope:el, children:searchTimeline(el.getTimeline()) } );
								
							case "Def_Symbol":

								results.unshift( { type:"symbol", info:cast el2, scope:el, children:searchTimeline(el.getTimeline()) } );
							
							case "Def_MovieClip":

								results.unshift( { type:"movieclip", info:cast el2, scope:el, children:searchTimeline(el.getTimeline()) } );
							
							case "Def_Empty":

								results.unshift( { type:"empty", info:cast el2, scope:el, children:null } );
												
						}
					}
						
					
				}
				/*if(el.symbolType=="movie clip"){
					trace("its a movieclip "+ el.libraryItem.linkageClassName + " : " + el.getTimeline());
					results.unshift( { type:"movieclip", info:cast el, scope:el, children:searchTimeline(el.getTimeline()) } );
					
				}*/
				
			//	trace("el.symbolType "+el.symbolType);
				if (el.isBitmap()){
					results.unshift( { type:"bitmap", info:cast el, scope:el, children:null } );	
				}else if(el.isShape()){
					//results.unshift( { type:"shape", info:cast el, scope:el, children:null } );
				}
			}
		}
		return results;
	}
	
	private function saveXml(xml:String):Void{
		var path = doc.pathURI;
		path = path.substr(0, path.lastIndexOf("."));
		path += ".xml";
		
		
		trace('EXPORTED: ' +path);
		
		FLfile.write(path, xml);
	}
	
}