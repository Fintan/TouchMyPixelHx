/**
 * ...
 * @author Tonypee
 */

package hxs.core;

import hxs.core.PriorityQueue;

class SignalBase < T >
{
	private var slots:PriorityQueue<Slot<T>>;
	public var isMuted:Bool;
	public var target:Dynamic;
	
	public function new(?caller:Dynamic) 
	{
		slots = new PriorityQueue();
		
		target = caller;
		
		isMuted = false;
	}
	
	public function add(listener:T, ?priority:Int=0, ?runCount:Int=-1):Void
	{
		remove(listener);
		
		slots.add({listener:listener, remainingCalls:runCount, isMuted:false},priority);
	}
	
	public function addOnce(listener:T, ?priority:Int = 0):Void
	{
		add(listener, priority, 1);
	}
	
	public function remove(listener:T):Void
	{
		for (i in slots)
			if (i.listener == listener)
				slots.remove(i);
	}
	
	public function removeAll():Void
	{
		slots = new PriorityQueue();
	}
	
	/***** MUTING ****/
	
	public function mute():Void
	{
		isMuted = true;
	}
	
	public function unmute():Void
	{
		isMuted = false;
	}
	
	public function muteListener(listener:T):Void
	{
		for (i in slots.items)
			if (i.item.listener == listener)
				i.item.isMuted = true;
	}
	
	public function unmuteListener(listener:T):Void
	{
		for (i in slots.items)
			if (i.item.listener == listener)
				i.item.isMuted = false;
	}
	
	/***** PRIVATE ****/
	
	private function onFireSlot(slot:Slot<T>)
	{
		if (slot.remainingCalls != -1)
			if (--slot.remainingCalls <= 0)
				remove(slot.listener);
	}
}

typedef Slot<T> =
{
	var listener:T;
	var remainingCalls:Int;
	var isMuted:Bool;
}