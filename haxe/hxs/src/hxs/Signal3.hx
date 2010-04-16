/**
 * ...
 * @author Tonypee
 */

package hxs;

import hxs.core.SignalBase;
import hxs.extras.Trigger;
import hxs.extras.SignalInfo;

class Signal3 <T1,T2,T3> extends SignalBase<T1->T2->T3->Void>
{
	public function new(?caller:Dynamic) 
	{ 
		super(caller); 
	}
	
	public function dispatch(a:T1, b:T2, c:T3)
	{
		for (slot in slots) 
		{
			if (isMuted) return;
			if (slot.isMuted) continue;
			SignalInfo.currentSignal = this; 
			SignalInfo.currentSlot = slot; 
			slot.listener(a, b, c);
			onFireSlot(slot);
		}
	}
	
	public function getTrigger(a:T1, b:T2, c:T3):Trigger
	{
		var _this = this;
		return new Trigger( function() _this.dispatch(a, b, c) );
	}
	
}