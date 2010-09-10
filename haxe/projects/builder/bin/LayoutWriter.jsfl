$estr = function() { return js.Boot.__string_rec(this,''); }
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
if(typeof touchmypixel=='undefined') touchmypixel = {}
if(!touchmypixel.game) touchmypixel.game = {}
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
if(typeof js=='undefined') js = {}
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
touchmypixel.game.LayoutWriter = function(p) { if( p === $_ ) return; {
	$s.push("touchmypixel.game.LayoutWriter::new");
	var $spos = $s.length;
	this.doc = jsfl.Fl.getDocumentDOM();
	this.lib = this.doc.library;
	this.root = this.doc.timelines[0];
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
	var xml = ((((((((((((("<circle x=\"" + s.x) + "\" y=\"") + s.y) + "\" w=\"") + s.width) + "\"  h=\"") + s.height) + "\" r=\"") + s.rotation) + "\" sx=\"") + s.scaleX) + "\" sy=\"") + s.scaleY) + "\" />\n";
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
	if(s.isGroup) {
		xml += ((((((((((((("<poly x=\"" + s.x) + "\" y=\"") + s.y) + "\" w=\"") + s.width) + "\"  h=\"") + s.height) + "\" r=\"") + s.rotation) + "\" sx=\"") + s.scaleX) + "\" sy=\"") + s.scaleY) + "\">\n";
	}
	else {
		xml += "<poly x=\"0\" y=\"0\" r=\"0\" scaleX=\"1\" scaleY=\"1\" >\n";
	}
	var points = [];
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
		var totalx = 0.;
		var totaly = 0.;
		{
			var _g1 = 0, _g = points.length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				totalx += points[i].x;
				totaly += points[i].y;
			}
		}
		totalx /= points.length - 1;
		totaly /= points.length - 1;
		{
			var _g1 = 0, _g = points.length;
			while(_g1 < _g) {
				var i = _g1++;
				points[i].x = points[i].x - totalx;
				points[i].y = points[i].y - totaly;
			}
		}
	}
	if(lastPoint.x != points[0].x || lastPoint.y != points[0].y) haxe.Log.trace(((("WARNING: shape not closed: " + scope.name) + " [") + scope.libraryItem.linkageClassName) + "]",{ fileName : "LayoutWriter.hx", lineNumber : 265, className : "touchmypixel.game.LayoutWriter", methodName : "parseElementPoly"});
	else points.shift();
	var p = null;
	{
		var _g1 = 0, _g = points.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(s.isRectangleObject) p = points[(points.length - 1) - i];
			else p = points[i];
			xml += ((("<vert x=\"" + p.x) + "\" y=\"") + p.y) + "\" />\n";
		}
	}
	xml += "</poly>\n";
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
	var xml = ("<layout " + this.parseParameters(result)) + ">\n";
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
	haxe.Log.trace("EXPORTED: " + path,{ fileName : "LayoutWriter.hx", lineNumber : 60, className : "touchmypixel.game.LayoutWriter", methodName : "saveXml"});
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
Main = function() { }
Main.__name__ = ["Main"];
Main.main = function() {
	$s.push("Main::main");
	var $spos = $s.length;
	new touchmypixel.game.LayoutWriter();
	$s.pop();
}
Main.prototype.__class__ = Main;
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
js.Lib.onerror = null;
$Main.init = Main.main();
