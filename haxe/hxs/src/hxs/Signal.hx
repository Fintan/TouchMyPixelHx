/**
 * ...
 * @author Tonypee
 */

package hxs;

import hxs.core.SignalBase;
import hxs.extras.Trigger;
import hxs.extras.SignalInfo;

class Signal extends SignalBase <Void->Void>
{

	public function new(?caller:Dynamic) 
	{ 
		super(caller); 
	}
	
	public function dispatch()
	{
		for (slot in slots) 
		{
			if (isMuted) return;
			if (slot.isMuted) continue;
			SignalInfo.currentSignal = this; 
			SignalInfo.currentSlot = slot; 
			slot.listener();
			onFireSlot(slot);
		}
	}
	
	public function getTrigger():Trigger
	{
		var _this = this;
		return new Trigger( function() _this.dispatch() );
	}
}