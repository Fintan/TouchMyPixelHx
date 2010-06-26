/**
 * ...
 * @author Tony Polinelli
 */

package hxloader;

class Queue<T>
{
	public var items:Array<{item:T, priority:Int}>;
	public var length(getLength, null):Int;
	
	public function new() 
	{
		items = [];
	}
	
	public function next():T
	{
		return items[0].item;
	}
	public function hasNext():Bool
	{
		return items.length > 0;
	}
	
	public function shift():T
	{
		return items.shift().item;
	}
	
	public function pop():T
	{
		return items.pop().item;
	}
	
	public function add(item:T, ?priority:Int=0):{item:T, priority:Int}
	{
		var data = { item:item, priority:priority };
		if (data.priority < 0) 
			data.priority = 0;
		
		var c = items.length;
		while (c-- > 0)
			if (items[c].priority >= priority)
				break;
			
		items.insert(c+1, data);
		
		return data;
	}
	
	public function remove(item:T)
	{
		for (i in items)
			if (i.item == item)
				items.remove(i);
	}
	
	public function get(item:T): { item:T, priority:Int }
	{
		for (i in items)
			if (i.item == item)
				return i;
		return null;
	}
	
	function getLength()
	{
		return items.length;
	}
	
	public function resort()
	{
		var a = items.copy();
		items = [];
		for (i in a)
			add(i.item, i.priority);	
	}
	
}