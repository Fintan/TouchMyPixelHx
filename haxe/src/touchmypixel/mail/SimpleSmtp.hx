/*
 based on mtwin.mail.Smtp
 */
package com.touchmypixel.mail;

import php.net.Socket;
import php.net.Host;

import com.touchmypixel.mail.Tools;
import com.touchmypixel.mail.Exception;

class SimpleSmtp {

	public var cnx:Socket;
	
	public var host:String;
	public var port:Int;
	public var user:String;
	public var password:String;
	private var persistant:Bool;
	
	private var connected:Bool;
	
	public function new(host:String, ?port:Int, ?user:String, ?password:String, ?persistant:Bool)
	{
		this.host = host;
		this.port = (port != null) ? port : 25;
		this.user = user;
		this.password = password;
		this.persistant = (persistant != null) ? persistant : false;
	}
	
	public function sendMail(mail:SimpleMail)
	{
		send(mail.getFrom(), mail.getTo(), mail.getData());
	}
	
	public function send(from:String, to:String, data:String)
	{	
		if (cnx == null) {
			cnx = new Socket();
			try {
				cnx.connect(new Host(host), port);
				connected = true;
				
				var supportLoginAuth = false;

				// get server init line
				var ret = StringTools.trim(cnx.input.readLine());
				var esmtp = ret.indexOf("ESMTP") >= 0;
				
				
				while (StringTools.startsWith(ret, "220-")) {
					ret = StringTools.trim(cnx.input.readLine());
				}
				
				if ( esmtp ) { //if server support extensions
					//EHLO
					cnx.write( "EHLO " + Host.localhost() + "\r\n");
					ret = "";
					
					do {
						ret = StringTools.trim(cnx.input.readLine());
						if( ret.substr(0,3) != "250" ){
							close();
							throw BadResponse(ret);
						} else if ( ret.substr(4, 4) == "AUTH" && ret.indexOf("LOGIN") != -1) {
							supportLoginAuth = true;
						}
					} while(ret.substr(0,4) != "250 ");
				} else {
					//HELO
					cnx.write( "HELO " + Host.localhost() + "\r\n");
					ret = StringTools.trim(cnx.input.readLine());
					if( ret.substr(0,3) != "250" ){
						close();
						throw BadResponse(ret);
					}
				}

				if ( user != null ) { //if we were asked to login
					if ( supportLoginAuth ) { //if server support AUTH LOGIN
						cnx.write( "AUTH LOGIN\r\n" );
						ret = StringTools.trim(cnx.input.readLine());
						if( ret.substr(0,3) != "334" ){
							close();
							throw SmtpAuthError(ret);
						}
						
						cnx.write( Tools.encodeBase64(user) + "\r\n" );
						ret = StringTools.trim(cnx.input.readLine());
						if( ret.substr(0,3) != "334" ){
							close();
							throw SmtpAuthError(ret);
						}
						cnx.write( Tools.encodeBase64(password) + "\r\n" );
						ret = StringTools.trim(cnx.input.readLine());
						if( ret.substr(0,3) != "235" ){
							close();
							throw SmtpAuthError(ret);
						}
					} else {
						throw SmtpAuthError("Authorization with 'login' method not supported by server");
					}
				}				
				
			}catch( e : Dynamic ){
				close();
				throw ConnectionError(host,port);
			}			
		}

		//cnx.write( "MAIL FROM:<" + from + ">\r\n" );
		cnx.write( "MAIL FROM:" + from + "\r\n" );
		var ret = StringTools.trim(cnx.input.readLine());
		if( ret.substr(0,3) != "250" ){
			close();
			throw SmtpMailFromError(ret);
		}

		//cnx.write( "RCPT TO:<" + to + ">\r\n" );
		cnx.write( "RCPT TO:" + to + "\r\n" );
		ret = StringTools.trim(cnx.input.readLine());
		if( ret.substr(0,3) != "250" ){
			close();
			throw SmtpRcptToError(ret);
		}

		cnx.write( "DATA\r\n" );
		ret = StringTools.trim(cnx.input.readLine());
		if( ret.substr(0,3) != "354" ){
			close();
			throw SmtpDataError(ret);
		}

		var a = ~/\r?\n/g.split(data);
		var lastEmpty = false;
		for( l in a ){
			if( l.substr(0,1) == "." )
				l = "."+l;
			cnx.write(l);
			cnx.write("\r\n");
		}
		if( a[a.length-1] != "" ) 
			cnx.write("\r\n");
		cnx.write( ".\r\n" );

		ret = StringTools.trim(cnx.input.readLine());
		if( ret.substr(0,3) != "250" ){
			close();
			throw SmtpSendDataError;
		}
		
		if(!persistant){
			close();
		}
	}
	
	public function close()
	{
		if(connected && cnx != null){
			cnx.write( "QUIT\r\n" );
			cnx.close();
			cnx = null;
			connected = false;
		}
	}
}
