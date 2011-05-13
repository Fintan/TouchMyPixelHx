$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof box2D=='undefined') box2D = {}
if(!box2D.dynamics) box2D.dynamics = {}
if(!box2D.dynamics.contacts) box2D.dynamics.contacts = {}
box2D.dynamics.contacts.B2Contact = function(s1,s2) {
	if( s1 === $_ ) return;
	this.m_node1 = new box2D.dynamics.contacts.B2ContactEdge();
	this.m_node2 = new box2D.dynamics.contacts.B2ContactEdge();
	this.m_flags = 0;
	if(s1 == null || s2 == null) {
		this.m_shape1 = null;
		this.m_shape2 = null;
		return;
	}
	if(s1.IsSensor() || s2.IsSensor()) this.m_flags |= box2D.dynamics.contacts.B2Contact.e_nonSolidFlag;
	this.m_shape1 = s1;
	this.m_shape2 = s2;
	this.m_manifoldCount = 0;
	this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction);
	this.m_restitution = box2D.common.math.B2Math.b2Max(this.m_shape1.m_restitution,this.m_shape2.m_restitution);
	this.m_prev = null;
	this.m_next = null;
	this.m_node1.contact = null;
	this.m_node1.prev = null;
	this.m_node1.next = null;
	this.m_node1.other = null;
	this.m_node2.contact = null;
	this.m_node2.prev = null;
	this.m_node2.next = null;
	this.m_node2.other = null;
}
box2D.dynamics.contacts.B2Contact.__name__ = ["box2D","dynamics","contacts","B2Contact"];
box2D.dynamics.contacts.B2Contact.AddType = function(createFcn,destroyFcn,type1,type2) {
	box2D.dynamics.contacts.B2Contact.s_registers[type1][type2].createFcn = createFcn;
	box2D.dynamics.contacts.B2Contact.s_registers[type1][type2].destroyFcn = destroyFcn;
	box2D.dynamics.contacts.B2Contact.s_registers[type1][type2].primary = true;
	if(type1 != type2) {
		box2D.dynamics.contacts.B2Contact.s_registers[type2][type1].createFcn = createFcn;
		box2D.dynamics.contacts.B2Contact.s_registers[type2][type1].destroyFcn = destroyFcn;
		box2D.dynamics.contacts.B2Contact.s_registers[type2][type1].primary = false;
	}
}
box2D.dynamics.contacts.B2Contact.InitializeRegisters = function() {
	box2D.dynamics.contacts.B2Contact.s_registers = new Array();
	var _g = 0;
	while(_g < 2) {
		var i = _g++;
		box2D.dynamics.contacts.B2Contact.s_registers[i] = new Array();
		var _g1 = 0;
		while(_g1 < 2) {
			var j = _g1++;
			box2D.dynamics.contacts.B2Contact.s_registers[i][j] = new box2D.dynamics.contacts.B2ContactRegister();
		}
	}
	box2D.dynamics.contacts.B2Contact.AddType($closure(box2D.dynamics.contacts.B2CircleContact,"Create"),$closure(box2D.dynamics.contacts.B2CircleContact,"Destroy"),0,0);
	box2D.dynamics.contacts.B2Contact.AddType($closure(box2D.dynamics.contacts.B2PolyAndCircleContact,"Create"),$closure(box2D.dynamics.contacts.B2PolyAndCircleContact,"Destroy"),1,0);
	box2D.dynamics.contacts.B2Contact.AddType($closure(box2D.dynamics.contacts.B2PolygonContact,"Create"),$closure(box2D.dynamics.contacts.B2PolygonContact,"Destroy"),1,1);
}
box2D.dynamics.contacts.B2Contact.Create = function(shape1,shape2,allocator) {
	if(box2D.dynamics.contacts.B2Contact.s_initialized == false) {
		box2D.dynamics.contacts.B2Contact.InitializeRegisters();
		box2D.dynamics.contacts.B2Contact.s_initialized = true;
	}
	var type1 = shape1.m_type;
	var type2 = shape2.m_type;
	var reg = box2D.dynamics.contacts.B2Contact.s_registers[type1][type2];
	var createFcn = reg.createFcn;
	if(createFcn != null) {
		if(reg.primary) return createFcn(shape1,shape2,allocator); else {
			var c = createFcn(shape2,shape1,allocator);
			var _g1 = 0, _g = c.m_manifoldCount;
			while(_g1 < _g) {
				var i = _g1++;
				var m = c.GetManifolds()[i];
				m.normal = m.normal.Negative();
			}
			return c;
		}
	} else return null;
}
box2D.dynamics.contacts.B2Contact.Destroy = function(contact,allocator) {
	if(contact.m_manifoldCount > 0) {
		contact.m_shape1.m_body.WakeUp();
		contact.m_shape2.m_body.WakeUp();
	}
	var type1 = contact.m_shape1.m_type;
	var type2 = contact.m_shape2.m_type;
	var reg = box2D.dynamics.contacts.B2Contact.s_registers[type1][type2];
	var destroyFcn = reg.destroyFcn;
	destroyFcn(contact,allocator);
}
box2D.dynamics.contacts.B2Contact.s_registers = null;
box2D.dynamics.contacts.B2Contact.prototype.GetManifolds = function() {
	return null;
}
box2D.dynamics.contacts.B2Contact.prototype.GetManifoldCount = function() {
	return this.m_manifoldCount;
}
box2D.dynamics.contacts.B2Contact.prototype.IsSolid = function() {
	return (this.m_flags & box2D.dynamics.contacts.B2Contact.e_nonSolidFlag) == 0;
}
box2D.dynamics.contacts.B2Contact.prototype.GetNext = function() {
	return this.m_next;
}
box2D.dynamics.contacts.B2Contact.prototype.GetShape1 = function() {
	return this.m_shape1;
}
box2D.dynamics.contacts.B2Contact.prototype.GetShape2 = function() {
	return this.m_shape2;
}
box2D.dynamics.contacts.B2Contact.prototype.m_flags = null;
box2D.dynamics.contacts.B2Contact.prototype.m_prev = null;
box2D.dynamics.contacts.B2Contact.prototype.m_next = null;
box2D.dynamics.contacts.B2Contact.prototype.m_node1 = null;
box2D.dynamics.contacts.B2Contact.prototype.m_node2 = null;
box2D.dynamics.contacts.B2Contact.prototype.m_shape1 = null;
box2D.dynamics.contacts.B2Contact.prototype.m_shape2 = null;
box2D.dynamics.contacts.B2Contact.prototype.m_manifoldCount = null;
box2D.dynamics.contacts.B2Contact.prototype.m_friction = null;
box2D.dynamics.contacts.B2Contact.prototype.m_restitution = null;
box2D.dynamics.contacts.B2Contact.prototype.m_toi = null;
box2D.dynamics.contacts.B2Contact.prototype.Update = function(listener) {
	var oldCount = this.m_manifoldCount;
	this.Evaluate(listener);
	var newCount = this.m_manifoldCount;
	var body1 = this.m_shape1.m_body;
	var body2 = this.m_shape2.m_body;
	if(newCount == 0 && oldCount > 0) {
		body1.WakeUp();
		body2.WakeUp();
	}
	if(body1.IsStatic() || body1.IsBullet() || body2.IsStatic() || body2.IsBullet()) this.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_slowFlag; else this.m_flags |= box2D.dynamics.contacts.B2Contact.e_slowFlag;
}
box2D.dynamics.contacts.B2Contact.prototype.Evaluate = function(listener) {
}
box2D.dynamics.contacts.B2Contact.prototype.__class__ = box2D.dynamics.contacts.B2Contact;
box2D.dynamics.contacts.B2NullContact = function(p) {
	if( p === $_ ) return;
	box2D.dynamics.contacts.B2Contact.call(this);
}
box2D.dynamics.contacts.B2NullContact.__name__ = ["box2D","dynamics","contacts","B2NullContact"];
box2D.dynamics.contacts.B2NullContact.__super__ = box2D.dynamics.contacts.B2Contact;
for(var k in box2D.dynamics.contacts.B2Contact.prototype ) box2D.dynamics.contacts.B2NullContact.prototype[k] = box2D.dynamics.contacts.B2Contact.prototype[k];
box2D.dynamics.contacts.B2NullContact.prototype.Evaluate = function(l) {
}
box2D.dynamics.contacts.B2NullContact.prototype.GetManifolds = function() {
	return null;
}
box2D.dynamics.contacts.B2NullContact.prototype.__class__ = box2D.dynamics.contacts.B2NullContact;
if(!box2D.collision) box2D.collision = {}
box2D.collision.B2ContactPoint = function(p) {
	if( p === $_ ) return;
	this.position = new box2D.common.math.B2Vec2();
	this.velocity = new box2D.common.math.B2Vec2();
	this.normal = new box2D.common.math.B2Vec2();
	this.id = new box2D.collision.B2ContactID();
	this.separation = 0.0;
	this.friction = 0.0;
	this.restitution = 0.0;
}
box2D.collision.B2ContactPoint.__name__ = ["box2D","collision","B2ContactPoint"];
box2D.collision.B2ContactPoint.prototype.shape1 = null;
box2D.collision.B2ContactPoint.prototype.shape2 = null;
box2D.collision.B2ContactPoint.prototype.position = null;
box2D.collision.B2ContactPoint.prototype.velocity = null;
box2D.collision.B2ContactPoint.prototype.normal = null;
box2D.collision.B2ContactPoint.prototype.separation = null;
box2D.collision.B2ContactPoint.prototype.friction = null;
box2D.collision.B2ContactPoint.prototype.restitution = null;
box2D.collision.B2ContactPoint.prototype.id = null;
box2D.collision.B2ContactPoint.prototype.__class__ = box2D.collision.B2ContactPoint;
box2D.dynamics.contacts.B2PolyAndCircleContact = function(shape1,shape2) {
	if( shape1 === $_ ) return;
	box2D.dynamics.contacts.B2Contact.call(this,shape1,shape2);
	this.m_manifolds = [new box2D.collision.B2Manifold()];
	this.m0 = new box2D.collision.B2Manifold();
	this.m_manifold = this.m_manifolds[0];
	box2D.common.B2Settings.b2Assert(this.m_shape1.m_type == 1);
	box2D.common.B2Settings.b2Assert(this.m_shape2.m_type == 0);
	this.m_manifold.pointCount = 0;
	var point = this.m_manifold.points[0];
	point.normalImpulse = 0.0;
	point.tangentImpulse = 0.0;
}
box2D.dynamics.contacts.B2PolyAndCircleContact.__name__ = ["box2D","dynamics","contacts","B2PolyAndCircleContact"];
box2D.dynamics.contacts.B2PolyAndCircleContact.__super__ = box2D.dynamics.contacts.B2Contact;
for(var k in box2D.dynamics.contacts.B2Contact.prototype ) box2D.dynamics.contacts.B2PolyAndCircleContact.prototype[k] = box2D.dynamics.contacts.B2Contact.prototype[k];
box2D.dynamics.contacts.B2PolyAndCircleContact.Create = function(shape1,shape2,allocator) {
	return new box2D.dynamics.contacts.B2PolyAndCircleContact(shape1,shape2);
}
box2D.dynamics.contacts.B2PolyAndCircleContact.Destroy = function(contact,allocator) {
}
box2D.dynamics.contacts.B2PolyAndCircleContact.prototype.Evaluate = function(listener) {
	var i;
	var v1;
	var v2;
	var mp0;
	var b1 = this.m_shape1.m_body;
	var b2 = this.m_shape2.m_body;
	this.m0.Set(this.m_manifold);
	box2D.collision.B2Collision.b2CollidePolygonAndCircle(this.m_manifold,this.m_shape1,b1.m_xf,this.m_shape2,b2.m_xf);
	var persisted = [false,false];
	var cp = box2D.dynamics.contacts.B2PolyAndCircleContact.s_evalCP;
	cp.shape1 = this.m_shape1;
	cp.shape2 = this.m_shape2;
	cp.friction = this.m_friction;
	cp.restitution = this.m_restitution;
	if(this.m_manifold.pointCount > 0) {
		var _g1 = 0, _g = this.m_manifold.pointCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			var mp = this.m_manifold.points[i1];
			mp.normalImpulse = 0.0;
			mp.tangentImpulse = 0.0;
			var found = false;
			var idKey = mp.id._key;
			var _g3 = 0, _g2 = this.m0.pointCount;
			while(_g3 < _g2) {
				var j = _g3++;
				if(persisted[j] == true) continue;
				mp0 = this.m0.points[j];
				if(mp0.id._key == idKey) {
					persisted[j] = true;
					mp.normalImpulse = mp0.normalImpulse;
					mp.tangentImpulse = mp0.tangentImpulse;
					found = true;
					if(listener != null) {
						cp.position = b1.GetWorldPoint(mp.localPoint1);
						v1 = b1.GetLinearVelocityFromWorldPoint(b1.GetWorldPoint(mp.localPoint1));
						v2 = b2.GetLinearVelocityFromWorldPoint(b2.GetWorldPoint(mp.localPoint2));
						cp.velocity.Set(v2.x - v1.x,v2.y - v1.y);
						cp.normal.SetV(this.m_manifold.normal);
						cp.separation = mp.separation;
						cp.id.setKey(idKey);
						listener.Persist(cp);
					}
					break;
				}
			}
			if(found == false && listener != null) {
				cp.position = b1.GetWorldPoint(mp.localPoint1);
				v1 = b1.GetLinearVelocityFromWorldPoint(b1.GetWorldPoint(mp.localPoint1));
				v2 = b2.GetLinearVelocityFromWorldPoint(b2.GetWorldPoint(mp.localPoint2));
				cp.velocity.Set(v2.x - v1.x,v2.y - v1.y);
				cp.normal.SetV(this.m_manifold.normal);
				cp.separation = mp.separation;
				cp.id.setKey(idKey);
				listener.Add(cp);
			}
		}
		this.m_manifoldCount = 1;
	} else this.m_manifoldCount = 0;
	if(listener == null) return;
	var _g1 = 0, _g = this.m0.pointCount;
	while(_g1 < _g) {
		var i1 = _g1++;
		if(persisted[i1]) continue;
		mp0 = this.m0.points[i1];
		cp.position = b1.GetWorldPoint(mp0.localPoint1);
		v1 = b1.GetLinearVelocityFromWorldPoint(b1.GetWorldPoint(mp0.localPoint1));
		v2 = b2.GetLinearVelocityFromWorldPoint(b2.GetWorldPoint(mp0.localPoint2));
		cp.velocity.Set(v2.x - v1.x,v2.y - v1.y);
		cp.normal.SetV(this.m0.normal);
		cp.separation = mp0.separation;
		cp.id.setKey(mp0.id._key);
		listener.Remove(cp);
	}
}
box2D.dynamics.contacts.B2PolyAndCircleContact.prototype.GetManifolds = function() {
	return this.m_manifolds;
}
box2D.dynamics.contacts.B2PolyAndCircleContact.prototype.m_manifolds = null;
box2D.dynamics.contacts.B2PolyAndCircleContact.prototype.m_manifold = null;
box2D.dynamics.contacts.B2PolyAndCircleContact.prototype.m0 = null;
box2D.dynamics.contacts.B2PolyAndCircleContact.prototype.__class__ = box2D.dynamics.contacts.B2PolyAndCircleContact;
if(!box2D.common) box2D.common = {}
if(!box2D.common.math) box2D.common.math = {}
box2D.common.math.B2Mat22 = function(angle,c1,c2) {
	if( angle === $_ ) return;
	if(angle == null) angle = 0.0;
	this.col1 = new box2D.common.math.B2Vec2();
	this.col2 = new box2D.common.math.B2Vec2();
	if(c1 != null && c2 != null) {
		this.col1.SetV(c1);
		this.col2.SetV(c2);
	} else {
		var c = Math.cos(angle);
		var s = Math.sin(angle);
		this.col1.x = c;
		this.col2.x = -s;
		this.col1.y = s;
		this.col2.y = c;
	}
}
box2D.common.math.B2Mat22.__name__ = ["box2D","common","math","B2Mat22"];
box2D.common.math.B2Mat22.prototype.Set = function(angle) {
	var c = Math.cos(angle);
	var s = Math.sin(angle);
	this.col1.x = c;
	this.col2.x = -s;
	this.col1.y = s;
	this.col2.y = c;
}
box2D.common.math.B2Mat22.prototype.SetVV = function(c1,c2) {
	this.col1.SetV(c1);
	this.col2.SetV(c2);
}
box2D.common.math.B2Mat22.prototype.Copy = function() {
	return new box2D.common.math.B2Mat22(0,this.col1,this.col2);
}
box2D.common.math.B2Mat22.prototype.SetM = function(m) {
	this.col1.SetV(m.col1);
	this.col2.SetV(m.col2);
}
box2D.common.math.B2Mat22.prototype.AddM = function(m) {
	this.col1.x += m.col1.x;
	this.col1.y += m.col1.y;
	this.col2.x += m.col2.x;
	this.col2.y += m.col2.y;
}
box2D.common.math.B2Mat22.prototype.SetIdentity = function() {
	this.col1.x = 1.0;
	this.col2.x = 0.0;
	this.col1.y = 0.0;
	this.col2.y = 1.0;
}
box2D.common.math.B2Mat22.prototype.SetZero = function() {
	this.col1.x = 0.0;
	this.col2.x = 0.0;
	this.col1.y = 0.0;
	this.col2.y = 0.0;
}
box2D.common.math.B2Mat22.prototype.GetAngle = function() {
	return Math.atan2(this.col1.y,this.col1.x);
}
box2D.common.math.B2Mat22.prototype.Invert = function(out) {
	var a = this.col1.x;
	var b = this.col2.x;
	var c = this.col1.y;
	var d = this.col2.y;
	var det = a * d - b * c;
	det = 1.0 / det;
	out.col1.x = det * d;
	out.col2.x = -det * b;
	out.col1.y = -det * c;
	out.col2.y = det * a;
	return out;
}
box2D.common.math.B2Mat22.prototype.Solve = function(out,bX,bY) {
	var a11 = this.col1.x;
	var a12 = this.col2.x;
	var a21 = this.col1.y;
	var a22 = this.col2.y;
	var det = a11 * a22 - a12 * a21;
	det = 1.0 / det;
	out.x = det * (a22 * bX - a12 * bY);
	out.y = det * (a11 * bY - a21 * bX);
	return out;
}
box2D.common.math.B2Mat22.prototype.Abs = function() {
	this.col1.Abs();
	this.col2.Abs();
}
box2D.common.math.B2Mat22.prototype.col1 = null;
box2D.common.math.B2Mat22.prototype.col2 = null;
box2D.common.math.B2Mat22.prototype.__class__ = box2D.common.math.B2Mat22;
box2D.collision.B2BroadPhase = function(worldAABB,myCallback) {
	if( worldAABB === $_ ) return;
	this.m_pairManager = new box2D.collision.B2PairManager();
	this.m_proxyPool = new Array();
	this.m_bounds = new Array();
	this.m_queryResults = new Array();
	this.m_quantizationFactor = new box2D.common.math.B2Vec2();
	this.m_pairManager.Initialize(this,myCallback);
	this.m_worldAABB = worldAABB;
	this.m_proxyCount = 0;
	var _g = 0;
	while(_g < 512) {
		var i = _g++;
		this.m_queryResults[i] = 0;
	}
	this.m_bounds = new Array();
	var _g = 0;
	while(_g < 2) {
		var i = _g++;
		this.m_bounds[i] = new Array();
		var _g2 = 0, _g1 = 1024;
		while(_g2 < _g1) {
			var j = _g2++;
			this.m_bounds[i][j] = new box2D.collision.B2Bound();
		}
	}
	var dX = worldAABB.upperBound.x - worldAABB.lowerBound.x;
	var dY = worldAABB.upperBound.y - worldAABB.lowerBound.y;
	this.m_quantizationFactor.x = 65535 / dX;
	this.m_quantizationFactor.y = 65535 / dY;
	var tProxy;
	var _g1 = 0, _g = 511;
	while(_g1 < _g) {
		var i = _g1++;
		tProxy = new box2D.collision.B2Proxy();
		this.m_proxyPool[i] = tProxy;
		tProxy.lowerBounds[0] = i + 1 & 65535;
		tProxy.timeStamp = 0;
		tProxy.overlapCount = 65535;
		tProxy.userData = null;
	}
	tProxy = new box2D.collision.B2Proxy();
	this.m_proxyPool[511] = tProxy;
	tProxy.lowerBounds[0] = 65535;
	tProxy.timeStamp = 0;
	tProxy.overlapCount = 65535;
	tProxy.userData = null;
	this.m_freeProxy = 0;
	this.m_timeStamp = 1;
	this.m_queryResultCount = 0;
}
box2D.collision.B2BroadPhase.__name__ = ["box2D","collision","B2BroadPhase"];
box2D.collision.B2BroadPhase.BinarySearch = function(bounds,count,value) {
	var low = 0;
	var high = count - 1;
	while(low <= high) {
		var mid = Std["int"]((low + high) * 0.5);
		var bound = bounds[mid];
		if(bound.value > value) high = mid - 1; else if(bound.value < value) low = mid + 1; else return mid;
	}
	return low;
}
box2D.collision.B2BroadPhase.prototype.InRange = function(aabb) {
	var dX;
	var dY;
	var d2X;
	var d2Y;
	dX = aabb.lowerBound.x;
	dY = aabb.lowerBound.y;
	dX -= this.m_worldAABB.upperBound.x;
	dY -= this.m_worldAABB.upperBound.y;
	d2X = this.m_worldAABB.lowerBound.x;
	d2Y = this.m_worldAABB.lowerBound.y;
	d2X -= aabb.upperBound.x;
	d2Y -= aabb.upperBound.y;
	dX = dX > d2X?dX:d2X;
	dY = dY > d2Y?dY:d2Y;
	return (dX > dY?dX:dY) < 0.0;
}
box2D.collision.B2BroadPhase.prototype.GetProxy = function(proxyId) {
	var proxy = this.m_proxyPool[proxyId];
	if(proxyId == 65535 || proxy.overlapCount != 65535 == false) return null;
	return proxy;
}
box2D.collision.B2BroadPhase.prototype.CreateProxy = function(aabb,userData) {
	var index;
	var proxy;
	var proxyId = this.m_freeProxy;
	proxy = this.m_proxyPool[proxyId];
	this.m_freeProxy = proxy.lowerBounds[0];
	proxy.overlapCount = 0;
	proxy.userData = userData;
	var boundCount = 2 * this.m_proxyCount;
	var lowerValues = new Array();
	var upperValues = new Array();
	this.ComputeBounds(lowerValues,upperValues,aabb);
	var _g = 0;
	while(_g < 2) {
		var axis = _g++;
		var bounds = this.m_bounds[axis];
		var lowerIndex = 0;
		var upperIndex = 0;
		var lowerIndexOut = [lowerIndex];
		var upperIndexOut = [upperIndex];
		this.Query(lowerIndexOut,upperIndexOut,lowerValues[axis],upperValues[axis],bounds,boundCount,axis);
		lowerIndex = lowerIndexOut[0];
		upperIndex = upperIndexOut[0];
		var tArr = new Array();
		var j;
		var tEnd = boundCount - upperIndex;
		var tBound1;
		var tBound2;
		var tBoundAS3;
		var _g1 = 0;
		while(_g1 < tEnd) {
			var j1 = _g1++;
			tArr[j1] = new box2D.collision.B2Bound();
			tBound1 = tArr[j1];
			tBound2 = bounds[upperIndex + j1];
			tBound1.value = tBound2.value;
			tBound1.proxyId = tBound2.proxyId;
			tBound1.stabbingCount = tBound2.stabbingCount;
		}
		tEnd = tArr.length;
		var tIndex = upperIndex + 2;
		var _g1 = 0;
		while(_g1 < tEnd) {
			var j1 = _g1++;
			tBound2 = tArr[j1];
			tBound1 = bounds[tIndex + j1];
			tBound1.value = tBound2.value;
			tBound1.proxyId = tBound2.proxyId;
			tBound1.stabbingCount = tBound2.stabbingCount;
		}
		tArr = new Array();
		tEnd = upperIndex - lowerIndex;
		var _g1 = 0;
		while(_g1 < tEnd) {
			var j1 = _g1++;
			tArr[j1] = new box2D.collision.B2Bound();
			tBound1 = tArr[j1];
			tBound2 = bounds[lowerIndex + j1];
			tBound1.value = tBound2.value;
			tBound1.proxyId = tBound2.proxyId;
			tBound1.stabbingCount = tBound2.stabbingCount;
		}
		tEnd = tArr.length;
		tIndex = lowerIndex + 1;
		var _g1 = 0;
		while(_g1 < tEnd) {
			var j1 = _g1++;
			tBound2 = tArr[j1];
			tBound1 = bounds[tIndex + j1];
			tBound1.value = tBound2.value;
			tBound1.proxyId = tBound2.proxyId;
			tBound1.stabbingCount = tBound2.stabbingCount;
		}
		++upperIndex;
		tBound1 = bounds[lowerIndex];
		tBound2 = bounds[upperIndex];
		tBound1.value = lowerValues[axis];
		tBound1.proxyId = proxyId;
		tBound2.value = upperValues[axis];
		tBound2.proxyId = proxyId;
		tBoundAS3 = bounds[lowerIndex - 1];
		tBound1.stabbingCount = lowerIndex == 0?0:tBoundAS3.stabbingCount;
		tBoundAS3 = bounds[upperIndex - 1];
		tBound2.stabbingCount = tBoundAS3.stabbingCount;
		index = lowerIndex;
		while(index < upperIndex) {
			tBoundAS3 = bounds[index];
			tBoundAS3.stabbingCount++;
			++index;
		}
		index = lowerIndex;
		while(index < boundCount + 2) {
			tBound1 = bounds[index];
			var proxy2 = this.m_proxyPool[tBound1.proxyId];
			if((tBound1.value & 1) == 0) proxy2.lowerBounds[axis] = index; else proxy2.upperBounds[axis] = index;
			++index;
		}
	}
	++this.m_proxyCount;
	var _g1 = 0, _g = this.m_queryResultCount;
	while(_g1 < _g) {
		var i = _g1++;
		this.m_pairManager.AddBufferedPair(proxyId,this.m_queryResults[i]);
	}
	this.m_pairManager.Commit();
	this.m_queryResultCount = 0;
	this.IncrementTimeStamp();
	return proxyId;
}
box2D.collision.B2BroadPhase.prototype.DestroyProxy = function(proxyId) {
	var tBound1;
	var tBound2;
	var proxy = this.m_proxyPool[proxyId];
	var boundCount = 2 * this.m_proxyCount;
	var _g = 0;
	while(_g < 2) {
		var axis = _g++;
		var bounds = this.m_bounds[axis];
		var lowerIndex = proxy.lowerBounds[axis];
		var upperIndex = proxy.upperBounds[axis];
		tBound1 = bounds[lowerIndex];
		var lowerValue = tBound1.value;
		tBound2 = bounds[upperIndex];
		var upperValue = tBound2.value;
		var tArr = new Array();
		var j;
		var tEnd = upperIndex - lowerIndex - 1;
		var _g1 = 0;
		while(_g1 < tEnd) {
			var j1 = _g1++;
			tArr[j1] = new box2D.collision.B2Bound();
			tBound1 = tArr[j1];
			tBound2 = bounds[lowerIndex + 1 + j1];
			tBound1.value = tBound2.value;
			tBound1.proxyId = tBound2.proxyId;
			tBound1.stabbingCount = tBound2.stabbingCount;
		}
		tEnd = tArr.length;
		var tIndex = lowerIndex;
		var _g1 = 0;
		while(_g1 < tEnd) {
			var j1 = _g1++;
			tBound2 = tArr[j1];
			tBound1 = bounds[tIndex + j1];
			tBound1.value = tBound2.value;
			tBound1.proxyId = tBound2.proxyId;
			tBound1.stabbingCount = tBound2.stabbingCount;
		}
		tArr = new Array();
		tEnd = boundCount - upperIndex - 1;
		var _g1 = 0;
		while(_g1 < tEnd) {
			var j1 = _g1++;
			tArr[j1] = new box2D.collision.B2Bound();
			tBound1 = tArr[j1];
			tBound2 = bounds[upperIndex + 1 + j1];
			tBound1.value = tBound2.value;
			tBound1.proxyId = tBound2.proxyId;
			tBound1.stabbingCount = tBound2.stabbingCount;
		}
		tEnd = tArr.length;
		tIndex = upperIndex - 1;
		var _g1 = 0;
		while(_g1 < tEnd) {
			var j1 = _g1++;
			tBound2 = tArr[j1];
			tBound1 = bounds[tIndex + j1];
			tBound1.value = tBound2.value;
			tBound1.proxyId = tBound2.proxyId;
			tBound1.stabbingCount = tBound2.stabbingCount;
		}
		tEnd = boundCount - 2;
		var index = lowerIndex;
		while(index < tEnd) {
			tBound1 = bounds[index];
			var proxy2 = this.m_proxyPool[tBound1.proxyId];
			if((tBound1.value & 1) == 0) proxy2.lowerBounds[axis] = index; else proxy2.upperBounds[axis] = index;
			++index;
		}
		tEnd = upperIndex - 1;
		var index2 = lowerIndex;
		while(index2 < tEnd) {
			tBound1 = bounds[index2];
			tBound1.stabbingCount--;
			++index2;
		}
		this.Query([0],[0],lowerValue,upperValue,bounds,boundCount - 2,axis);
	}
	var _g1 = 0, _g = this.m_queryResultCount;
	while(_g1 < _g) {
		var i = _g1++;
		this.m_pairManager.RemoveBufferedPair(proxyId,this.m_queryResults[i]);
	}
	this.m_pairManager.Commit();
	this.m_queryResultCount = 0;
	this.IncrementTimeStamp();
	proxy.userData = null;
	proxy.overlapCount = 65535;
	proxy.lowerBounds[0] = 65535;
	proxy.lowerBounds[1] = 65535;
	proxy.upperBounds[0] = 65535;
	proxy.upperBounds[1] = 65535;
	proxy.lowerBounds[0] = this.m_freeProxy & 65535;
	this.m_freeProxy = proxyId;
	--this.m_proxyCount;
}
box2D.collision.B2BroadPhase.prototype.MoveProxy = function(proxyId,aabb) {
	var as3arr;
	var as3int;
	var axis;
	var index;
	var bound;
	var prevBound;
	var nextBound;
	var nextProxyId;
	var nextProxy;
	if(proxyId == 65535 || 512 <= proxyId) return;
	if(aabb.IsValid() == false) return;
	var boundCount = 2 * this.m_proxyCount;
	var proxy = this.m_proxyPool[proxyId];
	var newValues = new box2D.collision.B2BoundValues();
	this.ComputeBounds(newValues.lowerValues,newValues.upperValues,aabb);
	var oldValues = new box2D.collision.B2BoundValues();
	var _g = 0;
	while(_g < 2) {
		var axis1 = _g++;
		bound = this.m_bounds[axis1][proxy.lowerBounds[axis1]];
		oldValues.lowerValues[axis1] = bound.value;
		bound = this.m_bounds[axis1][proxy.upperBounds[axis1]];
		oldValues.upperValues[axis1] = bound.value;
	}
	var _g = 0;
	while(_g < 2) {
		var axis1 = _g++;
		var bounds = this.m_bounds[axis1];
		var lowerIndex = proxy.lowerBounds[axis1];
		var upperIndex = proxy.upperBounds[axis1];
		var lowerValue = newValues.lowerValues[axis1];
		var upperValue = newValues.upperValues[axis1];
		bound = bounds[lowerIndex];
		var deltaLower = lowerValue - bound.value;
		bound.value = lowerValue;
		bound = bounds[upperIndex];
		var deltaUpper = upperValue - bound.value;
		bound.value = upperValue;
		var prevProxy;
		var prevProxyId;
		if(deltaLower < 0) {
			index = lowerIndex;
			while(index > 0 && lowerValue < bounds[index - 1].value) {
				bound = bounds[index];
				prevBound = bounds[index - 1];
				prevProxyId = prevBound.proxyId;
				prevProxy = this.m_proxyPool[prevBound.proxyId];
				prevBound.stabbingCount++;
				if((prevBound.value & 1) == 1 == true) {
					if(this.TestOverlap(newValues,prevProxy)) this.m_pairManager.AddBufferedPair(proxyId,prevProxyId);
					as3arr = prevProxy.upperBounds;
					as3int = as3arr[axis1];
					as3int++;
					as3arr[axis1] = as3int;
					bound.stabbingCount++;
				} else {
					as3arr = prevProxy.lowerBounds;
					as3int = as3arr[axis1];
					as3int++;
					as3arr[axis1] = as3int;
					bound.stabbingCount--;
				}
				as3arr = proxy.lowerBounds;
				as3int = as3arr[axis1];
				as3int--;
				as3arr[axis1] = as3int;
				bound.Swap(prevBound);
				--index;
			}
		}
		if(deltaUpper > 0) {
			index = upperIndex;
			while(index < boundCount - 1 && bounds[index + 1].value <= upperValue) {
				bound = bounds[index];
				nextBound = bounds[index + 1];
				nextProxyId = nextBound.proxyId;
				nextProxy = this.m_proxyPool[nextProxyId];
				nextBound.stabbingCount++;
				if((nextBound.value & 1) == 0 == true) {
					if(this.TestOverlap(newValues,nextProxy)) this.m_pairManager.AddBufferedPair(proxyId,nextProxyId);
					as3arr = nextProxy.lowerBounds;
					as3int = as3arr[axis1];
					as3int--;
					as3arr[axis1] = as3int;
					bound.stabbingCount++;
				} else {
					as3arr = nextProxy.upperBounds;
					as3int = as3arr[axis1];
					as3int--;
					as3arr[axis1] = as3int;
					bound.stabbingCount--;
				}
				as3arr = proxy.upperBounds;
				as3int = as3arr[axis1];
				as3int++;
				as3arr[axis1] = as3int;
				bound.Swap(nextBound);
				index++;
			}
		}
		if(deltaLower > 0) {
			index = lowerIndex;
			while(index < boundCount - 1 && bounds[index + 1].value <= lowerValue) {
				bound = bounds[index];
				nextBound = bounds[index + 1];
				nextProxyId = nextBound.proxyId;
				nextProxy = this.m_proxyPool[nextProxyId];
				nextBound.stabbingCount--;
				if((nextBound.value & 1) == 1) {
					if(this.TestOverlap(oldValues,nextProxy)) this.m_pairManager.RemoveBufferedPair(proxyId,nextProxyId);
					as3arr = nextProxy.upperBounds;
					as3int = as3arr[axis1];
					as3int--;
					as3arr[axis1] = as3int;
					bound.stabbingCount--;
				} else {
					as3arr = nextProxy.lowerBounds;
					as3int = as3arr[axis1];
					as3int--;
					as3arr[axis1] = as3int;
					bound.stabbingCount++;
				}
				as3arr = proxy.lowerBounds;
				as3int = as3arr[axis1];
				as3int++;
				as3arr[axis1] = as3int;
				bound.Swap(nextBound);
				index++;
			}
		}
		if(deltaUpper < 0) {
			index = upperIndex;
			while(index > 0 && upperValue < bounds[index - 1].value) {
				bound = bounds[index];
				prevBound = bounds[index - 1];
				prevProxyId = prevBound.proxyId;
				prevProxy = this.m_proxyPool[prevProxyId];
				prevBound.stabbingCount--;
				if((prevBound.value & 1) == 0 == true) {
					if(this.TestOverlap(oldValues,prevProxy)) this.m_pairManager.RemoveBufferedPair(proxyId,prevProxyId);
					as3arr = prevProxy.lowerBounds;
					as3int = as3arr[axis1];
					as3int++;
					as3arr[axis1] = as3int;
					bound.stabbingCount--;
				} else {
					as3arr = prevProxy.upperBounds;
					as3int = as3arr[axis1];
					as3int++;
					as3arr[axis1] = as3int;
					bound.stabbingCount++;
				}
				as3arr = proxy.upperBounds;
				as3int = as3arr[axis1];
				as3int--;
				as3arr[axis1] = as3int;
				bound.Swap(prevBound);
				index--;
			}
		}
	}
}
box2D.collision.B2BroadPhase.prototype.Commit = function() {
	this.m_pairManager.Commit();
}
box2D.collision.B2BroadPhase.prototype.QueryAABB = function(aabb,userData,maxCount) {
	var lowerValues = new Array();
	var upperValues = new Array();
	this.ComputeBounds(lowerValues,upperValues,aabb);
	var lowerIndex = 0;
	var upperIndex = 0;
	var lowerIndexOut = [lowerIndex];
	var upperIndexOut = [upperIndex];
	this.Query(lowerIndexOut,upperIndexOut,lowerValues[0],upperValues[0],this.m_bounds[0],2 * this.m_proxyCount,0);
	this.Query(lowerIndexOut,upperIndexOut,lowerValues[1],upperValues[1],this.m_bounds[1],2 * this.m_proxyCount,1);
	var count = 0;
	var i = 0;
	while(i < this.m_queryResultCount && count < maxCount) {
		var proxy = this.m_proxyPool[this.m_queryResults[i]];
		userData[i] = proxy.userData;
		++i;
		++count;
	}
	this.m_queryResultCount = 0;
	this.IncrementTimeStamp();
	return count;
}
box2D.collision.B2BroadPhase.prototype.Validate = function() {
	var pair;
	var proxy1;
	var proxy2;
	var overlap;
	var _g = 0;
	while(_g < 2) {
		var axis = _g++;
		var bounds = this.m_bounds[axis];
		var boundCount = 2 * this.m_proxyCount;
		var stabbingCount = 0;
		var _g1 = 0;
		while(_g1 < boundCount) {
			var i = _g1++;
			var bound = bounds[i];
			if((bound.value & 1) == 0 == true) stabbingCount++; else stabbingCount--;
		}
	}
}
box2D.collision.B2BroadPhase.prototype.ComputeBounds = function(lowerValues,upperValues,aabb) {
	var minVertexX = aabb.lowerBound.x;
	var minVertexY = aabb.lowerBound.y;
	minVertexX = box2D.common.math.B2Math.b2Min(minVertexX,this.m_worldAABB.upperBound.x);
	minVertexY = box2D.common.math.B2Math.b2Min(minVertexY,this.m_worldAABB.upperBound.y);
	minVertexX = box2D.common.math.B2Math.b2Max(minVertexX,this.m_worldAABB.lowerBound.x);
	minVertexY = box2D.common.math.B2Math.b2Max(minVertexY,this.m_worldAABB.lowerBound.y);
	var maxVertexX = aabb.upperBound.x;
	var maxVertexY = aabb.upperBound.y;
	maxVertexX = box2D.common.math.B2Math.b2Min(maxVertexX,this.m_worldAABB.upperBound.x);
	maxVertexY = box2D.common.math.B2Math.b2Min(maxVertexY,this.m_worldAABB.upperBound.y);
	maxVertexX = box2D.common.math.B2Math.b2Max(maxVertexX,this.m_worldAABB.lowerBound.x);
	maxVertexY = box2D.common.math.B2Math.b2Max(maxVertexY,this.m_worldAABB.lowerBound.y);
	lowerValues[0] = Std["int"](this.m_quantizationFactor.x * (minVertexX - this.m_worldAABB.lowerBound.x)) & 65534;
	upperValues[0] = Std["int"](this.m_quantizationFactor.x * (maxVertexX - this.m_worldAABB.lowerBound.x)) & 65535 | 1;
	lowerValues[1] = Std["int"](this.m_quantizationFactor.y * (minVertexY - this.m_worldAABB.lowerBound.y)) & 65534;
	upperValues[1] = Std["int"](this.m_quantizationFactor.y * (maxVertexY - this.m_worldAABB.lowerBound.y)) & 65535 | 1;
}
box2D.collision.B2BroadPhase.prototype.TestOverlapValidate = function(p1,p2) {
	var _g = 0;
	while(_g < 2) {
		var axis = _g++;
		var bounds = this.m_bounds[axis];
		var bound1 = bounds[p1.lowerBounds[axis]];
		var bound2 = bounds[p2.upperBounds[axis]];
		if(bound1.value > bound2.value) return false;
		bound1 = bounds[p1.upperBounds[axis]];
		bound2 = bounds[p2.lowerBounds[axis]];
		if(bound1.value < bound2.value) return false;
	}
	return true;
}
box2D.collision.B2BroadPhase.prototype.TestOverlap = function(b,p) {
	var _g = 0;
	while(_g < 2) {
		var axis = _g++;
		var bounds = this.m_bounds[axis];
		var bound = bounds[p.upperBounds[axis]];
		if(b.lowerValues[axis] > bound.value) return false;
		bound = bounds[p.lowerBounds[axis]];
		if(b.upperValues[axis] < bound.value) return false;
	}
	return true;
}
box2D.collision.B2BroadPhase.prototype.Query = function(lowerQueryOut,upperQueryOut,lowerValue,upperValue,bounds,boundCount,axis) {
	var lowerQuery = box2D.collision.B2BroadPhase.BinarySearch(bounds,boundCount,lowerValue);
	var upperQuery = box2D.collision.B2BroadPhase.BinarySearch(bounds,boundCount,upperValue);
	var bound;
	var j = lowerQuery;
	while(j < upperQuery) {
		bound = bounds[j];
		if((bound.value & 1) == 0) this.IncrementOverlapCount(bound.proxyId);
		++j;
	}
	if(lowerQuery > 0) {
		var i = lowerQuery - 1;
		bound = bounds[i];
		var s = bound.stabbingCount;
		while(s != 0) {
			bound = bounds[i];
			if((bound.value & 1) == 0) {
				var proxy = this.m_proxyPool[bound.proxyId];
				if(lowerQuery <= proxy.upperBounds[axis]) {
					this.IncrementOverlapCount(bound.proxyId);
					--s;
				}
			}
			--i;
		}
	}
	lowerQueryOut[0] = lowerQuery;
	upperQueryOut[0] = upperQuery;
}
box2D.collision.B2BroadPhase.prototype.IncrementOverlapCount = function(proxyId) {
	var proxy = this.m_proxyPool[proxyId];
	if(proxy.timeStamp < this.m_timeStamp) {
		proxy.timeStamp = this.m_timeStamp;
		proxy.overlapCount = 1;
	} else {
		proxy.overlapCount = 2;
		this.m_queryResults[this.m_queryResultCount] = proxyId;
		++this.m_queryResultCount;
	}
}
box2D.collision.B2BroadPhase.prototype.IncrementTimeStamp = function() {
	if(this.m_timeStamp == 65535) {
		var _g = 0;
		while(_g < 512) {
			var i = _g++;
			this.m_proxyPool[i].timeStamp = 0;
		}
		this.m_timeStamp = 1;
	} else ++this.m_timeStamp;
}
box2D.collision.B2BroadPhase.prototype.m_pairManager = null;
box2D.collision.B2BroadPhase.prototype.m_proxyPool = null;
box2D.collision.B2BroadPhase.prototype.m_freeProxy = null;
box2D.collision.B2BroadPhase.prototype.m_bounds = null;
box2D.collision.B2BroadPhase.prototype.m_queryResults = null;
box2D.collision.B2BroadPhase.prototype.m_queryResultCount = null;
box2D.collision.B2BroadPhase.prototype.m_worldAABB = null;
box2D.collision.B2BroadPhase.prototype.m_quantizationFactor = null;
box2D.collision.B2BroadPhase.prototype.m_proxyCount = null;
box2D.collision.B2BroadPhase.prototype.m_timeStamp = null;
box2D.collision.B2BroadPhase.prototype.__class__ = box2D.collision.B2BroadPhase;
if(typeof fboyle=='undefined') fboyle = {}
if(!fboyle.layout) fboyle.layout = {}
fboyle.layout.FlaBox2dLayout = function(xml) {
	if( xml === $_ ) return;
	this.onFilesLoaded = new hxs.Signal1();
	this.flaLayout = new fboyle.layout.FlaLayout(xml);
	this.flaLayout.onFilesLoaded.add($closure(this,"_onFilesLoaded"));
	this.xml = Xml.parse(xml);
	this.fast = new haxe.xml.Fast(this.xml);
	this.layouts = new Hash();
	var $it0 = this.fast.nodes.resolve("layout").iterator();
	while( $it0.hasNext() ) {
		var n = $it0.next();
		this.layouts.set(n.att.resolve("name"),n);
	}
	var displayType = "flash";
	displayType = "easeljs";
	this.displayList = fboyle.display.DisplayFactory.setDisplayList(displayType);
}
fboyle.layout.FlaBox2dLayout.__name__ = ["fboyle","layout","FlaBox2dLayout"];
fboyle.layout.FlaBox2dLayout.prototype.onFilesLoaded = null;
fboyle.layout.FlaBox2dLayout.prototype.xml = null;
fboyle.layout.FlaBox2dLayout.prototype.fast = null;
fboyle.layout.FlaBox2dLayout.prototype.layouts = null;
fboyle.layout.FlaBox2dLayout.prototype.displayList = null;
fboyle.layout.FlaBox2dLayout.prototype.flaLayout = null;
fboyle.layout.FlaBox2dLayout.prototype.simulation = null;
fboyle.layout.FlaBox2dLayout.prototype._onFilesLoaded = function(str) {
	this.flaLayout.onFilesLoaded.remove($closure(this,"_onFilesLoaded"));
	this.onFilesLoaded.dispatch(str);
}
fboyle.layout.FlaBox2dLayout.prototype.getLayoutInfo = function(name) {
	if(!this.layouts.exists(name)) return null;
	var lo = this.layouts.get(name);
	return { width : Std.parseFloat(lo.att.resolve("w")), height : Std.parseFloat(lo.att.resolve("h"))};
}
fboyle.layout.FlaBox2dLayout.prototype.buildLayout = function(layout,simulation) {
	this.simulation = simulation;
	if(layout == null) throw "Layout does not exist";
	var $it0 = layout.x.elements();
	while( $it0.hasNext() ) {
		var child = $it0.next();
		switch(child.getNodeName()) {
		case "gameObject":
			this.createGameObject(new haxe.xml.Fast(child));
			break;
		case "body":
			this.createBody(new haxe.xml.Fast(child));
			break;
		case "movieclip":
			this.createMovieClip(new haxe.xml.Fast(child),simulation.container);
			break;
		case "bitmap":
			this.flaLayout.createBitmap(new haxe.xml.Fast(child),simulation.container);
			break;
		case "empty":
			this.createEmpty(new haxe.xml.Fast(child));
			break;
		}
	}
}
fboyle.layout.FlaBox2dLayout.prototype.createMovieClip = function(objectInfo,layoutContainer) {
	var mc = this.flaLayout.createMovieClip(objectInfo,layoutContainer);
	if(this.simulation != null) {
		if(this.simulation.nonGameObjects != null) this.simulation.nonGameObjects.set(objectInfo.att.resolve("name"),mc);
	}
}
fboyle.layout.FlaBox2dLayout.prototype.createEmpty = function(objectInfo) {
	var rot = 0.0;
	if(objectInfo.has.resolve("r")) rot = Std.parseFloat(objectInfo.att.resolve("r"));
	var empty = new fboyle.layout.EmptyVo(objectInfo.att.resolve("name"),objectInfo.att.resolve("id"),objectInfo.att.resolve("extraInfo"),Std.parseFloat(objectInfo.att.resolve("x")),Std.parseFloat(objectInfo.att.resolve("y")),rot);
	if(this.simulation != null) {
		if(this.simulation.emptyObjects != null) this.simulation.emptyObjects.set(objectInfo.att.resolve("name"),empty);
	}
}
fboyle.layout.FlaBox2dLayout.prototype.createGameObject = function(objectInfo) {
	var n = objectInfo.att.resolve("definition");
	var c = Type.resolveClass(n);
	if(c == null) throw "Class: " + n + " cannot be built, as it doesnt exist";
	var object = Type.createInstance(c,[this.simulation]);
	object.name = objectInfo.att.resolve("name");
	object.info = objectInfo;
	object.container.x = Std.parseFloat(objectInfo.att.resolve("x"));
	object.container.y = Std.parseFloat(objectInfo.att.resolve("y"));
	object.container.scaleX = Std.parseFloat(objectInfo.att.resolve("sx"));
	object.container.scaleY = Std.parseFloat(objectInfo.att.resolve("sy"));
	object.container.rotation = Std.parseFloat(objectInfo.att.resolve("r"));
	if(objectInfo.att.resolve("name") != "") this.simulation.namedObjects.set(objectInfo.att.resolve("name"),object);
	this.simulation.objects.push(object);
	this.simulation.container.addChild(object.container);
	var $it0 = objectInfo.x.elements();
	while( $it0.hasNext() ) {
		var child = $it0.next();
		switch(child.getNodeName()) {
		case "body":
			this.createBody(new haxe.xml.Fast(child),object);
			break;
		}
	}
}
fboyle.layout.FlaBox2dLayout.prototype.createBody = function(bodyInfo,gameObject) {
	var body = new touchmypixel.game.objects.BuilderBodyObject(this.simulation);
	body.name = bodyInfo.att.resolve("name");
	body.info = bodyInfo;
	body.gameObject = gameObject;
	body.type = bodyInfo.att.resolve("type");
	body.container.scaleX = Std.parseFloat(bodyInfo.att.resolve("sx"));
	body.container.scaleY = Std.parseFloat(bodyInfo.att.resolve("sy"));
	if(bodyInfo.att.resolve("name") != "") this.simulation.namedObjects.set(bodyInfo.att.resolve("name"),body);
	var bodyDef = new box2D.dynamics.B2BodyDef();
	if(gameObject != null) {
		var r = gameObject.container.rotation * Math.PI / 180;
		var ox = Std.parseFloat(bodyInfo.att.resolve("x")) * gameObject.container.scaleX;
		var oy = Std.parseFloat(bodyInfo.att.resolve("y")) * gameObject.container.scaleY;
		var nx = ox * Math.cos(r) - oy * Math.sin(r);
		var ny = oy * Math.cos(r) + ox * Math.sin(r);
		bodyDef.position.x = (nx + gameObject.container.x) / this.simulation.scale;
		bodyDef.position.y = (ny + gameObject.container.y) / this.simulation.scale;
		bodyDef.angle = r + Std.parseFloat(bodyInfo.att.resolve("r")) * Math.PI / 180;
		var rot = bodyInfo.att.resolve("fixedRotation") == "true"?true:false;
		bodyDef.fixedRotation = rot;
	} else {
		bodyDef.position.x = Std.parseFloat(bodyInfo.att.resolve("x")) / this.simulation.scale;
		bodyDef.position.y = Std.parseFloat(bodyInfo.att.resolve("y")) / this.simulation.scale;
		bodyDef.angle = Std.parseFloat(bodyInfo.att.resolve("r")) * Math.PI / 180;
	}
	bodyDef.isBullet = true;
	var b2body = this.simulation.world.CreateBody(bodyDef);
	b2body.SetUserData(body);
	var $it0 = bodyInfo.x.elements();
	while( $it0.hasNext() ) {
		var elementInfo = $it0.next();
		var fastEl = new haxe.xml.Fast(elementInfo);
		var shapes = (function($this) {
			var $r;
			switch(elementInfo.getNodeName()) {
			case "poly":
				$r = [$this.parsePoly(fastEl,bodyInfo)];
				break;
			case "circle":
				$r = [$this.parseCircle(fastEl,bodyInfo)];
				break;
			case "rect":
				$r = [$this.parsePoly(fastEl,bodyInfo)];
				break;
			case "shape":
				$r = $this.parseShape(fastEl,bodyInfo);
				break;
			}
			return $r;
		}(this));
		if(shapes != null) {
			var geom = new touchmypixel.game.objects.LBGeometry();
			geom.body = body;
			geom.shapes = new Array();
			if(fastEl.has.resolve("name")) {
				geom.name = fastEl.att.resolve("name");
				body.namedGeometry.set(geom.name,geom);
			}
			geom.cacheContacts = fastEl.has.resolve("cacheContacts") && fastEl.att.resolve("cacheContacts") == "true";
			var _g = 0;
			while(_g < shapes.length) {
				var shape = shapes[_g];
				++_g;
				if(shape != null) {
					if(bodyInfo.has.resolve("categoryBits")) shape.filter.categoryBits = Std.parseInt(bodyInfo.att.resolve("categoryBits"));
					if(bodyInfo.has.resolve("maskBits")) shape.filter.maskBits = Std.parseInt(bodyInfo.att.resolve("maskBits"));
					if(bodyInfo.has.resolve("groupIndex")) shape.filter.groupIndex = Std.parseInt(bodyInfo.att.resolve("groupIndex"));
					if(bodyInfo.x.exists("sensor")) shape.isSensor = bodyInfo.att.resolve("sensor") == "true";
					var s = b2body.CreateShape(shape);
					s.m_userData = geom;
					geom.shapes.push(s);
				}
			}
			body.geometry.push(geom);
		}
		switch(elementInfo.getNodeName()) {
		case "bitmap":
			this.flaLayout.createBitmap(new haxe.xml.Fast(elementInfo),body.container);
			break;
		}
	}
	b2body.SetMassFromShapes();
	body.body = b2body;
	if(gameObject != null) {
		gameObject.bodies.push(body);
		if(bodyInfo.att.resolve("name") != null && bodyInfo.att.resolve("name") != "") {
			if(gameObject.info.att.resolve("autoSyncToBody") == bodyInfo.att.resolve("name")) {
				var t = { x : Std.parseFloat(bodyInfo.att.resolve("x")), y : Std.parseFloat(bodyInfo.att.resolve("y")), rotation : Std.parseFloat(bodyInfo.att.resolve("r"))};
				gameObject.autoSyncToBody = body;
				gameObject.autoSyncTransform = t;
			}
			var fields = Type.getInstanceFields(Type.getClass(gameObject));
			if(Lambda.has(fields,bodyInfo.att.resolve("name"))) gameObject[bodyInfo.att.resolve("name")] = body;
		}
	}
	this.simulation.objects.push(body);
	this.simulation.container.addChild(body.container);
}
fboyle.layout.FlaBox2dLayout.prototype.parseShape = function(shapeInfo,bodyInfo) {
	haxe.Log.trace("parseShape bitches",{ fileName : "FlaBox2dLayout.hx", lineNumber : 423, className : "fboyle.layout.FlaBox2dLayout", methodName : "parseShape"});
	var shapes = new Array();
	var $it0 = shapeInfo.x.elements();
	while( $it0.hasNext() ) {
		var childInfo = $it0.next();
		var shape = (function($this) {
			var $r;
			switch(childInfo.getNodeName()) {
			case "poly":
				$r = $this.parsePoly(new haxe.xml.Fast(childInfo),bodyInfo);
				break;
			case "circle":
				$r = $this.parseCircle(new haxe.xml.Fast(childInfo),bodyInfo);
				break;
			case "rect":
				$r = $this.parsePoly(new haxe.xml.Fast(childInfo),bodyInfo);
				break;
			}
			return $r;
		}(this));
		if(shape != null) {
			if(shapeInfo.att.resolve("name") != "") {
			}
			shape.isSensor = shapeInfo.att.resolve("isSensor") == "true";
			shapes.push(shape);
		}
	}
	return shapes;
}
fboyle.layout.FlaBox2dLayout.prototype.parsePoly = function(el,bodyInfo) {
	var verts = [];
	var $it0 = el.nodes.resolve("vert").iterator();
	while( $it0.hasNext() ) {
		var vert = $it0.next();
		verts.push([Std.parseFloat(vert.att.resolve("x")),Std.parseFloat(vert.att.resolve("y"))]);
	}
	var shape = touchmypixel.game.box2d.ShapeTools.polygon(this.simulation.scale,verts,Std.parseFloat(el.att.resolve("x")) * Std.parseFloat(bodyInfo.att.resolve("sx")),Std.parseFloat(el.att.resolve("y")) * Std.parseFloat(bodyInfo.att.resolve("sy")),Std.parseFloat(el.att.resolve("r")),Std.parseFloat(el.att.resolve("sx")) * Std.parseFloat(bodyInfo.att.resolve("sx")),Std.parseFloat(el.att.resolve("sy")) * Std.parseFloat(bodyInfo.att.resolve("sy")));
	var isStatic = bodyInfo.att.resolve("static") == "true";
	shape.density = isStatic?0:Std.parseFloat(bodyInfo.att.resolve("density"));
	shape.restitution = Std.parseFloat(bodyInfo.att.resolve("restitution"));
	shape.friction = Std.parseFloat(bodyInfo.att.resolve("friction"));
	return shape;
}
fboyle.layout.FlaBox2dLayout.prototype.parseCircle = function(el,bodyInfo) {
	var shape = touchmypixel.game.box2d.ShapeTools.circle(this.simulation.scale,Std.parseFloat(el.att.resolve("x")) * Std.parseFloat(bodyInfo.att.resolve("sx")),Std.parseFloat(el.att.resolve("y")) * Std.parseFloat(bodyInfo.att.resolve("sy")),Std.parseFloat(el.att.resolve("w")) / 2,Std.parseFloat(bodyInfo.att.resolve("sx")),Std.parseFloat(bodyInfo.att.resolve("sy")));
	var isStatic = bodyInfo.att.resolve("static") == "true";
	shape.density = isStatic?0:Std.parseFloat(bodyInfo.att.resolve("density"));
	shape.restitution = Std.parseFloat(bodyInfo.att.resolve("restitution"));
	shape.friction = Std.parseFloat(bodyInfo.att.resolve("friction"));
	return shape;
}
fboyle.layout.FlaBox2dLayout.prototype.f = function(v) {
	return Std.parseFloat(v);
}
fboyle.layout.FlaBox2dLayout.prototype.__class__ = fboyle.layout.FlaBox2dLayout;
box2D.dynamics.contacts.B2ContactResult = function(p) {
	if( p === $_ ) return;
	this.position = new box2D.common.math.B2Vec2();
	this.normal = new box2D.common.math.B2Vec2();
	this.id = new box2D.collision.B2ContactID();
	this.normalImpulse = 0.0;
	this.tangentImpulse = 0.0;
}
box2D.dynamics.contacts.B2ContactResult.__name__ = ["box2D","dynamics","contacts","B2ContactResult"];
box2D.dynamics.contacts.B2ContactResult.prototype.shape1 = null;
box2D.dynamics.contacts.B2ContactResult.prototype.shape2 = null;
box2D.dynamics.contacts.B2ContactResult.prototype.position = null;
box2D.dynamics.contacts.B2ContactResult.prototype.normal = null;
box2D.dynamics.contacts.B2ContactResult.prototype.normalImpulse = null;
box2D.dynamics.contacts.B2ContactResult.prototype.tangentImpulse = null;
box2D.dynamics.contacts.B2ContactResult.prototype.id = null;
box2D.dynamics.contacts.B2ContactResult.prototype.__class__ = box2D.dynamics.contacts.B2ContactResult;
box2D.dynamics.B2Island = function(bodyCapacity,contactCapacity,jointCapacity,allocator,listener) {
	if( bodyCapacity === $_ ) return;
	var i;
	this.m_bodyCapacity = bodyCapacity;
	this.m_contactCapacity = contactCapacity;
	this.m_jointCapacity = jointCapacity;
	this.m_bodyCount = 0;
	this.m_contactCount = 0;
	this.m_jointCount = 0;
	this.m_allocator = allocator;
	this.m_listener = listener;
	this.m_bodies = new Array();
	this.m_contacts = new Array();
	this.m_joints = new Array();
	this.m_positionIterationCount = 0;
}
box2D.dynamics.B2Island.__name__ = ["box2D","dynamics","B2Island"];
box2D.dynamics.B2Island.prototype.Clear = function() {
	this.m_bodyCount = 0;
	this.m_contactCount = 0;
	this.m_jointCount = 0;
}
box2D.dynamics.B2Island.prototype.Solve = function(step,gravity,correctPositions,allowSleep) {
	var b;
	var joint;
	var _g1 = 0, _g = this.m_bodyCount;
	while(_g1 < _g) {
		var i = _g1++;
		b = this.m_bodies[i];
		if(b.IsStatic()) continue;
		b.m_linearVelocity.x += step.dt * (gravity.x + b.m_invMass * b.m_force.x);
		b.m_linearVelocity.y += step.dt * (gravity.y + b.m_invMass * b.m_force.y);
		b.m_angularVelocity += step.dt * b.m_invI * b.m_torque;
		b.m_force.SetZero();
		b.m_torque = 0.0;
		b.m_linearVelocity.Multiply(box2D.common.math.B2Math.b2Clamp(1.0 - step.dt * b.m_linearDamping,0.0,1.0));
		b.m_angularVelocity *= box2D.common.math.B2Math.b2Clamp(1.0 - step.dt * b.m_angularDamping,0.0,1.0);
		if(b.m_linearVelocity.LengthSquared() > box2D.common.B2Settings.b2_maxLinearVelocitySquared) {
			b.m_linearVelocity.Normalize();
			b.m_linearVelocity.x *= 200.0;
			b.m_linearVelocity.y *= 200.0;
		}
		if(b.m_angularVelocity * b.m_angularVelocity > box2D.common.B2Settings.b2_maxAngularVelocitySquared) {
			if(b.m_angularVelocity < 0.0) b.m_angularVelocity = -250.; else b.m_angularVelocity = 250.0;
		}
	}
	var contactSolver = new box2D.dynamics.contacts.B2ContactSolver(step,this.m_contacts,this.m_contactCount,this.m_allocator);
	contactSolver.InitVelocityConstraints(step);
	var _g1 = 0, _g = this.m_jointCount;
	while(_g1 < _g) {
		var i = _g1++;
		joint = this.m_joints[i];
		joint.InitVelocityConstraints(step);
	}
	var _g1 = 0, _g = step.maxIterations;
	while(_g1 < _g) {
		var i = _g1++;
		contactSolver.SolveVelocityConstraints();
		var _g3 = 0, _g2 = this.m_jointCount;
		while(_g3 < _g2) {
			var j = _g3++;
			joint = this.m_joints[j];
			joint.SolveVelocityConstraints(step);
		}
	}
	contactSolver.FinalizeVelocityConstraints();
	var _g1 = 0, _g = this.m_bodyCount;
	while(_g1 < _g) {
		var i = _g1++;
		b = this.m_bodies[i];
		if(b.IsStatic()) continue;
		b.m_sweep.c0.SetV(b.m_sweep.c);
		b.m_sweep.a0 = b.m_sweep.a;
		b.m_sweep.c.x += step.dt * b.m_linearVelocity.x;
		b.m_sweep.c.y += step.dt * b.m_linearVelocity.y;
		b.m_sweep.a += step.dt * b.m_angularVelocity;
		b.SynchronizeTransform();
	}
	if(correctPositions) {
		var _g1 = 0, _g = this.m_jointCount;
		while(_g1 < _g) {
			var i = _g1++;
			joint = this.m_joints[i];
			joint.InitPositionConstraints();
		}
		var _g1 = 0, _g = step.maxIterations;
		while(_g1 < _g) {
			var m_positionIterationCount = _g1++;
			var contactsOkay = contactSolver.SolvePositionConstraints(0.2);
			var jointsOkay = true;
			var _g3 = 0, _g2 = this.m_jointCount;
			while(_g3 < _g2) {
				var i = _g3++;
				joint = this.m_joints[i];
				var jointOkay = joint.SolvePositionConstraints();
				jointsOkay = jointsOkay && jointOkay;
			}
			if(contactsOkay && jointsOkay) break;
		}
	}
	this.Report(contactSolver.m_constraints);
	if(allowSleep) {
		var minSleepTime = 2.0 + 308;
		var linTolSqr = 0.0001;
		var angTolSqr = box2D.common.B2Settings.b2_angularSleepTolerance * box2D.common.B2Settings.b2_angularSleepTolerance;
		var _g1 = 0, _g = this.m_bodyCount;
		while(_g1 < _g) {
			var i = _g1++;
			b = this.m_bodies[i];
			if(b.m_invMass == 0.0) continue;
			if((b.m_flags & 16) == 0) {
				b.m_sleepTime = 0.0;
				minSleepTime = 0.0;
			}
			if((b.m_flags & 16) == 0 || b.m_angularVelocity * b.m_angularVelocity > angTolSqr || box2D.common.math.B2Math.b2Dot(b.m_linearVelocity,b.m_linearVelocity) > linTolSqr) {
				b.m_sleepTime = 0.0;
				minSleepTime = 0.0;
			} else {
				b.m_sleepTime += step.dt;
				minSleepTime = box2D.common.math.B2Math.b2Min(minSleepTime,b.m_sleepTime);
			}
		}
		if(minSleepTime >= 0.5) {
			var _g1 = 0, _g = this.m_bodyCount;
			while(_g1 < _g) {
				var i = _g1++;
				b = this.m_bodies[i];
				b.m_flags |= 8;
				b.m_linearVelocity.SetZero();
				b.m_angularVelocity = 0.0;
			}
		}
	}
}
box2D.dynamics.B2Island.prototype.SolveTOI = function(subStep) {
	var contactSolver = new box2D.dynamics.contacts.B2ContactSolver(subStep,this.m_contacts,this.m_contactCount,this.m_allocator);
	var _g1 = 0, _g = subStep.maxIterations;
	while(_g1 < _g) {
		var i = _g1++;
		contactSolver.SolveVelocityConstraints();
	}
	var _g1 = 0, _g = this.m_bodyCount;
	while(_g1 < _g) {
		var i = _g1++;
		var b = this.m_bodies[i];
		if(b.IsStatic()) continue;
		b.m_sweep.c0.SetV(b.m_sweep.c);
		b.m_sweep.a0 = b.m_sweep.a;
		b.m_sweep.c.x += subStep.dt * b.m_linearVelocity.x;
		b.m_sweep.c.y += subStep.dt * b.m_linearVelocity.y;
		b.m_sweep.a += subStep.dt * b.m_angularVelocity;
		b.SynchronizeTransform();
	}
	var k_toiBaumgarte = 0.75;
	var _g1 = 0, _g = subStep.maxIterations;
	while(_g1 < _g) {
		var i = _g1++;
		var contactsOkay = contactSolver.SolvePositionConstraints(k_toiBaumgarte);
		if(contactsOkay) break;
	}
	this.Report(contactSolver.m_constraints);
}
box2D.dynamics.B2Island.prototype.Report = function(constraints) {
	var tMat;
	var tVec;
	if(this.m_listener == null) return;
	var _g1 = 0, _g = this.m_contactCount;
	while(_g1 < _g) {
		var i = _g1++;
		var c = this.m_contacts[i];
		var cc = constraints[i];
		var cr = box2D.dynamics.B2Island.s_reportCR;
		cr.shape1 = c.m_shape1;
		cr.shape2 = c.m_shape2;
		var b1 = cr.shape1.m_body;
		var manifoldCount = c.m_manifoldCount;
		var manifolds = c.GetManifolds();
		var _g2 = 0;
		while(_g2 < manifoldCount) {
			var j = _g2++;
			var manifold = manifolds[j];
			cr.normal.SetV(manifold.normal);
			var _g4 = 0, _g3 = manifold.pointCount;
			while(_g4 < _g3) {
				var k = _g4++;
				var point = manifold.points[k];
				var ccp = cc.points[k];
				cr.position = b1.GetWorldPoint(point.localPoint1);
				cr.normalImpulse = ccp.normalImpulse;
				cr.tangentImpulse = ccp.tangentImpulse;
				cr.id.setKey(point.id.getKey());
				this.m_listener.Result(cr);
			}
		}
	}
}
box2D.dynamics.B2Island.prototype.AddBody = function(body) {
	this.m_bodies[this.m_bodyCount++] = body;
}
box2D.dynamics.B2Island.prototype.AddContact = function(contact) {
	this.m_contacts[this.m_contactCount++] = contact;
}
box2D.dynamics.B2Island.prototype.AddJoint = function(joint) {
	this.m_joints[this.m_jointCount++] = joint;
}
box2D.dynamics.B2Island.prototype.m_allocator = null;
box2D.dynamics.B2Island.prototype.m_listener = null;
box2D.dynamics.B2Island.prototype.m_bodies = null;
box2D.dynamics.B2Island.prototype.m_contacts = null;
box2D.dynamics.B2Island.prototype.m_joints = null;
box2D.dynamics.B2Island.prototype.m_bodyCount = null;
box2D.dynamics.B2Island.prototype.m_jointCount = null;
box2D.dynamics.B2Island.prototype.m_contactCount = null;
box2D.dynamics.B2Island.prototype.m_bodyCapacity = null;
box2D.dynamics.B2Island.prototype.m_contactCapacity = null;
box2D.dynamics.B2Island.prototype.m_jointCapacity = null;
box2D.dynamics.B2Island.prototype.m_positionIterationCount = null;
box2D.dynamics.B2Island.prototype.__class__ = box2D.dynamics.B2Island;
if(!box2D.collision.shapes) box2D.collision.shapes = {}
box2D.collision.shapes.B2MassData = function(p) {
	if( p === $_ ) return;
	this.mass = 0.0;
	this.center = new box2D.common.math.B2Vec2(0.0,0.0);
	this.I = 0.0;
}
box2D.collision.shapes.B2MassData.__name__ = ["box2D","collision","shapes","B2MassData"];
box2D.collision.shapes.B2MassData.prototype.mass = null;
box2D.collision.shapes.B2MassData.prototype.center = null;
box2D.collision.shapes.B2MassData.prototype.I = null;
box2D.collision.shapes.B2MassData.prototype.__class__ = box2D.collision.shapes.B2MassData;
box2D.common.math.B2XForm = function(pos,r) {
	if( pos === $_ ) return;
	this.position = new box2D.common.math.B2Vec2();
	this.R = new box2D.common.math.B2Mat22();
	if(pos != null) this.position.SetV(pos);
	if(r != null) this.R.SetM(r);
}
box2D.common.math.B2XForm.__name__ = ["box2D","common","math","B2XForm"];
box2D.common.math.B2XForm.prototype.Initialize = function(pos,r) {
	this.position.SetV(pos);
	this.R.SetM(r);
}
box2D.common.math.B2XForm.prototype.SetIdentity = function() {
	this.position.SetZero();
	this.R.SetIdentity();
}
box2D.common.math.B2XForm.prototype.Set = function(x) {
	this.position.SetV(x.position);
	this.R.SetM(x.R);
}
box2D.common.math.B2XForm.prototype.position = null;
box2D.common.math.B2XForm.prototype.R = null;
box2D.common.math.B2XForm.prototype.__class__ = box2D.common.math.B2XForm;
box2D.dynamics.B2Body = function(bd,world) {
	if( bd === $_ ) return;
	this.m_xf = new box2D.common.math.B2XForm();
	this.m_sweep = new box2D.common.math.B2Sweep();
	this.m_linearVelocity = new box2D.common.math.B2Vec2();
	this.m_force = new box2D.common.math.B2Vec2();
	this.m_flags = 0;
	if(bd.isBullet) this.m_flags |= 32;
	if(bd.fixedRotation) this.m_flags |= 64;
	if(bd.allowSleep) this.m_flags |= 16;
	if(bd.isSleeping) this.m_flags |= 8;
	this.m_world = world;
	this.m_xf.position.SetV(bd.position);
	this.m_xf.R.Set(bd.angle);
	this.m_sweep.localCenter.SetV(bd.massData.center);
	this.m_sweep.t0 = 1.0;
	this.m_sweep.a0 = this.m_sweep.a = bd.angle;
	var tMat = this.m_xf.R;
	var tVec = this.m_sweep.localCenter;
	this.m_sweep.c.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	this.m_sweep.c.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	this.m_sweep.c.x += this.m_xf.position.x;
	this.m_sweep.c.y += this.m_xf.position.y;
	this.m_sweep.c0.SetV(this.m_sweep.c);
	this.m_jointList = null;
	this.m_contactList = null;
	this.m_prev = null;
	this.m_next = null;
	this.m_linearDamping = bd.linearDamping;
	this.m_angularDamping = bd.angularDamping;
	this.m_force.Set(0.0,0.0);
	this.m_torque = 0.0;
	this.m_linearVelocity.SetZero();
	this.m_angularVelocity = 0.0;
	this.m_sleepTime = 0.0;
	this.m_invMass = 0.0;
	this.m_I = 0.0;
	this.m_invI = 0.0;
	this.m_mass = bd.massData.mass;
	if(this.m_mass > 0.0) this.m_invMass = 1.0 / this.m_mass;
	if((this.m_flags & 64) == 0) this.m_I = bd.massData.I;
	if(this.m_I > 0.0) this.m_invI = 1.0 / this.m_I;
	if(this.m_invMass == 0.0 && this.m_invI == 0.0) this.m_type = 1; else this.m_type = 2;
	this.m_userData = bd.userData;
	this.m_shapeList = null;
	this.m_shapeCount = 0;
}
box2D.dynamics.B2Body.__name__ = ["box2D","dynamics","B2Body"];
box2D.dynamics.B2Body.prototype.CreateShape = function(def) {
	if(this.m_world.m_lock == true) return null;
	var s = box2D.collision.shapes.B2Shape.Create(def,this.m_world.m_blockAllocator);
	s.m_next = this.m_shapeList;
	this.m_shapeList = s;
	++this.m_shapeCount;
	s.m_body = this;
	s.CreateProxy(this.m_world.m_broadPhase,this.m_xf);
	s.UpdateSweepRadius(this.m_sweep.localCenter);
	return s;
}
box2D.dynamics.B2Body.prototype.DestroyShape = function(s) {
	if(this.m_world.m_lock == true) return;
	s.DestroyProxy(this.m_world.m_broadPhase);
	var node = this.m_shapeList;
	var ppS = null;
	var found = false;
	while(node != null) {
		if(node == s) {
			if(ppS != null) ppS.m_next = s.m_next; else this.m_shapeList = s.m_next;
			found = true;
			break;
		}
		ppS = node;
		node = node.m_next;
	}
	s.m_body = null;
	s.m_next = null;
	--this.m_shapeCount;
	box2D.collision.shapes.B2Shape.Destroy(s,this.m_world.m_blockAllocator);
}
box2D.dynamics.B2Body.prototype.SetMass = function(massData) {
	var s;
	if(this.m_world.m_lock == true) return;
	this.m_invMass = 0.0;
	this.m_I = 0.0;
	this.m_invI = 0.0;
	this.m_mass = massData.mass;
	if(this.m_mass > 0.0) this.m_invMass = 1.0 / this.m_mass;
	if((this.m_flags & 64) == 0) this.m_I = massData.I;
	if(this.m_I > 0.0) this.m_invI = 1.0 / this.m_I;
	this.m_sweep.localCenter.SetV(massData.center);
	var tMat = this.m_xf.R;
	var tVec = this.m_sweep.localCenter;
	this.m_sweep.c.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	this.m_sweep.c.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	this.m_sweep.c.x += this.m_xf.position.x;
	this.m_sweep.c.y += this.m_xf.position.y;
	this.m_sweep.c0.SetV(this.m_sweep.c);
	s = this.m_shapeList;
	while(s != null) {
		s.UpdateSweepRadius(this.m_sweep.localCenter);
		s = s.m_next;
	}
	var oldType = this.m_type;
	if(this.m_invMass == 0.0 && this.m_invI == 0.0) this.m_type = 1; else this.m_type = 2;
	if(oldType != this.m_type) {
		s = this.m_shapeList;
		while(s != null) {
			s.RefilterProxy(this.m_world.m_broadPhase,this.m_xf);
			s = s.m_next;
		}
	}
}
box2D.dynamics.B2Body.prototype.SetMassFromShapes = function() {
	var s;
	if(this.m_world.m_lock == true) return;
	this.m_mass = 0.0;
	this.m_invMass = 0.0;
	this.m_I = 0.0;
	this.m_invI = 0.0;
	var centerX = 0.0;
	var centerY = 0.0;
	var massData = box2D.dynamics.B2Body.s_massData;
	s = this.m_shapeList;
	while(s != null) {
		s.ComputeMass(massData);
		this.m_mass += massData.mass;
		centerX += massData.mass * massData.center.x;
		centerY += massData.mass * massData.center.y;
		this.m_I += massData.I;
		s = s.m_next;
	}
	if(this.m_mass > 0.0) {
		this.m_invMass = 1.0 / this.m_mass;
		centerX *= this.m_invMass;
		centerY *= this.m_invMass;
	}
	if(this.m_I > 0.0 && (this.m_flags & 64) == 0) {
		this.m_I -= this.m_mass * (centerX * centerX + centerY * centerY);
		this.m_invI = 1.0 / this.m_I;
	} else {
		this.m_I = 0.0;
		this.m_invI = 0.0;
	}
	this.m_sweep.localCenter.Set(centerX,centerY);
	var tMat = this.m_xf.R;
	var tVec = this.m_sweep.localCenter;
	this.m_sweep.c.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	this.m_sweep.c.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	this.m_sweep.c.x += this.m_xf.position.x;
	this.m_sweep.c.y += this.m_xf.position.y;
	this.m_sweep.c0.SetV(this.m_sweep.c);
	s = this.m_shapeList;
	while(s != null) {
		s.UpdateSweepRadius(this.m_sweep.localCenter);
		s = s.m_next;
	}
	var oldType = this.m_type;
	if(this.m_invMass == 0.0 && this.m_invI == 0.0) this.m_type = 1; else this.m_type = 2;
	if(oldType != this.m_type) {
		s = this.m_shapeList;
		while(s != null) {
			s.RefilterProxy(this.m_world.m_broadPhase,this.m_xf);
			s = s.m_next;
		}
	}
}
box2D.dynamics.B2Body.prototype.SetXForm = function(position,angle) {
	var s;
	if(this.m_world.m_lock == true) return true;
	if(this.IsFrozen()) return false;
	this.m_xf.R.Set(angle);
	this.m_xf.position.SetV(position);
	var tMat = this.m_xf.R;
	var tVec = this.m_sweep.localCenter;
	this.m_sweep.c.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	this.m_sweep.c.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	this.m_sweep.c.x += this.m_xf.position.x;
	this.m_sweep.c.y += this.m_xf.position.y;
	this.m_sweep.c0.SetV(this.m_sweep.c);
	this.m_sweep.a0 = this.m_sweep.a = angle;
	var freeze = false;
	s = this.m_shapeList;
	while(s != null) {
		var inRange = s.Synchronize(this.m_world.m_broadPhase,this.m_xf,this.m_xf);
		if(inRange == false) {
			freeze = true;
			break;
		}
		s = s.m_next;
	}
	if(freeze == true) {
		this.m_flags |= 2;
		this.m_linearVelocity.SetZero();
		this.m_angularVelocity = 0.0;
		s = this.m_shapeList;
		while(s != null) {
			s.DestroyProxy(this.m_world.m_broadPhase);
			s = s.m_next;
		}
		return false;
	}
	this.m_world.m_broadPhase.Commit();
	return true;
}
box2D.dynamics.B2Body.prototype.GetXForm = function() {
	return this.m_xf;
}
box2D.dynamics.B2Body.prototype.GetPosition = function() {
	return this.m_xf.position;
}
box2D.dynamics.B2Body.prototype.GetAngle = function() {
	return this.m_sweep.a;
}
box2D.dynamics.B2Body.prototype.GetWorldCenter = function() {
	return this.m_sweep.c;
}
box2D.dynamics.B2Body.prototype.GetLocalCenter = function() {
	return this.m_sweep.localCenter;
}
box2D.dynamics.B2Body.prototype.SetLinearVelocity = function(v) {
	this.m_linearVelocity.SetV(v);
}
box2D.dynamics.B2Body.prototype.GetLinearVelocity = function() {
	return this.m_linearVelocity;
}
box2D.dynamics.B2Body.prototype.SetAngularVelocity = function(omega) {
	this.m_angularVelocity = omega;
}
box2D.dynamics.B2Body.prototype.GetAngularVelocity = function() {
	return this.m_angularVelocity;
}
box2D.dynamics.B2Body.prototype.ApplyForce = function(force,point) {
	if(this.IsSleeping()) this.WakeUp();
	this.m_force.x += force.x;
	this.m_force.y += force.y;
	this.m_torque += (point.x - this.m_sweep.c.x) * force.y - (point.y - this.m_sweep.c.y) * force.x;
}
box2D.dynamics.B2Body.prototype.ApplyTorque = function(torque) {
	if(this.IsSleeping()) this.WakeUp();
	this.m_torque += torque;
}
box2D.dynamics.B2Body.prototype.ApplyImpulse = function(impulse,point) {
	if(this.IsSleeping()) this.WakeUp();
	this.m_linearVelocity.x += this.m_invMass * impulse.x;
	this.m_linearVelocity.y += this.m_invMass * impulse.y;
	this.m_angularVelocity += this.m_invI * ((point.x - this.m_sweep.c.x) * impulse.y - (point.y - this.m_sweep.c.y) * impulse.x);
}
box2D.dynamics.B2Body.prototype.GetMass = function() {
	return this.m_mass;
}
box2D.dynamics.B2Body.prototype.GetInertia = function() {
	return this.m_I;
}
box2D.dynamics.B2Body.prototype.GetWorldPoint = function(localPoint) {
	return box2D.common.math.B2Math.b2MulX(this.m_xf,localPoint);
}
box2D.dynamics.B2Body.prototype.GetWorldVector = function(localVector) {
	return box2D.common.math.B2Math.b2MulMV(this.m_xf.R,localVector);
}
box2D.dynamics.B2Body.prototype.GetLocalPoint = function(worldPoint) {
	return box2D.common.math.B2Math.b2MulXT(this.m_xf,worldPoint);
}
box2D.dynamics.B2Body.prototype.GetLocalVector = function(worldVector) {
	return box2D.common.math.B2Math.b2MulTMV(this.m_xf.R,worldVector);
}
box2D.dynamics.B2Body.prototype.GetLinearVelocityFromWorldPoint = function(worldPoint) {
	return new box2D.common.math.B2Vec2(this.m_linearVelocity.x + this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y),this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x));
}
box2D.dynamics.B2Body.prototype.GetLinearVelocityFromLocalPoint = function(localPoint) {
	return this.GetLinearVelocityFromWorldPoint(this.GetWorldPoint(localPoint));
}
box2D.dynamics.B2Body.prototype.IsBullet = function() {
	return (this.m_flags & 32) == 32;
}
box2D.dynamics.B2Body.prototype.SetBullet = function(flag) {
	if(flag) this.m_flags |= 32; else this.m_flags &= -33;
}
box2D.dynamics.B2Body.prototype.IsStatic = function() {
	return this.m_type == 1;
}
box2D.dynamics.B2Body.prototype.IsDynamic = function() {
	return this.m_type == 2;
}
box2D.dynamics.B2Body.prototype.IsFrozen = function() {
	return (this.m_flags & 2) == 2;
}
box2D.dynamics.B2Body.prototype.IsSleeping = function() {
	return (this.m_flags & 8) == 8;
}
box2D.dynamics.B2Body.prototype.AllowSleeping = function(flag) {
	if(flag) this.m_flags |= 16; else {
		this.m_flags &= -17;
		this.WakeUp();
	}
}
box2D.dynamics.B2Body.prototype.WakeUp = function() {
	this.m_flags &= -9;
	this.m_sleepTime = 0.0;
}
box2D.dynamics.B2Body.prototype.PutToSleep = function() {
	this.m_flags |= 8;
	this.m_sleepTime = 0.0;
	this.m_linearVelocity.SetZero();
	this.m_angularVelocity = 0.0;
	this.m_force.SetZero();
	this.m_torque = 0.0;
}
box2D.dynamics.B2Body.prototype.GetShapeList = function() {
	return this.m_shapeList;
}
box2D.dynamics.B2Body.prototype.GetJointList = function() {
	return this.m_jointList;
}
box2D.dynamics.B2Body.prototype.GetNext = function() {
	return this.m_next;
}
box2D.dynamics.B2Body.prototype.GetUserData = function() {
	return this.m_userData;
}
box2D.dynamics.B2Body.prototype.SetUserData = function(data) {
	this.m_userData = data;
}
box2D.dynamics.B2Body.prototype.GetWorld = function() {
	return this.m_world;
}
box2D.dynamics.B2Body.prototype.m_flags = null;
box2D.dynamics.B2Body.prototype.m_type = null;
box2D.dynamics.B2Body.prototype.m_xf = null;
box2D.dynamics.B2Body.prototype.m_sweep = null;
box2D.dynamics.B2Body.prototype.m_linearVelocity = null;
box2D.dynamics.B2Body.prototype.m_angularVelocity = null;
box2D.dynamics.B2Body.prototype.m_force = null;
box2D.dynamics.B2Body.prototype.m_torque = null;
box2D.dynamics.B2Body.prototype.m_world = null;
box2D.dynamics.B2Body.prototype.m_prev = null;
box2D.dynamics.B2Body.prototype.m_next = null;
box2D.dynamics.B2Body.prototype.m_shapeList = null;
box2D.dynamics.B2Body.prototype.m_shapeCount = null;
box2D.dynamics.B2Body.prototype.m_jointList = null;
box2D.dynamics.B2Body.prototype.m_contactList = null;
box2D.dynamics.B2Body.prototype.m_mass = null;
box2D.dynamics.B2Body.prototype.m_invMass = null;
box2D.dynamics.B2Body.prototype.m_I = null;
box2D.dynamics.B2Body.prototype.m_invI = null;
box2D.dynamics.B2Body.prototype.m_linearDamping = null;
box2D.dynamics.B2Body.prototype.m_angularDamping = null;
box2D.dynamics.B2Body.prototype.m_sleepTime = null;
box2D.dynamics.B2Body.prototype.m_userData = null;
box2D.dynamics.B2Body.prototype.SynchronizeShapes = function() {
	var xf1 = box2D.dynamics.B2Body.s_xf1;
	xf1.R.Set(this.m_sweep.a0);
	var tMat = xf1.R;
	var tVec = this.m_sweep.localCenter;
	xf1.position.x = this.m_sweep.c0.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	xf1.position.y = this.m_sweep.c0.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	var s;
	var inRange = true;
	s = this.m_shapeList;
	while(s != null) {
		inRange = s.Synchronize(this.m_world.m_broadPhase,xf1,this.m_xf);
		if(inRange == false) break;
		s = s.m_next;
	}
	if(inRange == false) {
		this.m_flags |= 2;
		this.m_linearVelocity.SetZero();
		this.m_angularVelocity = 0.0;
		s = this.m_shapeList;
		while(s != null) {
			s.DestroyProxy(this.m_world.m_broadPhase);
			s = s.m_next;
		}
		return false;
	}
	return true;
}
box2D.dynamics.B2Body.prototype.SynchronizeTransform = function() {
	this.m_xf.R.Set(this.m_sweep.a);
	var tMat = this.m_xf.R;
	var tVec = this.m_sweep.localCenter;
	this.m_xf.position.x = this.m_sweep.c.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	this.m_xf.position.y = this.m_sweep.c.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
}
box2D.dynamics.B2Body.prototype.IsConnected = function(other) {
	var jn = this.m_jointList;
	while(jn != null) {
		if(jn.other == other) return jn.joint.m_collideConnected == false;
		jn = jn.next;
	}
	return false;
}
box2D.dynamics.B2Body.prototype.Advance = function(t) {
	this.m_sweep.Advance(t);
	this.m_sweep.c.SetV(this.m_sweep.c0);
	this.m_sweep.a = this.m_sweep.a0;
	this.SynchronizeTransform();
}
box2D.dynamics.B2Body.prototype.__class__ = box2D.dynamics.B2Body;
if(!box2D.dynamics.joints) box2D.dynamics.joints = {}
box2D.dynamics.joints.B2JointDef = function(p) {
	if( p === $_ ) return;
	this.type = 0;
	this.userData = null;
	this.body1 = null;
	this.body2 = null;
	this.collideConnected = false;
}
box2D.dynamics.joints.B2JointDef.__name__ = ["box2D","dynamics","joints","B2JointDef"];
box2D.dynamics.joints.B2JointDef.prototype.type = null;
box2D.dynamics.joints.B2JointDef.prototype.userData = null;
box2D.dynamics.joints.B2JointDef.prototype.body1 = null;
box2D.dynamics.joints.B2JointDef.prototype.body2 = null;
box2D.dynamics.joints.B2JointDef.prototype.collideConnected = null;
box2D.dynamics.joints.B2JointDef.prototype.__class__ = box2D.dynamics.joints.B2JointDef;
box2D.dynamics.joints.B2MouseJointDef = function(p) {
	if( p === $_ ) return;
	box2D.dynamics.joints.B2JointDef.call(this);
	this.target = new box2D.common.math.B2Vec2();
	this.type = 5;
	this.maxForce = 0.0;
	this.frequencyHz = 5.0;
	this.dampingRatio = 0.7;
	this.timeStep = 1.0 / 60.0;
}
box2D.dynamics.joints.B2MouseJointDef.__name__ = ["box2D","dynamics","joints","B2MouseJointDef"];
box2D.dynamics.joints.B2MouseJointDef.__super__ = box2D.dynamics.joints.B2JointDef;
for(var k in box2D.dynamics.joints.B2JointDef.prototype ) box2D.dynamics.joints.B2MouseJointDef.prototype[k] = box2D.dynamics.joints.B2JointDef.prototype[k];
box2D.dynamics.joints.B2MouseJointDef.prototype.target = null;
box2D.dynamics.joints.B2MouseJointDef.prototype.maxForce = null;
box2D.dynamics.joints.B2MouseJointDef.prototype.frequencyHz = null;
box2D.dynamics.joints.B2MouseJointDef.prototype.dampingRatio = null;
box2D.dynamics.joints.B2MouseJointDef.prototype.timeStep = null;
box2D.dynamics.joints.B2MouseJointDef.prototype.__class__ = box2D.dynamics.joints.B2MouseJointDef;
List = function(p) {
	if( p === $_ ) return;
	this.length = 0;
}
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x; else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.first = function() {
	return this.h == null?null:this.h[0];
}
List.prototype.last = function() {
	return this.q == null?null:this.q[0];
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.isEmpty = function() {
	return this.h == null;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1]; else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
}
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return this.h != null;
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}};
}
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{";
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = ", ";
		s.b[s.b.length] = Std.string(l[0]);
		l = l[1];
	}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = sep;
		s.b[s.b.length] = l[0];
		l = l[1];
	}
	return s.b.join("");
}
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.__class__ = List;
box2D.dynamics.joints.B2JointEdge = function(p) {
}
box2D.dynamics.joints.B2JointEdge.__name__ = ["box2D","dynamics","joints","B2JointEdge"];
box2D.dynamics.joints.B2JointEdge.prototype.other = null;
box2D.dynamics.joints.B2JointEdge.prototype.joint = null;
box2D.dynamics.joints.B2JointEdge.prototype.prev = null;
box2D.dynamics.joints.B2JointEdge.prototype.next = null;
box2D.dynamics.joints.B2JointEdge.prototype.__class__ = box2D.dynamics.joints.B2JointEdge;
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
IntHash = function(p) {
	if( p === $_ ) return;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	} else null;
}
IntHash.__name__ = ["IntHash"];
IntHash.prototype.h = null;
IntHash.prototype.set = function(key,value) {
	this.h[key] = value;
}
IntHash.prototype.get = function(key) {
	return this.h[key];
}
IntHash.prototype.exists = function(key) {
	return this.h[key] != null;
}
IntHash.prototype.remove = function(key) {
	if(this.h[key] == null) return false;
	delete(this.h[key]);
	return true;
}
IntHash.prototype.keys = function() {
	var a = new Array();
	for( x in this.h ) a.push(x);
	return a.iterator();
}
IntHash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref[i];
	}};
}
IntHash.prototype.toString = function() {
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
IntHash.prototype.__class__ = IntHash;
box2D.dynamics.B2ContactFilter = function(p) {
}
box2D.dynamics.B2ContactFilter.__name__ = ["box2D","dynamics","B2ContactFilter"];
box2D.dynamics.B2ContactFilter.prototype.ShouldCollide = function(shape1,shape2) {
	var filter1 = shape1.GetFilterData();
	var filter2 = shape2.GetFilterData();
	if(filter1.groupIndex == filter2.groupIndex && filter1.groupIndex != 0) return filter1.groupIndex > 0;
	var collide = (filter1.maskBits & filter2.categoryBits) != 0 && (filter1.categoryBits & filter2.maskBits) != 0;
	return collide;
}
box2D.dynamics.B2ContactFilter.prototype.__class__ = box2D.dynamics.B2ContactFilter;
box2D.collision.B2Point = function(p) {
	if( p === $_ ) return;
	this.p = new box2D.common.math.B2Vec2();
}
box2D.collision.B2Point.__name__ = ["box2D","collision","B2Point"];
box2D.collision.B2Point.prototype.Support = function(xf,vX,vY) {
	return this.p;
}
box2D.collision.B2Point.prototype.GetFirstVertex = function(xf) {
	return this.p;
}
box2D.collision.B2Point.prototype.p = null;
box2D.collision.B2Point.prototype.__class__ = box2D.collision.B2Point;
if(!fboyle.utils) fboyle.utils = {}
fboyle.utils.EaselLoader = function() { }
fboyle.utils.EaselLoader.__name__ = ["fboyle","utils","EaselLoader"];
fboyle.utils.EaselLoader.loadBitmap = function(src) {
	return new Bitmap(fboyle.utils.EaselLoader.loadImage(src));
}
fboyle.utils.EaselLoader.loadImage = function(src) {
	if(fboyle.utils.EaselLoader.loaded.exists(src)) return fboyle.utils.EaselLoader.loaded.get(src);
	var img = js.Lib.document.createElement("img");
	img.onload = function(e) {
		fboyle.utils.EaselLoader.loaded.set(src,img);
	};
	img.src = src;
	return img;
}
fboyle.utils.EaselLoader.loadMovieClip = function(src,sequenceInfo) {
	var seqArr = sequenceInfo.sheetindicies.split(",");
	if(seqArr.length <= 1) {
		var bmp = fboyle.utils.EaselLoader.loadBitmap(sequenceInfo.file);
		return bmp;
	}
	var img = fboyle.utils.EaselLoader.loadImage(src);
	var frameData = { };
	frameData[sequenceInfo.name] = [seqArr[0],seqArr[seqArr.length - 1]];
	var spriteSheet = new SpriteSheet(img,sequenceInfo.frameWidth,sequenceInfo.frameHeight,frameData);
	var bmpSeq = new BitmapSequence(spriteSheet);
	bmpSeq.regX = Std["int"](sequenceInfo.registrationPoint.x);
	bmpSeq.regY = Std["int"](sequenceInfo.registrationPoint.y);
	bmpSeq.gotoAndStop(seqArr[0]);
	return bmpSeq;
}
fboyle.utils.EaselLoader.prototype.__class__ = fboyle.utils.EaselLoader;
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
if(typeof haxe=='undefined') haxe = {}
if(!haxe.io) haxe.io = {}
haxe.io.Bytes = function(length,b) {
	if( length === $_ ) return;
	this.length = length;
	this.b = b;
}
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = s.cca(i);
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype.length = null;
haxe.io.Bytes.prototype.b = null;
haxe.io.Bytes.prototype.get = function(pos) {
	return this.b[pos];
}
haxe.io.Bytes.prototype.set = function(pos,v) {
	this.b[pos] = v & 255;
}
haxe.io.Bytes.prototype.blit = function(pos,src,srcpos,len) {
	if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
	var b1 = this.b;
	var b2 = src.b;
	if(b1 == b2 && pos > srcpos) {
		var i = len;
		while(i > 0) {
			i--;
			b1[i + pos] = b2[i + srcpos];
		}
		return;
	}
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		b1[i + pos] = b2[i + srcpos];
	}
}
haxe.io.Bytes.prototype.sub = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
}
haxe.io.Bytes.prototype.compare = function(other) {
	var b1 = this.b;
	var b2 = other.b;
	var len = this.length < other.length?this.length:other.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		if(b1[i] != b2[i]) return b1[i] - b2[i];
	}
	return this.length - other.length;
}
haxe.io.Bytes.prototype.readString = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	var s = "";
	var b = this.b;
	var fcc = $closure(String,"fromCharCode");
	var i = pos;
	var max = pos + len;
	while(i < max) {
		var c = b[i++];
		if(c < 128) {
			if(c == 0) break;
			s += fcc(c);
		} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
			var c2 = b[i++];
			s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
		} else {
			var c2 = b[i++];
			var c3 = b[i++];
			s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
		}
	}
	return s;
}
haxe.io.Bytes.prototype.toString = function() {
	return this.readString(0,this.length);
}
haxe.io.Bytes.prototype.getData = function() {
	return this.b;
}
haxe.io.Bytes.prototype.__class__ = haxe.io.Bytes;
box2D.dynamics.contacts.B2ContactEdge = function(p) {
}
box2D.dynamics.contacts.B2ContactEdge.__name__ = ["box2D","dynamics","contacts","B2ContactEdge"];
box2D.dynamics.contacts.B2ContactEdge.prototype.other = null;
box2D.dynamics.contacts.B2ContactEdge.prototype.contact = null;
box2D.dynamics.contacts.B2ContactEdge.prototype.prev = null;
box2D.dynamics.contacts.B2ContactEdge.prototype.next = null;
box2D.dynamics.contacts.B2ContactEdge.prototype.__class__ = box2D.dynamics.contacts.B2ContactEdge;
box2D.collision.B2OBB = function(p) {
	if( p === $_ ) return;
	this.R = new box2D.common.math.B2Mat22();
	this.center = new box2D.common.math.B2Vec2();
	this.extents = new box2D.common.math.B2Vec2();
}
box2D.collision.B2OBB.__name__ = ["box2D","collision","B2OBB"];
box2D.collision.B2OBB.prototype.R = null;
box2D.collision.B2OBB.prototype.center = null;
box2D.collision.B2OBB.prototype.extents = null;
box2D.collision.B2OBB.prototype.__class__ = box2D.collision.B2OBB;
box2D.collision.shapes.B2ShapeDef = function(p) {
	if( p === $_ ) return;
	this.type = -1;
	this.userData = null;
	this.friction = 0.2;
	this.restitution = 0.0;
	this.density = 0.0;
	this.isSensor = false;
	this.filter = new box2D.collision.shapes.B2FilterData();
}
box2D.collision.shapes.B2ShapeDef.__name__ = ["box2D","collision","shapes","B2ShapeDef"];
box2D.collision.shapes.B2ShapeDef.prototype.type = null;
box2D.collision.shapes.B2ShapeDef.prototype.userData = null;
box2D.collision.shapes.B2ShapeDef.prototype.friction = null;
box2D.collision.shapes.B2ShapeDef.prototype.restitution = null;
box2D.collision.shapes.B2ShapeDef.prototype.density = null;
box2D.collision.shapes.B2ShapeDef.prototype.isSensor = null;
box2D.collision.shapes.B2ShapeDef.prototype.filter = null;
box2D.collision.shapes.B2ShapeDef.prototype.__class__ = box2D.collision.shapes.B2ShapeDef;
box2D.collision.shapes.B2CircleDef = function(p) {
	if( p === $_ ) return;
	box2D.collision.shapes.B2ShapeDef.call(this);
	this.localPosition = new box2D.common.math.B2Vec2(0.0,0.0);
	this.type = 0;
	this.radius = 1.0;
}
box2D.collision.shapes.B2CircleDef.__name__ = ["box2D","collision","shapes","B2CircleDef"];
box2D.collision.shapes.B2CircleDef.__super__ = box2D.collision.shapes.B2ShapeDef;
for(var k in box2D.collision.shapes.B2ShapeDef.prototype ) box2D.collision.shapes.B2CircleDef.prototype[k] = box2D.collision.shapes.B2ShapeDef.prototype[k];
box2D.collision.shapes.B2CircleDef.prototype.localPosition = null;
box2D.collision.shapes.B2CircleDef.prototype.radius = null;
box2D.collision.shapes.B2CircleDef.prototype.__class__ = box2D.collision.shapes.B2CircleDef;
box2D.dynamics.contacts.B2PolygonContact = function(shape1,shape2) {
	if( shape1 === $_ ) return;
	box2D.dynamics.contacts.B2Contact.call(this,shape1,shape2);
	this.m0 = new box2D.collision.B2Manifold();
	this.m_manifolds = [new box2D.collision.B2Manifold()];
	this.m_manifold = this.m_manifolds[0];
	this.m_manifold.pointCount = 0;
}
box2D.dynamics.contacts.B2PolygonContact.__name__ = ["box2D","dynamics","contacts","B2PolygonContact"];
box2D.dynamics.contacts.B2PolygonContact.__super__ = box2D.dynamics.contacts.B2Contact;
for(var k in box2D.dynamics.contacts.B2Contact.prototype ) box2D.dynamics.contacts.B2PolygonContact.prototype[k] = box2D.dynamics.contacts.B2Contact.prototype[k];
box2D.dynamics.contacts.B2PolygonContact.Create = function(shape1,shape2,allocator) {
	return new box2D.dynamics.contacts.B2PolygonContact(shape1,shape2);
}
box2D.dynamics.contacts.B2PolygonContact.Destroy = function(contact,allocator) {
}
box2D.dynamics.contacts.B2PolygonContact.prototype.m0 = null;
box2D.dynamics.contacts.B2PolygonContact.prototype.Evaluate = function(listener) {
	var v1;
	var v2;
	var mp0;
	var b1 = this.m_shape1.m_body;
	var b2 = this.m_shape2.m_body;
	var cp;
	var i;
	this.m0.Set(this.m_manifold);
	box2D.collision.B2Collision.b2CollidePolygons(this.m_manifold,(function($this) {
		var $r;
		var $t = $this.m_shape1;
		if(Std["is"]($t,box2D.collision.shapes.B2PolygonShape)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this)),b1.m_xf,(function($this) {
		var $r;
		var $t = $this.m_shape2;
		if(Std["is"]($t,box2D.collision.shapes.B2PolygonShape)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this)),b2.m_xf);
	var persisted = [false,false];
	cp = box2D.dynamics.contacts.B2PolygonContact.s_evalCP;
	cp.shape1 = this.m_shape1;
	cp.shape2 = this.m_shape2;
	cp.friction = this.m_friction;
	cp.restitution = this.m_restitution;
	if(this.m_manifold.pointCount > 0) {
		var _g1 = 0, _g = this.m_manifold.pointCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			var mp = this.m_manifold.points[i1];
			mp.normalImpulse = 0.0;
			mp.tangentImpulse = 0.0;
			var found = false;
			var idKey = mp.id._key;
			var _g3 = 0, _g2 = this.m0.pointCount;
			while(_g3 < _g2) {
				var j = _g3++;
				if(persisted[j] == true) continue;
				mp0 = this.m0.points[j];
				if(mp0.id._key == idKey) {
					persisted[j] = true;
					mp.normalImpulse = mp0.normalImpulse;
					mp.tangentImpulse = mp0.tangentImpulse;
					found = true;
					if(listener != null) {
						cp.position = b1.GetWorldPoint(mp.localPoint1);
						v1 = b1.GetLinearVelocityFromWorldPoint(b1.GetWorldPoint(mp.localPoint1));
						v2 = b2.GetLinearVelocityFromWorldPoint(b2.GetWorldPoint(mp.localPoint2));
						cp.velocity.Set(v2.x - v1.x,v2.y - v1.y);
						cp.normal.SetV(this.m_manifold.normal);
						cp.separation = mp.separation;
						cp.id.setKey(idKey);
						listener.Persist(cp);
					}
					break;
				}
			}
			if(found == false && listener != null) {
				cp.position = b1.GetWorldPoint(mp.localPoint1);
				v1 = b1.GetLinearVelocityFromWorldPoint(b1.GetWorldPoint(mp.localPoint1));
				v2 = b2.GetLinearVelocityFromWorldPoint(b2.GetWorldPoint(mp.localPoint2));
				cp.velocity.Set(v2.x - v1.x,v2.y - v1.y);
				cp.normal.SetV(this.m_manifold.normal);
				cp.separation = mp.separation;
				cp.id.setKey(idKey);
				listener.Add(cp);
			}
		}
		this.m_manifoldCount = 1;
	} else this.m_manifoldCount = 0;
	if(listener == null) return;
	var _g1 = 0, _g = this.m0.pointCount;
	while(_g1 < _g) {
		var i1 = _g1++;
		if(persisted[i1]) continue;
		mp0 = this.m0.points[i1];
		cp.position = b1.GetWorldPoint(mp0.localPoint1);
		v1 = b1.GetLinearVelocityFromWorldPoint(b1.GetWorldPoint(mp0.localPoint1));
		v2 = b2.GetLinearVelocityFromWorldPoint(b2.GetWorldPoint(mp0.localPoint2));
		cp.velocity.Set(v2.x - v1.x,v2.y - v1.y);
		cp.normal.SetV(this.m0.normal);
		cp.separation = mp0.separation;
		cp.id.setKey(mp0.id._key);
		listener.Remove(cp);
	}
}
box2D.dynamics.contacts.B2PolygonContact.prototype.GetManifolds = function() {
	return this.m_manifolds;
}
box2D.dynamics.contacts.B2PolygonContact.prototype.m_manifolds = null;
box2D.dynamics.contacts.B2PolygonContact.prototype.m_manifold = null;
box2D.dynamics.contacts.B2PolygonContact.prototype.__class__ = box2D.dynamics.contacts.B2PolygonContact;
box2D.collision.B2BufferedPair = function(p) {
}
box2D.collision.B2BufferedPair.__name__ = ["box2D","collision","B2BufferedPair"];
box2D.collision.B2BufferedPair.prototype.proxyId1 = null;
box2D.collision.B2BufferedPair.prototype.proxyId2 = null;
box2D.collision.B2BufferedPair.prototype.__class__ = box2D.collision.B2BufferedPair;
box2D.common.B2Color = function(rr,gg,bb) {
	if( rr === $_ ) return;
	this._r = Std["int"](255 * box2D.common.math.B2Math.b2Max(0.0,rr < 1.0?rr:1.0));
	this._g = Std["int"](255 * box2D.common.math.B2Math.b2Max(0.0,gg < 1.0?gg:1.0));
	this._b = Std["int"](255 * box2D.common.math.B2Math.b2Max(0.0,bb < 1.0?bb:1.0));
}
box2D.common.B2Color.__name__ = ["box2D","common","B2Color"];
box2D.common.B2Color.prototype.b = null;
box2D.common.B2Color.prototype.color = null;
box2D.common.B2Color.prototype.g = null;
box2D.common.B2Color.prototype.r = null;
box2D.common.B2Color.prototype.Set = function(rr,gg,bb) {
	this._r = Std["int"](255 * box2D.common.math.B2Math.b2Max(0.0,rr < 1.0?rr:1.0));
	this._g = Std["int"](255 * box2D.common.math.B2Math.b2Max(0.0,gg < 1.0?gg:1.0));
	this._b = Std["int"](255 * box2D.common.math.B2Math.b2Max(0.0,bb < 1.0?bb:1.0));
}
box2D.common.B2Color.prototype.setR = function(rr) {
	this._r = Std["int"](255 * box2D.common.math.B2Math.b2Max(0.0,rr < 1.0?rr:1.0));
	return rr;
}
box2D.common.B2Color.prototype.setG = function(gg) {
	this._g = Std["int"](255 * box2D.common.math.B2Math.b2Max(0.0,gg < 1.0?gg:1.0));
	return gg;
}
box2D.common.B2Color.prototype.setB = function(bb) {
	this._b = Std["int"](255 * box2D.common.math.B2Math.b2Max(0.0,bb < 1.0?bb:1.0));
	return bb;
}
box2D.common.B2Color.prototype.getColor = function() {
	return this._r | this._g << 8 | this._b << 16;
}
box2D.common.B2Color.prototype._r = null;
box2D.common.B2Color.prototype._g = null;
box2D.common.B2Color.prototype._b = null;
box2D.common.B2Color.prototype.__class__ = box2D.common.B2Color;
box2D.dynamics.B2World = function(worldAABB,gravity,doSleep) {
	if( worldAABB === $_ ) return;
	this.m_destructionListener = null;
	this.m_boundaryListener = null;
	this.m_contactFilter = box2D.dynamics.B2ContactFilter.b2_defaultFilter;
	this.m_contactListener = null;
	this.m_debugDraw = null;
	this.m_bodyList = null;
	this.m_contactList = null;
	this.m_jointList = null;
	this.m_bodyCount = 0;
	this.m_contactCount = 0;
	this.m_jointCount = 0;
	box2D.dynamics.B2World.m_positionCorrection = true;
	box2D.dynamics.B2World.m_warmStarting = true;
	box2D.dynamics.B2World.m_continuousPhysics = true;
	this.m_allowSleep = doSleep;
	this.m_gravity = gravity;
	this.m_lock = false;
	this.m_inv_dt0 = 0.0;
	this.m_contactManager = new box2D.dynamics.B2ContactManager();
	this.m_contactManager.m_world = this;
	this.m_broadPhase = new box2D.collision.B2BroadPhase(worldAABB,this.m_contactManager);
	var bd = new box2D.dynamics.B2BodyDef();
	this.m_groundBody = this.CreateBody(bd);
}
box2D.dynamics.B2World.__name__ = ["box2D","dynamics","B2World"];
box2D.dynamics.B2World.m_positionCorrection = null;
box2D.dynamics.B2World.m_warmStarting = null;
box2D.dynamics.B2World.m_continuousPhysics = null;
box2D.dynamics.B2World.prototype.SetDestructionListener = function(listener) {
	this.m_destructionListener = listener;
}
box2D.dynamics.B2World.prototype.SetBoundaryListener = function(listener) {
	this.m_boundaryListener = listener;
}
box2D.dynamics.B2World.prototype.SetContactFilter = function(filter) {
	this.m_contactFilter = filter;
}
box2D.dynamics.B2World.prototype.SetContactListener = function(listener) {
	this.m_contactListener = listener;
}
box2D.dynamics.B2World.prototype.SetDebugDraw = function(debugDraw) {
	this.m_debugDraw = debugDraw;
}
box2D.dynamics.B2World.prototype.Validate = function() {
	this.m_broadPhase.Validate();
}
box2D.dynamics.B2World.prototype.GetProxyCount = function() {
	return this.m_broadPhase.m_proxyCount;
}
box2D.dynamics.B2World.prototype.GetPairCount = function() {
	return this.m_broadPhase.m_pairManager.m_pairCount;
}
box2D.dynamics.B2World.prototype.CreateBody = function(def) {
	if(this.m_lock == true) return null;
	var b = new box2D.dynamics.B2Body(def,this);
	b.m_prev = null;
	b.m_next = this.m_bodyList;
	if(this.m_bodyList != null) this.m_bodyList.m_prev = b;
	this.m_bodyList = b;
	++this.m_bodyCount;
	return b;
}
box2D.dynamics.B2World.prototype.DestroyBody = function(b) {
	if(this.m_lock == true) return;
	var jn = b.m_jointList;
	while(jn != null) {
		var jn0 = jn;
		jn = jn.next;
		if(this.m_destructionListener != null) this.m_destructionListener.SayGoodbyeJoint(jn0.joint);
		this.DestroyJoint(jn0.joint);
	}
	var s = b.m_shapeList;
	while(s != null) {
		var s0 = s;
		s = s.m_next;
		if(this.m_destructionListener != null) this.m_destructionListener.SayGoodbyeShape(s0);
		s0.DestroyProxy(this.m_broadPhase);
		box2D.collision.shapes.B2Shape.Destroy(s0,this.m_blockAllocator);
	}
	if(b.m_prev != null) b.m_prev.m_next = b.m_next;
	if(b.m_next != null) b.m_next.m_prev = b.m_prev;
	if(b == this.m_bodyList) this.m_bodyList = b.m_next;
	--this.m_bodyCount;
}
box2D.dynamics.B2World.prototype.CreateJoint = function(def) {
	var j = box2D.dynamics.joints.B2Joint.Create(def,this.m_blockAllocator);
	j.m_prev = null;
	j.m_next = this.m_jointList;
	if(this.m_jointList != null) this.m_jointList.m_prev = j;
	this.m_jointList = j;
	++this.m_jointCount;
	j.m_node1.joint = j;
	j.m_node1.other = j.m_body2;
	j.m_node1.prev = null;
	j.m_node1.next = j.m_body1.m_jointList;
	if(j.m_body1.m_jointList != null) j.m_body1.m_jointList.prev = j.m_node1;
	j.m_body1.m_jointList = j.m_node1;
	j.m_node2.joint = j;
	j.m_node2.other = j.m_body1;
	j.m_node2.prev = null;
	j.m_node2.next = j.m_body2.m_jointList;
	if(j.m_body2.m_jointList != null) j.m_body2.m_jointList.prev = j.m_node2;
	j.m_body2.m_jointList = j.m_node2;
	if(def.collideConnected == false) {
		var b = def.body1.m_shapeCount < def.body2.m_shapeCount?def.body1:def.body2;
		var s = b.m_shapeList;
		while(s != null) {
			s.RefilterProxy(this.m_broadPhase,b.m_xf);
			s = s.m_next;
		}
	}
	return j;
}
box2D.dynamics.B2World.prototype.DestroyJoint = function(j) {
	var collideConnected = j.m_collideConnected;
	if(j.m_prev != null) j.m_prev.m_next = j.m_next;
	if(j.m_next != null) j.m_next.m_prev = j.m_prev;
	if(j == this.m_jointList) this.m_jointList = j.m_next;
	var body1 = j.m_body1;
	var body2 = j.m_body2;
	body1.WakeUp();
	body2.WakeUp();
	if(j.m_node1.prev != null) j.m_node1.prev.next = j.m_node1.next;
	if(j.m_node1.next != null) j.m_node1.next.prev = j.m_node1.prev;
	if(j.m_node1 == body1.m_jointList) body1.m_jointList = j.m_node1.next;
	j.m_node1.prev = null;
	j.m_node1.next = null;
	if(j.m_node2.prev != null) j.m_node2.prev.next = j.m_node2.next;
	if(j.m_node2.next != null) j.m_node2.next.prev = j.m_node2.prev;
	if(j.m_node2 == body2.m_jointList) body2.m_jointList = j.m_node2.next;
	j.m_node2.prev = null;
	j.m_node2.next = null;
	box2D.dynamics.joints.B2Joint.Destroy(j,this.m_blockAllocator);
	--this.m_jointCount;
	if(collideConnected == false) {
		var b = body1.m_shapeCount < body2.m_shapeCount?body1:body2;
		var s = b.m_shapeList;
		while(s != null) {
			s.RefilterProxy(this.m_broadPhase,b.m_xf);
			s = s.m_next;
		}
	}
}
box2D.dynamics.B2World.prototype.Refilter = function(shape) {
	shape.RefilterProxy(this.m_broadPhase,shape.m_body.m_xf);
}
box2D.dynamics.B2World.prototype.SetWarmStarting = function(flag) {
	box2D.dynamics.B2World.m_warmStarting = flag;
}
box2D.dynamics.B2World.prototype.SetPositionCorrection = function(flag) {
	box2D.dynamics.B2World.m_positionCorrection = flag;
}
box2D.dynamics.B2World.prototype.SetContinuousPhysics = function(flag) {
	box2D.dynamics.B2World.m_continuousPhysics = flag;
}
box2D.dynamics.B2World.prototype.GetBodyCount = function() {
	return this.m_bodyCount;
}
box2D.dynamics.B2World.prototype.GetJointCount = function() {
	return this.m_jointCount;
}
box2D.dynamics.B2World.prototype.GetContactCount = function() {
	return this.m_contactCount;
}
box2D.dynamics.B2World.prototype.SetGravity = function(gravity) {
	this.m_gravity = gravity;
}
box2D.dynamics.B2World.prototype.GetGroundBody = function() {
	return this.m_groundBody;
}
box2D.dynamics.B2World.prototype.Step = function(dt,iterations) {
	this.m_lock = true;
	var step = new box2D.dynamics.B2TimeStep();
	step.dt = dt;
	step.maxIterations = iterations;
	if(dt > 0.0) step.inv_dt = 1.0 / dt; else step.inv_dt = 0.0;
	step.dtRatio = this.m_inv_dt0 * dt;
	step.positionCorrection = box2D.dynamics.B2World.m_positionCorrection;
	step.warmStarting = box2D.dynamics.B2World.m_warmStarting;
	this.m_contactManager.Collide();
	if(step.dt > 0.0) this.Solve(step);
	if(box2D.dynamics.B2World.m_continuousPhysics && step.dt > 0.0) this.SolveTOI(step);
	this.DrawDebugData();
	this.m_inv_dt0 = step.inv_dt;
	this.m_lock = false;
}
box2D.dynamics.B2World.prototype.Query = function(aabb,shapes,maxCount) {
	var results = new Array();
	var count = this.m_broadPhase.QueryAABB(aabb,results,maxCount);
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		shapes[i] = results[i];
	}
	return count;
}
box2D.dynamics.B2World.prototype.GetBodyList = function() {
	return this.m_bodyList;
}
box2D.dynamics.B2World.prototype.GetJointList = function() {
	return this.m_jointList;
}
box2D.dynamics.B2World.prototype.Solve = function(step) {
	var b;
	this.m_positionIterationCount = 0;
	var island = new box2D.dynamics.B2Island(this.m_bodyCount,this.m_contactCount,this.m_jointCount,this.m_stackAllocator,this.m_contactListener);
	b = this.m_bodyList;
	while(b != null) {
		b.m_flags &= -5;
		b = b.m_next;
	}
	var c = this.m_contactList;
	while(c != null) {
		c.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_islandFlag;
		c = c.m_next;
	}
	var j = this.m_jointList;
	while(j != null) {
		j.m_islandFlag = false;
		j = j.m_next;
	}
	var stackSize = this.m_bodyCount;
	var stack = new Array();
	var seed = this.m_bodyList;
	while(seed != null) {
		if((seed.m_flags & 14) != 0) {
			seed = seed.m_next;
			continue;
		}
		if(seed.IsStatic()) {
			seed = seed.m_next;
			continue;
		}
		island.Clear();
		var stackCount = 0;
		stack[stackCount++] = seed;
		seed.m_flags |= 4;
		while(stackCount > 0) {
			b = stack[--stackCount];
			island.AddBody(b);
			b.m_flags &= -9;
			if(b.IsStatic()) continue;
			var other;
			var cn = b.m_contactList;
			while(cn != null) {
				if((cn.contact.m_flags & (box2D.dynamics.contacts.B2Contact.e_islandFlag | box2D.dynamics.contacts.B2Contact.e_nonSolidFlag)) != 0) {
					cn = cn.next;
					continue;
				}
				if(cn.contact.m_manifoldCount == 0) {
					cn = cn.next;
					continue;
				}
				island.AddContact(cn.contact);
				cn.contact.m_flags |= box2D.dynamics.contacts.B2Contact.e_islandFlag;
				other = cn.other;
				if((other.m_flags & 4) != 0) {
					cn = cn.next;
					continue;
				}
				stack[stackCount++] = other;
				other.m_flags |= 4;
				cn = cn.next;
			}
			var jn = b.m_jointList;
			while(jn != null) {
				if(jn.joint.m_islandFlag == true) {
					jn = jn.next;
					continue;
				}
				island.AddJoint(jn.joint);
				jn.joint.m_islandFlag = true;
				other = jn.other;
				if((other.m_flags & 4) != 0) {
					jn = jn.next;
					continue;
				}
				stack[stackCount++] = other;
				other.m_flags |= 4;
				jn = jn.next;
			}
		}
		island.Solve(step,this.m_gravity,box2D.dynamics.B2World.m_positionCorrection,this.m_allowSleep);
		if(island.m_positionIterationCount > this.m_positionIterationCount) this.m_positionIterationCount = island.m_positionIterationCount;
		var _g1 = 0, _g = island.m_bodyCount;
		while(_g1 < _g) {
			var i = _g1++;
			b = island.m_bodies[i];
			if(b.IsStatic()) b.m_flags &= -5;
		}
		seed = seed.m_next;
	}
	b = this.m_bodyList;
	while(b != null) {
		if((b.m_flags & 10) != 0) {
			b = b.m_next;
			continue;
		}
		if(b.IsStatic()) {
			b = b.m_next;
			continue;
		}
		var inRange = b.SynchronizeShapes();
		if(inRange == false && this.m_boundaryListener != null) this.m_boundaryListener.Violation(b);
		b = b.m_next;
	}
	this.m_broadPhase.Commit();
}
box2D.dynamics.B2World.prototype.SolveTOI = function(step) {
	var b;
	var s1;
	var s2;
	var b1;
	var b2;
	var cn;
	var island = new box2D.dynamics.B2Island(this.m_bodyCount,32,0,this.m_stackAllocator,this.m_contactListener);
	var stackSize = this.m_bodyCount;
	var stack = new Array();
	b = this.m_bodyList;
	while(b != null) {
		b.m_flags &= -5;
		b.m_sweep.t0 = 0.0;
		b = b.m_next;
	}
	var c;
	c = this.m_contactList;
	while(c != null) {
		c.m_flags &= ~(box2D.dynamics.contacts.B2Contact.e_toiFlag | box2D.dynamics.contacts.B2Contact.e_islandFlag);
		c = c.m_next;
	}
	while(true) {
		var minContact = null;
		var minTOI = 1.0;
		c = this.m_contactList;
		while(c != null) {
			if((c.m_flags & (box2D.dynamics.contacts.B2Contact.e_slowFlag | box2D.dynamics.contacts.B2Contact.e_nonSolidFlag)) != 0) {
				c = c.m_next;
				continue;
			}
			var toi = 1.0;
			if((c.m_flags & box2D.dynamics.contacts.B2Contact.e_toiFlag) != 0) toi = c.m_toi; else {
				s1 = c.m_shape1;
				s2 = c.m_shape2;
				b1 = s1.m_body;
				b2 = s2.m_body;
				if((b1.IsStatic() || b1.IsSleeping()) && (b2.IsStatic() || b2.IsSleeping())) {
					c = c.m_next;
					continue;
				}
				var t0 = b1.m_sweep.t0;
				if(b1.m_sweep.t0 < b2.m_sweep.t0) {
					t0 = b2.m_sweep.t0;
					b1.m_sweep.Advance(t0);
				} else if(b2.m_sweep.t0 < b1.m_sweep.t0) {
					t0 = b1.m_sweep.t0;
					b2.m_sweep.Advance(t0);
				}
				toi = box2D.collision.B2TimeOfImpact.TimeOfImpact(c.m_shape1,b1.m_sweep,c.m_shape2,b2.m_sweep);
				if(toi > 0.0 && toi < 1.0) {
					toi = (1.0 - toi) * t0 + toi;
					if(toi > 1) toi = 1;
				}
				c.m_toi = toi;
				c.m_flags |= box2D.dynamics.contacts.B2Contact.e_toiFlag;
			}
			if(5.0e-324 < toi && toi < minTOI) {
				minContact = c;
				minTOI = toi;
			}
			c = c.m_next;
		}
		if(minContact == null || 1. < minTOI) break;
		s1 = minContact.m_shape1;
		s2 = minContact.m_shape2;
		b1 = s1.m_body;
		b2 = s2.m_body;
		b1.Advance(minTOI);
		b2.Advance(minTOI);
		minContact.Update(this.m_contactListener);
		minContact.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_toiFlag;
		if(minContact.m_manifoldCount == 0) continue;
		var seed = b1;
		if(seed.IsStatic()) seed = b2;
		island.Clear();
		var stackCount = 0;
		stack[stackCount++] = seed;
		seed.m_flags |= 4;
		while(stackCount > 0) {
			b = stack[--stackCount];
			island.AddBody(b);
			b.m_flags &= -9;
			if(b.IsStatic()) continue;
			cn = b.m_contactList;
			while(cn != null) {
				if(island.m_contactCount == island.m_contactCapacity) {
					cn = cn.next;
					continue;
				}
				if((cn.contact.m_flags & (box2D.dynamics.contacts.B2Contact.e_islandFlag | box2D.dynamics.contacts.B2Contact.e_slowFlag | box2D.dynamics.contacts.B2Contact.e_nonSolidFlag)) != 0) {
					cn = cn.next;
					continue;
				}
				if(cn.contact.m_manifoldCount == 0) {
					cn = cn.next;
					continue;
				}
				island.AddContact(cn.contact);
				cn.contact.m_flags |= box2D.dynamics.contacts.B2Contact.e_islandFlag;
				var other = cn.other;
				if((other.m_flags & 4) != 0) {
					cn = cn.next;
					continue;
				}
				if(other.IsStatic() == false) {
					other.Advance(minTOI);
					other.WakeUp();
				}
				stack[stackCount++] = other;
				other.m_flags |= 4;
				cn = cn.next;
			}
		}
		var subStep = new box2D.dynamics.B2TimeStep();
		subStep.dt = (1.0 - minTOI) * step.dt;
		subStep.inv_dt = 1.0 / subStep.dt;
		subStep.maxIterations = step.maxIterations;
		island.SolveTOI(subStep);
		var i;
		var _g1 = 0, _g = island.m_bodyCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			b = island.m_bodies[i1];
			b.m_flags &= -5;
			if((b.m_flags & 10) != 0) continue;
			if(b.IsStatic()) continue;
			var inRange = b.SynchronizeShapes();
			if(inRange == false && this.m_boundaryListener != null) this.m_boundaryListener.Violation(b);
			cn = b.m_contactList;
			while(cn != null) {
				cn.contact.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_toiFlag;
				cn = cn.next;
			}
		}
		var _g1 = 0, _g = island.m_contactCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			c = island.m_contacts[i1];
			c.m_flags &= ~(box2D.dynamics.contacts.B2Contact.e_toiFlag | box2D.dynamics.contacts.B2Contact.e_islandFlag);
		}
		this.m_broadPhase.Commit();
	}
}
box2D.dynamics.B2World.prototype.DrawJoint = function(joint) {
	var b1 = joint.m_body1;
	var b2 = joint.m_body2;
	var xf1 = b1.m_xf;
	var xf2 = b2.m_xf;
	var x1 = xf1.position;
	var x2 = xf2.position;
	var p1 = joint.GetAnchor1();
	var p2 = joint.GetAnchor2();
	var color = box2D.dynamics.B2World.s_jointColor;
	switch(joint.m_type) {
	case 3:
		this.m_debugDraw.DrawSegment(p1,p2,color);
		break;
	case 4:
		var pulley = (function($this) {
			var $r;
			var $t = joint;
			if(Std["is"]($t,box2D.dynamics.joints.B2PulleyJoint)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this));
		var s1 = pulley.GetGroundAnchor1();
		var s2 = pulley.GetGroundAnchor2();
		this.m_debugDraw.DrawSegment(s1,p1,color);
		this.m_debugDraw.DrawSegment(s2,p2,color);
		this.m_debugDraw.DrawSegment(s1,s2,color);
		break;
	case 5:
		this.m_debugDraw.DrawSegment(p1,p2,color);
		break;
	default:
		if(b1 != this.m_groundBody) this.m_debugDraw.DrawSegment(x1,p1,color);
		this.m_debugDraw.DrawSegment(p1,p2,color);
		if(b2 != this.m_groundBody) this.m_debugDraw.DrawSegment(x2,p2,color);
	}
}
box2D.dynamics.B2World.prototype.DrawShape = function(shape,xf,color,core) {
	var coreColor = box2D.dynamics.B2World.s_coreColor;
	switch(shape.m_type) {
	case 0:
		var circle = shape;
		var center = box2D.common.math.B2Math.b2MulX(xf,circle.m_localPosition);
		var radius = circle.m_radius;
		var axis = xf.R.col1;
		this.m_debugDraw.DrawSolidCircle(center,radius,axis,color);
		if(core) this.m_debugDraw.DrawCircle(center,radius - box2D.common.B2Settings.b2_toiSlop,coreColor);
		break;
	case 1:
		var i;
		var poly = shape;
		var vertexCount = poly.GetVertexCount();
		var localVertices = poly.GetVertices();
		var vertices = new Array();
		var _g = 0;
		while(_g < vertexCount) {
			var i1 = _g++;
			vertices[i1] = box2D.common.math.B2Math.b2MulX(xf,localVertices[i1]);
		}
		this.m_debugDraw.DrawSolidPolygon(vertices,vertexCount,color);
		if(core) {
			var localCoreVertices = poly.GetCoreVertices();
			var _g = 0;
			while(_g < vertexCount) {
				var i1 = _g++;
				vertices[i1] = box2D.common.math.B2Math.b2MulX(xf,localCoreVertices[i1]);
			}
			this.m_debugDraw.DrawPolygon(vertices,vertexCount,coreColor);
		}
		break;
	}
}
box2D.dynamics.B2World.prototype.DrawDebugData = function() {
	if(this.m_debugDraw == null) return;
	this.m_debugDraw.m_sprite.graphics.clear();
	var flags = this.m_debugDraw.GetFlags();
	var i;
	var b;
	var s;
	var j;
	var bp;
	var invQ = new box2D.common.math.B2Vec2();
	var x1 = new box2D.common.math.B2Vec2();
	var x2 = new box2D.common.math.B2Vec2();
	var color = new box2D.common.B2Color(0,0,0);
	var xf;
	var b1 = new box2D.collision.B2AABB();
	var b2 = new box2D.collision.B2AABB();
	var vs = [new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2()];
	if((flags & 1) != 0) {
		var core = (flags & 4) == 4;
		b = this.m_bodyList;
		while(b != null) {
			xf = b.m_xf;
			s = b.GetShapeList();
			while(s != null) {
				if(b.IsStatic()) this.DrawShape(s,xf,new box2D.common.B2Color(0.5,0.9,0.5),core); else if(b.IsSleeping()) this.DrawShape(s,xf,new box2D.common.B2Color(0.5,0.5,0.9),core); else this.DrawShape(s,xf,new box2D.common.B2Color(0.9,0.9,0.9),core);
				s = s.m_next;
			}
			b = b.m_next;
		}
	}
	if((flags & 2) != 0) {
		j = this.m_jointList;
		while(j != null) {
			this.DrawJoint(j);
			j = j.m_next;
		}
	}
	if((flags & 32) != 0) {
		bp = this.m_broadPhase;
		invQ.x = 1.0 / bp.m_quantizationFactor.x;
		invQ.y = 1.0 / bp.m_quantizationFactor.y;
		color.Set(0.9,0.9,0.3);
		var _g1 = 0, _g = box2D.common.B2Settings.b2_maxPairs;
		while(_g1 < _g) {
			var i1 = _g1++;
			var index = bp.m_pairManager.m_hashTable[i1];
			while(index != 65535) {
				var pair = bp.m_pairManager.m_pairs[index];
				var p1 = bp.m_proxyPool[pair.proxyId1];
				var p2 = bp.m_proxyPool[pair.proxyId2];
				b1.lowerBound.x = bp.m_worldAABB.lowerBound.x + invQ.x * bp.m_bounds[0][p1.lowerBounds[0]].value;
				b1.lowerBound.y = bp.m_worldAABB.lowerBound.y + invQ.y * bp.m_bounds[1][p1.lowerBounds[1]].value;
				b1.upperBound.x = bp.m_worldAABB.lowerBound.x + invQ.x * bp.m_bounds[0][p1.upperBounds[0]].value;
				b1.upperBound.y = bp.m_worldAABB.lowerBound.y + invQ.y * bp.m_bounds[1][p1.upperBounds[1]].value;
				b2.lowerBound.x = bp.m_worldAABB.lowerBound.x + invQ.x * bp.m_bounds[0][p2.lowerBounds[0]].value;
				b2.lowerBound.y = bp.m_worldAABB.lowerBound.y + invQ.y * bp.m_bounds[1][p2.lowerBounds[1]].value;
				b2.upperBound.x = bp.m_worldAABB.lowerBound.x + invQ.x * bp.m_bounds[0][p2.upperBounds[0]].value;
				b2.upperBound.y = bp.m_worldAABB.lowerBound.y + invQ.y * bp.m_bounds[1][p2.upperBounds[1]].value;
				x1.x = 0.5 * (b1.lowerBound.x + b1.upperBound.x);
				x1.y = 0.5 * (b1.lowerBound.y + b1.upperBound.y);
				x2.x = 0.5 * (b2.lowerBound.x + b2.upperBound.x);
				x2.y = 0.5 * (b2.lowerBound.y + b2.upperBound.y);
				this.m_debugDraw.DrawSegment(x1,x2,color);
				index = pair.next;
			}
		}
	}
	if((flags & 8) != 0) {
		bp = this.m_broadPhase;
		var worldLower = bp.m_worldAABB.lowerBound;
		var worldUpper = bp.m_worldAABB.upperBound;
		invQ.x = 1.0 / bp.m_quantizationFactor.x;
		invQ.y = 1.0 / bp.m_quantizationFactor.y;
		color.Set(0.9,0.3,0.9);
		var _g = 0;
		while(_g < 512) {
			var i1 = _g++;
			var p = bp.m_proxyPool[i1];
			if(p.overlapCount != 65535 == false) continue;
			b1.lowerBound.x = worldLower.x + invQ.x * bp.m_bounds[0][p.lowerBounds[0]].value;
			b1.lowerBound.y = worldLower.y + invQ.y * bp.m_bounds[1][p.lowerBounds[1]].value;
			b1.upperBound.x = worldLower.x + invQ.x * bp.m_bounds[0][p.upperBounds[0]].value;
			b1.upperBound.y = worldLower.y + invQ.y * bp.m_bounds[1][p.upperBounds[1]].value;
			vs[0].Set(b1.lowerBound.x,b1.lowerBound.y);
			vs[1].Set(b1.upperBound.x,b1.lowerBound.y);
			vs[2].Set(b1.upperBound.x,b1.upperBound.y);
			vs[3].Set(b1.lowerBound.x,b1.upperBound.y);
			this.m_debugDraw.DrawPolygon(vs,4,color);
		}
		vs[0].Set(worldLower.x,worldLower.y);
		vs[1].Set(worldUpper.x,worldLower.y);
		vs[2].Set(worldUpper.x,worldUpper.y);
		vs[3].Set(worldLower.x,worldUpper.y);
		this.m_debugDraw.DrawPolygon(vs,4,new box2D.common.B2Color(0.3,0.9,0.9));
	}
	if((flags & 16) != 0) {
		color.Set(0.5,0.3,0.5);
		b = this.m_bodyList;
		while(b != null) {
			xf = b.m_xf;
			s = b.GetShapeList();
			while(s != null) {
				if(s.m_type != 1) {
					s = s.m_next;
					continue;
				}
				var poly = (function($this) {
					var $r;
					var $t = s;
					if(Std["is"]($t,box2D.collision.shapes.B2PolygonShape)) $t; else throw "Class cast error";
					$r = $t;
					return $r;
				}(this));
				var obb = poly.GetOBB();
				var h = obb.extents;
				vs[0].Set(-h.x,-h.y);
				vs[1].Set(h.x,-h.y);
				vs[2].Set(h.x,h.y);
				vs[3].Set(-h.x,h.y);
				var _g = 0;
				while(_g < 4) {
					var i1 = _g++;
					var tMat = obb.R;
					var tVec = vs[i1];
					var tX;
					tX = obb.center.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
					vs[i1].y = obb.center.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
					vs[i1].x = tX;
					tMat = xf.R;
					tX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
					vs[i1].y = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
					vs[i1].x = tX;
				}
				this.m_debugDraw.DrawPolygon(vs,4,color);
				s = s.m_next;
			}
			b = b.m_next;
		}
	}
	if((flags & 64) != 0) {
		b = this.m_bodyList;
		while(b != null) {
			xf = box2D.dynamics.B2World.s_xf;
			xf.R = b.m_xf.R;
			xf.position = b.GetWorldCenter();
			this.m_debugDraw.DrawXForm(xf);
			b = b.m_next;
		}
	}
}
box2D.dynamics.B2World.prototype.m_blockAllocator = null;
box2D.dynamics.B2World.prototype.m_stackAllocator = null;
box2D.dynamics.B2World.prototype.m_lock = null;
box2D.dynamics.B2World.prototype.m_broadPhase = null;
box2D.dynamics.B2World.prototype.m_contactManager = null;
box2D.dynamics.B2World.prototype.m_bodyList = null;
box2D.dynamics.B2World.prototype.m_jointList = null;
box2D.dynamics.B2World.prototype.m_contactList = null;
box2D.dynamics.B2World.prototype.m_bodyCount = null;
box2D.dynamics.B2World.prototype.m_contactCount = null;
box2D.dynamics.B2World.prototype.m_jointCount = null;
box2D.dynamics.B2World.prototype.m_gravity = null;
box2D.dynamics.B2World.prototype.m_allowSleep = null;
box2D.dynamics.B2World.prototype.m_groundBody = null;
box2D.dynamics.B2World.prototype.m_destructionListener = null;
box2D.dynamics.B2World.prototype.m_boundaryListener = null;
box2D.dynamics.B2World.prototype.m_contactFilter = null;
box2D.dynamics.B2World.prototype.m_contactListener = null;
box2D.dynamics.B2World.prototype.m_debugDraw = null;
box2D.dynamics.B2World.prototype.m_inv_dt0 = null;
box2D.dynamics.B2World.prototype.m_positionIterationCount = null;
box2D.dynamics.B2World.prototype.__class__ = box2D.dynamics.B2World;
box2D.dynamics.joints.B2PulleyJointDef = function(p) {
	if( p === $_ ) return;
	box2D.dynamics.joints.B2JointDef.call(this);
	this.groundAnchor1 = new box2D.common.math.B2Vec2();
	this.groundAnchor2 = new box2D.common.math.B2Vec2();
	this.localAnchor1 = new box2D.common.math.B2Vec2();
	this.localAnchor2 = new box2D.common.math.B2Vec2();
	this.type = 4;
	this.groundAnchor1.Set(-1.0,1.0);
	this.groundAnchor2.Set(1.0,1.0);
	this.localAnchor1.Set(-1.0,0.0);
	this.localAnchor2.Set(1.0,0.0);
	this.length1 = 0.0;
	this.maxLength1 = 0.0;
	this.length2 = 0.0;
	this.maxLength2 = 0.0;
	this.ratio = 1.0;
	this.collideConnected = true;
}
box2D.dynamics.joints.B2PulleyJointDef.__name__ = ["box2D","dynamics","joints","B2PulleyJointDef"];
box2D.dynamics.joints.B2PulleyJointDef.__super__ = box2D.dynamics.joints.B2JointDef;
for(var k in box2D.dynamics.joints.B2JointDef.prototype ) box2D.dynamics.joints.B2PulleyJointDef.prototype[k] = box2D.dynamics.joints.B2JointDef.prototype[k];
box2D.dynamics.joints.B2PulleyJointDef.prototype.Initialize = function(b1,b2,ga1,ga2,anchor1,anchor2,r) {
	this.body1 = b1;
	this.body2 = b2;
	this.groundAnchor1.SetV(ga1);
	this.groundAnchor2.SetV(ga2);
	this.localAnchor1 = box2D.common.math.B2Math.b2MulXT(this.body1.m_xf,anchor1);
	this.localAnchor2 = box2D.common.math.B2Math.b2MulXT(this.body2.m_xf,anchor2);
	var d1X = anchor1.x - ga1.x;
	var d1Y = anchor1.y - ga1.y;
	this.length1 = Math.sqrt(d1X * d1X + d1Y * d1Y);
	var d2X = anchor2.x - ga2.x;
	var d2Y = anchor2.y - ga2.y;
	this.length2 = Math.sqrt(d2X * d2X + d2Y * d2Y);
	this.ratio = r;
	var C = this.length1 + this.ratio * this.length2;
	this.maxLength1 = C - this.ratio * box2D.dynamics.joints.B2PulleyJoint.b2_minPulleyLength;
	this.maxLength2 = (C - box2D.dynamics.joints.B2PulleyJoint.b2_minPulleyLength) / this.ratio;
}
box2D.dynamics.joints.B2PulleyJointDef.prototype.groundAnchor1 = null;
box2D.dynamics.joints.B2PulleyJointDef.prototype.groundAnchor2 = null;
box2D.dynamics.joints.B2PulleyJointDef.prototype.localAnchor1 = null;
box2D.dynamics.joints.B2PulleyJointDef.prototype.localAnchor2 = null;
box2D.dynamics.joints.B2PulleyJointDef.prototype.length1 = null;
box2D.dynamics.joints.B2PulleyJointDef.prototype.maxLength1 = null;
box2D.dynamics.joints.B2PulleyJointDef.prototype.length2 = null;
box2D.dynamics.joints.B2PulleyJointDef.prototype.maxLength2 = null;
box2D.dynamics.joints.B2PulleyJointDef.prototype.ratio = null;
box2D.dynamics.joints.B2PulleyJointDef.prototype.__class__ = box2D.dynamics.joints.B2PulleyJointDef;
if(typeof hxs=='undefined') hxs = {}
if(!hxs.core) hxs.core = {}
hxs.core.Info = function(signal,slot) {
	if( signal === $_ ) return;
	this.target = signal.target;
	this.signal = signal;
	this.slot = slot;
}
hxs.core.Info.__name__ = ["hxs","core","Info"];
hxs.core.Info.prototype.target = null;
hxs.core.Info.prototype.signal = null;
hxs.core.Info.prototype.slot = null;
hxs.core.Info.prototype.__class__ = hxs.core.Info;
box2D.collision.B2PairManager = function(p) {
	if( p === $_ ) return;
	var i;
	this.m_hashTable = new Array();
	var _g1 = 0, _g = box2D.common.B2Settings.b2_maxPairs;
	while(_g1 < _g) {
		var i1 = _g1++;
		this.m_hashTable[i1] = 65535;
	}
	this.m_pairs = new Array();
	var _g1 = 0, _g = box2D.common.B2Settings.b2_maxPairs;
	while(_g1 < _g) {
		var i1 = _g1++;
		this.m_pairs[i1] = new box2D.collision.B2Pair();
	}
	this.m_pairBuffer = new Array();
	var _g1 = 0, _g = box2D.common.B2Settings.b2_maxPairs;
	while(_g1 < _g) {
		var i1 = _g1++;
		this.m_pairBuffer[i1] = new box2D.collision.B2BufferedPair();
	}
	var _g1 = 0, _g = box2D.common.B2Settings.b2_maxPairs;
	while(_g1 < _g) {
		var i1 = _g1++;
		this.m_pairs[i1].proxyId1 = 65535;
		this.m_pairs[i1].proxyId2 = 65535;
		this.m_pairs[i1].userData = null;
		this.m_pairs[i1].status = 0;
		this.m_pairs[i1].next = i1 + 1;
	}
	this.m_pairs[box2D.common.B2Settings.b2_maxPairs - 1].next = 65535;
	this.m_pairCount = 0;
	this.m_pairBufferCount = 0;
	this.m_freePair = 0;
}
box2D.collision.B2PairManager.__name__ = ["box2D","collision","B2PairManager"];
box2D.collision.B2PairManager.calcHash = function(proxyId1,proxyId2) {
	var key = proxyId2 << 16 & -65536 | proxyId1;
	key = ~key + (key << 15 & -32768);
	key = key ^ key >> 12 & 1048575;
	key = key + (key << 2 & -4);
	key = key ^ key >> 4 & 268435455;
	key = key * 2057;
	key = key ^ key >> 16 & 65535;
	return key;
}
box2D.collision.B2PairManager.Equals = function(pair,proxyId1,proxyId2) {
	return pair.proxyId1 == proxyId1 && pair.proxyId2 == proxyId2;
}
box2D.collision.B2PairManager.EqualsPair = function(pair1,pair2) {
	return pair1.proxyId1 == pair2.proxyId1 && pair1.proxyId2 == pair2.proxyId2;
}
box2D.collision.B2PairManager.prototype.Initialize = function(broadPhase,myCallback) {
	this.m_broadPhase = broadPhase;
	this.m_myCallback = myCallback;
}
box2D.collision.B2PairManager.prototype.AddBufferedPair = function(proxyId1,proxyId2) {
	var bufferedPair;
	var pair = this.AddPair(proxyId1,proxyId2);
	if((pair.status & 1) == 1 == false) {
		pair.status |= 1;
		bufferedPair = this.m_pairBuffer[this.m_pairBufferCount];
		bufferedPair.proxyId1 = pair.proxyId1;
		bufferedPair.proxyId2 = pair.proxyId2;
		++this.m_pairBufferCount;
	}
	pair.status &= -3;
}
box2D.collision.B2PairManager.prototype.RemoveBufferedPair = function(proxyId1,proxyId2) {
	var bufferedPair;
	var pair = this.Find(proxyId1,proxyId2);
	if(pair == null) return;
	if((pair.status & 1) == 1 == false) {
		pair.status |= 1;
		bufferedPair = this.m_pairBuffer[this.m_pairBufferCount];
		bufferedPair.proxyId1 = pair.proxyId1;
		bufferedPair.proxyId2 = pair.proxyId2;
		++this.m_pairBufferCount;
	}
	pair.status |= 2;
}
box2D.collision.B2PairManager.prototype.Commit = function() {
	var bufferedPair;
	var i;
	var removeCount = 0;
	var proxies = this.m_broadPhase.m_proxyPool;
	var _g1 = 0, _g = this.m_pairBufferCount;
	while(_g1 < _g) {
		var i1 = _g1++;
		bufferedPair = this.m_pairBuffer[i1];
		var pair = this.Find(bufferedPair.proxyId1,bufferedPair.proxyId2);
		pair.status &= -2;
		var proxy1 = proxies[pair.proxyId1];
		var proxy2 = proxies[pair.proxyId2];
		if((pair.status & 2) == 2) {
			if((pair.status & 4) == 4 == true) this.m_myCallback.PairRemoved(proxy1.userData,proxy2.userData,pair.userData);
			bufferedPair = this.m_pairBuffer[removeCount];
			bufferedPair.proxyId1 = pair.proxyId1;
			bufferedPair.proxyId2 = pair.proxyId2;
			++removeCount;
		} else if((pair.status & 4) == 4 == false) {
			pair.userData = this.m_myCallback.PairAdded(proxy1.userData,proxy2.userData);
			pair.status |= 4;
		}
	}
	var _g = 0;
	while(_g < removeCount) {
		var i1 = _g++;
		bufferedPair = this.m_pairBuffer[i1];
		this.RemovePair(bufferedPair.proxyId1,bufferedPair.proxyId2);
	}
	this.m_pairBufferCount = 0;
}
box2D.collision.B2PairManager.prototype.AddPair = function(proxyId1,proxyId2) {
	if(proxyId1 > proxyId2) {
		var temp = proxyId1;
		proxyId1 = proxyId2;
		proxyId2 = temp;
	}
	var hash = box2D.collision.B2PairManager.calcHash(proxyId1,proxyId2) & box2D.collision.B2Pair.b2_tableMask;
	var pair = this.FindHash(proxyId1,proxyId2,hash);
	if(pair != null) return pair;
	var pIndex = this.m_freePair;
	pair = this.m_pairs[pIndex];
	this.m_freePair = pair.next;
	pair.proxyId1 = proxyId1;
	pair.proxyId2 = proxyId2;
	pair.status = 0;
	pair.userData = null;
	pair.next = this.m_hashTable[hash];
	this.m_hashTable[hash] = pIndex;
	++this.m_pairCount;
	return pair;
}
box2D.collision.B2PairManager.prototype.RemovePair = function(proxyId1,proxyId2) {
	var pair;
	if(proxyId1 > proxyId2) {
		var temp = proxyId1;
		proxyId1 = proxyId2;
		proxyId2 = temp;
	}
	var hash = box2D.collision.B2PairManager.calcHash(proxyId1,proxyId2) & box2D.collision.B2Pair.b2_tableMask;
	var node = this.m_hashTable[hash];
	var pNode = null;
	while(node != 65535) if(box2D.collision.B2PairManager.Equals(this.m_pairs[node],proxyId1,proxyId2)) {
		var index = node;
		pair = this.m_pairs[node];
		if(pNode != null) pNode.next = pair.next; else this.m_hashTable[hash] = pair.next;
		pair = this.m_pairs[index];
		var userData = pair.userData;
		pair.next = this.m_freePair;
		pair.proxyId1 = 65535;
		pair.proxyId2 = 65535;
		pair.userData = null;
		pair.status = 0;
		this.m_freePair = index;
		--this.m_pairCount;
		return userData;
	} else {
		pNode = this.m_pairs[node];
		node = pNode.next;
	}
	return null;
}
box2D.collision.B2PairManager.prototype.Find = function(proxyId1,proxyId2) {
	if(proxyId1 > proxyId2) {
		var temp = proxyId1;
		proxyId1 = proxyId2;
		proxyId2 = temp;
	}
	var hash = box2D.collision.B2PairManager.calcHash(proxyId1,proxyId2) & box2D.collision.B2Pair.b2_tableMask;
	return this.FindHash(proxyId1,proxyId2,hash);
}
box2D.collision.B2PairManager.prototype.FindHash = function(proxyId1,proxyId2,hash) {
	var pair;
	var index = this.m_hashTable[hash];
	pair = this.m_pairs[index];
	while(index != 65535 && (pair.proxyId1 == proxyId1 && pair.proxyId2 == proxyId2) == false) {
		index = pair.next;
		pair = this.m_pairs[index];
	}
	if(index == 65535) return null; else return pair;
}
box2D.collision.B2PairManager.prototype.ValidateBuffer = function() {
}
box2D.collision.B2PairManager.prototype.ValidateTable = function() {
}
box2D.collision.B2PairManager.prototype.m_broadPhase = null;
box2D.collision.B2PairManager.prototype.m_myCallback = null;
box2D.collision.B2PairManager.prototype.m_pairs = null;
box2D.collision.B2PairManager.prototype.m_freePair = null;
box2D.collision.B2PairManager.prototype.m_pairCount = null;
box2D.collision.B2PairManager.prototype.m_pairBuffer = null;
box2D.collision.B2PairManager.prototype.m_pairBufferCount = null;
box2D.collision.B2PairManager.prototype.m_hashTable = null;
box2D.collision.B2PairManager.prototype.__class__ = box2D.collision.B2PairManager;
haxe.Resource = function() { }
haxe.Resource.__name__ = ["haxe","Resource"];
haxe.Resource.content = null;
haxe.Resource.listNames = function() {
	var names = new Array();
	var _g = 0, _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		names.push(x.name);
	}
	return names;
}
haxe.Resource.getString = function(name) {
	var _g = 0, _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return x.str;
			var b = haxe.Unserializer.run(x.data);
			return b.toString();
		}
	}
	return null;
}
haxe.Resource.getBytes = function(name) {
	var _g = 0, _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return haxe.io.Bytes.ofString(x.str);
			return haxe.Unserializer.run(x.data);
		}
	}
	return null;
}
haxe.Resource.prototype.__class__ = haxe.Resource;
box2D.dynamics.joints.B2RevoluteJointDef = function(p) {
	if( p === $_ ) return;
	box2D.dynamics.joints.B2JointDef.call(this);
	this.type = 1;
	this.localAnchor1 = new box2D.common.math.B2Vec2();
	this.localAnchor2 = new box2D.common.math.B2Vec2();
	this.localAnchor1.Set(0.0,0.0);
	this.localAnchor2.Set(0.0,0.0);
	this.referenceAngle = 0.0;
	this.lowerAngle = 0.0;
	this.upperAngle = 0.0;
	this.maxMotorTorque = 0.0;
	this.motorSpeed = 0.0;
	this.enableLimit = false;
	this.enableMotor = false;
}
box2D.dynamics.joints.B2RevoluteJointDef.__name__ = ["box2D","dynamics","joints","B2RevoluteJointDef"];
box2D.dynamics.joints.B2RevoluteJointDef.__super__ = box2D.dynamics.joints.B2JointDef;
for(var k in box2D.dynamics.joints.B2JointDef.prototype ) box2D.dynamics.joints.B2RevoluteJointDef.prototype[k] = box2D.dynamics.joints.B2JointDef.prototype[k];
box2D.dynamics.joints.B2RevoluteJointDef.prototype.Initialize = function(b1,b2,anchor) {
	this.body1 = b1;
	this.body2 = b2;
	this.localAnchor1 = box2D.common.math.B2Math.b2MulXT(this.body1.m_xf,anchor);
	this.localAnchor2 = box2D.common.math.B2Math.b2MulXT(this.body2.m_xf,anchor);
	this.referenceAngle = this.body2.GetAngle() - this.body1.GetAngle();
}
box2D.dynamics.joints.B2RevoluteJointDef.prototype.localAnchor1 = null;
box2D.dynamics.joints.B2RevoluteJointDef.prototype.localAnchor2 = null;
box2D.dynamics.joints.B2RevoluteJointDef.prototype.referenceAngle = null;
box2D.dynamics.joints.B2RevoluteJointDef.prototype.enableLimit = null;
box2D.dynamics.joints.B2RevoluteJointDef.prototype.lowerAngle = null;
box2D.dynamics.joints.B2RevoluteJointDef.prototype.upperAngle = null;
box2D.dynamics.joints.B2RevoluteJointDef.prototype.enableMotor = null;
box2D.dynamics.joints.B2RevoluteJointDef.prototype.motorSpeed = null;
box2D.dynamics.joints.B2RevoluteJointDef.prototype.maxMotorTorque = null;
box2D.dynamics.joints.B2RevoluteJointDef.prototype.__class__ = box2D.dynamics.joints.B2RevoluteJointDef;
box2D.common.B2Settings = function(p) {
}
box2D.common.B2Settings.__name__ = ["box2D","common","B2Settings"];
box2D.common.B2Settings.b2Assert = function(a) {
	if(!a) {
		var nullVec = new box2D.common.math.B2Vec2();
		nullVec.x++;
	}
}
box2D.common.B2Settings.prototype.__class__ = box2D.common.B2Settings;
box2D.dynamics.joints.B2DistanceJointDef = function(p) {
	if( p === $_ ) return;
	box2D.dynamics.joints.B2JointDef.call(this);
	this.localAnchor1 = new box2D.common.math.B2Vec2();
	this.localAnchor2 = new box2D.common.math.B2Vec2();
	this.type = 3;
	this.length = 1.0;
	this.frequencyHz = 0.0;
	this.dampingRatio = 0.0;
}
box2D.dynamics.joints.B2DistanceJointDef.__name__ = ["box2D","dynamics","joints","B2DistanceJointDef"];
box2D.dynamics.joints.B2DistanceJointDef.__super__ = box2D.dynamics.joints.B2JointDef;
for(var k in box2D.dynamics.joints.B2JointDef.prototype ) box2D.dynamics.joints.B2DistanceJointDef.prototype[k] = box2D.dynamics.joints.B2JointDef.prototype[k];
box2D.dynamics.joints.B2DistanceJointDef.prototype.Initialize = function(b1,b2,anchor1,anchor2) {
	this.body1 = b1;
	this.body2 = b2;
	this.localAnchor1.SetV(box2D.common.math.B2Math.b2MulXT(this.body1.m_xf,anchor1));
	this.localAnchor2.SetV(box2D.common.math.B2Math.b2MulXT(this.body2.m_xf,anchor2));
	var dX = anchor2.x - anchor1.x;
	var dY = anchor2.y - anchor1.y;
	this.length = Math.sqrt(dX * dX + dY * dY);
	this.frequencyHz = 0.0;
	this.dampingRatio = 0.0;
}
box2D.dynamics.joints.B2DistanceJointDef.prototype.localAnchor1 = null;
box2D.dynamics.joints.B2DistanceJointDef.prototype.localAnchor2 = null;
box2D.dynamics.joints.B2DistanceJointDef.prototype.length = null;
box2D.dynamics.joints.B2DistanceJointDef.prototype.frequencyHz = null;
box2D.dynamics.joints.B2DistanceJointDef.prototype.dampingRatio = null;
box2D.dynamics.joints.B2DistanceJointDef.prototype.__class__ = box2D.dynamics.joints.B2DistanceJointDef;
box2D.collision.ClipVertex = function(p) {
	if( p === $_ ) return;
	this.v = new box2D.common.math.B2Vec2();
	this.id = new box2D.collision.B2ContactID();
}
box2D.collision.ClipVertex.__name__ = ["box2D","collision","ClipVertex"];
box2D.collision.ClipVertex.prototype.v = null;
box2D.collision.ClipVertex.prototype.id = null;
box2D.collision.ClipVertex.prototype.__class__ = box2D.collision.ClipVertex;
if(typeof js=='undefined') js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg); else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = ""; else null;
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
box2D.dynamics.B2ContactListener = function(p) {
}
box2D.dynamics.B2ContactListener.__name__ = ["box2D","dynamics","B2ContactListener"];
box2D.dynamics.B2ContactListener.prototype.Add = function(point) {
}
box2D.dynamics.B2ContactListener.prototype.Persist = function(point) {
}
box2D.dynamics.B2ContactListener.prototype.Remove = function(point) {
}
box2D.dynamics.B2ContactListener.prototype.Result = function(point) {
}
box2D.dynamics.B2ContactListener.prototype.__class__ = box2D.dynamics.B2ContactListener;
if(typeof touchmypixel=='undefined') touchmypixel = {}
if(!touchmypixel.game) touchmypixel.game = {}
if(!touchmypixel.game.box2d) touchmypixel.game.box2d = {}
touchmypixel.game.box2d.ContactManager = function(p) {
	if( p === $_ ) return;
	box2D.dynamics.B2ContactListener.call(this);
	this.clearList = [];
	this.clear();
}
touchmypixel.game.box2d.ContactManager.__name__ = ["touchmypixel","game","box2d","ContactManager"];
touchmypixel.game.box2d.ContactManager.__super__ = box2D.dynamics.B2ContactListener;
for(var k in box2D.dynamics.B2ContactListener.prototype ) touchmypixel.game.box2d.ContactManager.prototype[k] = box2D.dynamics.B2ContactListener.prototype[k];
touchmypixel.game.box2d.ContactManager.prototype.clearList = null;
touchmypixel.game.box2d.ContactManager.prototype.Add = function(point) {
	this.registerContact("add",point);
}
touchmypixel.game.box2d.ContactManager.prototype.Persist = function(point) {
	this.registerContact("persist",point);
}
touchmypixel.game.box2d.ContactManager.prototype.Remove = function(point) {
	this.registerContact("remove",point);
}
touchmypixel.game.box2d.ContactManager.prototype.registerContact = function(type,point) {
	var o1 = null;
	if(Std["is"](point.shape1.m_body.GetUserData(),touchmypixel.game.objects.Box2dBodyObject)) o1 = point.shape1.m_body.GetUserData();
	var o2 = null;
	if(Std["is"](point.shape2.m_body.GetUserData(),touchmypixel.game.objects.Box2dBodyObject)) o2 = point.shape2.m_body.GetUserData();
	var h;
	var cp = { object1 : o1, object2 : o2, body1 : point.shape1.m_body, body2 : point.shape2.m_body, shape1 : point.shape1, shape2 : point.shape2};
	if(o1 != null && o1.cacheContacts) {
		h = Reflect.field(o1,"contacts_" + type);
		if(!(function($this) {
			var $r;
			if(o2.__objectId == -1) throw "Object: " + o2 + " is not registered with the ObjectHash manager";
			$r = h.values.exists(o2.__objectId);
			return $r;
		}(this))) h.set(o2,[cp]); else h.get(o2).push(cp);
		this.clearList.push(o1);
	}
	if(o2 != null && o2.cacheContacts) {
		h = Reflect.field(o2,"contacts_" + type);
		if(!(function($this) {
			var $r;
			if(o1.__objectId == -1) throw "Object: " + o1 + " is not registered with the ObjectHash manager";
			$r = h.values.exists(o1.__objectId);
			return $r;
		}(this))) h.set(o1,[cp]); else h.get(o1).push(cp);
		this.clearList.push(o2);
	}
}
touchmypixel.game.box2d.ContactManager.prototype.clear = function() {
	var _g = 0, _g1 = this.clearList;
	while(_g < _g1.length) {
		var obj = _g1[_g];
		++_g;
		obj.contacts_add = new touchmypixel.game.ds.ObjectHash();
		obj.contacts_persist = new touchmypixel.game.ds.ObjectHash();
		obj.contacts_remove = new touchmypixel.game.ds.ObjectHash();
	}
	this.clearList = [];
}
touchmypixel.game.box2d.ContactManager.prototype.__class__ = touchmypixel.game.box2d.ContactManager;
box2D.collision.B2Manifold = function(p) {
	if( p === $_ ) return;
	this.pointCount = 0;
	this.points = new Array();
	var _g = 0;
	while(_g < 2) {
		var i = _g++;
		this.points[i] = new box2D.collision.B2ManifoldPoint();
	}
	this.normal = new box2D.common.math.B2Vec2();
}
box2D.collision.B2Manifold.__name__ = ["box2D","collision","B2Manifold"];
box2D.collision.B2Manifold.prototype.Reset = function() {
	var _g = 0;
	while(_g < 2) {
		var i = _g++;
		this.points[i].Reset();
	}
	this.normal.SetZero();
	this.pointCount = 0;
}
box2D.collision.B2Manifold.prototype.Set = function(m) {
	this.pointCount = m.pointCount;
	var _g = 0;
	while(_g < 2) {
		var i = _g++;
		this.points[i].Set(m.points[i]);
	}
	this.normal.SetV(m.normal);
}
box2D.collision.B2Manifold.prototype.points = null;
box2D.collision.B2Manifold.prototype.normal = null;
box2D.collision.B2Manifold.prototype.pointCount = null;
box2D.collision.B2Manifold.prototype.__class__ = box2D.collision.B2Manifold;
haxe.Int32 = function() { }
haxe.Int32.__name__ = ["haxe","Int32"];
haxe.Int32.make = function(a,b) {
	return a << 16 | b;
}
haxe.Int32.ofInt = function(x) {
	return x;
}
haxe.Int32.toInt = function(x) {
	if((x >> 30 & 1) != x >>> 31) throw "Overflow " + x;
	return x & -1;
}
haxe.Int32.toNativeInt = function(x) {
	return x;
}
haxe.Int32.add = function(a,b) {
	return a + b;
}
haxe.Int32.sub = function(a,b) {
	return a - b;
}
haxe.Int32.mul = function(a,b) {
	return a * b;
}
haxe.Int32.div = function(a,b) {
	return Std["int"](a / b);
}
haxe.Int32.mod = function(a,b) {
	return a % b;
}
haxe.Int32.shl = function(a,b) {
	return a << b;
}
haxe.Int32.shr = function(a,b) {
	return a >> b;
}
haxe.Int32.ushr = function(a,b) {
	return a >>> b;
}
haxe.Int32.and = function(a,b) {
	return a & b;
}
haxe.Int32.or = function(a,b) {
	return a | b;
}
haxe.Int32.xor = function(a,b) {
	return a ^ b;
}
haxe.Int32.neg = function(a) {
	return -a;
}
haxe.Int32.complement = function(a) {
	return ~a;
}
haxe.Int32.compare = function(a,b) {
	return a - b;
}
haxe.Int32.prototype.__class__ = haxe.Int32;
fboyle.utils.DisplayObjectUtil = function() { }
fboyle.utils.DisplayObjectUtil.__name__ = ["fboyle","utils","DisplayObjectUtil"];
fboyle.utils.DisplayObjectUtil.stage = null;
fboyle.utils.DisplayObjectUtil.setStage = function(canvas) {
	fboyle.utils.DisplayObjectUtil.stage = new Stage(canvas);
}
fboyle.utils.DisplayObjectUtil.enableMouseOver = function(rate) {
	fboyle.utils.DisplayObjectUtil.stage.enableMouseOver(rate);
}
fboyle.utils.DisplayObjectUtil.getStage = function() {
	if(fboyle.utils.DisplayObjectUtil.stage == null) haxe.Log.trace("warning: canvas/stage hasn't been defined!",{ fileName : "DisplayObjectUtil.hx", lineNumber : 75, className : "fboyle.utils.DisplayObjectUtil", methodName : "getStage"});
	return fboyle.utils.DisplayObjectUtil.stage;
}
fboyle.utils.DisplayObjectUtil.createBitmap = function(objectInfo,addToScope) {
	var displayList = fboyle.display.DisplayFactory.setDisplayList();
	var bmp = displayList.loadBitmap(objectInfo.file);
	bmp.x = objectInfo.x;
	bmp.y = objectInfo.y;
	bmp.rotation = objectInfo.rotation;
	if(addToScope != null) displayList.addChild(bmp,addToScope);
	return bmp;
}
fboyle.utils.DisplayObjectUtil.createMovieClip = function(objectInfo,addToScope) {
	var displayList = fboyle.display.DisplayFactory.setDisplayList();
	var frames = objectInfo.sheetindicies.split(",");
	if(frames.length == 1) return fboyle.utils.DisplayObjectUtil.createBitmap(objectInfo,addToScope);
	var seqInfo = { name : objectInfo.name, frameWidth : objectInfo.frameWidth, frameHeight : objectInfo.frameHeight, registrationPoint : { x : 0, y : 0}, startFrame : frames[0], endFrame : frames[1], scope : addToScope};
	var mc = displayList.loadMovieClip(objectInfo.file,seqInfo);
	mc.x = objectInfo.x;
	mc.y = objectInfo.y;
	mc.rotation = objectInfo.rotation;
	if(addToScope != null) displayList.addChild(mc,addToScope);
	return mc;
}
fboyle.utils.DisplayObjectUtil.addChild = function(object,container) {
	var displayList = fboyle.display.DisplayFactory.setDisplayList();
	displayList.addChild(object,container);
}
fboyle.utils.DisplayObjectUtil.removeChild = function(object,container) {
	var displayList = fboyle.display.DisplayFactory.setDisplayList();
	if(container != null) displayList.removeChild(object,container); else displayList.removeChild(object);
}
fboyle.utils.DisplayObjectUtil.prototype.__class__ = fboyle.utils.DisplayObjectUtil;
box2D.common.math.B2Vec2 = function(x_,y_) {
	if( x_ === $_ ) return;
	if(y_ == null) y_ = 0.0;
	if(x_ == null) x_ = 0.0;
	this.x = x_;
	this.y = y_;
}
box2D.common.math.B2Vec2.__name__ = ["box2D","common","math","B2Vec2"];
box2D.common.math.B2Vec2.Make = function(x_,y_) {
	return new box2D.common.math.B2Vec2(x_,y_);
}
box2D.common.math.B2Vec2.prototype.SetZero = function() {
	this.x = 0.0;
	this.y = 0.0;
}
box2D.common.math.B2Vec2.prototype.Set = function(x_,y_) {
	if(y_ == null) y_ = 0.0;
	if(x_ == null) x_ = 0.0;
	this.x = x_;
	this.y = y_;
}
box2D.common.math.B2Vec2.prototype.SetV = function(v) {
	this.x = v.x;
	this.y = v.y;
}
box2D.common.math.B2Vec2.prototype.Negative = function() {
	return new box2D.common.math.B2Vec2(-this.x,-this.y);
}
box2D.common.math.B2Vec2.prototype.Copy = function() {
	return new box2D.common.math.B2Vec2(this.x,this.y);
}
box2D.common.math.B2Vec2.prototype.Add = function(v) {
	this.x += v.x;
	this.y += v.y;
}
box2D.common.math.B2Vec2.prototype.Subtract = function(v) {
	this.x -= v.x;
	this.y -= v.y;
}
box2D.common.math.B2Vec2.prototype.Multiply = function(a) {
	this.x *= a;
	this.y *= a;
}
box2D.common.math.B2Vec2.prototype.MulM = function(A) {
	var tX = this.x;
	this.x = A.col1.x * tX + A.col2.x * this.y;
	this.y = A.col1.y * tX + A.col2.y * this.y;
}
box2D.common.math.B2Vec2.prototype.MulTM = function(A) {
	var tX = box2D.common.math.B2Math.b2Dot(this,A.col1);
	this.y = box2D.common.math.B2Math.b2Dot(this,A.col2);
	this.x = tX;
}
box2D.common.math.B2Vec2.prototype.CrossVF = function(s) {
	var tX = this.x;
	this.x = s * this.y;
	this.y = -s * tX;
}
box2D.common.math.B2Vec2.prototype.CrossFV = function(s) {
	var tX = this.x;
	this.x = -s * this.y;
	this.y = s * tX;
}
box2D.common.math.B2Vec2.prototype.MinV = function(b) {
	this.x = this.x < b.x?this.x:b.x;
	this.y = this.y < b.y?this.y:b.y;
}
box2D.common.math.B2Vec2.prototype.MaxV = function(b) {
	this.x = this.x > b.x?this.x:b.x;
	this.y = this.y > b.y?this.y:b.y;
}
box2D.common.math.B2Vec2.prototype.Abs = function() {
	if(this.x < 0) this.x = -this.x;
	if(this.y < 0) this.y = -this.y;
}
box2D.common.math.B2Vec2.prototype.Length = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
}
box2D.common.math.B2Vec2.prototype.LengthSquared = function() {
	return this.x * this.x + this.y * this.y;
}
box2D.common.math.B2Vec2.prototype.Normalize = function() {
	var length = Math.sqrt(this.x * this.x + this.y * this.y);
	if(length < 5.0e-324) return 0.0; else {
		var invLength = 1.0 / length;
		this.x *= invLength;
		this.y *= invLength;
		return length;
	}
}
box2D.common.math.B2Vec2.prototype.IsValid = function() {
	return Math.isFinite(this.x) && Math.isFinite(this.y);
}
box2D.common.math.B2Vec2.prototype.x = null;
box2D.common.math.B2Vec2.prototype.y = null;
box2D.common.math.B2Vec2.prototype.__class__ = box2D.common.math.B2Vec2;
box2D.collision.B2Distance = function(p) {
}
box2D.collision.B2Distance.__name__ = ["box2D","collision","B2Distance"];
box2D.collision.B2Distance.ProcessTwo = function(x1,x2,p1s,p2s,points) {
	var points_0 = points[0];
	var points_1 = points[1];
	var p1s_0 = p1s[0];
	var p1s_1 = p1s[1];
	var p2s_0 = p2s[0];
	var p2s_1 = p2s[1];
	var rX = -points_1.x;
	var rY = -points_1.y;
	var dX = points_0.x - points_1.x;
	var dY = points_0.y - points_1.y;
	var length = Math.sqrt(dX * dX + dY * dY);
	dX /= length;
	dY /= length;
	var lambda = rX * dX + rY * dY;
	if(lambda <= 0.0 || length < 5.0e-324) {
		x1.x = p1s_1.x;
		x1.y = p1s_1.y;
		x2.x = p2s_1.x;
		x2.y = p2s_1.y;
		p1s_0.x = p1s_1.x;
		p1s_0.y = p1s_1.y;
		p2s_0.x = p2s_1.x;
		p2s_0.y = p2s_1.y;
		points_0.x = points_1.x;
		points_0.y = points_1.y;
		return 1;
	} else {
		lambda /= length;
		x1.x = p1s_1.x + lambda * (p1s_0.x - p1s_1.x);
		x1.y = p1s_1.y + lambda * (p1s_0.y - p1s_1.y);
		x2.x = p2s_1.x + lambda * (p2s_0.x - p2s_1.x);
		x2.y = p2s_1.y + lambda * (p2s_0.y - p2s_1.y);
		return 2;
	}
}
box2D.collision.B2Distance.ProcessThree = function(x1,x2,p1s,p2s,points) {
	var points_0 = points[0];
	var points_1 = points[1];
	var points_2 = points[2];
	var p1s_0 = p1s[0];
	var p1s_1 = p1s[1];
	var p1s_2 = p1s[2];
	var p2s_0 = p2s[0];
	var p2s_1 = p2s[1];
	var p2s_2 = p2s[2];
	var aX = points_0.x;
	var aY = points_0.y;
	var bX = points_1.x;
	var bY = points_1.y;
	var cX = points_2.x;
	var cY = points_2.y;
	var abX = bX - aX;
	var abY = bY - aY;
	var acX = cX - aX;
	var acY = cY - aY;
	var bcX = cX - bX;
	var bcY = cY - bY;
	var sn = -(aX * abX + aY * abY);
	var sd = bX * abX + bY * abY;
	var tn = -(aX * acX + aY * acY);
	var td = cX * acX + cY * acY;
	var un = -(bX * bcX + bY * bcY);
	var ud = cX * bcX + cY * bcY;
	if(td <= 0.0 && ud <= 0.0) {
		x1.x = p1s_2.x;
		x1.y = p1s_2.y;
		x2.x = p2s_2.x;
		x2.y = p2s_2.y;
		p1s_0.x = p1s_2.x;
		p1s_0.y = p1s_2.y;
		p2s_0.x = p2s_2.x;
		p2s_0.y = p2s_2.y;
		points_0.x = points_2.x;
		points_0.y = points_2.y;
		return 1;
	} else {
		var n = abX * acY - abY * acX;
		var vc = n * (aX * bY - aY * bX);
		var lambda;
		var va = n * (bX * cY - bY * cX);
		if(va <= 0.0 && un >= 0.0 && ud >= 0.0 && un + ud > 0.0) {
			lambda = un / (un + ud);
			x1.x = p1s_1.x + lambda * (p1s_2.x - p1s_1.x);
			x1.y = p1s_1.y + lambda * (p1s_2.y - p1s_1.y);
			x2.x = p2s_1.x + lambda * (p2s_2.x - p2s_1.x);
			x2.y = p2s_1.y + lambda * (p2s_2.y - p2s_1.y);
			p1s_0.x = p1s_2.x;
			p1s_0.y = p1s_2.y;
			p2s_0.x = p2s_2.x;
			p2s_0.y = p2s_2.y;
			points_0.x = points_2.x;
			points_0.y = points_2.y;
			return 2;
		} else {
			var vb = n * (cX * aY - cY * aX);
			if(vb <= 0.0 && tn >= 0.0 && td >= 0.0 && tn + td > 0.0) {
				lambda = tn / (tn + td);
				x1.x = p1s_0.x + lambda * (p1s_2.x - p1s_0.x);
				x1.y = p1s_0.y + lambda * (p1s_2.y - p1s_0.y);
				x2.x = p2s_0.x + lambda * (p2s_2.x - p2s_0.x);
				x2.y = p2s_0.y + lambda * (p2s_2.y - p2s_0.y);
				p1s_1.x = p1s_2.x;
				p1s_1.y = p1s_2.y;
				p2s_1.x = p2s_2.x;
				p2s_1.y = p2s_2.y;
				points_1.x = points_2.x;
				points_1.y = points_2.y;
				return 2;
			} else {
				var denom = va + vb + vc;
				denom = 1.0 / denom;
				var u = va * denom;
				var v = vb * denom;
				var w = 1.0 - u - v;
				x1.x = u * p1s_0.x + v * p1s_1.x + w * p1s_2.x;
				x1.y = u * p1s_0.y + v * p1s_1.y + w * p1s_2.y;
				x2.x = u * p2s_0.x + v * p2s_1.x + w * p2s_2.x;
				x2.y = u * p2s_0.y + v * p2s_1.y + w * p2s_2.y;
				return 3;
			}
		}
	}
}
box2D.collision.B2Distance.InPoints = function(w,points,pointCount) {
	var k_tolerance = 4.94065645841e-322;
	var _g = 0;
	while(_g < pointCount) {
		var i = _g++;
		var points_i = points[i];
		var dX = Math.abs(w.x - points_i.x);
		var dY = Math.abs(w.y - points_i.y);
		var mX = Math.max(Math.abs(w.x),Math.abs(points_i.x));
		var mY = Math.max(Math.abs(w.y),Math.abs(points_i.y));
		if(dX < k_tolerance * (mX + 1.0) && dY < k_tolerance * (mY + 1.0)) return true;
	}
	return false;
}
box2D.collision.B2Distance.DistanceGeneric = function(x1,x2,shape1,xf1,shape2,xf2) {
	var tVec;
	var p1s = box2D.collision.B2Distance.s_p1s;
	var p2s = box2D.collision.B2Distance.s_p2s;
	var points = box2D.collision.B2Distance.s_points;
	var pointCount = 0;
	x1.SetV(shape1.GetFirstVertex(xf1));
	x2.SetV(shape2.GetFirstVertex(xf2));
	var vSqr = 0.0;
	var maxIterations = 20;
	var _g = 0;
	while(_g < maxIterations) {
		var iter = _g++;
		var vX = x2.x - x1.x;
		var vY = x2.y - x1.y;
		var w1 = shape1.Support(xf1,vX,vY);
		var w2 = shape2.Support(xf2,-vX,-vY);
		vSqr = vX * vX + vY * vY;
		var wX = w2.x - w1.x;
		var wY = w2.y - w1.y;
		var vw = vX * wX + vY * wY;
		if(vSqr - (vX * wX + vY * wY) <= 0.01 * vSqr) {
			if(pointCount == 0) {
				x1.x = w1.x;
				x1.y = w1.y;
				x2.x = w2.x;
				x2.y = w2.y;
			}
			box2D.collision.B2Distance.g_GJK_Iterations = iter;
			return Math.sqrt(vSqr);
		} else {
			switch(pointCount) {
			case 0:
				tVec = p1s[0];
				tVec.x = w1.x;
				tVec.y = w1.y;
				tVec = p2s[0];
				tVec.x = w2.x;
				tVec.y = w2.y;
				tVec = points[0];
				tVec.x = wX;
				tVec.y = wY;
				x1.SetV(p1s[0]);
				x2.SetV(p2s[0]);
				++pointCount;
				break;
			case 1:
				tVec = p1s[1];
				tVec.x = w1.x;
				tVec.y = w1.y;
				tVec = p2s[1];
				tVec.x = w2.x;
				tVec.y = w2.y;
				tVec = points[1];
				tVec.x = wX;
				tVec.y = wY;
				pointCount = box2D.collision.B2Distance.ProcessTwo(x1,x2,p1s,p2s,points);
				break;
			case 2:
				tVec = p1s[2];
				tVec.x = w1.x;
				tVec.y = w1.y;
				tVec = p2s[2];
				tVec.x = w2.x;
				tVec.y = w2.y;
				tVec = points[2];
				tVec.x = wX;
				tVec.y = wY;
				pointCount = box2D.collision.B2Distance.ProcessThree(x1,x2,p1s,p2s,points);
				break;
			}
			if(pointCount == 3) {
				box2D.collision.B2Distance.g_GJK_Iterations = iter;
				return 0.0;
			} else {
				var maxSqr = -(2.0 + 308);
				var _g1 = 0;
				while(_g1 < pointCount) {
					var i = _g1++;
					tVec = points[i];
					maxSqr = box2D.common.math.B2Math.b2Max(maxSqr,tVec.x * tVec.x + tVec.y * tVec.y);
				}
				if(pointCount == 3 || vSqr <= 4.94065645841e-322 * maxSqr) {
					box2D.collision.B2Distance.g_GJK_Iterations = iter;
					vX = x2.x - x1.x;
					vY = x2.y - x1.y;
					vSqr = vX * vX + vY * vY;
					return Math.sqrt(vSqr);
				}
			}
		}
	}
	box2D.collision.B2Distance.g_GJK_Iterations = maxIterations;
	return Math.sqrt(vSqr);
}
box2D.collision.B2Distance.DistanceCC = function(x1,x2,circle1,xf1,circle2,xf2) {
	var tMat;
	var tVec;
	tMat = xf1.R;
	tVec = circle1.m_localPosition;
	var p1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var p1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	tMat = xf2.R;
	tVec = circle2.m_localPosition;
	var p2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var p2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	var dX = p2X - p1X;
	var dY = p2Y - p1Y;
	var dSqr = dX * dX + dY * dY;
	var r1 = circle1.m_radius - box2D.common.B2Settings.b2_toiSlop;
	var r2 = circle2.m_radius - box2D.common.B2Settings.b2_toiSlop;
	var r = r1 + r2;
	var dLen;
	if(dSqr > r * r) {
		dLen = Math.sqrt(dX * dX + dY * dY);
		dX /= dLen;
		dY /= dLen;
		var distance = dLen - r;
		x1.x = p1X + r1 * dX;
		x1.y = p1Y + r1 * dY;
		x2.x = p2X - r2 * dX;
		x2.y = p2Y - r2 * dY;
		return distance;
	} else if(dSqr > 0.) {
		dLen = Math.sqrt(dX * dX + dY * dY);
		dX /= dLen;
		dY /= dLen;
		x1.x = p1X + r1 * dX;
		x1.y = p1Y + r1 * dY;
		x2.x = x1.x;
		x2.y = x1.y;
		return 0.0;
	} else {
		x1.x = p1X;
		x1.y = p1Y;
		x2.x = x1.x;
		x2.y = x1.y;
		return 0.0;
	}
}
box2D.collision.B2Distance.DistancePC = function(x1,x2,polygon,xf1,circle,xf2) {
	var tMat;
	var tVec;
	var point = box2D.collision.B2Distance.gPoint;
	tVec = circle.m_localPosition;
	tMat = xf2.R;
	point.p.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	point.p.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	var distance = box2D.collision.B2Distance.DistanceGeneric(x1,x2,polygon,xf1,point,box2D.common.math.B2Math.b2XForm_identity);
	var r = circle.m_radius - box2D.common.B2Settings.b2_toiSlop;
	if(distance > r) {
		distance -= r;
		var dX = x2.x - x1.x;
		var dY = x2.y - x1.y;
		var dLen = Math.sqrt(dX * dX + dY * dY);
		dX /= dLen;
		dY /= dLen;
		x2.x -= r * dX;
		x2.y -= r * dY;
	} else {
		distance = 0.0;
		x2.x = x1.x;
		x2.y = x1.y;
	}
	return distance;
}
box2D.collision.B2Distance.Distance = function(x1,x2,shape1,xf1,shape2,xf2) {
	var type1 = shape1.m_type;
	var type2 = shape2.m_type;
	if(type1 == 0 && type2 == 0) return box2D.collision.B2Distance.DistanceCC(x1,x2,shape1,xf1,shape2,xf2); else if(type1 == 1 && type2 == 0) return box2D.collision.B2Distance.DistancePC(x1,x2,shape1,xf1,shape2,xf2); else if(type1 == 0 && type2 == 1) return box2D.collision.B2Distance.DistancePC(x2,x1,shape2,xf2,shape1,xf1); else if(type1 == 1 && type2 == 1) return box2D.collision.B2Distance.DistanceGeneric(x1,x2,shape1,xf1,shape2,xf2); else return 0.0;
}
box2D.collision.B2Distance.prototype.__class__ = box2D.collision.B2Distance;
if(!touchmypixel.game.simulations) touchmypixel.game.simulations = {}
touchmypixel.game.simulations.Box2dSimulation = function(debug,stage,s) {
	if( debug === $_ ) return;
	if(debug == null) debug = true;
	this.container = stage;
	this.easelStage = s;
	this.debug = debug;
	this.running = true;
	this.autoUpdateObjects = false;
	this.scale = 30.;
	this.iterations = 30;
	this.initAABB = new box2D.collision.B2AABB();
	this.initAABB.lowerBound.Set(-1000 / this.scale,-1000 / this.scale);
	this.initAABB.upperBound.Set(1000 / this.scale,1000 / this.scale);
	this.initGravity = new box2D.common.math.B2Vec2(0,200 / this.scale);
	this.initDoSleep = true;
	var debugShape = new Shape();
	this.container.addChild(debugShape);
	this.debugDrawScope = debugShape;
	this.objects = [];
	this.namedObjects = new Hash();
	this.bitmaps = [];
	this.emptyObjects = new Hash();
	this.nonGameObjects = new Hash();
	this.mousePos = new box2D.common.math.B2Vec2();
	this.timeStep = 1 / 50;
}
touchmypixel.game.simulations.Box2dSimulation.__name__ = ["touchmypixel","game","simulations","Box2dSimulation"];
touchmypixel.game.simulations.Box2dSimulation.prototype.world = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.scale = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.iterations = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.timeStep = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.initAABB = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.initGravity = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.initDoSleep = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.dbgDraw = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.debugDrawScope = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.running = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.debug = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.contactManager = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.objects = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.namedObjects = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.bitmaps = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.emptyObjects = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.nonGameObjects = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.autoUpdateObjects = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.mousePos = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.container = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.easelStage = null;
touchmypixel.game.simulations.Box2dSimulation.prototype.init = function() {
	this.world = new box2D.dynamics.B2World(this.initAABB,this.initGravity,this.initDoSleep);
	this.contactManager = new touchmypixel.game.box2d.ContactManager();
	this.world.SetContactListener(this.contactManager);
	this.dbgDraw = new box2D.dynamics.B2DebugDraw();
	this.dbgDraw.m_sprite = this.debugDrawScope;
	this.dbgDraw.m_fillAlpha = .3;
	this.dbgDraw.m_lineThickness = 1;
	this.dbgDraw.m_xformScale = 1;
	this.dbgDraw.m_drawScale = this.scale;
	this.dbgDraw.m_drawFlags = 67;
	if(this.debug) this.world.SetDebugDraw(this.dbgDraw);
}
touchmypixel.game.simulations.Box2dSimulation.prototype.update = function(dt) {
	if(this.running) {
		this.contactManager.clear();
		this.world.Step(this.timeStep != null?this.timeStep:dt,this.iterations);
		if(this.autoUpdateObjects) {
			var _g = 0, _g1 = this.objects;
			while(_g < _g1.length) {
				var o = _g1[_g];
				++_g;
				o.update(dt);
			}
		}
	}
}
touchmypixel.game.simulations.Box2dSimulation.prototype.sync = function(gfx,body,bodyOffset) {
	var position = body.GetPosition();
	var gfx1 = gfx;
	gfx1.x = position.x * this.scale;
	gfx1.y = position.y * this.scale;
	gfx1.rotation = body.GetXForm().R.GetAngle() * 180 / Math.PI;
	if(bodyOffset != null) {
		var r = body.GetXForm().R.GetAngle() + bodyOffset.rotation * Math.PI / 180;
		var ox = bodyOffset.x * Math.cos(r) - bodyOffset.y * Math.sin(r);
		var oy = bodyOffset.x * Math.sin(r) + bodyOffset.y * Math.cos(r);
		gfx1.x -= ox;
		gfx1.y -= oy;
	}
}
touchmypixel.game.simulations.Box2dSimulation.prototype.stop = function() {
	this.running = false;
}
touchmypixel.game.simulations.Box2dSimulation.prototype.start = function() {
	this.running = true;
}
touchmypixel.game.simulations.Box2dSimulation.prototype.destroy = function() {
	this.stop();
	if(this.objects != null) {
		var _g = 0, _g1 = this.objects;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			o.destroy();
		}
	}
	this.world = null;
	this.objects = null;
	this.namedObjects = null;
	this.bitmaps = null;
	this.emptyObjects = null;
	this.nonGameObjects = null;
	this.contactManager.clear();
}
touchmypixel.game.simulations.Box2dSimulation.prototype.getBodyAtMouse = function(includeStatic) {
	if(includeStatic == null) includeStatic = false;
	var mouseX = this.easelStage.mouseX;
	var mouseY = this.easelStage.mouseY;
	var mx = mouseX / this.scale;
	var my = mouseY / this.scale;
	this.mousePos.Set(mx,my);
	var aabb = new box2D.collision.B2AABB();
	aabb.lowerBound.Set(mx - 0.005,my - 0.005);
	aabb.upperBound.Set(mx + 0.005,mx + 0.005);
	var maxCount = 10;
	var shapes = new Array();
	var count = this.world.Query(aabb,shapes,maxCount);
	var body = null;
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		if(shapes[i].GetBody().IsStatic() == false || includeStatic) {
			var tShape = (function($this) {
				var $r;
				var $t = shapes[i];
				if(Std["is"]($t,box2D.collision.shapes.B2Shape)) $t; else throw "Class cast error";
				$r = $t;
				return $r;
			}(this));
			var inside = tShape.TestPoint(tShape.m_body.GetXForm(),this.mousePos);
			if(inside) {
				body = tShape.m_body;
				break;
			}
		}
	}
	return body;
}
touchmypixel.game.simulations.Box2dSimulation.prototype.__class__ = touchmypixel.game.simulations.Box2dSimulation;
box2D.collision.B2PairCallback = function(p) {
}
box2D.collision.B2PairCallback.__name__ = ["box2D","collision","B2PairCallback"];
box2D.collision.B2PairCallback.prototype.PairAdded = function(proxyUserData1,proxyUserData2) {
	return null;
}
box2D.collision.B2PairCallback.prototype.PairRemoved = function(proxyUserData1,proxyUserData2,pairUserData) {
}
box2D.collision.B2PairCallback.prototype.__class__ = box2D.collision.B2PairCallback;
box2D.dynamics.B2ContactManager = function(p) {
	if( p === $_ ) return;
	box2D.collision.B2PairCallback.call(this);
	this.m_nullContact = new box2D.dynamics.contacts.B2NullContact();
	this.m_world = null;
	this.m_destroyImmediate = false;
}
box2D.dynamics.B2ContactManager.__name__ = ["box2D","dynamics","B2ContactManager"];
box2D.dynamics.B2ContactManager.__super__ = box2D.collision.B2PairCallback;
for(var k in box2D.collision.B2PairCallback.prototype ) box2D.dynamics.B2ContactManager.prototype[k] = box2D.collision.B2PairCallback.prototype[k];
box2D.dynamics.B2ContactManager.prototype.PairAdded = function(proxyUserData1,proxyUserData2) {
	var shape1 = proxyUserData1;
	var shape2 = proxyUserData2;
	var body1 = shape1.m_body;
	var body2 = shape2.m_body;
	if(body1.IsStatic() && body2.IsStatic()) return this.m_nullContact;
	if(shape1.m_body == shape2.m_body) return this.m_nullContact;
	if(body2.IsConnected(body1)) return this.m_nullContact;
	if(this.m_world.m_contactFilter != null && this.m_world.m_contactFilter.ShouldCollide(shape1,shape2) == false) return this.m_nullContact;
	var c = box2D.dynamics.contacts.B2Contact.Create(shape1,shape2,this.m_world.m_blockAllocator);
	if(c == null) return this.m_nullContact;
	shape1 = c.m_shape1;
	shape2 = c.m_shape2;
	body1 = shape1.m_body;
	body2 = shape2.m_body;
	c.m_prev = null;
	c.m_next = this.m_world.m_contactList;
	if(this.m_world.m_contactList != null) this.m_world.m_contactList.m_prev = c;
	this.m_world.m_contactList = c;
	c.m_node1.contact = c;
	c.m_node1.other = body2;
	c.m_node1.prev = null;
	c.m_node1.next = body1.m_contactList;
	if(body1.m_contactList != null) body1.m_contactList.prev = c.m_node1;
	body1.m_contactList = c.m_node1;
	c.m_node2.contact = c;
	c.m_node2.other = body1;
	c.m_node2.prev = null;
	c.m_node2.next = body2.m_contactList;
	if(body2.m_contactList != null) body2.m_contactList.prev = c.m_node2;
	body2.m_contactList = c.m_node2;
	++this.m_world.m_contactCount;
	return c;
}
box2D.dynamics.B2ContactManager.prototype.PairRemoved = function(proxyUserData1,proxyUserData2,pairUserData) {
	if(pairUserData == null) return;
	var c = pairUserData;
	if(c == this.m_nullContact) return;
	this.Destroy(c);
}
box2D.dynamics.B2ContactManager.prototype.Destroy = function(c) {
	var shape1 = c.m_shape1;
	var shape2 = c.m_shape2;
	var manifoldCount = c.m_manifoldCount;
	if(manifoldCount > 0 && this.m_world.m_contactListener != null) {
		var b1 = shape1.m_body;
		var b2 = shape2.m_body;
		var manifolds = c.GetManifolds();
		var cp = box2D.dynamics.B2ContactManager.s_evalCP;
		cp.shape1 = c.m_shape1;
		cp.shape2 = c.m_shape1;
		cp.friction = c.m_friction;
		cp.restitution = c.m_restitution;
		var _g = 0;
		while(_g < manifoldCount) {
			var i = _g++;
			var manifold = manifolds[i];
			cp.normal.SetV(manifold.normal);
			var _g2 = 0, _g1 = manifold.pointCount;
			while(_g2 < _g1) {
				var j = _g2++;
				var mp = manifold.points[j];
				cp.position = b1.GetWorldPoint(mp.localPoint1);
				var v1 = b1.GetLinearVelocityFromWorldPoint(b1.GetWorldPoint(mp.localPoint1));
				var v2 = b2.GetLinearVelocityFromWorldPoint(b2.GetWorldPoint(mp.localPoint2));
				cp.velocity.Set(v2.x - v1.x,v2.y - v1.y);
				cp.separation = mp.separation;
				cp.id.setKey(mp.id._key);
				this.m_world.m_contactListener.Remove(cp);
			}
		}
	}
	if(c.m_prev != null) c.m_prev.m_next = c.m_next;
	if(c.m_next != null) c.m_next.m_prev = c.m_prev;
	if(c == this.m_world.m_contactList) this.m_world.m_contactList = c.m_next;
	var body1 = shape1.m_body;
	var body2 = shape2.m_body;
	if(c.m_node1.prev != null) c.m_node1.prev.next = c.m_node1.next;
	if(c.m_node1.next != null) c.m_node1.next.prev = c.m_node1.prev;
	if(c.m_node1 == body1.m_contactList) body1.m_contactList = c.m_node1.next;
	if(c.m_node2.prev != null) c.m_node2.prev.next = c.m_node2.next;
	if(c.m_node2.next != null) c.m_node2.next.prev = c.m_node2.prev;
	if(c.m_node2 == body2.m_contactList) body2.m_contactList = c.m_node2.next;
	box2D.dynamics.contacts.B2Contact.Destroy(c,this.m_world.m_blockAllocator);
	--this.m_world.m_contactCount;
}
box2D.dynamics.B2ContactManager.prototype.Collide = function() {
	var c = this.m_world.m_contactList;
	while(c != null) {
		var body1 = c.m_shape1.m_body;
		var body2 = c.m_shape2.m_body;
		if(body1.IsSleeping() && body2.IsSleeping()) {
			c = c.m_next;
			continue;
		}
		c.Update(this.m_world.m_contactListener);
		c = c.m_next;
	}
}
box2D.dynamics.B2ContactManager.prototype.m_world = null;
box2D.dynamics.B2ContactManager.prototype.m_nullContact = null;
box2D.dynamics.B2ContactManager.prototype.m_destroyImmediate = null;
box2D.dynamics.B2ContactManager.prototype.__class__ = box2D.dynamics.B2ContactManager;
ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
Type = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if(o.__enum__ != null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl;
	try {
		cl = eval(name);
	} catch( e ) {
		cl = null;
	}
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e;
	try {
		e = eval(name);
	} catch( err ) {
		e = null;
	}
	if(e == null || e.__ename__ == null) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	if(args.length <= 3) return new cl(args[0],args[1],args[2]);
	if(args.length > 8) throw "Too many arguments";
	return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
}
Type.createEmptyInstance = function(cl) {
	return new cl($_);
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = Reflect.fields(c.prototype);
	a.remove("__class__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__super__");
	a.remove("prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.copy();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ != null) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.prototype.__class__ = Type;
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
box2D.common.math.B2Math = function(p) {
}
box2D.common.math.B2Math.__name__ = ["box2D","common","math","B2Math"];
box2D.common.math.B2Math.complement = function(i) {
	return ~i;
}
box2D.common.math.B2Math.b2IsValid = function(x) {
	return Math.isFinite(x);
}
box2D.common.math.B2Math.b2Dot = function(a,b) {
	return a.x * b.x + a.y * b.y;
}
box2D.common.math.B2Math.b2CrossVV = function(a,b) {
	return a.x * b.y - a.y * b.x;
}
box2D.common.math.B2Math.b2CrossVF = function(a,s) {
	return new box2D.common.math.B2Vec2(s * a.y,-s * a.x);
}
box2D.common.math.B2Math.b2CrossFV = function(s,a) {
	return new box2D.common.math.B2Vec2(-s * a.y,s * a.x);
}
box2D.common.math.B2Math.b2MulMV = function(A,v) {
	return new box2D.common.math.B2Vec2(A.col1.x * v.x + A.col2.x * v.y,A.col1.y * v.x + A.col2.y * v.y);
}
box2D.common.math.B2Math.b2MulTMV = function(A,v) {
	return new box2D.common.math.B2Vec2(box2D.common.math.B2Math.b2Dot(v,A.col1),box2D.common.math.B2Math.b2Dot(v,A.col2));
}
box2D.common.math.B2Math.b2MulX = function(T,v) {
	var a = box2D.common.math.B2Math.b2MulMV(T.R,v);
	a.x += T.position.x;
	a.y += T.position.y;
	return a;
}
box2D.common.math.B2Math.b2MulXT = function(T,v) {
	var a = box2D.common.math.B2Math.SubtractVV(v,T.position);
	var tX = a.x * T.R.col1.x + a.y * T.R.col1.y;
	a.y = a.x * T.R.col2.x + a.y * T.R.col2.y;
	a.x = tX;
	return a;
}
box2D.common.math.B2Math.AddVV = function(a,b) {
	return new box2D.common.math.B2Vec2(a.x + b.x,a.y + b.y);
}
box2D.common.math.B2Math.SubtractVV = function(a,b) {
	return new box2D.common.math.B2Vec2(a.x - b.x,a.y - b.y);
}
box2D.common.math.B2Math.b2Distance = function(a,b) {
	var cX = a.x - b.x;
	var cY = a.y - b.y;
	return Math.sqrt(cX * cX + cY * cY);
}
box2D.common.math.B2Math.b2DistanceSquared = function(a,b) {
	var cX = a.x - b.x;
	var cY = a.y - b.y;
	return cX * cX + cY * cY;
}
box2D.common.math.B2Math.MulFV = function(s,a) {
	return new box2D.common.math.B2Vec2(s * a.x,s * a.y);
}
box2D.common.math.B2Math.AddMM = function(A,B) {
	return new box2D.common.math.B2Mat22(0.0,box2D.common.math.B2Math.AddVV(A.col1,B.col1),box2D.common.math.B2Math.AddVV(A.col2,B.col2));
}
box2D.common.math.B2Math.b2MulMM = function(A,B) {
	return new box2D.common.math.B2Mat22(0.0,box2D.common.math.B2Math.b2MulMV(A,B.col1),box2D.common.math.B2Math.b2MulMV(A,B.col2));
}
box2D.common.math.B2Math.b2MulTMM = function(A,B) {
	var c1 = new box2D.common.math.B2Vec2(box2D.common.math.B2Math.b2Dot(A.col1,B.col1),box2D.common.math.B2Math.b2Dot(A.col2,B.col1));
	var c2 = new box2D.common.math.B2Vec2(box2D.common.math.B2Math.b2Dot(A.col1,B.col2),box2D.common.math.B2Math.b2Dot(A.col2,B.col2));
	var C = new box2D.common.math.B2Mat22(0.0,c1,c2);
	return C;
}
box2D.common.math.B2Math.b2Abs = function(a) {
	return a > 0.0?a:-a;
}
box2D.common.math.B2Math.b2AbsV = function(a) {
	var b = new box2D.common.math.B2Vec2(box2D.common.math.B2Math.b2Abs(a.x),box2D.common.math.B2Math.b2Abs(a.y));
	return b;
}
box2D.common.math.B2Math.b2AbsM = function(A) {
	return new box2D.common.math.B2Mat22(0,box2D.common.math.B2Math.b2AbsV(A.col1),box2D.common.math.B2Math.b2AbsV(A.col2));
}
box2D.common.math.B2Math.b2Min = function(a,b) {
	return a < b?a:b;
}
box2D.common.math.B2Math.b2MinV = function(a,b) {
	return new box2D.common.math.B2Vec2(box2D.common.math.B2Math.b2Min(a.x,b.x),box2D.common.math.B2Math.b2Min(a.y,b.y));
}
box2D.common.math.B2Math.b2Max = function(a,b) {
	return a > b?a:b;
}
box2D.common.math.B2Math.b2MaxV = function(a,b) {
	return new box2D.common.math.B2Vec2(box2D.common.math.B2Math.b2Max(a.x,b.x),box2D.common.math.B2Math.b2Max(a.y,b.y));
}
box2D.common.math.B2Math.b2Clamp = function(a,low,high) {
	return box2D.common.math.B2Math.b2Max(low,a < high?a:high);
}
box2D.common.math.B2Math.b2ClampV = function(a,low,high) {
	return box2D.common.math.B2Math.b2MaxV(low,new box2D.common.math.B2Vec2(box2D.common.math.B2Math.b2Min(a.x,high.x),box2D.common.math.B2Math.b2Min(a.y,high.y)));
}
box2D.common.math.B2Math.b2Swap = function(a,b) {
	var tmp = a[0];
	a[0] = b[0];
	b[0] = tmp;
}
box2D.common.math.B2Math.b2Random = function() {
	return Math.random() * 2.0 - 1.0;
}
box2D.common.math.B2Math.b2RandomRange = function(lo,hi) {
	var r = Math.random();
	r = (hi - lo) * r + lo;
	return r;
}
box2D.common.math.B2Math.b2NextPowerOfTwo = function(x) {
	x |= x >> 1 & 2147483647;
	x |= x >> 2 & 1073741823;
	x |= x >> 4 & 268435455;
	x |= x >> 8 & 16777215;
	x |= x >> 16 & 65535;
	return x + 1;
}
box2D.common.math.B2Math.b2IsPowerOfTwo = function(x) {
	return x > 0 && (x & x - 1) == 0;
}
box2D.common.math.B2Math.prototype.__class__ = box2D.common.math.B2Math;
if(!touchmypixel.game.ds) touchmypixel.game.ds = {}
touchmypixel.game.ds.IObjectHashable = function() { }
touchmypixel.game.ds.IObjectHashable.__name__ = ["touchmypixel","game","ds","IObjectHashable"];
touchmypixel.game.ds.IObjectHashable.prototype.__objectId = null;
touchmypixel.game.ds.IObjectHashable.prototype.__class__ = touchmypixel.game.ds.IObjectHashable;
if(!touchmypixel.game.objects) touchmypixel.game.objects = {}
touchmypixel.game.objects.Object = function(p) {
	if( p === $_ ) return;
	this.name = "";
	this.container = new Container();
	touchmypixel.game.ds.ObjectHash.register(this);
}
touchmypixel.game.objects.Object.__name__ = ["touchmypixel","game","objects","Object"];
touchmypixel.game.objects.Object.prototype.name = null;
touchmypixel.game.objects.Object.prototype.__objectId = null;
touchmypixel.game.objects.Object.prototype.container = null;
touchmypixel.game.objects.Object.prototype.init = function() {
}
touchmypixel.game.objects.Object.prototype.update = function(dt) {
}
touchmypixel.game.objects.Object.prototype.destroy = function() {
	touchmypixel.game.ds.ObjectHash.registeredObjects.remove(this.__objectId);
	if(this.container.parent != null) {
		var p = this.container.parent;
		p.removeChild(this.container);
	}
}
touchmypixel.game.objects.Object.prototype.__class__ = touchmypixel.game.objects.Object;
touchmypixel.game.objects.Object.__interfaces__ = [touchmypixel.game.ds.IObjectHashable];
touchmypixel.game.objects.Box2dBodyObject = function(s) {
	if( s === $_ ) return;
	touchmypixel.game.objects.Object.call(this);
	this.simulation = s;
	this.cacheContacts = false;
	this.contacts_add = new touchmypixel.game.ds.ObjectHash();
	this.contacts_persist = new touchmypixel.game.ds.ObjectHash();
	this.contacts_remove = new touchmypixel.game.ds.ObjectHash();
}
touchmypixel.game.objects.Box2dBodyObject.__name__ = ["touchmypixel","game","objects","Box2dBodyObject"];
touchmypixel.game.objects.Box2dBodyObject.__super__ = touchmypixel.game.objects.Object;
for(var k in touchmypixel.game.objects.Object.prototype ) touchmypixel.game.objects.Box2dBodyObject.prototype[k] = touchmypixel.game.objects.Object.prototype[k];
touchmypixel.game.objects.Box2dBodyObject.prototype.type = null;
touchmypixel.game.objects.Box2dBodyObject.prototype.simulation = null;
touchmypixel.game.objects.Box2dBodyObject.prototype.gameObject = null;
touchmypixel.game.objects.Box2dBodyObject.prototype.body = null;
touchmypixel.game.objects.Box2dBodyObject.prototype.contacts_add = null;
touchmypixel.game.objects.Box2dBodyObject.prototype.contacts_persist = null;
touchmypixel.game.objects.Box2dBodyObject.prototype.contacts_remove = null;
touchmypixel.game.objects.Box2dBodyObject.prototype.cacheContacts = null;
touchmypixel.game.objects.Box2dBodyObject.prototype.update = function(dt) {
	if(this.body != null) this.simulation.sync(this.container,this.body);
}
touchmypixel.game.objects.Box2dBodyObject.prototype.destroy = function() {
	touchmypixel.game.objects.Object.prototype.destroy.call(this);
	this.contacts_add = null;
	this.contacts_persist = null;
	this.contacts_remove = null;
	this.body.SetUserData(null);
	this.simulation.world.DestroyBody(this.body);
}
touchmypixel.game.objects.Box2dBodyObject.prototype.__class__ = touchmypixel.game.objects.Box2dBodyObject;
fboyle.utils.MovieClipUtil = function() { }
fboyle.utils.MovieClipUtil.__name__ = ["fboyle","utils","MovieClipUtil"];
fboyle.utils.MovieClipUtil.gotoAndPlay = function(mc,frame) {
	if(mc != null) ((function($this) {
		var $r;
		var $t = mc;
		if(Std["is"]($t,BitmapSequence)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this))).gotoAndPlay(frame);
}
fboyle.utils.MovieClipUtil.gotoAndStop = function(mc,frame) {
	if(mc != null) ((function($this) {
		var $r;
		var $t = mc;
		if(Std["is"]($t,BitmapSequence)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this))).gotoAndStop(frame);
}
fboyle.utils.MovieClipUtil.prototype.__class__ = fboyle.utils.MovieClipUtil;
touchmypixel.game.objects.Box2dObject = function(simulation) {
	if( simulation === $_ ) return;
	touchmypixel.game.objects.Object.call(this);
	this.simulation = simulation;
}
touchmypixel.game.objects.Box2dObject.__name__ = ["touchmypixel","game","objects","Box2dObject"];
touchmypixel.game.objects.Box2dObject.__super__ = touchmypixel.game.objects.Object;
for(var k in touchmypixel.game.objects.Object.prototype ) touchmypixel.game.objects.Box2dObject.prototype[k] = touchmypixel.game.objects.Object.prototype[k];
touchmypixel.game.objects.Box2dObject.prototype.simulation = null;
touchmypixel.game.objects.Box2dObject.prototype.bodies = null;
touchmypixel.game.objects.Box2dObject.prototype.init = function() {
}
touchmypixel.game.objects.Box2dObject.prototype.update = function(dt) {
}
touchmypixel.game.objects.Box2dObject.prototype.destroy = function() {
	touchmypixel.game.objects.Object.prototype.destroy.call(this);
	var _g = 0, _g1 = this.bodies;
	while(_g < _g1.length) {
		var b = _g1[_g];
		++_g;
		b.destroy();
	}
}
touchmypixel.game.objects.Box2dObject.prototype.__class__ = touchmypixel.game.objects.Box2dObject;
if(!fboyle.display) fboyle.display = {}
fboyle.display.IDestroyable = function() { }
fboyle.display.IDestroyable.__name__ = ["fboyle","display","IDestroyable"];
fboyle.display.IDestroyable.prototype.destroy = null;
fboyle.display.IDestroyable.prototype.__class__ = fboyle.display.IDestroyable;
fboyle.display.ILevel = function() { }
fboyle.display.ILevel.__name__ = ["fboyle","display","ILevel"];
fboyle.display.ILevel.prototype.init = null;
fboyle.display.ILevel.prototype.start = null;
fboyle.display.ILevel.prototype.stop = null;
fboyle.display.ILevel.prototype.update = null;
fboyle.display.ILevel.prototype.__class__ = fboyle.display.ILevel;
fboyle.display.ILevel.__interfaces__ = [fboyle.display.IDestroyable];
box2D.collision.B2Proxy = function(p) {
	if( p === $_ ) return;
	this.lowerBounds = [0,0];
	this.upperBounds = [0,0];
	this.userData = null;
}
box2D.collision.B2Proxy.__name__ = ["box2D","collision","B2Proxy"];
box2D.collision.B2Proxy.prototype.GetNext = function() {
	return this.lowerBounds[0];
}
box2D.collision.B2Proxy.prototype.SetNext = function(next) {
	this.lowerBounds[0] = next & 65535;
}
box2D.collision.B2Proxy.prototype.IsValid = function() {
	return this.overlapCount != 65535;
}
box2D.collision.B2Proxy.prototype.lowerBounds = null;
box2D.collision.B2Proxy.prototype.upperBounds = null;
box2D.collision.B2Proxy.prototype.overlapCount = null;
box2D.collision.B2Proxy.prototype.timeStamp = null;
box2D.collision.B2Proxy.prototype.userData = null;
box2D.collision.B2Proxy.prototype.__class__ = box2D.collision.B2Proxy;
box2D.dynamics.joints.B2Joint = function(def) {
	if( def === $_ ) return;
	this.m_node1 = new box2D.dynamics.joints.B2JointEdge();
	this.m_node2 = new box2D.dynamics.joints.B2JointEdge();
	this.m_type = def.type;
	this.m_prev = null;
	this.m_next = null;
	this.m_body1 = def.body1;
	this.m_body2 = def.body2;
	this.m_collideConnected = def.collideConnected;
	this.m_islandFlag = false;
	this.m_userData = def.userData;
}
box2D.dynamics.joints.B2Joint.__name__ = ["box2D","dynamics","joints","B2Joint"];
box2D.dynamics.joints.B2Joint.Create = function(def,allocator) {
	var joint = null;
	switch(def.type) {
	case 3:
		joint = new box2D.dynamics.joints.B2DistanceJoint(def);
		break;
	case 5:
		joint = new box2D.dynamics.joints.B2MouseJoint(def);
		break;
	case 2:
		joint = new box2D.dynamics.joints.B2PrismaticJoint(def);
		break;
	case 1:
		joint = new box2D.dynamics.joints.B2RevoluteJoint(def);
		break;
	case 4:
		joint = new box2D.dynamics.joints.B2PulleyJoint(def);
		break;
	case 6:
		joint = new box2D.dynamics.joints.B2GearJoint(def);
		break;
	default:
		joint = null;
	}
	return joint;
}
box2D.dynamics.joints.B2Joint.Destroy = function(joint,allocator) {
}
box2D.dynamics.joints.B2Joint.prototype.GetType = function() {
	return this.m_type;
}
box2D.dynamics.joints.B2Joint.prototype.GetAnchor1 = function() {
	return null;
}
box2D.dynamics.joints.B2Joint.prototype.GetAnchor2 = function() {
	return null;
}
box2D.dynamics.joints.B2Joint.prototype.GetReactionForce = function() {
	return null;
}
box2D.dynamics.joints.B2Joint.prototype.GetReactionTorque = function() {
	return 0.0;
}
box2D.dynamics.joints.B2Joint.prototype.GetBody1 = function() {
	return this.m_body1;
}
box2D.dynamics.joints.B2Joint.prototype.GetBody2 = function() {
	return this.m_body2;
}
box2D.dynamics.joints.B2Joint.prototype.GetNext = function() {
	return this.m_next;
}
box2D.dynamics.joints.B2Joint.prototype.GetUserData = function() {
	return this.m_userData;
}
box2D.dynamics.joints.B2Joint.prototype.SetUserData = function(data) {
	this.m_userData = data;
}
box2D.dynamics.joints.B2Joint.prototype.InitVelocityConstraints = function(step) {
}
box2D.dynamics.joints.B2Joint.prototype.SolveVelocityConstraints = function(step) {
}
box2D.dynamics.joints.B2Joint.prototype.InitPositionConstraints = function() {
}
box2D.dynamics.joints.B2Joint.prototype.SolvePositionConstraints = function() {
	return false;
}
box2D.dynamics.joints.B2Joint.prototype.m_type = null;
box2D.dynamics.joints.B2Joint.prototype.m_prev = null;
box2D.dynamics.joints.B2Joint.prototype.m_next = null;
box2D.dynamics.joints.B2Joint.prototype.m_node1 = null;
box2D.dynamics.joints.B2Joint.prototype.m_node2 = null;
box2D.dynamics.joints.B2Joint.prototype.m_body1 = null;
box2D.dynamics.joints.B2Joint.prototype.m_body2 = null;
box2D.dynamics.joints.B2Joint.prototype.m_inv_dt = null;
box2D.dynamics.joints.B2Joint.prototype.m_islandFlag = null;
box2D.dynamics.joints.B2Joint.prototype.m_collideConnected = null;
box2D.dynamics.joints.B2Joint.prototype.m_userData = null;
box2D.dynamics.joints.B2Joint.prototype.__class__ = box2D.dynamics.joints.B2Joint;
box2D.dynamics.joints.B2RevoluteJoint = function(def) {
	if( def === $_ ) return;
	box2D.dynamics.joints.B2Joint.call(this,def);
	this.K = new box2D.common.math.B2Mat22();
	this.K1 = new box2D.common.math.B2Mat22();
	this.K2 = new box2D.common.math.B2Mat22();
	this.K3 = new box2D.common.math.B2Mat22();
	this.m_localAnchor1 = new box2D.common.math.B2Vec2();
	this.m_localAnchor2 = new box2D.common.math.B2Vec2();
	this.m_pivotForce = new box2D.common.math.B2Vec2();
	this.m_pivotMass = new box2D.common.math.B2Mat22();
	this.m_localAnchor1.SetV(def.localAnchor1);
	this.m_localAnchor2.SetV(def.localAnchor2);
	this.m_referenceAngle = def.referenceAngle;
	this.m_pivotForce.Set(0.0,0.0);
	this.m_motorForce = 0.0;
	this.m_limitForce = 0.0;
	this.m_limitPositionImpulse = 0.0;
	this.m_lowerAngle = def.lowerAngle;
	this.m_upperAngle = def.upperAngle;
	this.m_maxMotorTorque = def.maxMotorTorque;
	this.m_motorSpeed = def.motorSpeed;
	this.m_enableLimit = def.enableLimit;
	this.m_enableMotor = def.enableMotor;
}
box2D.dynamics.joints.B2RevoluteJoint.__name__ = ["box2D","dynamics","joints","B2RevoluteJoint"];
box2D.dynamics.joints.B2RevoluteJoint.__super__ = box2D.dynamics.joints.B2Joint;
for(var k in box2D.dynamics.joints.B2Joint.prototype ) box2D.dynamics.joints.B2RevoluteJoint.prototype[k] = box2D.dynamics.joints.B2Joint.prototype[k];
box2D.dynamics.joints.B2RevoluteJoint.prototype.GetAnchor1 = function() {
	return this.m_body1.GetWorldPoint(this.m_localAnchor1);
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.GetAnchor2 = function() {
	return this.m_body2.GetWorldPoint(this.m_localAnchor2);
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.GetReactionForce = function() {
	return this.m_pivotForce;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.GetReactionTorque = function() {
	return this.m_limitForce;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.GetJointAngle = function() {
	return this.m_body2.m_sweep.a - this.m_body1.m_sweep.a - this.m_referenceAngle;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.GetJointSpeed = function() {
	return this.m_body2.m_angularVelocity - this.m_body1.m_angularVelocity;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.IsLimitEnabled = function() {
	return this.m_enableLimit;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.EnableLimit = function(flag) {
	this.m_enableLimit = flag;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.GetLowerLimit = function() {
	return this.m_lowerAngle;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.GetUpperLimit = function() {
	return this.m_upperAngle;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.SetLimits = function(lower,upper) {
	this.m_lowerAngle = lower;
	this.m_upperAngle = upper;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.IsMotorEnabled = function() {
	return this.m_enableMotor;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.EnableMotor = function(flag) {
	this.m_enableMotor = flag;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.SetMotorSpeed = function(speed) {
	this.m_motorSpeed = speed;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.GetMotorSpeed = function() {
	return this.m_motorSpeed;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.SetMaxMotorTorque = function(torque) {
	this.m_maxMotorTorque = torque;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.GetMotorTorque = function() {
	return this.m_motorForce;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.K = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.K1 = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.K2 = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.K3 = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.InitVelocityConstraints = function(step) {
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	var tMat;
	var tX;
	tMat = b1.m_xf.R;
	var r1X = this.m_localAnchor1.x - b1.m_sweep.localCenter.x;
	var r1Y = this.m_localAnchor1.y - b1.m_sweep.localCenter.y;
	tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
	r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
	r1X = tX;
	tMat = b2.m_xf.R;
	var r2X = this.m_localAnchor2.x - b2.m_sweep.localCenter.x;
	var r2Y = this.m_localAnchor2.y - b2.m_sweep.localCenter.y;
	tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
	r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
	r2X = tX;
	var invMass1 = b1.m_invMass;
	var invMass2 = b2.m_invMass;
	var invI1 = b1.m_invI;
	var invI2 = b2.m_invI;
	this.K1.col1.x = invMass1 + invMass2;
	this.K1.col2.x = 0.0;
	this.K1.col1.y = 0.0;
	this.K1.col2.y = invMass1 + invMass2;
	this.K2.col1.x = invI1 * r1Y * r1Y;
	this.K2.col2.x = -invI1 * r1X * r1Y;
	this.K2.col1.y = -invI1 * r1X * r1Y;
	this.K2.col2.y = invI1 * r1X * r1X;
	this.K3.col1.x = invI2 * r2Y * r2Y;
	this.K3.col2.x = -invI2 * r2X * r2Y;
	this.K3.col1.y = -invI2 * r2X * r2Y;
	this.K3.col2.y = invI2 * r2X * r2X;
	this.K.SetM(this.K1);
	this.K.AddM(this.K2);
	this.K.AddM(this.K3);
	this.K.Invert(this.m_pivotMass);
	this.m_motorMass = 1.0 / (invI1 + invI2);
	if(this.m_enableMotor == false) this.m_motorForce = 0.0;
	if(this.m_enableLimit) {
		var jointAngle = b2.m_sweep.a - b1.m_sweep.a - this.m_referenceAngle;
		if(box2D.common.math.B2Math.b2Abs(this.m_upperAngle - this.m_lowerAngle) < 2.0 * box2D.common.B2Settings.b2_angularSlop) this.m_limitState = 3; else if(jointAngle <= this.m_lowerAngle) {
			if(this.m_limitState != 1) this.m_limitForce = 0.0;
			this.m_limitState = 1;
		} else if(jointAngle >= this.m_upperAngle) {
			if(this.m_limitState != 2) this.m_limitForce = 0.0;
			this.m_limitState = 2;
		} else {
			this.m_limitState = 0;
			this.m_limitForce = 0.0;
		}
	} else this.m_limitForce = 0.0;
	if(step.warmStarting) {
		b1.m_linearVelocity.x -= step.dt * invMass1 * this.m_pivotForce.x;
		b1.m_linearVelocity.y -= step.dt * invMass1 * this.m_pivotForce.y;
		b1.m_angularVelocity -= step.dt * invI1 * (r1X * this.m_pivotForce.y - r1Y * this.m_pivotForce.x + this.m_motorForce + this.m_limitForce);
		b2.m_linearVelocity.x += step.dt * invMass2 * this.m_pivotForce.x;
		b2.m_linearVelocity.y += step.dt * invMass2 * this.m_pivotForce.y;
		b2.m_angularVelocity += step.dt * invI2 * (r2X * this.m_pivotForce.y - r2Y * this.m_pivotForce.x + this.m_motorForce + this.m_limitForce);
	} else {
		this.m_pivotForce.SetZero();
		this.m_motorForce = 0.0;
		this.m_limitForce = 0.0;
	}
	this.m_limitPositionImpulse = 0.0;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.SolveVelocityConstraints = function(step) {
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	var tMat;
	var tX;
	tMat = b1.m_xf.R;
	var r1X = this.m_localAnchor1.x - b1.m_sweep.localCenter.x;
	var r1Y = this.m_localAnchor1.y - b1.m_sweep.localCenter.y;
	tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
	r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
	r1X = tX;
	tMat = b2.m_xf.R;
	var r2X = this.m_localAnchor2.x - b2.m_sweep.localCenter.x;
	var r2Y = this.m_localAnchor2.y - b2.m_sweep.localCenter.y;
	tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
	r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
	r2X = tX;
	var oldLimitForce;
	var pivotCdotX = b2.m_linearVelocity.x + -b2.m_angularVelocity * r2Y - b1.m_linearVelocity.x - -b1.m_angularVelocity * r1Y;
	var pivotCdotY = b2.m_linearVelocity.y + b2.m_angularVelocity * r2X - b1.m_linearVelocity.y - b1.m_angularVelocity * r1X;
	var pivotForceX = -step.inv_dt * (this.m_pivotMass.col1.x * pivotCdotX + this.m_pivotMass.col2.x * pivotCdotY);
	var pivotForceY = -step.inv_dt * (this.m_pivotMass.col1.y * pivotCdotX + this.m_pivotMass.col2.y * pivotCdotY);
	this.m_pivotForce.x += pivotForceX;
	this.m_pivotForce.y += pivotForceY;
	var PX = step.dt * pivotForceX;
	var PY = step.dt * pivotForceY;
	b1.m_linearVelocity.x -= b1.m_invMass * PX;
	b1.m_linearVelocity.y -= b1.m_invMass * PY;
	b1.m_angularVelocity -= b1.m_invI * (r1X * PY - r1Y * PX);
	b2.m_linearVelocity.x += b2.m_invMass * PX;
	b2.m_linearVelocity.y += b2.m_invMass * PY;
	b2.m_angularVelocity += b2.m_invI * (r2X * PY - r2Y * PX);
	if(this.m_enableMotor && this.m_limitState != 3) {
		var motorCdot = b2.m_angularVelocity - b1.m_angularVelocity - this.m_motorSpeed;
		var motorForce = -step.inv_dt * this.m_motorMass * motorCdot;
		var oldMotorForce = this.m_motorForce;
		this.m_motorForce = box2D.common.math.B2Math.b2Clamp(this.m_motorForce + motorForce,-this.m_maxMotorTorque,this.m_maxMotorTorque);
		motorForce = this.m_motorForce - oldMotorForce;
		b1.m_angularVelocity -= b1.m_invI * step.dt * motorForce;
		b2.m_angularVelocity += b2.m_invI * step.dt * motorForce;
	}
	if(this.m_enableLimit && this.m_limitState != 0) {
		var limitCdot = b2.m_angularVelocity - b1.m_angularVelocity;
		var limitForce = -step.inv_dt * this.m_motorMass * limitCdot;
		if(this.m_limitState == 3) this.m_limitForce += limitForce; else if(this.m_limitState == 1) {
			oldLimitForce = this.m_limitForce;
			this.m_limitForce = box2D.common.math.B2Math.b2Max(this.m_limitForce + limitForce,0.0);
			limitForce = this.m_limitForce - oldLimitForce;
		} else if(this.m_limitState == 2) {
			oldLimitForce = this.m_limitForce;
			this.m_limitForce = box2D.common.math.B2Math.b2Min(this.m_limitForce + limitForce,0.0);
			limitForce = this.m_limitForce - oldLimitForce;
		}
		b1.m_angularVelocity -= b1.m_invI * step.dt * limitForce;
		b2.m_angularVelocity += b2.m_invI * step.dt * limitForce;
	}
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.SolvePositionConstraints = function() {
	var oldLimitImpulse;
	var limitC;
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	var positionError = 0.0;
	var tMat;
	tMat = b1.m_xf.R;
	var r1X = this.m_localAnchor1.x - b1.m_sweep.localCenter.x;
	var r1Y = this.m_localAnchor1.y - b1.m_sweep.localCenter.y;
	var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
	r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
	r1X = tX;
	tMat = b2.m_xf.R;
	var r2X = this.m_localAnchor2.x - b2.m_sweep.localCenter.x;
	var r2Y = this.m_localAnchor2.y - b2.m_sweep.localCenter.y;
	tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
	r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
	r2X = tX;
	var p1X = b1.m_sweep.c.x + r1X;
	var p1Y = b1.m_sweep.c.y + r1Y;
	var p2X = b2.m_sweep.c.x + r2X;
	var p2Y = b2.m_sweep.c.y + r2Y;
	var ptpCX = p2X - p1X;
	var ptpCY = p2Y - p1Y;
	positionError = Math.sqrt(ptpCX * ptpCX + ptpCY * ptpCY);
	var invMass1 = b1.m_invMass;
	var invMass2 = b2.m_invMass;
	var invI1 = b1.m_invI;
	var invI2 = b2.m_invI;
	this.K1.col1.x = invMass1 + invMass2;
	this.K1.col2.x = 0.0;
	this.K1.col1.y = 0.0;
	this.K1.col2.y = invMass1 + invMass2;
	this.K2.col1.x = invI1 * r1Y * r1Y;
	this.K2.col2.x = -invI1 * r1X * r1Y;
	this.K2.col1.y = -invI1 * r1X * r1Y;
	this.K2.col2.y = invI1 * r1X * r1X;
	this.K3.col1.x = invI2 * r2Y * r2Y;
	this.K3.col2.x = -invI2 * r2X * r2Y;
	this.K3.col1.y = -invI2 * r2X * r2Y;
	this.K3.col2.y = invI2 * r2X * r2X;
	this.K.SetM(this.K1);
	this.K.AddM(this.K2);
	this.K.AddM(this.K3);
	this.K.Solve(box2D.dynamics.joints.B2RevoluteJoint.tImpulse,-ptpCX,-ptpCY);
	var impulseX = box2D.dynamics.joints.B2RevoluteJoint.tImpulse.x;
	var impulseY = box2D.dynamics.joints.B2RevoluteJoint.tImpulse.y;
	b1.m_sweep.c.x -= b1.m_invMass * impulseX;
	b1.m_sweep.c.y -= b1.m_invMass * impulseY;
	b1.m_sweep.a -= b1.m_invI * (r1X * impulseY - r1Y * impulseX);
	b2.m_sweep.c.x += b2.m_invMass * impulseX;
	b2.m_sweep.c.y += b2.m_invMass * impulseY;
	b2.m_sweep.a += b2.m_invI * (r2X * impulseY - r2Y * impulseX);
	b1.SynchronizeTransform();
	b2.SynchronizeTransform();
	var angularError = 0.0;
	if(this.m_enableLimit && this.m_limitState != 0) {
		var angle = b2.m_sweep.a - b1.m_sweep.a - this.m_referenceAngle;
		var limitImpulse = 0.0;
		if(this.m_limitState == 3) {
			limitC = box2D.common.math.B2Math.b2Clamp(angle,-box2D.common.B2Settings.b2_maxAngularCorrection,box2D.common.B2Settings.b2_maxAngularCorrection);
			limitImpulse = -this.m_motorMass * limitC;
			angularError = limitC > 0.0?limitC:-limitC;
		} else if(this.m_limitState == 1) {
			limitC = angle - this.m_lowerAngle;
			angularError = box2D.common.math.B2Math.b2Max(0.0,-limitC);
			limitC = box2D.common.math.B2Math.b2Clamp(limitC + box2D.common.B2Settings.b2_angularSlop,-box2D.common.B2Settings.b2_maxAngularCorrection,0.0);
			limitImpulse = -this.m_motorMass * limitC;
			oldLimitImpulse = this.m_limitPositionImpulse;
			this.m_limitPositionImpulse = box2D.common.math.B2Math.b2Max(this.m_limitPositionImpulse + limitImpulse,0.0);
			limitImpulse = this.m_limitPositionImpulse - oldLimitImpulse;
		} else if(this.m_limitState == 2) {
			limitC = angle - this.m_upperAngle;
			angularError = 0.0 > limitC?0.0:limitC;
			limitC = box2D.common.math.B2Math.b2Clamp(limitC - box2D.common.B2Settings.b2_angularSlop,0.0,box2D.common.B2Settings.b2_maxAngularCorrection);
			limitImpulse = -this.m_motorMass * limitC;
			oldLimitImpulse = this.m_limitPositionImpulse;
			this.m_limitPositionImpulse = box2D.common.math.B2Math.b2Min(this.m_limitPositionImpulse + limitImpulse,0.0);
			limitImpulse = this.m_limitPositionImpulse - oldLimitImpulse;
		}
		b1.m_sweep.a -= b1.m_invI * limitImpulse;
		b2.m_sweep.a += b2.m_invI * limitImpulse;
		b1.SynchronizeTransform();
		b2.SynchronizeTransform();
	}
	return positionError <= box2D.common.B2Settings.b2_linearSlop && angularError <= box2D.common.B2Settings.b2_angularSlop;
}
box2D.dynamics.joints.B2RevoluteJoint.prototype.m_localAnchor1 = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.m_localAnchor2 = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.m_pivotForce = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.m_motorForce = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.m_limitForce = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.m_limitPositionImpulse = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.m_pivotMass = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.m_motorMass = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.m_enableMotor = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.m_maxMotorTorque = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.m_motorSpeed = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.m_enableLimit = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.m_referenceAngle = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.m_lowerAngle = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.m_upperAngle = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.m_limitState = null;
box2D.dynamics.joints.B2RevoluteJoint.prototype.__class__ = box2D.dynamics.joints.B2RevoluteJoint;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	var $it0 = arr.iterator();
	while( $it0.hasNext() ) {
		var t = $it0.next();
		if(t == field) return true;
	}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
	var a = new Array();
	if(o.hasOwnProperty) {
		for(var i in o) if( o.hasOwnProperty(i) ) a.push(i);
	} else {
		var t;
		try {
			t = o.__proto__;
		} catch( e ) {
			t = null;
		}
		if(t != null) o.__proto__ = null;
		for(var i in o) if( i != "__proto__" ) a.push(i);
		if(t != null) o.__proto__ = t;
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && v.__name__ != null;
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new Array();
		var _g1 = 0, _g = arguments.length;
		while(_g1 < _g) {
			var i = _g1++;
			a.push(arguments[i]);
		}
		return f(a);
	};
}
Reflect.prototype.__class__ = Reflect;
touchmypixel.game.objects.LBGeometry = function(p) {
}
touchmypixel.game.objects.LBGeometry.__name__ = ["touchmypixel","game","objects","LBGeometry"];
touchmypixel.game.objects.LBGeometry.prototype.name = null;
touchmypixel.game.objects.LBGeometry.prototype.shapes = null;
touchmypixel.game.objects.LBGeometry.prototype.body = null;
touchmypixel.game.objects.LBGeometry.prototype.contacts = null;
touchmypixel.game.objects.LBGeometry.prototype.cacheContacts = null;
touchmypixel.game.objects.LBGeometry.prototype.__class__ = touchmypixel.game.objects.LBGeometry;
box2D.collision.B2AABB = function(p) {
	if( p === $_ ) return;
	this.lowerBound = new box2D.common.math.B2Vec2();
	this.upperBound = new box2D.common.math.B2Vec2();
}
box2D.collision.B2AABB.__name__ = ["box2D","collision","B2AABB"];
box2D.collision.B2AABB.prototype.IsValid = function() {
	var dX = this.upperBound.x - this.lowerBound.x;
	var dY = this.upperBound.y - this.lowerBound.y;
	var valid = dX >= 0.0 && dY >= 0.0;
	valid = valid && this.lowerBound.IsValid() && this.upperBound.IsValid();
	return valid;
}
box2D.collision.B2AABB.prototype.lowerBound = null;
box2D.collision.B2AABB.prototype.upperBound = null;
box2D.collision.B2AABB.prototype.__class__ = box2D.collision.B2AABB;
box2D.collision.shapes.B2Shape = function(def) {
	if( def === $_ ) return;
	this.m_userData = def.userData;
	this.m_friction = def.friction;
	this.m_restitution = def.restitution;
	this.m_density = def.density;
	this.m_body = null;
	this.m_sweepRadius = 0.0;
	this.m_next = null;
	this.m_proxyId = 65535;
	this.m_filter = def.filter.Copy();
	this.m_isSensor = def.isSensor;
}
box2D.collision.shapes.B2Shape.__name__ = ["box2D","collision","shapes","B2Shape"];
box2D.collision.shapes.B2Shape.Create = function(def,allocator) {
	switch(def.type) {
	case 0:
		return new box2D.collision.shapes.B2CircleShape(def);
	case 1:
		return new box2D.collision.shapes.B2PolygonShape(def);
	default:
		return null;
	}
}
box2D.collision.shapes.B2Shape.Destroy = function(shape,allocator) {
}
box2D.collision.shapes.B2Shape.prototype.GetType = function() {
	return this.m_type;
}
box2D.collision.shapes.B2Shape.prototype.IsSensor = function() {
	return this.m_isSensor;
}
box2D.collision.shapes.B2Shape.prototype.SetFilterData = function(filter) {
	this.m_filter = filter.Copy();
}
box2D.collision.shapes.B2Shape.prototype.GetFilterData = function() {
	return this.m_filter.Copy();
}
box2D.collision.shapes.B2Shape.prototype.GetBody = function() {
	return this.m_body;
}
box2D.collision.shapes.B2Shape.prototype.GetNext = function() {
	return this.m_next;
}
box2D.collision.shapes.B2Shape.prototype.GetUserData = function() {
	return this.m_userData;
}
box2D.collision.shapes.B2Shape.prototype.SetUserData = function(data) {
	this.m_userData = data;
}
box2D.collision.shapes.B2Shape.prototype.TestPoint = function(xf,p) {
	return false;
}
box2D.collision.shapes.B2Shape.prototype.TestSegment = function(xf,lambda,normal,segment,maxLambda) {
	return false;
}
box2D.collision.shapes.B2Shape.prototype.ComputeAABB = function(aabb,xf) {
}
box2D.collision.shapes.B2Shape.prototype.ComputeSweptAABB = function(aabb,xf1,xf2) {
}
box2D.collision.shapes.B2Shape.prototype.ComputeMass = function(massData) {
}
box2D.collision.shapes.B2Shape.prototype.GetSweepRadius = function() {
	return this.m_sweepRadius;
}
box2D.collision.shapes.B2Shape.prototype.GetFriction = function() {
	return this.m_friction;
}
box2D.collision.shapes.B2Shape.prototype.GetRestitution = function() {
	return this.m_restitution;
}
box2D.collision.shapes.B2Shape.prototype.CreateProxy = function(broadPhase,transform) {
	var aabb = box2D.collision.shapes.B2Shape.s_proxyAABB;
	this.ComputeAABB(aabb,transform);
	var inRange = broadPhase.InRange(aabb);
	if(inRange) this.m_proxyId = broadPhase.CreateProxy(aabb,this); else this.m_proxyId = 65535;
}
box2D.collision.shapes.B2Shape.prototype.DestroyProxy = function(broadPhase) {
	if(this.m_proxyId != 65535) {
		broadPhase.DestroyProxy(this.m_proxyId);
		this.m_proxyId = 65535;
	}
}
box2D.collision.shapes.B2Shape.prototype.Synchronize = function(broadPhase,transform1,transform2) {
	if(this.m_proxyId == 65535) return false;
	var aabb = box2D.collision.shapes.B2Shape.s_syncAABB;
	this.ComputeSweptAABB(aabb,transform1,transform2);
	if(broadPhase.InRange(aabb)) {
		broadPhase.MoveProxy(this.m_proxyId,aabb);
		return true;
	} else return false;
}
box2D.collision.shapes.B2Shape.prototype.RefilterProxy = function(broadPhase,transform) {
	if(this.m_proxyId == 65535) return;
	broadPhase.DestroyProxy(this.m_proxyId);
	var aabb = box2D.collision.shapes.B2Shape.s_resetAABB;
	this.ComputeAABB(aabb,transform);
	var inRange = broadPhase.InRange(aabb);
	if(inRange) this.m_proxyId = broadPhase.CreateProxy(aabb,this); else this.m_proxyId = 65535;
}
box2D.collision.shapes.B2Shape.prototype.UpdateSweepRadius = function(center) {
}
box2D.collision.shapes.B2Shape.prototype.m_type = null;
box2D.collision.shapes.B2Shape.prototype.m_next = null;
box2D.collision.shapes.B2Shape.prototype.m_body = null;
box2D.collision.shapes.B2Shape.prototype.m_sweepRadius = null;
box2D.collision.shapes.B2Shape.prototype.m_density = null;
box2D.collision.shapes.B2Shape.prototype.m_friction = null;
box2D.collision.shapes.B2Shape.prototype.m_restitution = null;
box2D.collision.shapes.B2Shape.prototype.m_proxyId = null;
box2D.collision.shapes.B2Shape.prototype.m_filter = null;
box2D.collision.shapes.B2Shape.prototype.m_isSensor = null;
box2D.collision.shapes.B2Shape.prototype.m_userData = null;
box2D.collision.shapes.B2Shape.prototype.__class__ = box2D.collision.shapes.B2Shape;
box2D.dynamics.joints.B2PulleyJoint = function(def) {
	if( def === $_ ) return;
	box2D.dynamics.joints.B2Joint.call(this,def);
	this.m_u1 = new box2D.common.math.B2Vec2();
	this.m_u2 = new box2D.common.math.B2Vec2();
	this.m_groundAnchor1 = new box2D.common.math.B2Vec2();
	this.m_groundAnchor2 = new box2D.common.math.B2Vec2();
	this.m_localAnchor1 = new box2D.common.math.B2Vec2();
	this.m_localAnchor2 = new box2D.common.math.B2Vec2();
	var tMat;
	var tX;
	var tY;
	this.m_ground = this.m_body1.m_world.m_groundBody;
	this.m_groundAnchor1.x = def.groundAnchor1.x - this.m_ground.m_xf.position.x;
	this.m_groundAnchor1.y = def.groundAnchor1.y - this.m_ground.m_xf.position.y;
	this.m_groundAnchor2.x = def.groundAnchor2.x - this.m_ground.m_xf.position.x;
	this.m_groundAnchor2.y = def.groundAnchor2.y - this.m_ground.m_xf.position.y;
	this.m_localAnchor1.SetV(def.localAnchor1);
	this.m_localAnchor2.SetV(def.localAnchor2);
	this.m_ratio = def.ratio;
	this.m_constant = def.length1 + this.m_ratio * def.length2;
	this.m_maxLength1 = box2D.common.math.B2Math.b2Min(def.maxLength1,this.m_constant - this.m_ratio * box2D.dynamics.joints.B2PulleyJoint.b2_minPulleyLength);
	this.m_maxLength2 = box2D.common.math.B2Math.b2Min(def.maxLength2,(this.m_constant - box2D.dynamics.joints.B2PulleyJoint.b2_minPulleyLength) / this.m_ratio);
	this.m_force = 0.0;
	this.m_limitForce1 = 0.0;
	this.m_limitForce2 = 0.0;
}
box2D.dynamics.joints.B2PulleyJoint.__name__ = ["box2D","dynamics","joints","B2PulleyJoint"];
box2D.dynamics.joints.B2PulleyJoint.__super__ = box2D.dynamics.joints.B2Joint;
for(var k in box2D.dynamics.joints.B2Joint.prototype ) box2D.dynamics.joints.B2PulleyJoint.prototype[k] = box2D.dynamics.joints.B2Joint.prototype[k];
box2D.dynamics.joints.B2PulleyJoint.prototype.GetAnchor1 = function() {
	return this.m_body1.GetWorldPoint(this.m_localAnchor1);
}
box2D.dynamics.joints.B2PulleyJoint.prototype.GetAnchor2 = function() {
	return this.m_body2.GetWorldPoint(this.m_localAnchor2);
}
box2D.dynamics.joints.B2PulleyJoint.prototype.GetReactionForce = function() {
	var F = this.m_u2.Copy();
	F.Multiply(this.m_force);
	return F;
}
box2D.dynamics.joints.B2PulleyJoint.prototype.GetReactionTorque = function() {
	return 0.0;
}
box2D.dynamics.joints.B2PulleyJoint.prototype.GetGroundAnchor1 = function() {
	var a = this.m_ground.m_xf.position.Copy();
	a.Add(this.m_groundAnchor1);
	return a;
}
box2D.dynamics.joints.B2PulleyJoint.prototype.GetGroundAnchor2 = function() {
	var a = this.m_ground.m_xf.position.Copy();
	a.Add(this.m_groundAnchor2);
	return a;
}
box2D.dynamics.joints.B2PulleyJoint.prototype.GetLength1 = function() {
	var p = this.m_body1.GetWorldPoint(this.m_localAnchor1);
	var sX = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
	var sY = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
	var dX = p.x - sX;
	var dY = p.y - sY;
	return Math.sqrt(dX * dX + dY * dY);
}
box2D.dynamics.joints.B2PulleyJoint.prototype.GetLength2 = function() {
	var p = this.m_body2.GetWorldPoint(this.m_localAnchor2);
	var sX = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
	var sY = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
	var dX = p.x - sX;
	var dY = p.y - sY;
	return Math.sqrt(dX * dX + dY * dY);
}
box2D.dynamics.joints.B2PulleyJoint.prototype.GetRatio = function() {
	return this.m_ratio;
}
box2D.dynamics.joints.B2PulleyJoint.prototype.InitVelocityConstraints = function(step) {
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	var tMat;
	tMat = b1.m_xf.R;
	var r1X = this.m_localAnchor1.x - b1.m_sweep.localCenter.x;
	var r1Y = this.m_localAnchor1.y - b1.m_sweep.localCenter.y;
	var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
	r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
	r1X = tX;
	tMat = b2.m_xf.R;
	var r2X = this.m_localAnchor2.x - b2.m_sweep.localCenter.x;
	var r2Y = this.m_localAnchor2.y - b2.m_sweep.localCenter.y;
	tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
	r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
	r2X = tX;
	var p1X = b1.m_sweep.c.x + r1X;
	var p1Y = b1.m_sweep.c.y + r1Y;
	var p2X = b2.m_sweep.c.x + r2X;
	var p2Y = b2.m_sweep.c.y + r2Y;
	var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
	var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
	var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
	var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
	this.m_u1.Set(p1X - s1X,p1Y - s1Y);
	this.m_u2.Set(p2X - s2X,p2Y - s2Y);
	var length1 = this.m_u1.Length();
	var length2 = this.m_u2.Length();
	if(length1 > box2D.common.B2Settings.b2_linearSlop) this.m_u1.Multiply(1.0 / length1); else this.m_u1.SetZero();
	if(length2 > box2D.common.B2Settings.b2_linearSlop) this.m_u2.Multiply(1.0 / length2); else this.m_u2.SetZero();
	var C = this.m_constant - length1 - this.m_ratio * length2;
	if(C > 0.0) {
		this.m_state = 0;
		this.m_force = 0.0;
	} else {
		this.m_state = 2;
		this.m_positionImpulse = 0.0;
	}
	if(length1 < this.m_maxLength1) {
		this.m_limitState1 = 0;
		this.m_limitForce1 = 0.0;
	} else {
		this.m_limitState1 = 2;
		this.m_limitPositionImpulse1 = 0.0;
	}
	if(length2 < this.m_maxLength2) {
		this.m_limitState2 = 0;
		this.m_limitForce2 = 0.0;
	} else {
		this.m_limitState2 = 2;
		this.m_limitPositionImpulse2 = 0.0;
	}
	var cr1u1 = r1X * this.m_u1.y - r1Y * this.m_u1.x;
	var cr2u2 = r2X * this.m_u2.y - r2Y * this.m_u2.x;
	this.m_limitMass1 = b1.m_invMass + b1.m_invI * cr1u1 * cr1u1;
	this.m_limitMass2 = b2.m_invMass + b2.m_invI * cr2u2 * cr2u2;
	this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
	this.m_limitMass1 = 1.0 / this.m_limitMass1;
	this.m_limitMass2 = 1.0 / this.m_limitMass2;
	this.m_pulleyMass = 1.0 / this.m_pulleyMass;
	if(step.warmStarting) {
		var P1X = step.dt * (-this.m_force - this.m_limitForce1) * this.m_u1.x;
		var P1Y = step.dt * (-this.m_force - this.m_limitForce1) * this.m_u1.y;
		var P2X = step.dt * (-this.m_ratio * this.m_force - this.m_limitForce2) * this.m_u2.x;
		var P2Y = step.dt * (-this.m_ratio * this.m_force - this.m_limitForce2) * this.m_u2.y;
		b1.m_linearVelocity.x += b1.m_invMass * P1X;
		b1.m_linearVelocity.y += b1.m_invMass * P1Y;
		b1.m_angularVelocity += b1.m_invI * (r1X * P1Y - r1Y * P1X);
		b2.m_linearVelocity.x += b2.m_invMass * P2X;
		b2.m_linearVelocity.y += b2.m_invMass * P2Y;
		b2.m_angularVelocity += b2.m_invI * (r2X * P2Y - r2Y * P2X);
	} else {
		this.m_force = 0.0;
		this.m_limitForce1 = 0.0;
		this.m_limitForce2 = 0.0;
	}
}
box2D.dynamics.joints.B2PulleyJoint.prototype.SolveVelocityConstraints = function(step) {
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	var tMat;
	tMat = b1.m_xf.R;
	var r1X = this.m_localAnchor1.x - b1.m_sweep.localCenter.x;
	var r1Y = this.m_localAnchor1.y - b1.m_sweep.localCenter.y;
	var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
	r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
	r1X = tX;
	tMat = b2.m_xf.R;
	var r2X = this.m_localAnchor2.x - b2.m_sweep.localCenter.x;
	var r2Y = this.m_localAnchor2.y - b2.m_sweep.localCenter.y;
	tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
	r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
	r2X = tX;
	var v1X;
	var v1Y;
	var v2X;
	var v2Y;
	var P1X;
	var P1Y;
	var P2X;
	var P2Y;
	var Cdot;
	var force;
	var oldForce;
	if(this.m_state == 2) {
		v1X = b1.m_linearVelocity.x + -b1.m_angularVelocity * r1Y;
		v1Y = b1.m_linearVelocity.y + b1.m_angularVelocity * r1X;
		v2X = b2.m_linearVelocity.x + -b2.m_angularVelocity * r2Y;
		v2Y = b2.m_linearVelocity.y + b2.m_angularVelocity * r2X;
		Cdot = -(this.m_u1.x * v1X + this.m_u1.y * v1Y) - this.m_ratio * (this.m_u2.x * v2X + this.m_u2.y * v2Y);
		force = -step.inv_dt * this.m_pulleyMass * Cdot;
		oldForce = this.m_force;
		this.m_force = box2D.common.math.B2Math.b2Max(0.0,this.m_force + force);
		force = this.m_force - oldForce;
		P1X = -step.dt * force * this.m_u1.x;
		P1Y = -step.dt * force * this.m_u1.y;
		P2X = -step.dt * this.m_ratio * force * this.m_u2.x;
		P2Y = -step.dt * this.m_ratio * force * this.m_u2.y;
		b1.m_linearVelocity.x += b1.m_invMass * P1X;
		b1.m_linearVelocity.y += b1.m_invMass * P1Y;
		b1.m_angularVelocity += b1.m_invI * (r1X * P1Y - r1Y * P1X);
		b2.m_linearVelocity.x += b2.m_invMass * P2X;
		b2.m_linearVelocity.y += b2.m_invMass * P2Y;
		b2.m_angularVelocity += b2.m_invI * (r2X * P2Y - r2Y * P2X);
	}
	if(this.m_limitState1 == 2) {
		v1X = b1.m_linearVelocity.x + -b1.m_angularVelocity * r1Y;
		v1Y = b1.m_linearVelocity.y + b1.m_angularVelocity * r1X;
		Cdot = -(this.m_u1.x * v1X + this.m_u1.y * v1Y);
		force = -step.inv_dt * this.m_limitMass1 * Cdot;
		oldForce = this.m_limitForce1;
		this.m_limitForce1 = box2D.common.math.B2Math.b2Max(0.0,this.m_limitForce1 + force);
		force = this.m_limitForce1 - oldForce;
		P1X = -step.dt * force * this.m_u1.x;
		P1Y = -step.dt * force * this.m_u1.y;
		b1.m_linearVelocity.x += b1.m_invMass * P1X;
		b1.m_linearVelocity.y += b1.m_invMass * P1Y;
		b1.m_angularVelocity += b1.m_invI * (r1X * P1Y - r1Y * P1X);
	}
	if(this.m_limitState2 == 2) {
		v2X = b2.m_linearVelocity.x + -b2.m_angularVelocity * r2Y;
		v2Y = b2.m_linearVelocity.y + b2.m_angularVelocity * r2X;
		Cdot = -(this.m_u2.x * v2X + this.m_u2.y * v2Y);
		force = -step.inv_dt * this.m_limitMass2 * Cdot;
		oldForce = this.m_limitForce2;
		this.m_limitForce2 = box2D.common.math.B2Math.b2Max(0.0,this.m_limitForce2 + force);
		force = this.m_limitForce2 - oldForce;
		P2X = -step.dt * force * this.m_u2.x;
		P2Y = -step.dt * force * this.m_u2.y;
		b2.m_linearVelocity.x += b2.m_invMass * P2X;
		b2.m_linearVelocity.y += b2.m_invMass * P2Y;
		b2.m_angularVelocity += b2.m_invI * (r2X * P2Y - r2Y * P2X);
	}
}
box2D.dynamics.joints.B2PulleyJoint.prototype.SolvePositionConstraints = function() {
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	var tMat;
	var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
	var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
	var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
	var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
	var r1X;
	var r1Y;
	var r2X;
	var r2Y;
	var p1X;
	var p1Y;
	var p2X;
	var p2Y;
	var length1;
	var length2;
	var C;
	var impulse;
	var oldImpulse;
	var oldLimitPositionImpulse;
	var tX;
	var linearError = 0.0;
	if(this.m_state == 2) {
		tMat = b1.m_xf.R;
		r1X = this.m_localAnchor1.x - b1.m_sweep.localCenter.x;
		r1Y = this.m_localAnchor1.y - b1.m_sweep.localCenter.y;
		tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = b2.m_xf.R;
		r2X = this.m_localAnchor2.x - b2.m_sweep.localCenter.x;
		r2Y = this.m_localAnchor2.y - b2.m_sweep.localCenter.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		p1X = b1.m_sweep.c.x + r1X;
		p1Y = b1.m_sweep.c.y + r1Y;
		p2X = b2.m_sweep.c.x + r2X;
		p2Y = b2.m_sweep.c.y + r2Y;
		this.m_u1.Set(p1X - s1X,p1Y - s1Y);
		this.m_u2.Set(p2X - s2X,p2Y - s2Y);
		length1 = this.m_u1.Length();
		length2 = this.m_u2.Length();
		if(length1 > box2D.common.B2Settings.b2_linearSlop) this.m_u1.Multiply(1.0 / length1); else this.m_u1.SetZero();
		if(length2 > box2D.common.B2Settings.b2_linearSlop) this.m_u2.Multiply(1.0 / length2); else this.m_u2.SetZero();
		C = this.m_constant - length1 - this.m_ratio * length2;
		linearError = box2D.common.math.B2Math.b2Max(linearError,-C);
		C = box2D.common.math.B2Math.b2Clamp(C + box2D.common.B2Settings.b2_linearSlop,-0.2,0.0);
		impulse = -this.m_pulleyMass * C;
		oldImpulse = this.m_positionImpulse;
		this.m_positionImpulse = box2D.common.math.B2Math.b2Max(0.0,this.m_positionImpulse + impulse);
		impulse = this.m_positionImpulse - oldImpulse;
		p1X = -impulse * this.m_u1.x;
		p1Y = -impulse * this.m_u1.y;
		p2X = -this.m_ratio * impulse * this.m_u2.x;
		p2Y = -this.m_ratio * impulse * this.m_u2.y;
		b1.m_sweep.c.x += b1.m_invMass * p1X;
		b1.m_sweep.c.y += b1.m_invMass * p1Y;
		b1.m_sweep.a += b1.m_invI * (r1X * p1Y - r1Y * p1X);
		b2.m_sweep.c.x += b2.m_invMass * p2X;
		b2.m_sweep.c.y += b2.m_invMass * p2Y;
		b2.m_sweep.a += b2.m_invI * (r2X * p2Y - r2Y * p2X);
		b1.SynchronizeTransform();
		b2.SynchronizeTransform();
	}
	if(this.m_limitState1 == 2) {
		tMat = b1.m_xf.R;
		r1X = this.m_localAnchor1.x - b1.m_sweep.localCenter.x;
		r1Y = this.m_localAnchor1.y - b1.m_sweep.localCenter.y;
		tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		p1X = b1.m_sweep.c.x + r1X;
		p1Y = b1.m_sweep.c.y + r1Y;
		this.m_u1.Set(p1X - s1X,p1Y - s1Y);
		length1 = this.m_u1.Length();
		if(length1 > box2D.common.B2Settings.b2_linearSlop) {
			this.m_u1.x *= 1.0 / length1;
			this.m_u1.y *= 1.0 / length1;
		} else this.m_u1.SetZero();
		C = this.m_maxLength1 - length1;
		linearError = box2D.common.math.B2Math.b2Max(linearError,-C);
		C = box2D.common.math.B2Math.b2Clamp(C + box2D.common.B2Settings.b2_linearSlop,-0.2,0.0);
		impulse = -this.m_limitMass1 * C;
		oldLimitPositionImpulse = this.m_limitPositionImpulse1;
		this.m_limitPositionImpulse1 = box2D.common.math.B2Math.b2Max(0.0,this.m_limitPositionImpulse1 + impulse);
		impulse = this.m_limitPositionImpulse1 - oldLimitPositionImpulse;
		p1X = -impulse * this.m_u1.x;
		p1Y = -impulse * this.m_u1.y;
		b1.m_sweep.c.x += b1.m_invMass * p1X;
		b1.m_sweep.c.y += b1.m_invMass * p1Y;
		b1.m_sweep.a += b1.m_invI * (r1X * p1Y - r1Y * p1X);
		b1.SynchronizeTransform();
	}
	if(this.m_limitState2 == 2) {
		tMat = b2.m_xf.R;
		r2X = this.m_localAnchor2.x - b2.m_sweep.localCenter.x;
		r2Y = this.m_localAnchor2.y - b2.m_sweep.localCenter.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		p2X = b2.m_sweep.c.x + r2X;
		p2Y = b2.m_sweep.c.y + r2Y;
		this.m_u2.Set(p2X - s2X,p2Y - s2Y);
		length2 = this.m_u2.Length();
		if(length2 > box2D.common.B2Settings.b2_linearSlop) {
			this.m_u2.x *= 1.0 / length2;
			this.m_u2.y *= 1.0 / length2;
		} else this.m_u2.SetZero();
		C = this.m_maxLength2 - length2;
		linearError = box2D.common.math.B2Math.b2Max(linearError,-C);
		C = box2D.common.math.B2Math.b2Clamp(C + box2D.common.B2Settings.b2_linearSlop,-0.2,0.0);
		impulse = -this.m_limitMass2 * C;
		oldLimitPositionImpulse = this.m_limitPositionImpulse2;
		this.m_limitPositionImpulse2 = box2D.common.math.B2Math.b2Max(0.0,this.m_limitPositionImpulse2 + impulse);
		impulse = this.m_limitPositionImpulse2 - oldLimitPositionImpulse;
		p2X = -impulse * this.m_u2.x;
		p2Y = -impulse * this.m_u2.y;
		b2.m_sweep.c.x += b2.m_invMass * p2X;
		b2.m_sweep.c.y += b2.m_invMass * p2Y;
		b2.m_sweep.a += b2.m_invI * (r2X * p2Y - r2Y * p2X);
		b2.SynchronizeTransform();
	}
	return linearError < box2D.common.B2Settings.b2_linearSlop;
}
box2D.dynamics.joints.B2PulleyJoint.prototype.m_ground = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_groundAnchor1 = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_groundAnchor2 = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_localAnchor1 = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_localAnchor2 = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_u1 = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_u2 = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_constant = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_ratio = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_maxLength1 = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_maxLength2 = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_pulleyMass = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_limitMass1 = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_limitMass2 = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_force = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_limitForce1 = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_limitForce2 = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_positionImpulse = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_limitPositionImpulse1 = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_limitPositionImpulse2 = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_state = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_limitState1 = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.m_limitState2 = null;
box2D.dynamics.joints.B2PulleyJoint.prototype.__class__ = box2D.dynamics.joints.B2PulleyJoint;
box2D.dynamics.contacts.B2CircleContact = function(shape1,shape2) {
	if( shape1 === $_ ) return;
	box2D.dynamics.contacts.B2Contact.call(this,shape1,shape2);
	this.m_manifolds = [new box2D.collision.B2Manifold()];
	this.m0 = new box2D.collision.B2Manifold();
	this.m_manifold = this.m_manifolds[0];
	this.m_manifold.pointCount = 0;
	var point = this.m_manifold.points[0];
	point.normalImpulse = 0.0;
	point.tangentImpulse = 0.0;
}
box2D.dynamics.contacts.B2CircleContact.__name__ = ["box2D","dynamics","contacts","B2CircleContact"];
box2D.dynamics.contacts.B2CircleContact.__super__ = box2D.dynamics.contacts.B2Contact;
for(var k in box2D.dynamics.contacts.B2Contact.prototype ) box2D.dynamics.contacts.B2CircleContact.prototype[k] = box2D.dynamics.contacts.B2Contact.prototype[k];
box2D.dynamics.contacts.B2CircleContact.Create = function(shape1,shape2,allocator) {
	return new box2D.dynamics.contacts.B2CircleContact(shape1,shape2);
}
box2D.dynamics.contacts.B2CircleContact.Destroy = function(contact,allocator) {
}
box2D.dynamics.contacts.B2CircleContact.prototype.m_manifolds = null;
box2D.dynamics.contacts.B2CircleContact.prototype.m_manifold = null;
box2D.dynamics.contacts.B2CircleContact.prototype.m0 = null;
box2D.dynamics.contacts.B2CircleContact.prototype.Evaluate = function(listener) {
	var v1;
	var v2;
	var mp0;
	var b1 = this.m_shape1.m_body;
	var b2 = this.m_shape2.m_body;
	this.m0.Set(this.m_manifold);
	box2D.collision.B2Collision.b2CollideCircles(this.m_manifold,this.m_shape1,b1.m_xf,this.m_shape2,b2.m_xf);
	var cp = box2D.dynamics.contacts.B2CircleContact.s_evalCP;
	cp.shape1 = this.m_shape1;
	cp.shape2 = this.m_shape2;
	cp.friction = this.m_friction;
	cp.restitution = this.m_restitution;
	if(this.m_manifold.pointCount > 0) {
		this.m_manifoldCount = 1;
		var mp = this.m_manifold.points[0];
		if(this.m0.pointCount == 0) {
			mp.normalImpulse = 0.0;
			mp.tangentImpulse = 0.0;
			if(listener != null) {
				cp.position = b1.GetWorldPoint(mp.localPoint1);
				v1 = b1.GetLinearVelocityFromWorldPoint(b1.GetWorldPoint(mp.localPoint1));
				v2 = b2.GetLinearVelocityFromWorldPoint(b2.GetWorldPoint(mp.localPoint2));
				cp.velocity.Set(v2.x - v1.x,v2.y - v1.y);
				cp.normal.SetV(this.m_manifold.normal);
				cp.separation = mp.separation;
				cp.id.setKey(mp.id._key);
				listener.Add(cp);
			}
		} else {
			mp0 = this.m0.points[0];
			mp.normalImpulse = mp0.normalImpulse;
			mp.tangentImpulse = mp0.tangentImpulse;
			if(listener != null) {
				cp.position = b1.GetWorldPoint(mp.localPoint1);
				v1 = b1.GetLinearVelocityFromWorldPoint(b1.GetWorldPoint(mp.localPoint1));
				v2 = b2.GetLinearVelocityFromWorldPoint(b2.GetWorldPoint(mp.localPoint2));
				cp.velocity.Set(v2.x - v1.x,v2.y - v1.y);
				cp.normal.SetV(this.m_manifold.normal);
				cp.separation = mp.separation;
				cp.id.setKey(mp.id._key);
				listener.Persist(cp);
			}
		}
	} else {
		this.m_manifoldCount = 0;
		if(this.m0.pointCount > 0 && listener != null) {
			mp0 = this.m0.points[0];
			cp.position = b1.GetWorldPoint(mp0.localPoint1);
			v1 = b1.GetLinearVelocityFromWorldPoint(b1.GetWorldPoint(mp0.localPoint1));
			v2 = b2.GetLinearVelocityFromWorldPoint(b2.GetWorldPoint(mp0.localPoint2));
			cp.velocity.Set(v2.x - v1.x,v2.y - v1.y);
			cp.normal.SetV(this.m0.normal);
			cp.separation = mp0.separation;
			cp.id.setKey(mp0.id._key);
			listener.Remove(cp);
		}
	}
}
box2D.dynamics.contacts.B2CircleContact.prototype.GetManifolds = function() {
	return this.m_manifolds;
}
box2D.dynamics.contacts.B2CircleContact.prototype.__class__ = box2D.dynamics.contacts.B2CircleContact;
box2D.dynamics.joints.B2MouseJoint = function(def) {
	if( def === $_ ) return;
	box2D.dynamics.joints.B2Joint.call(this,def);
	this.K = new box2D.common.math.B2Mat22();
	this.K1 = new box2D.common.math.B2Mat22();
	this.K2 = new box2D.common.math.B2Mat22();
	this.m_localAnchor = new box2D.common.math.B2Vec2();
	this.m_target = new box2D.common.math.B2Vec2();
	this.m_impulse = new box2D.common.math.B2Vec2();
	this.m_mass = new box2D.common.math.B2Mat22();
	this.m_C = new box2D.common.math.B2Vec2();
	this.m_target.SetV(def.target);
	var tX = this.m_target.x - this.m_body2.m_xf.position.x;
	var tY = this.m_target.y - this.m_body2.m_xf.position.y;
	var tMat = this.m_body2.m_xf.R;
	this.m_localAnchor.x = tX * tMat.col1.x + tY * tMat.col1.y;
	this.m_localAnchor.y = tX * tMat.col2.x + tY * tMat.col2.y;
	this.m_maxForce = def.maxForce;
	this.m_impulse.SetZero();
	var mass = this.m_body2.m_mass;
	var omega = 2.0 * Math.PI * def.frequencyHz;
	var d = 2.0 * mass * def.dampingRatio * omega;
	var k = def.timeStep * mass * (omega * omega);
	this.m_gamma = 1.0 / (d + k);
	this.m_beta = k / (d + k);
}
box2D.dynamics.joints.B2MouseJoint.__name__ = ["box2D","dynamics","joints","B2MouseJoint"];
box2D.dynamics.joints.B2MouseJoint.__super__ = box2D.dynamics.joints.B2Joint;
for(var k in box2D.dynamics.joints.B2Joint.prototype ) box2D.dynamics.joints.B2MouseJoint.prototype[k] = box2D.dynamics.joints.B2Joint.prototype[k];
box2D.dynamics.joints.B2MouseJoint.prototype.GetAnchor1 = function() {
	return this.m_target;
}
box2D.dynamics.joints.B2MouseJoint.prototype.GetAnchor2 = function() {
	return this.m_body2.GetWorldPoint(this.m_localAnchor);
}
box2D.dynamics.joints.B2MouseJoint.prototype.GetReactionForce = function() {
	return this.m_impulse;
}
box2D.dynamics.joints.B2MouseJoint.prototype.GetReactionTorque = function() {
	return 0.0;
}
box2D.dynamics.joints.B2MouseJoint.prototype.SetTarget = function(target) {
	if(this.m_body2.IsSleeping()) this.m_body2.WakeUp();
	this.m_target = target;
}
box2D.dynamics.joints.B2MouseJoint.prototype.K = null;
box2D.dynamics.joints.B2MouseJoint.prototype.K1 = null;
box2D.dynamics.joints.B2MouseJoint.prototype.K2 = null;
box2D.dynamics.joints.B2MouseJoint.prototype.InitVelocityConstraints = function(step) {
	var b = this.m_body2;
	var tMat;
	tMat = b.m_xf.R;
	var rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
	var rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
	var tX = tMat.col1.x * rX + tMat.col2.x * rY;
	rY = tMat.col1.y * rX + tMat.col2.y * rY;
	rX = tX;
	var invMass = b.m_invMass;
	var invI = b.m_invI;
	this.K1.col1.x = invMass;
	this.K1.col2.x = 0.0;
	this.K1.col1.y = 0.0;
	this.K1.col2.y = invMass;
	this.K2.col1.x = invI * rY * rY;
	this.K2.col2.x = -invI * rX * rY;
	this.K2.col1.y = -invI * rX * rY;
	this.K2.col2.y = invI * rX * rX;
	this.K.SetM(this.K1);
	this.K.AddM(this.K2);
	this.K.col1.x += this.m_gamma;
	this.K.col2.y += this.m_gamma;
	this.K.Invert(this.m_mass);
	this.m_C.x = b.m_sweep.c.x + rX - this.m_target.x;
	this.m_C.y = b.m_sweep.c.y + rY - this.m_target.y;
	b.m_angularVelocity *= 0.98;
	var PX = step.dt * this.m_impulse.x;
	var PY = step.dt * this.m_impulse.y;
	b.m_linearVelocity.x += invMass * PX;
	b.m_linearVelocity.y += invMass * PY;
	b.m_angularVelocity += invI * (rX * PY - rY * PX);
}
box2D.dynamics.joints.B2MouseJoint.prototype.SolveVelocityConstraints = function(step) {
	var b = this.m_body2;
	var tMat;
	var tX;
	var tY;
	tMat = b.m_xf.R;
	var rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
	var rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
	tX = tMat.col1.x * rX + tMat.col2.x * rY;
	rY = tMat.col1.y * rX + tMat.col2.y * rY;
	rX = tX;
	var CdotX = b.m_linearVelocity.x + -b.m_angularVelocity * rY;
	var CdotY = b.m_linearVelocity.y + b.m_angularVelocity * rX;
	tMat = this.m_mass;
	tX = CdotX + this.m_beta * step.inv_dt * this.m_C.x + this.m_gamma * step.dt * this.m_impulse.x;
	tY = CdotY + this.m_beta * step.inv_dt * this.m_C.y + this.m_gamma * step.dt * this.m_impulse.y;
	var forceX = -step.inv_dt * (tMat.col1.x * tX + tMat.col2.x * tY);
	var forceY = -step.inv_dt * (tMat.col1.y * tX + tMat.col2.y * tY);
	var oldForceX = this.m_impulse.x;
	var oldForceY = this.m_impulse.y;
	this.m_impulse.x += forceX;
	this.m_impulse.y += forceY;
	var forceMagnitude = this.m_impulse.Length();
	if(forceMagnitude > this.m_maxForce) this.m_impulse.Multiply(this.m_maxForce / forceMagnitude);
	forceX = this.m_impulse.x - oldForceX;
	forceY = this.m_impulse.y - oldForceY;
	var PX = step.dt * forceX;
	var PY = step.dt * forceY;
	b.m_linearVelocity.x += b.m_invMass * PX;
	b.m_linearVelocity.y += b.m_invMass * PY;
	b.m_angularVelocity += b.m_invI * (rX * PY - rY * PX);
}
box2D.dynamics.joints.B2MouseJoint.prototype.SolvePositionConstraints = function() {
	return true;
}
box2D.dynamics.joints.B2MouseJoint.prototype.m_localAnchor = null;
box2D.dynamics.joints.B2MouseJoint.prototype.m_target = null;
box2D.dynamics.joints.B2MouseJoint.prototype.m_impulse = null;
box2D.dynamics.joints.B2MouseJoint.prototype.m_mass = null;
box2D.dynamics.joints.B2MouseJoint.prototype.m_C = null;
box2D.dynamics.joints.B2MouseJoint.prototype.m_maxForce = null;
box2D.dynamics.joints.B2MouseJoint.prototype.m_beta = null;
box2D.dynamics.joints.B2MouseJoint.prototype.m_gamma = null;
box2D.dynamics.joints.B2MouseJoint.prototype.__class__ = box2D.dynamics.joints.B2MouseJoint;
box2D.collision.B2ManifoldPoint = function(p) {
	if( p === $_ ) return;
	this.localPoint1 = new box2D.common.math.B2Vec2();
	this.localPoint2 = new box2D.common.math.B2Vec2();
	this.id = new box2D.collision.B2ContactID();
}
box2D.collision.B2ManifoldPoint.__name__ = ["box2D","collision","B2ManifoldPoint"];
box2D.collision.B2ManifoldPoint.prototype.Reset = function() {
	this.localPoint1.SetZero();
	this.localPoint2.SetZero();
	this.separation = 0.0;
	this.normalImpulse = 0.0;
	this.tangentImpulse = 0.0;
	this.id.setKey(0);
}
box2D.collision.B2ManifoldPoint.prototype.Set = function(m) {
	this.localPoint1.SetV(m.localPoint1);
	this.localPoint2.SetV(m.localPoint2);
	this.separation = m.separation;
	this.normalImpulse = m.normalImpulse;
	this.tangentImpulse = m.tangentImpulse;
	this.id.setKey(m.id.getKey());
}
box2D.collision.B2ManifoldPoint.prototype.localPoint1 = null;
box2D.collision.B2ManifoldPoint.prototype.localPoint2 = null;
box2D.collision.B2ManifoldPoint.prototype.separation = null;
box2D.collision.B2ManifoldPoint.prototype.normalImpulse = null;
box2D.collision.B2ManifoldPoint.prototype.tangentImpulse = null;
box2D.collision.B2ManifoldPoint.prototype.id = null;
box2D.collision.B2ManifoldPoint.prototype.__class__ = box2D.collision.B2ManifoldPoint;
box2D.dynamics.joints.B2GearJointDef = function(p) {
	if( p === $_ ) return;
	box2D.dynamics.joints.B2JointDef.call(this);
	this.type = 6;
	this.joint1 = null;
	this.joint2 = null;
	this.ratio = 1.0;
}
box2D.dynamics.joints.B2GearJointDef.__name__ = ["box2D","dynamics","joints","B2GearJointDef"];
box2D.dynamics.joints.B2GearJointDef.__super__ = box2D.dynamics.joints.B2JointDef;
for(var k in box2D.dynamics.joints.B2JointDef.prototype ) box2D.dynamics.joints.B2GearJointDef.prototype[k] = box2D.dynamics.joints.B2JointDef.prototype[k];
box2D.dynamics.joints.B2GearJointDef.prototype.joint1 = null;
box2D.dynamics.joints.B2GearJointDef.prototype.joint2 = null;
box2D.dynamics.joints.B2GearJointDef.prototype.ratio = null;
box2D.dynamics.joints.B2GearJointDef.prototype.__class__ = box2D.dynamics.joints.B2GearJointDef;
box2D.dynamics.B2BoundaryListener = function(p) {
}
box2D.dynamics.B2BoundaryListener.__name__ = ["box2D","dynamics","B2BoundaryListener"];
box2D.dynamics.B2BoundaryListener.prototype.Violation = function(body) {
}
box2D.dynamics.B2BoundaryListener.prototype.__class__ = box2D.dynamics.B2BoundaryListener;
fboyle.layout.FlaLayout = function(xml) {
	if( xml === $_ ) return;
	this.onFilesLoaded = new hxs.Signal1();
	this.xml = Xml.parse(xml);
	this.fast = new haxe.xml.Fast(this.xml);
	this.layouts = new Hash();
	var $it0 = this.fast.nodes.resolve("layout").iterator();
	while( $it0.hasNext() ) {
		var n = $it0.next();
		this.layouts.set(n.att.resolve("name"),n);
	}
	var displayType = "flash";
	displayType = "easeljs";
	this.displayList = fboyle.display.DisplayFactory.setDisplayList(displayType);
	this.loadingCount = this.loadedCount = 0;
}
fboyle.layout.FlaLayout.__name__ = ["fboyle","layout","FlaLayout"];
fboyle.layout.FlaLayout.prototype.onFilesLoaded = null;
fboyle.layout.FlaLayout.prototype.xml = null;
fboyle.layout.FlaLayout.prototype.fast = null;
fboyle.layout.FlaLayout.prototype.layouts = null;
fboyle.layout.FlaLayout.prototype.displayList = null;
fboyle.layout.FlaLayout.prototype.container = null;
fboyle.layout.FlaLayout.prototype.loadingCount = null;
fboyle.layout.FlaLayout.prototype.loadedCount = null;
fboyle.layout.FlaLayout.prototype.getLayoutInfo = function(name) {
	if(!this.layouts.exists(name)) return null;
	var lo = this.layouts.get(name);
	return { width : Std.parseFloat(lo.att.resolve("w")), height : Std.parseFloat(lo.att.resolve("h"))};
}
fboyle.layout.FlaLayout.prototype.buildLayout = function(layout,addToScope) {
	this.container = addToScope;
	if(layout == null) throw "Layout does not exist";
	var $it0 = layout.x.elements();
	while( $it0.hasNext() ) {
		var child = $it0.next();
		switch(child.getNodeName()) {
		case "movieclip":
			this.createMovieClip(new haxe.xml.Fast(child),addToScope.container);
			break;
		case "bitmap":
			this.createBitmap(new haxe.xml.Fast(child),addToScope.container);
			break;
		case "empty":
			this.createEmpty(new haxe.xml.Fast(child));
			break;
		}
	}
}
fboyle.layout.FlaLayout.prototype.createEmpty = function(objectInfo) {
	var rot = 0.0;
	if(objectInfo.has.resolve("r")) rot = Std.parseFloat(objectInfo.att.resolve("r"));
	var empty = new fboyle.layout.EmptyVo(objectInfo.att.resolve("name"),objectInfo.att.resolve("id"),objectInfo.att.resolve("extraInfo"),Std.parseFloat(objectInfo.att.resolve("x")),Std.parseFloat(objectInfo.att.resolve("y")),rot);
	if(this.container != null) {
		if(this.container.emptyObjects != null) this.container.emptyObjects.set(objectInfo.att.resolve("name"),empty);
	}
}
fboyle.layout.FlaLayout.prototype.createBitmap = function(objectInfo,addToScope) {
	this.loadingCount++;
	var bmp = this.displayList.loadBitmap(objectInfo.att.resolve("file"),$closure(this,"loadedCheck"));
	bmp.x = Std.parseFloat(objectInfo.att.resolve("x"));
	bmp.y = Std.parseFloat(objectInfo.att.resolve("y"));
	bmp.rotation = Std.parseFloat(objectInfo.att.resolve("r"));
	if(addToScope != null) this.displayList.addChild(bmp,addToScope);
	if(this.container != null) {
		if(this.container.bitmaps != null) this.container.bitmaps.push(bmp);
	}
}
fboyle.layout.FlaLayout.prototype.createMovieClip = function(objectInfo,addToScope) {
	this.loadingCount++;
	var frames = objectInfo.att.resolve("sheetindicies").split(",");
	var sFrame = frames.length < 1?0:Std.parseInt(frames[0]);
	var eFrame = frames.length >= 1?Std.parseInt(frames[frames.length - 1]):0;
	var seqInfo = { name : objectInfo.att.resolve("name"), file : objectInfo.att.resolve("file"), frameWidth : Std.parseFloat(objectInfo.att.resolve("frameWidth")), frameHeight : Std.parseFloat(objectInfo.att.resolve("frameHeight")), registrationPoint : { x : Std.parseInt(objectInfo.att.resolve("regX")), y : Std.parseInt(objectInfo.att.resolve("regY"))}, sheetindicies : objectInfo.att.resolve("sheetindicies"), startFrame : sFrame, endFrame : eFrame, scope : addToScope};
	var mc = this.displayList.loadMovieClip(objectInfo.att.resolve("file"),seqInfo,$closure(this,"loadedCheck"));
	mc.x = Std.parseFloat(objectInfo.att.resolve("x"));
	mc.y = Std.parseFloat(objectInfo.att.resolve("y"));
	mc.rotation = Std.parseFloat(objectInfo.att.resolve("r"));
	if(addToScope != null) this.displayList.addChild(mc,addToScope);
	if(objectInfo.att.resolve("name") != "") {
		if(this.container != null) {
			if(this.container.namedObjects != null) this.container.namedObjects.set(objectInfo.att.resolve("name"),mc);
		}
	}
	return mc;
}
fboyle.layout.FlaLayout.prototype.loadedCheck = function() {
	this.loadedCount++;
	if(this.loadingCount == this.loadedCount) {
		this.onFilesLoaded.dispatch(this.loadedCount + " files loaded");
		this.loadedCount = this.loadingCount = 0;
	}
}
fboyle.layout.FlaLayout.prototype.f = function(v) {
	return Std.parseFloat(v);
}
fboyle.layout.FlaLayout.prototype.__class__ = fboyle.layout.FlaLayout;
hxs.core.SignalBase = function(caller) {
	if( caller === $_ ) return;
	this.slots = new hxs.core.PriorityQueue();
	this.target = caller;
	this.isMuted = false;
}
hxs.core.SignalBase.__name__ = ["hxs","core","SignalBase"];
hxs.core.SignalBase.prototype.slots = null;
hxs.core.SignalBase.prototype.target = null;
hxs.core.SignalBase.prototype.isMuted = null;
hxs.core.SignalBase.prototype.add = function(listener,priority,runCount) {
	if(runCount == null) runCount = -1;
	if(priority == null) priority = 0;
	this.remove(listener);
	this.slots.add(new hxs.core.Slot(listener,hxs.core.SignalType.NORMAL,runCount),priority);
}
hxs.core.SignalBase.prototype.addOnce = function(listener,priority) {
	if(priority == null) priority = 0;
	this.add(listener,priority,1);
}
hxs.core.SignalBase.prototype.addAdvanced = function(listener,priority,runCount) {
	if(runCount == null) runCount = -1;
	if(priority == null) priority = 0;
	this.remove(listener);
	this.slots.add(new hxs.core.Slot(listener,hxs.core.SignalType.ADVANCED,runCount),priority);
}
hxs.core.SignalBase.prototype.addVoid = function(listener,priority,runCount) {
	if(runCount == null) runCount = -1;
	if(priority == null) priority = 0;
	this.remove(listener);
	this.slots.add(new hxs.core.Slot(listener,hxs.core.SignalType.VOID,runCount),priority);
}
hxs.core.SignalBase.prototype.remove = function(listener) {
	var $it0 = this.slots.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		if(i.listener == listener) this.slots.remove(i);
	}
}
hxs.core.SignalBase.prototype.removeAll = function() {
	this.slots = new hxs.core.PriorityQueue();
}
hxs.core.SignalBase.prototype.mute = function() {
	this.isMuted = true;
}
hxs.core.SignalBase.prototype.unmute = function() {
	this.isMuted = false;
}
hxs.core.SignalBase.prototype.muteSlot = function(listener) {
	var _g = 0, _g1 = this.slots.items;
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		if(i.item.listener == listener) i.item.mute();
	}
}
hxs.core.SignalBase.prototype.unmuteSlot = function(listener) {
	var _g = 0, _g1 = this.slots.items;
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		if(i.item.listener == listener) i.item.unmute();
	}
}
hxs.core.SignalBase.prototype.onFireSlot = function(slot) {
	if(slot.remainingCalls != -1) {
		if(--slot.remainingCalls <= 0) this.remove(slot.listener);
	}
}
hxs.core.SignalBase.prototype.__class__ = hxs.core.SignalBase;
touchmypixel.game.objects.BuilderBodyObject = function(s) {
	if( s === $_ ) return;
	touchmypixel.game.objects.Box2dBodyObject.call(this,s);
	this.geometry = new Array();
	this.namedGeometry = new Hash();
}
touchmypixel.game.objects.BuilderBodyObject.__name__ = ["touchmypixel","game","objects","BuilderBodyObject"];
touchmypixel.game.objects.BuilderBodyObject.__super__ = touchmypixel.game.objects.Box2dBodyObject;
for(var k in touchmypixel.game.objects.Box2dBodyObject.prototype ) touchmypixel.game.objects.BuilderBodyObject.prototype[k] = touchmypixel.game.objects.Box2dBodyObject.prototype[k];
touchmypixel.game.objects.BuilderBodyObject.prototype.info = null;
touchmypixel.game.objects.BuilderBodyObject.prototype.geometry = null;
touchmypixel.game.objects.BuilderBodyObject.prototype.namedGeometry = null;
touchmypixel.game.objects.BuilderBodyObject.prototype.__class__ = touchmypixel.game.objects.BuilderBodyObject;
box2D.dynamics.contacts.B2ContactConstraintPoint = function(p) {
	if( p === $_ ) return;
	this.localAnchor1 = new box2D.common.math.B2Vec2();
	this.localAnchor2 = new box2D.common.math.B2Vec2();
	this.r1 = new box2D.common.math.B2Vec2();
	this.r2 = new box2D.common.math.B2Vec2();
	this.normalImpulse = 0.0;
	this.tangentImpulse = 0.0;
	this.positionImpulse = 0.0;
	this.normalMass = 0.0;
	this.tangentMass = 0.0;
	this.equalizedMass = 0.0;
	this.separation = 0.0;
	this.velocityBias = 0.0;
}
box2D.dynamics.contacts.B2ContactConstraintPoint.__name__ = ["box2D","dynamics","contacts","B2ContactConstraintPoint"];
box2D.dynamics.contacts.B2ContactConstraintPoint.prototype.localAnchor1 = null;
box2D.dynamics.contacts.B2ContactConstraintPoint.prototype.localAnchor2 = null;
box2D.dynamics.contacts.B2ContactConstraintPoint.prototype.r1 = null;
box2D.dynamics.contacts.B2ContactConstraintPoint.prototype.r2 = null;
box2D.dynamics.contacts.B2ContactConstraintPoint.prototype.normalImpulse = null;
box2D.dynamics.contacts.B2ContactConstraintPoint.prototype.tangentImpulse = null;
box2D.dynamics.contacts.B2ContactConstraintPoint.prototype.positionImpulse = null;
box2D.dynamics.contacts.B2ContactConstraintPoint.prototype.normalMass = null;
box2D.dynamics.contacts.B2ContactConstraintPoint.prototype.tangentMass = null;
box2D.dynamics.contacts.B2ContactConstraintPoint.prototype.equalizedMass = null;
box2D.dynamics.contacts.B2ContactConstraintPoint.prototype.separation = null;
box2D.dynamics.contacts.B2ContactConstraintPoint.prototype.velocityBias = null;
box2D.dynamics.contacts.B2ContactConstraintPoint.prototype.__class__ = box2D.dynamics.contacts.B2ContactConstraintPoint;
box2D.collision.B2Collision = function(p) {
}
box2D.collision.B2Collision.__name__ = ["box2D","collision","B2Collision"];
box2D.collision.B2Collision.ClipSegmentToLine = function(vOut,vIn,normal,offset) {
	var cv;
	var numOut = 0;
	cv = vIn[0];
	var vIn0 = cv.v;
	cv = vIn[1];
	var vIn1 = cv.v;
	var distance0 = normal.x * vIn0.x + normal.y * vIn0.y - offset;
	var distance1 = normal.x * vIn1.x + normal.y * vIn1.y - offset;
	if(distance0 <= 0.0) vOut[numOut++] = vIn[0];
	if(distance1 <= 0.0) vOut[numOut++] = vIn[1];
	if(distance0 * distance1 < 0.0) {
		var interp = distance0 / (distance0 - distance1);
		cv = vOut[numOut];
		var tVec = cv.v;
		tVec.x = vIn0.x + interp * (vIn1.x - vIn0.x);
		tVec.y = vIn0.y + interp * (vIn1.y - vIn0.y);
		cv = vOut[numOut];
		var cv2;
		if(distance0 > 0.0) {
			cv2 = vIn[0];
			cv.id = cv2.id;
		} else {
			cv2 = vIn[1];
			cv.id = cv2.id;
		}
		++numOut;
	}
	return numOut;
}
box2D.collision.B2Collision.EdgeSeparation = function(poly1,xf1,edge1,poly2,xf2) {
	var count1 = poly1.m_vertexCount;
	var vertices1 = poly1.m_vertices;
	var normals1 = poly1.m_normals;
	var count2 = poly2.m_vertexCount;
	var vertices2 = poly2.m_vertices;
	var tMat;
	var tVec;
	tMat = xf1.R;
	tVec = normals1[edge1];
	var normal1WorldX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	var normal1WorldY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	tMat = xf2.R;
	var normal1X = tMat.col1.x * normal1WorldX + tMat.col1.y * normal1WorldY;
	var normal1Y = tMat.col2.x * normal1WorldX + tMat.col2.y * normal1WorldY;
	var index = 0;
	var minDot = 2.0 + 308;
	var _g = 0;
	while(_g < count2) {
		var i = _g++;
		tVec = vertices2[i];
		var dot = tVec.x * normal1X + tVec.y * normal1Y;
		if(dot < minDot) {
			minDot = dot;
			index = i;
		}
	}
	tVec = vertices1[edge1];
	tMat = xf1.R;
	var v1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var v1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	tVec = vertices2[index];
	tMat = xf2.R;
	var v2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var v2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	v2X -= v1X;
	v2Y -= v1Y;
	var separation = v2X * normal1WorldX + v2Y * normal1WorldY;
	return separation;
}
box2D.collision.B2Collision.FindMaxSeparation = function(edgeIndex,poly1,xf1,poly2,xf2) {
	var count1 = poly1.m_vertexCount;
	var normals1 = poly1.m_normals;
	var tVec;
	var tMat;
	tMat = xf2.R;
	tVec = poly2.m_centroid;
	var dX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var dY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	tMat = xf1.R;
	tVec = poly1.m_centroid;
	dX -= xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	dY -= xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	var dLocal1X = dX * xf1.R.col1.x + dY * xf1.R.col1.y;
	var dLocal1Y = dX * xf1.R.col2.x + dY * xf1.R.col2.y;
	var edge = 0;
	var maxDot = -(2.0 + 308);
	var _g = 0;
	while(_g < count1) {
		var i = _g++;
		tVec = normals1[i];
		var dot = tVec.x * dLocal1X + tVec.y * dLocal1Y;
		if(dot > maxDot) {
			maxDot = dot;
			edge = i;
		}
	}
	var s = box2D.collision.B2Collision.EdgeSeparation(poly1,xf1,edge,poly2,xf2);
	if(s > 0.0) return s;
	var prevEdge = edge - 1 >= 0?edge - 1:count1 - 1;
	var sPrev = box2D.collision.B2Collision.EdgeSeparation(poly1,xf1,prevEdge,poly2,xf2);
	if(sPrev > 0.0) return sPrev;
	var nextEdge = edge + 1 < count1?edge + 1:0;
	var sNext = box2D.collision.B2Collision.EdgeSeparation(poly1,xf1,nextEdge,poly2,xf2);
	if(sNext > 0.0) return sNext;
	var bestEdge;
	var bestSeparation;
	var increment;
	if(sPrev > s && sPrev > sNext) {
		increment = -1;
		bestEdge = prevEdge;
		bestSeparation = sPrev;
	} else if(sNext > s) {
		increment = 1;
		bestEdge = nextEdge;
		bestSeparation = sNext;
	} else {
		edgeIndex[0] = edge;
		return s;
	}
	while(true) {
		if(increment == -1) edge = bestEdge - 1 >= 0?bestEdge - 1:count1 - 1; else edge = bestEdge + 1 < count1?bestEdge + 1:0;
		s = box2D.collision.B2Collision.EdgeSeparation(poly1,xf1,edge,poly2,xf2);
		if(s > 0.0) return s;
		if(s > bestSeparation) {
			bestEdge = edge;
			bestSeparation = s;
		} else break;
	}
	edgeIndex[0] = bestEdge;
	return bestSeparation;
}
box2D.collision.B2Collision.FindIncidentEdge = function(c,poly1,xf1,edge1,poly2,xf2) {
	var count1 = poly1.m_vertexCount;
	var normals1 = poly1.m_normals;
	var count2 = poly2.m_vertexCount;
	var vertices2 = poly2.m_vertices;
	var normals2 = poly2.m_normals;
	var tMat;
	var tVec;
	tMat = xf1.R;
	tVec = normals1[edge1];
	var normal1X = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	var normal1Y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	tMat = xf2.R;
	var tX = tMat.col1.x * normal1X + tMat.col1.y * normal1Y;
	normal1Y = tMat.col2.x * normal1X + tMat.col2.y * normal1Y;
	normal1X = tX;
	var index = 0;
	var minDot = 2.0 + 308;
	var _g = 0;
	while(_g < count2) {
		var i = _g++;
		tVec = normals2[i];
		var dot = normal1X * tVec.x + normal1Y * tVec.y;
		if(dot < minDot) {
			minDot = dot;
			index = i;
		}
	}
	var tClip;
	var i1 = index;
	var i2 = i1 + 1 < count2?i1 + 1:0;
	tClip = c[0];
	tVec = vertices2[i1];
	tMat = xf2.R;
	tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	tClip.id.features.setReferenceEdge(edge1);
	tClip.id.features.setIncidentEdge(i1);
	tClip.id.features.setIncidentVertex(0);
	tClip = c[1];
	tVec = vertices2[i2];
	tMat = xf2.R;
	tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	tClip.id.features.setReferenceEdge(edge1);
	tClip.id.features.setIncidentEdge(i2);
	tClip.id.features.setIncidentVertex(1);
}
box2D.collision.B2Collision.b2CollidePolygons = function(manifold,polyA,xfA,polyB,xfB) {
	var cv;
	manifold.pointCount = 0;
	var edgeA = 0;
	var edgeAO = [edgeA];
	var separationA = box2D.collision.B2Collision.FindMaxSeparation(edgeAO,polyA,xfA,polyB,xfB);
	edgeA = edgeAO[0];
	if(separationA > 0.0) return;
	var edgeB = 0;
	var edgeBO = [edgeB];
	var separationB = box2D.collision.B2Collision.FindMaxSeparation(edgeBO,polyB,xfB,polyA,xfA);
	edgeB = edgeBO[0];
	if(separationB > 0.0) return;
	var poly1;
	var poly2;
	var xf1 = new box2D.common.math.B2XForm();
	var xf2 = new box2D.common.math.B2XForm();
	var edge1;
	var flip;
	var k_relativeTol = 0.98;
	var k_absoluteTol = 0.001;
	if(separationB > k_relativeTol * separationA + k_absoluteTol) {
		poly1 = polyB;
		poly2 = polyA;
		xf1.position.SetV(xfB.position);
		xf1.R.SetM(xfB.R);
		xf2.position.SetV(xfA.position);
		xf2.R.SetM(xfA.R);
		edge1 = edgeB;
		flip = 1;
	} else {
		poly1 = polyA;
		poly2 = polyB;
		xf1.position.SetV(xfA.position);
		xf1.R.SetM(xfA.R);
		xf2.position.SetV(xfB.position);
		xf2.R.SetM(xfB.R);
		edge1 = edgeA;
		flip = 0;
	}
	var incidentEdge = [new box2D.collision.ClipVertex(),new box2D.collision.ClipVertex()];
	box2D.collision.B2Collision.FindIncidentEdge(incidentEdge,poly1,xf1,edge1,poly2,xf2);
	var count1 = poly1.m_vertexCount;
	var vertices1 = poly1.m_vertices;
	var tVec = vertices1[edge1];
	var v11 = new box2D.common.math.B2Vec2(tVec.x,tVec.y);
	var v12;
	if(edge1 + 1 < count1) {
		tVec = vertices1[Std["int"](edge1 + 1)];
		v12 = new box2D.common.math.B2Vec2(tVec.x,tVec.y);
	} else {
		tVec = vertices1[0];
		v12 = new box2D.common.math.B2Vec2(tVec.x,tVec.y);
	}
	var dv = new box2D.common.math.B2Vec2(v12.x - v11.x,v12.y - v11.y);
	var sideNormal = box2D.common.math.B2Math.b2MulMV(xf1.R,new box2D.common.math.B2Vec2(v12.x - v11.x,v12.y - v11.y));
	sideNormal.Normalize();
	var frontNormal = new box2D.common.math.B2Vec2(sideNormal.y,-1. * sideNormal.x);
	v11 = box2D.common.math.B2Math.b2MulX(xf1,v11);
	v12 = box2D.common.math.B2Math.b2MulX(xf1,v12);
	var frontOffset = frontNormal.x * v11.x + frontNormal.y * v11.y;
	var sideOffset1 = -(sideNormal.x * v11.x + sideNormal.y * v11.y);
	var sideOffset2 = sideNormal.x * v12.x + sideNormal.y * v12.y;
	var clipPoints1 = [new box2D.collision.ClipVertex(),new box2D.collision.ClipVertex()];
	var clipPoints2 = [new box2D.collision.ClipVertex(),new box2D.collision.ClipVertex()];
	var np;
	np = box2D.collision.B2Collision.ClipSegmentToLine(clipPoints1,incidentEdge,new box2D.common.math.B2Vec2(-sideNormal.x,-sideNormal.y),sideOffset1);
	if(np < 2) return;
	np = box2D.collision.B2Collision.ClipSegmentToLine(clipPoints2,clipPoints1,sideNormal,sideOffset2);
	if(np < 2) return;
	manifold.normal = flip != 0?new box2D.common.math.B2Vec2(-frontNormal.x,-frontNormal.y):new box2D.common.math.B2Vec2(frontNormal.x,frontNormal.y);
	var pointCount = 0;
	var _g = 0;
	while(_g < 2) {
		var i = _g++;
		cv = clipPoints2[i];
		var separation = box2D.common.math.B2Math.b2Dot(frontNormal,cv.v) - frontOffset;
		if(separation <= 0.0) {
			var cp = manifold.points[pointCount];
			cp.separation = separation;
			cp.localPoint1 = box2D.common.math.B2Math.b2MulXT(xfA,cv.v);
			cp.localPoint2 = box2D.common.math.B2Math.b2MulXT(xfB,cv.v);
			cp.id.setKey(cv.id._key);
			cp.id.features.setFlip(flip);
			++pointCount;
		}
	}
	manifold.pointCount = pointCount;
}
box2D.collision.B2Collision.b2CollideCircles = function(manifold,circle1,xf1,circle2,xf2) {
	manifold.pointCount = 0;
	var tMat;
	var tVec;
	tMat = xf1.R;
	tVec = circle1.m_localPosition;
	var p1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var p1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	tMat = xf2.R;
	tVec = circle2.m_localPosition;
	var p2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var p2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	var dX = p2X - p1X;
	var dY = p2Y - p1Y;
	var distSqr = dX * dX + dY * dY;
	var r1 = circle1.m_radius;
	var r2 = circle2.m_radius;
	var radiusSum = r1 + r2;
	if(distSqr > radiusSum * radiusSum) return;
	var separation;
	if(distSqr < 5.0e-324) {
		separation = -radiusSum;
		manifold.normal.Set(0.0,1.0);
	} else {
		var dist = Math.sqrt(distSqr);
		separation = dist - radiusSum;
		var a = 1.0 / dist;
		manifold.normal.x = a * dX;
		manifold.normal.y = a * dY;
	}
	manifold.pointCount = 1;
	var tPoint = manifold.points[0];
	tPoint.id.setKey(0);
	tPoint.separation = separation;
	p1X += r1 * manifold.normal.x;
	p1Y += r1 * manifold.normal.y;
	p2X -= r2 * manifold.normal.x;
	p2Y -= r2 * manifold.normal.y;
	var pX = 0.5 * (p1X + p2X);
	var pY = 0.5 * (p1Y + p2Y);
	var tX = pX - xf1.position.x;
	var tY = pY - xf1.position.y;
	tPoint.localPoint1.x = tX * xf1.R.col1.x + tY * xf1.R.col1.y;
	tPoint.localPoint1.y = tX * xf1.R.col2.x + tY * xf1.R.col2.y;
	tX = pX - xf2.position.x;
	tY = pY - xf2.position.y;
	tPoint.localPoint2.x = tX * xf2.R.col1.x + tY * xf2.R.col1.y;
	tPoint.localPoint2.y = tX * xf2.R.col2.x + tY * xf2.R.col2.y;
}
box2D.collision.B2Collision.b2CollidePolygonAndCircle = function(manifold,polygon,xf1,circle,xf2) {
	manifold.pointCount = 0;
	var tPoint;
	var dX;
	var dY;
	var positionX;
	var positionY;
	var tVec;
	var tMat;
	tMat = xf2.R;
	tVec = circle.m_localPosition;
	var cX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var cY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	dX = cX - xf1.position.x;
	dY = cY - xf1.position.y;
	tMat = xf1.R;
	var cLocalX = dX * tMat.col1.x + dY * tMat.col1.y;
	var cLocalY = dX * tMat.col2.x + dY * tMat.col2.y;
	var dist;
	var normalIndex = 0;
	var separation = -(2.0 + 308);
	var radius = circle.m_radius;
	var vertexCount = polygon.m_vertexCount;
	var vertices = polygon.m_vertices;
	var normals = polygon.m_normals;
	var _g = 0;
	while(_g < vertexCount) {
		var i = _g++;
		tVec = vertices[i];
		dX = cLocalX - tVec.x;
		dY = cLocalY - tVec.y;
		tVec = normals[i];
		var s = tVec.x * dX + tVec.y * dY;
		if(s > radius) return;
		if(s > separation) {
			separation = s;
			normalIndex = i;
		}
	}
	if(separation < 5.0e-324) {
		manifold.pointCount = 1;
		tVec = normals[normalIndex];
		tMat = xf1.R;
		manifold.normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
		manifold.normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
		tPoint = manifold.points[0];
		tPoint.id.features.setIncidentEdge(normalIndex);
		tPoint.id.features.setIncidentVertex(255);
		tPoint.id.features.setReferenceEdge(0);
		tPoint.id.features.setFlip(0);
		positionX = cX - radius * manifold.normal.x;
		positionY = cY - radius * manifold.normal.y;
		dX = positionX - xf1.position.x;
		dY = positionY - xf1.position.y;
		tMat = xf1.R;
		tPoint.localPoint1.x = dX * tMat.col1.x + dY * tMat.col1.y;
		tPoint.localPoint1.y = dX * tMat.col2.x + dY * tMat.col2.y;
		dX = positionX - xf2.position.x;
		dY = positionY - xf2.position.y;
		tMat = xf2.R;
		tPoint.localPoint2.x = dX * tMat.col1.x + dY * tMat.col1.y;
		tPoint.localPoint2.y = dX * tMat.col2.x + dY * tMat.col2.y;
		tPoint.separation = separation - radius;
		return;
	}
	var vertIndex1 = normalIndex;
	var vertIndex2 = vertIndex1 + 1 < vertexCount?vertIndex1 + 1:0;
	tVec = vertices[vertIndex1];
	var tVec2 = vertices[vertIndex2];
	var eX = tVec2.x - tVec.x;
	var eY = tVec2.y - tVec.y;
	var length = Math.sqrt(eX * eX + eY * eY);
	eX /= length;
	eY /= length;
	dX = cLocalX - tVec.x;
	dY = cLocalY - tVec.y;
	var u = dX * eX + dY * eY;
	tPoint = manifold.points[0];
	var pX;
	var pY;
	if(u <= 0.0) {
		pX = tVec.x;
		pY = tVec.y;
		tPoint.id.features.setIncidentEdge(255);
		tPoint.id.features.setIncidentVertex(vertIndex1);
	} else if(u >= length) {
		pX = tVec2.x;
		pY = tVec2.y;
		tPoint.id.features.setIncidentEdge(255);
		tPoint.id.features.setIncidentVertex(vertIndex2);
	} else {
		pX = eX * u + tVec.x;
		pY = eY * u + tVec.y;
		tPoint.id.features.setIncidentEdge(normalIndex);
		tPoint.id.features.setIncidentVertex(0);
	}
	dX = cLocalX - pX;
	dY = cLocalY - pY;
	dist = Math.sqrt(dX * dX + dY * dY);
	dX /= dist;
	dY /= dist;
	if(dist > radius) return;
	manifold.pointCount = 1;
	tMat = xf1.R;
	manifold.normal.x = tMat.col1.x * dX + tMat.col2.x * dY;
	manifold.normal.y = tMat.col1.y * dX + tMat.col2.y * dY;
	positionX = cX - radius * manifold.normal.x;
	positionY = cY - radius * manifold.normal.y;
	dX = positionX - xf1.position.x;
	dY = positionY - xf1.position.y;
	tMat = xf1.R;
	tPoint.localPoint1.x = dX * tMat.col1.x + dY * tMat.col1.y;
	tPoint.localPoint1.y = dX * tMat.col2.x + dY * tMat.col2.y;
	dX = positionX - xf2.position.x;
	dY = positionY - xf2.position.y;
	tMat = xf2.R;
	tPoint.localPoint2.x = dX * tMat.col1.x + dY * tMat.col1.y;
	tPoint.localPoint2.y = dX * tMat.col2.x + dY * tMat.col2.y;
	tPoint.separation = dist - radius;
	tPoint.id.features.setReferenceEdge(0);
	tPoint.id.features.setFlip(0);
}
box2D.collision.B2Collision.b2TestOverlap = function(a,b) {
	var t1 = b.lowerBound;
	var t2 = a.upperBound;
	var d1X = t1.x - t2.x;
	var d1Y = t1.y - t2.y;
	t1 = a.lowerBound;
	t2 = b.upperBound;
	var d2X = t1.x - t2.x;
	var d2Y = t1.y - t2.y;
	if(d1X > 0.0 || d1Y > 0.0) return false;
	if(d2X > 0.0 || d2Y > 0.0) return false;
	return true;
}
box2D.collision.B2Collision.prototype.__class__ = box2D.collision.B2Collision;
fboyle.display.JsLevelBase = function(p) {
	if( p === $_ ) return;
	this.maxDT = 1 / 10;
	this.container = new Container();
	this.stage = (function($this) {
		var $r;
		if(fboyle.utils.DisplayObjectUtil.stage == null) haxe.Log.trace("warning: canvas/stage hasn't been defined!",{ fileName : "DisplayObjectUtil.hx", lineNumber : 75, className : "fboyle.utils.DisplayObjectUtil", methodName : "getStage"});
		$r = fboyle.utils.DisplayObjectUtil.stage;
		return $r;
	}(this));
	this.init();
}
fboyle.display.JsLevelBase.__name__ = ["fboyle","display","JsLevelBase"];
fboyle.display.JsLevelBase.prototype.lastFrameTime = null;
fboyle.display.JsLevelBase.prototype.container = null;
fboyle.display.JsLevelBase.prototype.maxDT = null;
fboyle.display.JsLevelBase.prototype.stage = null;
fboyle.display.JsLevelBase.prototype.init = function() {
}
fboyle.display.JsLevelBase.prototype.start = function() {
	this.lastFrameTime = haxe.Timer.stamp();
	Ticker.setInterval(20);
	Ticker.addListener(this);
}
fboyle.display.JsLevelBase.prototype.stop = function() {
	Ticker.removeListener(this);
}
fboyle.display.JsLevelBase.prototype.destroy = function() {
	this.stop();
	if(this.container != null) {
		if(this.container.parent != null) {
		}
	}
}
fboyle.display.JsLevelBase.prototype.tick = function() {
	var currentTime = haxe.Timer.stamp();
	var dt = currentTime - this.lastFrameTime;
	if(dt > this.maxDT) dt = this.maxDT;
	this.update(dt);
	this.lastFrameTime = currentTime;
}
fboyle.display.JsLevelBase.prototype.update = function(dt) {
	this.stage.tick();
}
fboyle.display.JsLevelBase.prototype.__class__ = fboyle.display.JsLevelBase;
fboyle.display.JsLevelBase.__interfaces__ = [fboyle.display.ILevel];
Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.foreach = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
Lambda.iter = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = a.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = b.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
}
Lambda.prototype.__class__ = Lambda;
box2D.dynamics.joints.B2DistanceJoint = function(def) {
	if( def === $_ ) return;
	box2D.dynamics.joints.B2Joint.call(this,def);
	this.m_localAnchor1 = new box2D.common.math.B2Vec2();
	this.m_localAnchor2 = new box2D.common.math.B2Vec2();
	this.m_u = new box2D.common.math.B2Vec2();
	var tMat;
	var tX;
	var tY;
	this.m_localAnchor1.SetV(def.localAnchor1);
	this.m_localAnchor2.SetV(def.localAnchor2);
	this.m_length = def.length;
	this.m_frequencyHz = def.frequencyHz;
	this.m_dampingRatio = def.dampingRatio;
	this.m_impulse = 0.0;
	this.m_gamma = 0.0;
	this.m_bias = 0.0;
	this.m_inv_dt = 0.0;
}
box2D.dynamics.joints.B2DistanceJoint.__name__ = ["box2D","dynamics","joints","B2DistanceJoint"];
box2D.dynamics.joints.B2DistanceJoint.__super__ = box2D.dynamics.joints.B2Joint;
for(var k in box2D.dynamics.joints.B2Joint.prototype ) box2D.dynamics.joints.B2DistanceJoint.prototype[k] = box2D.dynamics.joints.B2Joint.prototype[k];
box2D.dynamics.joints.B2DistanceJoint.prototype.InitVelocityConstraints = function(step) {
	var tMat;
	var tX;
	this.m_inv_dt = step.inv_dt;
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	tMat = b1.m_xf.R;
	var r1X = this.m_localAnchor1.x - b1.m_sweep.localCenter.x;
	var r1Y = this.m_localAnchor1.y - b1.m_sweep.localCenter.y;
	tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
	r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
	r1X = tX;
	tMat = b2.m_xf.R;
	var r2X = this.m_localAnchor2.x - b2.m_sweep.localCenter.x;
	var r2Y = this.m_localAnchor2.y - b2.m_sweep.localCenter.y;
	tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
	r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
	r2X = tX;
	this.m_u.x = b2.m_sweep.c.x + r2X - b1.m_sweep.c.x - r1X;
	this.m_u.y = b2.m_sweep.c.y + r2Y - b1.m_sweep.c.y - r1Y;
	var length = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
	if(length > box2D.common.B2Settings.b2_linearSlop) this.m_u.Multiply(1.0 / length); else this.m_u.SetZero();
	var cr1u = r1X * this.m_u.y - r1Y * this.m_u.x;
	var cr2u = r2X * this.m_u.y - r2Y * this.m_u.x;
	var invMass = b1.m_invMass + b1.m_invI * cr1u * cr1u + b2.m_invMass + b2.m_invI * cr2u * cr2u;
	this.m_mass = 1.0 / invMass;
	if(this.m_frequencyHz > 0.0) {
		var C = length - this.m_length;
		var omega = 2.0 * Math.PI * this.m_frequencyHz;
		var d = 2.0 * this.m_mass * this.m_dampingRatio * omega;
		var k = this.m_mass * omega * omega;
		this.m_gamma = 1.0 / (step.dt * (d + step.dt * k));
		this.m_bias = C * step.dt * k * this.m_gamma;
		this.m_mass = 1.0 / (invMass + this.m_gamma);
	}
	if(step.warmStarting) {
		this.m_impulse *= step.dtRatio;
		var PX = this.m_impulse * this.m_u.x;
		var PY = this.m_impulse * this.m_u.y;
		b1.m_linearVelocity.x -= b1.m_invMass * PX;
		b1.m_linearVelocity.y -= b1.m_invMass * PY;
		b1.m_angularVelocity -= b1.m_invI * (r1X * PY - r1Y * PX);
		b2.m_linearVelocity.x += b2.m_invMass * PX;
		b2.m_linearVelocity.y += b2.m_invMass * PY;
		b2.m_angularVelocity += b2.m_invI * (r2X * PY - r2Y * PX);
	} else this.m_impulse = 0.0;
}
box2D.dynamics.joints.B2DistanceJoint.prototype.SolveVelocityConstraints = function(step) {
	var tMat;
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	tMat = b1.m_xf.R;
	var r1X = this.m_localAnchor1.x - b1.m_sweep.localCenter.x;
	var r1Y = this.m_localAnchor1.y - b1.m_sweep.localCenter.y;
	var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
	r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
	r1X = tX;
	tMat = b2.m_xf.R;
	var r2X = this.m_localAnchor2.x - b2.m_sweep.localCenter.x;
	var r2Y = this.m_localAnchor2.y - b2.m_sweep.localCenter.y;
	tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
	r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
	r2X = tX;
	var v1X = b1.m_linearVelocity.x + -b1.m_angularVelocity * r1Y;
	var v1Y = b1.m_linearVelocity.y + b1.m_angularVelocity * r1X;
	var v2X = b2.m_linearVelocity.x + -b2.m_angularVelocity * r2Y;
	var v2Y = b2.m_linearVelocity.y + b2.m_angularVelocity * r2X;
	var Cdot = this.m_u.x * (v2X - v1X) + this.m_u.y * (v2Y - v1Y);
	var impulse = -this.m_mass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse);
	this.m_impulse += impulse;
	var PX = impulse * this.m_u.x;
	var PY = impulse * this.m_u.y;
	b1.m_linearVelocity.x -= b1.m_invMass * PX;
	b1.m_linearVelocity.y -= b1.m_invMass * PY;
	b1.m_angularVelocity -= b1.m_invI * (r1X * PY - r1Y * PX);
	b2.m_linearVelocity.x += b2.m_invMass * PX;
	b2.m_linearVelocity.y += b2.m_invMass * PY;
	b2.m_angularVelocity += b2.m_invI * (r2X * PY - r2Y * PX);
}
box2D.dynamics.joints.B2DistanceJoint.prototype.SolvePositionConstraints = function() {
	var tMat;
	if(this.m_frequencyHz > 0.0) return true;
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	tMat = b1.m_xf.R;
	var r1X = this.m_localAnchor1.x - b1.m_sweep.localCenter.x;
	var r1Y = this.m_localAnchor1.y - b1.m_sweep.localCenter.y;
	var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
	r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
	r1X = tX;
	tMat = b2.m_xf.R;
	var r2X = this.m_localAnchor2.x - b2.m_sweep.localCenter.x;
	var r2Y = this.m_localAnchor2.y - b2.m_sweep.localCenter.y;
	tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
	r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
	r2X = tX;
	var dX = b2.m_sweep.c.x + r2X - b1.m_sweep.c.x - r1X;
	var dY = b2.m_sweep.c.y + r2Y - b1.m_sweep.c.y - r1Y;
	var length = Math.sqrt(dX * dX + dY * dY);
	dX /= length;
	dY /= length;
	var C = length - this.m_length;
	C = box2D.common.math.B2Math.b2Max(-0.2,C < 0.2?C:0.2);
	var impulse = -this.m_mass * C;
	this.m_u.Set(dX,dY);
	var PX = impulse * this.m_u.x;
	var PY = impulse * this.m_u.y;
	b1.m_sweep.c.x -= b1.m_invMass * PX;
	b1.m_sweep.c.y -= b1.m_invMass * PY;
	b1.m_sweep.a -= b1.m_invI * (r1X * PY - r1Y * PX);
	b2.m_sweep.c.x += b2.m_invMass * PX;
	b2.m_sweep.c.y += b2.m_invMass * PY;
	b2.m_sweep.a += b2.m_invI * (r2X * PY - r2Y * PX);
	b1.SynchronizeTransform();
	b2.SynchronizeTransform();
	return (C > 0.0?C:-C) < box2D.common.B2Settings.b2_linearSlop;
}
box2D.dynamics.joints.B2DistanceJoint.prototype.GetAnchor1 = function() {
	return this.m_body1.GetWorldPoint(this.m_localAnchor1);
}
box2D.dynamics.joints.B2DistanceJoint.prototype.GetAnchor2 = function() {
	return this.m_body2.GetWorldPoint(this.m_localAnchor2);
}
box2D.dynamics.joints.B2DistanceJoint.prototype.GetReactionForce = function() {
	var F = new box2D.common.math.B2Vec2();
	F.SetV(this.m_u);
	F.Multiply(this.m_inv_dt * this.m_impulse);
	return F;
}
box2D.dynamics.joints.B2DistanceJoint.prototype.GetReactionTorque = function() {
	return 0.0;
}
box2D.dynamics.joints.B2DistanceJoint.prototype.m_localAnchor1 = null;
box2D.dynamics.joints.B2DistanceJoint.prototype.m_localAnchor2 = null;
box2D.dynamics.joints.B2DistanceJoint.prototype.m_u = null;
box2D.dynamics.joints.B2DistanceJoint.prototype.m_frequencyHz = null;
box2D.dynamics.joints.B2DistanceJoint.prototype.m_dampingRatio = null;
box2D.dynamics.joints.B2DistanceJoint.prototype.m_gamma = null;
box2D.dynamics.joints.B2DistanceJoint.prototype.m_bias = null;
box2D.dynamics.joints.B2DistanceJoint.prototype.m_impulse = null;
box2D.dynamics.joints.B2DistanceJoint.prototype.m_mass = null;
box2D.dynamics.joints.B2DistanceJoint.prototype.m_length = null;
box2D.dynamics.joints.B2DistanceJoint.prototype.__class__ = box2D.dynamics.joints.B2DistanceJoint;
fboyle.layout.LayoutTypeDefs = function(p) {
}
fboyle.layout.LayoutTypeDefs.__name__ = ["fboyle","layout","LayoutTypeDefs"];
fboyle.layout.LayoutTypeDefs.prototype.__class__ = fboyle.layout.LayoutTypeDefs;
fboyle.layout.EmptyVo = function(name,id,extraInfo,x,y,rotation) {
	if( name === $_ ) return;
	if(extraInfo == null) extraInfo = "";
	if(id == null) id = "";
	if(name == null) name = "";
	this.name = name;
	this.id = id;
	this.extraInfo = extraInfo;
	this.x = x;
	this.y = y;
	this.rotation = rotation;
}
fboyle.layout.EmptyVo.__name__ = ["fboyle","layout","EmptyVo"];
fboyle.layout.EmptyVo.prototype.name = null;
fboyle.layout.EmptyVo.prototype.id = null;
fboyle.layout.EmptyVo.prototype.extraInfo = null;
fboyle.layout.EmptyVo.prototype.x = null;
fboyle.layout.EmptyVo.prototype.y = null;
fboyle.layout.EmptyVo.prototype.rotation = null;
fboyle.layout.EmptyVo.prototype.__class__ = fboyle.layout.EmptyVo;
fboyle.layout.AnimationVo = function() { }
fboyle.layout.AnimationVo.__name__ = ["fboyle","layout","AnimationVo"];
fboyle.layout.AnimationVo.prototype.__class__ = fboyle.layout.AnimationVo;
box2D.dynamics.joints.B2GearJoint = function(def) {
	if( def === $_ ) return;
	box2D.dynamics.joints.B2Joint.call(this,def);
	this.m_groundAnchor1 = new box2D.common.math.B2Vec2();
	this.m_groundAnchor2 = new box2D.common.math.B2Vec2();
	this.m_localAnchor1 = new box2D.common.math.B2Vec2();
	this.m_localAnchor2 = new box2D.common.math.B2Vec2();
	this.m_J = new box2D.dynamics.joints.B2Jacobian();
	var type1 = def.joint1.m_type;
	var type2 = def.joint2.m_type;
	this.m_revolute1 = null;
	this.m_prismatic1 = null;
	this.m_revolute2 = null;
	this.m_prismatic2 = null;
	var coordinate1;
	var coordinate2;
	this.m_ground1 = def.joint1.m_body1;
	this.m_body1 = def.joint1.m_body2;
	if(type1 == 1) {
		this.m_revolute1 = (function($this) {
			var $r;
			var $t = def.joint1;
			if(Std["is"]($t,box2D.dynamics.joints.B2RevoluteJoint)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this));
		this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1);
		this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2);
		coordinate1 = this.m_revolute1.GetJointAngle();
	} else {
		this.m_prismatic1 = (function($this) {
			var $r;
			var $t = def.joint1;
			if(Std["is"]($t,box2D.dynamics.joints.B2PrismaticJoint)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this));
		this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1);
		this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2);
		coordinate1 = this.m_prismatic1.GetJointTranslation();
	}
	this.m_ground2 = def.joint2.m_body1;
	this.m_body2 = def.joint2.m_body2;
	if(type2 == 1) {
		this.m_revolute2 = (function($this) {
			var $r;
			var $t = def.joint2;
			if(Std["is"]($t,box2D.dynamics.joints.B2RevoluteJoint)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this));
		this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1);
		this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2);
		coordinate2 = this.m_revolute2.GetJointAngle();
	} else {
		this.m_prismatic2 = (function($this) {
			var $r;
			var $t = def.joint2;
			if(Std["is"]($t,box2D.dynamics.joints.B2PrismaticJoint)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this));
		this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1);
		this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2);
		coordinate2 = this.m_prismatic2.GetJointTranslation();
	}
	this.m_ratio = def.ratio;
	this.m_constant = coordinate1 + this.m_ratio * coordinate2;
	this.m_force = 0.0;
}
box2D.dynamics.joints.B2GearJoint.__name__ = ["box2D","dynamics","joints","B2GearJoint"];
box2D.dynamics.joints.B2GearJoint.__super__ = box2D.dynamics.joints.B2Joint;
for(var k in box2D.dynamics.joints.B2Joint.prototype ) box2D.dynamics.joints.B2GearJoint.prototype[k] = box2D.dynamics.joints.B2Joint.prototype[k];
box2D.dynamics.joints.B2GearJoint.prototype.GetAnchor1 = function() {
	return this.m_body1.GetWorldPoint(this.m_localAnchor1);
}
box2D.dynamics.joints.B2GearJoint.prototype.GetAnchor2 = function() {
	return this.m_body2.GetWorldPoint(this.m_localAnchor2);
}
box2D.dynamics.joints.B2GearJoint.prototype.GetReactionForce = function() {
	var F = new box2D.common.math.B2Vec2(this.m_force * this.m_J.linear2.x,this.m_force * this.m_J.linear2.y);
	return F;
}
box2D.dynamics.joints.B2GearJoint.prototype.GetReactionTorque = function() {
	var tMat = this.m_body2.m_xf.R;
	var rX = this.m_localAnchor1.x - this.m_body2.m_sweep.localCenter.x;
	var rY = this.m_localAnchor1.y - this.m_body2.m_sweep.localCenter.y;
	var tX = tMat.col1.x * rX + tMat.col2.x * rY;
	rY = tMat.col1.y * rX + tMat.col2.y * rY;
	rX = tX;
	tX = this.m_force * this.m_J.angular2 - (rX * (this.m_force * this.m_J.linear2.y) - rY * (this.m_force * this.m_J.linear2.x));
	return tX;
}
box2D.dynamics.joints.B2GearJoint.prototype.GetRatio = function() {
	return this.m_ratio;
}
box2D.dynamics.joints.B2GearJoint.prototype.InitVelocityConstraints = function(step) {
	var g1 = this.m_ground1;
	var g2 = this.m_ground2;
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	var ugX;
	var ugY;
	var rX;
	var rY;
	var tMat;
	var tVec;
	var crug;
	var tX;
	var K = 0.0;
	this.m_J.SetZero();
	if(this.m_revolute1 != null) {
		this.m_J.angular1 = -1.0;
		K += b1.m_invI;
	} else {
		tMat = g1.m_xf.R;
		tVec = this.m_prismatic1.m_localXAxis1;
		ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
		ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
		tMat = b1.m_xf.R;
		rX = this.m_localAnchor1.x - b1.m_sweep.localCenter.x;
		rY = this.m_localAnchor1.y - b1.m_sweep.localCenter.y;
		tX = tMat.col1.x * rX + tMat.col2.x * rY;
		rY = tMat.col1.y * rX + tMat.col2.y * rY;
		rX = tX;
		crug = rX * ugY - rY * ugX;
		this.m_J.linear1.Set(-ugX,-ugY);
		this.m_J.angular1 = -crug;
		K += b1.m_invMass + b1.m_invI * crug * crug;
	}
	if(this.m_revolute2 != null) {
		this.m_J.angular2 = -this.m_ratio;
		K += this.m_ratio * this.m_ratio * b2.m_invI;
	} else {
		tMat = g2.m_xf.R;
		tVec = this.m_prismatic2.m_localXAxis1;
		ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
		ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
		tMat = b2.m_xf.R;
		rX = this.m_localAnchor2.x - b2.m_sweep.localCenter.x;
		rY = this.m_localAnchor2.y - b2.m_sweep.localCenter.y;
		tX = tMat.col1.x * rX + tMat.col2.x * rY;
		rY = tMat.col1.y * rX + tMat.col2.y * rY;
		rX = tX;
		crug = rX * ugY - rY * ugX;
		this.m_J.linear2.Set(-this.m_ratio * ugX,-this.m_ratio * ugY);
		this.m_J.angular2 = -this.m_ratio * crug;
		K += this.m_ratio * this.m_ratio * (b2.m_invMass + b2.m_invI * crug * crug);
	}
	this.m_mass = 1.0 / K;
	if(step.warmStarting) {
		var P = step.dt * this.m_force;
		b1.m_linearVelocity.x += b1.m_invMass * P * this.m_J.linear1.x;
		b1.m_linearVelocity.y += b1.m_invMass * P * this.m_J.linear1.y;
		b1.m_angularVelocity += b1.m_invI * P * this.m_J.angular1;
		b2.m_linearVelocity.x += b2.m_invMass * P * this.m_J.linear2.x;
		b2.m_linearVelocity.y += b2.m_invMass * P * this.m_J.linear2.y;
		b2.m_angularVelocity += b2.m_invI * P * this.m_J.angular2;
	} else this.m_force = 0.0;
}
box2D.dynamics.joints.B2GearJoint.prototype.SolveVelocityConstraints = function(step) {
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	var Cdot = this.m_J.Compute(b1.m_linearVelocity,b1.m_angularVelocity,b2.m_linearVelocity,b2.m_angularVelocity);
	var force = -step.inv_dt * this.m_mass * Cdot;
	this.m_force += force;
	var P = step.dt * force;
	b1.m_linearVelocity.x += b1.m_invMass * P * this.m_J.linear1.x;
	b1.m_linearVelocity.y += b1.m_invMass * P * this.m_J.linear1.y;
	b1.m_angularVelocity += b1.m_invI * P * this.m_J.angular1;
	b2.m_linearVelocity.x += b2.m_invMass * P * this.m_J.linear2.x;
	b2.m_linearVelocity.y += b2.m_invMass * P * this.m_J.linear2.y;
	b2.m_angularVelocity += b2.m_invI * P * this.m_J.angular2;
}
box2D.dynamics.joints.B2GearJoint.prototype.SolvePositionConstraints = function() {
	var linearError = 0.0;
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	var coordinate1;
	var coordinate2;
	if(this.m_revolute1 != null) coordinate1 = this.m_revolute1.GetJointAngle(); else coordinate1 = this.m_prismatic1.GetJointTranslation();
	if(this.m_revolute2 != null) coordinate2 = this.m_revolute2.GetJointAngle(); else coordinate2 = this.m_prismatic2.GetJointTranslation();
	var C = this.m_constant - (coordinate1 + this.m_ratio * coordinate2);
	var impulse = -this.m_mass * C;
	b1.m_sweep.c.x += b1.m_invMass * impulse * this.m_J.linear1.x;
	b1.m_sweep.c.y += b1.m_invMass * impulse * this.m_J.linear1.y;
	b1.m_sweep.a += b1.m_invI * impulse * this.m_J.angular1;
	b2.m_sweep.c.x += b2.m_invMass * impulse * this.m_J.linear2.x;
	b2.m_sweep.c.y += b2.m_invMass * impulse * this.m_J.linear2.y;
	b2.m_sweep.a += b2.m_invI * impulse * this.m_J.angular2;
	b1.SynchronizeTransform();
	b2.SynchronizeTransform();
	return linearError < box2D.common.B2Settings.b2_linearSlop;
}
box2D.dynamics.joints.B2GearJoint.prototype.m_ground1 = null;
box2D.dynamics.joints.B2GearJoint.prototype.m_ground2 = null;
box2D.dynamics.joints.B2GearJoint.prototype.m_revolute1 = null;
box2D.dynamics.joints.B2GearJoint.prototype.m_prismatic1 = null;
box2D.dynamics.joints.B2GearJoint.prototype.m_revolute2 = null;
box2D.dynamics.joints.B2GearJoint.prototype.m_prismatic2 = null;
box2D.dynamics.joints.B2GearJoint.prototype.m_groundAnchor1 = null;
box2D.dynamics.joints.B2GearJoint.prototype.m_groundAnchor2 = null;
box2D.dynamics.joints.B2GearJoint.prototype.m_localAnchor1 = null;
box2D.dynamics.joints.B2GearJoint.prototype.m_localAnchor2 = null;
box2D.dynamics.joints.B2GearJoint.prototype.m_J = null;
box2D.dynamics.joints.B2GearJoint.prototype.m_constant = null;
box2D.dynamics.joints.B2GearJoint.prototype.m_ratio = null;
box2D.dynamics.joints.B2GearJoint.prototype.m_mass = null;
box2D.dynamics.joints.B2GearJoint.prototype.m_force = null;
box2D.dynamics.joints.B2GearJoint.prototype.__class__ = box2D.dynamics.joints.B2GearJoint;
box2D.dynamics.joints.B2PrismaticJointDef = function(p) {
	if( p === $_ ) return;
	box2D.dynamics.joints.B2JointDef.call(this);
	this.localAnchor1 = new box2D.common.math.B2Vec2();
	this.localAnchor2 = new box2D.common.math.B2Vec2();
	this.localAxis1 = new box2D.common.math.B2Vec2();
	this.type = 2;
	this.localAxis1.Set(1.0,0.0);
	this.referenceAngle = 0.0;
	this.enableLimit = false;
	this.lowerTranslation = 0.0;
	this.upperTranslation = 0.0;
	this.enableMotor = false;
	this.maxMotorForce = 0.0;
	this.motorSpeed = 0.0;
}
box2D.dynamics.joints.B2PrismaticJointDef.__name__ = ["box2D","dynamics","joints","B2PrismaticJointDef"];
box2D.dynamics.joints.B2PrismaticJointDef.__super__ = box2D.dynamics.joints.B2JointDef;
for(var k in box2D.dynamics.joints.B2JointDef.prototype ) box2D.dynamics.joints.B2PrismaticJointDef.prototype[k] = box2D.dynamics.joints.B2JointDef.prototype[k];
box2D.dynamics.joints.B2PrismaticJointDef.prototype.Initialize = function(b1,b2,anchor,axis) {
	this.body1 = b1;
	this.body2 = b2;
	this.localAnchor1 = box2D.common.math.B2Math.b2MulXT(this.body1.m_xf,anchor);
	this.localAnchor2 = box2D.common.math.B2Math.b2MulXT(this.body2.m_xf,anchor);
	this.localAxis1 = box2D.common.math.B2Math.b2MulTMV(this.body1.m_xf.R,axis);
	this.referenceAngle = this.body2.GetAngle() - this.body1.GetAngle();
}
box2D.dynamics.joints.B2PrismaticJointDef.prototype.localAnchor1 = null;
box2D.dynamics.joints.B2PrismaticJointDef.prototype.localAnchor2 = null;
box2D.dynamics.joints.B2PrismaticJointDef.prototype.localAxis1 = null;
box2D.dynamics.joints.B2PrismaticJointDef.prototype.referenceAngle = null;
box2D.dynamics.joints.B2PrismaticJointDef.prototype.enableLimit = null;
box2D.dynamics.joints.B2PrismaticJointDef.prototype.lowerTranslation = null;
box2D.dynamics.joints.B2PrismaticJointDef.prototype.upperTranslation = null;
box2D.dynamics.joints.B2PrismaticJointDef.prototype.enableMotor = null;
box2D.dynamics.joints.B2PrismaticJointDef.prototype.maxMotorForce = null;
box2D.dynamics.joints.B2PrismaticJointDef.prototype.motorSpeed = null;
box2D.dynamics.joints.B2PrismaticJointDef.prototype.__class__ = box2D.dynamics.joints.B2PrismaticJointDef;
box2D.collision.B2Pair = function(p) {
	if( p === $_ ) return;
	this.userData = null;
}
box2D.collision.B2Pair.__name__ = ["box2D","collision","B2Pair"];
box2D.collision.B2Pair.prototype.SetBuffered = function() {
	this.status |= 1;
}
box2D.collision.B2Pair.prototype.ClearBuffered = function() {
	this.status &= -2;
}
box2D.collision.B2Pair.prototype.IsBuffered = function() {
	return (this.status & 1) == 1;
}
box2D.collision.B2Pair.prototype.SetRemoved = function() {
	this.status |= 2;
}
box2D.collision.B2Pair.prototype.ClearRemoved = function() {
	this.status &= -3;
}
box2D.collision.B2Pair.prototype.IsRemoved = function() {
	return (this.status & 2) == 2;
}
box2D.collision.B2Pair.prototype.SetFinal = function() {
	this.status |= 4;
}
box2D.collision.B2Pair.prototype.IsFinal = function() {
	return (this.status & 4) == 4;
}
box2D.collision.B2Pair.prototype.userData = null;
box2D.collision.B2Pair.prototype.proxyId1 = null;
box2D.collision.B2Pair.prototype.proxyId2 = null;
box2D.collision.B2Pair.prototype.next = null;
box2D.collision.B2Pair.prototype.status = null;
box2D.collision.B2Pair.prototype.__class__ = box2D.collision.B2Pair;
touchmypixel.game.objects.BuilderGameObject = function(s) {
	if( s === $_ ) return;
	touchmypixel.game.objects.Box2dObject.call(this,s);
	this.bodies = [];
}
touchmypixel.game.objects.BuilderGameObject.__name__ = ["touchmypixel","game","objects","BuilderGameObject"];
touchmypixel.game.objects.BuilderGameObject.__super__ = touchmypixel.game.objects.Box2dObject;
for(var k in touchmypixel.game.objects.Box2dObject.prototype ) touchmypixel.game.objects.BuilderGameObject.prototype[k] = touchmypixel.game.objects.Box2dObject.prototype[k];
touchmypixel.game.objects.BuilderGameObject.prototype.info = null;
touchmypixel.game.objects.BuilderGameObject.prototype.fixedRotation = null;
touchmypixel.game.objects.BuilderGameObject.prototype.autoSyncToBody = null;
touchmypixel.game.objects.BuilderGameObject.prototype.autoSyncTransform = null;
touchmypixel.game.objects.BuilderGameObject.prototype.update = function(dt) {
	if(this.autoSyncToBody != null) {
		haxe.Log.trace("got an autoSyncToBody!",{ fileName : "BuilderGameObject.hx", lineNumber : 29, className : "touchmypixel.game.objects.BuilderGameObject", methodName : "update"});
		this.simulation.sync(this.container,this.autoSyncToBody.body,this.autoSyncTransform);
	}
}
touchmypixel.game.objects.BuilderGameObject.prototype.__class__ = touchmypixel.game.objects.BuilderGameObject;
touchmypixel.game.box2d.ShapeTools = function() { }
touchmypixel.game.box2d.ShapeTools.__name__ = ["touchmypixel","game","box2d","ShapeTools"];
touchmypixel.game.box2d.ShapeTools.polygon = function(worldScale,points,offsetX,offsetY,rotation,scaleX,scaleY) {
	if(scaleY == null) scaleY = 1;
	if(scaleX == null) scaleX = 1;
	if(rotation == null) rotation = 0;
	if(offsetY == null) offsetY = 0;
	if(offsetX == null) offsetX = 0;
	if(points.length > 8) haxe.Log.trace("Warning: B2PolygonDef can only handle <=8 vertices",{ fileName : "ShapeTools.hx", lineNumber : 19, className : "touchmypixel.game.box2d.ShapeTools", methodName : "polygon"});
	if(rotation != 0) {
		var newPoints = [];
		var r = rotation * Math.PI / 180;
		var _g = 0;
		while(_g < points.length) {
			var p = points[_g];
			++_g;
			var nx = p[0] * Math.cos(r) - p[1] * Math.sin(r);
			var ny = p[1] * Math.cos(r) + p[0] * Math.sin(r);
			newPoints.push([nx,ny]);
		}
		points = newPoints;
	}
	var s = new box2D.collision.shapes.B2PolygonDef();
	s.vertexCount = points.length;
	var i = points.length - 1;
	var _g1 = 0, _g = points.length;
	while(_g1 < _g) {
		var c = _g1++;
		s.vertices[c].Set((points[i][0] * scaleX + offsetX) / worldScale,(points[i][1] * scaleY + offsetY) / worldScale);
		i--;
	}
	return s;
}
touchmypixel.game.box2d.ShapeTools.box = function(worldScale,width,height,centerX,centerY,rotation,scaleX,scaleY) {
	if(scaleY == null) scaleY = 1.;
	if(scaleX == null) scaleX = 1.;
	if(rotation == null) rotation = 0.;
	if(centerY == null) centerY = 0.;
	if(centerX == null) centerX = 0.;
	return touchmypixel.game.box2d.ShapeTools.polygon(worldScale,[[-width / 2,-height / 2],[-width / 2,height / 2],[width / 2,height / 2],[width / 2,-height / 2]],centerX,centerY,rotation,scaleX,scaleY);
}
touchmypixel.game.box2d.ShapeTools.circle = function(worldScale,centerX,centerY,radius,scaleX,scaleY) {
	if(scaleY == null) scaleY = 1;
	if(scaleX == null) scaleX = 1;
	if(centerY == null) centerY = 0;
	if(centerX == null) centerX = 0;
	var s = new box2D.collision.shapes.B2CircleDef();
	s.radius = radius * scaleX / worldScale;
	s.localPosition = new box2D.common.math.B2Vec2(centerX / worldScale,centerY / worldScale);
	return s;
}
touchmypixel.game.box2d.ShapeTools.prototype.__class__ = touchmypixel.game.box2d.ShapeTools;
box2D.collision.Features = function(p) {
}
box2D.collision.Features.__name__ = ["box2D","collision","Features"];
box2D.collision.Features.prototype.flip = null;
box2D.collision.Features.prototype.incidentEdge = null;
box2D.collision.Features.prototype.incidentVertex = null;
box2D.collision.Features.prototype.referenceEdge = null;
box2D.collision.Features.prototype.setReferenceEdge = function(value) {
	this._referenceEdge = value;
	this._m_id._key = this._m_id._key & -256 | this._referenceEdge & 255;
	return value;
}
box2D.collision.Features.prototype.getReferenceEdge = function() {
	return this._referenceEdge;
}
box2D.collision.Features.prototype._referenceEdge = null;
box2D.collision.Features.prototype.setIncidentEdge = function(value) {
	this._incidentEdge = value;
	this._m_id._key = this._m_id._key & -65281 | this._incidentEdge << 8 & 65280;
	return value;
}
box2D.collision.Features.prototype.getIncidentEdge = function() {
	return this._incidentEdge;
}
box2D.collision.Features.prototype._incidentEdge = null;
box2D.collision.Features.prototype.setIncidentVertex = function(value) {
	this._incidentVertex = value;
	this._m_id._key = this._m_id._key & -16711681 | this._incidentVertex << 16 & 16711680;
	return value;
}
box2D.collision.Features.prototype.getIncidentVertex = function() {
	return this._incidentVertex;
}
box2D.collision.Features.prototype._incidentVertex = null;
box2D.collision.Features.prototype.setFlip = function(value) {
	this._flip = value;
	this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & -16777216;
	return value;
}
box2D.collision.Features.prototype.getFlip = function() {
	return this._flip;
}
box2D.collision.Features.prototype._flip = null;
box2D.collision.Features.prototype._m_id = null;
box2D.collision.Features.prototype.__class__ = box2D.collision.Features;
hxs.Signal1 = function(caller) {
	if( caller === $_ ) return;
	hxs.core.SignalBase.call(this,caller);
}
hxs.Signal1.__name__ = ["hxs","Signal1"];
hxs.Signal1.__super__ = hxs.core.SignalBase;
for(var k in hxs.core.SignalBase.prototype ) hxs.Signal1.prototype[k] = hxs.core.SignalBase.prototype[k];
hxs.Signal1.prototype.dispatch = function(a) {
	var $it0 = this.slots.iterator();
	while( $it0.hasNext() ) {
		var slot = $it0.next();
		if(this.isMuted) return;
		if(slot.isMuted) continue;
		switch( slot.type[1] ) {
		case 0:
			slot.listener(a);
			break;
		case 1:
			slot.listener(a,new hxs.core.Info(this,slot));
			break;
		case 2:
			slot.listener();
			break;
		}
		this.onFireSlot(slot);
	}
}
hxs.Signal1.prototype.getTrigger = function(a) {
	var _this = this;
	return new hxs.extras.Trigger(function() {
		_this.dispatch(a);
	});
}
hxs.Signal1.prototype.__class__ = hxs.Signal1;
box2D.common.math.B2Sweep = function(p) {
	if( p === $_ ) return;
	this.localCenter = new box2D.common.math.B2Vec2();
	this.c0 = new box2D.common.math.B2Vec2();
	this.c = new box2D.common.math.B2Vec2();
	this.a0 = 0.0;
	this.a = 0.0;
	this.t0 = 0.0;
}
box2D.common.math.B2Sweep.__name__ = ["box2D","common","math","B2Sweep"];
box2D.common.math.B2Sweep.prototype.GetXForm = function(xf,t) {
	if(1.0 - this.t0 > 5.0e-324) {
		var alpha = (t - this.t0) / (1.0 - this.t0);
		xf.position.x = (1.0 - alpha) * this.c0.x + alpha * this.c.x;
		xf.position.y = (1.0 - alpha) * this.c0.y + alpha * this.c.y;
		var angle = (1.0 - alpha) * this.a0 + alpha * this.a;
		xf.R.Set(angle);
	} else {
		xf.position.SetV(this.c);
		xf.R.Set(this.a);
	}
	var tMat = xf.R;
	xf.position.x -= tMat.col1.x * this.localCenter.x + tMat.col2.x * this.localCenter.y;
	xf.position.y -= tMat.col1.y * this.localCenter.x + tMat.col2.y * this.localCenter.y;
}
box2D.common.math.B2Sweep.prototype.Advance = function(t) {
	if(this.t0 < t && 1.0 - this.t0 > 5.0e-324) {
		var alpha = (t - this.t0) / (1.0 - this.t0);
		this.c0.x = (1.0 - alpha) * this.c0.x + alpha * this.c.x;
		this.c0.y = (1.0 - alpha) * this.c0.y + alpha * this.c.y;
		this.a0 = (1.0 - alpha) * this.a0 + alpha * this.a;
		this.t0 = t;
	}
}
box2D.common.math.B2Sweep.prototype.localCenter = null;
box2D.common.math.B2Sweep.prototype.c0 = null;
box2D.common.math.B2Sweep.prototype.c = null;
box2D.common.math.B2Sweep.prototype.a0 = null;
box2D.common.math.B2Sweep.prototype.a = null;
box2D.common.math.B2Sweep.prototype.t0 = null;
box2D.common.math.B2Sweep.prototype.__class__ = box2D.common.math.B2Sweep;
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
fboyle.layout.ILayoutContainer = function() { }
fboyle.layout.ILayoutContainer.__name__ = ["fboyle","layout","ILayoutContainer"];
fboyle.layout.ILayoutContainer.prototype.namedObjects = null;
fboyle.layout.ILayoutContainer.prototype.emptyObjects = null;
fboyle.layout.ILayoutContainer.prototype.bitmaps = null;
fboyle.layout.ILayoutContainer.prototype.container = null;
fboyle.layout.ILayoutContainer.prototype.__class__ = fboyle.layout.ILayoutContainer;
box2D.collision.shapes.B2FilterData = function(p) {
	if( p === $_ ) return;
	this.categoryBits = 1;
	this.maskBits = 65535;
	this.groupIndex = 0;
}
box2D.collision.shapes.B2FilterData.__name__ = ["box2D","collision","shapes","B2FilterData"];
box2D.collision.shapes.B2FilterData.prototype.Copy = function() {
	var copy = new box2D.collision.shapes.B2FilterData();
	copy.categoryBits = this.categoryBits;
	copy.maskBits = this.maskBits;
	copy.groupIndex = this.groupIndex;
	return copy;
}
box2D.collision.shapes.B2FilterData.prototype.categoryBits = null;
box2D.collision.shapes.B2FilterData.prototype.maskBits = null;
box2D.collision.shapes.B2FilterData.prototype.groupIndex = null;
box2D.collision.shapes.B2FilterData.prototype.__class__ = box2D.collision.shapes.B2FilterData;
hxs.core.PriorityQueue = function(p) {
	if( p === $_ ) return;
	this.items = [];
}
hxs.core.PriorityQueue.__name__ = ["hxs","core","PriorityQueue"];
hxs.core.PriorityQueue.prototype.currentIterator = null;
hxs.core.PriorityQueue.prototype.items = null;
hxs.core.PriorityQueue.prototype.length = null;
hxs.core.PriorityQueue.prototype.iterator = function() {
	return this.currentIterator = new hxs.core.PriorityQueueIterator(this);
}
hxs.core.PriorityQueue.prototype.peek = function() {
	return this.items[0].item;
}
hxs.core.PriorityQueue.prototype.front = function() {
	return this.items.shift().item;
}
hxs.core.PriorityQueue.prototype.back = function() {
	return this.items.pop().item;
}
hxs.core.PriorityQueue.prototype.add = function(item,priority) {
	if(priority == null) priority = 0;
	var data = { item : item, priority : priority};
	if(data.priority < 0) data.priority = 0;
	var c = this.items.length;
	while(c-- > 0) if(this.items[c].priority >= priority) break;
	this.items.insert(c + 1,data);
	return data;
}
hxs.core.PriorityQueue.prototype.remove = function(item) {
	var _g = 0, _g1 = this.items;
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		if(i.item == item) this.items.remove(i);
	}
}
hxs.core.PriorityQueue.prototype.getPriority = function(item) {
	var _g = 0, _g1 = this.items;
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		if(i.item == item) return i.priority;
	}
	return -1;
}
hxs.core.PriorityQueue.prototype.setPriority = function(item,priority) {
	var _g = 0, _g1 = this.items;
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		if(i.item == item) i.priority = priority;
	}
	this.resort();
}
hxs.core.PriorityQueue.prototype.getLength = function() {
	return this.items.length;
}
hxs.core.PriorityQueue.prototype.resort = function() {
	var a = this.items.copy();
	this.items = [];
	var _g = 0;
	while(_g < a.length) {
		var i = a[_g];
		++_g;
		this.add(i.item,i.priority);
	}
}
hxs.core.PriorityQueue.prototype.__class__ = hxs.core.PriorityQueue;
hxs.core.PriorityQueueIterator = function(q) {
	if( q === $_ ) return;
	this.q = q;
	this.reset();
}
hxs.core.PriorityQueueIterator.__name__ = ["hxs","core","PriorityQueueIterator"];
hxs.core.PriorityQueueIterator.prototype.q = null;
hxs.core.PriorityQueueIterator.prototype.i = null;
hxs.core.PriorityQueueIterator.prototype.reset = function() {
	this.i = 0;
}
hxs.core.PriorityQueueIterator.prototype.hasNext = function() {
	return this.i < this.q.getLength();
}
hxs.core.PriorityQueueIterator.prototype.next = function() {
	return this.q.items[this.i++].item;
}
hxs.core.PriorityQueueIterator.prototype.__class__ = hxs.core.PriorityQueueIterator;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
fboyle.utils.ListenerUtil = function() { }
fboyle.utils.ListenerUtil.__name__ = ["fboyle","utils","ListenerUtil"];
fboyle.utils.ListenerUtil.addListener = function(displayObject,eventType,listener,useCapture,priority,useWeakReference) {
	if(useWeakReference == null) useWeakReference = false;
	if(priority == null) priority = 0;
	if(useCapture == null) useCapture = false;
	if(displayObject != null) displayObject[eventType] = listener;
}
fboyle.utils.ListenerUtil.removeListener = function(displayObject,eventType,listener) {
	if(displayObject != null) displayObject[eventType] = null;
}
fboyle.utils.ListenerUtil.prototype.__class__ = fboyle.utils.ListenerUtil;
box2D.collision.B2TimeOfImpact = function(p) {
}
box2D.collision.B2TimeOfImpact.__name__ = ["box2D","collision","B2TimeOfImpact"];
box2D.collision.B2TimeOfImpact.TimeOfImpact = function(shape1,sweep1,shape2,sweep2) {
	var math1;
	var math2;
	var r1 = shape1.m_sweepRadius;
	var r2 = shape2.m_sweepRadius;
	var t0 = sweep1.t0;
	var v1X = sweep1.c.x - sweep1.c0.x;
	var v1Y = sweep1.c.y - sweep1.c0.y;
	var v2X = sweep2.c.x - sweep2.c0.x;
	var v2Y = sweep2.c.y - sweep2.c0.y;
	var omega1 = sweep1.a - sweep1.a0;
	var omega2 = sweep2.a - sweep2.a0;
	var alpha = 0.0;
	var p1 = box2D.collision.B2TimeOfImpact.s_p1;
	var p2 = box2D.collision.B2TimeOfImpact.s_p2;
	var k_maxIterations = 20;
	var iter = 0;
	var normalX = 0.0;
	var normalY = 0.0;
	var distance = 0.0;
	var targetDistance = 0.0;
	while(true) {
		var t = (1.0 - alpha) * t0 + alpha;
		var xf1 = box2D.collision.B2TimeOfImpact.s_xf1;
		var xf2 = box2D.collision.B2TimeOfImpact.s_xf2;
		sweep1.GetXForm(xf1,t);
		sweep2.GetXForm(xf2,t);
		distance = box2D.collision.B2Distance.Distance(p1,p2,shape1,xf1,shape2,xf2);
		if(iter == 0) {
			if(distance > 2.0 * box2D.common.B2Settings.b2_toiSlop) targetDistance = 1.5 * box2D.common.B2Settings.b2_toiSlop; else {
				math1 = 0.05 * box2D.common.B2Settings.b2_toiSlop;
				math2 = distance - 0.5 * box2D.common.B2Settings.b2_toiSlop;
				targetDistance = math1 > math2?math1:math2;
			}
		}
		if(distance - targetDistance < 0.05 * box2D.common.B2Settings.b2_toiSlop || iter == k_maxIterations) break;
		normalX = p2.x - p1.x;
		normalY = p2.y - p1.y;
		var nLen = Math.sqrt(normalX * normalX + normalY * normalY);
		normalX /= nLen;
		normalY /= nLen;
		var approachVelocityBound = normalX * (v1X - v2X) + normalY * (v1Y - v2Y) + (omega1 < 0?-omega1:omega1) * r1 + (omega2 < 0?-omega2:omega2) * r2;
		if(approachVelocityBound == 0) {
			alpha = 1.0;
			break;
		}
		var dAlpha = (distance - targetDistance) / approachVelocityBound;
		var newAlpha = alpha + dAlpha;
		if(newAlpha < 0.0 || 1.0 < newAlpha) {
			alpha = 1.0;
			break;
		}
		if(newAlpha < alpha) break;
		alpha = newAlpha;
		++iter;
	}
	return alpha;
}
box2D.collision.B2TimeOfImpact.prototype.__class__ = box2D.collision.B2TimeOfImpact;
box2D.dynamics.B2BodyDef = function(p) {
	if( p === $_ ) return;
	this.massData = new box2D.collision.shapes.B2MassData();
	this.position = new box2D.common.math.B2Vec2();
	this.massData.center.SetZero();
	this.massData.mass = 0.0;
	this.massData.I = 0.0;
	this.userData = null;
	this.position.Set(0.0,0.0);
	this.angle = 0.0;
	this.linearDamping = 0.0;
	this.angularDamping = 0.0;
	this.allowSleep = true;
	this.isSleeping = false;
	this.fixedRotation = false;
	this.isBullet = false;
}
box2D.dynamics.B2BodyDef.__name__ = ["box2D","dynamics","B2BodyDef"];
box2D.dynamics.B2BodyDef.prototype.massData = null;
box2D.dynamics.B2BodyDef.prototype.userData = null;
box2D.dynamics.B2BodyDef.prototype.position = null;
box2D.dynamics.B2BodyDef.prototype.angle = null;
box2D.dynamics.B2BodyDef.prototype.linearDamping = null;
box2D.dynamics.B2BodyDef.prototype.angularDamping = null;
box2D.dynamics.B2BodyDef.prototype.allowSleep = null;
box2D.dynamics.B2BodyDef.prototype.isSleeping = null;
box2D.dynamics.B2BodyDef.prototype.fixedRotation = null;
box2D.dynamics.B2BodyDef.prototype.isBullet = null;
box2D.dynamics.B2BodyDef.prototype.__class__ = box2D.dynamics.B2BodyDef;
hxs.core.Slot = function(listener,type,remainingCalls) {
	if( listener === $_ ) return;
	this.listener = listener;
	this.type = type;
	this.remainingCalls = remainingCalls;
	this.isMuted = false;
}
hxs.core.Slot.__name__ = ["hxs","core","Slot"];
hxs.core.Slot.prototype.listener = null;
hxs.core.Slot.prototype.type = null;
hxs.core.Slot.prototype.remainingCalls = null;
hxs.core.Slot.prototype.isMuted = null;
hxs.core.Slot.prototype.mute = function() {
	this.isMuted = true;
}
hxs.core.Slot.prototype.unmute = function() {
	this.isMuted = false;
}
hxs.core.Slot.prototype.__class__ = hxs.core.Slot;
box2D.dynamics.contacts.B2ContactConstraint = function(p) {
	if( p === $_ ) return;
	this.normal = new box2D.common.math.B2Vec2();
	this.points = new Array();
	var _g = 0;
	while(_g < 2) {
		var i = _g++;
		this.points[i] = new box2D.dynamics.contacts.B2ContactConstraintPoint();
	}
}
box2D.dynamics.contacts.B2ContactConstraint.__name__ = ["box2D","dynamics","contacts","B2ContactConstraint"];
box2D.dynamics.contacts.B2ContactConstraint.prototype.points = null;
box2D.dynamics.contacts.B2ContactConstraint.prototype.normal = null;
box2D.dynamics.contacts.B2ContactConstraint.prototype.manifold = null;
box2D.dynamics.contacts.B2ContactConstraint.prototype.body1 = null;
box2D.dynamics.contacts.B2ContactConstraint.prototype.body2 = null;
box2D.dynamics.contacts.B2ContactConstraint.prototype.friction = null;
box2D.dynamics.contacts.B2ContactConstraint.prototype.restitution = null;
box2D.dynamics.contacts.B2ContactConstraint.prototype.pointCount = null;
box2D.dynamics.contacts.B2ContactConstraint.prototype.__class__ = box2D.dynamics.contacts.B2ContactConstraint;
if(!hxs.extras) hxs.extras = {}
hxs.extras.Trigger = function(closure) {
	if( closure === $_ ) return;
	this.closure = closure;
}
hxs.extras.Trigger.__name__ = ["hxs","extras","Trigger"];
hxs.extras.Trigger.prototype.closure = null;
hxs.extras.Trigger.prototype.dispatch = function() {
	this.closure();
}
hxs.extras.Trigger.prototype.__class__ = hxs.extras.Trigger;
box2D.dynamics.contacts.B2ContactSolver = function(step,contacts,contactCount,allocator) {
	if( step === $_ ) return;
	this.m_step = new box2D.dynamics.B2TimeStep();
	this.m_constraints = new Array();
	var contact;
	this.m_step.dt = step.dt;
	this.m_step.inv_dt = step.inv_dt;
	this.m_step.maxIterations = step.maxIterations;
	this.m_allocator = allocator;
	var i = 0;
	var tVec;
	var tMat;
	this.m_constraintCount = 0;
	var _g = 0;
	while(_g < contactCount) {
		var i1 = _g++;
		contact = contacts[i1];
		this.m_constraintCount += contact.m_manifoldCount;
	}
	var _g1 = 0, _g = this.m_constraintCount;
	while(_g1 < _g) {
		var i1 = _g1++;
		this.m_constraints[i1] = new box2D.dynamics.contacts.B2ContactConstraint();
	}
	var count = 0;
	var _g = 0;
	while(_g < contactCount) {
		var i1 = _g++;
		contact = contacts[i1];
		var b1 = contact.m_shape1.m_body;
		var b2 = contact.m_shape2.m_body;
		var manifoldCount = contact.m_manifoldCount;
		var manifolds = contact.GetManifolds();
		var friction = contact.m_friction;
		var restitution = contact.m_restitution;
		var v1X = b1.m_linearVelocity.x;
		var v1Y = b1.m_linearVelocity.y;
		var v2X = b2.m_linearVelocity.x;
		var v2Y = b2.m_linearVelocity.y;
		var w1 = b1.m_angularVelocity;
		var w2 = b2.m_angularVelocity;
		var _g1 = 0;
		while(_g1 < manifoldCount) {
			var j = _g1++;
			var manifold = manifolds[j];
			var normalX = manifold.normal.x;
			var normalY = manifold.normal.y;
			var c = this.m_constraints[count];
			c.body1 = b1;
			c.body2 = b2;
			c.manifold = manifold;
			c.normal.x = normalX;
			c.normal.y = normalY;
			c.pointCount = manifold.pointCount;
			c.friction = friction;
			c.restitution = restitution;
			var _g3 = 0, _g2 = c.pointCount;
			while(_g3 < _g2) {
				var k = _g3++;
				var cp = manifold.points[k];
				var ccp = c.points[k];
				ccp.normalImpulse = cp.normalImpulse;
				ccp.tangentImpulse = cp.tangentImpulse;
				ccp.separation = cp.separation;
				ccp.positionImpulse = 0.0;
				ccp.localAnchor1.SetV(cp.localPoint1);
				ccp.localAnchor2.SetV(cp.localPoint2);
				var tX;
				var tY;
				tMat = b1.m_xf.R;
				var r1X = cp.localPoint1.x - b1.m_sweep.localCenter.x;
				var r1Y = cp.localPoint1.y - b1.m_sweep.localCenter.y;
				tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
				r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
				r1X = tX;
				ccp.r1.Set(r1X,r1Y);
				tMat = b2.m_xf.R;
				var r2X = cp.localPoint2.x - b2.m_sweep.localCenter.x;
				var r2Y = cp.localPoint2.y - b2.m_sweep.localCenter.y;
				tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
				r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
				r2X = tX;
				ccp.r2.Set(r2X,r2Y);
				var r1Sqr = r1X * r1X + r1Y * r1Y;
				var r2Sqr = r2X * r2X + r2Y * r2Y;
				var rn1 = r1X * normalX + r1Y * normalY;
				var rn2 = r2X * normalX + r2Y * normalY;
				var kNormal = b1.m_invMass + b2.m_invMass;
				kNormal += b1.m_invI * (r1Sqr - rn1 * rn1) + b2.m_invI * (r2Sqr - rn2 * rn2);
				ccp.normalMass = 1.0 / kNormal;
				var kEqualized = b1.m_mass * b1.m_invMass + b2.m_mass * b2.m_invMass;
				kEqualized += b1.m_mass * b1.m_invI * (r1Sqr - rn1 * rn1) + b2.m_mass * b2.m_invI * (r2Sqr - rn2 * rn2);
				ccp.equalizedMass = 1.0 / kEqualized;
				var tangentX = normalY;
				var tangentY = -normalX;
				var rt1 = r1X * tangentX + r1Y * tangentY;
				var rt2 = r2X * tangentX + r2Y * tangentY;
				var kTangent = b1.m_invMass + b2.m_invMass;
				kTangent += b1.m_invI * (r1Sqr - rt1 * rt1) + b2.m_invI * (r2Sqr - rt2 * rt2);
				ccp.tangentMass = 1.0 / kTangent;
				ccp.velocityBias = 0.0;
				if(ccp.separation > 0.0) ccp.velocityBias = -60. * ccp.separation;
				tX = v2X + -w2 * r2Y - v1X - -w1 * r1Y;
				tY = v2Y + w2 * r2X - v1Y - w1 * r1X;
				var vRel = c.normal.x * tX + c.normal.y * tY;
				if(vRel < -1.) ccp.velocityBias += -c.restitution * vRel;
			}
			++count;
		}
	}
}
box2D.dynamics.contacts.B2ContactSolver.__name__ = ["box2D","dynamics","contacts","B2ContactSolver"];
box2D.dynamics.contacts.B2ContactSolver.prototype.InitVelocityConstraints = function(step) {
	var tVec;
	var tVec2;
	var tMat;
	var _g1 = 0, _g = this.m_constraintCount;
	while(_g1 < _g) {
		var i = _g1++;
		var c = this.m_constraints[i];
		var b1 = c.body1;
		var b2 = c.body2;
		var invMass1 = b1.m_invMass;
		var invI1 = b1.m_invI;
		var invMass2 = b2.m_invMass;
		var invI2 = b2.m_invI;
		var normalX = c.normal.x;
		var normalY = c.normal.y;
		var tangentX = normalY;
		var tangentY = -normalX;
		var tX;
		var j = 0;
		var tCount;
		if(step.warmStarting) {
			tCount = c.pointCount;
			var _g2 = 0;
			while(_g2 < tCount) {
				var j1 = _g2++;
				var ccp = c.points[j1];
				ccp.normalImpulse *= step.dtRatio;
				ccp.tangentImpulse *= step.dtRatio;
				var PX = ccp.normalImpulse * normalX + ccp.tangentImpulse * tangentX;
				var PY = ccp.normalImpulse * normalY + ccp.tangentImpulse * tangentY;
				b1.m_angularVelocity -= invI1 * (ccp.r1.x * PY - ccp.r1.y * PX);
				b1.m_linearVelocity.x -= invMass1 * PX;
				b1.m_linearVelocity.y -= invMass1 * PY;
				b2.m_angularVelocity += invI2 * (ccp.r2.x * PY - ccp.r2.y * PX);
				b2.m_linearVelocity.x += invMass2 * PX;
				b2.m_linearVelocity.y += invMass2 * PY;
			}
		} else {
			tCount = c.pointCount;
			var _g2 = 0;
			while(_g2 < tCount) {
				var j1 = _g2++;
				var ccp2 = c.points[j1];
				ccp2.normalImpulse = 0.0;
				ccp2.tangentImpulse = 0.0;
			}
		}
	}
}
box2D.dynamics.contacts.B2ContactSolver.prototype.SolveVelocityConstraints = function() {
	var j = 0;
	var ccp;
	var r1X = 0.0;
	var r1Y = 0.0;
	var r2X = 0.0;
	var r2Y = 0.0;
	var dvX = 0.0;
	var dvY = 0.0;
	var vn = 0.0;
	var vt = 0.0;
	var lambda_n = 0.0;
	var lambda_t = 0.0;
	var newImpulse_n = 0.0;
	var newImpulse_t = 0.0;
	var PX = 0.0;
	var PY = 0.0;
	var tMat;
	var tVec;
	var _g1 = 0, _g = this.m_constraintCount;
	while(_g1 < _g) {
		var i = _g1++;
		var c = this.m_constraints[i];
		var b1 = c.body1;
		var b2 = c.body2;
		var w1 = b1.m_angularVelocity;
		var w2 = b2.m_angularVelocity;
		var v1 = b1.m_linearVelocity;
		var v2 = b2.m_linearVelocity;
		var invMass1 = b1.m_invMass;
		var invI1 = b1.m_invI;
		var invMass2 = b2.m_invMass;
		var invI2 = b2.m_invI;
		var normalX = c.normal.x;
		var normalY = c.normal.y;
		var tangentX = normalY;
		var tangentY = -normalX;
		var friction = c.friction;
		var tX;
		var tCount = c.pointCount;
		var _g2 = 0;
		while(_g2 < tCount) {
			var j1 = _g2++;
			ccp = c.points[j1];
			dvX = v2.x + -w2 * ccp.r2.y - v1.x - -w1 * ccp.r1.y;
			dvY = v2.y + w2 * ccp.r2.x - v1.y - w1 * ccp.r1.x;
			vn = dvX * normalX + dvY * normalY;
			lambda_n = -ccp.normalMass * (vn - ccp.velocityBias);
			vt = dvX * tangentX + dvY * tangentY;
			lambda_t = ccp.tangentMass * -vt;
			newImpulse_n = box2D.common.math.B2Math.b2Max(ccp.normalImpulse + lambda_n,0.0);
			lambda_n = newImpulse_n - ccp.normalImpulse;
			var maxFriction = friction * ccp.normalImpulse;
			newImpulse_t = box2D.common.math.B2Math.b2Clamp(ccp.tangentImpulse + lambda_t,-maxFriction,maxFriction);
			lambda_t = newImpulse_t - ccp.tangentImpulse;
			PX = lambda_n * normalX + lambda_t * tangentX;
			PY = lambda_n * normalY + lambda_t * tangentY;
			v1.x -= invMass1 * PX;
			v1.y -= invMass1 * PY;
			w1 -= invI1 * (ccp.r1.x * PY - ccp.r1.y * PX);
			v2.x += invMass2 * PX;
			v2.y += invMass2 * PY;
			w2 += invI2 * (ccp.r2.x * PY - ccp.r2.y * PX);
			ccp.normalImpulse = newImpulse_n;
			ccp.tangentImpulse = newImpulse_t;
		}
		b1.m_angularVelocity = w1;
		b2.m_angularVelocity = w2;
	}
}
box2D.dynamics.contacts.B2ContactSolver.prototype.FinalizeVelocityConstraints = function() {
	var _g1 = 0, _g = this.m_constraintCount;
	while(_g1 < _g) {
		var i = _g1++;
		var c = this.m_constraints[i];
		var m = c.manifold;
		var _g3 = 0, _g2 = c.pointCount;
		while(_g3 < _g2) {
			var j = _g3++;
			var point1 = m.points[j];
			var point2 = c.points[j];
			point1.normalImpulse = point2.normalImpulse;
			point1.tangentImpulse = point2.tangentImpulse;
		}
	}
}
box2D.dynamics.contacts.B2ContactSolver.prototype.SolvePositionConstraints = function(baumgarte) {
	var minSeparation = 0.0;
	var tMat;
	var tVec;
	var _g1 = 0, _g = this.m_constraintCount;
	while(_g1 < _g) {
		var i = _g1++;
		var c = this.m_constraints[i];
		var b1 = c.body1;
		var b2 = c.body2;
		var b1_sweep_c = b1.m_sweep.c;
		var b1_sweep_a = b1.m_sweep.a;
		var b2_sweep_c = b2.m_sweep.c;
		var b2_sweep_a = b2.m_sweep.a;
		var invMass1 = b1.m_mass * b1.m_invMass;
		var invI1 = b1.m_mass * b1.m_invI;
		var invMass2 = b2.m_mass * b2.m_invMass;
		var invI2 = b2.m_mass * b2.m_invI;
		var normalX = c.normal.x;
		var normalY = c.normal.y;
		var tCount = c.pointCount;
		var _g2 = 0;
		while(_g2 < tCount) {
			var j = _g2++;
			var ccp = c.points[j];
			tMat = b1.m_xf.R;
			tVec = b1.m_sweep.localCenter;
			var r1X = ccp.localAnchor1.x - tVec.x;
			var r1Y = ccp.localAnchor1.y - tVec.y;
			var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
			r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
			r1X = tX;
			tMat = b2.m_xf.R;
			tVec = b2.m_sweep.localCenter;
			var r2X = ccp.localAnchor2.x - tVec.x;
			var r2Y = ccp.localAnchor2.y - tVec.y;
			tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
			r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
			r2X = tX;
			var p1X = b1_sweep_c.x + r1X;
			var p1Y = b1_sweep_c.y + r1Y;
			var p2X = b2_sweep_c.x + r2X;
			var p2Y = b2_sweep_c.y + r2Y;
			var dpX = p2X - p1X;
			var dpY = p2Y - p1Y;
			var separation = dpX * normalX + dpY * normalY + ccp.separation;
			minSeparation = minSeparation < separation?minSeparation:separation;
			var C = baumgarte * box2D.common.math.B2Math.b2Clamp(separation + box2D.common.B2Settings.b2_linearSlop,-0.2,0.0);
			var dImpulse = -ccp.equalizedMass * C;
			var impulse0 = ccp.positionImpulse;
			ccp.positionImpulse = box2D.common.math.B2Math.b2Max(impulse0 + dImpulse,0.0);
			dImpulse = ccp.positionImpulse - impulse0;
			var impulseX = dImpulse * normalX;
			var impulseY = dImpulse * normalY;
			b1_sweep_c.x -= invMass1 * impulseX;
			b1_sweep_c.y -= invMass1 * impulseY;
			b1_sweep_a -= invI1 * (r1X * impulseY - r1Y * impulseX);
			b1.m_sweep.a = b1_sweep_a;
			b1.SynchronizeTransform();
			b2_sweep_c.x += invMass2 * impulseX;
			b2_sweep_c.y += invMass2 * impulseY;
			b2_sweep_a += invI2 * (r2X * impulseY - r2Y * impulseX);
			b2.m_sweep.a = b2_sweep_a;
			b2.SynchronizeTransform();
		}
	}
	return minSeparation >= -1.5 * box2D.common.B2Settings.b2_linearSlop;
}
box2D.dynamics.contacts.B2ContactSolver.prototype.m_step = null;
box2D.dynamics.contacts.B2ContactSolver.prototype.m_allocator = null;
box2D.dynamics.contacts.B2ContactSolver.prototype.m_constraints = null;
box2D.dynamics.contacts.B2ContactSolver.prototype.m_constraintCount = null;
box2D.dynamics.contacts.B2ContactSolver.prototype.__class__ = box2D.dynamics.contacts.B2ContactSolver;
fboyle.display.DisplayFactory = function(p) {
}
fboyle.display.DisplayFactory.__name__ = ["fboyle","display","DisplayFactory"];
fboyle.display.DisplayFactory.setDisplayList = function(type) {
	if(type == null) type = "";
	var displayList = null;
	displayList = new fboyle.display.EaselDisplayList();
	return displayList;
}
fboyle.display.DisplayFactory.prototype.__class__ = fboyle.display.DisplayFactory;
fboyle.display.AbstractDisplayList = function(p) {
}
fboyle.display.AbstractDisplayList.__name__ = ["fboyle","display","AbstractDisplayList"];
fboyle.display.AbstractDisplayList.prototype.loadBitmap = function(src,callbackFunction) {
	return (function($this) {
		var $r;
		throw "this is an abstract class";
		return $r;
	}(this));
}
fboyle.display.AbstractDisplayList.prototype.loadMovieClip = function(src,infoOb,callbackFunction) {
	return (function($this) {
		var $r;
		throw "this is an abstract class";
		return $r;
	}(this));
}
fboyle.display.AbstractDisplayList.prototype.addChild = function(child,parent) {
	haxe.Log.trace("this is an abstract class",{ fileName : "DisplayFactory.hx", lineNumber : 80, className : "fboyle.display.AbstractDisplayList", methodName : "addChild"});
}
fboyle.display.AbstractDisplayList.prototype.removeChild = function(child,parent) {
	haxe.Log.trace("this is an abstract class",{ fileName : "DisplayFactory.hx", lineNumber : 84, className : "fboyle.display.AbstractDisplayList", methodName : "removeChild"});
}
fboyle.display.AbstractDisplayList.prototype.__class__ = fboyle.display.AbstractDisplayList;
fboyle.display.EaselDisplayList = function(p) {
	if( p === $_ ) return;
	fboyle.display.AbstractDisplayList.call(this);
	this.easelLoader = new fboyle.utils.EaselLoadUtil();
}
fboyle.display.EaselDisplayList.__name__ = ["fboyle","display","EaselDisplayList"];
fboyle.display.EaselDisplayList.__super__ = fboyle.display.AbstractDisplayList;
for(var k in fboyle.display.AbstractDisplayList.prototype ) fboyle.display.EaselDisplayList.prototype[k] = fboyle.display.AbstractDisplayList.prototype[k];
fboyle.display.EaselDisplayList.prototype.easelLoader = null;
fboyle.display.EaselDisplayList.prototype.loadBitmap = function(src,callbackFunction) {
	var here = this;
	return this.easelLoader.loadBitmap(src,function(id) {
		here.easelLoader.nullCallbackReference(id);
		callbackFunction();
	});
}
fboyle.display.EaselDisplayList.prototype.loadMovieClip = function(src,infoOb,callbackFunction) {
	var here = this;
	return this.easelLoader.loadMovieClip(src,infoOb,function(id) {
		here.easelLoader.nullCallbackReference(id);
		callbackFunction();
	});
}
fboyle.display.EaselDisplayList.prototype.addChild = function(child,parent) {
	parent.addChild(child);
}
fboyle.display.EaselDisplayList.prototype.removeChild = function(child,parent) {
	if((function($this) {
		var $r;
		var $t = child.parent;
		if(Std["is"]($t,Container)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this)) != null) ((function($this) {
		var $r;
		var $t = child.parent;
		if(Std["is"]($t,Container)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this))).removeChild(child);
}
fboyle.display.EaselDisplayList.prototype.__class__ = fboyle.display.EaselDisplayList;
fboyle.display.FlashDisplayList = function(p) {
	if( p === $_ ) return;
	fboyle.display.AbstractDisplayList.call(this);
}
fboyle.display.FlashDisplayList.__name__ = ["fboyle","display","FlashDisplayList"];
fboyle.display.FlashDisplayList.__super__ = fboyle.display.AbstractDisplayList;
for(var k in fboyle.display.AbstractDisplayList.prototype ) fboyle.display.FlashDisplayList.prototype[k] = fboyle.display.AbstractDisplayList.prototype[k];
fboyle.display.FlashDisplayList.prototype.__class__ = fboyle.display.FlashDisplayList;
fboyle.display.CppDisplayList = function(p) {
	if( p === $_ ) return;
	fboyle.display.AbstractDisplayList.call(this);
}
fboyle.display.CppDisplayList.__name__ = ["fboyle","display","CppDisplayList"];
fboyle.display.CppDisplayList.__super__ = fboyle.display.AbstractDisplayList;
for(var k in fboyle.display.AbstractDisplayList.prototype ) fboyle.display.CppDisplayList.prototype[k] = fboyle.display.AbstractDisplayList.prototype[k];
fboyle.display.CppDisplayList.prototype.__class__ = fboyle.display.CppDisplayList;
fboyle.utils.EaselLoadUtil = function(p) {
	if( p === $_ ) return;
	fboyle.utils.EaselLoadUtil.loaded = new Hash();
}
fboyle.utils.EaselLoadUtil.__name__ = ["fboyle","utils","EaselLoadUtil"];
fboyle.utils.EaselLoadUtil.prototype.loadBitmap = function(src,onLoadCallback) {
	return new Bitmap(this.loadImage(src,onLoadCallback));
}
fboyle.utils.EaselLoadUtil.prototype.loadImage = function(src,onLoadCallback) {
	var img = js.Lib.document.createElement("img");
	img.onload = function(e) {
		fboyle.utils.EaselLoadUtil.loaded.set(src,img);
		if(onLoadCallback != null) onLoadCallback(src);
	};
	img.src = src;
	return img;
}
fboyle.utils.EaselLoadUtil.prototype.loadMovieClip = function(src,sequenceInfo,onLoadCallback) {
	var seqArr = sequenceInfo.sheetindicies.split(",");
	if(seqArr.length <= 1) {
		var bmp = this.loadBitmap(sequenceInfo.file,onLoadCallback);
		return bmp;
	}
	var img = this.loadImage(src,onLoadCallback);
	var frameData = { };
	frameData[sequenceInfo.name] = [seqArr[0],seqArr[seqArr.length - 1]];
	var spriteSheet = new SpriteSheet(img,sequenceInfo.frameWidth,sequenceInfo.frameHeight,frameData);
	var bmpSeq = new BitmapSequence(spriteSheet);
	bmpSeq.regX = Std["int"](sequenceInfo.registrationPoint.x);
	bmpSeq.regY = Std["int"](sequenceInfo.registrationPoint.y);
	bmpSeq.gotoAndStop(seqArr[0]);
	return bmpSeq;
}
fboyle.utils.EaselLoadUtil.prototype.nullCallbackReference = function(id) {
	if(fboyle.utils.EaselLoadUtil.loaded.exists(id)) fboyle.utils.EaselLoadUtil.loaded.set(id,null);
}
fboyle.utils.EaselLoadUtil.prototype.__class__ = fboyle.utils.EaselLoadUtil;
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
haxe.Timer = function(time_ms) {
	if( time_ms === $_ ) return;
	this.id = haxe.Timer.arr.length;
	haxe.Timer.arr[this.id] = this;
	this.timerId = window.setInterval("haxe.Timer.arr[" + this.id + "].run();",time_ms);
}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
}
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.stop = function() {
	if(this.id == null) return;
	window.clearInterval(this.timerId);
	haxe.Timer.arr[this.id] = null;
	if(this.id > 100 && this.id == haxe.Timer.arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && haxe.Timer.arr[p] == null) p--;
		haxe.Timer.arr = haxe.Timer.arr.slice(0,p + 1);
	}
	this.id = null;
}
haxe.Timer.prototype.run = function() {
}
haxe.Timer.prototype.__class__ = haxe.Timer;
touchmypixel.game.ds.ObjectHash = function(p) {
	if( p === $_ ) return;
	this.values = new IntHash();
}
touchmypixel.game.ds.ObjectHash.__name__ = ["touchmypixel","game","ds","ObjectHash"];
touchmypixel.game.ds.ObjectHash.register = function(object) {
	var id = touchmypixel.game.ds.ObjectHash.i++;
	touchmypixel.game.ds.ObjectHash.registeredObjects.set(id,object);
	object.__objectId = id;
}
touchmypixel.game.ds.ObjectHash.deregister = function(object) {
	touchmypixel.game.ds.ObjectHash.registeredObjects.remove(object.__objectId);
}
touchmypixel.game.ds.ObjectHash.getObject = function(id) {
	return touchmypixel.game.ds.ObjectHash.registeredObjects.get(id);
}
touchmypixel.game.ds.ObjectHash.reset = function() {
	var $it0 = touchmypixel.game.ds.ObjectHash.registeredObjects.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		touchmypixel.game.ds.ObjectHash.registeredObjects.remove(key);
	}
	touchmypixel.game.ds.ObjectHash.i = 0;
}
touchmypixel.game.ds.ObjectHash.prototype.values = null;
touchmypixel.game.ds.ObjectHash.prototype.set = function(object,value) {
	if(object.__objectId == -1) throw "Object: " + object + " is not registered with the ObjectHash manager";
	this.values.set(object.__objectId,value);
}
touchmypixel.game.ds.ObjectHash.prototype.get = function(object) {
	if(object.__objectId == -1) throw "Object: " + object + " is not registered with the ObjectHash manager";
	return this.values.get(object.__objectId);
}
touchmypixel.game.ds.ObjectHash.prototype.remove = function(object) {
	if(object.__objectId == -1) throw "Object: " + object + " is not registered with the ObjectHash manager";
	this.values.remove(object.__objectId);
}
touchmypixel.game.ds.ObjectHash.prototype.exists = function(object) {
	if(object.__objectId == -1) throw "Object: " + object + " is not registered with the ObjectHash manager";
	return this.values.exists(object.__objectId);
}
touchmypixel.game.ds.ObjectHash.prototype.iterator = function() {
	return this.values.iterator();
}
touchmypixel.game.ds.ObjectHash.prototype.keys = function() {
	return new touchmypixel.game.ds.ObjectHashKeyIterator(this);
}
touchmypixel.game.ds.ObjectHash.prototype.check = function(object) {
	if(object.__objectId == -1) throw "Object: " + object + " is not registered with the ObjectHash manager";
}
touchmypixel.game.ds.ObjectHash.prototype.__class__ = touchmypixel.game.ds.ObjectHash;
touchmypixel.game.ds.ObjectHashKeyIterator = function(objectHash) {
	if( objectHash === $_ ) return;
	this._h = objectHash;
	this.it = this._h.values.keys();
}
touchmypixel.game.ds.ObjectHashKeyIterator.__name__ = ["touchmypixel","game","ds","ObjectHashKeyIterator"];
touchmypixel.game.ds.ObjectHashKeyIterator.prototype._h = null;
touchmypixel.game.ds.ObjectHashKeyIterator.prototype.it = null;
touchmypixel.game.ds.ObjectHashKeyIterator.prototype.reset = function() {
	this.it = this._h.values.keys();
}
touchmypixel.game.ds.ObjectHashKeyIterator.prototype.hasNext = function() {
	return this.it.hasNext();
}
touchmypixel.game.ds.ObjectHashKeyIterator.prototype.next = function() {
	return touchmypixel.game.ds.ObjectHash.registeredObjects.get(this.it.next());
}
touchmypixel.game.ds.ObjectHashKeyIterator.prototype.__class__ = touchmypixel.game.ds.ObjectHashKeyIterator;
if(!haxe.xml) haxe.xml = {}
if(!haxe.xml._Fast) haxe.xml._Fast = {}
haxe.xml._Fast.NodeAccess = function(x) {
	if( x === $_ ) return;
	this.__x = x;
}
haxe.xml._Fast.NodeAccess.__name__ = ["haxe","xml","_Fast","NodeAccess"];
haxe.xml._Fast.NodeAccess.prototype.__x = null;
haxe.xml._Fast.NodeAccess.prototype.resolve = function(name) {
	var x = this.__x.elementsNamed(name).next();
	if(x == null) {
		var xname = this.__x.nodeType == Xml.Document?"Document":this.__x.getNodeName();
		throw xname + " is missing element " + name;
	}
	return new haxe.xml.Fast(x);
}
haxe.xml._Fast.NodeAccess.prototype.__class__ = haxe.xml._Fast.NodeAccess;
haxe.xml._Fast.AttribAccess = function(x) {
	if( x === $_ ) return;
	this.__x = x;
}
haxe.xml._Fast.AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe.xml._Fast.AttribAccess.prototype.__x = null;
haxe.xml._Fast.AttribAccess.prototype.resolve = function(name) {
	if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
	var v = this.__x.get(name);
	if(v == null) throw this.__x.getNodeName() + " is missing attribute " + name;
	return v;
}
haxe.xml._Fast.AttribAccess.prototype.__class__ = haxe.xml._Fast.AttribAccess;
haxe.xml._Fast.HasAttribAccess = function(x) {
	if( x === $_ ) return;
	this.__x = x;
}
haxe.xml._Fast.HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe.xml._Fast.HasAttribAccess.prototype.__x = null;
haxe.xml._Fast.HasAttribAccess.prototype.resolve = function(name) {
	if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
	return this.__x.exists(name);
}
haxe.xml._Fast.HasAttribAccess.prototype.__class__ = haxe.xml._Fast.HasAttribAccess;
haxe.xml._Fast.HasNodeAccess = function(x) {
	if( x === $_ ) return;
	this.__x = x;
}
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype.__x = null;
haxe.xml._Fast.HasNodeAccess.prototype.resolve = function(name) {
	return this.__x.elementsNamed(name).hasNext();
}
haxe.xml._Fast.HasNodeAccess.prototype.__class__ = haxe.xml._Fast.HasNodeAccess;
haxe.xml._Fast.NodeListAccess = function(x) {
	if( x === $_ ) return;
	this.__x = x;
}
haxe.xml._Fast.NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe.xml._Fast.NodeListAccess.prototype.__x = null;
haxe.xml._Fast.NodeListAccess.prototype.resolve = function(name) {
	var l = new List();
	var $it0 = this.__x.elementsNamed(name);
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(new haxe.xml.Fast(x));
	}
	return l;
}
haxe.xml._Fast.NodeListAccess.prototype.__class__ = haxe.xml._Fast.NodeListAccess;
haxe.xml.Fast = function(x) {
	if( x === $_ ) return;
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw "Invalid nodeType " + x.nodeType;
	this.x = x;
	this.node = new haxe.xml._Fast.NodeAccess(x);
	this.nodes = new haxe.xml._Fast.NodeListAccess(x);
	this.att = new haxe.xml._Fast.AttribAccess(x);
	this.has = new haxe.xml._Fast.HasAttribAccess(x);
	this.hasNode = new haxe.xml._Fast.HasNodeAccess(x);
}
haxe.xml.Fast.__name__ = ["haxe","xml","Fast"];
haxe.xml.Fast.prototype.x = null;
haxe.xml.Fast.prototype.name = null;
haxe.xml.Fast.prototype.innerData = null;
haxe.xml.Fast.prototype.innerHTML = null;
haxe.xml.Fast.prototype.node = null;
haxe.xml.Fast.prototype.nodes = null;
haxe.xml.Fast.prototype.att = null;
haxe.xml.Fast.prototype.has = null;
haxe.xml.Fast.prototype.hasNode = null;
haxe.xml.Fast.prototype.elements = null;
haxe.xml.Fast.prototype.getName = function() {
	return this.x.nodeType == Xml.Document?"Document":this.x.getNodeName();
}
haxe.xml.Fast.prototype.getInnerData = function() {
	var it = this.x.iterator();
	if(!it.hasNext()) throw this.getName() + " does not have data";
	var v = it.next();
	if(it.hasNext()) throw this.getName() + " does not only have data";
	if(v.nodeType != Xml.PCData && v.nodeType != Xml.CData) throw this.getName() + " does not have data";
	return v.getNodeValue();
}
haxe.xml.Fast.prototype.getInnerHTML = function() {
	var s = new StringBuf();
	var $it0 = this.x.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		s.b[s.b.length] = x.toString();
	}
	return s.b.join("");
}
haxe.xml.Fast.prototype.getElements = function() {
	var it = this.x.elements();
	return { hasNext : $closure(it,"hasNext"), next : function() {
		var x = it.next();
		if(x == null) return null;
		return new haxe.xml.Fast(x);
	}};
}
haxe.xml.Fast.prototype.__class__ = haxe.xml.Fast;
box2D.dynamics.B2TimeStep = function(p) {
}
box2D.dynamics.B2TimeStep.__name__ = ["box2D","dynamics","B2TimeStep"];
box2D.dynamics.B2TimeStep.prototype.dt = null;
box2D.dynamics.B2TimeStep.prototype.inv_dt = null;
box2D.dynamics.B2TimeStep.prototype.dtRatio = null;
box2D.dynamics.B2TimeStep.prototype.maxIterations = null;
box2D.dynamics.B2TimeStep.prototype.warmStarting = null;
box2D.dynamics.B2TimeStep.prototype.positionCorrection = null;
box2D.dynamics.B2TimeStep.prototype.__class__ = box2D.dynamics.B2TimeStep;
box2D.dynamics.joints.B2Jacobian = function(p) {
	if( p === $_ ) return;
	this.linear1 = new box2D.common.math.B2Vec2();
	this.linear2 = new box2D.common.math.B2Vec2();
}
box2D.dynamics.joints.B2Jacobian.__name__ = ["box2D","dynamics","joints","B2Jacobian"];
box2D.dynamics.joints.B2Jacobian.prototype.linear1 = null;
box2D.dynamics.joints.B2Jacobian.prototype.angular1 = null;
box2D.dynamics.joints.B2Jacobian.prototype.linear2 = null;
box2D.dynamics.joints.B2Jacobian.prototype.angular2 = null;
box2D.dynamics.joints.B2Jacobian.prototype.SetZero = function() {
	this.linear1.SetZero();
	this.angular1 = 0.0;
	this.linear2.SetZero();
	this.angular2 = 0.0;
}
box2D.dynamics.joints.B2Jacobian.prototype.Set = function(x1,a1,x2,a2) {
	this.linear1.SetV(x1);
	this.angular1 = a1;
	this.linear2.SetV(x2);
	this.angular2 = a2;
}
box2D.dynamics.joints.B2Jacobian.prototype.Compute = function(x1,a1,x2,a2) {
	return this.linear1.x * x1.x + this.linear1.y * x1.y + this.angular1 * a1 + (this.linear2.x * x2.x + this.linear2.y * x2.y) + this.angular2 * a2;
}
box2D.dynamics.joints.B2Jacobian.prototype.__class__ = box2D.dynamics.joints.B2Jacobian;
box2D.dynamics.contacts.B2ContactRegister = function(p) {
}
box2D.dynamics.contacts.B2ContactRegister.__name__ = ["box2D","dynamics","contacts","B2ContactRegister"];
box2D.dynamics.contacts.B2ContactRegister.prototype.createFcn = null;
box2D.dynamics.contacts.B2ContactRegister.prototype.destroyFcn = null;
box2D.dynamics.contacts.B2ContactRegister.prototype.primary = null;
box2D.dynamics.contacts.B2ContactRegister.prototype.__class__ = box2D.dynamics.contacts.B2ContactRegister;
box2D.dynamics.B2DestructionListener = function(p) {
}
box2D.dynamics.B2DestructionListener.__name__ = ["box2D","dynamics","B2DestructionListener"];
box2D.dynamics.B2DestructionListener.prototype.SayGoodbyeJoint = function(joint) {
}
box2D.dynamics.B2DestructionListener.prototype.SayGoodbyeShape = function(shape) {
}
box2D.dynamics.B2DestructionListener.prototype.__class__ = box2D.dynamics.B2DestructionListener;
box2D.collision.B2Bound = function(p) {
}
box2D.collision.B2Bound.__name__ = ["box2D","collision","B2Bound"];
box2D.collision.B2Bound.prototype.IsLower = function() {
	return (this.value & 1) == 0;
}
box2D.collision.B2Bound.prototype.IsUpper = function() {
	return (this.value & 1) == 1;
}
box2D.collision.B2Bound.prototype.Swap = function(b) {
	var tempValue = this.value;
	var tempProxyId = this.proxyId;
	var tempStabbingCount = this.stabbingCount;
	this.value = b.value;
	this.proxyId = b.proxyId;
	this.stabbingCount = b.stabbingCount;
	b.value = tempValue;
	b.proxyId = tempProxyId;
	b.stabbingCount = tempStabbingCount;
}
box2D.collision.B2Bound.prototype.value = null;
box2D.collision.B2Bound.prototype.proxyId = null;
box2D.collision.B2Bound.prototype.stabbingCount = null;
box2D.collision.B2Bound.prototype.__class__ = box2D.collision.B2Bound;
box2D.collision.shapes.B2CircleShape = function(def) {
	if( def === $_ ) return;
	box2D.collision.shapes.B2Shape.call(this,def);
	this.m_localPosition = new box2D.common.math.B2Vec2();
	var circleDef = (function($this) {
		var $r;
		var $t = def;
		if(Std["is"]($t,box2D.collision.shapes.B2CircleDef)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this));
	this.m_type = 0;
	this.m_localPosition.SetV(circleDef.localPosition);
	this.m_radius = circleDef.radius;
}
box2D.collision.shapes.B2CircleShape.__name__ = ["box2D","collision","shapes","B2CircleShape"];
box2D.collision.shapes.B2CircleShape.__super__ = box2D.collision.shapes.B2Shape;
for(var k in box2D.collision.shapes.B2Shape.prototype ) box2D.collision.shapes.B2CircleShape.prototype[k] = box2D.collision.shapes.B2Shape.prototype[k];
box2D.collision.shapes.B2CircleShape.prototype.TestPoint = function(transform,p) {
	var tMat = transform.R;
	var dX = transform.position.x + (tMat.col1.x * this.m_localPosition.x + tMat.col2.x * this.m_localPosition.y);
	var dY = transform.position.y + (tMat.col1.y * this.m_localPosition.x + tMat.col2.y * this.m_localPosition.y);
	dX = p.x - dX;
	dY = p.y - dY;
	return dX * dX + dY * dY <= this.m_radius * this.m_radius;
}
box2D.collision.shapes.B2CircleShape.prototype.TestSegment = function(transform,lambda,normal,segment,maxLambda) {
	var tMat = transform.R;
	var positionX = transform.position.x + (tMat.col1.x * this.m_localPosition.x + tMat.col2.x * this.m_localPosition.y);
	var positionY = transform.position.x + (tMat.col1.y * this.m_localPosition.x + tMat.col2.y * this.m_localPosition.y);
	var sX = segment.p1.x - positionX;
	var sY = segment.p1.y - positionY;
	var b = sX * sX + sY * sY - this.m_radius * this.m_radius;
	if(b < 0.0) return false;
	var rX = segment.p2.x - segment.p1.x;
	var rY = segment.p2.y - segment.p1.y;
	var c = sX * rX + sY * rY;
	var rr = rX * rX + rY * rY;
	var sigma = c * c - rr * b;
	if(sigma < 0.0 || rr < 5.0e-324) return false;
	var a = -(c + Math.sqrt(sigma));
	if(0.0 <= a && a <= maxLambda * rr) {
		a /= rr;
		lambda[0] = a;
		normal.x = sX + a * rX;
		normal.y = sY + a * rY;
		normal.Normalize();
		return true;
	}
	return false;
}
box2D.collision.shapes.B2CircleShape.prototype.ComputeAABB = function(aabb,transform) {
	var tMat = transform.R;
	var pX = transform.position.x + (tMat.col1.x * this.m_localPosition.x + tMat.col2.x * this.m_localPosition.y);
	var pY = transform.position.y + (tMat.col1.y * this.m_localPosition.x + tMat.col2.y * this.m_localPosition.y);
	aabb.lowerBound.Set(pX - this.m_radius,pY - this.m_radius);
	aabb.upperBound.Set(pX + this.m_radius,pY + this.m_radius);
}
box2D.collision.shapes.B2CircleShape.prototype.ComputeSweptAABB = function(aabb,transform1,transform2) {
	var tMat;
	tMat = transform1.R;
	var p1X = transform1.position.x + (tMat.col1.x * this.m_localPosition.x + tMat.col2.x * this.m_localPosition.y);
	var p1Y = transform1.position.y + (tMat.col1.y * this.m_localPosition.x + tMat.col2.y * this.m_localPosition.y);
	tMat = transform2.R;
	var p2X = transform2.position.x + (tMat.col1.x * this.m_localPosition.x + tMat.col2.x * this.m_localPosition.y);
	var p2Y = transform2.position.y + (tMat.col1.y * this.m_localPosition.x + tMat.col2.y * this.m_localPosition.y);
	aabb.lowerBound.Set((p1X < p2X?p1X:p2X) - this.m_radius,(p1Y < p2Y?p1Y:p2Y) - this.m_radius);
	aabb.upperBound.Set((p1X > p2X?p1X:p2X) + this.m_radius,(p1Y > p2Y?p1Y:p2Y) + this.m_radius);
}
box2D.collision.shapes.B2CircleShape.prototype.ComputeMass = function(massData) {
	massData.mass = this.m_density * Math.PI * this.m_radius * this.m_radius;
	massData.center.SetV(this.m_localPosition);
	massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + (this.m_localPosition.x * this.m_localPosition.x + this.m_localPosition.y * this.m_localPosition.y));
}
box2D.collision.shapes.B2CircleShape.prototype.GetLocalPosition = function() {
	return this.m_localPosition;
}
box2D.collision.shapes.B2CircleShape.prototype.GetRadius = function() {
	return this.m_radius;
}
box2D.collision.shapes.B2CircleShape.prototype.UpdateSweepRadius = function(center) {
	var dX = this.m_localPosition.x - center.x;
	var dY = this.m_localPosition.y - center.y;
	dX = Math.sqrt(dX * dX + dY * dY);
	this.m_sweepRadius = dX + this.m_radius - box2D.common.B2Settings.b2_toiSlop;
}
box2D.collision.shapes.B2CircleShape.prototype.m_localPosition = null;
box2D.collision.shapes.B2CircleShape.prototype.m_radius = null;
box2D.collision.shapes.B2CircleShape.prototype.__class__ = box2D.collision.shapes.B2CircleShape;
haxe.io.Error = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
haxe.Unserializer = function(buf) {
	if( buf === $_ ) return;
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	this.setResolver(haxe.Unserializer.DEFAULT_RESOLVER);
}
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.cca(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype.buf = null;
haxe.Unserializer.prototype.pos = null;
haxe.Unserializer.prototype.length = null;
haxe.Unserializer.prototype.cache = null;
haxe.Unserializer.prototype.scache = null;
haxe.Unserializer.prototype.resolver = null;
haxe.Unserializer.prototype.setResolver = function(r) {
	if(r == null) this.resolver = { resolveClass : function(_) {
		return null;
	}, resolveEnum : function(_) {
		return null;
	}}; else this.resolver = r;
}
haxe.Unserializer.prototype.getResolver = function() {
	return this.resolver;
}
haxe.Unserializer.prototype.get = function(p) {
	return this.buf.cca(p);
}
haxe.Unserializer.prototype.readDigits = function() {
	var k = 0;
	var s = false;
	var fpos = this.pos;
	while(true) {
		var c = this.buf.cca(this.pos);
		if(c != c) break;
		if(c == 45) {
			if(this.pos != fpos) break;
			s = true;
			this.pos++;
			continue;
		}
		if(c < 48 || c > 57) break;
		k = k * 10 + (c - 48);
		this.pos++;
	}
	if(s) k *= -1;
	return k;
}
haxe.Unserializer.prototype.unserializeObject = function(o) {
	while(true) {
		if(this.pos >= this.length) throw "Invalid object";
		if(this.buf.cca(this.pos) == 103) break;
		var k = this.unserialize();
		if(!Std["is"](k,String)) throw "Invalid object key";
		var v = this.unserialize();
		o[k] = v;
	}
	this.pos++;
}
haxe.Unserializer.prototype.unserializeEnum = function(edecl,tag) {
	var constr = Reflect.field(edecl,tag);
	if(constr == null) throw "Unknown enum tag " + Type.getEnumName(edecl) + "." + tag;
	if(this.buf.cca(this.pos++) != 58) throw "Invalid enum format";
	var nargs = this.readDigits();
	if(nargs == 0) {
		this.cache.push(constr);
		return constr;
	}
	var args = new Array();
	while(nargs > 0) {
		args.push(this.unserialize());
		nargs -= 1;
	}
	var e = constr.apply(edecl,args);
	this.cache.push(e);
	return e;
}
haxe.Unserializer.prototype.unserialize = function() {
	switch(this.buf.cca(this.pos++)) {
	case 110:
		return null;
	case 116:
		return true;
	case 102:
		return false;
	case 122:
		return 0;
	case 105:
		return this.readDigits();
	case 100:
		var p1 = this.pos;
		while(true) {
			var c = this.buf.cca(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(this.buf.substr(p1,this.pos - p1));
	case 121:
		var len = this.readDigits();
		if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
		var s = this.buf.substr(this.pos,len);
		this.pos += len;
		s = StringTools.urlDecode(s);
		this.scache.push(s);
		return s;
	case 107:
		return Math.NaN;
	case 109:
		return Math.NEGATIVE_INFINITY;
	case 112:
		return Math.POSITIVE_INFINITY;
	case 97:
		var buf = this.buf;
		var a = new Array();
		this.cache.push(a);
		while(true) {
			var c = this.buf.cca(this.pos);
			if(c == 104) {
				this.pos++;
				break;
			}
			if(c == 117) {
				this.pos++;
				var n = this.readDigits();
				a[a.length + n - 1] = null;
			} else a.push(this.unserialize());
		}
		return a;
	case 111:
		var o = { };
		this.cache.push(o);
		this.unserializeObject(o);
		return o;
	case 114:
		var n = this.readDigits();
		if(n < 0 || n >= this.cache.length) throw "Invalid reference";
		return this.cache[n];
	case 82:
		var n = this.readDigits();
		if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
		return this.scache[n];
	case 120:
		throw this.unserialize();
		break;
	case 99:
		var name = this.unserialize();
		var cl = this.resolver.resolveClass(name);
		if(cl == null) throw "Class not found " + name;
		var o = Type.createEmptyInstance(cl);
		this.cache.push(o);
		this.unserializeObject(o);
		return o;
	case 119:
		var name = this.unserialize();
		var edecl = this.resolver.resolveEnum(name);
		if(edecl == null) throw "Enum not found " + name;
		return this.unserializeEnum(edecl,this.unserialize());
	case 106:
		var name = this.unserialize();
		var edecl = this.resolver.resolveEnum(name);
		if(edecl == null) throw "Enum not found " + name;
		this.pos++;
		var index = this.readDigits();
		var tag = Type.getEnumConstructs(edecl)[index];
		if(tag == null) throw "Unknown enum index " + name + "@" + index;
		return this.unserializeEnum(edecl,tag);
	case 108:
		var l = new List();
		this.cache.push(l);
		var buf = this.buf;
		while(this.buf.cca(this.pos) != 104) l.add(this.unserialize());
		this.pos++;
		return l;
	case 98:
		var h = new Hash();
		this.cache.push(h);
		var buf = this.buf;
		while(this.buf.cca(this.pos) != 104) {
			var s = this.unserialize();
			h.set(s,this.unserialize());
		}
		this.pos++;
		return h;
	case 113:
		var h = new IntHash();
		this.cache.push(h);
		var buf = this.buf;
		var c = this.buf.cca(this.pos++);
		while(c == 58) {
			var i = this.readDigits();
			h.set(i,this.unserialize());
			c = this.buf.cca(this.pos++);
		}
		if(c != 104) throw "Invalid IntHash format";
		return h;
	case 118:
		var d = Date.fromString(this.buf.substr(this.pos,19));
		this.cache.push(d);
		this.pos += 19;
		return d;
	case 115:
		var len = this.readDigits();
		var buf = this.buf;
		if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
		var codes = haxe.Unserializer.CODES;
		if(codes == null) {
			codes = haxe.Unserializer.initCodes();
			haxe.Unserializer.CODES = codes;
		}
		var i = this.pos;
		var rest = len & 3;
		var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
		var max = i + (len - rest);
		var bytes = haxe.io.Bytes.alloc(size);
		var bpos = 0;
		while(i < max) {
			var c1 = codes[buf.cca(i++)];
			var c2 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
			var c3 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
			var c4 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c3 << 6 | c4) & 255;
		}
		if(rest >= 2) {
			var c1 = codes[buf.cca(i++)];
			var c2 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
			if(rest == 3) {
				var c3 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
			}
		}
		this.pos += len;
		this.cache.push(bytes);
		return bytes;
	case 67:
		var name = this.unserialize();
		var cl = this.resolver.resolveClass(name);
		if(cl == null) throw "Class not found " + name;
		var o = Type.createEmptyInstance(cl);
		this.cache.push(o);
		o.hxUnserialize(this);
		if(this.buf.cca(this.pos++) != 103) throw "Invalid custom data";
		return o;
	default:
	}
	this.pos--;
	throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
}
haxe.Unserializer.prototype.__class__ = haxe.Unserializer;
fboyle.display.DisplayObjectInfo = function(p) {
	if( p === $_ ) return;
	this.name = "";
	this.file = "";
	this.linkage = "";
	this.scaleX = 1.0;
	this.scaleY = 1.0;
	this.x = 0.0;
	this.y = 0.0;
	this.rotation = 0.0;
	this.frameWidth = 0;
	this.frameHeight = 0;
	this.sheetindicies = "0";
}
fboyle.display.DisplayObjectInfo.__name__ = ["fboyle","display","DisplayObjectInfo"];
fboyle.display.DisplayObjectInfo.prototype.name = null;
fboyle.display.DisplayObjectInfo.prototype.file = null;
fboyle.display.DisplayObjectInfo.prototype.linkage = null;
fboyle.display.DisplayObjectInfo.prototype.scaleX = null;
fboyle.display.DisplayObjectInfo.prototype.scaleY = null;
fboyle.display.DisplayObjectInfo.prototype.x = null;
fboyle.display.DisplayObjectInfo.prototype.y = null;
fboyle.display.DisplayObjectInfo.prototype.rotation = null;
fboyle.display.DisplayObjectInfo.prototype.frameWidth = null;
fboyle.display.DisplayObjectInfo.prototype.frameHeight = null;
fboyle.display.DisplayObjectInfo.prototype.sheetindicies = null;
fboyle.display.DisplayObjectInfo.prototype.__class__ = fboyle.display.DisplayObjectInfo;
hxs.core.SignalType = { __ename__ : ["hxs","core","SignalType"], __constructs__ : ["NORMAL","ADVANCED","VOID"] }
hxs.core.SignalType.NORMAL = ["NORMAL",0];
hxs.core.SignalType.NORMAL.toString = $estr;
hxs.core.SignalType.NORMAL.__enum__ = hxs.core.SignalType;
hxs.core.SignalType.ADVANCED = ["ADVANCED",1];
hxs.core.SignalType.ADVANCED.toString = $estr;
hxs.core.SignalType.ADVANCED.__enum__ = hxs.core.SignalType;
hxs.core.SignalType.VOID = ["VOID",2];
hxs.core.SignalType.VOID.toString = $estr;
hxs.core.SignalType.VOID.__enum__ = hxs.core.SignalType;
box2D.collision.shapes.B2PolygonShape = function(def) {
	if( def === $_ ) return;
	box2D.collision.shapes.B2Shape.call(this,def);
	this.m_obb = new box2D.collision.B2OBB();
	this.m_vertices = new Array();
	this.m_normals = new Array();
	this.m_coreVertices = new Array();
	this.s_supportVec = new box2D.common.math.B2Vec2();
	this.m_type = 1;
	var poly = (function($this) {
		var $r;
		var $t = def;
		if(Std["is"]($t,box2D.collision.shapes.B2PolygonDef)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this));
	this.m_vertexCount = poly.vertexCount;
	var i = 0;
	var i1 = i;
	var i2 = i;
	var _g1 = 0, _g = this.m_vertexCount;
	while(_g1 < _g) {
		var i3 = _g1++;
		this.m_vertices[i3] = poly.vertices[i3].Copy();
	}
	var _g1 = 0, _g = this.m_vertexCount;
	while(_g1 < _g) {
		var i3 = _g1++;
		i1 = i3;
		i2 = i3 + 1 < this.m_vertexCount?i3 + 1:0;
		var edgeX = this.m_vertices[i2].x - this.m_vertices[i1].x;
		var edgeY = this.m_vertices[i2].y - this.m_vertices[i1].y;
		var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
		this.m_normals[i3] = new box2D.common.math.B2Vec2(edgeY / len,-edgeX / len);
	}
	this.m_centroid = box2D.collision.shapes.B2PolygonShape.ComputeCentroid(poly.vertices,poly.vertexCount);
	box2D.collision.shapes.B2PolygonShape.ComputeOBB(this.m_obb,this.m_vertices,this.m_vertexCount);
	var _g1 = 0, _g = this.m_vertexCount;
	while(_g1 < _g) {
		var i3 = _g1++;
		i1 = i3 - 1 >= 0?i3 - 1:this.m_vertexCount - 1;
		i2 = i3;
		var n1X = this.m_normals[i1].x;
		var n1Y = this.m_normals[i1].y;
		var n2X = this.m_normals[i2].x;
		var n2Y = this.m_normals[i2].y;
		var vX = this.m_vertices[i3].x - this.m_centroid.x;
		var vY = this.m_vertices[i3].y - this.m_centroid.y;
		var dX = n1X * vX + n1Y * vY - box2D.common.B2Settings.b2_toiSlop;
		var dY = n2X * vX + n2Y * vY - box2D.common.B2Settings.b2_toiSlop;
		var det = 1.0 / (n1X * n2Y - n1Y * n2X);
		this.m_coreVertices[i3] = new box2D.common.math.B2Vec2(det * (n2Y * dX - n1Y * dY) + this.m_centroid.x,det * (n1X * dY - n2X * dX) + this.m_centroid.y);
	}
}
box2D.collision.shapes.B2PolygonShape.__name__ = ["box2D","collision","shapes","B2PolygonShape"];
box2D.collision.shapes.B2PolygonShape.__super__ = box2D.collision.shapes.B2Shape;
for(var k in box2D.collision.shapes.B2Shape.prototype ) box2D.collision.shapes.B2PolygonShape.prototype[k] = box2D.collision.shapes.B2Shape.prototype[k];
box2D.collision.shapes.B2PolygonShape.ComputeCentroid = function(vs,count) {
	var c = new box2D.common.math.B2Vec2();
	var area = 0.0;
	var p1X = 0.0;
	var p1Y = 0.0;
	var inv3 = 1.0 / 3.0;
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		var p2 = vs[i];
		var p3 = i + 1 < count?vs[i + 1]:vs[0];
		var e1X = p2.x - p1X;
		var e1Y = p2.y - p1Y;
		var e2X = p3.x - p1X;
		var e2Y = p3.y - p1Y;
		var D = e1X * e2Y - e1Y * e2X;
		var triangleArea = 0.5 * D;
		area += triangleArea;
		c.x += triangleArea * inv3 * (p1X + p2.x + p3.x);
		c.y += triangleArea * inv3 * (p1Y + p2.y + p3.y);
	}
	c.x *= 1.0 / area;
	c.y *= 1.0 / area;
	return c;
}
box2D.collision.shapes.B2PolygonShape.ComputeOBB = function(obb,vs,count) {
	var i;
	var p = new Array();
	var _g = 0;
	while(_g < count) {
		var i1 = _g++;
		p[i1] = vs[i1];
	}
	p[count] = p[0];
	var minArea = 2.0 + 308;
	i = 1;
	while(i <= count) {
		var root = p[Std["int"](i - 1)];
		var uxX = p[i].x - root.x;
		var uxY = p[i].y - root.y;
		var length = Math.sqrt(uxX * uxX + uxY * uxY);
		uxX /= length;
		uxY /= length;
		var uyX = -uxY;
		var uyY = uxX;
		var lowerX = 2.0 + 308;
		var lowerY = 2.0 + 308;
		var upperX = -(2.0 + 308);
		var upperY = -(2.0 + 308);
		var _g = 0;
		while(_g < count) {
			var j = _g++;
			var dX = p[j].x - root.x;
			var dY = p[j].y - root.y;
			var rX = uxX * dX + uxY * dY;
			var rY = uyX * dX + uyY * dY;
			if(rX < lowerX) lowerX = rX;
			if(rY < lowerY) lowerY = rY;
			if(rX > upperX) upperX = rX;
			if(rY > upperY) upperY = rY;
		}
		var area = (upperX - lowerX) * (upperY - lowerY);
		if(area < 0.95 * minArea) {
			minArea = area;
			obb.R.col1.x = uxX;
			obb.R.col1.y = uxY;
			obb.R.col2.x = uyX;
			obb.R.col2.y = uyY;
			var centerX = 0.5 * (lowerX + upperX);
			var centerY = 0.5 * (lowerY + upperY);
			var tMat = obb.R;
			obb.center.x = root.x + (tMat.col1.x * centerX + tMat.col2.x * centerY);
			obb.center.y = root.y + (tMat.col1.y * centerX + tMat.col2.y * centerY);
			obb.extents.x = 0.5 * (upperX - lowerX);
			obb.extents.y = 0.5 * (upperY - lowerY);
		}
		++i;
	}
}
box2D.collision.shapes.B2PolygonShape.prototype.TestPoint = function(xf,p) {
	var tVec;
	var tMat = xf.R;
	var tX = p.x - xf.position.x;
	var tY = p.y - xf.position.y;
	var pLocalX = tX * tMat.col1.x + tY * tMat.col1.y;
	var pLocalY = tX * tMat.col2.x + tY * tMat.col2.y;
	var _g1 = 0, _g = this.m_vertexCount;
	while(_g1 < _g) {
		var i = _g1++;
		tVec = this.m_vertices[i];
		tX = pLocalX - tVec.x;
		tY = pLocalY - tVec.y;
		tVec = this.m_normals[i];
		var dot = tVec.x * tX + tVec.y * tY;
		if(dot > 0.0) return false;
	}
	return true;
}
box2D.collision.shapes.B2PolygonShape.prototype.TestSegment = function(xf,lambda,normal,segment,maxLambda) {
	var lower = 0.0;
	var upper = maxLambda;
	var tX;
	var tY;
	var tMat;
	var tVec;
	tX = segment.p1.x - xf.position.x;
	tY = segment.p1.y - xf.position.y;
	tMat = xf.R;
	var p1X = tX * tMat.col1.x + tY * tMat.col1.y;
	var p1Y = tX * tMat.col2.x + tY * tMat.col2.y;
	tX = segment.p2.x - xf.position.x;
	tY = segment.p2.y - xf.position.y;
	tMat = xf.R;
	var p2X = tX * tMat.col1.x + tY * tMat.col1.y;
	var p2Y = tX * tMat.col2.x + tY * tMat.col2.y;
	var dX = p2X - p1X;
	var dY = p2Y - p1Y;
	var index = -1;
	var _g1 = 0, _g = this.m_vertexCount;
	while(_g1 < _g) {
		var i = _g1++;
		tVec = this.m_vertices[i];
		tX = tVec.x - p1X;
		tY = tVec.y - p1Y;
		tVec = this.m_normals[i];
		var numerator = tVec.x * tX + tVec.y * tY;
		var denominator = tVec.x * dX + tVec.y * dY;
		if(denominator < 0.0 && numerator < lower * denominator) {
			lower = numerator / denominator;
			index = i;
		} else if(denominator > 0.0 && numerator < upper * denominator) upper = numerator / denominator;
		if(upper < lower) return false;
	}
	if(index >= 0) {
		lambda[0] = lower;
		tMat = xf.R;
		tVec = this.m_normals[index];
		normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
		normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
		return true;
	}
	return false;
}
box2D.collision.shapes.B2PolygonShape.prototype.ComputeAABB = function(aabb,xf) {
	var tMat;
	var tVec;
	var R = box2D.collision.shapes.B2PolygonShape.s_computeMat;
	tMat = xf.R;
	tVec = this.m_obb.R.col1;
	R.col1.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	R.col1.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	tVec = this.m_obb.R.col2;
	R.col2.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	R.col2.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	R.col1.Abs();
	R.col2.Abs();
	var absR = R;
	tVec = this.m_obb.extents;
	var hX = absR.col1.x * tVec.x + absR.col2.x * tVec.y;
	var hY = absR.col1.y * tVec.x + absR.col2.y * tVec.y;
	tMat = xf.R;
	tVec = this.m_obb.center;
	var positionX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var positionY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	aabb.lowerBound.Set(positionX - hX,positionY - hY);
	aabb.upperBound.Set(positionX + hX,positionY + hY);
}
box2D.collision.shapes.B2PolygonShape.prototype.ComputeSweptAABB = function(aabb,transform1,transform2) {
	var aabb1 = box2D.collision.shapes.B2PolygonShape.s_sweptAABB1;
	var aabb2 = box2D.collision.shapes.B2PolygonShape.s_sweptAABB2;
	this.ComputeAABB(aabb1,transform1);
	this.ComputeAABB(aabb2,transform2);
	aabb.lowerBound.Set(aabb1.lowerBound.x < aabb2.lowerBound.x?aabb1.lowerBound.x:aabb2.lowerBound.x,aabb1.lowerBound.y < aabb2.lowerBound.y?aabb1.lowerBound.y:aabb2.lowerBound.y);
	aabb.upperBound.Set(aabb1.upperBound.x > aabb2.upperBound.x?aabb1.upperBound.x:aabb2.upperBound.x,aabb1.upperBound.y > aabb2.upperBound.y?aabb1.upperBound.y:aabb2.upperBound.y);
}
box2D.collision.shapes.B2PolygonShape.prototype.ComputeMass = function(massData) {
	var centerX = 0.0;
	var centerY = 0.0;
	var area = 0.0;
	var I = 0.0;
	var p1X = 0.0;
	var p1Y = 0.0;
	var k_inv3 = 1.0 / 3.0;
	var _g1 = 0, _g = this.m_vertexCount;
	while(_g1 < _g) {
		var i = _g1++;
		var p2 = this.m_vertices[i];
		var p3 = i + 1 < this.m_vertexCount?this.m_vertices[Std["int"](i + 1)]:this.m_vertices[0];
		var e1X = p2.x - p1X;
		var e1Y = p2.y - p1Y;
		var e2X = p3.x - p1X;
		var e2Y = p3.y - p1Y;
		var D = e1X * e2Y - e1Y * e2X;
		var triangleArea = 0.5 * D;
		area += triangleArea;
		centerX += triangleArea * k_inv3 * (p1X + p2.x + p3.x);
		centerY += triangleArea * k_inv3 * (p1Y + p2.y + p3.y);
		var px = p1X;
		var py = p1Y;
		var ex1 = e1X;
		var ey1 = e1Y;
		var ex2 = e2X;
		var ey2 = e2Y;
		var intx2 = k_inv3 * (0.25 * (ex1 * ex1 + ex2 * ex1 + ex2 * ex2) + (px * ex1 + px * ex2)) + 0.5 * px * px;
		var inty2 = k_inv3 * (0.25 * (ey1 * ey1 + ey2 * ey1 + ey2 * ey2) + (py * ey1 + py * ey2)) + 0.5 * py * py;
		I += D * (intx2 + inty2);
	}
	massData.mass = this.m_density * area;
	centerX *= 1.0 / area;
	centerY *= 1.0 / area;
	massData.center.Set(centerX,centerY);
	massData.I = this.m_density * I;
}
box2D.collision.shapes.B2PolygonShape.prototype.GetOBB = function() {
	return this.m_obb;
}
box2D.collision.shapes.B2PolygonShape.prototype.GetCentroid = function() {
	return this.m_centroid;
}
box2D.collision.shapes.B2PolygonShape.prototype.GetVertexCount = function() {
	return this.m_vertexCount;
}
box2D.collision.shapes.B2PolygonShape.prototype.GetVertices = function() {
	return this.m_vertices;
}
box2D.collision.shapes.B2PolygonShape.prototype.GetCoreVertices = function() {
	return this.m_coreVertices;
}
box2D.collision.shapes.B2PolygonShape.prototype.GetNormals = function() {
	return this.m_normals;
}
box2D.collision.shapes.B2PolygonShape.prototype.GetFirstVertex = function(xf) {
	return box2D.common.math.B2Math.b2MulX(xf,this.m_coreVertices[0]);
}
box2D.collision.shapes.B2PolygonShape.prototype.Centroid = function(xf) {
	return box2D.common.math.B2Math.b2MulX(xf,this.m_centroid);
}
box2D.collision.shapes.B2PolygonShape.prototype.s_supportVec = null;
box2D.collision.shapes.B2PolygonShape.prototype.Support = function(xf,dX,dY) {
	var tVec;
	var tMat;
	tMat = xf.R;
	var dLocalX = dX * tMat.col1.x + dY * tMat.col1.y;
	var dLocalY = dX * tMat.col2.x + dY * tMat.col2.y;
	var bestIndex = 0;
	tVec = this.m_coreVertices[0];
	var bestValue = tVec.x * dLocalX + tVec.y * dLocalY;
	var _g1 = 1, _g = this.m_vertexCount;
	while(_g1 < _g) {
		var i = _g1++;
		tVec = this.m_coreVertices[i];
		var value = tVec.x * dLocalX + tVec.y * dLocalY;
		if(value > bestValue) {
			bestIndex = i;
			bestValue = value;
		}
	}
	tMat = xf.R;
	tVec = this.m_coreVertices[bestIndex];
	this.s_supportVec.x = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	this.s_supportVec.y = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	return this.s_supportVec;
}
box2D.collision.shapes.B2PolygonShape.prototype.UpdateSweepRadius = function(center) {
	var tVec;
	this.m_sweepRadius = 0.0;
	var _g1 = 0, _g = this.m_vertexCount;
	while(_g1 < _g) {
		var i = _g1++;
		tVec = this.m_coreVertices[i];
		var dX = tVec.x - center.x;
		var dY = tVec.y - center.y;
		dX = Math.sqrt(dX * dX + dY * dY);
		if(dX > this.m_sweepRadius) this.m_sweepRadius = dX;
	}
}
box2D.collision.shapes.B2PolygonShape.prototype.m_centroid = null;
box2D.collision.shapes.B2PolygonShape.prototype.m_obb = null;
box2D.collision.shapes.B2PolygonShape.prototype.m_vertices = null;
box2D.collision.shapes.B2PolygonShape.prototype.m_normals = null;
box2D.collision.shapes.B2PolygonShape.prototype.m_coreVertices = null;
box2D.collision.shapes.B2PolygonShape.prototype.m_vertexCount = null;
box2D.collision.shapes.B2PolygonShape.prototype.__class__ = box2D.collision.shapes.B2PolygonShape;
box2D.dynamics.joints.B2PrismaticJoint = function(def) {
	if( def === $_ ) return;
	box2D.dynamics.joints.B2Joint.call(this,def);
	this.m_localAnchor1 = new box2D.common.math.B2Vec2();
	this.m_localAnchor2 = new box2D.common.math.B2Vec2();
	this.m_localXAxis1 = new box2D.common.math.B2Vec2();
	this.m_localYAxis1 = new box2D.common.math.B2Vec2();
	this.m_linearJacobian = new box2D.dynamics.joints.B2Jacobian();
	this.m_motorJacobian = new box2D.dynamics.joints.B2Jacobian();
	var tMat;
	var tX;
	var tY;
	this.m_localAnchor1.SetV(def.localAnchor1);
	this.m_localAnchor2.SetV(def.localAnchor2);
	this.m_localXAxis1.SetV(def.localAxis1);
	this.m_localYAxis1.x = -this.m_localXAxis1.y;
	this.m_localYAxis1.y = this.m_localXAxis1.x;
	this.m_refAngle = def.referenceAngle;
	this.m_linearJacobian.SetZero();
	this.m_linearMass = 0.0;
	this.m_force = 0.0;
	this.m_angularMass = 0.0;
	this.m_torque = 0.0;
	this.m_motorJacobian.SetZero();
	this.m_motorMass = 0.0;
	this.m_motorForce = 0.0;
	this.m_limitForce = 0.0;
	this.m_limitPositionImpulse = 0.0;
	this.m_lowerTranslation = def.lowerTranslation;
	this.m_upperTranslation = def.upperTranslation;
	this.m_maxMotorForce = def.maxMotorForce;
	this.m_motorSpeed = def.motorSpeed;
	this.m_enableLimit = def.enableLimit;
	this.m_enableMotor = def.enableMotor;
}
box2D.dynamics.joints.B2PrismaticJoint.__name__ = ["box2D","dynamics","joints","B2PrismaticJoint"];
box2D.dynamics.joints.B2PrismaticJoint.__super__ = box2D.dynamics.joints.B2Joint;
for(var k in box2D.dynamics.joints.B2Joint.prototype ) box2D.dynamics.joints.B2PrismaticJoint.prototype[k] = box2D.dynamics.joints.B2Joint.prototype[k];
box2D.dynamics.joints.B2PrismaticJoint.prototype.GetAnchor1 = function() {
	return this.m_body1.GetWorldPoint(this.m_localAnchor1);
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.GetAnchor2 = function() {
	return this.m_body2.GetWorldPoint(this.m_localAnchor2);
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.GetReactionForce = function() {
	var tMat = this.m_body1.m_xf.R;
	var ax1X = this.m_limitForce * (tMat.col1.x * this.m_localXAxis1.x + tMat.col2.x * this.m_localXAxis1.y);
	var ax1Y = this.m_limitForce * (tMat.col1.y * this.m_localXAxis1.x + tMat.col2.y * this.m_localXAxis1.y);
	var ay1X = this.m_force * (tMat.col1.x * this.m_localYAxis1.x + tMat.col2.x * this.m_localYAxis1.y);
	var ay1Y = this.m_force * (tMat.col1.y * this.m_localYAxis1.x + tMat.col2.y * this.m_localYAxis1.y);
	return new box2D.common.math.B2Vec2(this.m_limitForce * ax1X + this.m_force * ay1X,this.m_limitForce * ax1Y + this.m_force * ay1Y);
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.GetReactionTorque = function() {
	return this.m_torque;
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.GetJointTranslation = function() {
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	var tMat;
	var p1 = b1.GetWorldPoint(this.m_localAnchor1);
	var p2 = b2.GetWorldPoint(this.m_localAnchor2);
	var dX = p2.x - p1.x;
	var dY = p2.y - p1.y;
	var axis = b1.GetWorldVector(this.m_localXAxis1);
	var translation = axis.x * dX + axis.y * dY;
	return translation;
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.GetJointSpeed = function() {
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	var tMat;
	tMat = b1.m_xf.R;
	var r1X = this.m_localAnchor1.x - b1.m_sweep.localCenter.x;
	var r1Y = this.m_localAnchor1.y - b1.m_sweep.localCenter.y;
	var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
	r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
	r1X = tX;
	tMat = b2.m_xf.R;
	var r2X = this.m_localAnchor2.x - b2.m_sweep.localCenter.x;
	var r2Y = this.m_localAnchor2.y - b2.m_sweep.localCenter.y;
	tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
	r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
	r2X = tX;
	var p1X = b1.m_sweep.c.x + r1X;
	var p1Y = b1.m_sweep.c.y + r1Y;
	var p2X = b2.m_sweep.c.x + r2X;
	var p2Y = b2.m_sweep.c.y + r2Y;
	var dX = p2X - p1X;
	var dY = p2Y - p1Y;
	var axis = b1.GetWorldVector(this.m_localXAxis1);
	var v1 = b1.m_linearVelocity;
	var v2 = b2.m_linearVelocity;
	var w1 = b1.m_angularVelocity;
	var w2 = b2.m_angularVelocity;
	var speed = dX * (-w1 * axis.y) + dY * (w1 * axis.x) + (axis.x * (v2.x + -w2 * r2Y - v1.x - -w1 * r1Y) + axis.y * (v2.y + w2 * r2X - v1.y - w1 * r1X));
	return speed;
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.IsLimitEnabled = function() {
	return this.m_enableLimit;
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.EnableLimit = function(flag) {
	this.m_enableLimit = flag;
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.GetLowerLimit = function() {
	return this.m_lowerTranslation;
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.GetUpperLimit = function() {
	return this.m_upperTranslation;
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.SetLimits = function(lower,upper) {
	this.m_lowerTranslation = lower;
	this.m_upperTranslation = upper;
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.IsMotorEnabled = function() {
	return this.m_enableMotor;
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.EnableMotor = function(flag) {
	this.m_enableMotor = flag;
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.SetMotorSpeed = function(speed) {
	this.m_motorSpeed = speed;
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.GetMotorSpeed = function() {
	return this.m_motorSpeed;
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.SetMaxMotorForce = function(force) {
	this.m_maxMotorForce = force;
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.GetMotorForce = function() {
	return this.m_motorForce;
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.InitVelocityConstraints = function(step) {
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	var tMat;
	var tX;
	tMat = b1.m_xf.R;
	var r1X = this.m_localAnchor1.x - b1.m_sweep.localCenter.x;
	var r1Y = this.m_localAnchor1.y - b1.m_sweep.localCenter.y;
	tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
	r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
	r1X = tX;
	tMat = b2.m_xf.R;
	var r2X = this.m_localAnchor2.x - b2.m_sweep.localCenter.x;
	var r2Y = this.m_localAnchor2.y - b2.m_sweep.localCenter.y;
	tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
	r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
	r2X = tX;
	var invMass1 = b1.m_invMass;
	var invMass2 = b2.m_invMass;
	var invI1 = b1.m_invI;
	var invI2 = b2.m_invI;
	tMat = b1.m_xf.R;
	var ay1X = tMat.col1.x * this.m_localYAxis1.x + tMat.col2.x * this.m_localYAxis1.y;
	var ay1Y = tMat.col1.y * this.m_localYAxis1.x + tMat.col2.y * this.m_localYAxis1.y;
	var eX = b2.m_sweep.c.x + r2X - b1.m_sweep.c.x;
	var eY = b2.m_sweep.c.y + r2Y - b1.m_sweep.c.y;
	this.m_linearJacobian.linear1.x = -ay1X;
	this.m_linearJacobian.linear1.y = -ay1Y;
	this.m_linearJacobian.linear2.x = ay1X;
	this.m_linearJacobian.linear2.y = ay1Y;
	this.m_linearJacobian.angular1 = -(eX * ay1Y - eY * ay1X);
	this.m_linearJacobian.angular2 = r2X * ay1Y - r2Y * ay1X;
	this.m_linearMass = invMass1 + invI1 * this.m_linearJacobian.angular1 * this.m_linearJacobian.angular1 + invMass2 + invI2 * this.m_linearJacobian.angular2 * this.m_linearJacobian.angular2;
	this.m_linearMass = 1.0 / this.m_linearMass;
	this.m_angularMass = invI1 + invI2;
	if(this.m_angularMass > 5.0e-324) this.m_angularMass = 1.0 / this.m_angularMass;
	if(this.m_enableLimit || this.m_enableMotor) {
		tMat = b1.m_xf.R;
		var ax1X = tMat.col1.x * this.m_localXAxis1.x + tMat.col2.x * this.m_localXAxis1.y;
		var ax1Y = tMat.col1.y * this.m_localXAxis1.x + tMat.col2.y * this.m_localXAxis1.y;
		this.m_motorJacobian.linear1.x = -ax1X;
		this.m_motorJacobian.linear1.y = -ax1Y;
		this.m_motorJacobian.linear2.x = ax1X;
		this.m_motorJacobian.linear2.y = ax1Y;
		this.m_motorJacobian.angular1 = -(eX * ax1Y - eY * ax1X);
		this.m_motorJacobian.angular2 = r2X * ax1Y - r2Y * ax1X;
		this.m_motorMass = invMass1 + invI1 * this.m_motorJacobian.angular1 * this.m_motorJacobian.angular1 + invMass2 + invI2 * this.m_motorJacobian.angular2 * this.m_motorJacobian.angular2;
		this.m_motorMass = 1.0 / this.m_motorMass;
		if(this.m_enableLimit) {
			var dX = eX - r1X;
			var dY = eY - r1Y;
			var jointTranslation = ax1X * dX + ax1Y * dY;
			if(box2D.common.math.B2Math.b2Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * box2D.common.B2Settings.b2_linearSlop) this.m_limitState = 3; else if(jointTranslation <= this.m_lowerTranslation) {
				if(this.m_limitState != 1) this.m_limitForce = 0.0;
				this.m_limitState = 1;
			} else if(jointTranslation >= this.m_upperTranslation) {
				if(this.m_limitState != 2) this.m_limitForce = 0.0;
				this.m_limitState = 2;
			} else {
				this.m_limitState = 0;
				this.m_limitForce = 0.0;
			}
		}
	}
	if(this.m_enableMotor == false) this.m_motorForce = 0.0;
	if(this.m_enableLimit == false) this.m_limitForce = 0.0;
	if(step.warmStarting) {
		var P1X = step.dt * (this.m_force * this.m_linearJacobian.linear1.x + (this.m_motorForce + this.m_limitForce) * this.m_motorJacobian.linear1.x);
		var P1Y = step.dt * (this.m_force * this.m_linearJacobian.linear1.y + (this.m_motorForce + this.m_limitForce) * this.m_motorJacobian.linear1.y);
		var P2X = step.dt * (this.m_force * this.m_linearJacobian.linear2.x + (this.m_motorForce + this.m_limitForce) * this.m_motorJacobian.linear2.x);
		var P2Y = step.dt * (this.m_force * this.m_linearJacobian.linear2.y + (this.m_motorForce + this.m_limitForce) * this.m_motorJacobian.linear2.y);
		var L1 = step.dt * (this.m_force * this.m_linearJacobian.angular1 - this.m_torque + (this.m_motorForce + this.m_limitForce) * this.m_motorJacobian.angular1);
		var L2 = step.dt * (this.m_force * this.m_linearJacobian.angular2 + this.m_torque + (this.m_motorForce + this.m_limitForce) * this.m_motorJacobian.angular2);
		b1.m_linearVelocity.x += invMass1 * P1X;
		b1.m_linearVelocity.y += invMass1 * P1Y;
		b1.m_angularVelocity += invI1 * L1;
		b2.m_linearVelocity.x += invMass2 * P2X;
		b2.m_linearVelocity.y += invMass2 * P2Y;
		b2.m_angularVelocity += invI2 * L2;
	} else {
		this.m_force = 0.0;
		this.m_torque = 0.0;
		this.m_limitForce = 0.0;
		this.m_motorForce = 0.0;
	}
	this.m_limitPositionImpulse = 0.0;
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.SolveVelocityConstraints = function(step) {
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	var invMass1 = b1.m_invMass;
	var invMass2 = b2.m_invMass;
	var invI1 = b1.m_invI;
	var invI2 = b2.m_invI;
	var oldLimitForce;
	var linearCdot = this.m_linearJacobian.Compute(b1.m_linearVelocity,b1.m_angularVelocity,b2.m_linearVelocity,b2.m_angularVelocity);
	var force = -step.inv_dt * this.m_linearMass * linearCdot;
	this.m_force += force;
	var P = step.dt * force;
	b1.m_linearVelocity.x += invMass1 * P * this.m_linearJacobian.linear1.x;
	b1.m_linearVelocity.y += invMass1 * P * this.m_linearJacobian.linear1.y;
	b1.m_angularVelocity += invI1 * P * this.m_linearJacobian.angular1;
	b2.m_linearVelocity.x += invMass2 * P * this.m_linearJacobian.linear2.x;
	b2.m_linearVelocity.y += invMass2 * P * this.m_linearJacobian.linear2.y;
	b2.m_angularVelocity += invI2 * P * this.m_linearJacobian.angular2;
	var angularCdot = b2.m_angularVelocity - b1.m_angularVelocity;
	var torque = -step.inv_dt * this.m_angularMass * angularCdot;
	this.m_torque += torque;
	var L = step.dt * torque;
	b1.m_angularVelocity -= invI1 * L;
	b2.m_angularVelocity += invI2 * L;
	if(this.m_enableMotor && this.m_limitState != 3) {
		var motorCdot = this.m_motorJacobian.Compute(b1.m_linearVelocity,b1.m_angularVelocity,b2.m_linearVelocity,b2.m_angularVelocity) - this.m_motorSpeed;
		var motorForce = -step.inv_dt * this.m_motorMass * motorCdot;
		var oldMotorForce = this.m_motorForce;
		this.m_motorForce = box2D.common.math.B2Math.b2Clamp(this.m_motorForce + motorForce,-this.m_maxMotorForce,this.m_maxMotorForce);
		motorForce = this.m_motorForce - oldMotorForce;
		P = step.dt * motorForce;
		b1.m_linearVelocity.x += invMass1 * P * this.m_motorJacobian.linear1.x;
		b1.m_linearVelocity.y += invMass1 * P * this.m_motorJacobian.linear1.y;
		b1.m_angularVelocity += invI1 * P * this.m_motorJacobian.angular1;
		b2.m_linearVelocity.x += invMass2 * P * this.m_motorJacobian.linear2.x;
		b2.m_linearVelocity.y += invMass2 * P * this.m_motorJacobian.linear2.y;
		b2.m_angularVelocity += invI2 * P * this.m_motorJacobian.angular2;
	}
	if(this.m_enableLimit && this.m_limitState != 0) {
		var limitCdot = this.m_motorJacobian.Compute(b1.m_linearVelocity,b1.m_angularVelocity,b2.m_linearVelocity,b2.m_angularVelocity);
		var limitForce = -step.inv_dt * this.m_motorMass * limitCdot;
		if(this.m_limitState == 3) this.m_limitForce += limitForce; else if(this.m_limitState == 1) {
			oldLimitForce = this.m_limitForce;
			this.m_limitForce = box2D.common.math.B2Math.b2Max(this.m_limitForce + limitForce,0.0);
			limitForce = this.m_limitForce - oldLimitForce;
		} else if(this.m_limitState == 2) {
			oldLimitForce = this.m_limitForce;
			this.m_limitForce = box2D.common.math.B2Math.b2Min(this.m_limitForce + limitForce,0.0);
			limitForce = this.m_limitForce - oldLimitForce;
		}
		P = step.dt * limitForce;
		b1.m_linearVelocity.x += invMass1 * P * this.m_motorJacobian.linear1.x;
		b1.m_linearVelocity.y += invMass1 * P * this.m_motorJacobian.linear1.y;
		b1.m_angularVelocity += invI1 * P * this.m_motorJacobian.angular1;
		b2.m_linearVelocity.x += invMass2 * P * this.m_motorJacobian.linear2.x;
		b2.m_linearVelocity.y += invMass2 * P * this.m_motorJacobian.linear2.y;
		b2.m_angularVelocity += invI2 * P * this.m_motorJacobian.angular2;
	}
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.SolvePositionConstraints = function() {
	var limitC;
	var oldLimitImpulse;
	var b1 = this.m_body1;
	var b2 = this.m_body2;
	var invMass1 = b1.m_invMass;
	var invMass2 = b2.m_invMass;
	var invI1 = b1.m_invI;
	var invI2 = b2.m_invI;
	var tMat;
	var tX;
	tMat = b1.m_xf.R;
	var r1X = this.m_localAnchor1.x - b1.m_sweep.localCenter.x;
	var r1Y = this.m_localAnchor1.y - b1.m_sweep.localCenter.y;
	tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
	r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
	r1X = tX;
	tMat = b2.m_xf.R;
	var r2X = this.m_localAnchor2.x - b2.m_sweep.localCenter.x;
	var r2Y = this.m_localAnchor2.y - b2.m_sweep.localCenter.y;
	tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
	r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
	r2X = tX;
	var p1X = b1.m_sweep.c.x + r1X;
	var p1Y = b1.m_sweep.c.y + r1Y;
	var p2X = b2.m_sweep.c.x + r2X;
	var p2Y = b2.m_sweep.c.y + r2Y;
	var dX = p2X - p1X;
	var dY = p2Y - p1Y;
	tMat = b1.m_xf.R;
	var ay1X = tMat.col1.x * this.m_localYAxis1.x + tMat.col2.x * this.m_localYAxis1.y;
	var ay1Y = tMat.col1.y * this.m_localYAxis1.x + tMat.col2.y * this.m_localYAxis1.y;
	var linearC = ay1X * dX + ay1Y * dY;
	linearC = box2D.common.math.B2Math.b2Max(-0.2,linearC < 0.2?linearC:0.2);
	var linearImpulse = -this.m_linearMass * linearC;
	b1.m_sweep.c.x += invMass1 * linearImpulse * this.m_linearJacobian.linear1.x;
	b1.m_sweep.c.y += invMass1 * linearImpulse * this.m_linearJacobian.linear1.y;
	b1.m_sweep.a += invI1 * linearImpulse * this.m_linearJacobian.angular1;
	b2.m_sweep.c.x += invMass2 * linearImpulse * this.m_linearJacobian.linear2.x;
	b2.m_sweep.c.y += invMass2 * linearImpulse * this.m_linearJacobian.linear2.y;
	b2.m_sweep.a += invI2 * linearImpulse * this.m_linearJacobian.angular2;
	var positionError = linearC > 0.0?linearC:-linearC;
	var angularC = b2.m_sweep.a - b1.m_sweep.a - this.m_refAngle;
	angularC = box2D.common.math.B2Math.b2Clamp(angularC,-box2D.common.B2Settings.b2_maxAngularCorrection,box2D.common.B2Settings.b2_maxAngularCorrection);
	var angularImpulse = -this.m_angularMass * angularC;
	b1.m_sweep.a -= b1.m_invI * angularImpulse;
	b2.m_sweep.a += b2.m_invI * angularImpulse;
	b1.SynchronizeTransform();
	b2.SynchronizeTransform();
	var angularError = angularC > 0.0?angularC:-angularC;
	if(this.m_enableLimit && this.m_limitState != 0) {
		tMat = b1.m_xf.R;
		r1X = this.m_localAnchor1.x - b1.m_sweep.localCenter.x;
		r1Y = this.m_localAnchor1.y - b1.m_sweep.localCenter.y;
		tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = b2.m_xf.R;
		r2X = this.m_localAnchor2.x - b2.m_sweep.localCenter.x;
		r2Y = this.m_localAnchor2.y - b2.m_sweep.localCenter.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		p1X = b1.m_sweep.c.x + r1X;
		p1Y = b1.m_sweep.c.y + r1Y;
		p2X = b2.m_sweep.c.x + r2X;
		p2Y = b2.m_sweep.c.y + r2Y;
		dX = p2X - p1X;
		dY = p2Y - p1Y;
		tMat = b1.m_xf.R;
		var ax1X = tMat.col1.x * this.m_localXAxis1.x + tMat.col2.x * this.m_localXAxis1.y;
		var ax1Y = tMat.col1.y * this.m_localXAxis1.x + tMat.col2.y * this.m_localXAxis1.y;
		var translation = ax1X * dX + ax1Y * dY;
		var limitImpulse = 0.0;
		if(this.m_limitState == 3) {
			limitC = box2D.common.math.B2Math.b2Max(-0.2,translation < 0.2?translation:0.2);
			limitImpulse = -this.m_motorMass * limitC;
			positionError = box2D.common.math.B2Math.b2Max(positionError,angularC > 0.0?angularC:-angularC);
		} else if(this.m_limitState == 1) {
			limitC = translation - this.m_lowerTranslation;
			positionError = box2D.common.math.B2Math.b2Max(positionError,-limitC);
			limitC = box2D.common.math.B2Math.b2Clamp(limitC + box2D.common.B2Settings.b2_linearSlop,-0.2,0.0);
			limitImpulse = -this.m_motorMass * limitC;
			oldLimitImpulse = this.m_limitPositionImpulse;
			this.m_limitPositionImpulse = box2D.common.math.B2Math.b2Max(this.m_limitPositionImpulse + limitImpulse,0.0);
			limitImpulse = this.m_limitPositionImpulse - oldLimitImpulse;
		} else if(this.m_limitState == 2) {
			limitC = translation - this.m_upperTranslation;
			positionError = positionError > limitC?positionError:limitC;
			limitC = box2D.common.math.B2Math.b2Clamp(limitC - box2D.common.B2Settings.b2_linearSlop,0.0,0.2);
			limitImpulse = -this.m_motorMass * limitC;
			oldLimitImpulse = this.m_limitPositionImpulse;
			this.m_limitPositionImpulse = box2D.common.math.B2Math.b2Min(this.m_limitPositionImpulse + limitImpulse,0.0);
			limitImpulse = this.m_limitPositionImpulse - oldLimitImpulse;
		}
		b1.m_sweep.c.x += invMass1 * limitImpulse * this.m_motorJacobian.linear1.x;
		b1.m_sweep.c.y += invMass1 * limitImpulse * this.m_motorJacobian.linear1.y;
		b1.m_sweep.a += invI1 * limitImpulse * this.m_motorJacobian.angular1;
		b2.m_sweep.c.x += invMass2 * limitImpulse * this.m_motorJacobian.linear2.x;
		b2.m_sweep.c.y += invMass2 * limitImpulse * this.m_motorJacobian.linear2.y;
		b2.m_sweep.a += invI2 * limitImpulse * this.m_motorJacobian.angular2;
		b1.SynchronizeTransform();
		b2.SynchronizeTransform();
	}
	return positionError <= box2D.common.B2Settings.b2_linearSlop && angularError <= box2D.common.B2Settings.b2_angularSlop;
}
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_localAnchor1 = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_localAnchor2 = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_localXAxis1 = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_localYAxis1 = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_refAngle = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_linearJacobian = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_linearMass = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_force = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_angularMass = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_torque = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_motorJacobian = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_motorMass = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_motorForce = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_limitForce = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_limitPositionImpulse = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_lowerTranslation = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_upperTranslation = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_maxMotorForce = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_motorSpeed = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_enableLimit = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_enableMotor = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.m_limitState = null;
box2D.dynamics.joints.B2PrismaticJoint.prototype.__class__ = box2D.dynamics.joints.B2PrismaticJoint;
box2D.dynamics.B2DebugDraw = function(p) {
	if( p === $_ ) return;
	this.m_drawScale = 1.0;
	this.m_lineThickness = 1.0;
	this.m_alpha = 1.0;
	this.m_fillAlpha = 1.0;
	this.m_xformScale = 1.0;
	this.m_drawFlags = 0;
}
box2D.dynamics.B2DebugDraw.__name__ = ["box2D","dynamics","B2DebugDraw"];
box2D.dynamics.B2DebugDraw.prototype.m_drawFlags = null;
box2D.dynamics.B2DebugDraw.prototype.m_sprite = null;
box2D.dynamics.B2DebugDraw.prototype.m_drawScale = null;
box2D.dynamics.B2DebugDraw.prototype.m_lineThickness = null;
box2D.dynamics.B2DebugDraw.prototype.m_alpha = null;
box2D.dynamics.B2DebugDraw.prototype.m_fillAlpha = null;
box2D.dynamics.B2DebugDraw.prototype.m_xformScale = null;
box2D.dynamics.B2DebugDraw.prototype.SetFlags = function(flags) {
	this.m_drawFlags = flags;
}
box2D.dynamics.B2DebugDraw.prototype.GetFlags = function() {
	return this.m_drawFlags;
}
box2D.dynamics.B2DebugDraw.prototype.AppendFlags = function(flags) {
	this.m_drawFlags |= flags;
}
box2D.dynamics.B2DebugDraw.prototype.ClearFlags = function(flags) {
	this.m_drawFlags &= ~flags;
}
box2D.dynamics.B2DebugDraw.prototype.DrawPolygon = function(vertices,vertexCount,color) {
	this.addLineStyle(this.m_sprite.graphics,this.m_lineThickness,color.getColor(),this.m_alpha);
	this.m_sprite.graphics.moveTo(vertices[0].x * this.m_drawScale,vertices[0].y * this.m_drawScale);
	var _g = 1;
	while(_g < vertexCount) {
		var i = _g++;
		this.m_sprite.graphics.lineTo(vertices[i].x * this.m_drawScale,vertices[i].y * this.m_drawScale);
	}
	this.m_sprite.graphics.lineTo(vertices[0].x * this.m_drawScale,vertices[0].y * this.m_drawScale);
}
box2D.dynamics.B2DebugDraw.prototype.addLineStyle = function(graphics,thickness,color,alpha) {
	if(thickness == null) thickness = 1.0;
	graphics.setStrokeStyle(thickness);
	graphics.beginStroke("#" + StringTools.hex(color));
}
box2D.dynamics.B2DebugDraw.prototype.beginFill = function(graphics,color,alpha) {
	this.m_sprite.graphics.beginFill("#" + StringTools.hex(color));
}
box2D.dynamics.B2DebugDraw.prototype.DrawSolidPolygon = function(vertices,vertexCount,color) {
	this.addLineStyle(this.m_sprite.graphics,this.m_lineThickness,color.getColor(),this.m_alpha);
	this.m_sprite.graphics.moveTo(vertices[0].x * this.m_drawScale,vertices[0].y * this.m_drawScale);
	this.m_sprite.graphics.beginFill("#" + StringTools.hex(color.getColor()));
	var _g = 1;
	while(_g < vertexCount) {
		var i = _g++;
		this.m_sprite.graphics.lineTo(vertices[i].x * this.m_drawScale,vertices[i].y * this.m_drawScale);
	}
	this.m_sprite.graphics.lineTo(vertices[0].x * this.m_drawScale,vertices[0].y * this.m_drawScale);
	this.m_sprite.graphics.endFill();
}
box2D.dynamics.B2DebugDraw.prototype.DrawCircle = function(center,radius,color) {
	this.addLineStyle(this.m_sprite.graphics,this.m_lineThickness,color.getColor(),this.m_alpha);
	this.m_sprite.graphics.drawCircle(center.x * this.m_drawScale,center.y * this.m_drawScale,radius * this.m_drawScale);
}
box2D.dynamics.B2DebugDraw.prototype.DrawSolidCircle = function(center,radius,axis,color) {
	this.addLineStyle(this.m_sprite.graphics,this.m_lineThickness,color.getColor(),this.m_alpha);
	this.m_sprite.graphics.beginFill("#" + StringTools.hex(color.getColor()));
	this.m_sprite.graphics.drawCircle(center.x * this.m_drawScale,center.y * this.m_drawScale,radius * this.m_drawScale);
	this.m_sprite.graphics.endFill();
	this.m_sprite.graphics.moveTo(center.x * this.m_drawScale,center.y * this.m_drawScale);
	this.m_sprite.graphics.lineTo((center.x + axis.x * radius) * this.m_drawScale,(center.y + axis.y * radius) * this.m_drawScale);
}
box2D.dynamics.B2DebugDraw.prototype.DrawSegment = function(p1,p2,color) {
	this.addLineStyle(this.m_sprite.graphics,this.m_lineThickness,color.getColor(),this.m_alpha);
	this.m_sprite.graphics.moveTo(p1.x * this.m_drawScale,p1.y * this.m_drawScale);
	this.m_sprite.graphics.lineTo(p2.x * this.m_drawScale,p2.y * this.m_drawScale);
}
box2D.dynamics.B2DebugDraw.prototype.DrawXForm = function(xf) {
	this.addLineStyle(this.m_sprite.graphics,this.m_lineThickness,16711680,1);
	this.m_sprite.graphics.moveTo(xf.position.x * this.m_drawScale,xf.position.y * this.m_drawScale);
	this.m_sprite.graphics.lineTo((xf.position.x + this.m_xformScale * xf.R.col1.x) * this.m_drawScale,(xf.position.y + this.m_xformScale * xf.R.col1.y) * this.m_drawScale);
	this.addLineStyle(this.m_sprite.graphics,this.m_lineThickness,65280,1);
	this.m_sprite.graphics.moveTo(xf.position.x * this.m_drawScale,xf.position.y * this.m_drawScale);
	this.m_sprite.graphics.lineTo((xf.position.x + this.m_xformScale * xf.R.col2.x) * this.m_drawScale,(xf.position.y + this.m_xformScale * xf.R.col2.y) * this.m_drawScale);
}
box2D.dynamics.B2DebugDraw.prototype.__class__ = box2D.dynamics.B2DebugDraw;
if(!fboyle.events) fboyle.events = {}
fboyle.events.MouseEvent = function() { }
fboyle.events.MouseEvent.__name__ = ["fboyle","events","MouseEvent"];
fboyle.events.MouseEvent.prototype.__class__ = fboyle.events.MouseEvent;
box2D.collision.B2Segment = function(p) {
	if( p === $_ ) return;
	this.p1 = new box2D.common.math.B2Vec2();
	this.p2 = new box2D.common.math.B2Vec2();
}
box2D.collision.B2Segment.__name__ = ["box2D","collision","B2Segment"];
box2D.collision.B2Segment.prototype.TestSegment = function(lambda,normal,segment,maxLambda) {
	var s = segment.p1;
	var rX = segment.p2.x - s.x;
	var rY = segment.p2.y - s.y;
	var dX = this.p2.x - this.p1.x;
	var dY = this.p2.y - this.p1.y;
	var nX = dY;
	var nY = -dX;
	var k_slop = 4.94065645841e-322;
	var denom = -(rX * nX + rY * nY);
	if(denom > k_slop) {
		var bX = s.x - this.p1.x;
		var bY = s.y - this.p1.y;
		var a = bX * nX + bY * nY;
		if(0.0 <= a && a <= maxLambda * denom) {
			var mu2 = -rY * bY + rY * bX;
			if(-k_slop * denom <= mu2 && mu2 <= denom * (1.0 + k_slop)) {
				a /= denom;
				var nLen = Math.sqrt(nX * nX + nY * nY);
				nX /= nLen;
				nY /= nLen;
				lambda[0] = a;
				normal.x = nX;
				normal.y = nY;
				return true;
			}
		}
	}
	return false;
}
box2D.collision.B2Segment.prototype.p1 = null;
box2D.collision.B2Segment.prototype.p2 = null;
box2D.collision.B2Segment.prototype.__class__ = box2D.collision.B2Segment;
box2D.collision.B2BoundValues = function(p) {
	if( p === $_ ) return;
	this.lowerValues = [0,0];
	this.upperValues = [0,0];
}
box2D.collision.B2BoundValues.__name__ = ["box2D","collision","B2BoundValues"];
box2D.collision.B2BoundValues.prototype.lowerValues = null;
box2D.collision.B2BoundValues.prototype.upperValues = null;
box2D.collision.B2BoundValues.prototype.__class__ = box2D.collision.B2BoundValues;
box2D.collision.B2ContactID = function(p) {
	if( p === $_ ) return;
	this._key = 0;
	this.features = new box2D.collision.Features();
	this.features._m_id = this;
}
box2D.collision.B2ContactID.__name__ = ["box2D","collision","B2ContactID"];
box2D.collision.B2ContactID.prototype.key = null;
box2D.collision.B2ContactID.prototype.Set = function(id) {
	this.setKey(id._key);
}
box2D.collision.B2ContactID.prototype.Copy = function() {
	var id = new box2D.collision.B2ContactID();
	id.setKey(this.getKey());
	return id;
}
box2D.collision.B2ContactID.prototype.getKey = function() {
	return this._key;
}
box2D.collision.B2ContactID.prototype.setKey = function(value) {
	this._key = value;
	this.features._referenceEdge = this._key & 255;
	this.features._incidentEdge = (this._key & 65280) >> 8 & 255;
	this.features._incidentVertex = (this._key & 16711680) >> 16 & 255;
	this.features._flip = (this._key & -16777216) >> 24 & 255;
	return value;
}
box2D.collision.B2ContactID.prototype.features = null;
box2D.collision.B2ContactID.prototype._key = null;
box2D.collision.B2ContactID.prototype.__class__ = box2D.collision.B2ContactID;
EReg = function(r,opt) {
	if( r === $_ ) return;
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
}
EReg.__name__ = ["EReg"];
EReg.prototype.r = null;
EReg.prototype.match = function(s) {
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	return this.r.m != null;
}
EReg.prototype.matched = function(n) {
	return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this));
}
EReg.prototype.matchedLeft = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.l == null) return this.r.s.substr(0,this.r.m.index);
	return this.r.l;
}
EReg.prototype.matchedRight = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.r == null) {
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	return this.r.r;
}
EReg.prototype.matchedPos = function() {
	if(this.r.m == null) throw "No string matched";
	return { pos : this.r.m.index, len : this.r.m[0].length};
}
EReg.prototype.split = function(s) {
	var d = "#__delim__#";
	return s.replace(this.r,d).split(d);
}
EReg.prototype.replace = function(s,by) {
	return s.replace(this.r,by);
}
EReg.prototype.customReplace = function(s,f) {
	var buf = new StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.b[buf.b.length] = this.matchedLeft();
		buf.b[buf.b.length] = f(this);
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s;
	return buf.b.join("");
}
EReg.prototype.__class__ = EReg;
box2D.collision.shapes.B2PolygonDef = function(p) {
	if( p === $_ ) return;
	box2D.collision.shapes.B2ShapeDef.call(this);
	this.vertices = new Array();
	this.type = 1;
	this.vertexCount = 0;
	var _g = 0;
	while(_g < 8) {
		var i = _g++;
		this.vertices[i] = new box2D.common.math.B2Vec2();
	}
}
box2D.collision.shapes.B2PolygonDef.__name__ = ["box2D","collision","shapes","B2PolygonDef"];
box2D.collision.shapes.B2PolygonDef.__super__ = box2D.collision.shapes.B2ShapeDef;
for(var k in box2D.collision.shapes.B2ShapeDef.prototype ) box2D.collision.shapes.B2PolygonDef.prototype[k] = box2D.collision.shapes.B2ShapeDef.prototype[k];
box2D.collision.shapes.B2PolygonDef.prototype.SetAsBox = function(hx,hy) {
	this.vertexCount = 4;
	this.vertices[0].Set(-hx,-hy);
	this.vertices[1].Set(hx,-hy);
	this.vertices[2].Set(hx,hy);
	this.vertices[3].Set(-hx,hy);
}
box2D.collision.shapes.B2PolygonDef.prototype.SetAsOrientedBox = function(hx,hy,center,angle) {
	if(angle == null) angle = 0.0;
	this.vertexCount = 4;
	this.vertices[0].Set(-hx,-hy);
	this.vertices[1].Set(hx,-hy);
	this.vertices[2].Set(hx,hy);
	this.vertices[3].Set(-hx,hy);
	if(center != null) {
		var xfPosition = center;
		var xfR = box2D.collision.shapes.B2PolygonDef.s_mat;
		xfR.Set(angle);
		var _g1 = 0, _g = this.vertexCount;
		while(_g1 < _g) {
			var i = _g1++;
			center = this.vertices[i];
			hx = xfPosition.x + (xfR.col1.x * center.x + xfR.col2.x * center.y);
			center.y = xfPosition.y + (xfR.col1.y * center.x + xfR.col2.y * center.y);
			center.x = hx;
		}
	}
}
box2D.collision.shapes.B2PolygonDef.prototype.vertices = null;
box2D.collision.shapes.B2PolygonDef.prototype.vertexCount = null;
box2D.collision.shapes.B2PolygonDef.prototype.__class__ = box2D.collision.shapes.B2PolygonDef;
Xml = function(p) {
}
Xml.__name__ = ["Xml"];
Xml.Element = null;
Xml.PCData = null;
Xml.CData = null;
Xml.Comment = null;
Xml.DocType = null;
Xml.Prolog = null;
Xml.Document = null;
Xml.parse = function(str) {
	var rules = [Xml.enode,Xml.epcdata,Xml.eend,Xml.ecdata,Xml.edoctype,Xml.ecomment,Xml.eprolog];
	var nrules = rules.length;
	var current = Xml.createDocument();
	var stack = new List();
	while(str.length > 0) {
		var i = 0;
		try {
			while(i < nrules) {
				var r = rules[i];
				if(r.match(str)) {
					switch(i) {
					case 0:
						var x = Xml.createElement(r.matched(1));
						current.addChild(x);
						str = r.matchedRight();
						while(Xml.eattribute.match(str)) {
							x.set(Xml.eattribute.matched(1),Xml.eattribute.matched(3));
							str = Xml.eattribute.matchedRight();
						}
						if(!Xml.eclose.match(str)) {
							i = nrules;
							throw "__break__";
						}
						if(Xml.eclose.matched(1) == ">") {
							stack.push(current);
							current = x;
						}
						str = Xml.eclose.matchedRight();
						break;
					case 1:
						var x = Xml.createPCData(r.matched(0));
						current.addChild(x);
						str = r.matchedRight();
						break;
					case 2:
						if(current._children != null && current._children.length == 0) {
							var e = Xml.createPCData("");
							current.addChild(e);
						} else null;
						if(r.matched(1) != current._nodeName || stack.isEmpty()) {
							i = nrules;
							throw "__break__";
						} else null;
						current = stack.pop();
						str = r.matchedRight();
						break;
					case 3:
						str = r.matchedRight();
						if(!Xml.ecdata_end.match(str)) throw "End of CDATA section not found";
						var x = Xml.createCData(Xml.ecdata_end.matchedLeft());
						current.addChild(x);
						str = Xml.ecdata_end.matchedRight();
						break;
					case 4:
						var pos = 0;
						var count = 0;
						var old = str;
						try {
							while(true) {
								if(!Xml.edoctype_elt.match(str)) throw "End of DOCTYPE section not found";
								var p = Xml.edoctype_elt.matchedPos();
								pos += p.pos + p.len;
								str = Xml.edoctype_elt.matchedRight();
								switch(Xml.edoctype_elt.matched(0)) {
								case "[":
									count++;
									break;
								case "]":
									count--;
									if(count < 0) throw "Invalid ] found in DOCTYPE declaration";
									break;
								default:
									if(count == 0) throw "__break__";
								}
							}
						} catch( e ) { if( e != "__break__" ) throw e; }
						var x = Xml.createDocType(old.substr(10,pos - 11));
						current.addChild(x);
						break;
					case 5:
						if(!Xml.ecomment_end.match(str)) throw "Unclosed Comment";
						var p = Xml.ecomment_end.matchedPos();
						var x = Xml.createComment(str.substr(4,p.pos + p.len - 7));
						current.addChild(x);
						str = Xml.ecomment_end.matchedRight();
						break;
					case 6:
						var prolog = r.matched(0);
						var x = Xml.createProlog(prolog.substr(2,prolog.length - 4));
						current.addChild(x);
						str = r.matchedRight();
						break;
					}
					throw "__break__";
				}
				i += 1;
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		if(i == nrules) {
			if(str.length > 10) throw "Xml parse error : Unexpected " + str.substr(0,10) + "..."; else throw "Xml parse error : Unexpected " + str;
		}
	}
	if(!stack.isEmpty()) throw "Xml parse error : Unclosed " + stack.last().getNodeName();
	return current;
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.setNodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.setNodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.setNodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.setNodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.setNodeValue(data);
	return r;
}
Xml.createProlog = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype.nodeType = null;
Xml.prototype.nodeName = null;
Xml.prototype.nodeValue = null;
Xml.prototype.parent = null;
Xml.prototype._nodeName = null;
Xml.prototype._nodeValue = null;
Xml.prototype._attributes = null;
Xml.prototype._children = null;
Xml.prototype._parent = null;
Xml.prototype.getNodeName = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName;
}
Xml.prototype.setNodeName = function(n) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName = n;
}
Xml.prototype.getNodeValue = function() {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue;
}
Xml.prototype.setNodeValue = function(v) {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue = v;
}
Xml.prototype.getParent = function() {
	return this._parent;
}
Xml.prototype.get = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.get(att);
}
Xml.prototype.set = function(att,value) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.set(att,value);
}
Xml.prototype.remove = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.remove(att);
}
Xml.prototype.exists = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.exists(att);
}
Xml.prototype.attributes = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.keys();
}
Xml.prototype.iterator = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		return this.cur < this.x.length;
	}, next : function() {
		return this.x[this.cur++];
	}};
}
Xml.prototype.elements = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			if(this.x[k].nodeType == Xml.Element) break;
			k += 1;
		}
		this.cur = k;
		return k < l;
	}, next : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k += 1;
			if(n.nodeType == Xml.Element) {
				this.cur = k;
				return n;
			}
		}
		return null;
	}};
}
Xml.prototype.elementsNamed = function(name) {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			if(n.nodeType == Xml.Element && n._nodeName == name) break;
			k++;
		}
		this.cur = k;
		return k < l;
	}, next : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k++;
			if(n.nodeType == Xml.Element && n._nodeName == name) {
				this.cur = k;
				return n;
			}
		}
		return null;
	}};
}
Xml.prototype.firstChild = function() {
	if(this._children == null) throw "bad nodetype";
	return this._children[0];
}
Xml.prototype.firstElement = function() {
	if(this._children == null) throw "bad nodetype";
	var cur = 0;
	var l = this._children.length;
	while(cur < l) {
		var n = this._children[cur];
		if(n.nodeType == Xml.Element) return n;
		cur++;
	}
	return null;
}
Xml.prototype.addChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.push(x);
}
Xml.prototype.removeChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	var b = this._children.remove(x);
	if(b) x._parent = null;
	return b;
}
Xml.prototype.insertChild = function(x,pos) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.insert(pos,x);
}
Xml.prototype.toString = function() {
	if(this.nodeType == Xml.PCData) return this._nodeValue;
	if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
	if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
	if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
	if(this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
	var s = new StringBuf();
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "<";
		s.b[s.b.length] = this._nodeName;
		var $it0 = this._attributes.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			s.b[s.b.length] = " ";
			s.b[s.b.length] = k;
			s.b[s.b.length] = "=\"";
			s.b[s.b.length] = this._attributes.get(k);
			s.b[s.b.length] = "\"";
		}
		if(this._children.length == 0) {
			s.b[s.b.length] = "/>";
			return s.b.join("");
		}
		s.b[s.b.length] = ">";
	}
	var $it1 = this.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		s.b[s.b.length] = x.toString();
	}
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "</";
		s.b[s.b.length] = this._nodeName;
		s.b[s.b.length] = ">";
	}
	return s.b.join("");
}
Xml.prototype.__class__ = Xml;
if(typeof demo=='undefined') demo = {}
demo.Main = function(p) {
	if( p === $_ ) return;
	var canvas = js.Lib.document.getElementById("testCanvas");
	fboyle.utils.DisplayObjectUtil.setStage(canvas);
	fboyle.utils.DisplayObjectUtil.enableMouseOver(10);
	fboyle.display.JsLevelBase.call(this);
	this.playing = false;
	this.setup();
}
demo.Main.__name__ = ["demo","Main"];
demo.Main.__super__ = fboyle.display.JsLevelBase;
for(var k in fboyle.display.JsLevelBase.prototype ) demo.Main.prototype[k] = fboyle.display.JsLevelBase.prototype[k];
demo.Main.main = function() {
	new demo.Main();
}
demo.Main.prototype.simulation = null;
demo.Main.prototype.layout = null;
demo.Main.prototype.playing = null;
demo.Main.prototype.button = null;
demo.Main.prototype.setup = function() {
	this.simulation = new touchmypixel.game.simulations.Box2dSimulation(false,this.container,(function($this) {
		var $r;
		if(fboyle.utils.DisplayObjectUtil.stage == null) haxe.Log.trace("warning: canvas/stage hasn't been defined!",{ fileName : "DisplayObjectUtil.hx", lineNumber : 75, className : "fboyle.utils.DisplayObjectUtil", methodName : "getStage"});
		$r = fboyle.utils.DisplayObjectUtil.stage;
		return $r;
	}(this)));
	this.simulation.initGravity.y = 10;
	this.simulation.autoUpdateObjects = true;
	this.simulation.timeStep = 1 / 40;
	this.simulation.init();
	this.layout = new fboyle.layout.FlaBox2dLayout(haxe.Resource.getString("resources"));
	this.layout.buildLayout(this.layout.layouts.get("example"),this.simulation);
	this.button = this.simulation.nonGameObjects.get("playButton");
	fboyle.utils.ListenerUtil.addListener(this.button,fboyle.events.MouseEvent.CLICK,$closure(this,"onClicked"));
	fboyle.utils.MovieClipUtil.gotoAndStop(this.button,"1");
	this.layout.onFilesLoaded.add($closure(this,"onReady"));
	haxe.Log.trace("loading images...",{ fileName : "Main.hx", lineNumber : 67, className : "demo.Main", methodName : "setup"});
	((function($this) {
		var $r;
		if(fboyle.utils.DisplayObjectUtil.stage == null) haxe.Log.trace("warning: canvas/stage hasn't been defined!",{ fileName : "DisplayObjectUtil.hx", lineNumber : 75, className : "fboyle.utils.DisplayObjectUtil", methodName : "getStage"});
		$r = fboyle.utils.DisplayObjectUtil.stage;
		return $r;
	}(this))).addChild(this.container);
}
demo.Main.prototype.onReady = function(message) {
	haxe.Log.trace(message,{ fileName : "Main.hx", lineNumber : 75, className : "demo.Main", methodName : "onReady"});
	this.start();
	haxe.Timer.delay($closure(this,"stop"),200);
	this.playing = false;
	this.layout.onFilesLoaded.remove($closure(this,"onReady"));
}
demo.Main.prototype.onClicked = function(e) {
	if(!this.playing) {
		this.start();
		fboyle.utils.MovieClipUtil.gotoAndStop(this.button,"2");
	} else {
		fboyle.utils.MovieClipUtil.gotoAndStop(this.button,"1");
		haxe.Timer.delay($closure(this,"stop"),200);
	}
	this.playing = !this.playing;
}
demo.Main.prototype.update = function(dt) {
	fboyle.display.JsLevelBase.prototype.update.call(this,dt);
	var _g = 0, _g1 = this.simulation.objects;
	while(_g < _g1.length) {
		var o = _g1[_g];
		++_g;
		if(o.name == "logo1" || o.name == "logo2" || o.name == "logo3" || o.name == "logo4") {
			var body = ((function($this) {
				var $r;
				var $t = o;
				if(Std["is"]($t,touchmypixel.game.objects.Box2dBodyObject)) $t; else throw "Class cast error";
				$r = $t;
				return $r;
			}(this))).body;
			if(body.IsSleeping()) body.ApplyForce(new box2D.common.math.B2Vec2(0,-1000),new box2D.common.math.B2Vec2(body.GetPosition().x + 250,body.GetPosition().y + 1000));
		}
	}
	this.simulation.update(dt);
}
demo.Main.prototype.__class__ = demo.Main;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
haxe.Resource.content = [{ name : "resources", data : "s8855:PGxheW91dCBuYW1lPSJleGFtcGxlIiB4PSIwIiB5PSIwIiBzeD0iMSIgc3k9IjEiIHI9IjAiIHR5cGU9ImxheW91dCIgdz0iNjY1LjkiIGg9IjUwMC45Ij4KPGJvZHkgIG5hbWU9IiIgeD0iMzIwIiB5PSIxMCIgc3g9IjAuOTk5OTg0NzQxMjEwOTM3NSIgc3k9IjEiIHI9IjAiIGNhdGVnb3J5Qml0cz0iMHgxIiBkZWZpbml0aW9uPSIiIGRlbnNpdHk9IjEiIGZyaWN0aW9uPSIuNSIgZ3JpbmRhYmxlPSIwIiBpc0J1bGxldD0iZmFsc2UiIG9uZVdheT0iMHgwMDAwIiByZXN0aXR1dGlvbj0iLjUiIHN0YXRpYz0idHJ1ZSIgdHlwZT0iYm9yZGVyIj4KCTxwb2x5IHg9IjAiIHk9IjAiIHc9IjAiICBoPSIwIiByPSIwIiBzeD0iMSIgc3k9IjEiPgoJCTx2ZXJ0IHg9IjMyMC41IiB5PSIxMC40NSIgLz4KCQk8dmVydCB4PSIzMjAuNSIgeT0iLTEwLjQ1IiAvPgoJCTx2ZXJ0IHg9Ii0zMjAuNSIgeT0iLTEwLjQ1IiAvPgoJCTx2ZXJ0IHg9Ii0zMjAuNSIgeT0iMTAuNDUiIC8%Cgk8L3BvbHk%CjwvYm9keT4KPGJvZHkgIG5hbWU9IiIgeD0iMzIwIiB5PSI0OTAiIHN4PSIwLjk5OTk4NDc0MTIxMDkzNzUiIHN5PSIxIiByPSIwIiBjYXRlZ29yeUJpdHM9IjB4MSIgZGVmaW5pdGlvbj0iIiBkZW5zaXR5PSIxIiBmcmljdGlvbj0iLjUiIGdyaW5kYWJsZT0iMCIgaXNCdWxsZXQ9ImZhbHNlIiBvbmVXYXk9IjB4MDAwMCIgcmVzdGl0dXRpb249Ii41IiBzdGF0aWM9InRydWUiIHR5cGU9ImJvcmRlciI%Cgk8cG9seSB4PSIwIiB5PSIwIiB3PSIwIiAgaD0iMCIgcj0iMCIgc3g9IjEiIHN5PSIxIj4KCQk8dmVydCB4PSIzMjAuNSIgeT0iMTAuNDUiIC8%CgkJPHZlcnQgeD0iMzIwLjUiIHk9Ii0xMC40NSIgLz4KCQk8dmVydCB4PSItMzIwLjUiIHk9Ii0xMC40NSIgLz4KCQk8dmVydCB4PSItMzIwLjUiIHk9IjEwLjQ1IiAvPgoJPC9wb2x5Pgo8L2JvZHk%Cjxib2R5ICBuYW1lPSIiIHg9IjAiIHk9IjI0NyIgc3g9IjAuNzU2Nzc0OTAyMzQzNzUiIHN5PSIxIiByPSItOTAiIGNhdGVnb3J5Qml0cz0iMHgxIiBkZWZpbml0aW9uPSIiIGRlbnNpdHk9IjEiIGZyaWN0aW9uPSIuNSIgZ3JpbmRhYmxlPSIwIiBpc0J1bGxldD0iZmFsc2UiIG9uZVdheT0iMHgwMDAwIiByZXN0aXR1dGlvbj0iLjUiIHN0YXRpYz0idHJ1ZSIgdHlwZT0iYm9yZGVyIj4KCTxwb2x5IHg9IjAiIHk9IjAiIHc9IjAiICBoPSIwIiByPSIwIiBzeD0iMSIgc3k9IjEiPgoJCTx2ZXJ0IHg9IjMyMC41IiB5PSIxMC40NSIgLz4KCQk8dmVydCB4PSIzMjAuNSIgeT0iLTEwLjQ1IiAvPgoJCTx2ZXJ0IHg9Ii0zMjAuNSIgeT0iLTEwLjQ1IiAvPgoJCTx2ZXJ0IHg9Ii0zMjAuNSIgeT0iMTAuNDUiIC8%Cgk8L3BvbHk%CjwvYm9keT4KPGJvZHkgIG5hbWU9IiIgeD0iNjQ1IiB5PSIyNTMiIHN4PSIwLjc1Njc3NDkwMjM0Mzc1IiBzeT0iMSIgcj0iLTkwIiBjYXRlZ29yeUJpdHM9IjB4MSIgZGVmaW5pdGlvbj0iIiBkZW5zaXR5PSIxIiBmcmljdGlvbj0iLjUiIGdyaW5kYWJsZT0iMCIgaXNCdWxsZXQ9ImZhbHNlIiBvbmVXYXk9IjB4MDAwMCIgcmVzdGl0dXRpb249Ii41IiBzdGF0aWM9InRydWUiIHR5cGU9ImJvcmRlciI%Cgk8cG9seSB4PSIwIiB5PSIwIiB3PSIwIiAgaD0iMCIgcj0iMCIgc3g9IjEiIHN5PSIxIj4KCQk8dmVydCB4PSIzMjAuNSIgeT0iMTAuNDUiIC8%CgkJPHZlcnQgeD0iMzIwLjUiIHk9Ii0xMC40NSIgLz4KCQk8dmVydCB4PSItMzIwLjUiIHk9Ii0xMC40NSIgLz4KCQk8dmVydCB4PSItMzIwLjUiIHk9IjEwLjQ1IiAvPgoJPC9wb2x5Pgo8L2JvZHk%Cjxib2R5ICBuYW1lPSJsb2dvMiIgeD0iNTE4LjY1IiB5PSIxNTkuNSIgc3g9IjAuOTk4OTkyOTE5OTIxODc1IiBzeT0iMC45OTg5OTI5MTk5MjE4NzUiIHI9IjI5Ljk5OTg3NzkyOTY4NzUiIGNhdGVnb3J5Qml0cz0iMHgxIiBkZWZpbml0aW9uPSIiIGRlbnNpdHk9IjUuMDAiIGZyaWN0aW9uPSIuNSIgZ3JpbmRhYmxlPSIwIiBpc0J1bGxldD0iZmFsc2UiIG9uZVdheT0iMHgwMDAwIiByZXN0aXR1dGlvbj0iMC42MCIgc3RhdGljPSJmYWxzZSIgdHlwZT0icGFyYW1zIj4KCTxwb2x5IHg9Ii0wLjA1IiB5PSItMC4zNSIgdz0iMCIgIGg9IjAiIHI9IjAiIHN4PSIxIiBzeT0iMSI%CgkJPHZlcnQgeD0iLTcwLjk1IiB5PSI3MC44NSIgLz4KCQk8dmVydCB4PSI3MC44NSIgeT0iNzAuODUiIC8%CgkJPHZlcnQgeD0iNzAuODUiIHk9Ii03MS41IiAvPgoJCTx2ZXJ0IHg9Ii03MC45NSIgeT0iLTcxLjUiIC8%Cgk8L3BvbHk%CjxiaXRtYXAgIG5hbWU9IiIgeD0iLTcxLjUiIHk9Ii03MS41IiBzeD0iMSIgc3k9IjEiIHI9IjAiIGZpbGU9ImltYWdlcy9sb2dvLnBuZyIgbGlua2FnZT0ibG9nby5wbmciIC8%CjwvYm9keT4KPGJvZHkgIG5hbWU9ImxvZ28xIiB4PSIyMTkuNTUiIHk9IjIwNi4zNSIgc3g9IjAuNTcyODMwMjAwMTk1MzEyNSIgc3k9IjAuNTcyODMwMjAwMTk1MzEyNSIgcj0iLTE4LjkzNTIxMTE4MTY0MDYyNSIgY2F0ZWdvcnlCaXRzPSIweDEiIGRlZmluaXRpb249IiIgZGVuc2l0eT0iNS4wMCIgZnJpY3Rpb249Ii41IiBncmluZGFibGU9IjAiIGlzQnVsbGV0PSJmYWxzZSIgb25lV2F5PSIweDAwMDAiIHJlc3RpdHV0aW9uPSIwLjYwIiBzdGF0aWM9ImZhbHNlIiB0eXBlPSJwYXJhbXMiPgoJPHBvbHkgeD0iLTAuMDUiIHk9Ii0wLjM1IiB3PSIwIiAgaD0iMCIgcj0iMCIgc3g9IjEiIHN5PSIxIj4KCQk8dmVydCB4PSItNzAuOTUiIHk9IjcwLjg1IiAvPgoJCTx2ZXJ0IHg9IjcwLjg1IiB5PSI3MC44NSIgLz4KCQk8dmVydCB4PSI3MC44NSIgeT0iLTcxLjUiIC8%CgkJPHZlcnQgeD0iLTcwLjk1IiB5PSItNzEuNSIgLz4KCTwvcG9seT4KPGJpdG1hcCAgbmFtZT0iIiB4PSItNzEuNSIgeT0iLTcxLjUiIHN4PSIxIiBzeT0iMSIgcj0iMCIgZmlsZT0iaW1hZ2VzL2xvZ28ucG5nIiBsaW5rYWdlPSJsb2dvLnBuZyIgLz4KPC9ib2R5Pgo8Ym9keSAgbmFtZT0ibG9nbzQiIHg9IjEwMCIgeT0iMjM2IiBzeD0iMSIgc3k9IjEiIHI9IjAiIGNhdGVnb3J5Qml0cz0iMHgxIiBkZWZpbml0aW9uPSIiIGRlbnNpdHk9IjEiIGZyaWN0aW9uPSIuNSIgZ3JpbmRhYmxlPSIwIiBpc0J1bGxldD0iZmFsc2UiIG9uZVdheT0iMHgwMDAwIiByZXN0aXR1dGlvbj0iLjUiIHN0YXRpYz0iZmFsc2UiIHR5cGU9InBhcmFtcyI%Cgk8Y2lyY2xlIHg9IjAuNSIgeT0iMC41IiB3PSIxMTMiICBoPSIxMTMiIHI9IjAiIHN4PSIwLjk5ODIyOTk4MDQ2ODc1IiBzeT0iMC45OTgyMjk5ODA0Njg3NSIgLz4KPGJpdG1hcCAgbmFtZT0iIiB4PSItNTYiIHk9Ii01NiIgc3g9IjEiIHN5PSIxIiByPSIwIiBmaWxlPSJpbWFnZXMvZmxhc2hfbG9nbzMucG5nIiBsaW5rYWdlPSJmbGFzaF9sb2dvMy5wbmciIC8%CjwvYm9keT4KPGJvZHkgIG5hbWU9ImxvZ281IiB4PSIxMjQiIHk9Ijk4LjI1IiBzeD0iMSIgc3k9IjEiIHI9IjAiIGNhdGVnb3J5Qml0cz0iMHgxIiBkZWZpbml0aW9uPSIiIGRlbnNpdHk9IjEiIGZyaWN0aW9uPSIuNSIgZ3JpbmRhYmxlPSIwIiBpc0J1bGxldD0iZmFsc2UiIG9uZVdheT0iMHgwMDAwIiByZXN0aXR1dGlvbj0iLjUiIHN0YXRpYz0iZmFsc2UiIHR5cGU9InBhcmFtcyI%Cgk8cG9seSB4PSIwLjEiIHk9Ii01NS4xNSIgdz0iMCIgIGg9IjAiIHI9IjAiIHN4PSIxIiBzeT0iMSI%CgkJPHZlcnQgeD0iLTM3LjUiIHk9Ii04Ljg5OTk5OTk5OTk5OTk5OSIgLz4KCQk8dmVydCB4PSItMzcuNSIgeT0iOC44OTk5OTk5OTk5OTk5OTkiIC8%CgkJPHZlcnQgeD0iMzcuNSIgeT0iOC44OTk5OTk5OTk5OTk5OTkiIC8%CgkJPHZlcnQgeD0iMzcuNSIgeT0iLTguODk5OTk5OTk5OTk5OTk5IiAvPgoJPC9wb2x5PgoJPHBvbHkgeD0iMC4yIiB5PSItMC4wNSIgdz0iMCIgIGg9IjAiIHI9IjAiIHN4PSIxIiBzeT0iMSI%CgkJPHZlcnQgeD0iLTM3LjMiIHk9IjUzLjEiIC8%CgkJPHZlcnQgeD0iMCIgeT0iNjQiIC8%CgkJPHZlcnQgeD0iMzcuMyIgeT0iNTMuMSIgLz4KCQk8dmVydCB4PSI0NS4xIiB5PSItMzguMyIgLz4KCQk8dmVydCB4PSItNDQuNyIgeT0iLTM4LjMiIC8%Cgk8L3BvbHk%CjxiaXRtYXAgIG5hbWU9IiIgeD0iLTQ2IiB5PSItNjQiIHN4PSIxIiBzeT0iMSIgcj0iMCIgZmlsZT0iaW1hZ2VzL0hUTUw1X0xvZ29fMTI4LnBuZyIgbGlua2FnZT0iSFRNTDVfTG9nb18xMjgucG5nIiAvPgo8L2JvZHk%Cjxib2R5ICBuYW1lPSJsb2dvMyIgeD0iMzIxIiB5PSIxMDIuNCIgc3g9IjAuNjMxODM1OTM3NSIgc3k9IjAuNjMxODM1OTM3NSIgcj0iMCIgY2F0ZWdvcnlCaXRzPSIweDEiIGRlZmluaXRpb249IiIgZGVuc2l0eT0iMSIgZnJpY3Rpb249Ii41IiBncmluZGFibGU9IjAiIGlzQnVsbGV0PSJmYWxzZSIgb25lV2F5PSIweDAwMDAiIHJlc3RpdHV0aW9uPSIuNSIgc3RhdGljPSJmYWxzZSIgdHlwZT0icGFyYW1zIj4KCTxjaXJjbGUgeD0iMC41IiB5PSIwLjUiIHc9IjExMyIgIGg9IjExMyIgcj0iMCIgc3g9IjAuOTk4MjI5OTgwNDY4NzUiIHN5PSIwLjk5ODIyOTk4MDQ2ODc1IiAvPgo8Yml0bWFwICBuYW1lPSIiIHg9Ii01NiIgeT0iLTU2IiBzeD0iMSIgc3k9IjEiIHI9IjAiIGZpbGU9ImltYWdlcy9mbGFzaF9sb2dvMy5wbmciIGxpbmthZ2U9ImZsYXNoX2xvZ28zLnBuZyIgLz4KPC9ib2R5Pgo8Ym9keSAgbmFtZT0ibG9nbzMiIHg9IjU4OC4yIiB5PSI2Mi40IiBzeD0iMC42MzE4MzU5Mzc1IiBzeT0iMC42MzE4MzU5Mzc1IiByPSIwIiBjYXRlZ29yeUJpdHM9IjB4MSIgZGVmaW5pdGlvbj0iIiBkZW5zaXR5PSIxIiBmcmljdGlvbj0iLjUiIGdyaW5kYWJsZT0iMCIgaXNCdWxsZXQ9ImZhbHNlIiBvbmVXYXk9IjB4MDAwMCIgcmVzdGl0dXRpb249Ii41IiBzdGF0aWM9ImZhbHNlIiB0eXBlPSJwYXJhbXMiPgoJPGNpcmNsZSB4PSIwLjUiIHk9IjAuNSIgdz0iMTEzIiAgaD0iMTEzIiByPSIwIiBzeD0iMC45OTgyMjk5ODA0Njg3NSIgc3k9IjAuOTk4MjI5OTgwNDY4NzUiIC8%CjxiaXRtYXAgIG5hbWU9IiIgeD0iLTU2IiB5PSItNTYiIHN4PSIxIiBzeT0iMSIgcj0iMCIgZmlsZT0iaW1hZ2VzL2ZsYXNoX2xvZ28zLnBuZyIgbGlua2FnZT0iZmxhc2hfbG9nbzMucG5nIiAvPgo8L2JvZHk%Cjxib2R5ICBuYW1lPSJsb2dvMyIgeD0iMjY2LjYiIHk9IjMyOC40IiBzeD0iMC42MzE4MzU5Mzc1IiBzeT0iMC42MzE4MzU5Mzc1IiByPSIwIiBjYXRlZ29yeUJpdHM9IjB4MSIgZGVmaW5pdGlvbj0iIiBkZW5zaXR5PSIxIiBmcmljdGlvbj0iLjUiIGdyaW5kYWJsZT0iMCIgaXNCdWxsZXQ9ImZhbHNlIiBvbmVXYXk9IjB4MDAwMCIgcmVzdGl0dXRpb249Ii41IiBzdGF0aWM9ImZhbHNlIiB0eXBlPSJwYXJhbXMiPgoJPGNpcmNsZSB4PSIwLjUiIHk9IjAuNSIgdz0iMTEzIiAgaD0iMTEzIiByPSIwIiBzeD0iMC45OTgyMjk5ODA0Njg3NSIgc3k9IjAuOTk4MjI5OTgwNDY4NzUiIC8%CjxiaXRtYXAgIG5hbWU9IiIgeD0iLTU2IiB5PSItNTYiIHN4PSIxIiBzeT0iMSIgcj0iMCIgZmlsZT0iaW1hZ2VzL2ZsYXNoX2xvZ28zLnBuZyIgbGlua2FnZT0iZmxhc2hfbG9nbzMucG5nIiAvPgo8L2JvZHk%Cjxib2R5ICBuYW1lPSJsb2dvMyIgeD0iNTY5IiB5PSIzMDEuMiIgc3g9IjAuNjMxODM1OTM3NSIgc3k9IjAuNjMxODM1OTM3NSIgcj0iMCIgY2F0ZWdvcnlCaXRzPSIweDEiIGRlZmluaXRpb249IiIgZGVuc2l0eT0iMSIgZnJpY3Rpb249Ii41IiBncmluZGFibGU9IjAiIGlzQnVsbGV0PSJmYWxzZSIgb25lV2F5PSIweDAwMDAiIHJlc3RpdHV0aW9uPSIuNSIgc3RhdGljPSJmYWxzZSIgdHlwZT0icGFyYW1zIj4KCTxjaXJjbGUgeD0iMC41IiB5PSIwLjUiIHc9IjExMyIgIGg9IjExMyIgcj0iMCIgc3g9IjAuOTk4MjI5OTgwNDY4NzUiIHN5PSIwLjk5ODIyOTk4MDQ2ODc1IiAvPgo8Yml0bWFwICBuYW1lPSIiIHg9Ii01NiIgeT0iLTU2IiBzeD0iMSIgc3k9IjEiIHI9IjAiIGZpbGU9ImltYWdlcy9mbGFzaF9sb2dvMy5wbmciIGxpbmthZ2U9ImZsYXNoX2xvZ28zLnBuZyIgLz4KPC9ib2R5Pgo8Ym9keSAgbmFtZT0iIiB4PSIzMDIuNiIgeT0iMTQ5LjQ1IiBzeD0iMSIgc3k9IjEiIHI9IjAiIGNhdGVnb3J5Qml0cz0iMHgxIiBkZWZpbml0aW9uPSIiIGRlbnNpdHk9IjYuMDAiIGZyaWN0aW9uPSIyLjAwIiBncmluZGFibGU9IjAiIGlzQnVsbGV0PSJmYWxzZSIgb25lV2F5PSIweDAwMDAiIHJlc3RpdHV0aW9uPSIwLjMwIiBzdGF0aWM9ImZhbHNlIiB0eXBlPSJwYXJhbXMiPgoJPHBvbHkgeD0iNTAiIHk9IjY4IiB3PSIwIiAgaD0iMCIgcj0iMCIgc3g9IjEiIHN5PSIxIj4KCQk8dmVydCB4PSItNTAiIHk9IjY4IiAvPgoJCTx2ZXJ0IHg9IjUwIiB5PSI2OCIgLz4KCQk8dmVydCB4PSI1MCIgeT0iLTY4IiAvPgoJCTx2ZXJ0IHg9Ii01MCIgeT0iLTY4IiAvPgoJPC9wb2x5Pgo8Yml0bWFwICBuYW1lPSIiIHg9IjAiIHk9IjAiIHN4PSIxIiBzeT0iMSIgcj0iMCIgZmlsZT0iaW1hZ2VzL2hheGVfbG9nby5qcGciIGxpbmthZ2U9ImhheGVfbG9nby5qcGciIC8%CjwvYm9keT4KPG1vdmllY2xpcCBuYW1lPSJwbGF5QnV0dG9uIiBsaW5rYWdlSWQ9ImJ1dHRvbl9tYyIgeD0iNTkxLjU1IiB5PSIyMy45NSIgZmlsZT0iaW1hZ2VzL2J1dHRvbl9zdGF0ZXMucG5nIiBzaGVldGluZGljaWVzPSIwLDEsMiIgZnJhbWVXaWR0aD0iNDAuMDAiIGZyYW1lSGVpZ2h0PSI0MC4wMCIgcj0iMCIgc3g9IjEiIHN5PSIxIiByZWdYPSIwIiByZWdZPSIwIj4KPC9tb3ZpZWNsaXA%CjwvbGF5b3V0Pgo"}];
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
	Xml.Element = "element";
	Xml.PCData = "pcdata";
	Xml.CData = "cdata";
	Xml.Comment = "comment";
	Xml.DocType = "doctype";
	Xml.Prolog = "prolog";
	Xml.Document = "document";
}
box2D.dynamics.contacts.B2Contact.e_nonSolidFlag = 1;
box2D.dynamics.contacts.B2Contact.e_slowFlag = 2;
box2D.dynamics.contacts.B2Contact.e_islandFlag = 4;
box2D.dynamics.contacts.B2Contact.e_toiFlag = 8;
box2D.dynamics.contacts.B2Contact.s_initialized = false;
box2D.dynamics.contacts.B2PolyAndCircleContact.s_evalCP = new box2D.collision.B2ContactPoint();
box2D.collision.B2BroadPhase.s_validate = false;
box2D.collision.B2BroadPhase.b2_invalid = 65535;
box2D.collision.B2BroadPhase.b2_nullEdge = 65535;
box2D.dynamics.B2Island.s_reportCR = new box2D.dynamics.contacts.B2ContactResult();
box2D.dynamics.B2Body.s_massData = new box2D.collision.shapes.B2MassData();
box2D.dynamics.B2Body.s_xf1 = new box2D.common.math.B2XForm();
box2D.dynamics.B2Body.e_frozenFlag = 2;
box2D.dynamics.B2Body.e_islandFlag = 4;
box2D.dynamics.B2Body.e_sleepFlag = 8;
box2D.dynamics.B2Body.e_allowSleepFlag = 16;
box2D.dynamics.B2Body.e_bulletFlag = 32;
box2D.dynamics.B2Body.e_fixedRotationFlag = 64;
box2D.dynamics.B2Body.e_staticType = 1;
box2D.dynamics.B2Body.e_dynamicType = 2;
box2D.dynamics.B2Body.e_maxTypes = 3;
box2D.dynamics.B2ContactFilter.b2_defaultFilter = new box2D.dynamics.B2ContactFilter();
fboyle.utils.EaselLoader.loaded = new Hash();
box2D.dynamics.contacts.B2PolygonContact.s_evalCP = new box2D.collision.B2ContactPoint();
box2D.dynamics.B2World.s_jointColor = new box2D.common.B2Color(0.5,0.8,0.8);
box2D.dynamics.B2World.s_coreColor = new box2D.common.B2Color(0.9,0.6,0.6);
box2D.dynamics.B2World.s_xf = new box2D.common.math.B2XForm();
box2D.common.B2Settings.USHRT_MAX_CONST_CONST = 65535;
box2D.common.B2Settings.b2_pi = Math.PI;
box2D.common.B2Settings.b2_maxManifoldPoints = 2;
box2D.common.B2Settings.b2_maxPolygonVertices = 8;
box2D.common.B2Settings.b2_maxProxies = 512;
box2D.common.B2Settings.b2_maxPairs = 4096;
box2D.common.B2Settings.b2_linearSlop = 0.005;
box2D.common.B2Settings.b2_angularSlop = 2.0 / 180.0 * Math.PI;
box2D.common.B2Settings.b2_toiSlop = 8.0 * box2D.common.B2Settings.b2_linearSlop;
box2D.common.B2Settings.b2_maxTOIContactsPerIsland = 32;
box2D.common.B2Settings.b2_velocityThreshold = 1.0;
box2D.common.B2Settings.b2_maxLinearCorrection = 0.2;
box2D.common.B2Settings.b2_maxAngularCorrection = 8.0 / 180.0 * Math.PI;
box2D.common.B2Settings.b2_maxLinearVelocity = 200.0;
box2D.common.B2Settings.b2_maxLinearVelocitySquared = 40000.;
box2D.common.B2Settings.b2_maxAngularVelocity = 250.0;
box2D.common.B2Settings.b2_maxAngularVelocitySquared = 62500.;
box2D.common.B2Settings.b2_contactBaumgarte = 0.2;
box2D.common.B2Settings.b2_timeToSleep = 0.5;
box2D.common.B2Settings.b2_linearSleepTolerance = 0.01;
box2D.common.B2Settings.b2_angularSleepTolerance = 2.0 / 180.0;
box2D.collision.B2Distance.s_p1s = [new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2()];
box2D.collision.B2Distance.s_p2s = [new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2()];
box2D.collision.B2Distance.s_points = [new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2()];
box2D.collision.B2Distance.gPoint = new box2D.collision.B2Point();
box2D.collision.B2Distance.g_GJK_Iterations = 0;
box2D.dynamics.B2ContactManager.s_evalCP = new box2D.collision.B2ContactPoint();
js.Lib.onerror = null;
box2D.common.math.B2Math.MIN_VALUE = 5.0e-324;
box2D.common.math.B2Math.MAX_VALUE = 2.0 + 308;
box2D.common.math.B2Math.b2Vec2_zero = new box2D.common.math.B2Vec2(0.0,0.0);
box2D.common.math.B2Math.b2Mat22_identity = new box2D.common.math.B2Mat22(0.0,new box2D.common.math.B2Vec2(1.0,0.0),new box2D.common.math.B2Vec2(0.0,1.0));
box2D.common.math.B2Math.b2XForm_identity = new box2D.common.math.B2XForm(box2D.common.math.B2Math.b2Vec2_zero,box2D.common.math.B2Math.b2Mat22_identity);
box2D.dynamics.joints.B2Joint.e_unknownJoint = 0;
box2D.dynamics.joints.B2Joint.e_revoluteJoint = 1;
box2D.dynamics.joints.B2Joint.e_prismaticJoint = 2;
box2D.dynamics.joints.B2Joint.e_distanceJoint = 3;
box2D.dynamics.joints.B2Joint.e_pulleyJoint = 4;
box2D.dynamics.joints.B2Joint.e_mouseJoint = 5;
box2D.dynamics.joints.B2Joint.e_gearJoint = 6;
box2D.dynamics.joints.B2Joint.e_inactiveLimit = 0;
box2D.dynamics.joints.B2Joint.e_atLowerLimit = 1;
box2D.dynamics.joints.B2Joint.e_atUpperLimit = 2;
box2D.dynamics.joints.B2Joint.e_equalLimits = 3;
box2D.dynamics.joints.B2RevoluteJoint.tImpulse = new box2D.common.math.B2Vec2();
box2D.collision.shapes.B2Shape.s_proxyAABB = new box2D.collision.B2AABB();
box2D.collision.shapes.B2Shape.s_syncAABB = new box2D.collision.B2AABB();
box2D.collision.shapes.B2Shape.s_resetAABB = new box2D.collision.B2AABB();
box2D.collision.shapes.B2Shape.e_unknownShape = -1;
box2D.collision.shapes.B2Shape.e_circleShape = 0;
box2D.collision.shapes.B2Shape.e_polygonShape = 1;
box2D.collision.shapes.B2Shape.e_shapeTypeCount = 2;
box2D.dynamics.joints.B2PulleyJoint.b2_minPulleyLength = 2.0;
box2D.dynamics.contacts.B2CircleContact.s_evalCP = new box2D.collision.B2ContactPoint();
box2D.collision.B2Collision.b2_nullFeature = 255;
box2D.collision.B2Collision.b2CollidePolyTempVec = new box2D.common.math.B2Vec2();
box2D.collision.B2Pair.b2_nullPair = 65535;
box2D.collision.B2Pair.b2_nullProxy = 65535;
box2D.collision.B2Pair.b2_tableCapacity = box2D.common.B2Settings.b2_maxPairs;
box2D.collision.B2Pair.b2_tableMask = box2D.common.B2Settings.b2_maxPairs - 1;
box2D.collision.B2Pair.e_pairBuffered = 1;
box2D.collision.B2Pair.e_pairRemoved = 2;
box2D.collision.B2Pair.e_pairFinal = 4;
box2D.collision.B2TimeOfImpact.s_p1 = new box2D.common.math.B2Vec2();
box2D.collision.B2TimeOfImpact.s_p2 = new box2D.common.math.B2Vec2();
box2D.collision.B2TimeOfImpact.s_xf1 = new box2D.common.math.B2XForm();
box2D.collision.B2TimeOfImpact.s_xf2 = new box2D.common.math.B2XForm();
fboyle.utils.EaselLoadUtil.loaded = new Hash();
haxe.Timer.arr = new Array();
touchmypixel.game.ds.ObjectHash.registeredObjects = new IntHash();
touchmypixel.game.ds.ObjectHash.i = 0;
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
box2D.collision.shapes.B2PolygonShape.s_computeMat = new box2D.common.math.B2Mat22();
box2D.collision.shapes.B2PolygonShape.s_sweptAABB1 = new box2D.collision.B2AABB();
box2D.collision.shapes.B2PolygonShape.s_sweptAABB2 = new box2D.collision.B2AABB();
box2D.dynamics.B2DebugDraw.e_shapeBit = 1;
box2D.dynamics.B2DebugDraw.e_jointBit = 2;
box2D.dynamics.B2DebugDraw.e_coreShapeBit = 4;
box2D.dynamics.B2DebugDraw.e_aabbBit = 8;
box2D.dynamics.B2DebugDraw.e_obbBit = 16;
box2D.dynamics.B2DebugDraw.e_pairBit = 32;
box2D.dynamics.B2DebugDraw.e_centerOfMassBit = 64;
fboyle.events.MouseEvent.CLICK = "onClick";
fboyle.events.MouseEvent.ROLL_OVER = "onMouseOver";
fboyle.events.MouseEvent.ROLL_OUT = "onMouseOut";
fboyle.events.MouseEvent.MOUSE_MOVE = "onMouseMove";
fboyle.events.MouseEvent.MOUSE_DOWN = "onPress";
fboyle.events.MouseEvent.MOUSE_UP = "onMouseOut";
box2D.collision.shapes.B2PolygonDef.s_mat = new box2D.common.math.B2Mat22();
Xml.enode = new EReg("^<([a-zA-Z0-9:_-]+)","");
Xml.ecdata = new EReg("^<!\\[CDATA\\[","i");
Xml.edoctype = new EReg("^<!DOCTYPE ","i");
Xml.eend = new EReg("^</([a-zA-Z0-9:_-]+)>","");
Xml.epcdata = new EReg("^[^<]+","");
Xml.ecomment = new EReg("^<!--","");
Xml.eprolog = new EReg("^<\\?[^\\?]+\\?>","");
Xml.eattribute = new EReg("^\\s*([a-zA-Z0-9:_-]+)\\s*=\\s*([\"'])([^\\2]*?)\\2","");
Xml.eclose = new EReg("^[ \r\n\t]*(>|(/>))","");
Xml.ecdata_end = new EReg("\\]\\]>","");
Xml.edoctype_elt = new EReg("[\\[|\\]>]","");
Xml.ecomment_end = new EReg("-->","");
demo.Main.main()