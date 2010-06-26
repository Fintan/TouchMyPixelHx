
package com.touchmypixel.utils;



#if cpp
typedef FastMath = Math;
#else

import flash.Memory;
import flash.utils.ByteArray;

class FastMath 
{
	public static inline function init():Void {
		var b = new ByteArray();
		b.length = 1024;
		Memory.select(b);
	}
	
	public static inline function sqrt(x:Float):Float {
		Memory.setFloat(0, x);
		Memory.setI32(0, 0x1fbb4000 + (Memory.getI32(0) >> 1));
		var x2 = Memory.getFloat(0);
		return 0.5 * (x2 + x / x2);
	}
	
	public static inline function invsqrt(x:Float):Float {
		Memory.setFloat(0, x);
		Memory.setI32(0, 0x5f3759df - (Memory.getI32(0) >> 1));
		var x2 = Memory.getFloat(0);
		return x2 * (1.5 - 0.5 * x * x2 * x2);
	}	
}
#end