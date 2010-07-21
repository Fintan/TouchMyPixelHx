/**
* ...
* @author Tony Polinelli (tony@touchmypixel.com)
* @version 0.1
*/


package touchmypixel.utils;

import flash.display.Loader;
import flash.display.MovieClip;
import flash.events.EventDispatcher;
import flash.Lib;
import haxe.xml.Fast;
import flash.events.Event;
import flash.net.URLLoader;
import flash.net.URLRequest;
import touchmypixel.Member;

class TemplateManager extends EventDispatcher
{
	
	public static var COMPLETE:String = "complete";
	
	public var xmlLoader:URLLoader;
	public var scope:MovieClip;
	public var items:Array <touchmypixel.Member>;
	public var classPrefix:String;
	private var xml:Xml;
	
	public function new() 
	{
		items = new Array();
		classPrefix = "";
		super();
	}
	public function load(xml)
	{
		xmlLoader = new URLLoader(new URLRequest("test1.xml"));
		xmlLoader.addEventListener("complete", xmlLoaded);	
	}
	public function setXML(xml:Xml)
	{
		this.xml = xml;
	}
	public function xmlLoaded(event:Event):Void
	{
		this.xml = Xml.parse(xmlLoader.data);
		dispatchEvent(new Event(COMPLETE));
	}
	public function build(tpl, scope):Array<Member>
	{
		items = new Array();
		
		for (n in new Fast(xml).node.root.nodes.template)
		{
			if (n.att.id == tpl)
			{
				for (object in n.nodes.obj)
				{
					var s:String = object.att.baseClass;
					
					StringTools.replace("::", s, "/");

					var c = Type.resolveClass(s);
					var tmp:Dynamic = Type.createInstance(c, []);
	
					if(Std.is(tmp, Member)){
						var mc:Member = Type.createInstance(c, []);

						mc.name = object.att.name;
						mc.x = Std.parseFloat(object.att.x);
						mc.y = Std.parseFloat(object.att.y);
						
						for (attribute in object.nodes.att) {
							var field = attribute.att.name;
							var value:Dynamic = null;
							
							switch(attribute.att.type)
							{
								case "string": value = attribute.att.value;
								case "number": value = Std.parseFloat(attribute.att.value);
								case "object": value = attribute.att.value.split(",");
							}
							Reflect.setField(mc, field, value);
						}
						scope.addChild(mc);
						items.push(mc);
					} else {
						trace("CLASS MISSING OR NOT A MEMBER: " + s);
					}
				}
			}
		}
		return items;
	}
}