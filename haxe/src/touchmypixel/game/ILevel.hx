//
//  ILevel
//
//  Created by Fintan Boyle on 2011-02-04.
//  Copyright (c) 2011 Modello Design Ltd. All rights reserved.
//
package touchmypixel.game;

interface ILevel {
	function init():Void;
	function start():Void;
	function stop():Void;
	function destroy():Void;
	function update(dt:Float):Void;
}