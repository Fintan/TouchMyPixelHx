package jsfl;

typedef FontItem = { > Item,

	//CS4
	#if cs4
	public var bitmap:Bool;
	public var bold:Bool;
	public var embedVariantGlyphs:Bool;
	public var font:String;
	public var isDefineFont4Symbol:Bool;
	public var italic:Bool;
	public var size:Int;
	#end
}
