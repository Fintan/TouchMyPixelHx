/**
 * ...
 * @author Fintan Boyle
 */

package demo;

import box2D.common.math.B2Vec2;
import fboyle.events.MouseEvent;
import fboyle.display.LevelBase;
import fboyle.layout.FlaBox2dLayout;
import fboyle.display.DisplayTypeDefs;
import fboyle.layout.LayoutTypeDefs;
import haxe.Resource;
import haxe.Timer;
import touchmypixel.game.simulations.Box2dSimulation;
import touchmypixel.game.objects.Box2dBodyObject;

using fboyle.utils.ListenerUtil;
using fboyle.utils.MovieClipUtil;

class Main extends LevelBase{

	public var simulation:Box2dSimulation;
	
	var playing:Bool;
	var button:ContainerHx;
	
	public function new() {
		
		
		#if easeljs //set the stage up for easeljs target, needs to happen before super() is called
			var canvas:js.DomCanvas = cast js.Lib.document.getElementById("testCanvas");
			fboyle.utils.DisplayObjectUtil.setStage(canvas);
			fboyle.utils.DisplayObjectUtil.enableMouseOver(10);
		#end
			
		super();
		
		playing = false;

		setup();
		
	}
	
	public function setup() {
		
		//create a simulation
		simulation = new Box2dSimulation(false, container, cast fboyle.utils.DisplayObjectUtil.getStage());
		simulation.initGravity.y = 10;
		simulation.autoUpdateObjects = true;
		simulation.timeStep = 1 / 40;
		simulation.init();
		//create a layout for the simulation
		var layout = new FlaBox2dLayout(Resource.getString("resources"));
		layout.buildLayout(layout.layouts.get("example"), simulation);
		//use button graphic to turn the simulation on and off
		button = simulation.nonGameObjects.get("playButton");
		button.addListener(MouseEvent.CLICK, onClicked);
		//frame 1 starts at a zero index in easeljs so I added a dummy first frame on the spritesheet so that it matchs the same for flash target
		#if easeljs button.gotoAndStop("1"); #end 
		
		this.start(); //render initial layout
		Timer.delay(stop, 200); //pause initially so it isn't a resource hog
		playing = false;
		
		//add container to the stage
		fboyle.utils.DisplayObjectUtil.getStage().addChild(container);
		
	}

	
	function onClicked(?e){
		
		if(!playing){
			this.start();
			button.gotoAndStop("2");
		}else{
			button.gotoAndStop("1");
			Timer.delay(stop, 200); //need to draw the new button state, therefore delay stopping render loop (only impacts easeljs output)
		}
		playing = !playing;
	}
	
	override public function update(dt:Float):Void{
		super.update(dt);
		
		for (o in simulation.objects){
			
			if(o.name =="logo1"||o.name =="logo2"||o.name =="logo3"||o.name =="logo4"){
				var body = cast(o, Box2dBodyObject).body;
				if(body.IsSleeping()){
					//just keep stuff moving to keep it interesting
					body.ApplyForce(new B2Vec2(0, -1000), new B2Vec2(body.GetPosition().x+250, body.GetPosition().y+1000));
				}
			}
		}
		
		simulation.update(dt);
		
	}
	
	static function main() {
		new Main();
	}
	
}