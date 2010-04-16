/**
 * ...
 * @author Tonypee
 */

package hxs;
import hxs.core.SignalBase;
import hxs.extras.Trigger;

class Signal1 < T1 > extends SignalBase<T1->Void>
{
	
	public function new() 
	{ 
		super(); 
	}
	
	public function dispatch(a:T1)
	{
		for (slot in slots) 
		{
			if (isMuted) return;
			if (slot.isMuted) continue;
			SignalInfo.currentSignal = this; 
			SignalInfo.currentSlot = slot; 
			slot.listener(a);
			onFireSlot(slot);
		}
	}
	
	public function getTrigger(a:T1):Trigger
	{
		var _this = this;
		return new Trigger( function() _this.dispatch(a) );
	}
	
}