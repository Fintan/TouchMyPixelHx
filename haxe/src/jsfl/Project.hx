package jsfl;

#if !cs4
extern class Project {
	public function addFile(fileURI:String,?autoCreateFolder:Bool):ProjectItem;
	public function canPublishProject():Bool;
	public function canTestProject():Bool;
	public var defaultItem:ProjectItem;
	public function findProjectItem(fileURI:String):ProjectItem;
	public var items:Array<ProjectItem>;
	public var name:String;
	public var projectURI:String;
	public function publishProject():Bool;
	public function testProject():Bool;
}
#end