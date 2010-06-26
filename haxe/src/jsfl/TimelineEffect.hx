package jsfl;
import jsfl.Fl;

class TimelineEffect {
	public function configureEffect():Void{}
	public function executeEffect():Void{}
	public function removeEffect():Void{}
	public function attachEffect():Void{
		untyped{
			configureEffect=$closure(this,this.configureEffect);
			executeEffect=$closure(this,this.executeEffect);
			removeEffect=$closure(this,this.removeEffect);
		}
	}
	
}