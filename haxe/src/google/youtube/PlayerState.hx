/**
 * ...
 * @author Matt Benton
 */

package google.youtube;

class PlayerState
{
	public static inline var unstarted : Int 	= -1;
	public static inline var ended : Int 		= 0;
	public static inline var playing : Int 		= 1;
	public static inline var paused : Int 		= 2;
	public static inline var buffering : Int 	= 3;
	public static inline var videoCued : Int 	= 5;
	
	public static function typeName( value : Int ) : String
	{
		return switch ( value ) 
		{
			case unstarted:		"unstarted";
			case ended:			"ended";
			case playing:		"playing";
			case paused:		"paused";
			case buffering:		"buffering";
			case videoCued:		"videoCued";
		}
	}
}