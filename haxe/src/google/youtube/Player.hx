/**
 * ...
 * @author Matt Benton
 */

package google.youtube;

import flash.display.MovieClip;
import flash.display.DisplayObject;

//typedef Player = DisplayObject;

typedef Player = 
{ > DisplayObject,
	
	// Queueing functions

	/**
	 * Loads the specified video's thumbnail and prepares the player to play the video
	 * @param 	videoId				The required videoId parameter specifies the YouTube Video ID of the video to be played.
	 * @param 	startSeconds		The optional startSeconds parameter accepts a float/integer and specifies the time from which the video should start playing when playVideo() is called.
	 * @param	suggestedQuality	The optional suggestedQuality parameter specifies the suggested playback quality for the video.
	 */
	var cueVideoById : String -> Null<Float> -> Null<String> -> Void;
	
	/**
	 * Loads and plays the specified video.
	 * @see 	cueVideoById()
	 */
	var loadVideoById : String -> Float -> String -> Void;
	
	/**
	 * Loads the specified video's thumbnail and prepares the player to play the video. The player does not request the FLV until playVideo() or seekTo() is called.
	 * @param 	mediaContentUrl		The mediaContentUrl must be a fully qualified YouTube player URL in the format http://www.youtube.com/v/VIDEO_ID.
	 * @param	startSeconds		Accepts a float/integer and specifies the time from which the video should start playing when playVideo() is called.
	 */
	var cueVideoByUrl : String -> Float -> Void;
	
	/**
	 * Loads and plays the specified video.
	 * @see 	cueVideoByUrl()
	 */
	var loadVideoByUrl : String -> Float -> Void;
	
	// Playback controls and player settings
	
	// --- Playing a video
	
	/**
	 * Plays the currently cued/loaded video. The final player state after this function executes will be playing (1).
	 */
	var playVideo : Void -> Void;
	
	/**
	 * Pauses the currently playing video. The final player state after this function executes will be paused (2) unless 
	 * the player is in the ended (0) state when the function is called, in which case the player state will not change.
	 */
	var pauseVideo : Void -> Void;
	
	/**
	 * Stops and cancels loading of the current video. This function should be reserved for rare situations when you know 
	 * that the user will not be watching additional video in the player. If your intent is to pause the video, you should 
	 * just call the pauseVideo  function. If you want to change the video that the player is playing, you can call one of 
	 * the queueing functions without calling stopVideo first.
	 * 
	 * Important: Unlike the pauseVideo function, which leaves the player in the paused (2) state, the stopVideo function 
	 * could put the player into any not-playing state, including ended (0), paused (2), video cued (5) or unstarted (-1).
	 */
	var stopVideo : Void -> Void;
	
	/**
	 * Seeks to a specified time in the video. 
	 * @param	seconds			Identifies the time from which the video should start playing. If the player has already 
	 * 							buffered the portion of the video to which the user is advancing, then the player will 
	 * 							start playing the video at the closest keyframe to the specified time.
	 * @param	allowSeekAhead	Determines whether the player will make a new request to the server if seconds parameter 
	 * 							specifies a time outside of the currently buffered video data. We recommend that you set 
	 * 							this parameter to false while the user is dragging the mouse along a video progress bar
	 * 							and then set the parameter to true when the user releases the mouse.
	 * 
	 * The final player state after this function executes will be playing (1) unless the value of the seconds parameter 
	 * is greater than the video length, in which case the final player state will be ended (0).
	 */
	var seekTo : Float -> Bool -> Void;
	
	// --- Changing the player volume
	
	/**
	 * Mutes the player.
	 */
	var mute : Void -> Void;
	
	/**
	 * Unmutes the player.
	 */
	var unMute : Void -> Void;
	
	/**
	 * Returns true if the player is muted, false if not.
	 */
	var isMuted : Void -> Bool;
	
	/**
	 * Sets the volume. Accepts an integer between 0 and 100.
	 */
	var setVolume : Float -> Void;
	
	/**
	 * Returns the player's current volume, an integer between 0 and 100. 
	 * Note that getVolume() will return the volume even if the player is muted.
	 */
	var getVolume : Void -> Float;
	
	// --- Setting the player size
	
	/**
	 * Sets the size in pixels of the player. This method should be used instead of setting the width and height properties 
	 * of the MovieClip. Note that this method does not constrain the proportions of the video player, so you will need to 
	 * maintain a 4:3 aspect ratio. The default size of the chromeless SWF when loaded into another SWF is 320px by 240px 
	 * and the default size of the embedded player SWF is 480px by 385px.
	 */
	var setSize : Float -> Float -> Void;
	
	// Playback status
	
	/**
	 * Returns the number of bytes loaded for the current video.
	 */
	var getVideoBytesLoaded : Void -> Float;
	
	/**
	 * Returns the size in bytes of the currently loaded/playing video.
	 */
	var getVideoBytesTotal : Void -> Float;
	
	/**
	 * Returns the number of bytes the video file started loading from. Example scenario: the user seeks ahead to a point 
	 * that hasn't loaded yet, and the player makes a new request to play a segment of the video that hasn't loaded yet.
	 */
	var getVideoStartBytes : Void -> Float;
	
	/**
	 * Returns the state of the player. Possible values are unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
	 */
	var getPlayerState : Void -> Float;
	
	/**
	 * Returns the elapsed time in seconds since the video started playing.
	 */
	var getCurrentTime : Void -> Float;
	
	// Playback quality
	
	/**
	 * This function retrieves the actual video quality of the current video. It returns undefined if there is no current 
	 * video. Possible return values are hd720, large, medium and small.
	 */
	var getPlaybackQuality : Void -> String;
	
	/**
	 * This function sets the suggested video quality for the current video. The function causes the video to reload at its 
	 * current position in the new quality. If the playback quality does change, it will only change for the video being played.
	 * Calling this function does not guarantee that the playback quality will actually change. If the playback quality does 
	 * change, it will only change for the video being played. At that time, the onPlaybackQualityChange event will fire, 
	 * and your code should respond to the event rather than the fact that it called the setPlaybackQuality function.
	 * 
	 * @param	suggestedQuality	Value can be small, medium, large, hd720 or default. Setting the parameter value to default 
	 * 								instructs YouTube to select the most appropriate playback quality, which will vary for 
	 * 								different users, videos, systems and other playback conditions.
	 *
	 * @see 	http://code.google.com/apis/youtube/flash_api_reference.html#Playback_quality
	 */
	var setPlaybackQuality : String -> Void;
	
	/**
	 * This function returns the set of quality formats in which the current video is available. You could use this function to
	 * determine whether the video is available in a higher quality than the user is viewing, and your player could display a 
	 * button or other element to let the user adjust the quality.
	 * 
	 * The function returns an array of strings ordered from highest to lowest quality. Possible array element values are hd720, 
	 * large, medium and small. This function returns an empty array if there is no current video.
	 */
	var getAvailableQualityLevels : Void -> Array<String>;
	
	// Retrieving video information
	
	/**
	 * Returns the duration in seconds of the currently playing video. Note that getDuration() will return 0 until the video's 
	 * metadata is loaded, which normally happens just after the video starts playing.
	 */
	var getDuration : Void -> Float;
	
	/**
	 * Returns the YouTube.com URL for the currently loaded/playing video.
	 */
	var getVideoUrl : Void -> String;

	/**
	 * Returns the embed code for the currently loaded/playing video.
	 */
	var getVideoEmbedCode : Void -> String;
	
	// Special Functions
	
	/**
	 * This function destroys the player instance. It should be called before unloading the player SWF from your parent SWF.
	 * 
	 * Important: You should always call player.destroy() to unload a YouTube player. This function will close the NetStream object 
	 * and stop additional videos from downloading after the player has been unloaded. If your code contains additional references 
	 * to the player SWF, you also need to destroy those references separately when you unload the player.
	 */
	var destroy : Void -> Void;
}