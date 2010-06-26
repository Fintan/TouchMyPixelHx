package jsfl;
typedef Timeline = {
	public function addMotionGuide():Int;
	public function addNewLayer(?name:String,?laterType:String,?bAddAbove:Bool):Int;
	public function clearFrames(?startFrameIndex:Int,?endFrameIndex:Int):Void;
	public function clearKeyframes(?startFrameIndex:Int,?endFrameIndex:Int):Void;
	public function convertToBlankKeyframes(?startFrameIndex:Int,?endFrameIndex:Int):Void;
	public function convertToKeyframes(?startFrameIndex:Int,?endFrameIndex:Int):Void;
	public function copyFrames(?startFrameIndex:Int,?endFrameIndex:Int):Void;
	public function copyMotion():Void;
	public function copyMotionAsAS3():Void;
	public function createMotionTween(?startFrameIndex:Int,?endFrameIndex:Int):Void;
	public var currentFrame:Int;
	public var currentLayer:Int;
	public function cutFrames(?startFrameIndex:Int,?endFrameIndex:Int):Void;
	public function deleteLayer(?index:Int):Void;
	public function expandFolder(bExpand:Bool,?bRecurseNestedParents:Bool,?index:Int):Void;
	public function findLayerIndex(name:String):Array<Int>;
	public var frameCount:Int;
	public function getFrameProperty(property:String,?startFrameIndex:Int,?endFrameIndex:Int):Dynamic;
	public function getLayerProperty(property:String):Dynamic;
	public function getSelectedFrames():Array<Int>;
	public function getSelectedLayers():Array<Int>;
	public function insertBlankKeyframe(?frameNumIndex:Int):Void;
	public function insertFrames(?numFrames:Int,?bAllLayers:Bool,?frameNumIndex:Int):Void;
	public function insertKeyframe(?frameNumIndex:Int):Void;
	public var layerCount:Int;
	public var layers:Array<Layer>;
	public var name:String;
	public function pasteFrames(?startFrameIndex:Int,?endFrameIndex:Int):Void;
	public function pasteMotion():Void;
	public function removeFrames(?startFrameIndex:Int,?endFrameIndex:Int):Void;
	public function reorderLayer(layerToMove:Int,layerToPutItBy:Int,?bAddBefore:Bool):Void;
	public function reverseFrames(?startFrameIndex:Int,?endFrameIndex:Int):Void;
	public function selectAllFrames():Void;
	public function setFrameProperty(property:String,value:Dynamic,?startFrameIndex:Int,?endFrameIndex:Int):Void;
	public function setLayerProperty(property:String,value:Dynamic,?layersToChange:String):Void;
	public function setSelectedFrames(startFrameIndex:Dynamic,?endFrameIndex:Dynamic,?bReplaceCurrentSelection:Bool):Void;
	public function setSelectedLayers(index:Int,?bReplaceCurrentSelection:Bool):Void;
	public function showLayerMasking(?layer:Int):Void;
	
	//CS4
	#if cs4
	public function getGuidelines(xmlString:String):Bool;
	public function setGuidelines(xmlString:String):Bool;
	#end
}