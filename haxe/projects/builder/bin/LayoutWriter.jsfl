$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof touchmypixel=='undefined') touchmypixel = {}
if(!touchmypixel.geom) touchmypixel.geom = {}
touchmypixel.geom.Triangle = function(x1,y1,x2,y2,x3,y3) { if( x1 === $_ ) return; {
	$s.push("touchmypixel.geom.Triangle::new");
	var $spos = $s.length;
	this.x = new Array();
	this.y = new Array();
	var dx1 = x2 - x1;
	var dx2 = x3 - x1;
	var dy1 = y2 - y1;
	var dy2 = y3 - y1;
	var cross = (dx1 * dy2) - (dx2 * dy1);
	var ccw = (cross > 0);
	if(ccw) {
		this.x[0] = x1;
		this.x[1] = x2;
		this.x[2] = x3;
		this.y[0] = y1;
		this.y[1] = y2;
		this.y[2] = y3;
	}
	else {
		this.x[0] = x1;
		this.x[1] = x3;
		this.x[2] = x2;
		this.y[0] = y1;
		this.y[1] = y3;
		this.y[2] = y2;
	}
	$s.pop();
}}
touchmypixel.geom.Triangle.__name__ = ["touchmypixel","geom","Triangle"];
touchmypixel.geom.Triangle.prototype.isInside = function(px,py) {
	$s.push("touchmypixel.geom.Triangle::isInside");
	var $spos = $s.length;
	var vx2 = px - this.x[0];
	var vy2 = py - this.y[0];
	var vx1 = this.x[1] - this.x[0];
	var vy1 = this.y[1] - this.y[0];
	var vx0 = this.x[2] - this.x[0];
	var vy0 = this.y[2] - this.y[0];
	var dot00 = (vx0 * vx0 + vy0) + vy0;
	var dot01 = vx0 * vx1 + vy0 * vy1;
	var dot02 = vx0 * vx2 + vy0 * vy2;
	var dot11 = vx1 * vx1 + vy1 * vy1;
	var dot12 = vx1 * vx2 + vy1 * vy2;
	var invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
	var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
	var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
	{
		var $tmp = ((u > 0) && (v > 0) && (u + v < 1));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
touchmypixel.geom.Triangle.prototype.x = null;
touchmypixel.geom.Triangle.prototype.y = null;
touchmypixel.geom.Triangle.prototype.__class__ = touchmypixel.geom.Triangle;
if(!touchmypixel.game) touchmypixel.game = {}
touchmypixel.game.LayoutWriter = function(p) { if( p === $_ ) return; {
	$s.push("touchmypixel.game.LayoutWriter::new");
	var $spos = $s.length;
	this.doc = jsfl.Fl.getDocumentDOM();
	this.lib = this.doc.library;
	this.root = this.doc.timelines[0];
	jsfl.Fl.outputPanel.clear();
	var results = this.searchTimeline(this.root);
	var xml = this.parseResults(results);
	this.saveXml(xml);
	$s.pop();
}}
touchmypixel.game.LayoutWriter.__name__ = ["touchmypixel","game","LayoutWriter"];
touchmypixel.game.LayoutWriter.prototype.doc = null;
touchmypixel.game.LayoutWriter.prototype.lib = null;
touchmypixel.game.LayoutWriter.prototype.parseBitmap = function(result) {
	$s.push("touchmypixel.game.LayoutWriter::parseBitmap");
	var $spos = $s.length;
	var xml = ((("<bitmap " + this.parseParameters(result)) + " file=\"") + StringTools.replace(result.scope.libraryItem.name,"-","/")) + "\" />\n";
	{
		$s.pop();
		return xml;
	}
	$s.pop();
}
touchmypixel.game.LayoutWriter.prototype.parseBody = function(result) {
	$s.push("touchmypixel.game.LayoutWriter::parseBody");
	var $spos = $s.length;
	var xml = ("<body " + this.parseParameters(result)) + ">\n";
	xml += this.parseElements(result.scope);
	xml += this.parseResults(result.children);
	xml += "</body>\n";
	{
		$s.pop();
		return xml;
	}
	$s.pop();
}
touchmypixel.game.LayoutWriter.prototype.parseElementCircle = function(s) {
	$s.push("touchmypixel.game.LayoutWriter::parseElementCircle");
	var $spos = $s.length;
	var xml = ((((((((((((("\t<circle x=\"" + s.x) + "\" y=\"") + s.y) + "\" w=\"") + s.width) + "\"  h=\"") + s.height) + "\" r=\"") + s.rotation) + "\" sx=\"") + s.scaleX) + "\" sy=\"") + s.scaleY) + "\" />\n";
	{
		$s.pop();
		return xml;
	}
	$s.pop();
}
touchmypixel.game.LayoutWriter.prototype.parseElementPoly = function(s,scope) {
	$s.push("touchmypixel.game.LayoutWriter::parseElementPoly");
	var $spos = $s.length;
	var xml = "";
	var points = new Array();
	var lastPoint = null;
	{
		var _g = 0, _g1 = s.edges;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			var p1 = e.getControl(0);
			var p2 = e.getControl(2);
			if(points.length == 0) {
				points.push(e.getControl(0));
				points.push(e.getControl(2));
				lastPoint = e.getControl(2);
			}
			else {
				{
					var _g2 = 0, _g3 = s.edges;
					while(_g2 < _g3.length) {
						var e2 = _g3[_g2];
						++_g2;
						var p11 = e2.getControl(0);
						var p21 = e2.getControl(2);
						if(p11.x == lastPoint.x && p11.y == lastPoint.y) {
							points.push(p21);
							lastPoint = p21;
							break;
						}
					}
				}
			}
		}
	}
	if(s.isGroup) {
		if(points.length == 0) throw "No points for bounding box";
		var left = points[0].x;
		var top = points[0].y;
		var right = points[0].x;
		var bottom = points[0].y;
		{
			var _g1 = 1, _g = points.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(points[i].x < left) left = points[i].x;
				if(points[i].x > right) right = points[i].x;
				if(points[i].y < top) top = points[i].y;
				if(points[i].y > bottom) bottom = points[i].y;
			}
		}
		var cx = (right + left) / 2;
		var cy = (bottom + top) / 2;
		{
			var _g1 = 0, _g = points.length;
			while(_g1 < _g) {
				var i = _g1++;
				points[i].x -= cx;
				points[i].y -= cy;
			}
		}
	}
	if(!touchmypixel.geom.Triangulator.isWindingDirectionCCW(points)) points.reverse();
	if(lastPoint.x != points[0].x || lastPoint.y != points[0].y) haxe.Log.trace(((("WARNING: shape not closed: " + scope.name) + " [") + scope.libraryItem.linkageClassName) + "]",{ fileName : "LayoutWriter.hx", lineNumber : 412, className : "touchmypixel.game.LayoutWriter", methodName : "parseElementPoly"});
	else points.pop();
	var triangles = touchmypixel.geom.Triangulator.triangulate(points);
	var polys = touchmypixel.geom.Triangulator.polygonizeTriangles(triangles);
	{
		var _g = 0;
		while(_g < polys.length) {
			var p = polys[_g];
			++_g;
			p.x.reverse();
			p.y.reverse();
			if(s.isGroup || true) {
				var sx = s.x;
				var sy = s.y;
				var sw = s.x - s.width / 2;
				var sh = s.height / 2;
				sw = sh = 0;
				xml += ((((((((((((("\t<poly x=\"" + sx) + "\" y=\"") + sy) + "\" w=\"") + sw) + "\"  h=\"") + sh) + "\" r=\"") + s.rotation) + "\" sx=\"") + s.scaleX) + "\" sy=\"") + s.scaleY) + "\">\n";
			}
			else {
				xml += "\t<poly x=\"0\" y=\"0\" r=\"0\" sx=\"1\" sy=\"1\" >\n";
			}
			{
				var _g2 = 0, _g1 = p.nVertices;
				while(_g2 < _g1) {
					var i = _g2++;
					xml += ((("\t\t<vert x=\"" + p.x[i]) + "\" y=\"") + p.y[i]) + "\" />\n";
				}
			}
			xml += "\t</poly>\n";
		}
	}
	{
		$s.pop();
		return xml;
	}
	$s.pop();
}
touchmypixel.game.LayoutWriter.prototype.parseElementRect = function(s) {
	$s.push("touchmypixel.game.LayoutWriter::parseElementRect");
	var $spos = $s.length;
	var xml = this.parseElementPoly(s,null);
	{
		$s.pop();
		return xml;
	}
	$s.pop();
}
touchmypixel.game.LayoutWriter.prototype.parseElements = function(scope) {
	$s.push("touchmypixel.game.LayoutWriter::parseElements");
	var $spos = $s.length;
	var xml = "";
	{
		var _g = 0, _g1 = touchmypixel.game.utils.JSFLTools.getChildren(touchmypixel.game.utils.JSFLTools.getTimeline(scope));
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(touchmypixel.game.utils.JSFLTools.isShape(child)) {
				var s = child;
				if(s.isRectangleObject) xml += this.parseElementRect(child);
				else if(s.isOvalObject) xml += this.parseElementCircle(child);
				else xml += this.parseElementPoly(child,scope);
			}
		}
	}
	{
		$s.pop();
		return xml;
	}
	$s.pop();
}
touchmypixel.game.LayoutWriter.prototype.parseGameObject = function(result) {
	$s.push("touchmypixel.game.LayoutWriter::parseGameObject");
	var $spos = $s.length;
	var xml = ("<gameObject " + this.parseParameters(result)) + ">\n";
	xml += this.parseResults(result.children);
	xml += "</gameObject>\n";
	{
		$s.pop();
		return xml;
	}
	$s.pop();
}
touchmypixel.game.LayoutWriter.prototype.parseLayout = function(result) {
	$s.push("touchmypixel.game.LayoutWriter::parseLayout");
	var $spos = $s.length;
	var xml = "<layout " + this.parseParameters(result);
	xml += (((" w=\"" + result.scope.width) + "\" h=\"") + result.scope.height) + "\"";
	xml += ">\n";
	xml += this.parseResults(result.children);
	xml += "</layout>\n";
	{
		$s.pop();
		return xml;
	}
	$s.pop();
}
touchmypixel.game.LayoutWriter.prototype.parseObject = function(result) {
	$s.push("touchmypixel.game.LayoutWriter::parseObject");
	var $spos = $s.length;
	var xml = ("<object " + this.parseParameters(result)) + ">\n";
	xml += "</object>\n";
	{
		$s.pop();
		return xml;
	}
	$s.pop();
}
touchmypixel.game.LayoutWriter.prototype.parseParameters = function(result) {
	$s.push("touchmypixel.game.LayoutWriter::parseParameters");
	var $spos = $s.length;
	var sc = result.scope;
	var xml = "";
	xml += (" name=\"" + sc.name) + "\"";
	xml += (" x=\"" + sc.x) + "\"";
	xml += (" y=\"" + sc.y) + "\"";
	xml += (" sx=\"" + sc.scaleX) + "\"";
	xml += (" sy=\"" + sc.scaleY) + "\"";
	xml += (" r=\"" + sc.rotation) + "\"";
	if(touchmypixel.game.utils.JSFLTools.isComponent(result.info)) {
		var def = touchmypixel.game.utils.JSFLTools.getDefinitionValues(result.info);
		{ var $it0 = def.keys();
		while( $it0.hasNext() ) { var v = $it0.next();
		{
			xml += (((" " + v) + "=\"") + def.get(v)) + "\"";
		}
		}}
	}
	{
		$s.pop();
		return xml;
	}
	$s.pop();
}
touchmypixel.game.LayoutWriter.prototype.parseResults = function(results) {
	$s.push("touchmypixel.game.LayoutWriter::parseResults");
	var $spos = $s.length;
	var xml = "";
	{
		var _g = 0;
		while(_g < results.length) {
			var r = results[_g];
			++_g;
			xml += (function($this) {
				var $r;
				switch(r.type) {
				case "layout":{
					$r = $this.parseLayout(r);
				}break;
				case "body":{
					$r = $this.parseBody(r);
				}break;
				case "shape":{
					$r = $this.parseShape(r);
				}break;
				case "object":{
					$r = $this.parseObject(r);
				}break;
				case "gameObject":{
					$r = $this.parseGameObject(r);
				}break;
				case "bitmap":{
					$r = $this.parseBitmap(r);
				}break;
				default:{
					$r = null;
				}break;
				}
				return $r;
			}(this));
		}
	}
	{
		$s.pop();
		return xml;
	}
	$s.pop();
}
touchmypixel.game.LayoutWriter.prototype.parseShape = function(result) {
	$s.push("touchmypixel.game.LayoutWriter::parseShape");
	var $spos = $s.length;
	var xml = ("<shape " + this.parseParameters(result)) + ">\n";
	xml += this.parseElements(result.scope);
	xml += "</shape>\n";
	{
		$s.pop();
		return xml;
	}
	$s.pop();
}
touchmypixel.game.LayoutWriter.prototype.root = null;
touchmypixel.game.LayoutWriter.prototype.saveXml = function(xml) {
	$s.push("touchmypixel.game.LayoutWriter::saveXml");
	var $spos = $s.length;
	var path = this.doc.pathURI;
	path = path.substr(0,path.lastIndexOf("."));
	path += ".xml";
	haxe.Log.trace("EXPORTED: " + path,{ fileName : "LayoutWriter.hx", lineNumber : 66, className : "touchmypixel.game.LayoutWriter", methodName : "saveXml"});
	jsfl.FLfile.write(path,xml);
	$s.pop();
}
touchmypixel.game.LayoutWriter.prototype.searchTimeline = function(inScope,store) {
	$s.push("touchmypixel.game.LayoutWriter::searchTimeline");
	var $spos = $s.length;
	var results = [];
	{
		var _g = 0, _g1 = touchmypixel.game.utils.JSFLTools.getChildren(inScope);
		while(_g < _g1.length) {
			var el = _g1[_g];
			++_g;
			if(touchmypixel.game.utils.JSFLTools.isInstance(el)) {
				var el1 = el;
				{
					var _g2 = 0, _g3 = touchmypixel.game.utils.JSFLTools.getChildren(touchmypixel.game.utils.JSFLTools.getTimeline(el1));
					while(_g2 < _g3.length) {
						var el2 = _g3[_g2];
						++_g2;
						var el21 = el2;
						if(touchmypixel.game.utils.JSFLTools.isComponent(el21)) {
							switch(el21.libraryItem.linkageClassName) {
							case "Def_Layout":{
								results.unshift({ type : "layout", info : el21, scope : el1, children : this.searchTimeline(touchmypixel.game.utils.JSFLTools.getTimeline(el1))});
							}break;
							case "Def_Body":{
								results.unshift({ type : "body", info : el21, scope : el1, children : this.searchTimeline(touchmypixel.game.utils.JSFLTools.getTimeline(el1))});
							}break;
							case "Def_Shape":{
								results.unshift({ type : "shape", info : el21, scope : el1, children : null});
							}break;
							case "Def_Object":{
								results.unshift({ type : "object", info : el21, scope : el1, children : null});
							}break;
							case "Def_GameObject":{
								results.unshift({ type : "gameObject", info : el21, scope : el1, children : this.searchTimeline(touchmypixel.game.utils.JSFLTools.getTimeline(el1))});
							}break;
							}
						}
					}
				}
				if(touchmypixel.game.utils.JSFLTools.isBitmap(el1)) {
					results.unshift({ type : "bitmap", info : el1, scope : el1, children : null});
				}
			}
		}
	}
	{
		$s.pop();
		return results;
	}
	$s.pop();
}
touchmypixel.game.LayoutWriter.prototype.__class__ = touchmypixel.game.LayoutWriter;
touchmypixel.geom.Polygon = function(_x,_y) { if( _x === $_ ) return; {
	$s.push("touchmypixel.geom.Polygon::new");
	var $spos = $s.length;
	this.x = new Array();
	this.y = new Array();
	this.nVertices = _x.length;
	{
		var _g1 = 0, _g = this.nVertices;
		while(_g1 < _g) {
			var i = _g1++;
			this.x[i] = _x[i];
			this.y[i] = _y[i];
		}
	}
	$s.pop();
}}
touchmypixel.geom.Polygon.__name__ = ["touchmypixel","geom","Polygon"];
touchmypixel.geom.Polygon.prototype.add = function(t) {
	$s.push("touchmypixel.geom.Polygon::add");
	var $spos = $s.length;
	var firstP = -1;
	var firstT = -1;
	var secondP = -1;
	var secondT = -1;
	{
		var _g1 = 0, _g = this.nVertices;
		while(_g1 < _g) {
			var i = _g1++;
			if(t.x[0] == this.x[i] && t.y[0] == this.y[i]) {
				if(firstP == -1) {
					firstP = i;
					firstT = 0;
				}
				else {
					secondP = i;
					secondT = 0;
				}
			}
			else if(t.x[1] == this.x[i] && t.y[1] == this.y[i]) {
				if(firstP == -1) {
					firstP = i;
					firstT = 1;
				}
				else {
					secondP = i;
					secondT = 1;
				}
			}
			else if(t.x[2] == this.x[i] && t.y[2] == this.y[i]) {
				if(firstP == -1) {
					firstP = i;
					firstT = 2;
				}
				else {
					secondP = i;
					secondT = 2;
				}
			}
			else null;
		}
	}
	if(firstP == 0 && secondP == this.nVertices - 1) {
		firstP = this.nVertices - 1;
		secondP = 0;
	}
	if(secondP == -1) {
		$s.pop();
		return null;
	}
	var tipT = 0;
	if(tipT == firstT || tipT == secondT) tipT = 1;
	if(tipT == firstT || tipT == secondT) tipT = 2;
	var newx = new Array();
	var newy = new Array();
	var currOut = 0;
	{
		var _g1 = 0, _g = this.nVertices;
		while(_g1 < _g) {
			var i = _g1++;
			newx[currOut] = this.x[i];
			newy[currOut] = this.y[i];
			if(i == firstP) {
				++currOut;
				newx[currOut] = t.x[tipT];
				newy[currOut] = t.y[tipT];
			}
			++currOut;
		}
	}
	{
		var $tmp = new touchmypixel.geom.Polygon(newx,newy);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
touchmypixel.geom.Polygon.prototype.isConvex = function() {
	$s.push("touchmypixel.geom.Polygon::isConvex");
	var $spos = $s.length;
	var isPositive = false;
	{
		var _g1 = 0, _g = this.nVertices;
		while(_g1 < _g) {
			var i = _g1++;
			var lower = ((i == 0)?(this.nVertices - 1):(i - 1));
			var middle = i;
			var upper = ((i == this.nVertices - 1)?0:(i + 1));
			var dx0 = this.x[middle] - this.x[lower];
			var dy0 = this.y[middle] - this.y[lower];
			var dx1 = this.x[upper] - this.x[middle];
			var dy1 = this.y[upper] - this.y[middle];
			var cross = dx0 * dy1 - dx1 * dy0;
			var newIsP = (cross > 0);
			if(i == 0) isPositive = newIsP;
			else if(isPositive != newIsP) {
				$s.pop();
				return false;
			}
		}
	}
	{
		$s.pop();
		return true;
	}
	$s.pop();
}
touchmypixel.geom.Polygon.prototype.nVertices = null;
touchmypixel.geom.Polygon.prototype.set = function(p) {
	$s.push("touchmypixel.geom.Polygon::set");
	var $spos = $s.length;
	this.nVertices = p.nVertices;
	this.x = new Array();
	this.y = new Array();
	var i = 0;
	{
		var _g1 = 0, _g = this.nVertices;
		while(_g1 < _g) {
			var i1 = _g1++;
			this.x[i1] = p.x[i1];
			this.y[i1] = p.y[i1];
		}
	}
	$s.pop();
}
touchmypixel.geom.Polygon.prototype.x = null;
touchmypixel.geom.Polygon.prototype.y = null;
touchmypixel.geom.Polygon.prototype.__class__ = touchmypixel.geom.Polygon;
touchmypixel.geom.Triangulator = function() { }
touchmypixel.geom.Triangulator.__name__ = ["touchmypixel","geom","Triangulator"];
touchmypixel.geom.Triangulator.triangulate = function(vertices) {
	$s.push("touchmypixel.geom.Triangulator::triangulate");
	var $spos = $s.length;
	var xA = new Array();
	var yA = new Array();
	{
		var _g = 0;
		while(_g < vertices.length) {
			var v = vertices[_g];
			++_g;
			xA.push(v.x);
			yA.push(v.y);
		}
	}
	{
		var $tmp = touchmypixel.geom.Triangulator.triangulateFromFlatArray(xA,yA);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
touchmypixel.geom.Triangulator.triangulateFromFlatArray = function(vx,vy) {
	$s.push("touchmypixel.geom.Triangulator::triangulateFromFlatArray");
	var $spos = $s.length;
	if(vx.length < 3 || vy.length < 3 || vx.length != vy.length) {
		throw "Plase make sure both arrays are of the same length and have at least 3 vertices in them!";
		{
			$s.pop();
			return null;
		}
	}
	var vNum = vx.length;
	var buffer = new Array();
	var bufferSize = 0;
	var xrem = new Array();
	var yrem = new Array();
	var i = 0;
	while(i < vNum) {
		xrem[i] = vx[i];
		yrem[i] = vy[i];
		i++;
	}
	while(vNum > 3) {
		var earIndex = -1;
		i = 0;
		while(i < vNum) {
			if(touchmypixel.geom.Triangulator.isEar(i,xrem,yrem)) {
				earIndex = i;
				break;
			}
			i++;
		}
		if(earIndex == -1) {
			throw "Error: No ear found!";
			{
				$s.pop();
				return null;
			}
		}
		--vNum;
		var newx = new Array();
		var newy = new Array();
		var currDest = 0;
		i = 0;
		while(i < vNum) {
			if(currDest == earIndex) ++currDest;
			newx[i] = xrem[currDest];
			newy[i] = yrem[currDest];
			++currDest;
			i++;
		}
		var under = ((earIndex == 0)?(xrem.length - 1):(earIndex - 1));
		var over = ((earIndex == xrem.length - 1)?0:(earIndex + 1));
		var toAdd = new touchmypixel.geom.Triangle(xrem[earIndex],yrem[earIndex],xrem[over],yrem[over],xrem[under],yrem[under]);
		buffer[bufferSize] = toAdd;
		++bufferSize;
		xrem = newx;
		yrem = newy;
	}
	var toAddMore = new touchmypixel.geom.Triangle(xrem[1],yrem[1],xrem[2],yrem[2],xrem[0],yrem[0]);
	buffer[bufferSize] = toAddMore;
	++bufferSize;
	var res = new Array();
	i = 0;
	while(i < bufferSize) {
		res[i] = buffer[i];
		i++;
	}
	{
		$s.pop();
		return res;
	}
	$s.pop();
}
touchmypixel.geom.Triangulator.polygonizeTriangles = function(triangulated) {
	$s.push("touchmypixel.geom.Triangulator::polygonizeTriangles");
	var $spos = $s.length;
	var polys = null;
	var polyIndex = 0;
	if(triangulated == null) {
		$s.pop();
		return null;
	}
	else {
		polys = new Array();
		var covered = new Array();
		{
			var _g1 = 0, _g = triangulated.length;
			while(_g1 < _g) {
				var i = _g1++;
				covered[i] = false;
			}
		}
		var notDone = true;
		while(notDone) {
			var currTri = -1;
			{
				var _g1 = 0, _g = triangulated.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(covered[i]) continue;
					currTri = i;
					break;
				}
			}
			var poly = null;
			if(currTri == -1) {
				notDone = false;
				continue;
			}
			else {
				poly = new touchmypixel.geom.Polygon(triangulated[currTri].x,triangulated[currTri].y);
				covered[currTri] = true;
				{
					var _g1 = 0, _g = triangulated.length;
					while(_g1 < _g) {
						var i = _g1++;
						if(covered[i]) continue;
						var newP = poly.add(triangulated[i]);
						if(newP == null) continue;
						if(newP.isConvex()) {
							poly = newP;
							covered[i] = true;
						}
					}
				}
			}
			polys[polyIndex] = poly;
			polyIndex++;
		}
	}
	var ret = new Array();
	{
		var _g = 0;
		while(_g < polyIndex) {
			var i = _g++;
			ret[i] = polys[i];
		}
	}
	{
		$s.pop();
		return ret;
	}
	$s.pop();
}
touchmypixel.geom.Triangulator.isEar = function(i,vx,vy) {
	$s.push("touchmypixel.geom.Triangulator::isEar");
	var $spos = $s.length;
	if(i >= vx.length || i < 0 || vx.length < 3) {
		$s.pop();
		return false;
	}
	var upper = i + 1;
	var lower = i - 1;
	var dx0 = 0.0;
	var dy0 = 0.0;
	var dx1 = 0.0;
	var dy1 = 0.0;
	if(i == 0) {
		dx0 = vx[0] - vx[vx.length - 1];
		dy0 = vy[0] - vy[vy.length - 1];
		dx1 = vx[1] - vx[0];
		dy1 = vy[1] - vy[0];
		lower = vx.length - 1;
	}
	else if(i == vx.length - 1) {
		dx0 = vx[i] - vx[i - 1];
		dy0 = vy[i] - vy[i - 1];
		dx1 = vx[0] - vx[i];
		dy1 = vy[0] - vy[i];
		upper = 0;
	}
	else {
		dx0 = vx[i] - vx[i - 1];
		dy0 = vy[i] - vy[i - 1];
		dx1 = vx[i + 1] - vx[i];
		dy1 = vy[i + 1] - vy[i];
	}
	var cross = (dx0 * dy1) - (dx1 * dy0);
	if(cross > 0) {
		$s.pop();
		return false;
	}
	var myTri = new touchmypixel.geom.Triangle(vx[i],vy[i],vx[upper],vy[upper],vx[lower],vy[lower]);
	var j = 0;
	while(j < vx.length) {
		if(!(j == i || j == lower || j == upper)) {
			if(myTri.isInside(vx[j],vy[j])) {
				$s.pop();
				return false;
			}
		}
		j++;
	}
	{
		$s.pop();
		return true;
	}
	$s.pop();
}
touchmypixel.geom.Triangulator.isWindingDirectionCCW = function(vertices) {
	$s.push("touchmypixel.geom.Triangulator::isWindingDirectionCCW");
	var $spos = $s.length;
	var count = 0;
	var n = vertices.length;
	if(n < 3) {
		$s.pop();
		return null;
	}
	var i = 0;
	while(i < n) {
		var j = (i + 1) % n;
		var k = (i + 2) % n;
		var z = (vertices[j].x - vertices[i].x) * (vertices[k].y - vertices[j].y);
		z -= (vertices[j].y - vertices[i].y) * (vertices[k].x - vertices[j].x);
		if(z < 0) count--;
		else if(z > 0) count++;
		i++;
	}
	if(count > 0) {
		$s.pop();
		return false;
	}
	else if(count < 0) {
		$s.pop();
		return true;
	}
	else {
		$s.pop();
		return null;
	}
	$s.pop();
}
touchmypixel.geom.Triangulator.prototype.__class__ = touchmypixel.geom.Triangulator;
IntIter = function(min,max) { if( min === $_ ) return; {
	$s.push("IntIter::new");
	var $spos = $s.length;
	this.min = min;
	this.max = max;
	$s.pop();
}}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.hasNext = function() {
	$s.push("IntIter::hasNext");
	var $spos = $s.length;
	{
		var $tmp = this.min < this.max;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
IntIter.prototype.max = null;
IntIter.prototype.min = null;
IntIter.prototype.next = function() {
	$s.push("IntIter::next");
	var $spos = $s.length;
	{
		var $tmp = this.min++;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
IntIter.prototype.__class__ = IntIter;
if(typeof js=='undefined') js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	$s.push("js.Boot::__unhtml");
	var $spos = $s.length;
	{
		var $tmp = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
js.Boot.__trace = function(v,i) {
	$s.push("js.Boot::__trace");
	var $spos = $s.length;
	var msg = (i != null?((i.fileName + ":") + i.lineNumber) + ": ":"");
	msg += js.Boot.__string_rec(v,"");
	fl.trace(msg);
	$s.pop();
}
js.Boot.__clear_trace = function() {
	$s.push("js.Boot::__clear_trace");
	var $spos = $s.length;
	fl.outputPanel.clear();
	$s.pop();
}
js.Boot.__closure = function(o,f) {
	$s.push("js.Boot::__closure");
	var $spos = $s.length;
	var m = o[f];
	if(m == null) {
		$s.pop();
		return null;
	}
	var f1 = function() {
		$s.push("js.Boot::__closure@67");
		var $spos = $s.length;
		{
			var $tmp = m.apply(o,arguments);
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	f1.scope = o;
	f1.method = m;
	{
		$s.pop();
		return f1;
	}
	$s.pop();
}
js.Boot.__string_rec = function(o,s) {
	$s.push("js.Boot::__string_rec");
	var $spos = $s.length;
	if(o == null) {
		$s.pop();
		return "null";
	}
	if(s.length >= 5) {
		$s.pop();
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":{
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) {
					var $tmp = o[0];
					$s.pop();
					return $tmp;
				}
				var str = o[0] + "(";
				s += "\t";
				{
					var _g1 = 2, _g = o.length;
					while(_g1 < _g) {
						var i = _g1++;
						if(i != 2) str += "," + js.Boot.__string_rec(o[i],s);
						else str += js.Boot.__string_rec(o[i],s);
					}
				}
				{
					var $tmp = str + ")";
					$s.pop();
					return $tmp;
				}
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			{
				var _g = 0;
				while(_g < l) {
					var i1 = _g++;
					str += ((i1 > 0?",":"")) + js.Boot.__string_rec(o[i1],s);
				}
			}
			str += "]";
			{
				$s.pop();
				return str;
			}
		}
		var tostr;
		try {
			tostr = o.toString;
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					$e = [];
					while($s.length >= $spos) $e.unshift($s.pop());
					$s.push($e[0]);
					{
						$s.pop();
						return "???";
					}
				}
			}
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				$s.pop();
				return s2;
			}
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = (o.hasOwnProperty != null);
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) continue;
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") continue;
		if(str.length != 2) str += ", \n";
		str += ((s + k) + " : ") + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += ("\n" + s) + "}";
		{
			$s.pop();
			return str;
		}
	}break;
	case "function":{
		{
			$s.pop();
			return "<function>";
		}
	}break;
	case "string":{
		{
			$s.pop();
			return o;
		}
	}break;
	default:{
		{
			var $tmp = String(o);
			$s.pop();
			return $tmp;
		}
	}break;
	}
	$s.pop();
}
js.Boot.__interfLoop = function(cc,cl) {
	$s.push("js.Boot::__interfLoop");
	var $spos = $s.length;
	if(cc == null) {
		$s.pop();
		return false;
	}
	if(cc == cl) {
		$s.pop();
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) {
				$s.pop();
				return true;
			}
		}
	}
	{
		var $tmp = js.Boot.__interfLoop(cc.__super__,cl);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
js.Boot.__instanceof = function(o,cl) {
	$s.push("js.Boot::__instanceof");
	var $spos = $s.length;
	try {
		if(o instanceof cl) {
			if(cl == Array) {
				var $tmp = (o.__enum__ == null);
				$s.pop();
				return $tmp;
			}
			{
				$s.pop();
				return true;
			}
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) {
			$s.pop();
			return true;
		}
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				if(cl == null) {
					$s.pop();
					return false;
				}
			}
		}
	}
	switch(cl) {
	case Int:{
		{
			var $tmp = Math.ceil(o%2147483648.0) === o;
			$s.pop();
			return $tmp;
		}
	}break;
	case Float:{
		{
			var $tmp = typeof(o) == "number";
			$s.pop();
			return $tmp;
		}
	}break;
	case Bool:{
		{
			var $tmp = o === true || o === false;
			$s.pop();
			return $tmp;
		}
	}break;
	case String:{
		{
			var $tmp = typeof(o) == "string";
			$s.pop();
			return $tmp;
		}
	}break;
	case Dynamic:{
		{
			$s.pop();
			return true;
		}
	}break;
	default:{
		if(o == null) {
			$s.pop();
			return false;
		}
		{
			var $tmp = o.__enum__ == cl || (cl == Class && o.__name__ != null) || (cl == Enum && o.__ename__ != null);
			$s.pop();
			return $tmp;
		}
	}break;
	}
	$s.pop();
}
js.Boot.__init = function() {
	$s.push("js.Boot::__init");
	var $spos = $s.length;
	js.Lib.isIE = (typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null);
	js.Lib.isOpera = (typeof window!='undefined' && window.opera != null);
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		$s.push("js.Boot::__init@205");
		var $spos = $s.length;
		this.splice(i,0,x);
		$s.pop();
	}
	Array.prototype.remove = (Array.prototype.indexOf?function(obj) {
		$s.push("js.Boot::__init@208");
		var $spos = $s.length;
		var idx = this.indexOf(obj);
		if(idx == -1) {
			$s.pop();
			return false;
		}
		this.splice(idx,1);
		{
			$s.pop();
			return true;
		}
		$s.pop();
	}:function(obj) {
		$s.push("js.Boot::__init@213");
		var $spos = $s.length;
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				{
					$s.pop();
					return true;
				}
			}
			i++;
		}
		{
			$s.pop();
			return false;
		}
		$s.pop();
	});
	Array.prototype.iterator = function() {
		$s.push("js.Boot::__init@225");
		var $spos = $s.length;
		{
			var $tmp = { cur : 0, arr : this, hasNext : function() {
				$s.push("js.Boot::__init@225@229");
				var $spos = $s.length;
				{
					var $tmp = this.cur < this.arr.length;
					$s.pop();
					return $tmp;
				}
				$s.pop();
			}, next : function() {
				$s.push("js.Boot::__init@225@232");
				var $spos = $s.length;
				{
					var $tmp = this.arr[this.cur++];
					$s.pop();
					return $tmp;
				}
				$s.pop();
			}}
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	var cca = String.prototype.charCodeAt;
	String.prototype.cca = cca;
	String.prototype.charCodeAt = function(i) {
		$s.push("js.Boot::__init@239");
		var $spos = $s.length;
		var x = cca.call(this,i);
		if(isNaN(x)) {
			$s.pop();
			return null;
		}
		{
			$s.pop();
			return x;
		}
		$s.pop();
	}
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		$s.push("js.Boot::__init@246");
		var $spos = $s.length;
		if(pos != null && pos != 0 && len != null && len < 0) {
			$s.pop();
			return "";
		}
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		}
		else if(len < 0) {
			len = (this.length + len) - pos;
		}
		{
			var $tmp = oldsub.apply(this,[pos,len]);
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	$closure = js.Boot.__closure;
	$s.pop();
}
js.Boot.prototype.__class__ = js.Boot;
StringBuf = function(p) { if( p === $_ ) return; {
	$s.push("StringBuf::new");
	var $spos = $s.length;
	this.b = new Array();
	$s.pop();
}}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	$s.push("StringBuf::add");
	var $spos = $s.length;
	this.b[this.b.length] = x;
	$s.pop();
}
StringBuf.prototype.addChar = function(c) {
	$s.push("StringBuf::addChar");
	var $spos = $s.length;
	this.b[this.b.length] = String.fromCharCode(c);
	$s.pop();
}
StringBuf.prototype.addSub = function(s,pos,len) {
	$s.push("StringBuf::addSub");
	var $spos = $s.length;
	this.b[this.b.length] = s.substr(pos,len);
	$s.pop();
}
StringBuf.prototype.b = null;
StringBuf.prototype.toString = function() {
	$s.push("StringBuf::toString");
	var $spos = $s.length;
	{
		var $tmp = this.b.join("");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
StringBuf.prototype.__class__ = StringBuf;
if(typeof haxe=='undefined') haxe = {}
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	$s.push("haxe.Log::trace");
	var $spos = $s.length;
	js.Boot.__trace(v,infos);
	$s.pop();
}
haxe.Log.clear = function() {
	$s.push("haxe.Log::clear");
	var $spos = $s.length;
	js.Boot.__clear_trace();
	$s.pop();
}
haxe.Log.prototype.__class__ = haxe.Log;
Hash = function(p) { if( p === $_ ) return; {
	$s.push("Hash::new");
	var $spos = $s.length;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
	$s.pop();
}}
Hash.__name__ = ["Hash"];
Hash.prototype.exists = function(key) {
	$s.push("Hash::exists");
	var $spos = $s.length;
	try {
		key = "$" + key;
		{
			var $tmp = this.hasOwnProperty.call(this.h,key);
			$s.pop();
			return $tmp;
		}
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				
				for(var i in this.h)
					if( i == key ) return true;
			;
				{
					$s.pop();
					return false;
				}
			}
		}
	}
	$s.pop();
}
Hash.prototype.get = function(key) {
	$s.push("Hash::get");
	var $spos = $s.length;
	{
		var $tmp = this.h["$" + key];
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Hash.prototype.h = null;
Hash.prototype.iterator = function() {
	$s.push("Hash::iterator");
	var $spos = $s.length;
	{
		var $tmp = { ref : this.h, it : this.keys(), hasNext : function() {
			$s.push("Hash::iterator@81");
			var $spos = $s.length;
			{
				var $tmp = this.it.hasNext();
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}, next : function() {
			$s.push("Hash::iterator@82");
			var $spos = $s.length;
			var i = this.it.next();
			{
				var $tmp = this.ref["$" + i];
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}}
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Hash.prototype.keys = function() {
	$s.push("Hash::keys");
	var $spos = $s.length;
	var a = new Array();
	
			for(var i in this.h)
				a.push(i.substr(1));
		;
	{
		var $tmp = a.iterator();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Hash.prototype.remove = function(key) {
	$s.push("Hash::remove");
	var $spos = $s.length;
	if(!this.exists(key)) {
		$s.pop();
		return false;
	}
	delete(this.h["$" + key]);
	{
		$s.pop();
		return true;
	}
	$s.pop();
}
Hash.prototype.set = function(key,value) {
	$s.push("Hash::set");
	var $spos = $s.length;
	this.h["$" + key] = value;
	$s.pop();
}
Hash.prototype.toString = function() {
	$s.push("Hash::toString");
	var $spos = $s.length;
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	{ var $it0 = it;
	while( $it0.hasNext() ) { var i = $it0.next();
	{
		s.b[s.b.length] = i;
		s.b[s.b.length] = " => ";
		s.b[s.b.length] = Std.string(this.get(i));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	}}
	s.b[s.b.length] = "}";
	{
		var $tmp = s.b.join("");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Hash.prototype.__class__ = Hash;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	$s.push("Std::is");
	var $spos = $s.length;
	{
		var $tmp = js.Boot.__instanceof(v,t);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Std.string = function(s) {
	$s.push("Std::string");
	var $spos = $s.length;
	{
		var $tmp = js.Boot.__string_rec(s,"");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Std["int"] = function(x) {
	$s.push("Std::int");
	var $spos = $s.length;
	if(x < 0) {
		var $tmp = Math.ceil(x);
		$s.pop();
		return $tmp;
	}
	{
		var $tmp = Math.floor(x);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Std.parseInt = function(x) {
	$s.push("Std::parseInt");
	var $spos = $s.length;
	var v = parseInt(x);
	if(Math.isNaN(v)) {
		$s.pop();
		return null;
	}
	{
		var $tmp = v;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Std.parseFloat = function(x) {
	$s.push("Std::parseFloat");
	var $spos = $s.length;
	{
		var $tmp = parseFloat(x);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Std.random = function(x) {
	$s.push("Std::random");
	var $spos = $s.length;
	{
		var $tmp = Math.floor(Math.random() * x);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Std.prototype.__class__ = Std;
Main = function() { }
Main.__name__ = ["Main"];
Main.main = function() {
	$s.push("Main::main");
	var $spos = $s.length;
	new touchmypixel.game.LayoutWriter();
	$s.pop();
}
Main.prototype.__class__ = Main;
if(!touchmypixel.game.utils) touchmypixel.game.utils = {}
touchmypixel.game.utils.JSFLTools = function() { }
touchmypixel.game.utils.JSFLTools.__name__ = ["touchmypixel","game","utils","JSFLTools"];
touchmypixel.game.utils.JSFLTools.isShape = function(el) {
	$s.push("touchmypixel.game.utils.JSFLTools::isShape");
	var $spos = $s.length;
	{
		var $tmp = el.elementType == "shape";
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
touchmypixel.game.utils.JSFLTools.isInstance = function(el) {
	$s.push("touchmypixel.game.utils.JSFLTools::isInstance");
	var $spos = $s.length;
	{
		var $tmp = el.elementType == "instance";
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
touchmypixel.game.utils.JSFLTools.isBitmap = function(el) {
	$s.push("touchmypixel.game.utils.JSFLTools::isBitmap");
	var $spos = $s.length;
	if(!touchmypixel.game.utils.JSFLTools.isInstance(el)) {
		$s.pop();
		return false;
	}
	{
		var $tmp = el.libraryItem.itemType == "bitmap";
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
touchmypixel.game.utils.JSFLTools.isComponent = function(el) {
	$s.push("touchmypixel.game.utils.JSFLTools::isComponent");
	var $spos = $s.length;
	if(!touchmypixel.game.utils.JSFLTools.isInstance(el)) {
		$s.pop();
		return false;
	}
	var c = el;
	var isComponent = c.libraryItem.itemType == "component";
	if(isComponent && (el.parameters) == null) throw ((("COMPONENT DIRTY: You need to refresh " + c.name) + " [") + c.libraryItem.name) + "]";
	{
		$s.pop();
		return isComponent;
	}
	$s.pop();
}
touchmypixel.game.utils.JSFLTools.getChildren = function(timeline,includeGuideLayers) {
	$s.push("touchmypixel.game.utils.JSFLTools::getChildren");
	var $spos = $s.length;
	if(includeGuideLayers == null) includeGuideLayers = false;
	if(timeline == null) {
		var $tmp = [];
		$s.pop();
		return $tmp;
	}
	var els = new Array();
	var i = timeline.layers.length - 1;
	while(i >= 0) {
		var l = timeline.layers[i];
		if(l.layerType != "guide" || includeGuideLayers) {
			var f = l.frames[0];
			{
				var _g = 0, _g1 = f.elements;
				while(_g < _g1.length) {
					var el = _g1[_g];
					++_g;
					els.unshift(el);
				}
			}
		}
		i--;
	}
	{
		$s.pop();
		return els;
	}
	$s.pop();
}
touchmypixel.game.utils.JSFLTools.getTimeline = function(symbol) {
	$s.push("touchmypixel.game.utils.JSFLTools::getTimeline");
	var $spos = $s.length;
	{
		var $tmp = symbol.libraryItem.timeline;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
touchmypixel.game.utils.JSFLTools.getInstanceChildren = function(symbol) {
	$s.push("touchmypixel.game.utils.JSFLTools::getInstanceChildren");
	var $spos = $s.length;
	{
		var $tmp = touchmypixel.game.utils.JSFLTools.getChildren(touchmypixel.game.utils.JSFLTools.getTimeline(symbol));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
touchmypixel.game.utils.JSFLTools.getDefinitionValues = function(el) {
	$s.push("touchmypixel.game.utils.JSFLTools::getDefinitionValues");
	var $spos = $s.length;
	if(el == null) {
		$s.pop();
		return null;
	}
	var def = new Hash();
	if(!touchmypixel.game.utils.JSFLTools.isComponent(el)) {
		$s.pop();
		return null;
	}
	var el1 = el;
	{
		var _g = 0, _g1 = el1.parameters;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			def.set(p.name,p.value);
		}
	}
	{
		$s.pop();
		return def;
	}
	$s.pop();
}
touchmypixel.game.utils.JSFLTools.prototype.__class__ = touchmypixel.game.utils.JSFLTools;
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	$s.push("js.Lib::alert");
	var $spos = $s.length;
	alert(js.Boot.__string_rec(v,""));
	$s.pop();
}
js.Lib.eval = function(code) {
	$s.push("js.Lib::eval");
	var $spos = $s.length;
	{
		var $tmp = eval(code);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
js.Lib.setErrorHandler = function(f) {
	$s.push("js.Lib::setErrorHandler");
	var $spos = $s.length;
	js.Lib.onerror = f;
	$s.pop();
}
js.Lib.prototype.__class__ = js.Lib;
StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	$s.push("StringTools::urlEncode");
	var $spos = $s.length;
	{
		var $tmp = encodeURIComponent(s);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
StringTools.urlDecode = function(s) {
	$s.push("StringTools::urlDecode");
	var $spos = $s.length;
	{
		var $tmp = decodeURIComponent(s.split("+").join(" "));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
StringTools.htmlEscape = function(s) {
	$s.push("StringTools::htmlEscape");
	var $spos = $s.length;
	{
		var $tmp = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
StringTools.htmlUnescape = function(s) {
	$s.push("StringTools::htmlUnescape");
	var $spos = $s.length;
	{
		var $tmp = s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
StringTools.startsWith = function(s,start) {
	$s.push("StringTools::startsWith");
	var $spos = $s.length;
	{
		var $tmp = (s.length >= start.length && s.substr(0,start.length) == start);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
StringTools.endsWith = function(s,end) {
	$s.push("StringTools::endsWith");
	var $spos = $s.length;
	var elen = end.length;
	var slen = s.length;
	{
		var $tmp = (slen >= elen && s.substr(slen - elen,elen) == end);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
StringTools.isSpace = function(s,pos) {
	$s.push("StringTools::isSpace");
	var $spos = $s.length;
	var c = s.charCodeAt(pos);
	{
		var $tmp = (c >= 9 && c <= 13) || c == 32;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
StringTools.ltrim = function(s) {
	$s.push("StringTools::ltrim");
	var $spos = $s.length;
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) {
		r++;
	}
	if(r > 0) {
		var $tmp = s.substr(r,l - r);
		$s.pop();
		return $tmp;
	}
	else {
		$s.pop();
		return s;
	}
	$s.pop();
}
StringTools.rtrim = function(s) {
	$s.push("StringTools::rtrim");
	var $spos = $s.length;
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,(l - r) - 1)) {
		r++;
	}
	if(r > 0) {
		{
			var $tmp = s.substr(0,l - r);
			$s.pop();
			return $tmp;
		}
	}
	else {
		{
			$s.pop();
			return s;
		}
	}
	$s.pop();
}
StringTools.trim = function(s) {
	$s.push("StringTools::trim");
	var $spos = $s.length;
	{
		var $tmp = StringTools.ltrim(StringTools.rtrim(s));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
StringTools.rpad = function(s,c,l) {
	$s.push("StringTools::rpad");
	var $spos = $s.length;
	var sl = s.length;
	var cl = c.length;
	while(sl < l) {
		if(l - sl < cl) {
			s += c.substr(0,l - sl);
			sl = l;
		}
		else {
			s += c;
			sl += cl;
		}
	}
	{
		$s.pop();
		return s;
	}
	$s.pop();
}
StringTools.lpad = function(s,c,l) {
	$s.push("StringTools::lpad");
	var $spos = $s.length;
	var ns = "";
	var sl = s.length;
	if(sl >= l) {
		$s.pop();
		return s;
	}
	var cl = c.length;
	while(sl < l) {
		if(l - sl < cl) {
			ns += c.substr(0,l - sl);
			sl = l;
		}
		else {
			ns += c;
			sl += cl;
		}
	}
	{
		var $tmp = ns + s;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
StringTools.replace = function(s,sub,by) {
	$s.push("StringTools::replace");
	var $spos = $s.length;
	{
		var $tmp = s.split(sub).join(by);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
StringTools.hex = function(n,digits) {
	$s.push("StringTools::hex");
	var $spos = $s.length;
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	{
		$s.pop();
		return s;
	}
	$s.pop();
}
StringTools.prototype.__class__ = StringTools;
$Main = function() { }
$Main.__name__ = ["@Main"];
$Main.prototype.__class__ = $Main;
$_ = {}
js.Boot.__res = {}
$s = [];
$e = [];
js.Boot.__init();
{
	{
		
			
			var jsfl = {
				ActionsPanel:ActionsPanel,
				CompilerErrors:CompilerErrors,
				Contour:Contour,
				Document:Document,
				Edge:Edge,
				HalfEdge:HalfEdge,
				Library:Library,
				OutputPanel:OutputPanel,
				Path:Path,
				//Depreciated classes Project, ProjectItem
				TextRun:TextRun,
				Tools:Tools,
				Vertex:Vertex,
				XMLUI:XMLUI,
				Fl:fl,
				FLfile:FLfile
			}
			;
	}
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		$s.push("@Main::new@69");
		var $spos = $s.length;
		{
			var $tmp = isFinite(i);
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	Math.isNaN = function(i) {
		$s.push("@Main::new@81");
		var $spos = $s.length;
		{
			var $tmp = isNaN(i);
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]}
	Dynamic = { __name__ : ["Dynamic"]}
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]}
	Class = { __name__ : ["Class"]}
	Enum = { }
	Void = { __ename__ : ["Void"]}
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var stack = $s.copy();
		var f = js.Lib.onerror;
		$s.splice(0,$s.length);
		if( f == null ) {
			var i = stack.length;
			var s = "";
			while( --i >= 0 )
				s += "Called from "+stack[i]+"\n";
			alert(msg+"\n\n"+s);
			return false;
		}
		return f(msg,stack);
	}
}
{
	var d = Date;
	d.now = function() {
		$s.push("@Main::new@117");
		var $spos = $s.length;
		{
			var $tmp = new Date();
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	d.fromTime = function(t) {
		$s.push("@Main::new@120");
		var $spos = $s.length;
		var d1 = new Date();
		d1["setTime"](t);
		{
			$s.pop();
			return d1;
		}
		$s.pop();
	}
	d.fromString = function(s) {
		$s.push("@Main::new@129");
		var $spos = $s.length;
		switch(s.length) {
		case 8:{
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			{
				$s.pop();
				return d1;
			}
		}break;
		case 10:{
			var k = s.split("-");
			{
				var $tmp = new Date(k[0],k[1] - 1,k[2],0,0,0);
				$s.pop();
				return $tmp;
			}
		}break;
		case 19:{
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			{
				var $tmp = new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
				$s.pop();
				return $tmp;
			}
		}break;
		default:{
			throw "Invalid date format : " + s;
		}break;
		}
		$s.pop();
	}
	d.prototype["toString"] = function() {
		$s.push("@Main::new@158");
		var $spos = $s.length;
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		{
			var $tmp = (((((((((date.getFullYear() + "-") + ((m < 10?"0" + m:"" + m))) + "-") + ((d1 < 10?"0" + d1:"" + d1))) + " ") + ((h < 10?"0" + h:"" + h))) + ":") + ((mi < 10?"0" + mi:"" + mi))) + ":") + ((s < 10?"0" + s:"" + s));
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
js.Lib.onerror = null;
$Main.init = Main.main();
