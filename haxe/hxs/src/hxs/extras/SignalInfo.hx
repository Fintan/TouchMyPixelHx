/**
 * ...
 * @author Tonypee
 */

package hxs.extras;
import hxs.core.SignalBase;

class SignalInfo 
{
	public static var currentSignal:SignalBase<Dynamic>;	
	public static var currentSlot:Slot<Dynamic>;	
	
	public static function muteCurrentSignal()
	{
		currentSignal.mute();
	}
	
	public static function unmuteCurrentSignal()
	{
		currentSignal.unmute();
	}
	
	public static function muteCurrentListener()
	{
		currentSignal.muteListener(currentSlot.listener);
	}
	
	public static function unmuteCurrentListener()
	{
		currentSignal.unmuteListener(currentSlot.listener);
	}
}