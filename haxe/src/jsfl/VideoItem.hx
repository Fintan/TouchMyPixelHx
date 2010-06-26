package jsfl;
typedef VideoItem = {> Item,
	public var sourceFilePath:String;
	public var videoType:String;
	
	//CS4
	#if cs4
	public function exportToFLV(fileURI:String):Bool;
	public function fileLastModifiedDate(default, null):Int;
	public function sourceFileExists(default, null):Bool;
	public function sourceFileIsCurrent(default, null):Bool;
	#end
}