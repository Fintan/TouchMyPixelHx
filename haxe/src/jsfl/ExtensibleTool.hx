package jsfl;
import jsfl.Fl;
class ExtensibleTool {
	public function activate():Void{}
	public function configureTool():Void{}
	public function deactivate():Void{}
	public function keyDown():Void{}
	public function keyUp():Void{}
	public function mouseDoubleClick():Void{}
	public function mouseDown(pt:JSFLPoint):Void{}
	public function mouseMove(pt:JSFLPoint):Void{}
	public function mouseUp():Void{}
	public function notifySettingsChanged():Void{}
	public function setCursor():Void{}
	public function attachTool():Void{
		untyped{
			activate=$closure(this,this.activate);
			configureTool=$closure(this,this.configureTool);
			deactivate=$closure(this,this.deactivate);
			keyDown=$closure(this,this.keyDown);
			keyUp=$closure(this,this.keyUp);
			mouseDoubleClick=$closure(this,this.mouseDoubleClick);
			mouseDown=$closure(this,this.mouseDown);
			mouseMove=$closure(this,this.mouseMove);
			mouseUp=$closure(this,this.mouseUp);
			notifySettingsChanged=$closure(this,this.notifySettingsChanged);
			setCursor=$closure(this,this.setCursor);
			attachTool=$closure(this,this.attachTool);
		}
	}
	
}