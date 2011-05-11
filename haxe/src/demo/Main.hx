/**
 * ...
 * @author Fintan Boyle
 */

package demo;

import box2D.collision.shapes.B2Shape;
import box2D.collision.B2AABB;
import box2D.common.math.B2Vec2;
import touchmypixel.game.objects.Box2dBodyObject;
import fboyle.display.LevelBase;
import fboyle.layout.FlaBox2dLayout;
import fboyle.layout.ILayoutContainer;
import fboyle.display.DisplayTypeDefs;
import fboyle.layout.LayoutTypeDefs;
import haxe.Resource;
import touchmypixel.game.simulations.Box2dSimulation;

class Main extends LevelBase, implements ILayoutContainer{

	public var simulation:Box2dSimulation;
	public var namedObjects:Hash<ContainerHx>;
	public var bitmaps:Array<BitmapHx>;
	public var emptyObjects:Hash<EmptyVo>;
	
	public function new() {
		
		#if easeljs
			var canvas:js.DomCanvas = cast js.Lib.document.getElementById("testCanvas");
			fboyle.utils.DisplayObjectUtil.setStage(canvas);
			//fboyle.utils.DisplayObjectUtil.enableMouseOver(10);
		#end
			
		super();
		
		namedObjects = new Hash();
		bitmaps = [];
		emptyObjects = new Hash();
		
		setup();
		
	}
	
	public function setup() {
		
		simulation = new Box2dSimulation(false, container, cast fboyle.utils.DisplayObjectUtil.getStage());
		simulation.initGravity.y = 10;
		simulation.initAABB.upperBound.x = 1000;
		simulation.initAABB.upperBound.y = 2000;
		simulation.autoUpdateObjects = true;
		simulation.iterations = 30;
		simulation.timeStep = 1 / 40;
		simulation.init();
		
		var layout = new FlaBox2dLayout(Resource.getString("resources"));
		layout.buildLayout(layout.layouts.get("example"), simulation);
		
		this.start();
		
		fboyle.utils.DisplayObjectUtil.getStage().addChild(container);
		
	}
	
	override public function update(dt:Float):Void{
		super.update(dt);
		
		for (o in simulation.objects){
			
			if(o.name =="logo1"||o.name =="logo2"||o.name =="logo3"||o.name =="logo4"){
				var body = cast(o, Box2dBodyObject).body;
				if(body.IsSleeping()){
					body.ApplyForce(new B2Vec2(0, -1000), new B2Vec2(body.GetPosition().x+250, body.GetPosition().y+1000));
				}
			}
		}
		
		simulation.update(dt);
	}
	
	private function isOnGround(body):Bool{
		
		var pos = body.GetWorldCenter();
		var aabb = new B2AABB();
		aabb.lowerBound.Set(pos.x - 20 / simulation.scale, pos.y - 10 / simulation.scale);
		aabb.upperBound.Set(pos.x + 20 / simulation.scale, pos.y + 35 / simulation.scale);
		
		var a = new Array<Dynamic>();
		var n = simulation.world.Query(aabb, a, 10);
		
		for (o in a)
			if (cast(o, B2Shape).m_density == 0)
				return true;

		return false;
	
	}
	
	static function main() {
		new Main();
	}
	
}