package jsfl;

#if !cs4
extern class ProjectItem {
	public function canPublish():Bool;
	public function canTest():Bool;
	public var displayName:String;
	public var isMissing:Bool;
	public var itemURI:String;
	public function publish():Bool;
	public var publishProfile:String;
	public function test():Bool;
}
#end