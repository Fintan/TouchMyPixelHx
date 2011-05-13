//
//  FlaLayoutExport
//
//  Created by Fintan Boyle on 2011-01-25.
//  Copyright (c) 2011 Modello Design Ltd. All rights reserved.
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
//import touchmypixel.game.geom.Triangulator;

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
class FlaBox2dLayoutExport {
	
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
				case "bitmap":  parseBitmap(r);
				case "movieclip": parseMovieClip(r);
				case "body":  parseBody(r);
				case "gameObject":  parseGameObject(r);
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
		//xml += ' regX="' +0+ '"';
		//xml += ' regY="' +0+ '"';
		
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

	public function parseGameObject(result:Result):String{
		var xml = '<gameObject ' + parseParameters(result) + '>\n';

		//xml += parseElements(result.scope);
		xml += parseResults(result.children);

		xml += "</gameObject>\n";
		return xml;
	}

	public function parseBody(result:Result):String{
		var xml = '<body ' + parseParameters(result) + '>\n';

		xml += parseElements(result.scope);

		xml += parseResults(result.children);

		xml += "</body>\n";
		return xml;
	}
	
	function parseEmpty(result:Result):String{
		var sc = result.scope;
		var xml = '<empty'; 

		xml += ' name="' +sc.name+ '"';
		xml += ' x="' +sc.x+ '"';
		xml += ' y="' +sc.y+ '"';
		
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
					xml += ' x="' +(sc.x+ r.x)+ '"';
					xml += ' y="' +(sc.y+ r.y)+ '"';
					xml += ' file="' +spritesheet+ '"'; //this will be a spritesheet for js target
					xml += ' sheetindicies="' +sheetindicies+ '"';
					xml += ' frameWidth="' +frameWidth+ '"'; //must enter this after making the spritesheet
					xml += ' frameHeight="' +frameHeight+ '"'; //must enter this after making the spritesheet
					xml += ' r="' +(sc.rotation + r.rotation)+ '"';
					xml += ' sx="' +(r.scaleX * sc.scaleX)+ '"';
					xml += ' sy="' +(r.scaleY * sc.scaleY)+ '"';
					xml += ' regX="' +r.x+ '"';
					xml += ' regY="' +r.y+ '"';
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
	
	
	public function parseElements(scope:SymbolInstance):String
	{
		var xml = "";
		for (child in scope.getTimeline().getChildren())
		{
			if (child.isShape())
			{
				var s:Shape = cast child;
				
				if (s.isRectangleObject)  
					xml += parseElementRect(cast child); 
				else if (s.isOvalObject)
					xml += parseElementCircle(cast child); 
				else
					xml += parseElementPoly(cast child, scope); 
			} 
		}
		return xml;
	}
	
	public function parseElementCircle(s:Shape):String
	{
		var xml  = '\t<circle x="'+s.x+'" y="'+s.y+'" w="'+s.width+'"  h="'+s.height+'" r="'+s.rotation+'" sx="'+s.scaleX+'" sy="'+s.scaleY+'" />\n';
		return xml;
	}
	
	public function parseElementRect(s:Shape):String
	{
		var xml = parseElementPoly(s, null);
		return xml;
	}
	
	
	public function parseElementPoly(s:Shape, scope:SymbolInstance):String
	{
		var xml  = "";
		
		//if (s.isGroup)
		//{
			//s.beginEdit();
			//var e = s.edges[0];
			//var p = e.getControl(0);
			//var px = p.x;
			//var py = p.y;
			//e.setControl(0, 1000, 1000);
			//s.endEdit();
			//
			//s.beginEdit();
			//e.setControl(0, px, py);
			//s.endEdit();			
		//}
		
		// only save shape transform info if the shape is in a group (or primitive)
		//if (s.isGroup)
		//{	
			//xml += '<poly x="'+s.x+'" y="'+s.y+'" w="'+s.width+'"  h="'+s.height+'" r="'+s.rotation+'" sx="'+s.scaleX+'" sy="'+s.scaleY+'">\n';
		//} else {
			//xml += '<poly x="0" y="0" r="0" scaleX="1" scaleY="1" >\n';
		//}
		
		var points = new Array<JSFLPoint>();
		var lastPoint = null; 
					
		// Put the edges into order as they are in random order
		for (e in s.edges)
		{
			var p1 = e.getControl(0);
			var p2 = e.getControl(2);
			
			if (points.length == 0)
			{
				points.push(e.getControl(0));
				points.push(e.getControl(2));
				lastPoint = e.getControl(2);
			} else {
				for (e2 in s.edges)
				{
					var p1 = e2.getControl(0);
					var p2 = e2.getControl(2);
					if (p1.x == lastPoint.x && p1.y == lastPoint.y)
					{
						points.push(p2);
						lastPoint = p2;
						break;
					}
				}
			}
		}
		
		if ( s.isGroup )
		{
			if ( points.length == 0 )
				throw "No points for bounding box";
				
			// Calculate bounding box coordinates based on point values
			var left = points[0].x;
			var top = points[0].y;
			var right = points[0].x;
			var bottom = points[0].y;
			
			for ( i in 1 ... points.length )
			{
				if ( points[i].x < left )
					left = points[i].x;
				if ( points[i].x > right )
					right = points[i].x;
				if ( points[i].y < top )
					top = points[i].y;
				if ( points[i].y > bottom )
					bottom = points[i].y;
			}
			
			// Calculate the center of the bounding box
			var cx = (right + left) / 2;
			var cy = (bottom + top) / 2;
			
			//trace("center: " + cx + "," + cy );
			
			// Offset all points from center position
			for ( i in 0 ... points.length )
			{
				points[i].x -= cx;
				points[i].y -= cy;
			}
		}
		//
		//if (s.isGroup)
		//{			
			//for (i in 0...points.length)
			//{
				//points[i].x -= s.x;
				//points[i].y -= s.y;
			//}
		//}
		
		if ( !Triangulator.isWindingDirectionCCW(points) )
			points.reverse();
		
		// give a warning for non closed shapes
		if (lastPoint.x != points[0].x || lastPoint.y != points[0].y)
			trace("WARNING: shape not closed: " + scope.name + " [" + scope.libraryItem.linkageClassName + "]");
		else
			points.pop();
			
		var triangles = Triangulator.triangulate(points);
		//trace(triangles);
		var polys = Triangulator.polygonizeTriangles(triangles);
		//trace(polys);
		
		for ( p in polys )
		{
			p.x.reverse();
			p.y.reverse();
			// only save shape transform info if the shape is in a group (or primitive)
			
			if (s.isGroup || true)
			{	
				//xml += '<poly x="'+s.x+'" y="'+s.y+'" w="'+s.width+'"  h="'+s.height+'" r="'+s.rotation+'" sx="'+s.scaleX+'" sy="'+s.scaleY+'">\n';
				//xml += '\t<poly x="'+(s.x - s.width/2)+'" y="'+(s.y - s.height/2)+'" w="'+s.width+'"  h="'+s.height+'" r="'+s.rotation+'" sx="'+s.scaleX+'" sy="'+s.scaleY+'">\n';
				
				//xml += '\t<poly x="'+s.x+'" y="'+s.y+'" w="'+s.width+'"  h="'+s.height+'" r="'+s.rotation+'" sx="'+s.scaleX+'" sy="'+s.scaleY+'">\n';
				
				var sx = s.x;
				//var sx = s.x - s.width / 2;
				var sy = s.y;
				//var sy = s.y - s.height / 2;
				var sw = s.x - s.width / 2;
				var sh = s.height / 2;
				
				sw = sh = 0;
				//sx = sy = 0;
				 
				xml += '\t<poly x="'+sx+'" y="'+sy+'" w="'+sw+'"  h="'+sh+'" r="'+s.rotation+'" sx="'+s.scaleX+'" sy="'+s.scaleY+'">\n';
			} else {
				xml += '\t<poly x="0" y="0" r="0" sx="1" sy="1" >\n';
			}
			for ( i in 0 ... p.nVertices )
				xml += '\t\t<vert x="' + p.x[i] + '" y="' + p.y[i] + '" />\n';
			xml += '\t</poly>\n';
		}
		
		//if (lastPoint.x == points[0].x && lastPoint.y == points[0].y)
		//
		//var p = null;
		//for (p in points){
		//for (i in 0...points.length)
		//{
			//if (s.isRectangleObject)
				//p = points[points.length - 1 - i];
			//else 
				//p = points[i];
			//xml += '<vert x="' + p.x + '" y="' + p.y + '" />\n';
		//}
		//
		//xml += '</poly>\n';
		
		return xml;
	}
	
	
	
	public function searchTimeline(inScope:Timeline, ?store:Result):Results{
		var results:Results = [];
		for (el in inScope.getChildren()){
			if (el.isInstance()){
				var el:SymbolInstance = cast el;
			
				for (el2 in el.getTimeline().getChildren()){
					var el2:SymbolInstance = cast el2;
					
					if (el2.isComponent()){
						switch(el2.libraryItem.linkageClassName){
							case "Def_Layout":
							
								results.unshift( { type:"layout", info:cast el2, scope:el, children:searchTimeline(el.getTimeline()) } );
										
							case "Def_MovieClip":

								results.unshift( { type:"movieclip", info:cast el2, scope:el, children:searchTimeline(el.getTimeline()) } );
							
							case "Def_Body":

								results.unshift( { type:"body", info:cast el2, scope:el, children:searchTimeline(el.getTimeline()) } );
									
							case "Def_GameObject":
							
								results.unshift( { type:"gameObject", info:cast el2, scope:el, children:searchTimeline(el.getTimeline()) } );	
							
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