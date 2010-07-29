/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.objects;
import flash.display.Sprite;
import haxe.xml.Fast;
import touchmypixel.game.ds.ObjectHash;
import touchmypixel.game.ds.IObjectHashable;

class Object extends Sprite, implements IObjectHashable
{
	public var __objectId:Int;
	
	//public var builderInfo:Fast;
	
	public function new() 
	{
		super();
		
		#if !flash
		ObjectHash.register(this);
		#end
	}
	
	public function init()
	{
		//override
	}
	
	public function update(dt:Float)
	{	
		//Override
	}
	
	public function destroy():Void
	{
		#if !flash
		ObjectHash.deregister(this);
		#end
		
		if (parent != null) 
		{
			parent.removeChild(this);
		}
	}
}