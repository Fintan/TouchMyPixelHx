package jsfl;
typedef Parameter = {
	public var category:String;
	public function insertItem(index:Int,name:String,value:String,type:String):Void;
	public var listIndex:Dynamic;
	public var name:String;
	public function removeItem(index:Int):Void;
	public var value:Dynamic;
	public var valueType:String;
	public var verbose:Int;
}