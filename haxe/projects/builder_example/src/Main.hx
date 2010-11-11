package ;

import box2D.dynamics.B2DebugDraw;
import flash.display.Sprite;
import flash.events.Event;
import flash.events.MouseEvent;
import flash.Lib;
import haxe.Resource;
import haxe.Timer;
import touchmypixel.game.LayoutBuilder;
import touchmypixel.game.simulations.Box2dSimulation;
import touchmypixel.utils.RedirectTrace;

/**
 * ...
 * @author Matt Benton
 */

class Main extends Sprite
{
	public static inline var TIME_STEP : Float = 1 / 60;
	
	var sim : Box2dSimulation;
	
	static function main() 
	{
		RedirectTrace.toFD();
		
		Lib.current.addChild(new Main());
	}
	
	
	public function new()
	{
		super();
		
		// Create a new LayoutBuilder using the XML data that is embedded in the SWF using haXe's -resource directive.
		var builder = new LayoutBuilder(Resource.getString("layouts"));
		// Get some basic layout data. (Overall width and height of the layout are defined).
		var layoutInfo = builder.getLayoutInfo("example");
		
		// Create a new simulation.
		sim = new Box2dSimulation(true);
		
		var scale = sim.scale;
		// Define the simulation's world boundary. Use information from the layout data.
		sim.initAABB.lowerBound.Set(0, 0);
		sim.initAABB.upperBound.Set(layoutInfo.width / scale, layoutInfo.height / scale);
		// Tell the simulation to automatically handle syncing bitmaps and special objects to physical bodies.
		sim.autoUpdateObjects = true;
		// Create debug drawing sprite.
		var debugCanvas = new Sprite();
		debugCanvas.mouseEnabled = false;
		sim.debugDrawScope = debugCanvas;
		// Initialize simulation.
		sim.init();
		
		// Alter Box2D to render lines will full opacity and ignore fills.
		sim.world.m_debugDraw.m_alpha = 1;
		sim.world.m_debugDraw.m_fillAlpha = 0;
		// Remove the flag that tells Box2D to draw the center of mass of each body so we can see the letters easier.
		sim.world.m_debugDraw.m_drawFlags ^= B2DebugDraw.e_centerOfMassBit;		
		
		// Extract the layout XML data. 
		// We gave it an instance name of "example" in ExampleLayout.fla. We could have multiple layouts in one fla file.
		var layoutData = builder.layouts.get("example");
		// Build the layout into the simulation.
		builder.buildLayout(layoutData, sim);
		
		addChild(sim);
		addChild(debugCanvas);
		
		// Update the simulation by one step to ensure everything is moved to their initial positions.
		sim.update(TIME_STEP);
		
		// Because we gave the TouchMyPixel logo an instance name on the stage ("logo") we can
		// access it through the nameObjects hash on the simulation.
		var logo = sim.namedObjects.get("logo");
		// Make it so that users have to click the logo to begin the simulation.
		logo.buttonMode = true;
		logo.addEventListener(MouseEvent.CLICK, onLogoClick);
	}
	
	private function onLogoClick(e:MouseEvent):Void 
	{
		// Remove the event listener to prevent it from firing again and start the simulation.
		e.target.removeEventListener(MouseEvent.CLICK, onLogoClick);
		start();
	}
	
	function update( e : Event ) : Void
	{		
		sim.update(TIME_STEP);
	}
	
	public function start() : Void
	{
		addEventListener(Event.ENTER_FRAME, update);
	}
	
	public function stop() : Void
	{
		removeEventListener(Event.ENTER_FRAME, update);
	}
	
}