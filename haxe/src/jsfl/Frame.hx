package jsfl;
import jsfl.Fl;
typedef Frame = {
	public var actionScript:String;
	public var duration:Int;
	public var elements:Array<Element>;
	public function getCustomEase(?property:String):Array<JSFLPoint>;
	public var hasCustomEase:Bool;
	public var labelType:String;
	public var motionTweenOrientToPath:Bool;
	public var motionTweenRotate:String;
	public var motionTweenRotateTimes:Int;
	public var motionTweenScale:Bool;
	public var motionTweenSnap:Bool;
	public var motionTweenSync:Bool;
	public var name:String;
	public function setCustomEase(property:String,easeCurve:Array<JSFLPoint>):Void;
	public var shapeTweenBlend:String;
	public var soundEffect:String;
	public var soundLibraryItem:SoundItem;
	public var soundLoop:Int;
    public var soundLoopMode:String;
	public var soundName:String;
	public var soundSync:String;
	public var startFrame:Int;
	public var tweenEasing:Int;
	public var tweenType:String;
	public var useSingleEaseCurve:Bool;
}