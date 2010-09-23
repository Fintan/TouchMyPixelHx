package jsfl;
typedef Item = {
	public function addData(name:String,type:String,data:Dynamic):Void;
	public function getData(name:String):Dynamic;
	public function hasData(name:String):Bool;
	public var itemType:String;
	public var linkageBaseClass:String;
	public var linkageClassName:String;
	public var linkageExportForAS:Bool;
	public var linkageExportForRS:Bool;
	public var linkageExportInFirstFrame:Bool;
	public var linkageIdentifier:String;
	public var linkageImportForRS:Bool;
    public var linkageURL:String;
	public var name:String;
	public function removeData(name:String):Void;
}