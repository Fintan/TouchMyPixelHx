package jsfl;

import jsfl.Fl;

typedef Element = {
	public var depth:Int;
	public var elementType:String;
	public function getPersistentData(name:String):Dynamic;
	public function getTransformationPoint():JSFLPoint;
	public function hasPersistentData(name:String):Bool;
	public var height:Float;
	public var layer:Layer;
	public var left:Float;
	public var locked:Bool;
	public var matrix:Matrix;
	public var name:String;
	public function removePersistentData(name:String):Void;
	public var rotation:Float;
	public var scaleX:Float;
	public var scaleY:Float;
	public var selected:Bool;
	public function setPersistentData(name:String,type:String,value:Dynamic):Void;
	public function setTransformationPoint(transformationPoint:JSFLPoint):Void;
	public var skewX:Float;
	public var skewY:Float;
	public var top:Float;
	public var transformX:Float;
	public var transformY:Float;
	public var width:Float;
	public var x:Float;
	public var y:Float;
}