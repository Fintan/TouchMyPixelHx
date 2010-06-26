package jsfl;
import jsfl.Fl;
extern class Library {
	public function addItemToDocument(position:JSFLPoint,?namePath:String):Bool;
	public function addNewItem(type:String,?namePath:String):Bool;
	public function deleteItem(?namePath:String):Bool;
	public function duplicateItem(?namePath:String):Bool;
	public function editItem(?namePath:String):Bool;
	public function expandFolder(bExpand:Bool,?bRecurseNestedParents:Bool,?namePath:String):Bool;
	public function findItemIndex(namePath:String):Int;
	public function getItemProperty(property:String):String;
	public function getItemType(?namePath:String):String;
	public function getSelectedItems():Array<Item>;
	public function importEmbeddedSWF(linkageName:String,swfData:Dynamic,?libName:String):Void;
	public function itemExists(namePath:String):Bool;
	public var items:Array<Item>;
	public function moveToFolder(folderPath:String,?itemToMove:String,?bReplace:Bool):Bool;
	public function newFolder(?folderPath:String):Bool;
	public function renameItem(name:String):Bool;
	public function selectAll(?bSelectAll:Bool):Void;
	public function selectItem(namePath:String,?bReplaceCurrentSelection:Bool,?bSelect:Bool):Bool;
	public function selectNone():Void;
	public function setItemProperty(property:String,value:Dynamic):Void;
	public function updateItem(?namePath:String):Bool;
}