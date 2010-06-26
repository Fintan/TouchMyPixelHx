package jsfl;
typedef BitmapInstanceBits = {
	var width:Int;
	var height:Int;
	var depth:Int;
	var bits:Array<Int>;
	var cTab:Array<String>;
}
typedef BitmapInstance = {> Instance,
	public function getBits():BitmapInstanceBits;
	public var hPixels:Int;
	public function setBits(bitmap:BitmapInstanceBits):Void;
	public var vPixels:Int;
}