package jsfl;
typedef DrawingLayer = {
	public function beginDraw(?persistentDraw:Bool):Void;
	public function beginFrame():Void;
	public function cubicCurveTo(x1Ctl:Float,y1Ctl:Float,x2Ctl:Float,y2Ctl:Float,xEnd:Float,yEnd:Float):Void;
	public function curveTo(xCtl:Float,yCtl:Float,xEnd:Float,yEnd:Float):Void;
	public function drawPath(path:Path):Void;
	public function endDraw():Void;
	public function endFrame():Void;
	public function lineTo(x:Float,y:Float):Void;
	public function moveTo(x:Float,y:Float):Void;
	public function newPath():Path;
	public function setColor(color:Dynamic):Void;
}