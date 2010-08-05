/**
 * ...
 * @author Matt Benton
 */

package google.youtube;

class PlayerEventType
{
	/**
	 * This event is fired when the player is loaded and initialized, meaning it is ready to receive API calls.
	 */
	public static inline var READY : String 					= "onReady";
	
	/**
	 * This event is fired whenever the player's state changes. Possible values are unstarted (-1), ended (0), 
	 * playing (1), paused (2), buffering (3), video cued (5). When the SWF is first loaded it will broadcast 
	 * an unstarted (-1) event. When the video is cued and ready to play it will broadcast a video cued event (5).
	 * 
	 * @see PlayerState.hx
	 */
	public static inline var STATE_CHANGE : String 				= "onStateChange";
	
	/**
	 * This event is fired whenever the video playback quality changes. For example, if you call the 
	 * setPlaybackQuality(suggestedQuality) function, this event will fire if the playback quality actually changes. 
	 * Your code should respond to the event and should not assume that the quality will automatically change when 
	 * the setPlaybackQuality(suggestedQuality) function is called. Similarly, your code should not assume that 
	 * playback quality will only change as a result of an explicit call to setPlaybackQuality or any other 
	 * function that allows you to set a suggested playback quality.
	 * 
	 * The value that the event broadcasts is the new playback quality. Possible values are "small", "medium", "large" and "hd720".
	 */
	public static inline var PLAYBACK_QUALITY_CHANGE : String 	= "onPlaybackQualityChange";
	
	/**
	 * This event is fired when an error in the player occurs. The possible error codes are 100, 101, and 150. 
	 * The 100  error code is broadcast when the video requested is not found. This occurs when a video has been 
	 * removed (for any reason), or it has been marked as private. The 101 error code is broadcast when the video 
	 * requested does not allow playback in the embedded players. The error code 150 is the same as 101, 
	 * it's just 101 in disguise!
	 */
	public static inline var ERROR : String 					= "onError";
}