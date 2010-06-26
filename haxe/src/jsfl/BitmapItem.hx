package jsfl;
typedef BitmapItem = {>Item,
	public var allowSmoothing:Bool;
	public var compressionType:String;
	public var quality:Int;
	public var useImportedJPEGQuality:Bool;
	
	// CS4
	#if cs4
	public function exportToFile():Bool; 
	public var fileLastModifiedDate:Float;
	public var originalCompressionType:String;
	public var sourceFileExists:Bool;
	public var sourceFileIsCurrent:Bool;
	public var sourceFilePath:String;
	public var useDeblocking:Bool;
	#end
}