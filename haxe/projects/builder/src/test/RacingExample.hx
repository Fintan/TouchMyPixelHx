/**
 * ...
 * @author Tonypee
 */

package test;

import box2D.common.math.B2Vec2;
import box2D.dynamics.B2Body;
import box2D.dynamics.joints.B2RevoluteJointDef;
import flash.display.Bitmap;
import flash.display.Sprite;
import flash.events.Event;
import flash.geom.Rectangle;
import flash.Lib;
import flash.ui.Keyboard;
import haxe.Resource;
import touchmypixel.game.LayoutBuilder;
import touchmypixel.game.LevelBase;
import touchmypixel.game.objects.Box2dObject;
import touchmypixel.game.objects.BuilderBodyObject;
import touchmypixel.game.objects.BuilderGameObject;
import touchmypixel.game.simulations.Box2dSimulation;
import touchmypixel.game.utils.Loader;
import touchmypixel.game.utils.Parallaxer;
import touchmypixel.io.Keys;
import touchmypixel.utils.RedirectTrace;

class RacingExample extends Sprite
{
	public static var iphone:Bool;
	
	public function new(?iphone:Bool=false) 
	{
		super();
		
		RacingExample.iphone = iphone;
		
		RedirectTrace.toFD();
		addEventListener(Event.ADDED, added);
		Lib.current.addChild(this);
		Lib.current.addChild(new FPS());
		
	}
	
	private function added(e:Event):Void 
	{
		removeEventListener(Event.ADDED, added);
		
		var level = new Level();
		if (iphone)
		{
			level.rotation = 90;
			level.x = 320;
		}
		level.scaleX = level.scaleY = .5;
		addChild(level);
		
	}  
}

class Level extends LevelBase
{
	public var parallaxer:Parallaxer;
	public var simulation:Box2dSimulation;
	public var builder:LayoutBuilder;
	
	var car:Car;
	
	public static var instance:Level;
	
	public function new()
	{
		super();
		
		instance = this;
		/*
		 * Setup simulation
		 * A simulation holds the boxd2 world, and is used as the scope to draw draphics into. 
		 * There is functionality to sync the transforms of bodies and graphics.
		 */
		simulation = new Box2dSimulation(false);
		simulation.initGravity.y = 250/simulation.scale;
		simulation.initAABB.upperBound.x = 10000;
		simulation.autoUpdateObjects = true;
		simulation .iterations = 20;
		simulation.init();
		addChild(simulation);
		
		createBg();
		
		/*
		 * The builder creates the scene from the an xml layout file 
		 */
		builder = new LayoutBuilder(Resource.getString("layouts"));
		builder.buildLayout(builder.layo  uts.get("racing"), simulation);
		car = cast simulation.objects[0];
		
		for (o in simulation.objects)
			o.init();
			
		parallaxer = new Parallaxer(cast this, new Rectangle(0, 0, 800, 600));
		parallaxer.bounds = new Rectangle(0, 0, 5000, 600);
		parallaxer.addControlLayer(simulation, new Rectangle(0, 0, 5000, 600));
		parallaxer.drawWindow();
			
		start();
	}
	
	private function createBg():Void
	{
		var bg = Loader.loadBitmap("bg.png");
		bg.scaleX = bg.scaleY = 2;
		simulation.addChild(bg);
		
		var bg2 = new Bitmap(bg.bitmapData);
		bg2.scaleX = bg2.scaleY = 2;
		bg2.x = 960 * 2;
		simulation.addChild(bg2);
		
		var bg3 = new Bitmap(bg.bitmapData);
		bg3.scaleX = bg3.scaleY = 2;
		bg3.x = 960 * 4;
		simulation.addChild(bg3);		
	}
	
	override public function update(dt:Float)
	{
		simulation.update(dt);
		
		parallaxer.focus.x = car.x;
		parallaxer.focus.y = car.y;
		parallaxer.update();
		
		//hide objects far from screen (yes, using bounds would be better)
		for (o in simulation.objects)
		{
			if (o.x - parallaxer.focus.x < -500 || o.x - parallaxer.focus.x > 800)
				o.visible = false;
			else 
				o.visible = true;
		}
	}
}

import touchmypixel.game.objects.Box2dObject;
class Car extends BuilderGameObject
{
	public var body:BuilderBodyObject;
	public var wheel1:BuilderBodyObject;
	public var wheel2:BuilderBodyObject;
	
	public function new(s)
	{
		super(s);
		
		graphics.beginFill(0xff0000, 1);
		graphics.drawCircle(0, 0, 10);
		graphics.lineStyle(1, 0, 1);
		graphics.moveTo( -20, 0);
		graphics.lineTo( 20, 0);
		
	}
	
	/*
	 * Called after builder has finished setting up objects
	 * - set up joints for wheels
	 */
	override public function init()
	{
		var joint1:B2RevoluteJointDef = new B2RevoluteJointDef();
		joint1.body1 = wheel1.body;
		joint1.body2 = body.body;
		joint1.localAnchor2.Set( -25/simulation.scale, 15/simulation.scale);
		joint1.motorSpeed = -20;
		joint1.maxMotorTorque = 20000;
		joint1.enableMotor = true;
		simulation.world.CreateJoint(joint1);
		
		joint1.body1 = wheel2.body;
		joint1.localAnchor2.Set(25/simulation.scale,15/simulation.scale);
		simulation.world.CreateJoint(joint1);
	}
	
	override public function update(dt:Float)
	{
		super.update(dt);
		
		//stablizing
		body.body.m_angularVelocity += -body.body.GetAngle()/1.5;
	}
}