/**
 * ...
 * @author Tonypee
 */

package com.touchmypixel.game.box2d;

import box2D.collision.shapes.B2Shape;
import box2D.dynamics.B2Body;
import com.touchmypixel.game.objects.Box2dObject;

typedef ContactPoint =
{
	var object1:Box2dObject;
	var object2:Box2dObject;
	var body1:B2Body;
	var body2:B2Body;
	var shape1:B2Shape;
	var shape2:B2Shape;
}