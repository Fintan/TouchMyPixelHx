package jsfl;
extern class ActionsPanel {
	public function getClassForObject(ASvariableName:String):String;
	public function getScriptAssistMode():Bool;
	public function getSelectedText():String;
	public function getText():String;
	public function hasSelection():Bool;
	public function replaceSelectedText(replacementText:String):Bool;
	public function setScriptAssistMode(bScriptAssist:Bool):Void;
	public function setSelection(startIndex:Int,numberOfChars:Int):Bool;
	public function setText(replacementText:String):Bool;
}