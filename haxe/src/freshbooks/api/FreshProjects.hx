/**
 * ...
 * @author Tarwin Stroh-Spijer
 */

package com.freshbooks.api;
import haxe.xml.Fast;

class FreshProjects 
{

	public function new() 
	{
		
	}
	
	public static function list(fr:FreshRequest, viewPage = -1, perPage = -1):List<FreshProject>
	{
		var tViewPage = (viewPage == -1) ? "" : "" + viewPage;
		var tPerPage = (perPage == -1) ? "" : "" + perPage;
		
		var requestXml = '
			<?xml version="1.0" encoding="utf-8"?>
			<request method="project.list">
			  <page>'+tViewPage+'</page>
			  <per_page>'+tPerPage+'</per_page>
			</request>
		';
		
		var result = fr.request(requestXml);
		if (result && fr.lastStatus == FreshRequest.STATUS_OK) {
			var outList = new List();
			var fast = new Fast(fr.lastResponseXml.firstChild());
			for(p in fast.node.projects.nodes.project){
				var project = new FreshProject();
				project.fromFastXml(p);
				outList.push(project);
			}
			return(outList);
		}else {
			return(null);
		}
	}
	
	public static function get(fr:FreshRequest, id:Int):FreshProject
	{
		var requestXml = '
			<?xml version="1.0" encoding="utf-8"?>
			<request method="project.get">
			  <project_id>'+id+'</project_id>
			</request>
		';
		
		var result = fr.request(requestXml);
		if (result && fr.lastStatus == FreshRequest.STATUS_OK) {
			// gets the "response" node
			var fast = new Fast(fr.lastResponseXml.firstChild());
			var project = new FreshProject();
			project.fromFastXml(fast.node.project);
			return(project);
		}else {
			return(null);
		}
	}
}

class FreshProject
{
	public var id:Int;
	public var name:String;
	public var description:String;
	//public var rate:Int;
	//public var billMethod:String;
	public var clientId:Int;
	public var staff:Array<Int>;
	
	public function new()
	{
	}
	
	public function fromFastXml(xml:Fast)
	{
		id = Std.parseInt(xml.node.project_id.innerHTML);
		name = xml.node.name.innerHTML;
		description = xml.node.description.innerHTML;
		//rate = Std.parseInt(xml.node.rate.innerHTML);
		//billMethod = xml.node.bill_method.innerHTML;
		clientId = Std.parseInt(xml.node.client_id.innerHTML);
		var staffList = new Array();
		for (s in xml.node.staff.nodes.staff_id) {
			staffList.push(Std.parseInt(s.innerHTML));
		}
		staff = staffList;		
	}
	
	public function toString()
	{
		return(name + " ("+id+")");
	}
}