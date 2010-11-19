package fboyle.animation;

class AnimationItem{

	public var libraryName:String;
	public var loop:Bool;
	
	public function new(libName:String, loop:Bool=true){
		this.libraryName = libName;
		this.loop = loop;	
	}

}
