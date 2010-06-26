/**
 * ...
 * @author Tonypee
 */

package com.touchmypixel.game.objects;
import flash.display.Sprite;
import com.touchmypixel.game.ds.ObjectHash;
import com.touchmypixel.game.ds.IObjectHashable;

class Object extends Sprite, implements IObjectHashable
{
	public var __objectId:Int;
	
	public function new() 
	{
		super();
		
		#if !flash
		ObjectHash.register(this);
		#end
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