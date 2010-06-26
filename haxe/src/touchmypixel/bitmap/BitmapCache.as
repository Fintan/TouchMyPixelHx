package com.touchmypixel.utils 
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.geom.Matrix;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	/**
	 * ...
	 * @author Tony Polinelli
	 */
	public class BitmapCache extends Sprite
	{
		public var bitmap:Bitmap;
		public var bitmapData:BitmapData;
		
		public function BitmapCache(clip:DisplayObject,smooth=true) 
		{
			var r = clip.rotation;
			clip.rotation -= r;
			var rect:Rectangle = clip.getBounds(clip.parent);
			var matrix:Matrix = clip.transform.matrix;
			matrix.translate( -rect.x, -rect.y);
			
			bitmapData = new BitmapData(rect.width, rect.height, true,0x000000000);
			bitmapData.draw(clip,matrix);
			bitmap = new Bitmap(bitmapData, "auto", smooth);
			bitmap.x = rect.x-clip.x;
			bitmap.y = rect.y - clip.y;
			rotation = r;
			addChild(bitmap);
		}
		
		public function swap(clip:DisplayObject):void
		{
			var scope:DisplayObjectContainer = clip.parent;
			if (scope != null)
			{
				var index:int = scope.getChildIndex(clip);
				scope.removeChildAt(index);
				scope.addChildAt(this, index);
				x = clip.x;
				y = clip.y;
			}
		}
		
		public static function replace(clip:DisplayObject, smooth:Boolean=true):BitmapCache
		{
			var bitmapCache:BitmapCache = new BitmapCache(clip,smooth);
			bitmapCache.swap(clip);
			return bitmapCache;
		}
	}
}