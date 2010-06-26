package jsfl;
extern class Contour {
	public function getHalfEdge():HalfEdge;
	public var interior:Bool;
	public var orientation:Int;
	
	//CS4
	#if cs4
	public var fill:Fill;
	#end
}