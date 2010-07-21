package touchmypixel.io
{
	import flash.display.Stage;
	import flash.events.MouseEvent;
	
	public class Mouse
	{
		static public var x: Number = 0;
		static public var y: Number = 0;
		
		static private var isMouseDown: Boolean;
		
		static public function initStage( stage: Stage ): void
		{
			stage.addEventListener( MouseEvent.MOUSE_DOWN, onMouseDown );
			stage.addEventListener( MouseEvent.MOUSE_UP, onMouseUp );
			stage.addEventListener( MouseEvent.MOUSE_MOVE, onMouseMove );
		}

		static public function onMouseDown( event: MouseEvent ): void
		{
			isMouseDown = true;
		}
		
		static public function onMouseUp( event: MouseEvent ): void
		{
			isMouseDown = false;
		}
		
		static public function onMouseMove( event: MouseEvent ): void
		{
			x = event.stageX;
			y = event.stageY;
		}
		
		static public function isDown(): Boolean
		{
			return isMouseDown;
		}
	}
}