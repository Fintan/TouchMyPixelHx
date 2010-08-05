/**
 * ...
 * @author Tarwin Stroh-Spijer
 */

package hxphp.facebook.externs;
import php.NativeArray;

extern class Facebook
{
	public var api_client:FacebookRestClient;
	public var api_key:String;
	public var secret:String;
	public var generate_session_secret:String;
	public var session_expires:String;

	public var fb_params:NativeArray;
	public var user:String;
	public var profile_user:String;
	public var canvas_user:String;
	public var ext_perms:String;
	
	public static function __init__():Void {
        untyped __call__("require_once", "/home/touchmyp/public_html/sites/askme/inc/facebook.php");
    }
	
	public function new(api_key:String, secret:String, ?generate_session_secret:Bool = false):Void;
	public function validate_fb_params():NativeArray;
	public function promote_session():String;
	public function do_get_session(auth_token:String):NativeArray;
	public function expire_session():Bool;
	public function logout(next:String):Void;
	public function clear_cookie_state():Void;
	public function redirect(url:String):Void;
	public function in_frame():Bool;
	public function in_fb_canvas():Bool;
	public function get_loggedin_user():String; // returns $user
	public function get_canvas_user():String; // returns $user
	public function get_profile_user():String; // returns $user
	public function current_url():String;
	public function require_login(?required_permissions:String = ""):String; // returns $user
	public function require_frame():Void;
	public function get_facebook_url(subdomain:String):String;
	public function get_install_url(?next:String = null):String; // same as get_add_url
	public function get_add_url(?next:String = null):String;
	public function get_login_url(next:String, canvas:Bool, ?req_perms:String = ""):String;
	public function get_logout_url(next:String):String;
	public function set_user(user:Dynamic, session_key:String, ?expires:Int = 0, ?session_secret:String = null):Void;
	public function set_cookies(user:Dynamic, session_key:String, ?expires:Int = 0, ?session_secret:String):Void;
	public function no_magic_quotes(val:String):String;
	public function get_valid_fb_params(params:NativeArray, ?timeout:Int = null, ?namespace:String = 'fb_sig'):NativeArray;
	public function verify_account_reclamation(user:Dynamic, hash:String):Bool;
	public function verify_signature(fb_params:NativeArray, expected_sig:String):String;
	public function verify_signed_public_session_data(signed_data:NativeArray, public_key:String = null):Bool;
	public function generate_sig(params_array:NativeArray, secret:String):String;
	public function encode_validationError(summary:String, message:String):String;
	public function encode_multiFeedStory(feed:String, next:String):String;
	public function encode_feedStory(feed:String, next:String):String;
	public function create_templatizedFeedStory(title_template:String, ?title_data:NativeArray = null,
                                    ?body_template:String = '', ?body_data:NativeArray = null, ?body_general:String = null,
                                    ?image_1:String = null, ?image_1_link:String = null,
                                    ?image_2:String = null, ?image_2_link:String = null,
                                    ?image_3:String = null, ?image_3_link:String = null,
                                    ?image_4:String = null, ?image_4_link:String = null):NativeArray;
}