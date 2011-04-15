// Copyright (c) 2005-2008 Seb Lee-Delisle (sebleedelisle.com, sebleedelisle@gmail.com)

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

package fboyle.particles;

import fboyle.display.IDestroyable;
import fboyle.display.DisplayTypeDefs;

class Particle implements IDestroyable{
	
	public var clip:ContainerHx;
		
	public var xVel:Float; 
	public var yVel:Float;
		
	public var drag:Float; 
		
	public var gravity:Float; 
		
	public var shrink:Float; 
		
	public var fade:Float; 
		
	public var spin:Float;
	
	public function new(){
		
		xVel = 0.0; 
		yVel = 0.0;

		drag = 1.0; 
		gravity = 0.0; 
		shrink = 1.0; 
		fade = 0.0; 
		spin = 0.0;
	
	}
	
	public function setClip(particleclip:ContainerHx){
	
		clip = particleclip;

	}
	
	inline public function update(){
		
		if(clip != null){
			// add the velocity to the clip's position
			clip.x += xVel; 
			clip.y += yVel; 
		
			// apply drag
			xVel *= drag; 
			yVel *= drag; 
		
			yVel += gravity; 
		
			clip.scaleX *= shrink;
			clip.scaleY *= shrink; 
		
			clip.alpha -=fade; 
		
			clip.rotation += spin; 
		
		}
		
	}
	
	// easy way to set the velocity
	public function setVel(xvel :Float, yvel :Float){
		
		xVel = xvel; 
		yVel = yvel; 
		
	}
	
	// take the clip off the stage
	public function destroy():Void{
		if(clip != null){
			cast(clip.parent, ContainerHx).removeChild(clip);
		}
	}
	
}