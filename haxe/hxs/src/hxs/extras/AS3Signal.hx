/**
 * ...
 * @author Tonypee
 */

package hxs.extras;
import hxs.core.SignalBase;
import flash.events.IEventDispatcher;
import hxs.SignalInfo;

class AS3Signal<EventType> extends SignalBase <EventType->Void>
{
	var event:String;
	
	
	public function new(target:IEventDispatcher, event:String) 
	{
		super();
		
		this.target = target;
		this.event = event;
	}
	
	public function dispatch(e:EventType)
    {
		for (slot in slots) 
		{
			if (isMuted) return;
			if (slot.isMuted) continue;
			SignalInfo.currentSignal = this; 
			SignalInfo.currentSlot = slot; 
			slot.listener(e);
		}
    }
	
	override public function add(listener:EventType->Void, ?priority:Int = 0, ?runCount:Int=-1):Void
    {
		if (slots.length == 0)
			target.addEventListener(event, callback(dispatch) );
		
		super.add(listener, priority, runCount);
	}
	
	override public function remove(listener:EventType->Void):Void
    {
		var r = super.remove(listener);
		
		if (slots.length == 0)
			target.removeEventListener(event, dispatch);
	}
	
	override public function removeAll()
	{
		super.removeAll();
		
		target.removeEventListener(event, dispatch);
	}
}