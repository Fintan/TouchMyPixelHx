/**
 * ...
 * @author Tonypee
 */

package test;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import haxe.Resource;
import touchmypixel.game.LayoutBuilder;
import touchmypixel.game.simulations.Box2dSimulation;
import touchmypixel.game.LevelBase;
import touchmypixel.utils.RedirectTrace;

class BitmapExample extends Sprite
{
	public function new() 
	{
		super();
		
		RedirectTrace.toFD();
		
		addEventListener(Event.ADDED, added);
		Lib.current.addChild(this);
		Lib.current.addChild(new FPS());
			
	}
	
	private function added(e:Event):Void 
	{
		removeEventListener(Event.ADDED, added);
		
		var level = new BitmapLevel();
		addChild(level);
	}
}

class BitmapLevel extends LevelBase
{
	var simulation:Box2dSimulation;
	
	public function new()
	{
		super();
		
		simulation = new Box2dSimulation(true);
		simulation.autoUpdateObjects = true;
		simulation.init();
		addChild(simulation);
		
		var builder = new LayoutBuilder(Resource.getString("layouts"));
		builder.buildLayout(builder.layouts.get("bitmap"), simulation);
		
		start();
	}
	
	override public function update(dt:Float)
	{
		simulation.update(dt);
	}
}