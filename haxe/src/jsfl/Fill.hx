package jsfl;
typedef Fill = {
	public var color:Dynamic;
	public var colorArray:Array<Int>;
	public var focalPoint:Int;
	public var linearRGB:Bool;
	public var matrix:Matrix;
	public var overflow:String;
	public var posArray:Array<Int>;
	public var style:String;
	
	//CS4
	#if cs4
	public var bitmapIsClipped:Bool;
	public var bitmapPath:String;
	#end
}