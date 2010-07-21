/**
 * ...
 * @author Tonypee
 */

package touchmypixel.game.utils;
import jsfl.ComponentInstance;
import jsfl.Element;
import jsfl.Parameter;
import jsfl.SymbolInstance;
import jsfl.SymbolItem;
import jsfl.Timeline;


class JSFLTools 
{

	public static function isShape(el:Element):Bool
	{
		return el.elementType == "shape";
	}
	
	public static function isInstance(el:Element):Bool
	{
		return el.elementType == "instance";
	}
	
	public static function isBitmap(el:SymbolInstance):Bool
	{
		if (!isInstance(el))
			return false;
		return el.libraryItem.itemType == "bitmap";
	}
	
	public static function isComponent(el:Element):Bool
	{
		if (!isInstance(el))
				return false;
		
		var c:ComponentInstance = cast el;
		var isComponent = c.libraryItem.itemType == "component";
		/*
		 * JSFL bug:
		 * If you convert a symbol to a component, but it is already on the stage as a symbol, the jsfl will read that it is a component but not have a .parameters set. 
		 * To refresh an item, change the 'type' of the symbol on stage to 'button' then back to 'movieclip', or close and reopen your fla.
		 * 
		 * */
		if (isComponent && (untyped el.parameters) == null)
			throw "COMPONENT DIRTY: You need to refresh " + c.name + " [" + c.libraryItem.name  +"]";
			
		return isComponent;
	}
	
	public static function getChildren(timeline:Timeline, ?includeGuideLayers=false):Array <Element>
	{
		if (timeline == null) 
			return [];
		
		var els = new Array();
		for (l in timeline.layers)
		{	
			if (l.layerType != "guide" || includeGuideLayers)
			{
				var f = l.frames[0];
				for (el in f.elements)
					els.push(el); 
			}
		}
		return els;
	}
	
	public static function getTimeline(symbol:SymbolInstance):Timeline
	{
		return untyped symbol.libraryItem.timeline;
	}
	
	public static function getInstanceChildren(symbol:SymbolInstance):Array <Element>
	{
		return getChildren(getTimeline(symbol));
	}
	
	public static function getDefinitionValues(el:Element):Hash <String>
	{
		if (el == null) return null;
		
		var def = new Hash();
		if (!isComponent(el))
			return null;
		
		var el:ComponentInstance = cast el;
			
		for (p in el.parameters)
			def.set(p.name, p.value);
		return def;
	}
}