/**
 * ...
 * @author Tarwin Stroh-Spijer
 */

package com.touchmypixel.mail;
import com.touchmypixel.mail.Part;
import poko.utils.PhpTools;

// currently only supports SMTP

class SimpleMail
{
	private var mail:Part;
	private var textPart:Part;
	private var _from:String;
	private var _to:String;
	
	private var htmlPart:Part;
	
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
	
	public function setTo(to:String)
	{
		mail.setHeader("To", to);
		_to = to;
	}

	public function setFrom(from:String)
	{
		mail.setHeader("From", from);
		_from = from;
	}
	
	public function setSubject(subject:String)
	{
		mail.setHeader("Subject", subject);
	}
	
	public function setText(text:String)
	{
		if (textPart == null) textPart = mail.newPart("text/plain");
		textPart.setContent(text);		
	}
	
	public function setHtml(html:String)
	{
		if (htmlPart == null) htmlPart = mail.newPart("text/html");
		htmlPart.setContent(html);
	}	
	
	public function getFrom()
	{
		return _from;
	}
	
	public function getTo()
	{
		return _to;
	}	
	
	public function getData()
	{
		return mail.get();
	}
}