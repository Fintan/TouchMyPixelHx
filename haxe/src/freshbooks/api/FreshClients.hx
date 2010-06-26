/**
 * ...
 * @author Tarwin Stroh-Spijer
 */

package com.freshbooks.api;
import haxe.xml.Fast;

class FreshClients 
{

	public function new() 
	{
		
	}
	
	public static function list(fr:FreshRequest, viewPage = -1, perPage = -1):List<FreshClient>
	{
		var tViewPage = (viewPage == -1) ? "" : "" + viewPage;
		var tPerPage = (perPage == -1) ? "" : "" + perPage;
		
		var requestXml = '
			<?xml version="1.0" encoding="utf-8"?>
			<request method="client.list">
			  <page>'+tViewPage+'</page>
			  <per_page>'+tPerPage+'</per_page>
			</request>
		';
		
		var result = fr.request(requestXml);
		if (result && fr.lastStatus == FreshRequest.STATUS_OK) {
			var outList = new List();
			var fast = new Fast(fr.lastResponseXml.firstChild());
			for(p in fast.node.clients.nodes.client){
				var client = new FreshClient();
				client.fromFastXml(p);
				outList.push(client);
			}
			return(outList);
		}else {
			return(null);
		}
	}
	
	public static function get(fr:FreshRequest, id:Int):FreshClient
	{
		var requestXml = '
			<?xml version="1.0" encoding="utf-8"?>
			<request method="client.get">
			  <client_id>'+id+'</client_id>
			</request>
		';
		
		var result = fr.request(requestXml);
		if (result && fr.lastStatus == FreshRequest.STATUS_OK) {
			// gets the "response" node
			var fast = new Fast(fr.lastResponseXml.firstChild());
			var project = new FreshClient();
			project.fromFastXml(fast.node.project);
			return(project);
		}else {
			return(null);
		}
	}
}

class FreshClient
{
	public var freshId:Int;
	public var firstName:String;
	public var lastName:String;
	public var organisation:String;
	public var updated:Date;
	public var freshUpdated:Date;
	
	public function new(){}
	
	public function fromFastXml(xml:Fast)
	{
		freshId = Std.parseInt(xml.node.client_id.innerHTML);
		firstName = xml.node.first_name.innerHTML;
		lastName = xml.node.last_name.innerHTML;
		organisation = xml.node.organization.innerHTML;
		freshUpdated = Date.fromString(xml.node.updated.innerHTML);
	}
	
	public function toString()
	{
		return(freshId + firstName + lastName + organisation + updated + freshUpdated);
	}
}