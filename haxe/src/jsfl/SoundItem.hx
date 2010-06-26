package jsfl;
typedef SoundItem = {> Item,
	public var bitRate:String;
	public var bits:String;
	public var compressionType:String;
	public var convertStereoToMono:Bool;
	public var quality:String;
	public var sampleRate:String;
	public var useImportedMP3Quality:Bool;
	
	//CS4
	#if cs4
	public function exportToFile(fileURI:String):Bool;
	public var fileLastModifiedDate(default, null):String;
	public var originalCompressionType(default, null):String;
	public var sourceFileExists(default, null):Bool;
	public var sourceFileIsCurrent(default, null):Bool;
	public var sourceFilePath(default, null):String;
	#end
}