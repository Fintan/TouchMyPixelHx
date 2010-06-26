/**
 * ...
 * @author Tony Polinelli
 */

package peepee.particles;
import peepee.particles.effectors.Effector;
import flash.display.BitmapData;
import flash.display.MovieClip;
import flash.display.Sprite;
import flash.events.Event;
import flash.geom.Point;


#if flash

typedef ParticleSprite = BitmapData;

#else

typedef ParticleSprite = nme.TileRenderer;

#end


class Particle
{
	public static var pnum:Int = 0;
	public var effectors:Array<Effector>;
	public var emitter:Emitter;
	public var lifespan:Float;
	public var age:Float;
	public var isAlive:Bool;
	public var mass:Float;
	
	public var vx:Float;
	public var vy:Float;
	public var vr:Float;
	public var x:Float;
	public var y:Float;
	
	public var gfx:ParticleSprite;
	
	public var userData:Dynamic;
	
	public var num:Int;
	
	public function new() 
	{
		reset();
		lifespan = 200;
		mass = 1;
		num = Particle.pnum++;
	}
	
	/**
	 * Reset particle for use again later
	**/
	public function reset():Void
	{
		isAlive = false;
		age = 0;
		vx = vy = vr = x = y = 0;
		effectors = new Array();
		emitter = null;
	}
	
	/**
	 * Add an effector to this particle
	**/
	public function addEffector(effector:Effector)
	{
		effectors.push(effector);
	}
	
	/**
	 * Apply all of the effectors to the particle
	**/
	public inline function update(dt:Float) 
	{
		for (effector in effectors) 
			effector.apply(this, dt);
		
		x += vx * dt;
		y += vy * dt;
		
		age += dt;
		if (age > lifespan) isAlive = false;
	}

	public static function createSprite(data:BitmapData) : ParticleSprite
	{
		#if flash
		return data;
		#else
		return new nme.TileRenderer(data,0,0,data.width,data.height,0,0);
		#end
	}
}
