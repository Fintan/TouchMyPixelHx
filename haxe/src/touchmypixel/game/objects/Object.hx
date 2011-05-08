/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.objects;

import haxe.xml.Fast;
import touchmypixel.game.ds.ObjectHash;
import touchmypixel.game.ds.IObjectHashable;

class Object implements IObjectHashable{
	
	public var name:String; //no longer extends Sprite so need to define this
	public var __objectId:Int;
	
	#if easeljs
	public var container:easelhx.display.Container;
	#else
	//public var container:flash.display.Sprite;
	public var container:flash.display.MovieClip;
	#end
	//public var builderInfo:Fast;
	
	public function new() 
	{
		name = "";
		#if easeljs
		container = new easelhx.display.Container();
		#else
		//container = new flash.display.Sprite();
		container = new flash.display.MovieClip();
		#end
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
		
		if (container.parent != null) 
		{
			#if easeljs
			//parent is only a DisplayObject and Container has the addChild method
			var p:easelhx.display.Container = cast container.parent; 
			p.removeChild(container);
			#else
			container.parent.removeChild(container);
			#end
		}
	}
}