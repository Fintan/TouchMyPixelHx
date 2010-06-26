/**
 * ...
 * @author Tarwin Stroh-Spijer
 */

package com.freshbooks.utils;
import php.Web;
import poko.utils.Curl;
import poko.utils.CurlManager;

class LoginStripper 
{
	public var businessTitle:String;
	public var backgroundColor:String;
	public var logoUrl:String;
	
	public function new(){}
	
	public function parse(urlPart:String):Bool
	{
		var c = new CurlManager("https://" + urlPart + ".freshbooks.com/");
		c.setUserAgent("FreshWIP");
		
		try{
			var page = c.get();
			var s1 = page.indexOf("<title>") + 7;
			var s2 = page.indexOf(" Client Login Page</title>" , s1);
			businessTitle = page.substr(s1, s2 - s1);
			
			s1 = page.indexOf("background-color:");
			s2 = page.indexOf("#", s1) + 1;
			var s3 = page.indexOf(";", s2);
			backgroundColor = page.substr(s2, s3 - s2);
			
			c.close();
			
			logoUrl = "<img src=\"https://" + urlPart + ".freshbooks.com/logo.php\" />";		
		}catch (e:Dynamic) {
			return false;
		}
		return true;
	}
	
}