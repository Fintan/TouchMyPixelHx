package jsfl;
extern class HalfEdge {
	public function getEdge():Edge;
	public function getNext():HalfEdge;
	public function getOppositeHalfEdge():HalfEdge;
	public function getPrev():HalfEdge;
	public function getVertex():Vertex;
	public var id:Int;
	public var index:Int;
}