package jsfl;

extern class FLfile 
{
	public static function copy(fileURI:String,copyURI:String):Bool;
	public static function createFolder(folderURI:String):Bool;
	public static function exists(fileURI:String):Bool;
	public static function getAttributes(fileOrFolderURI:String):String;
	public static function getCreationDate(fileOrFolderURI:String):String;
	public static function getCreationDateObj(fileOrFolderURI:String):Date;
	public static function getModificationDate(fileOrFolderURI:String):String;
	public static function getModificationDateObj(fileOrFolderURI:String):Date;
	public static function getSize(fileURI:String):Int;
	public static function listFolder(folderURI:String,?filesOrDirectories:String):Array<String>;
	public static function read(fileOrFolderURI:String):String;
	public static function remove(fileOrFolderURI:String):Bool;
	public static function setAttributes(fileURI:String,strAttrs:String):Bool;
	public static function write(fileURI:String, textToWrite:String, ?strAppendMode:String):Bool;
	
	//CS4
	#if cs4
	public static function platformPathToURI(fileName:String):String;
	public static function uriToPlatformPath(fileURI:String):String;
	#end
}