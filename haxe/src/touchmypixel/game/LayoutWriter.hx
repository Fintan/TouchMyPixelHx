/*
 * JSFL Layout Writer - Tony Polinelli
 * Parses layouts & shapes in flash & exports the information to an xml file. 
 * 
 * */

package touchmypixel.game;

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

/*
 * JSFL script to parse elements to XML
 * 
 * */
class LayoutWriter 
{
	private var doc:Document;
	private var lib:Library;
	private var root:Timeline;
	
	public function new()
	{
		doc = Fl.getDocumentDOM();
		lib = doc.library;
		root = doc.timelines[0];
		
		Fl.outputPanel.clear();
		
		var results = searchTimeline(root);
		
		var xml = parseResults(results);
		
		//trace(xml);
		
		
		
		saveXml(xml);
	}
	
	private function saveXml(xml:String):Void
	{
		var path = doc.pathURI;
		path = path.substr(0, path.lastIndexOf("."));
		path += ".xml";
		
		
		trace('EXPORTED: ' +path);
		
		FLfile.write(path, xml);
	}
	
	private function parseResults(results:Results):String
	{
		var xml = "";
		for (r in results)
		{
			xml += switch(r.type)
			{
				case "layout": parseLayout(r);
				case "body":  parseBody(r);
				case "shape":  parseShape(r);
				case "object":  parseObject(r);
				case "gameObject":  parseGameObject(r);
				case "bitmap":  parseBitmap(r);
			}
		}
		return xml;
	}
	
	private function parseLayout(result:Result):String
	{
		
		var xml = '<layout ' + parseParameters(result);
		xml += ' w="' + result.scope.width + '" h="' + result.scope.height + '"';
		xml += '>\n';
		
		xml += parseResults(result.children);
		
		xml += '</layout>\n';
		
		return xml;
	}
	
	public function parseParameters(result:Result):String
	{
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
	
	
	public function parseBitmap(result:Result):String
	{
		var xml = '<bitmap ' + parseParameters(result) + ' file="'+result.scope.libraryItem.name.replace("-", "/") +'" />\n';
		
		return xml;
	}
	
	public function parseBody(result:Result):String
	{
		var xml = '<body ' + parseParameters(result) + '>\n';
		
		xml += parseElements(result.scope);
		
		xml += parseResults(result.children);
		
		xml += "</body>\n";
		return xml;
	}
	
	public function parseShape(result:Result):String
	{
		var xml  = '<shape ' + parseParameters(result) + '>\n';
		
		xml += parseElements(result.scope);
		
		xml += '</shape>\n';
		return xml;
	}
	
	public function parseObject(result:Result):String
	{
		var xml = '<object ' + parseParameters(result) + '>\n';
		
		xml += "</object>\n";
		return xml;
	}
	
	public function parseGameObject(result:Result):String
	{
		var xml = '<gameObject ' + parseParameters(result) + '>\n';
		
		//xml += parseElements(result.scope);
		
		xml += parseResults(result.children);
		
		xml += "</gameObject>\n";
		return xml;
	}
	
	/***************/
	
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
	
	/*
	 * public function parseElementPoly(s:Shape, scope:SymbolInstance):String
	{
		var xml  = "";
		
		// only save shape transform info if the shape is in a group (or primitive)
		if (s.isGroup)
		{	
			xml += '<poly x="'+s.x+'" y="'+s.y+'" w="'+s.width+'"  h="'+s.height+'" r="'+s.rotation+'" sx="'+s.scaleX+'" sy="'+s.scaleY+'">\n';
		} else {
			xml += '<poly x="0" y="0" r="0" scaleX="1" scaleY="1" >\n';
		}
		
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
		
		// Offset Grouped Object's points as to make them relative to it's center point
		if (s.isGroup)
		{
			var totalx = 0.;
			var totaly = 0.;
			for (i in 0...points.length-1)
			{
				totalx += points[i].x;
				totaly += points[i].y;
			}
			totalx /= points.length - 1;
			totaly /= points.length - 1;
			
			for (i in 0...points.length)
			{
				points[i].x = points[i].x - totalx;
				points[i].y = points[i].y - totaly;
			}
		}
		
		if ( !Triangulator.isWindingDirectionCCW(points) )
			points.reverse();
		
		// give a warning for non closed shapes
		if (lastPoint.x != points[0].x || lastPoint.y != points[0].y)
			trace("WARNING: shape not closed: " + scope.name + " [" + scope.libraryItem.linkageClassName + "]");
		else
			points.shift();
			
		var triangles = Triangulator.triangulate(points);
		//trace(triangles);
		var polys = Triangulator.polygonizeTriangles(triangles);
		//trace(polys);
		
		//if (lastPoint.x == points[0].x && lastPoint.y == points[0].y)
		
		var p = null;
		//for (p in points){
		for (i in 0...points.length)
		{
			if (s.isRectangleObject)
				p = points[points.length - 1 - i];
			else 
				p = points[i];
			xml += '<vert x="' + p.x + '" y="' + p.y + '" />\n';
		}
		
		xml += '</poly>\n';
		
		return xml;
	}
	*/
	
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
	
	/***************/
	
	
	public function searchTimeline(inScope:Timeline, ?store:Result):Results
	{
		var results:Results = [];
		for (el in inScope.getChildren())
		{
			if (el.isInstance())
			{
				var el:SymbolInstance = cast el;
			
				for (el2 in el.getTimeline().getChildren())
				{
					var el2:SymbolInstance = cast el2;
					
					if (el2.isComponent())
					{
						switch(el2.libraryItem.linkageClassName)
						{
							case "Def_Layout":
								results.unshift( { type:"layout", info:cast el2, scope:el, children:searchTimeline(el.getTimeline()) } );
								
							case "Def_Body":
								
								results.unshift( { type:"body", info:cast el2, scope:el, children:searchTimeline(el.getTimeline()) } );
							
							case "Def_Shape":
								results.unshift( { type:"shape", info:cast el2, scope:el, children:null } );
								
							case "Def_Object":
								results.unshift( { type:"object", info:cast el2, scope:el, children:null } );
								
							case "Def_GameObject":
								results.unshift( { type:"gameObject", info:cast el2, scope:el, children:searchTimeline(el.getTimeline()) } );	
						}
					}
						
					
				}
				if (el.isBitmap())
				{
					results.unshift( { type:"bitmap", info:cast el, scope:el, children:null } );	
				}
			}
		}
		return results;
	}
	
}


typedef Results = Array<Result>;

typedef Result = {
	var type:String;
	var info:ComponentInstance;
	var scope:SymbolInstance;
	var children:Results;
}
