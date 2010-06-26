/**
 * ...
 * @author Tarwin Stroh-Spijer
 */

package com.freshbooks.api;
import haxe.xml.Fast;

class FreshStaffs
{

	public function new() 
	{
		
	}
	
	public static function list(fr:FreshRequest):List<FreshStaff>
	{
		var requestXml = '
			<?xml version="1.0" encoding="utf-8"?>
			<request method="staff.list"></request>
		';
		
		var result = fr.request(requestXml);
		if (result && fr.lastStatus == FreshRequest.STATUS_OK) {
			var outList = new List();
			var fast = new Fast(fr.lastResponseXml.firstChild());
			for(p in fast.node.staff_members.nodes.member){
				var staff = new FreshStaff();
				staff.fromFastXml(p);
				outList.push(staff);
			}
			return(outList);
		}else {
			return(null);
		}
	}
	
	public static function get(fr:FreshRequest, id:Int):FreshStaff
	{
		var requestXml = '
			<?xml version="1.0" encoding="utf-8"?>
			<request method="staff.get">
			  <staff_id>'+id+'</staff_id>
			</request>
		';
		
		var result = fr.request(requestXml);
		if (result && fr.lastStatus == FreshRequest.STATUS_OK) {
			// gets the "response" node
			var fast = new Fast(fr.lastResponseXml.firstChild());
			var staff = new FreshStaff();
			staff.fromFastXml(fast.node.staff);
			return(staff);
		}else {
			return(null);
		}
	}	
	
}

class FreshStaff
{
	public var id:Int;
	public var username:String;
	public var firstName:String;
	public var lastName:String;
	public var email:String;
	
	public var businessPhone:String;
	public var mobilePhone:String;
	public var rate:String;
	public var lastLogin:String;
	public var numberOfLogins:String;
	public var signUpDate:String;
	public var street1:String;
	public var street2:String;
	public var city:String;
	public var state:String;
	public var country:String;
	public var code:String;
	
	public var invitationToken:String;
	
	public function new()
	{
	}
	
	public function fromFastXml(xml:Fast)
	{			
		id = Std.parseInt(xml.node.staff_id.innerHTML);
		username = xml.node.username.innerHTML;
		firstName = xml.node.first_name.innerHTML;
		lastName = xml.node.last_name.innerHTML;
		email = xml.node.email.innerHTML;
		
		if (xml.node.business_phone != null) {
			
			businessPhone = xml.node.business_phone.innerHTML;
			mobilePhone = xml.node.mobile_phone.innerHTML;
			rate = xml.node.rate.innerHTML;
			lastLogin = xml.node.last_login.innerHTML;
			numberOfLogins = xml.node.number_of_logins.innerHTML;
			signUpDate = xml.node.signup_date.innerHTML;
			street1 = xml.node.street1.innerHTML;
			street2 = xml.node.street2.innerHTML;
			city = xml.node.city.innerHTML;
			state = xml.node.state.innerHTML;
			country = xml.node.country.innerHTML;
			code = xml.node.code.innerHTML;
		}
	}
	
	public function toString()
	{
		return(firstName+" "+lastName+" ("+email+")");
	}
}