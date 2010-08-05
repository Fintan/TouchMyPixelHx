/**
 * ...
 * @author Tarwin Stroh-Spijer
 */

package hxphp.facebook.externs;
import php.NativeArray;

extern class FacebookRestClient 
{
	public var secret:String;
	public var session_key:String;
	public var api_key:String;
	public var friends_list:NativeArray; // to save making the friends.get api call, this will get prepopulated on canvas pages
	public var user:Int; // user id
	public var added:NativeArray; // to save making the pages.isAppAdded api call, this will get prepopulated on canvas pages
	public var is_user:Bool;
	public var canvas_user:String; // we don't pass friends list to iframes, but we want to make friends_get really simple in the canvas_user (non-logged in) case. So we use the canvas_user as default arg to friends_get
	public var batch_mode:Int;
	
	private var batch_queue:NativeArray;
	private var pending_batch:Bool;
	private var call_as_apikey:String;
	private var use_curl_if_available:Bool;
	private var format:String;
	private var using_session_secret:Bool;
	private var rawData:Dynamic;

	public static var BATCH_MODE_DEFAULT:Int = 0;
	public static var BATCH_MODE_SERVER_PARALLEL:Int = 0;
	public static var BATCH_MODE_SERIAL_ONLY:Int = 2;
	
	public static var STORY_SIZE_ONE_LINE:Int = 1;
	public static var STORY_SIZE_SHORT:Int = 2;
	public static var STORY_SIZE_FULL:Int = 4;	
	
	public static function __init__():Void {
        untyped __call__("require_once", "../../../../inc/facebook.php");
    }	
	
	public function new(api_key:String, secret:String, ?session_key:String):Void;
	public function set_user(uid:Int):Void;
	public function use_session_secret(session_secret:String):Void;
	public function set_use_curl_if_available(use_curl_if_available:Bool):Void;
	public function begin_batch():Void;
	public function end_batch():Void;
	//public function pending_batch():Bool;
	public function execute_server_side_batch():Void;
	public function begin_permissions_mode(permissions_apikey:String):Void;
	public function end_permissions_mode():Void;
	public function set_use_ssl_resources(is_ssl:Bool):Void;
	public function application_getPublicInfo(?application_id:String = null, application_api_key:String = null, application_canvas_name:String = null):NativeArray;
	public function auth_createToken():NativeArray;
	public function auth_getSession(auth_token:String, ?generate_session_secret:Bool = false, ?host_url:String = null):NativeArray;
	public function auth_promoteSession():NativeArray;
	public function auth_expireSession():NativeArray;
	public function auth_revokeExtendedPermission(perm:String, ?uid:Int = null):NativeArray;
	public function auth_revokeAuthorization(?uid:Int = null):NativeArray;
	public function auth_getAppPublicKey(target_app_key:String):NativeArray;
	public function auth_getSignedPublicSessionData():NativeArray;
	public function connect_getUnconnectedFriendsCount():NativeArray;
	public function connect_registerUsers(accounts:String):NativeArray; // give JSON encoded
	public function connect_unregisterUsers(email_hashes:String):NativeArray; // give JSON encoded
	public function events_get(?uid:Int = null, ?eids:String = null, ?start_time:String = null, end_time:String = null, rsvp_status:String = null):NativeArray; // rsvp : 'attending', 'unsure', 'declined', and 'not_replied'
	public function events_getMembers(eid:Int):NativeArray;
	// might return a bool?
	public function events_rsvp(eid:Int, rsvp_status:String):Bool; // 'attending', 'unsure', 'declined', and ??'not_replied'??
	// might return a bool?
	public function events_cancel(eid:Int, cancel_message:String):Bool;
	public function events_create(event_info:String, file:String):Int; // return event id, event_info is array or JSON?
	public function events_invite(eid:Int, uids:NativeArray, personal_message:String):Void; // no idea of return
	public function events_edit(eid:Int, event_info:String, file:String):Bool;
	public function fbml_refreshImgSrc(url:String):Bool;
	public function fbml_refreshRefUrl(url:String):Bool;
	public function fbml_setRefHandle(handle:String, fbml:String):Bool;
	
	public function fbml_registerCustomTags(tags:NativeArray):Int;
	public function fbml_getCustomTags(?app_id:Int = null):NativeArray;
	public function fbml_deleteCustomTags(tag_names:NativeArray = null):Bool;
	
	public function intl_getTranslations(?locale:String = 'en_US', ?all:Bool = false):NativeArray;
	public function intl_uploadNativeStrings(native_strings:NativeArray):Int;
	
	// feed_publishTemplatizedAction
	// feed_registerTemplateBundle
	// feed_getRegisteredTemplateBundles
	// feed_getRegisteredTemplateBundleByID
	// feed_deactivateTemplateBundleByID
	
	// feed_publishUserAction
	// stream_publish
	// stream_remove
	// stream_addComment
	// stream_removeComment
	// stream_addLike
	// stream_removeLike
	// feed_getAppFriendStories
	
	// fql_query
	// fql_multiquery
	
	// friends_areFriends
	// friends_get
	// friends_getMutualFriends
	// friends_getLists
	// friends_getAppUsers
	
	// groups_get
	// groups_getMembers
	
	// data_getCookies
	// data_setCookie
	// links_get
	// links_post
	// permissions_checkGrantedApiAccess
	// permissions_checkAvailableApiAccess
	
	// permissions_grantApiAccess
	// permissions_revokeApiAccess
	
	// payments_setProperties
	// payments_getOrderDetails
	// payments_updateOrder
	// payments_getOrders
	
	// gifts_get
	// gifts_update
	
	// notes_create
	// notes_delete
	// notes_edit
	// notes_get
	
	// notifications_get
	// notifications_send
	// notifications_sendEmail
	
	// pages_getInfo
	// pages_isAdmin
	// pages_isAppAdded
	// pages_isFan
	
	// photos_addTag
	// photos_createAlbum
	// photos_get
	// photos_getAlbums
	// photos_getTags
	// photos_upload
	
	// video_upload
	// video_getUploadLimits
	
	// users_getInfo
	// users_getStandardInfo
	// users_getLoggedInUser
	// users_hasAppPermission
	// users_isAppUser
	// users_isVerified
	// users_setStatus
	
	// comments_get
	// comments_add
	// comments_remove
	
	// stream_get
	// stream_getFilters
	// stream_getComments
	
	// profile_setFBML
	// profile_getFBML
	// profile_getInfo
	// profile_getInfoOptions
	// profile_setInfo
	// profile_setInfoOptions
	
	// data_setUserPreference
	// data_setUserPreferences
	// data_getUserPreference
	// data_getUserPreferences
	// data_createObjectType
	// data_dropObjectType
	// data_renameObjectType
	// data_defineObjectProperty
	// data_undefineObjectProperty
	// data_renameObjectProperty
	// data_getObjectTypes
	// data_getObjectType
	// data_createObject
	// data_updateObject
	// data_deleteObject
	// data_deleteObjects
	// data_getObjectProperty
	// data_getObject
	// data_getObjects
	// data_setObjectProperty
	// data_getHashValue
	// data_setHashValue
	// data_incHashValue
	// data_removeHashKey
	// data_removeHashKeys
	// data_defineAssociation
	// data_undefineAssociation
	// data_renameAssociation
	// data_getAssociationDefinition
	// data_getAssociationDefinitions
	// data_setAssociation
	// data_setAssociations
	// data_removeAssociation
	// data_removeAssociations
	// data_removeAssociatedObjects
	// data_getAssociatedObjects
	// data_getAssociatedObjectCount
	// data_getAssociatedObjectCounts
	// data_getAssociations
	
	// admin_getAppProperties
	// admin_setAppProperties
	// admin_setLiveStreamViaLink
	// admin_getLiveStreamViaLink
	// admin_getAllocation
	// admin_getMetrics
	// admin_setRestrictionInfo
	// admin_getRestrictionInfo
	// admin_banUsers
	// admin_unbanUsers
	// admin_getBannedUsers
	
	// call_method
	// convert_result
		
	// setFormat
	// getFormat
	// getRawData
	
	// call_upload_method
	
	// convert_xml_to_result
	// finalize_params
	// convert_array_values_to_json
	// add_standard_params
	// create_url_string
	// run_multipart_http_transaction
	// post_request
	// curl_exec
	// post_upload_request
	// run_http_post_transaction
	// convert_simplexml_to_array
	// get_uid

}