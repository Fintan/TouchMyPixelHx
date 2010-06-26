package jsfl;
typedef Screen = {
	public var accName:String;
	public var childScreens:Array<Screen>;
	public var description:String;
	public var forceSimple:Bool;
	public var hidden:Bool;
	public var instanceName:String;
	public var name:String;
	public var nextScreen:Screen;
	public var parameters:Array<Parameter>;
	public var parentScreen:Screen;
	public var prevScreen:Screen;
	public var silent:Bool;
	public var tabIndex:Int;
	public var timeline:Timeline;
}