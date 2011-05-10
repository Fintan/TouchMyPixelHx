$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof touchmypixel=='undefined') touchmypixel = {}
if(!touchmypixel.geom) touchmypixel.geom = {}
touchmypixel.geom.Triangle = function(x1,y1,x2,y2,x3,y3) {
	if( x1 === $_ ) return;
	this.x = new Array();
	this.y = new Array();
	var dx1 = x2 - x1;
	var dx2 = x3 - x1;
	var dy1 = y2 - y1;
	var dy2 = y3 - y1;
	var cross = dx1 * dy2 - dx2 * dy1;
	var ccw = cross > 0;
	if(ccw) {
		this.x[0] = x1;
		this.x[1] = x2;
		this.x[2] = x3;
		this.y[0] = y1;
		this.y[1] = y2;
		this.y[2] = y3;
	} else {
		this.x[0] = x1;
		this.x[1] = x3;
		this.x[2] = x2;
		this.y[0] = y1;
		this.y[1] = y3;
		this.y[2] = y2;
	}
}
touchmypixel.geom.Triangle.__name__ = ["touchmypixel","geom","Triangle"];
touchmypixel.geom.Triangle.prototype.x = null;
touchmypixel.geom.Triangle.prototype.y = null;
touchmypixel.geom.Triangle.prototype.isInside = function(px,py) {
	var vx2 = px - this.x[0];
	var vy2 = py - this.y[0];
	var vx1 = this.x[1] - this.x[0];
	var vy1 = this.y[1] - this.y[0];
	var vx0 = this.x[2] - this.x[0];
	var vy0 = this.y[2] - this.y[0];
	var dot00 = vx0 * vx0 + vy0 + vy0;
	var dot01 = vx0 * vx1 + vy0 * vy1;
	var dot02 = vx0 * vx2 + vy0 * vy2;
	var dot11 = vx1 * vx1 + vy1 * vy1;
	var dot12 = vx1 * vx2 + vy1 * vy2;
	var invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
	var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
	var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
	return u > 0 && v > 0 && u + v < 1;
}
touchmypixel.geom.Triangle.prototype.__class__ = touchmypixel.geom.Triangle;
touchmypixel.geom.Polygon = function(_x,_y) {
	if( _x === $_ ) return;
	this.x = new Array();
	this.y = new Array();
	this.nVertices = _x.length;
	var _g1 = 0, _g = this.nVertices;
	while(_g1 < _g) {
		var i = _g1++;
		this.x[i] = _x[i];
		this.y[i] = _y[i];
	}
}
touchmypixel.geom.Polygon.__name__ = ["touchmypixel","geom","Polygon"];
touchmypixel.geom.Polygon.prototype.nVertices = null;
touchmypixel.geom.Polygon.prototype.x = null;
touchmypixel.geom.Polygon.prototype.y = null;
touchmypixel.geom.Polygon.prototype.set = function(p) {
	this.nVertices = p.nVertices;
	this.x = new Array();
	this.y = new Array();
	var i = 0;
	var _g1 = 0, _g = this.nVertices;
	while(_g1 < _g) {
		var i1 = _g1++;
		this.x[i1] = p.x[i1];
		this.y[i1] = p.y[i1];
	}
}
touchmypixel.geom.Polygon.prototype.isConvex = function() {
	var isPositive = false;
	var _g1 = 0, _g = this.nVertices;
	while(_g1 < _g) {
		var i = _g1++;
		var lower = i == 0?this.nVertices - 1:i - 1;
		var middle = i;
		var upper = i == this.nVertices - 1?0:i + 1;
		var dx0 = this.x[middle] - this.x[lower];
		var dy0 = this.y[middle] - this.y[lower];
		var dx1 = this.x[upper] - this.x[middle];
		var dy1 = this.y[upper] - this.y[middle];
		var cross = dx0 * dy1 - dx1 * dy0;
		var newIsP = cross > 0;
		if(i == 0) isPositive = newIsP; else if(isPositive != newIsP) return false;
	}
	return true;
}
touchmypixel.geom.Polygon.prototype.add = function(t) {
	var firstP = -1;
	var firstT = -1;
	var secondP = -1;
	var secondT = -1;
	var _g1 = 0, _g = this.nVertices;
	while(_g1 < _g) {
		var i = _g1++;
		if(t.x[0] == this.x[i] && t.y[0] == this.y[i]) {
			if(firstP == -1) {
				firstP = i;
				firstT = 0;
			} else {
				secondP = i;
				secondT = 0;
			}
		} else if(t.x[1] == this.x[i] && t.y[1] == this.y[i]) {
			if(firstP == -1) {
				firstP = i;
				firstT = 1;
			} else {
				secondP = i;
				secondT = 1;
			}
		} else if(t.x[2] == this.x[i] && t.y[2] == this.y[i]) {
			if(firstP == -1) {
				firstP = i;
				firstT = 2;
			} else {
				secondP = i;
				secondT = 2;
			}
		} else {
		}
	}
	if(firstP == 0 && secondP == this.nVertices - 1) {
		firstP = this.nVertices - 1;
		secondP = 0;
	}
	if(secondP == -1) return null;
	var tipT = 0;
	if(tipT == firstT || tipT == secondT) tipT = 1;
	if(tipT == firstT || tipT == secondT) tipT = 2;
	var newx = new Array();
	var newy = new Array();
	var currOut = 0;
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
	return new touchmypixel.geom.Polygon(newx,newy);
}
touchmypixel.geom.Polygon.prototype.__class__ = touchmypixel.geom.Polygon;
touchmypixel.geom.Triangulator = function() { }
touchmypixel.geom.Triangulator.__name__ = ["touchmypixel","geom","Triangulator"];
touchmypixel.geom.Triangulator.triangulate = function(vertices) {
	var xA = new Array();
	var yA = new Array();
	var _g = 0;
	while(_g < vertices.length) {
		var v = vertices[_g];
		++_g;
		xA.push(v.x);
		yA.push(v.y);
	}
	return touchmypixel.geom.Triangulator.triangulateFromFlatArray(xA,yA);
}
touchmypixel.geom.Triangulator.triangulateFromFlatArray = function(vx,vy) {
	if(vx.length < 3 || vy.length < 3 || vx.length != vy.length) {
		throw "Plase make sure both arrays are of the same length and have at least 3 vertices in them!";
		return null;
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
			return null;
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
		var under = earIndex == 0?xrem.length - 1:earIndex - 1;
		var over = earIndex == xrem.length - 1?0:earIndex + 1;
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
	return res;
}
touchmypixel.geom.Triangulator.polygonizeTriangles = function(triangulated) {
	var polys = null;
	var polyIndex = 0;
	if(triangulated == null) return null; else {
		polys = new Array();
		var covered = new Array();
		var _g1 = 0, _g = triangulated.length;
		while(_g1 < _g) {
			var i = _g1++;
			covered[i] = false;
		}
		var notDone = true;
		while(notDone) {
			var currTri = -1;
			var _g1 = 0, _g = triangulated.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(covered[i]) continue;
				currTri = i;
				break;
			}
			var poly = null;
			if(currTri == -1) {
				notDone = false;
				continue;
			} else {
				poly = new touchmypixel.geom.Polygon(triangulated[currTri].x,triangulated[currTri].y);
				covered[currTri] = true;
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
			polys[polyIndex] = poly;
			polyIndex++;
		}
	}
	var ret = new Array();
	var _g = 0;
	while(_g < polyIndex) {
		var i = _g++;
		ret[i] = polys[i];
	}
	return ret;
}
touchmypixel.geom.Triangulator.isEar = function(i,vx,vy) {
	if(i >= vx.length || i < 0 || vx.length < 3) return false;
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
	} else if(i == vx.length - 1) {
		dx0 = vx[i] - vx[i - 1];
		dy0 = vy[i] - vy[i - 1];
		dx1 = vx[0] - vx[i];
		dy1 = vy[0] - vy[i];
		upper = 0;
	} else {
		dx0 = vx[i] - vx[i - 1];
		dy0 = vy[i] - vy[i - 1];
		dx1 = vx[i + 1] - vx[i];
		dy1 = vy[i + 1] - vy[i];
	}
	var cross = dx0 * dy1 - dx1 * dy0;
	if(cross > 0) return false;
	var myTri = new touchmypixel.geom.Triangle(vx[i],vy[i],vx[upper],vy[upper],vx[lower],vy[lower]);
	var j = 0;
	while(j < vx.length) {
		if(!(j == i || j == lower || j == upper)) {
			if(myTri.isInside(vx[j],vy[j])) return false;
		}
		j++;
	}
	return true;
}
touchmypixel.geom.Triangulator.isWindingDirectionCCW = function(vertices) {
	var count = 0;
	var n = vertices.length;
	if(n < 3) return null;
	var i = 0;
	while(i < n) {
		var j = (i + 1) % n;
		var k = (i + 2) % n;
		var z = (vertices[j].x - vertices[i].x) * (vertices[k].y - vertices[j].y);
		z -= (vertices[j].y - vertices[i].y) * (vertices[k].x - vertices[j].x);
		if(z < 0) count--; else if(z > 0) count++;
		i++;
	}
	if(count > 0) return false; else if(count < 0) return true; else return null;
}
touchmypixel.geom.Triangulator.prototype.__class__ = touchmypixel.geom.Triangulator;
IntIter = function(min,max) {
	if( min === $_ ) return;
	this.min = min;
	this.max = max;
}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
if(typeof js=='undefined') js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
		var msg = (i != null?((i.fileName + ":") + i.lineNumber) + ": ":"");
		msg += js.Boot.__string_rec(v,"");
		fl.trace(msg);
	}
	js.Boot.__clear_trace = function() {
		fl.outputPanel.clear();
	}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	};
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return null;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
if(typeof fboyle=='undefined') fboyle = {}
if(!fboyle.layout) fboyle.layout = {}
fboyle.layout.FlaBox2dLayoutExport = function(p) {
	if( p === $_ ) return;
	this.doc = jsfl.Fl.getDocumentDOM();
	this.lib = this.doc.library;
	this.root = this.doc.timelines[0];
	jsfl.Fl.outputPanel.clear();
	var results = this.searchTimeline(this.root);
	var xml = this.parseResults(results);
	haxe.Log.trace(xml,{ fileName : "FlaBox2dLayoutExport.hx", lineNumber : 77, className : "fboyle.layout.FlaBox2dLayoutExport", methodName : "new"});
	this.saveXml(xml);
}
fboyle.layout.FlaBox2dLayoutExport.__name__ = ["fboyle","layout","FlaBox2dLayoutExport"];
fboyle.layout.FlaBox2dLayoutExport.prototype.doc = null;
fboyle.layout.FlaBox2dLayoutExport.prototype.lib = null;
fboyle.layout.FlaBox2dLayoutExport.prototype.root = null;
fboyle.layout.FlaBox2dLayoutExport.prototype.parseResults = function(results) {
	var xml = "";
	var _g = 0;
	while(_g < results.length) {
		var r = results[_g];
		++_g;
		xml += (function($this) {
			var $r;
			switch(r.type) {
			case "layout":
				$r = $this.parseLayout(r);
				break;
			case "bitmap":
				$r = $this.parseBitmap(r);
				break;
			case "movieclip":
				$r = $this.parseMovieClip(r);
				break;
			case "body":
				$r = $this.parseBody(r);
				break;
			case "gameObject":
				$r = $this.parseGameObject(r);
				break;
			case "empty":
				$r = $this.parseEmpty(r);
				break;
			}
			return $r;
		}(this));
	}
	return xml;
}
fboyle.layout.FlaBox2dLayoutExport.prototype.parseParameters = function(result) {
	var sc = result.scope;
	var xml = "";
	xml += " name=\"" + sc.name + "\"";
	xml += " x=\"" + sc.x + "\"";
	xml += " y=\"" + sc.y + "\"";
	xml += " sx=\"" + sc.scaleX + "\"";
	xml += " sy=\"" + sc.scaleY + "\"";
	xml += " r=\"" + sc.rotation + "\"";
	if(touchmypixel.game.utils.JSFLTools.isComponent(result.info)) {
		var def = touchmypixel.game.utils.JSFLTools.getDefinitionValues(result.info);
		var $it0 = def.keys();
		while( $it0.hasNext() ) {
			var v = $it0.next();
			xml += " " + v + "=\"" + def.get(v) + "\"";
		}
	}
	return xml;
}
fboyle.layout.FlaBox2dLayoutExport.prototype.parseLayout = function(result) {
	var xml = "<layout" + this.parseParameters(result);
	xml += " w=\"" + result.scope.width + "\" h=\"" + result.scope.height + "\"";
	xml += ">\n";
	xml += this.parseResults(result.children);
	xml += "</layout>\n";
	return xml;
}
fboyle.layout.FlaBox2dLayoutExport.prototype.parseGameObject = function(result) {
	var xml = "<gameObject " + this.parseParameters(result) + ">\n";
	xml += this.parseResults(result.children);
	xml += "</gameObject>\n";
	return xml;
}
fboyle.layout.FlaBox2dLayoutExport.prototype.parseBody = function(result) {
	var xml = "<body " + this.parseParameters(result) + ">\n";
	xml += this.parseElements(result.scope);
	xml += this.parseResults(result.children);
	xml += "</body>\n";
	return xml;
}
fboyle.layout.FlaBox2dLayoutExport.prototype.parseEmpty = function(result) {
	var sc = result.scope;
	var xml = "<empty";
	xml += " name=\"" + sc.name + "\"";
	xml += " x=\"" + sc.x + "\"";
	xml += " y=\"" + sc.y + "\"";
	if(touchmypixel.game.utils.JSFLTools.isComponent(result.info)) {
		var def = touchmypixel.game.utils.JSFLTools.getDefinitionValues(result.info);
		var $it0 = def.keys();
		while( $it0.hasNext() ) {
			var v = $it0.next();
			xml += " " + v + "=\"" + def.get(v) + "\"";
		}
	}
	xml += "/>\n";
	return xml;
}
fboyle.layout.FlaBox2dLayoutExport.prototype.parseMovieClipParameters = function(result) {
	var sc = result.scope;
	var xml = "";
	xml += " name=\"" + sc.name + "\"";
	xml += " x=\"" + sc.x + "\"";
	xml += " y=\"" + sc.y + "\"";
	xml += " r=\"" + sc.rotation + "\"";
	if(touchmypixel.game.utils.JSFLTools.isComponent(result.info)) {
		var def = touchmypixel.game.utils.JSFLTools.getDefinitionValues(result.info);
		var $it0 = def.keys();
		while( $it0.hasNext() ) {
			var v = $it0.next();
			xml += " " + v + "=\"" + def.get(v) + "\"";
		}
	}
	return xml;
}
fboyle.layout.FlaBox2dLayoutExport.prototype.parseMovieClip = function(result) {
	var linkageId = result.scope.libraryItem.linkageClassName;
	var xml = "<movieclip";
	var sc = result.scope;
	xml += " name=\"" + sc.name + "\"";
	var childname = "none";
	var spritesheet = "none";
	var sheetindicies = [];
	var frameWidth = "60";
	var frameHeight = "60";
	var def = touchmypixel.game.utils.JSFLTools.getDefinitionValues(result.info);
	var $it0 = def.keys();
	while( $it0.hasNext() ) {
		var v = $it0.next();
		switch(v) {
		case "child":
			childname = def.get(v);
			break;
		case "spritesheet":
			spritesheet = def.get(v);
			break;
		case "frameWidth":
			frameWidth = def.get(v);
			break;
		case "frameHeight":
			frameHeight = def.get(v);
			break;
		case "sheetindicies":
			var arr = (function($this) {
				var $r;
				var $t = def.get(v);
				if(Std["is"]($t,Array)) $t; else throw "Class cast error";
				$r = $t;
				return $r;
			}(this));
			var _g1 = 0, _g = arr.length;
			while(_g1 < _g) {
				var i = _g1++;
				sheetindicies[i] = arr[i].value;
			}
			break;
		}
	}
	var _g = 0, _g1 = touchmypixel.game.utils.JSFLTools.getChildren(touchmypixel.game.utils.JSFLTools.getTimeline(result.scope));
	while(_g < _g1.length) {
		var r = _g1[_g];
		++_g;
		if(r.elementType == "instance") {
			var el = r;
			var linkageId1 = el.libraryItem.linkageClassName;
			var def1 = touchmypixel.game.utils.JSFLTools.getDefinitionValues(result.info);
			if(r.name == childname) {
				xml += " linkageId=\"" + linkageId1 + "\"";
				xml += " x=\"" + (sc.x + r.x) + "\"";
				xml += " y=\"" + (sc.y + r.y) + "\"";
				xml += " file=\"" + spritesheet + "\"";
				xml += " sheetindicies=\"" + sheetindicies + "\"";
				xml += " frameWidth=\"" + frameWidth + "\"";
				xml += " frameHeight=\"" + frameHeight + "\"";
				xml += " r=\"" + (sc.rotation + r.rotation) + "\"";
				xml += " sx=\"" + r.scaleX * sc.scaleX + "\"";
				xml += " sy=\"" + r.scaleY * sc.scaleY + "\"";
				break;
			}
		}
	}
	xml += ">\n";
	xml += "</movieclip>\n";
	return xml;
}
fboyle.layout.FlaBox2dLayoutExport.prototype.parseBitmap = function(result) {
	var linkageID;
	var itemName = StringTools.replace(result.scope.libraryItem.name,"-","/");
	if(result.scope.libraryItem.linkageClassName == null) {
		haxe.Log.trace("Warning: " + result.scope.libraryItem.name + " has no linkage id",{ fileName : "FlaBox2dLayoutExport.hx", lineNumber : 353, className : "fboyle.layout.FlaBox2dLayoutExport", methodName : "parseBitmap"});
		linkageID = itemName;
	} else linkageID = StringTools.replace(result.scope.libraryItem.linkageClassName,"-","/");
	var xml = "<bitmap " + this.parseParameters(result) + " file=\"" + itemName + "\" linkage=\"" + linkageID + "\" />\n";
	return xml;
}
fboyle.layout.FlaBox2dLayoutExport.prototype.parseShape = function(result) {
	var xml = "<shape " + this.parseParameters(result) + ">\n";
	xml += "</shape>\n";
	return xml;
}
fboyle.layout.FlaBox2dLayoutExport.prototype.parseElements = function(scope) {
	var xml = "";
	var _g = 0, _g1 = touchmypixel.game.utils.JSFLTools.getChildren(touchmypixel.game.utils.JSFLTools.getTimeline(scope));
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		if(touchmypixel.game.utils.JSFLTools.isShape(child)) {
			var s = child;
			if(s.isRectangleObject) xml += this.parseElementRect(child); else if(s.isOvalObject) xml += this.parseElementCircle(child); else xml += this.parseElementPoly(child,scope);
		}
	}
	return xml;
}
fboyle.layout.FlaBox2dLayoutExport.prototype.parseElementCircle = function(s) {
	var xml = "\t<circle x=\"" + s.x + "\" y=\"" + s.y + "\" w=\"" + s.width + "\"  h=\"" + s.height + "\" r=\"" + s.rotation + "\" sx=\"" + s.scaleX + "\" sy=\"" + s.scaleY + "\" />\n";
	return xml;
}
fboyle.layout.FlaBox2dLayoutExport.prototype.parseElementRect = function(s) {
	var xml = this.parseElementPoly(s,null);
	return xml;
}
fboyle.layout.FlaBox2dLayoutExport.prototype.parseElementPoly = function(s,scope) {
	var xml = "";
	var points = new Array();
	var lastPoint = null;
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
		} else {
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
	if(s.isGroup) {
		if(points.length == 0) throw "No points for bounding box";
		var left = points[0].x;
		var top = points[0].y;
		var right = points[0].x;
		var bottom = points[0].y;
		var _g1 = 1, _g = points.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(points[i].x < left) left = points[i].x;
			if(points[i].x > right) right = points[i].x;
			if(points[i].y < top) top = points[i].y;
			if(points[i].y > bottom) bottom = points[i].y;
		}
		var cx = (right + left) / 2;
		var cy = (bottom + top) / 2;
		var _g1 = 0, _g = points.length;
		while(_g1 < _g) {
			var i = _g1++;
			points[i].x -= cx;
			points[i].y -= cy;
		}
	}
	if(!touchmypixel.geom.Triangulator.isWindingDirectionCCW(points)) points.reverse();
	if(lastPoint.x != points[0].x || lastPoint.y != points[0].y) haxe.Log.trace("WARNING: shape not closed: " + scope.name + " [" + scope.libraryItem.linkageClassName + "]",{ fileName : "FlaBox2dLayoutExport.hx", lineNumber : 514, className : "fboyle.layout.FlaBox2dLayoutExport", methodName : "parseElementPoly"}); else points.pop();
	var triangles = touchmypixel.geom.Triangulator.triangulate(points);
	var polys = touchmypixel.geom.Triangulator.polygonizeTriangles(triangles);
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
			xml += "\t<poly x=\"" + sx + "\" y=\"" + sy + "\" w=\"" + sw + "\"  h=\"" + sh + "\" r=\"" + s.rotation + "\" sx=\"" + s.scaleX + "\" sy=\"" + s.scaleY + "\">\n";
		} else xml += "\t<poly x=\"0\" y=\"0\" r=\"0\" sx=\"1\" sy=\"1\" >\n";
		var _g2 = 0, _g1 = p.nVertices;
		while(_g2 < _g1) {
			var i = _g2++;
			xml += "\t\t<vert x=\"" + p.x[i] + "\" y=\"" + p.y[i] + "\" />\n";
		}
		xml += "\t</poly>\n";
	}
	return xml;
}
fboyle.layout.FlaBox2dLayoutExport.prototype.searchTimeline = function(inScope,store) {
	var results = [];
	var _g = 0, _g1 = touchmypixel.game.utils.JSFLTools.getChildren(inScope);
	while(_g < _g1.length) {
		var el = _g1[_g];
		++_g;
		if(touchmypixel.game.utils.JSFLTools.isInstance(el)) {
			var el1 = el;
			var _g2 = 0, _g3 = touchmypixel.game.utils.JSFLTools.getChildren(touchmypixel.game.utils.JSFLTools.getTimeline(el1));
			while(_g2 < _g3.length) {
				var el2 = _g3[_g2];
				++_g2;
				var el21 = el2;
				if(touchmypixel.game.utils.JSFLTools.isComponent(el21)) switch(el21.libraryItem.linkageClassName) {
				case "Def_Layout":
					results.unshift({ type : "layout", info : el21, scope : el1, children : this.searchTimeline(touchmypixel.game.utils.JSFLTools.getTimeline(el1))});
					break;
				case "Def_MovieClip":
					results.unshift({ type : "movieclip", info : el21, scope : el1, children : this.searchTimeline(touchmypixel.game.utils.JSFLTools.getTimeline(el1))});
					break;
				case "Def_Body":
					results.unshift({ type : "body", info : el21, scope : el1, children : this.searchTimeline(touchmypixel.game.utils.JSFLTools.getTimeline(el1))});
					break;
				case "Def_GameObject":
					results.unshift({ type : "gameObject", info : el21, scope : el1, children : this.searchTimeline(touchmypixel.game.utils.JSFLTools.getTimeline(el1))});
					break;
				case "Def_Empty":
					results.unshift({ type : "empty", info : el21, scope : el1, children : null});
					break;
				}
			}
			if(touchmypixel.game.utils.JSFLTools.isBitmap(el1)) results.unshift({ type : "bitmap", info : el1, scope : el1, children : null}); else if(touchmypixel.game.utils.JSFLTools.isShape(el1)) {
			}
		}
	}
	return results;
}
fboyle.layout.FlaBox2dLayoutExport.prototype.saveXml = function(xml) {
	var path = this.doc.pathURI;
	path = path.substr(0,path.lastIndexOf("."));
	path += ".xml";
	haxe.Log.trace("EXPORTED: " + path,{ fileName : "FlaBox2dLayoutExport.hx", lineNumber : 633, className : "fboyle.layout.FlaBox2dLayoutExport", methodName : "saveXml"});
	jsfl.FLfile.write(path,xml);
}
fboyle.layout.FlaBox2dLayoutExport.prototype.__class__ = fboyle.layout.FlaBox2dLayoutExport;
StringBuf = function(p) {
	if( p === $_ ) return;
	this.b = new Array();
}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x;
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
if(typeof haxe=='undefined') haxe = {}
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
MainJsfl = function(p) {
	if( p === $_ ) return;
	new fboyle.layout.FlaBox2dLayoutExport();
}
MainJsfl.__name__ = ["MainJsfl"];
MainJsfl.main = function() {
	haxe.Log.trace("hello",{ fileName : "MainJsfl.hx", lineNumber : 12, className : "MainJsfl", methodName : "main"});
	new MainJsfl();
}
MainJsfl.prototype.__class__ = MainJsfl;
Hash = function(p) {
	if( p === $_ ) return;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	} else null;
}
Hash.__name__ = ["Hash"];
Hash.prototype.h = null;
Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
}
Hash.prototype.get = function(key) {
	return this.h["$" + key];
}
Hash.prototype.exists = function(key) {
	try {
		key = "$" + key;
		return this.hasOwnProperty.call(this.h,key);
	} catch( e ) {
		for(var i in this.h) if( i == key ) return true;
		return false;
	}
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
Hash.prototype.keys = function() {
	var a = new Array();
	for(var i in this.h) a.push(i.substr(1));
	return a.iterator();
}
Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}};
}
Hash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i;
		s.b[s.b.length] = " => ";
		s.b[s.b.length] = Std.string(this.get(i));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
Hash.prototype.__class__ = Hash;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
if(!touchmypixel.game) touchmypixel.game = {}
if(!touchmypixel.game.utils) touchmypixel.game.utils = {}
touchmypixel.game.utils.JSFLTools = function() { }
touchmypixel.game.utils.JSFLTools.__name__ = ["touchmypixel","game","utils","JSFLTools"];
touchmypixel.game.utils.JSFLTools.isShape = function(el) {
	return el.elementType == "shape";
}
touchmypixel.game.utils.JSFLTools.isInstance = function(el) {
	return el.elementType == "instance";
}
touchmypixel.game.utils.JSFLTools.isBitmap = function(el) {
	if(!touchmypixel.game.utils.JSFLTools.isInstance(el)) return false;
	return el.libraryItem.itemType == "bitmap";
}
touchmypixel.game.utils.JSFLTools.isComponent = function(el) {
	if(!touchmypixel.game.utils.JSFLTools.isInstance(el)) return false;
	var c = el;
	var isComponent = c.libraryItem.itemType == "component";
	if(isComponent && el.parameters == null) throw "COMPONENT DIRTY: You need to refresh " + c.name + " [" + c.libraryItem.name + "]";
	return isComponent;
}
touchmypixel.game.utils.JSFLTools.getChildren = function(timeline,includeGuideLayers) {
	if(includeGuideLayers == null) includeGuideLayers = false;
	if(timeline == null) return [];
	var els = new Array();
	var i = timeline.layers.length - 1;
	while(i >= 0) {
		var l = timeline.layers[i];
		if(l.layerType != "guide" || includeGuideLayers) {
			var f = l.frames[0];
			var _g = 0, _g1 = f.elements;
			while(_g < _g1.length) {
				var el = _g1[_g];
				++_g;
				els.unshift(el);
			}
		}
		i--;
	}
	return els;
}
touchmypixel.game.utils.JSFLTools.getTimeline = function(symbol) {
	return symbol.libraryItem.timeline;
}
touchmypixel.game.utils.JSFLTools.getInstanceChildren = function(symbol) {
	return touchmypixel.game.utils.JSFLTools.getChildren(touchmypixel.game.utils.JSFLTools.getTimeline(symbol));
}
touchmypixel.game.utils.JSFLTools.getDefinitionValues = function(el) {
	if(el == null) return null;
	var def = new Hash();
	if(!touchmypixel.game.utils.JSFLTools.isComponent(el)) return null;
	var el1 = el;
	var _g = 0, _g1 = el1.parameters;
	while(_g < _g1.length) {
		var p = _g1[_g];
		++_g;
		def.set(p.name,p.value);
	}
	return def;
}
touchmypixel.game.utils.JSFLTools.prototype.__class__ = touchmypixel.game.utils.JSFLTools;
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return s.substr(r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return s.substr(0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype.__class__ = StringTools;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();

			
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
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]};
	Dynamic = { __name__ : ["Dynamic"]};
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]};
	Class = { __name__ : ["Class"]};
	Enum = { };
	Void = { __ename__ : ["Void"]};
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
{
	var d = Date;
	d.now = function() {
		return new Date();
	};
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	};
	d.fromString = function(s) {
		switch(s.length) {
		case 8:
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		case 10:
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		case 19:
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw "Invalid date format : " + s;
		}
	};
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	};
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
js.Lib.onerror = null;
MainJsfl.main()