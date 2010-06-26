/**
 * ...
 * @author Tonypee
 */

package com.touchmypixel.game.ds;
import com.touchmypixel.game.ds.IObjectHashable;
import cashcompare.catch2.core.Object;

#if flash

import flash.utils.TypedDictionary;

typedef ObjectHash<T> = TypedDictionary<Dynamic, T>

#else

class ObjectHash < T >
{
	public var values:IntHash<T>;
	
	public function new()
	{
		values = new IntHash();
	}
	
	public function set(object:IObjectHashable, value:Dynamic):Void
	{
		check(object);
		values.set(object.__objectId, value);
	}
	
	public function get(object:IObjectHashable):T
	{
		check(object);
		return cast values.get(object.__objectId);
	}
	
	public inline function remove(object:IObjectHashable):Void
	{
		check(object);
		values.remove(object.__objectId);
	}
	
	public inline function exists(object:IObjectHashable):Bool
	{
		check(object);
		return values.exists(object.__objectId);
	}
	
	public inline function iterator()
	{
		return values.iterator();
	}
	
	public function keys():Iterator<Dynamic>
	{
		return new ObjectHashKeyIterator(this);
	}
	
	private inline function check(object):Void
	{
		if (object.__objectId == null)
			throw "Object: " + object + " is not registered with the ObjectHash manager";
	}
	
	/***************/
	
	private static var registeredObjects:IntHash<IObjectHashable> = new IntHash();
	private static var i:Int = 0;
	
	public static inline function register(object:IObjectHashable)
	{
		var id = i++;
		registeredObjects.set(id, object);
		object.__objectId = id;
	}
	
	public static inline function deregister(object:IObjectHashable)
	{
		registeredObjects.remove(object.__objectId);
	
	}
	public static inline function getObject(id:Int):IObjectHashable
	{
		return registeredObjects.get(id);
	}
	
	public static inline function reset()
	{
		for (key in registeredObjects.keys())
			registeredObjects.remove(key);
			
		i = 0;
	}
	
	/***************/
	
}

class ObjectHashKeyIterator<T>
{
	var _h:ObjectHash<T>;
	var it:Iterator<Int>;
	
	public function new(objectHash:ObjectHash<T>)
	{
		_h = objectHash;
		reset();
	}
	
	public inline function reset()
	{
		it = _h.values.keys();
	}
	
	public inline function hasNext():Bool
	{
		return it.hasNext();
	}
	
	public inline function next():T
	{
		return cast ObjectHash.getObject(it.next());
	}
}

#end
