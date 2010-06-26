
package peepee;

import flash.display.MovieClip;
import flash.display.Sprite;
import flash.events.Event;
import flash.events.EventDispatcher;
import flash.events.KeyboardEvent;
import flash.events.MouseEvent;
import flash.Lib;
import flash.ui.Keyboard;
import peepee.io.Keys;
import haxe.FastList;

class LevelBase extends Sprite
{
	public var members:FastList<MemberBase>;
	
	public var lastFrameTime:Float;
	private var autoUpdateMembers:Bool;
	
	public function new()
	{
		super();
		
		autoUpdateMembers = true;
		
		Keys.init();

		members = new FastList<MemberBase>();
	}
	
	
	/**
	 * A Member class is extended by visible object, giving them velocity, destroy, init, etc. 
	 */
	public function initMembers()
	{
		var m:MemberBase;
		for (m in members)
			if (!m.initialized) 
				m.init(this);
	}
	
	public function addMember(member:MemberBase, ?init:Bool=false, ?doAddChild:Bool=true)
	{
		members.add(member);
		if (doAddChild) 
			addChild(member);
		if (init) 
			member.init(this);
	}
	
	public function removeMember(member:MemberBase, ?doRemoveChild:Bool)
	{
		if (doRemoveChild && member.parent != null)
			member.parent.removeChild(member);
		members.remove(member);
	}
	
	public function start()
	{
		lastFrameTime = haxe.Timer.stamp();
		addEventListener(Event.ENTER_FRAME, doUpdate);
	}
	
	public function stop()
	{
		removeEventListener(Event.ENTER_FRAME, doUpdate);
	}
	
	public function destroy() 
	{
		stop();
		
		var m:MemberBase;
		for (m in members) 
			m.destroy();
		
		if (parent != null) parent.removeChild(this);
	}
	
	/********************************************************/
	
	private function doUpdate(e:Dynamic):Void
	{
		var currentTime = haxe.Timer.stamp();
		
		var dt = (currentTime - lastFrameTime);
		
		if (autoUpdateMembers)
			for (m in members) m.update(dt);
		
		// Call main game loop
		update(dt);
		
		lastFrameTime = currentTime;
	}
	
	//public function pre(dt:Float):Void{}
	public function update(dt:Float):Void { }
}