package jsfl;

import jsfl.Fl;

typedef SymbolItem = {> Item,
	public function convertToCompiledClip():Void;
	public function exportSWC(outputURI:String):Void;
	public function exportSWF(outputURI:String):Void;
	public var scalingGrid:Bool;
	public var scalingGridRect:JSFLRect;
	public var sourceAutoUpdate:Bool;
	public var sourceFilePath:String;
	public var sourceLibraryName:String;
	public var symbolType:String;
	public var timeline:Timeline;
}