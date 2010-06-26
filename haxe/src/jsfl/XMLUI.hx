package jsfl;
extern class XMLUI {
	public function accept():Void;
	public function cancel():Void;
	public function get(controlPropertyName:String):String;
	public function getControlItemElement(controlPropertyName:String):{label:String,value:String};
	public function getEnabled(controlID:String):Bool;
	public function getVisible(controlID:String):Bool;
	public function set(controlPropertyName:String,value:String):Void;
	public function setControlItemElement(controlPropertyName:String,elementItem:{label:String,value:String}):Void;
	public function setControlItemElements(controlID:String,elementItemArray:Array<{label:String,value:String}>):Void;
	public function setEnabled(controlID:String,enable:Bool):Void;
	public function setVisible(controlID:String,visible:Bool):Void;
}