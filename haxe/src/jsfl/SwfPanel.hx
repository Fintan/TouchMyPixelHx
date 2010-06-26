/**
 * ...
 * @author Tonypee
 */

package jsfl;

extern class SwfPanel 
{
	//CS4
	#if cs4
	public function call(request:String, ?arg:Dynamic):String;
	public var name(default, null):String;
	public var path(default, null):String;
	#end
}