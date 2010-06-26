package jsfl;
typedef Text = {> Element,
	public var accName:String;
	public var antiAliasSharpness:Float;
	public var antiAliasThickness:Float;
	public var autoExpand:Bool;
	public var border:Bool;
	public var description:String;
	public var embeddedCharacters:String;
	public var embedRanges:String;
	public var fontRenderingMode:String;
	public function getTextAttr(attrName:String,?startIndex:Int,?endIndex:Int):Dynamic;
	public function getTextString(?startIndex:Int,?endIndex:Int):String;
	public var length:Int;
	public var lineType:String;
	public var maxCharacters:Int;
	public var orientation:String;
	public var renderAsHTML:Bool;
	public var scrollable:Bool;
	public var selectable:Bool;
	public var selectionEnd:Int;
	public var selectionStart:Int;
	public function setTextAttr(attrName:String,attrValue:Dynamic,?startIndex:Int,?endIndex:Int):Void;
	public function setTextString(text:String,?startIndex:String,?endIndex:String):Void;
	public var shortcut:String;
	public var silent:Bool;
	public var tabIndex:Int;
	public var textRuns:Array<TextRun>;
	public var textType:String;
	public var useDeviceFonts:Bool;
	public var variableName:String;
	
	//CS4 
	#if cs4
	public var embedVariantGlyphs:Bool;
	#end
}