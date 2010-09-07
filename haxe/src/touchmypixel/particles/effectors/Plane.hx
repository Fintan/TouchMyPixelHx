package touchmypixel.particles.effectors;
import flash.geom.Point;
import touchmypixel.game.geom.Line;
import touchmypixel.game.geom.Vector;
import touchmypixel.particles.Particle;

/**
 * ...
 * @author Tonypee
 */

class Plane implements Effector
{
	public var line:Line; 
	public var lineOpposite:Line; 
	public var doubleSided:Bool;
	
	public function new(x1,y1,x2,y2, ?doubleSided:Bool=false) 
	{
		line = new Line(x1, y1, x2, y2);
		lineOpposite = new Line(x2, y2, x1, y1);
	
		this.doubleSided = doubleSided;
	}
	
	public function apply(p:Particle, dt:Float)
	{
		if (!checkLine(line, p, dt) && doubleSided)
			checkLine(lineOpposite, p, dt);
	}
	
	public function checkLine(line:Line, p:Particle, dt:Float)
	{
		var incidence = new Vector(0,0);
		
		if (line.checkIntersection(p.x-p.vx* dt, p.y-p.vy* dt, p.x, p.y))
		{
			p.x -= p.vx * dt;
			p.y -= p.vy * dt;
			incidence.x = p.vx;
			incidence.y = p.vy;
			var v = Vector.reflect(incidence, line.normal);
			p.vx = v.x;
			p.vy = v.y;
			return true;
		} else {
			return false;
		}
	}
	
}