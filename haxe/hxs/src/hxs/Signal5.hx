/**
 * ...
 * @author Tonypee
 */

package hxs;

import hxs.core.SignalBase;
import hxs.extras.Trigger;
import hxs.extras.SignalInfo;

class Signal5 <T1,T2,T3,T4,T5> extends SignalBase<T1->T2->T3->T4->T5->Void>
{
	public function new(?caller:Dynamic) 
	{ 
		super(caller); 
	}
	
	public function dispatch(a:T1, b:T2, c:T3, d:T4, e:T5)
	{
		for (slot in slots) 
		{
			if (isMuted) return;
			if (slot.isMuted) continue;
			SignalInfo.currentSignal = this; 
			SignalInfo.currentSlot = slot; 
			slot.listener(a, b, c, d, e);
			onFireSlot(slot);
		}
	}
	
	public function getTrigger(a:T1, b:T2, c:T3, d:T4, e:T5):Trigger
	{
		var _this = this;
		return new Trigger( function() _this.dispatch(a, b, c, d, e) );
	}
	
}