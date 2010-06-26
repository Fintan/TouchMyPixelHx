package jsfl;
typedef ToolObj = {
	public var depth:Int;
	public function enablePIControl(control:String,bEnable:Bool):Void;
	public var iconID:Int;
	public var position:Int;
	public function setIcon(file:String):Void;
	public function setMenuString(menuStr:String):Void;
	public function setOptionsFile(xmlFile:String):Void;
	public function setPI(pi:String):Void;
	public function setToolName(name:String):Void;
	public function setToolTip(toolTip:String):Void;
	public function showPIControl(control:String,bShow:Bool):Void;
	public function showTransformHandles(bShow:Bool):Void;
}