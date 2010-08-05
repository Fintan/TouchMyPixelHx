/**
 * ...
 * @author Tarwin Stroh-Spijer
 */

package hxphp.facebook;
import php.Lib;
import php.NativeArray;
import poko.utils.PhpTools;

class FacebookRestClient 
{
	public var e:hxphp.facebook.externs.FacebookRestClient;
	
	public function new(client:hxphp.facebook.externs.FacebookRestClient) 
	{
		e = client;
	}
	
	public function getEvents():Array<FbEvent>
	{
		var x = e.events_get();
		var data = Lib.toHaxeArray(x);
		var out = [];
		for (i in data) {
			out.push(FbEvent.fromFb(i));
		}
		return out;
	}
}

class FbEvent
{
	public var eid:String;
	public var name:String;
	public var tagline:String;
	public var nid:String;
	public var pic:String;
	public var pic_big:String;
	public var pic_small:String;
	public var host:String;
	public var description:String;
	public var event_type:String;
	public var event_subtype:String;
	public var start_time:String;
	public var end_time:String;
	public var creator:String;
	public var update_time:String;
	public var location:String;
	public var venue:FbEventVenue;
	public var privacy:String;
	public var hide_guest_list:Bool;
	public var show_in_search:Bool;
		
	public function new(){}
	
	public static function fromFb(ref:NativeArray):FbEvent
	{
		var o:Dynamic = untyped __php__("(object) $ref;");
		var e = new FbEvent();
		
		e.eid = o.eid;
		e.name = o.name ;
		e.tagline = o.tagline;
		e.nid = o.nid;
		e.pic = o.pic;
		e.pic_big = o.pic_big;
		e.pic_small = o.pic_small;
		e.host = o.host;
		e.description = o.description;
		e.event_type = o.event_type;
		e.event_subtype = o.event_subtype;
		e.start_time = o.start_time;
		e.end_time = o.end_time;
		e.creator = o.creator;
		e.update_time = o.update_time;
		e.location = o.location;
		var v = untyped __php__("(object) $ref['venue'];");
		e.venue = new FbEventVenue();
		e.venue.street = v.street;
		e.venue.city = v.city;
		e.venue.state = v.state;
		e.venue.country = v.country;
		e.privacy = o.privacy;
		e.hide_guest_list = o.hide_guest_list == "1";
		e.show_in_search = o.show_in_search == "1";
		
		return e;
	}
	
	public function toString()
	{
		var out = "eid: " + eid + " - ";
		out += "name: " + name + " - ";
		out += "tagline: " + tagline;
		return out;
	}
}

class FbEventVenue
{
	public var street:String;
	public var city:String;
	public var state:String;
	public var country:String;
	
	public function new() { }
}