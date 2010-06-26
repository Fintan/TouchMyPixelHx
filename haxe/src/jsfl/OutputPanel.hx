package jsfl;
extern class OutputPanel {
	public function clear():Void;
	public function save(fileURI:String,?bAppendToFile:Bool,?bUseSystemEncoding:Bool):Void;
	public function trace(message:Dynamic):Void;
}