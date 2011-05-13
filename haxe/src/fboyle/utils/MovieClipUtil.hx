package fboyle.utils;

import fboyle.display.DisplayTypeDefs;

class MovieClipUtil{
	
	/**
	*  
	* Simple way to abstract having to cast to easelhx.display.BitmapSequence for gotoAndPlay()
	**/ 
	public static function gotoAndPlay(mc:ContainerHx, frame){
	
		if(mc !=null){
			
		#if easeljs
		
		cast(mc, easelhx.display.BitmapSequence).gotoAndPlay(frame);
		
		#else
		
		mc.gotoAndPlay(frame);
		
		#end
		
		}
		
	}
	
	/**
	*  
	* Simple way to abstract having to cast to easelhx.display.BitmapSequence for gotoAndStop()
	**/
	public static function gotoAndStop(mc:ContainerHx, frame){
		
		if(mc !=null){
			
		#if easeljs
		
		cast(mc, easelhx.display.BitmapSequence).gotoAndStop(frame);
		
		#else
		
		mc.gotoAndStop(frame);
		
		#end
		
		}
		
	}
	
	
}