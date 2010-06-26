package jsfl;

import jsfl.Fl;

typedef Shape = {> Element,
	public function beginEdit():Void;
	public var contours:Array<Contour>;
	public function deleteEdge(index:Int):Void;
	public var edges:Array<Edge>;
	public function endEdit():Void;
	public var isDrawingObject:Bool;
	public var isGroup:Bool;
	public var isOvalObject:Bool;
	public var isRectangleObject:Bool;
	public var vertices:Array<Vertex>;
	
	//CS4
	#if cs4
	public function getCubicSegmentPoints(cubicSegmentIndex:Int):Array<JSFLPoint>;
	public var members:Array<Shape>;
	public var numCubicSegments:Int;
	#end
}