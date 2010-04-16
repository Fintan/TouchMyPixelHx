/**
 * ...
 * @author Tonypee
 */

package hxs;

import hxs.core.SignalBase;
import hxs.extras.Trigger;
import hxs.extras.SignalInfo;

class Signal2 <T1,T2> extends SignalBase<T1->T2->Void>
{
	public function new(?caller:Dynamic) 
	{ 
		super(caller); 
	}
	
	public function dispatch(a:T1, b:T2)
	{
		for (slot in slots) 
		{
			if (isMuted) return;
			if (slot.isMuted) continue;
			SignalInfo.currentSignal = this; 
			SignalInfo.currentSlot = slot; 
			slot.listener(a, b);
			onFireSlot(slot);
		}
	}
	
	public function getTrigger(a:T1, b:T2):Trigger
	{
		var _this = this;
		return new Trigger( function() _this.dispatch(a, b) );
	}
}