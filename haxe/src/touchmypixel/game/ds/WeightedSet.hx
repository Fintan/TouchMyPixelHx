/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.ds;

class WeightedSet < T >
{
	public var items:Array<WeightedSetItem<T>>;
	
	public function new() 
	{
		items = [];
	}
	
	public function addItem(object:T, weight:Float)
	{
		var c = 0;
		for (item in items)
		{
			if (weight > item.weight)
				break;
			c++;
		}
		items.insert(c, { item:object, weight:weight } );
	}
	
	public function getTotalWeight()
	{
		var totalWeight:Float = 0;
		for (item in items) 
			totalWeight += item.weight;
		return totalWeight;
	}
	
	public function getRandom():T
	{
		var r = Math.random() * getTotalWeight();
		
		var sum:Float= 0;
		for(item in items)
		{
			sum += item.weight;
			if (sum > r) 
				return item.item;
		}
		
		return null;
	}
	
	public function toArray()
	{
		var arr = [];
		for (i in items)
			arr.push(i.item);
		return arr;
	}
	
	public function iterator()
	{
		return new WeightedSetIterator(this);
	}
	
	public function length()
	{
		return items.length;
	}
}

class WeightedSetIterator<T>
{
	public var q:WeightedSet<T>;
	public var i:Int;
	
	public function new(q:WeightedSet<T>)
	{
		this.q = q;
		reset();
	}
	
	public function reset()
	{
		i = 0;
	}
	
	public function hasNext():Bool
	{
		return i < q.items.length;
	}
	public function next():T
	{
		return q.items[i++].item;
	}
}

typedef WeightedSetItem<T> =
{
	var item:T;
	var weight:Float;
}