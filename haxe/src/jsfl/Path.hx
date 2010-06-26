package jsfl;
extern class Path {
	public function addCubicCurve(xAnchor:Float,yAnchor:Float,x2:Float,y2:Float,x3:Float,y3:Float,x4:Float,y4:Float):Void;
	public function addCurve(xAnchor:Float,yAnchor:Float,x2:Float,y2:Float,x3:Float,y3:Float):Void;
	public function addPoint(x:Float,y:Float):Void;
	public function clear():Void;
	public function close():Void;
	public function makeShape(?bSuppressFill:Bool,?bSuppressStroke:Bool):Void;
	public function newContour():Void;
	public var nPts:Int;
}