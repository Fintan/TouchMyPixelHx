/**
 * ...
 * @author Tonypee
 */

package jsfl;

//CS4 class
#if cs4
extern class PresetPanel 
{
	
	public function addNewItem(?namePath:String):Bool;
	public function applyPreset(?presetPath:String):Bool;
	public function deleteFolder(?folderPath:String):Bool;
	public function deleteItem(?namePath:String):Bool;
	public function expandFolder(?bExpand:Bool, ?bRecurse:Bool, ?folderPath:String):Bool;
	public function exportItem(fileURI :String, ?namePath:String):Bool;
	public function findItemIndex(?presetName:String):Int;
	public function getSelectedItems():Array<PresetItem>;
	public function importItem(fileURI:String, ?namePath:String):Bool;
	public function moveToFolder(folderPath:String, ?namePath:String):Bool;
	public function newFolder(?folderPath:String):Bool;
	public function renameItem(newName:String):Bool;
	public function selectItem(namePath:String, ?bReplaceCurrentSelection:Bool, ?bSelect:Bool):Bool;
	public var items:Array<PresetItem>;
}
#end