package touchmypixel.game.utils;

import flash.display.DisplayObject;
import flash.display.MovieClip;
import flash.display.Sprite;
import flash.geom.Point;
import flash.geom.Rectangle;

class Parallaxer
{	
	public var layers:Array<ParallaxLayer>;	
	public var scope:Sprite;
	public var window:Rectangle;
	public var windowCenter:Point;
	
	public var zoom:Float;
	public var focus:Point;
	public var focusOffset:Point;
	
	private var controlLayer:ParallaxLayer;
	public var bounds:Rectangle;
	
	public var smoothing:Float;
	
	public function new(scope:Sprite, window:Rectangle) 
	{
		this.scope = scope;
		this.window = window;
		this.zoom = 1;
		
		layers = [];
		 
		windowCenter = new Point(0, 0);
		focus = new Point();
		focusOffset = new Point(); 
		
		smoothing = 10;
		bounds = new Rectangle(0, 0, 400, 300);
	}
	
	public function init()
	{
	}
	
	public function drawWindow()
	{
		scope.graphics.lineStyle(1, 0);
		scope.graphics.drawRect(window.x, window.y, window.width, window.height);
	}
	
	public function addLayer(item:DisplayObject, dimensions:Rectangle = null, offset:Point = null, isControlLayer:Bool = false, canZoom:Bool = false):ParallaxLayer
	{
		var layer = new ParallaxLayer(item, dimensions, offset, canZoom);
		layers.push(layer);
		return layer;
	}
	
	public function addControlLayer(item:DisplayObject, dimensions:Rectangle = null, offset:Point = null, canZoom:Bool = false):ParallaxLayer
	{
		controlLayer = addLayer(item, dimensions, offset, true, canZoom);
		return controlLayer;
	}
	
	public function getConrolLayer():ParallaxLayer
	{
		return controlLayer;
	}
	
	/*public function remove(item)
	{
		delete layers[item];
	}*/
	
	public function jumpToFocus()
	{
		update(true);
	}
	
	public function update(instant:Bool = false)
	{
		/*for(layer in layers)
		{
			if (layer.canZoom) {
				layer.mc.scaleX = zoom;
				layer.mc.scaleY = zoom;
			}
		}*/
		
		// Set controlLayer's Target Position
		controlLayer.tx = (window.width / 2 - focus.x + focusOffset.x);
		controlLayer.ty = (window.height / 2 - focus.y + focusOffset.y);
		
		// SCREEN BOUNDS
		if (bounds != null) {
			if (controlLayer.tx + bounds.left > window.left) controlLayer.tx = -bounds.left + window.left;
			if (controlLayer.tx + bounds.right < window.right) controlLayer.tx = -bounds.right + window.right;
			if (controlLayer.ty + bounds.top > window.top) controlLayer.ty = -bounds.top + window.top;
			if (controlLayer.ty + bounds.bottom < window.bottom) controlLayer.ty = -bounds.bottom + window.bottom;
		} else {
			if (controlLayer.tx + controlLayer.dimensions.left > window.left) controlLayer.tx = -controlLayer.dimensions.left + window.left;
			if (controlLayer.tx + controlLayer.dimensions.right < window.right) controlLayer.tx = -controlLayer.dimensions.right + window.right;
			if (controlLayer.ty + controlLayer.dimensions.top > window.top) controlLayer.ty = -controlLayer.dimensions.top + window.top;
			if (controlLayer.ty + controlLayer.dimensions.bottom < window.bottom) controlLayer.ty = -controlLayer.dimensions.bottom + window.bottom;
		}
		
		var npx:Float = Math.abs((controlLayer.tx - window.left) / (controlLayer.dimensions.width - window.width));
		var npy:Float = Math.abs((controlLayer.ty - window.top) / (controlLayer.dimensions.height - window.height));
			
		var smooth = instant ? 1 : smoothing;
		
		for(layer in layers)
		{	
			if(layer != controlLayer)
				updateLayerTarget(layer, npx, npy);
				
			// Set All layer positions
			layer.mc.x += (layer.tx - layer.mc.x) / smooth;
			layer.mc.y += (layer.ty - layer.mc.y) / smooth;
			
			//layer.mc.x = roundToNearest(1.0, layer.mc.x);
			//layer.mc.y = roundToNearest(1.0, layer.mc.y);
		}		
	}
	
	inline function roundToNearest( roundTo : Float, value : Float ) : Float
	{
		return Math.round( value / roundTo ) * roundTo;
	}
	
	private function updateLayerTarget(layer:ParallaxLayer, tx:Float, ty:Float)
	{
		layer.tx = (-tx * (layer.dimensions.width-window.width) + window.left)- layer.dimensions.left + layer.offset.x;
		layer.ty = (-ty * (layer.dimensions.height-window.height) + window.left) - layer.dimensions.top + layer.offset.y;
	}
	
} 


class ParallaxLayer
{
	public var mc:DisplayObject;
	public var dimensions:Rectangle;
	public var offset:Point;
	public var tx:Float;
	public var ty:Float;
	public var canZoom:Bool;
	
	public function new(mc:DisplayObject, dimensions:Rectangle=null, offset:Point=null, canZoom:Bool = false)
	{
		this.mc = mc;
		this.dimensions = dimensions == null ? new Rectangle(0, 0, mc.width, mc.height) : dimensions;
		this.offset = offset == null ? new Point(0, 0) : offset;
		this.tx = 0;
		this.ty = 0;
		this.canZoom = canZoom;
	}
}