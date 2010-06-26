package jsfl;
import jsfl.Fl;
extern class Tools {
	public var activeTool:ToolObj;
	public var altIsDown:Bool;
	public function constrainPoint(pt1:JSFLPoint,pt2:JSFLPoint):JSFLPoint;
	public var ctlIsDown:Bool;
	public function getKeyDown():Int;
	public var mouseIsDown:Bool;
	public var penDownLoc:JSFLPoint;
	public var penLoc:JSFLPoint;
	public function setCursor(cursor:Int):Void;
	public var shiftIsDown:Bool;
	public function snapPoint(pt:JSFLPoint):JSFLPoint;
	public var toolObjs:Array<ToolObj>;
}