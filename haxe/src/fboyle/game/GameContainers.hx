package fboyle.game;

import hxs.Signal3;
import touchmypixel.game.objects.Box2dBodyObject;
import touchmypixel.game.objects.BuilderBodyObject;

typedef InputSource = {
    var inputSignal:Signal3<String,String,String>;
    function clearCurrentDirection():Void;
}

typedef Actor={
	var body:Box2dBodyObject;
	var autoSyncToBody:BuilderBodyObject;
}
