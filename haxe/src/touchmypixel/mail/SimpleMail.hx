/**
 * ...
 * @author Tarwin Stroh-Spijer
 */

package touchmypixel.mail;

import touchmypixel.mail.Part;
import poko.utils.PhpTools;

using poko.utils.StringTools2;

// currently only supports SMTP

class SimpleMail
{
	private var mail:Part;
	private var textPart:Part;
	private var _from:String;
	private var _to:String;
	private var _subject:String;
	
	private var htmlPart:Part;
	
	public var to(getTo, setTo):String;
	public var from(getFrom, setFrom):String;
	public var subject(getSubject, setSubject):String;
	public var data(getData, null):String;
		
	public function new(?from:String, ?to:String, ?subject:String, ?bodyText:String, ?bodyHtml:String)
	{
		mail = new Part("multipart/alternative");
		mail.setDate();
		
		if (from != null) setFrom(from);
		if (to != null) setTo(to);
		if (subject != null) setSubject(subject);
		if (bodyText != null) setText(bodyText);
		if (bodyHtml != null) setHtml(bodyHtml);
	}
	
	// returns an email addresses formatted with name and email is usable format
	public static function ename(email:String, ?name:String)
	{
		if(name != null)
			return name + ' <' + email + '>';
		else
			return email;
	}
	
	private function setTo(to:String)
	{
		mail.setHeader("To", to);
		return _to = to;
	}

	private function setFrom(from:String)
	{
		mail.setHeader("From", from);
		return _from = from;
	}
	
	private function setSubject(subject:String)
	{
		mail.setHeader("Subject", subject);
		return _subject = subject;
	}
	
	public function setText(text:String)
	{
		if (textPart == null) textPart = mail.newPart("text/plain");
		textPart.setContent(text);		
	}
	
	public function setHtml(html:String, ?autoSetText:Bool = true)
	{
		if (htmlPart == null) htmlPart = mail.newPart("text/html");
		htmlPart.setContent(html);
		if (autoSetText) setText(html);
	}	
	
	private function getFrom()
	{
		return _from;
	}
		
	private function getTo()
	{
		return _to;
	}	
	
	private function getSubject()
	{
		return _subject;
	}
	
	private function getData()
	{
		return mail.get();
	}
}