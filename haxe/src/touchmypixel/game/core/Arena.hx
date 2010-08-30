/**
 * ...
 * @author Tony Polinelli
 */

package touchmypixel.game.core;

import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.Sprite;
import flash.geom.Rectangle;
import flash.geom.Point;
import touchmypixel.game.utils.Loader;


//#if flash

class Arena extends Bitmap
{
	private var alphaBitmap:BitmapData;
   public function new()
   {
		super(new BitmapData(320, 480, true, 0x0000000));
		
		alphaBitmap = new BitmapData(320, 480, true, 0x11000000);
   }
   
   public function fade(gfx:BitmapData)
   {
		bitmapData.copyPixels(gfx, gfx.rect, new Point(0, 0), alphaBitmap, null, true);
   }
   public function clear()
   {
      bitmapData.fillRect(new Rectangle(0,0,320,480), 0xff000000);	
   }
   public inline function addSprite(gfx:BitmapData,point:Point, ?alpha=1.)
   {
	   bitmapData.copyPixels(gfx,gfx.rect, point, null, null, true);
   }
}
/*
#else 


class Arena extends Sprite
{
	public var c:Int;
	public var textures:Array<Bitmap>;
	public var xy:Array<Float>;
	
	public function new()
	{
		super();
		
		c = 0;
		textures = [];
		xy = [];
		
		var b = BitmapData.load("dot_blue.png");
		
		for (i in 0...100)
		{
			var b = new Bitmap(b, null, false);
			addChild(b);
			
			xy[i] = 0;
			xy[i + 1] = 0;
			
			textures.push(b);
		}
	}
	public function clear()
	{
	   c = 0;
	}
	public function addSprite(gfx:BitmapData,point:Point, ?alpha=1.)
	{
	   xy[c*2] = point.x;
	   xy[c*2 + 1] = point.y;
	   c++;
	}

	public function render()
	{
		for (i in 0...100)
		{
			var b = textures[i];
			b.x = xy[i*2];
			b.y = xy[i*2+1];
		}
	}
}

#end

/*
#else

import nme.display.Graphics;

class Arena extends Sprite
{
	public var i:Int;
	public var xy:Array <Float>;
	public var colors:Array <Int>;
	
	public function new()
	{
		super();
		xy = [];
		colors = [];
	}
	
	public function clear()
	{
		graphics.clear();
		i = 0;
	}
	
	public function addParticle(x,y,color,alpha)
	{
		xy[i * 2] =  x;
		xy[i * 2 + 1] = y;
		colors[i] = Graphics.RGBA(0x000000,0xff);
		i++;
	}
	
	public function render()
	{
		//trace("render" + xy[0] + " " + xy[1] + " " + colors[0]);
		graphics.clear();
		graphics.drawPoints(xy,colors);
	}
}
#end
/*
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
*/
