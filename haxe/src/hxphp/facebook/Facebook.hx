/**
 * ...
 * @author Tarwin Stroh-Spijer
 */

package hxphp.facebook;

class Facebook 
{
	public var e:hxphp.facebook.externs.Facebook;
	
	public var api:FacebookRestClient;
	
	public function new(api_key:String, secret:String, generate_session_secret:Bool = false) 
	{
		e = new hxphp.facebook.externs.Facebook(api_key, secret, generate_session_secret);
		
		api = new FacebookRestClient(e.api_client);
	}
}