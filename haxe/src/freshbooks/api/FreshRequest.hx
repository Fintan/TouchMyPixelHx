/**
 * ...
 * @author Tarwin Stroh-Spijer
 */

package com.freshbooks.api;
import haxe.xml.Fast;
import php.NativeArray;
import php.Web;

class FreshRequest 
{
	public var lastStatus:String;
	public var lastResponse:String;
	public var lastResponseXml:Xml;
	
	public var lastError:String;
	public var lastErrorNumber:Int;
	
	public var apiUrl:String;
	public var apiToken:String;
	
	public static var STATUS_OK = "ok";
	public static var STATUS_FAIL = "fail";	

	public function new(apiUrlPart, apiToken) 
	{
		apiUrl = "https://" + apiUrlPart + ".freshbooks.com/api/2.1/xml-in";
		this.apiToken = apiToken;
	}
	
	public function request(resquestXml:String):Bool
	{
		#if php
			// Submit curl request
			var ch = untyped __call__('curl_init');
			
			untyped __php__("
				curl_setopt($ch, CURLOPT_URL, $this->apiUrl);
				curl_setopt($ch, CURLOPT_USERPWD, $this->apiToken);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $resquestXml);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // Return as variable
				curl_setopt($ch, CURLOPT_TIMEOUT, 4);
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, TRUE); // Validate SSL certificate
				curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, TRUE);
				curl_setopt($ch, CURLOPT_USERAGENT, 'FreshWIP');
			");
			
			if(Web.getHostName() == "localhost"){
				untyped __php__("curl_setopt($ch, CURLOPT_CAINFO, 'c:\\xampp\\ca-bundle.crt');");
			}
			
			var tResponse = Std.string(untyped __call__('curl_exec', ch));
			
			if(tResponse == "false"){
				lastErrorNumber = Std.parseInt(untyped __call__('curl_errno', ch));
				lastError = Std.string(untyped __call__('curl_error', ch));
			}
			
			untyped __call__('curl_close', ch);
			
			// Fail if no result
			if (tResponse == "false" || tResponse.length < 2) {
				lastStatus = null;
				lastResponse = null;
				lastResponseXml = null;
				return false;
			}
			
			lastResponse = tResponse.toString();
			lastResponseXml = Xml.parse(lastResponse.substr(lastResponse.indexOf("?>")+3));
			//lastResponseXml = Xml.parse(lastResponse);
			
			var fast = new Fast(lastResponseXml);
			
			var tStatus = fast.node.response.att.status;
			lastStatus = (tStatus == STATUS_OK) ? STATUS_OK : STATUS_FAIL;
			if (lastStatus == STATUS_FAIL) {
				lastError = Std.string(fast.node.response.node.error.innerData);
			}
			
			return true;
		#else
			return false;
		#end
	}
	
}