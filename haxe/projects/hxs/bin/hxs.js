$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof js=='undefined') js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = (i != null?((i.fileName + ":") + i.lineNumber) + ": ":"");
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg);
	else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
	else null;
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	}
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
	case "object":{
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
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
				return str + ")";
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
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					return "???";
				}
			}
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
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
		return str;
	}break;
	case "function":{
		return "<function>";
	}break;
	case "string":{
		return o;
	}break;
	default:{
		return String(o);
	}break;
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
			if(cl == Array) return (o.__enum__ == null);
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	}
	catch( $e1 ) {
		{
			var e = $e1;
			{
				if(cl == null) return false;
			}
		}
	}
	switch(cl) {
	case Int:{
		return Math.ceil(o%2147483648.0) === o;
	}break;
	case Float:{
		return typeof(o) == "number";
	}break;
	case Bool:{
		return o === true || o === false;
	}break;
	case String:{
		return typeof(o) == "string";
	}break;
	case Dynamic:{
		return true;
	}break;
	default:{
		if(o == null) return false;
		return o.__enum__ == cl || (cl == Class && o.__name__ != null) || (cl == Enum && o.__ename__ != null);
	}break;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = (typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null);
	js.Lib.isOpera = (typeof window!='undefined' && window.opera != null);
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	}
	Array.prototype.remove = (Array.prototype.indexOf?function(obj) {
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
	});
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}}
	}
	var cca = String.prototype.charCodeAt;
	String.prototype.cca = cca;
	String.prototype.charCodeAt = function(i) {
		var x = cca.call(this,i);
		if(isNaN(x)) return null;
		return x;
	}
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		}
		else if(len < 0) {
			len = (this.length + len) - pos;
		}
		return oldsub.apply(this,[pos,len]);
	}
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
if(typeof hxs=='undefined') hxs = {}
if(!hxs.core) hxs.core = {}
hxs.core.SignalBase = function(caller) { if( caller === $_ ) return; {
	this.slots = new hxs.core.PriorityQueue();
	this.target = caller;
	this.isMuted = false;
}}
hxs.core.SignalBase.__name__ = ["hxs","core","SignalBase"];
hxs.core.SignalBase.prototype.add = function(listener,priority,runCount) {
	if(runCount == null) runCount = -1;
	if(priority == null) priority = 0;
	this.remove(listener);
	this.slots.add(new hxs.core.Slot(listener,hxs.core.SignalType.NORMAL,runCount),priority);
}
hxs.core.SignalBase.prototype.addAdvanced = function(listener,priority,runCount) {
	if(runCount == null) runCount = -1;
	if(priority == null) priority = 0;
	this.remove(listener);
	this.slots.add(new hxs.core.Slot(listener,hxs.core.SignalType.ADVANCED,runCount),priority);
}
hxs.core.SignalBase.prototype.addOnce = function(listener,priority) {
	if(priority == null) priority = 0;
	this.add(listener,priority,1);
}
hxs.core.SignalBase.prototype.addVoid = function(listener,priority,runCount) {
	if(runCount == null) runCount = -1;
	if(priority == null) priority = 0;
	this.remove(listener);
	this.slots.add(new hxs.core.Slot(listener,hxs.core.SignalType.VOID,runCount),priority);
}
hxs.core.SignalBase.prototype.isMuted = null;
hxs.core.SignalBase.prototype.mute = function() {
	this.isMuted = true;
}
hxs.core.SignalBase.prototype.muteSlot = function(listener) {
	var _g = 0, _g1 = this.slots.items;
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		if(i.item.listener == listener) i.item.mute();
	}
}
hxs.core.SignalBase.prototype.onFireSlot = function(slot) {
	if(slot.remainingCalls != -1) if(--slot.remainingCalls <= 0) this.remove(slot.listener);
}
hxs.core.SignalBase.prototype.remove = function(listener) {
	{ var $it2 = this.slots.iterator();
	while( $it2.hasNext() ) { var i = $it2.next();
	if(i.listener == listener) this.slots.remove(i);
	}}
}
hxs.core.SignalBase.prototype.removeAll = function() {
	this.slots = new hxs.core.PriorityQueue();
}
hxs.core.SignalBase.prototype.slots = null;
hxs.core.SignalBase.prototype.target = null;
hxs.core.SignalBase.prototype.unmute = function() {
	this.isMuted = false;
}
hxs.core.SignalBase.prototype.unmuteSlot = function(listener) {
	var _g = 0, _g1 = this.slots.items;
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		if(i.item.listener == listener) i.item.unmute();
	}
}
hxs.core.SignalBase.prototype.__class__ = hxs.core.SignalBase;
hxs.Signal5 = function(caller) { if( caller === $_ ) return; {
	hxs.core.SignalBase.apply(this,[caller]);
}}
hxs.Signal5.__name__ = ["hxs","Signal5"];
hxs.Signal5.__super__ = hxs.core.SignalBase;
for(var k in hxs.core.SignalBase.prototype ) hxs.Signal5.prototype[k] = hxs.core.SignalBase.prototype[k];
hxs.Signal5.prototype.dispatch = function(a,b,c,d,e) {
	{ var $it3 = this.slots.iterator();
	while( $it3.hasNext() ) { var slot = $it3.next();
	{
		if(this.isMuted) return;
		if(slot.isMuted) continue;
		switch(slot.type) {
		case hxs.core.SignalType.NORMAL:{
			slot.listener(a,b,c,d,e);
		}break;
		case hxs.core.SignalType.ADVANCED:{
			slot.listener(a,b,c,d,e,new hxs.core.Info(this,slot));
		}break;
		case hxs.core.SignalType.VOID:{
			slot.listener();
		}break;
		}
		this.onFireSlot(slot);
	}
	}}
}
hxs.Signal5.prototype.getTrigger = function(a,b,c,d,e) {
	var _this = this;
	return new hxs.extras.Trigger(function() {
		_this.dispatch(a,b,c,d,e);
	});
}
hxs.Signal5.prototype.__class__ = hxs.Signal5;
hxs.core.SignalType = { __ename__ : ["hxs","core","SignalType"], __constructs__ : ["NORMAL","ADVANCED","VOID"] }
hxs.core.SignalType.ADVANCED = ["ADVANCED",1];
hxs.core.SignalType.ADVANCED.toString = $estr;
hxs.core.SignalType.ADVANCED.__enum__ = hxs.core.SignalType;
hxs.core.SignalType.NORMAL = ["NORMAL",0];
hxs.core.SignalType.NORMAL.toString = $estr;
hxs.core.SignalType.NORMAL.__enum__ = hxs.core.SignalType;
hxs.core.SignalType.VOID = ["VOID",2];
hxs.core.SignalType.VOID.toString = $estr;
hxs.core.SignalType.VOID.__enum__ = hxs.core.SignalType;
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
if(!hxs.extras) hxs.extras = {}
hxs.extras.Trigger = function(closure) { if( closure === $_ ) return; {
	this.closure = closure;
}}
hxs.extras.Trigger.__name__ = ["hxs","extras","Trigger"];
hxs.extras.Trigger.prototype.closure = null;
hxs.extras.Trigger.prototype.dispatch = function() {
	this.closure();
}
hxs.extras.Trigger.prototype.__class__ = hxs.extras.Trigger;
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
Main = function() { }
Main.__name__ = ["Main"];
Main.main = function() {
	null;
}
Main.prototype.__class__ = Main;
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
	var v = parseInt(x);
	if(Math.isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
hxs.Signal1 = function(caller) { if( caller === $_ ) return; {
	hxs.core.SignalBase.apply(this,[caller]);
}}
hxs.Signal1.__name__ = ["hxs","Signal1"];
hxs.Signal1.__super__ = hxs.core.SignalBase;
for(var k in hxs.core.SignalBase.prototype ) hxs.Signal1.prototype[k] = hxs.core.SignalBase.prototype[k];
hxs.Signal1.prototype.dispatch = function(a) {
	{ var $it4 = this.slots.iterator();
	while( $it4.hasNext() ) { var slot = $it4.next();
	{
		if(this.isMuted) return;
		if(slot.isMuted) continue;
		switch(slot.type) {
		case hxs.core.SignalType.NORMAL:{
			slot.listener(a);
		}break;
		case hxs.core.SignalType.ADVANCED:{
			slot.listener(a,new hxs.core.Info(this,slot));
		}break;
		case hxs.core.SignalType.VOID:{
			slot.listener();
		}break;
		}
		this.onFireSlot(slot);
	}
	}}
}
hxs.Signal1.prototype.getTrigger = function(a) {
	var _this = this;
	return new hxs.extras.Trigger(function() {
		_this.dispatch(a);
	});
}
hxs.Signal1.prototype.__class__ = hxs.Signal1;
if(typeof hxsTest=='undefined') hxsTest = {}
hxsTest.General = function(p) { if( p === $_ ) return; {
	this.testSimple();
}}
hxsTest.General.__name__ = ["hxsTest","General"];
hxsTest.General.prototype.testAdvanced = function() {
	var s = new hxs.Signal(this);
	s.addAdvanced(function(info) {
		haxe.Log.trace("** test with info",{ fileName : "General.hx", lineNumber : 66, className : "hxsTest.General", methodName : "testAdvanced"});
		haxe.Log.trace("info",{ fileName : "General.hx", lineNumber : 67, className : "hxsTest.General", methodName : "testAdvanced"});
		haxe.Log.trace("  current signal: " + info.signal,{ fileName : "General.hx", lineNumber : 68, className : "hxsTest.General", methodName : "testAdvanced"});
		haxe.Log.trace("  current slot: " + info.slot,{ fileName : "General.hx", lineNumber : 69, className : "hxsTest.General", methodName : "testAdvanced"});
		haxe.Log.trace("  signal's origin: " + info.target,{ fileName : "General.hx", lineNumber : 70, className : "hxsTest.General", methodName : "testAdvanced"});
	});
	s.dispatch();
}
hxsTest.General.prototype.testBubbling = function() {
	var s2 = new hxs.Signal2();
	var s3 = new hxs.Signal3();
	s2.add(function(a,b) {
		var val = a * b;
		haxe.Log.trace("signal 2 recieves bubbled event and calculates" + val,{ fileName : "General.hx", lineNumber : 168, className : "hxsTest.General", methodName : "testBubbling"});
	});
	s3.add(function(a,b,c) {
		var val = b + c;
		haxe.Log.trace((("signal 4 dispatches to say: " + a) + "and calculates: ") + val,{ fileName : "General.hx", lineNumber : 172, className : "hxsTest.General", methodName : "testBubbling"});
	});
	s3.add(function(a,b,c) {
		s2.dispatch(b,c);
	});
	s3.dispatch("numbers",3,4);
}
hxsTest.General.prototype.testMuteSignal = function() {
	var s1 = new hxs.Signal1();
	s1.addAdvanced(function(v,info) {
		haxe.Log.trace("test muting signal - step: " + v,{ fileName : "General.hx", lineNumber : 98, className : "hxsTest.General", methodName : "testMuteSignal"});
		info.signal.mute();
	});
	s1.dispatch(1);
	s1.dispatch(2);
	s1.unmute();
	s1.dispatch(3);
}
hxsTest.General.prototype.testMuteSlot = function() {
	var s1 = new hxs.Signal1();
	var listener1 = function(v,info) {
		haxe.Log.trace("listener 1, step:" + v,{ fileName : "General.hx", lineNumber : 126, className : "hxsTest.General", methodName : "testMuteSlot"});
		info.slot.mute();
	}
	s1.addAdvanced(listener1);
	s1.add(function(v) {
		haxe.Log.trace("listener 2, step:" + v,{ fileName : "General.hx", lineNumber : 135, className : "hxsTest.General", methodName : "testMuteSlot"});
	});
	s1.dispatch(1);
	haxe.Log.trace("-",{ fileName : "General.hx", lineNumber : 140, className : "hxsTest.General", methodName : "testMuteSlot"});
	haxe.Log.trace("the first listener is muted so would be here.. but isnt here",{ fileName : "General.hx", lineNumber : 141, className : "hxsTest.General", methodName : "testMuteSlot"});
	s1.dispatch(2);
	haxe.Log.trace("-",{ fileName : "General.hx", lineNumber : 144, className : "hxsTest.General", methodName : "testMuteSlot"});
	s1.unmuteSlot(listener1);
	s1.dispatch(3);
}
hxsTest.General.prototype.testSimple = function() {
	var s = new hxs.Signal(this);
	s.add(function() {
		haxe.Log.trace("** test simple signal",{ fileName : "General.hx", lineNumber : 45, className : "hxsTest.General", methodName : "testSimple"});
	});
	s.dispatch();
	s.dispatch();
	var s3 = new hxs.Signal3();
	s3.add(function(s1,v1,v2) {
		haxe.Log.trace((((((("** test " + s1) + " signal: product of ") + v1) + " and ") + v2) + " is: ") + (v1 * v2),{ fileName : "General.hx", lineNumber : 56, className : "hxsTest.General", methodName : "testSimple"});
	});
	s3.dispatch("more complex",3,3.4);
}
hxsTest.General.prototype.testTriggers = function() {
	var s2 = new hxs.Signal2();
	s2.add(function(a,b) {
		haxe.Log.trace("triggered sum " + (a + b),{ fileName : "General.hx", lineNumber : 193, className : "hxsTest.General", methodName : "testTriggers"});
	});
	s2.add(function(a,b) {
		haxe.Log.trace("triggered product " + (a * b),{ fileName : "General.hx", lineNumber : 199, className : "hxsTest.General", methodName : "testTriggers"});
	});
	var trigger = s2.getTrigger(2,3);
	var trigger2 = s2.getTrigger(10,2);
	trigger.dispatch();
	haxe.Log.trace("--- and trigger 2",{ fileName : "General.hx", lineNumber : 210, className : "hxsTest.General", methodName : "testTriggers"});
	trigger2.dispatch();
}
hxsTest.General.prototype.testVoid = function() {
	var s3 = new hxs.Signal3();
	s3.add(function(s,v1,v2) {
		haxe.Log.trace((((((("** test " + s) + " signal: product of ") + v1) + " and ") + v1) + " is: ") + (v1 * v2),{ fileName : "General.hx", lineNumber : 80, className : "hxsTest.General", methodName : "testVoid"});
	});
	s3.addVoid(function() {
		haxe.Log.trace("** test void: this is a signal3 calling a Void->Void",{ fileName : "General.hx", lineNumber : 84, className : "hxsTest.General", methodName : "testVoid"});
	});
	s3.dispatch("more complex",3,3.4);
}
hxsTest.General.prototype.__class__ = hxsTest.General;
hxs.core.Slot = function(listener,type,remainingCalls) { if( listener === $_ ) return; {
	this.listener = listener;
	this.type = type;
	this.remainingCalls = remainingCalls;
	this.isMuted = false;
}}
hxs.core.Slot.__name__ = ["hxs","core","Slot"];
hxs.core.Slot.prototype.isMuted = null;
hxs.core.Slot.prototype.listener = null;
hxs.core.Slot.prototype.mute = function() {
	this.isMuted = true;
}
hxs.core.Slot.prototype.remainingCalls = null;
hxs.core.Slot.prototype.type = null;
hxs.core.Slot.prototype.unmute = function() {
	this.isMuted = false;
}
hxs.core.Slot.prototype.__class__ = hxs.core.Slot;
hxs.core.PriorityQueue = function(p) { if( p === $_ ) return; {
	this.items = [];
}}
hxs.core.PriorityQueue.__name__ = ["hxs","core","PriorityQueue"];
hxs.core.PriorityQueue.prototype.add = function(item,priority) {
	if(priority == null) priority = 0;
	var data = { item : item, priority : priority}
	if(data.priority < 0) data.priority = 0;
	var c = this.items.length;
	while(c-- > 0) if(this.items[c].priority >= priority) break;
	this.items.insert(c + 1,data);
	return data;
}
hxs.core.PriorityQueue.prototype.back = function() {
	return this.items.pop().item;
}
hxs.core.PriorityQueue.prototype.currentIterator = null;
hxs.core.PriorityQueue.prototype.front = function() {
	return this.items.shift().item;
}
hxs.core.PriorityQueue.prototype.getLength = function() {
	return this.items.length;
}
hxs.core.PriorityQueue.prototype.getPriority = function(item) {
	{
		var _g = 0, _g1 = this.items;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(i.item == item) return i.priority;
		}
	}
	return -1;
}
hxs.core.PriorityQueue.prototype.items = null;
hxs.core.PriorityQueue.prototype.iterator = function() {
	return this.currentIterator = new hxs.core.PriorityQueueIterator(this);
}
hxs.core.PriorityQueue.prototype.length = null;
hxs.core.PriorityQueue.prototype.peek = function() {
	return this.items[0].item;
}
hxs.core.PriorityQueue.prototype.remove = function(item) {
	var _g = 0, _g1 = this.items;
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		if(i.item == item) this.items.remove(i);
	}
}
hxs.core.PriorityQueue.prototype.resort = function() {
	var a = this.items.copy();
	this.items = [];
	{
		var _g = 0;
		while(_g < a.length) {
			var i = a[_g];
			++_g;
			this.add(i.item,i.priority);
		}
	}
}
hxs.core.PriorityQueue.prototype.setPriority = function(item,priority) {
	{
		var _g = 0, _g1 = this.items;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(i.item == item) i.priority = priority;
		}
	}
	this.resort();
}
hxs.core.PriorityQueue.prototype.__class__ = hxs.core.PriorityQueue;
hxs.core.PriorityQueueIterator = function(q) { if( q === $_ ) return; {
	this.q = q;
	this.reset();
}}
hxs.core.PriorityQueueIterator.__name__ = ["hxs","core","PriorityQueueIterator"];
hxs.core.PriorityQueueIterator.prototype.hasNext = function() {
	return this.i < this.q.getLength();
}
hxs.core.PriorityQueueIterator.prototype.i = null;
hxs.core.PriorityQueueIterator.prototype.next = function() {
	return this.q.items[this.i++].item;
}
hxs.core.PriorityQueueIterator.prototype.q = null;
hxs.core.PriorityQueueIterator.prototype.reset = function() {
	this.i = 0;
}
hxs.core.PriorityQueueIterator.prototype.__class__ = hxs.core.PriorityQueueIterator;
hxs.Signal = function(caller) { if( caller === $_ ) return; {
	hxs.core.SignalBase.apply(this,[caller]);
}}
hxs.Signal.__name__ = ["hxs","Signal"];
hxs.Signal.__super__ = hxs.core.SignalBase;
for(var k in hxs.core.SignalBase.prototype ) hxs.Signal.prototype[k] = hxs.core.SignalBase.prototype[k];
hxs.Signal.prototype.dispatch = function() {
	{ var $it5 = this.slots.iterator();
	while( $it5.hasNext() ) { var slot = $it5.next();
	{
		if(this.isMuted) return;
		if(slot.isMuted) continue;
		switch(slot.type) {
		case hxs.core.SignalType.NORMAL:{
			slot.listener();
		}break;
		case hxs.core.SignalType.ADVANCED:{
			slot.listener(new hxs.core.Info(this,slot));
		}break;
		case hxs.core.SignalType.VOID:{
			slot.listener();
		}break;
		}
		this.onFireSlot(slot);
	}
	}}
}
hxs.Signal.prototype.getTrigger = function() {
	var _this = this;
	return new hxs.extras.Trigger(function() {
		_this.dispatch();
	});
}
hxs.Signal.prototype.__class__ = hxs.Signal;
hxs.Signal2 = function(caller) { if( caller === $_ ) return; {
	hxs.core.SignalBase.apply(this,[caller]);
}}
hxs.Signal2.__name__ = ["hxs","Signal2"];
hxs.Signal2.__super__ = hxs.core.SignalBase;
for(var k in hxs.core.SignalBase.prototype ) hxs.Signal2.prototype[k] = hxs.core.SignalBase.prototype[k];
hxs.Signal2.prototype.dispatch = function(a,b) {
	{ var $it6 = this.slots.iterator();
	while( $it6.hasNext() ) { var slot = $it6.next();
	{
		if(this.isMuted) return;
		if(slot.isMuted) continue;
		switch(slot.type) {
		case hxs.core.SignalType.NORMAL:{
			slot.listener(a,b);
		}break;
		case hxs.core.SignalType.ADVANCED:{
			slot.listener(a,b,new hxs.core.Info(this,slot));
		}break;
		case hxs.core.SignalType.VOID:{
			slot.listener();
		}break;
		}
		this.onFireSlot(slot);
	}
	}}
}
hxs.Signal2.prototype.getTrigger = function(a,b) {
	var _this = this;
	return new hxs.extras.Trigger(function() {
		_this.dispatch(a,b);
	});
}
hxs.Signal2.prototype.__class__ = hxs.Signal2;
hxs.Signal3 = function(caller) { if( caller === $_ ) return; {
	hxs.core.SignalBase.apply(this,[caller]);
}}
hxs.Signal3.__name__ = ["hxs","Signal3"];
hxs.Signal3.__super__ = hxs.core.SignalBase;
for(var k in hxs.core.SignalBase.prototype ) hxs.Signal3.prototype[k] = hxs.core.SignalBase.prototype[k];
hxs.Signal3.prototype.dispatch = function(a,b,c) {
	{ var $it7 = this.slots.iterator();
	while( $it7.hasNext() ) { var slot = $it7.next();
	{
		if(this.isMuted) return;
		if(slot.isMuted) continue;
		switch(slot.type) {
		case hxs.core.SignalType.NORMAL:{
			slot.listener(a,b,c);
		}break;
		case hxs.core.SignalType.ADVANCED:{
			slot.listener(a,b,c,new hxs.core.Info(this,slot));
		}break;
		case hxs.core.SignalType.VOID:{
			slot.listener();
		}break;
		}
		this.onFireSlot(slot);
	}
	}}
}
hxs.Signal3.prototype.getTrigger = function(a,b,c) {
	var _this = this;
	return new hxs.extras.Trigger(function() {
		_this.dispatch(a,b,c);
	});
}
hxs.Signal3.prototype.__class__ = hxs.Signal3;
hxs.core.Info = function(signal,slot) { if( signal === $_ ) return; {
	this.target = signal.target;
	this.signal = signal;
	this.slot = slot;
}}
hxs.core.Info.__name__ = ["hxs","core","Info"];
hxs.core.Info.prototype.signal = null;
hxs.core.Info.prototype.slot = null;
hxs.core.Info.prototype.target = null;
hxs.core.Info.prototype.__class__ = hxs.core.Info;
hxs.Signal4 = function(caller) { if( caller === $_ ) return; {
	hxs.core.SignalBase.apply(this,[caller]);
}}
hxs.Signal4.__name__ = ["hxs","Signal4"];
hxs.Signal4.__super__ = hxs.core.SignalBase;
for(var k in hxs.core.SignalBase.prototype ) hxs.Signal4.prototype[k] = hxs.core.SignalBase.prototype[k];
hxs.Signal4.prototype.dispatch = function(a,b,c,d) {
	{ var $it8 = this.slots.iterator();
	while( $it8.hasNext() ) { var slot = $it8.next();
	{
		if(this.isMuted) return;
		if(slot.isMuted) continue;
		switch(slot.type) {
		case hxs.core.SignalType.NORMAL:{
			slot.listener(a,b,c,d);
		}break;
		case hxs.core.SignalType.ADVANCED:{
			slot.listener(a,b,c,d,new hxs.core.Info(this,slot));
		}break;
		case hxs.core.SignalType.VOID:{
			slot.listener();
		}break;
		}
		this.onFireSlot(slot);
	}
	}}
}
hxs.Signal4.prototype.getTrigger = function(a,b,c,d) {
	var _this = this;
	return new hxs.extras.Trigger(function() {
		_this.dispatch(a,b,c,d);
	});
}
hxs.Signal4.prototype.__class__ = hxs.Signal4;
IntIter = function(min,max) { if( min === $_ ) return; {
	this.min = min;
	this.max = max;
}}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.max = null;
IntIter.prototype.min = null;
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
$Main = function() { }
$Main.__name__ = ["@Main"];
$Main.prototype.__class__ = $Main;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
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
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	}
	Math.isNaN = function(i) {
		return isNaN(i);
	}
	Math.__name__ = ["Math"];
}
js.Lib.onerror = null;
$Main.init = Main.main();
