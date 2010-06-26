package jsfl;
typedef ScreenOutline = {
	public function copyScreenFromFile(fileURI:String,?screenName:String):Void;
	public var currentScreen:Screen;
	public function deleteScreen(screenName:String):Void;
	public function duplicateScreen(?screenName:String):Void;
	public function getSelectedScreens():Array<Screen>;
	public function insertNestedScreen(name:String,?referenceScreen:String,?screenTypeName:String):Screen;
	public function insertScreen(name:String,?referenceScreen:String,?screenTypeName:String):Screen;
	public function moveScreen(screenToMove:String,referenceScreen:String,position:String):Bool;
	public function renameScreen(newScreenName:String,?oldScreenName:String,?bDisplayError:Bool):Bool;
	public var rootScreen:Screen;
	public var screens:Array<Screen>;
	public function setCurrentScreen(name:String):Void;
	public function setScreenProperty(property:String,value:Dynamic):Void;
	public function setSelectedScreens(selection:Array<String>,?bReplaceCurrentSelection:Bool):Void;
}