package fboyle.game.util;

//evangel-playerio / src / game / util / Camera.as

import fboyle.game.core.FBGame;
import flash.display.DisplayObject;

class Cam{
		
	private var screenWidth:Float;
	private var screenHeight:Float;
	private var mapWidth:Float;
	private var mapHeight:Float;
	
	private var cameraSpeed:Float;
	private var cameraDistance:Int;
	private var cameraFitPlayer:Bool;
	
	private var cameraDestinationX:Float;
	private var cameraDestinationY:Float;
	
	private var cameraDiffX:Float;
	private var cameraDiffY:Float;
	
	//private var player:DisplayObject;
	
	public function new(screenWidth:Float, screenHeight:Float, mapWidth:Float, mapHeight:Float, cameraDistance:Int = 32, cameraSpeed:Float = 1.5) {
			
		this.screenWidth    = screenWidth;
		this.screenHeight   = screenHeight;
		this.mapWidth    = mapWidth;
		this.mapHeight   = mapHeight;
		
		this.cameraSpeed    = cameraSpeed;
		this.cameraDistance = cameraDistance;
		
		cameraFitPlayer = false;
	}
		
	public function adjustToPlayer(mapWidth:Int, mapHeight:Int, player:DisplayObject):Void {
		getCameraDestinationPoint(player);
			
		FBGame.camera.x = cameraDestinationX;
		FBGame.camera.y = cameraDestinationY;
		
		cameraFitPlayer = true;
	}
		
	public function followPlayer(player:DisplayObject):Void{
	
		//this.player = player;
		
		getCameraDestinationPoint(player);
		getCameraDiffPosition(player);			
			
		if (cameraFitPlayer == false){
			fitCameraOnPlayer(player);
		}else{
			checkIfPlayerIsOutOfRange();
		}
		
		checkIfCameraFitPlayer(player);
	}
		
	private function checkIfCameraFitPlayer(player:DisplayObject):Void{
			
		if (FBGame.camera.x == cameraDestinationX && FBGame.camera.y == cameraDestinationY){
				cameraFitPlayer = true;
		}
			
		cameraFitPlayer = false;
	}
		
	private function fitCameraOnPlayer(player:DisplayObject):Void{
		
		if(player.x >  (screenWidth/2) && player.x< (mapWidth - (screenWidth/2))){ //ok to scroll in x direction
			
			if (FBGame.camera.x > cameraDestinationX){
				if ( (FBGame.camera.x - cameraSpeed) < cameraDestinationX ){
					FBGame.camera.x = cameraDestinationX;	
				}else{
					FBGame.camera.x -= cameraSpeed;
				}
			}
			else{
				if ( (FBGame.camera.x + cameraSpeed) > cameraDestinationX ){
					FBGame.camera.x = cameraDestinationX;	
				}else{
					FBGame.camera.x += cameraSpeed;
				}
			}
		
		}
			
		if(player.y >(screenHeight/2) && player.y< (mapHeight - (screenHeight/2))){ //ok to scroll in y direction
			
			if (FBGame.camera.y > cameraDestinationY){
				if ( (FBGame.camera.y - cameraSpeed) < cameraDestinationY ){
					FBGame.camera.y = cameraDestinationY;
				}else{
					FBGame.camera.y -= cameraSpeed;
				}
			}else{
				if ( (FBGame.camera.y + cameraSpeed) > cameraDestinationY ){
					FBGame.camera.y = cameraDestinationY;	
				}else{
					FBGame.camera.y += cameraSpeed;
				}
			}
		
		}
	}
		
	private function getCameraDestinationPoint(player:DisplayObject):Void{
	
		cameraDestinationX = player.x - (screenWidth / 2) + (player.width/2); 
		cameraDestinationY = player.y - (screenHeight / 2) + (player.height/2);
	}
		
	private function getCameraDiffPosition(player:DisplayObject):Void
	{
		cameraDiffX = FBGame.camera.x + (player.width/2);
		cameraDiffY = FBGame.camera.y + (player.height/2);
	}
		
	private function checkIfPlayerIsOutOfRange():Void{
			
		if ( Math.abs( (cameraDestinationX - cameraDiffX) ) > cameraDistance ){
			cameraFitPlayer = false;
		}
			
		if ( Math.abs( (cameraDestinationY - cameraDiffY) ) > cameraDistance ){
			cameraFitPlayer = false;
		}
	}
}
