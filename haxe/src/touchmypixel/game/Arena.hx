/**
 * ...
 * @author Tony Polinelli
 */

package peepee;

import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.geom.Rectangle;
import flash.geom.Point;

#if flash

class Arena extends Bitmap
{
   public function new()
   {
	super(new BitmapData(320, 480, true, 0x00000000));
   }
   public function clear()
   {
      bitmapData.fillRect(new Rectangle(0,0,320,480), 0);	
   }
   public function addSprite(gfx:BitmapData,point:Point)
   {
      bitmapData.copyPixels(gfx,gfx.rect, point, null, null, true);
   }
}

#else

class Arena extends neash.display.DisplayObject
{
   var mColour:Int;
   var mAlpha:Int;
   var mRect:Rectangle;
   var mWorldX0:Int;
   var mWorldY0:Int;
   var mTilesX:Array<Float>;
   var mTilesY:Array<Float>;
   var mTilesData:Array<nme.TileRenderer>;

   public function new(inWidth:Int=320,inHeight:Int=480, inColour:Int=0x000000, inAlpha:Int=0x00)
   {
      super();
      mColour = inColour;
      mAlpha = inAlpha;
      mRect = new Rectangle(0,0,inWidth,inHeight);
      mScrollRect = new neash.geom.Rectangle(0,0,inWidth,inHeight);
      name = "Arena";
      mWorldX0 = 0;
      mWorldY0 = 0;

      mTilesX = [];
      mTilesY = [];
      mTilesData = [];
   }
   public function clear()
   {
      mTilesX = [];
      mTilesY = [];
      mTilesData = [];
   }
   public function Width() { return mRect.width; }
   public function Height() { return mRect.height; }

   public override function __Render(inParentMask:Dynamic,inScrollRect:Rectangle,inTX:Int,inTY:Int):Dynamic
   {
      nme.Manager.SetBlitArea(mRect,mColour,mAlpha,mFullMatrix);
      for(t in 0...mTilesData.length)
      {
         mTilesData[t].Blit(mTilesX[t],mTilesY[t],0,1);
      }
      nme.Manager.UnSetBlitArea();
      return inParentMask;
   }

   public inline function addSprite(inTile:nme.TileRenderer,inPos:Point)
   {
      mTilesX.push(inPos.x);
      mTilesY.push(inPos.y);
      mTilesData.push(inTile);
   }
}


#end
