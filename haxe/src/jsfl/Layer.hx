package jsfl;
typedef Layer = {
	public var color:Dynamic;
	public var frameCount:Int;
	public var frames:Array<Frame>;
	public var height:Int;
	public var layerType:String;
	public var locked:Bool;
	public var name:String;
	public var outline:Bool;
	public var parentLayer:Layer;
	public var visible:Bool;
}