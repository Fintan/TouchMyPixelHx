/** 
 * fwork haxe goodness
 * @author Tony Polinelli <tonyp@touchmypixel.com>
 */

package hxphp;

import php.Lib;

class GD
{	
	
	/** */
	
	public static function gdInfo():Hash<Dynamic>
	{
		return Lib.hashOfAssociativeArray(untyped __call__("gd_info"));
	}
	
	/** function will determine the size of an image */
	public static function getImageSize(filename:String, ?imageinfo):GDImageSizeResult
	{
		var types:Array<GDImageType> = [GIF, JPG, PNG, SWF, PSD, BMP, TIFF_II, TIFF_MM, JPC, JP2, JPX, JB2, SWC, IFF, WBMP, XBM];
		var a:Array<Dynamic> = untyped __call__("getimagesize", filename);

		var bits = null;
		var channels = null;
		var mime = null;
		
		try {
			bits = a[4] != null ? a[4] : null;
			channels = a[5] != null ? a[5] : null;
			mime = a[6] != null ? a[6] : null;
		}catch (e:Dynamic) {}
		
		return { width: a[0], height: a[1], type: types[a[2]], bits: bits, channels: channels, mime: mime };
	}
	
	/** Get file extension for image an GDImageType */ 
	public static function imageTypeToExtension ( imageType:GDImageType, ?include_dot:Bool ):String
	{
		var t = switch(imageType)
		{
			case GDImageType.GIF: "gif";
			case GDImageType.JPG: "jpg";
			case GDImageType.PNG: "png";
			case GDImageType.SWF: "swf";
			case GDImageType.PSD: "psd";
			case GDImageType.BMP: "bmp";
			case GDImageType.TIFF_II: "tiff";
			case GDImageType.TIFF_MM: "tiff";
			case GDImageType.JPC: "jpc";
			case GDImageType.JP2: "jp2";
			case GDImageType.JPX: "jpf";
			case GDImageType.JB2: "jb2";
			case GDImageType.SWC: "swc";
			case GDImageType.IFF: "aiff";
			case GDImageType.WBMP: "wbmp";
			case GDImageType.XBM: "xbm";
		}
		return include_dot ? "." + t : t;
	}

	/** determine the Mime-Type for an GDImageType */
	public static function imageTypeToMimeType(imageType:GDImageType):String
	{
		return switch(imageType)
		{
			case GDImageType.GIF: "image/gif";
			case GDImageType.JPG: "image/jpeg";
			case GDImageType.PNG: "image/png";
			case GDImageType.SWF: "application/x-shockwave-flash";
			case GDImageType.PSD: "image/psd";
			case GDImageType.BMP: "image/psd";
			case GDImageType.TIFF_II: "image/tiff";
			case GDImageType.TIFF_MM: "image/tiff";
			case GDImageType.JPC: "image/octet-stream";
			case GDImageType.JP2: "image/jp2";
			case GDImageType.JPX: "image/octet-stream";
			case GDImageType.JB2: "image/octet-stream";
			case GDImageType.SWC: "image/x-shockwave-flash";
			case GDImageType.IFF: "image/iff";
			case GDImageType.WBMP: "image/vnd.wap.wbmp";
			case GDImageType.XBM: "image/xbm";
		}
	}

	/** creates the WBMP file in filename from the image image */
	public static inline function imageToWBMP(image:GDImageResource, ?filename:String, threshold:Int):String
	{
		return untyped __call__("image2wbmp", image, filename, threshold);
	}
	
	/** allows for two different modes of drawing on truecolor images */
	public static inline function imageAlphaBlending( image:GDImageResource, blendmode:Bool ):Bool
	{
		return untyped __call__("imagealphablending ", image, blendmode);
	}
	
	/** Activate the fast drawing antialiased methods for lines and wired polygons */
	public static inline function imageAntiAlias( image:GDImageResource, on:Bool ):Bool
	{
		return untyped __call__("imagealphablending ", image, on);
	}
	
	/** draws a partial ellipse centered at cx, cy (top left is 0, 0) in the image represented by image. W and h specifies the ellipse's width and height respectively while the start and end points are specified in degrees indicated by the s and e arguments. 0° is located at the three-o'clock position, and the arc is drawn clockwise.  */
	public static inline function  imageArc( image:GDImageResource, cx:Int, cy:Int, w:Int, h:Int, s:Int, e:Int, color:Int):Bool
	{
		return untyped __call__("imagearc ", image, cx, cy, w, h, s, e, color );
	}
	
	/** draws the first character of c in the image identified by image with its upper-left at x,y (top left is 0, 0) with the color color. If font is 1, 2, 3, 4 or 5, a built-in font is used (with higher numbers corresponding to larger fonts). */
	public static inline function imageChar( image:GDImageResource, font:Int, x:Int, y:Int, c:String, color:Int ):Bool 
	{
		return untyped __call__("imagechar", image, font, x, y, c, color);
	}
	
	/** draws the character c vertically in the image identified by image at coordinates x, y (top left is 0, 0) with the color color */
	public static inline function imageCharUp( image:GDImageResource, font:Int, x:Int, y:Int, c:String, color:Int )
	{
		return untyped __call__("imagecharup", image, font, x, y, c, color);
	}
	
	/** returns a color identifier representing the color composed of the given RGB components*/
	public static inline function imageColorAllocate( image:GDImageResource, red:Int, green:Int, blue:Int ):Int
	{
		return untyped __call__("imagecolorallocate", image, red, green, blue);
	}
	
	/** behaves identically to imagecolorallocate() with the addition of the transparency */
	public static inline function imageColorAllocateAlpha( image:GDImageResource, red:Int, green:Int, blue:Int, alpha:Int ):Int
	{
		return untyped __call__("imagecolorallocatealpha", image, red, green, blue, alpha);
	}
	
	/** Returns the index of the color of the pixel at the specified location in the image specified by image. */
	public static inline function imageColorAt( image:GDImageResource, x:Int, y:Int ):Int
	{
		return untyped __call__("imagecolorat", image, x, y);
	}

	public static inline function imageColorClosest( image:GDImageResource, red:Int, green:Int, blue:Int ):Int 
	{
		return untyped __call__("imagecolorclosest", image, red, green, blue);
	}
	
	public static inline function imageColorClosestAlpha( image:GDImageResource, red:Int, green:Int, blue:Int, alpha:Int ):Int 
	{
		return untyped __call__("imagecolorclosestalpha", image, red, green, blue, alpha);
	}
	
	/** function de-allocates a color previously allocated with imagecolorallocate() or imagecolorallocatealpha(). */
	public static inline function imageColorDeallocate( image:GDImageResource, color:Int ):Int 
	{
		return untyped __call__("imagecolordeallocate", image, color);
	}
	
	/** Returns the index of the specified color in the palette of the image. */
	public static inline function imageColorExact( image:GDImageResource, red:Int, green:Int, blue:Int ):Int 
	{
		return untyped __call__("imagecolorexact", image, red, green, blue);
	}
	
	/** Returns the index of the specified color in the palette of the image. */
	public static inline function imageColorExactAlpha ( image:GDImageResource, red:Int, green:Int, blue:Int, alpha:Int  ):Int 
	{
		return untyped __call__("imagecolorexact", image, red, green, blue, alpha);
	}
	
	/** Makes the colors of the palette version of an image more closely match the true color version  */
	public static inline function imageColorMatch( image1:GDImageResource, image2:GDImageResource ):Bool 
	{
		return untyped __call__("imagecolormatch", image1, image2);
	}
	
	/** This function is guaranteed to return a color index for a requested color, either the exact color or the closest possible alternative.  */
	public static inline function imageColorResolve( image:GDImageResource, red:Int, green:Int, blue:Int):Int 
	{
		return untyped __call__("imagecolorresolve", image, red, green, blue);
	}
	
	/** This function is guaranteed to return a color index for a requested color, either the exact color or the closest possible alternative. with alpha */
	public static inline function imageColorResolveAlpha( image:GDImageResource, red:Int, green:Int, blue:Int, alpha:Int  ):Int 
	{
		return untyped __call__("imagecolorresolvealpha", image, red, green, blue, alpha);
	}
	
	/** This function is guaranteed to return a color index for a requested color, either the exact color or the closest possible alternative.  */
	public static inline function imageColorSet( image:GDImageResource, index:Int, red:Int, green:Int, blue:Int):Void 
	{
		untyped __call__("imagecolorset", image, index, red, green, blue);
	}
	
	/** This returns a ColorDef with red, green, blue and alpha keys that contain the appropriate values for the specified color index.  */
	public static function imageColorsForIndex ( image:GDImageResource, index:Int):GDColorDef 
	{
		var a = untyped __call__("imagecolorsforindex", image, index);
		
		var a2 = Lib.hashOfAssociativeArray(a);
		
		return { red:a2.get('red'), green:a2.get('green'), blue:a2.get('blue'), alpha:a2.get('alpha') };
	}
	
	/** This returns the number of colors in the specified image's palette or 0 for truecolor images. */
	public static inline function imageColorsTotal ( image:GDImageResource ):Int 
	{
		return untyped __call__("imagecolorstotal", image);
	}
	
	/** This returns the number of colors in the specified image's palette or 0 for truecolor images. */
	public static inline function imageColorTransparent ( image:GDImageResource, color:Int ):Int 
	{
		return untyped __call__("imagecolortransparent", image, color);
	}
	
	/** undocumented */
	public static inline function imageConvolution ( image:GDImageResource, matrix3x3:Array<Dynamic>, div:Float, offset:Float ):Int 
	{
		return untyped __call__("imageconvolution", image, matrix3x3, div, offset);
	}

	/** Copy a part of src_im onto dst_im starting at the x,y coordinates src_x, src_y with a width of src_w and a height of src_h. The portion defined will be copied onto the x,y coordinates, dst_x and dst_y. */
	public static inline function imageCopy( dst_im:GDImageResource, src_im:GDImageResource, dst_x:Int, dst_y:Int, src_x:Int, src_y:Int, src_w:Int, src_h:Int ):Bool 
	{
		return untyped __call__("imagecopy", dst_im, src_im, dst_x, dst_y, src_x, src_y, src_w, src_h);
	}
	
	/** same as iamgeCopy with pcr (percent of alpha) two images will be merged according to pct which can range from 0 to 100. */
	public static inline function imageCopyMerge( dst_im:GDImageResource, src_im:GDImageResource, dst_x:Int, dst_y:Int, src_x:Int, src_y:Int, src_w:Int, src_h:Int, pct:Int ):Bool 
	{
		return untyped __call__("imagecopymerge", dst_im, src_im, dst_x, dst_y, src_x, src_y, src_w, src_h, pct);
	}
	
	/**  */
	public static inline function imageCopyMergeGray( dst_im:GDImageResource, src_im:GDImageResource, dst_x:Int, dst_y:Int, src_x:Int, src_y:Int, src_w:Int, src_h:Int, pct:Int ):Bool 
	{
		return untyped __call__("imagecopymergegray", dst_im, src_im, dst_x, dst_y, src_x, src_y, src_w, src_h, pct);
	}
	
	/** imagecopyresampled() copies a rectangular portion of one image to another image, smoothly interpolating pixel values */
	public static inline function imageCopyResampled( dst_im:GDImageResource, src_im:GDImageResource, dst_x:Int, dst_y:Int, src_x:Int, src_y:Int, dst_w:Int, dst_h:Int, src_w:Int, src_h:Int ):Bool 
	{
		return untyped __call__("imagecopyresampled", dst_im, src_im, dst_x, dst_y, src_x, src_y, dst_w, dst_h, src_w, src_h);
	}
	
	/**  */
	public static inline function imageCopyResized ( dst_im:GDImageResource, src_im:GDImageResource, dst_x:Int, dst_y:Int, src_x:Int, src_y:Int, dst_w:Int, dst_h:Int, src_w:Int, src_h:Int ):Bool 
	{
		return untyped __call__("imagecopyresized", dst_im, src_im, dst_x, dst_y, src_x, src_y, dst_w, dst_h, src_w, src_h);
	}
	
	/** returns an image identifier representing a blank image of size x_size by y_size. */
	public static function imageCreate( x_size:Int, y_size:Int):GDImageResource 
	{
		var img = untyped __call__("imagecreate", x_size, y_size);
	
		return (Std.is(img, Bool)) ? null : img;
	}
	
	/** create image from a GIF file */
	public static function imageCreateFromGif(filename:String):GDImageResource
	{
		var img = untyped __call__("imagecreatefromgif", filename);
		
		return (Std.is(img, Bool)) ? null : img;
	}
	
	/** create image from a JPG file */
	public static function imageCreateFromJpeg(filename:String):GDImageResource
	{
		var img = untyped __call__("imagecreatefromjpeg", filename);
		
		return (Std.is(img, Bool)) ? null : img;
	}
	
	/** create image from a PNG file */
	public static function imageCreateFromPng(filename:String):GDImageResource
	{
		var img = untyped __call__("imagecreatefrompng", filename);
		
		return (Std.is(img, Bool)) ? null : img;
	}
	
	/** create image from a String */
	public static function imageCreateFromString(filename:String):GDImageResource
	{
		var img = untyped __call__("imagecreatefromstring", filename);
		
		return (Std.is(img, Bool)) ? null : img;
	}
	
	/** create image from a WBMP file */
	public static function imageCreateFromBmp(filename:String):GDImageResource
	{
		var img = untyped __call__("imagecreatefromwbmp", filename);
		
		return (Std.is(img, Bool)) ? null : img;
	}
	
	/** create image from a XBM file */
	public static function imageCreateFromXbm(filename:String):GDImageResource
	{
		var img = untyped __call__("imagecreatefromxbm", filename);
		
		return (Std.is(img, Bool)) ? null : img;
	}
	
	/** create image from a XPM file */
	public static function imageCreateFromXpm(filename:String):GDImageResource
	{
		var img = untyped __call__("imagecreatefromxpm", filename);
		
		return (Std.is(img, Bool)) ? null : img;
	}
	
	/** returns an image identifier representing a blank image of size x_size by y_size. */
	public static function imageCreateTrueColor ( x_size:Int, y_size:Int):GDImageResource 
	{
		var img = untyped __call__("imagecreatetruecolor", x_size, y_size);
		
		return (Std.is(img, Bool)) ? null : img;
	}
	
	/** draws an ellipse centered at cx, cy (top left is 0, 0) in the image represented by image. W and h specifies the ellipse's width and height respectively. The color of the ellipse is specified by color */
	public static inline function  imageEllipse(image:GDImageResource, cx:Int, cy:Int, w:Int, h:Int, color:Int ):Bool
	{
		return untyped __call__("imageellipse", image, cx, cy, w, h, color);
	}
	
	public static inline function  imageDestroy(image:GDImageResource):Bool
	{
		return untyped __call__("imagedestroy", image);
	}
	
	/** performs a flood fill starting at coordinate x, y (top left is 0, 0) with color color in the image image */
	public static inline function imageFill(image:GDImageResource, x:Int, y:Int, color:Int):Bool
	{
		return untyped __call__("imagefill", image, x, y, color);
	}
	
	/** draws a partial ellipse centered at cx, cy (top left is 0, 0) in the image represented by image. */
	public static inline function imageFilledArc(image:GDImageResource, cx:Int, cy:Int, w:Int, h:Int, s:Int, e:Int, color:Int, style:Int):Bool
	{
		return untyped __call__("imagefilledarc", image, cx, cy, w, h, s, e, color, style);
	}
	
	/** draws an ellipse centered at cx, cy (top left is 0, 0) in the image represented by image. W and h specifies the ellipse's width and height respectively. The ellipse is filled using color */
	public static inline function imageFilledEllipse(image:GDImageResource, cx:Int, cy:Int, w:Int, h:Int, s:Int, e:Int, color:Int, style:Int):Bool
	{
		return untyped __call__("imagefilledellipse", image, cx, cy, w, h, color);
	}

	/** creates a filled polygon in image image. points is an array containing the x and y co-ordinates of the polygons vertices consecutively. The parameter num_points is the total number of vertices, which must be larger than 3.  */
	public static inline function imageFilledPolygon(image:GDImageResource, points:Array<Dynamic>, num_points:Int, color:Int):Bool
	{
		return untyped __call__("imagefilledpolygon", image, points, num_points);
	}
	
	/** creates a filled rectangle of color color in image image starting at upper left coordinates x1, y1 and ending at bottom right coordinates x2, y2. 0, 0 is the top left corner of the image. */
	public static inline function imageFilledRectangle(image:GDImageResource, x1:Int, y1:Int, x2:Int, y2:Int, color:Int):Bool
	{
		return untyped __call__("imagefilledrectangle", image, x1, y1, x2, y2, color);
	}
	
	/** performs a flood fill whose border color is defined by border. The starting point for the fill is x, y (top left is 0, 0) and the region is filled with color color. */
	public static inline function imageFillToBorder(image:GDImageResource, x:Int, y:Int, border:Int, color:Int):Bool
	{
		return untyped __call__("imagefilltoborder", image, x, y, border, color);
	}
	
	/** performs a flood fill whose border color is defined by border. The starting point for the fill is x, y (top left is 0, 0) and the region is filled with color color. */
	public static function imageType(src_im:GDImageResource, filtertype:GDImageFilter, ?arg1:Int, ?arg2:Int, ?arg3:Int):Bool
	{
		var filters = [GDImageFilter.NEGATE, GDImageFilter.GRAYSCALE, GDImageFilter.BRIGHTNESS, GDImageFilter.CONTRAST, GDImageFilter.COLORIZE, GDImageFilter.EDGEDETECT, GDImageFilter.EMBOSS, GDImageFilter.GAUSSIAN_BLUR, GDImageFilter.SELECTIVE_BLUR, GDImageFilter.MEAN_REMOVAL, GDImageFilter.SMOOTH];
		
		var c = 0;
		for ( i in filters)
		{
			if (i == filtertype) break;
			c++;
		}
		
		return untyped __call__("imageType", src_im, c, arg1, arg2, arg3);
	}
	
	/** Returns the pixel height of a character in the specified font. */
	public static inline function imageFontHeight(font:Int):Int
	{
		return untyped __call__("imagefontheight", font);
	}
	
	/** Returns the pixel width of a character in font.  */
	public static inline function imageFontWidth (font:Int):Int
	{
		return untyped __call__("imagefontwidth", font);
	}
	
	/** Give the bounding box of a text using fonts via freetype2 */
	public static inline function imageFTBBox (size:Float, angle:Float, font_file:String, text:String, ?extrainfo:Array<Dynamic> ):Array<Dynamic>	
	{
		return untyped __call__("imageftbbox", size, angle, font_file, text, extrainfo);
	}
	
	/** Write text to the image using fonts using FreeType 2  */
	public static inline function imageFTText(image:GDImageResource, size:Float, angle:Float, x:Int, y:Int, col:Int, font_file:String, text:String, ?extrainfo:Array<Dynamic> ):Array<Dynamic>
	{
		return untyped __call__("imagefttbox", image, size, angle, x, y, col, font_file, text, extrainfo);
	}
	
	/** Apply a gamma correction to a GD image */
	public static inline function  imageGammaCorrect( image:GDImageResource, inputgamma:Float, outputgamma:Float )
	{
		return untyped __call__("imagegammacorrect", image, inputgamma, outputgamma );
	}
	
	/** Output GD2 image to browser or file */
	public static inline function  imageGD2( image:GDImageResource, ?filename:String, ?chunk_size:Int, type:Int):Bool
	{
		return untyped __call__("imagegd2", image, filename, chunk_size, type );
	}
	
	/** Output GD image to browser or file */
	public static inline function  imageGD( image:GDImageResource, ?filename:String):Bool
	{
		return untyped __call__("imagegd", image, filename );
	}
	
	/** Output image to browser or file as GIF */
	public static inline function imageGif ( image:GDImageResource, ?filename:String ):Bool
	{
		return untyped __call__("imagegif", image, filename);
	}
	
	/** Enable or disable interlace */
	public static inline function imageInterlace( image:GDImageResource, ?interlace:Int ):Int
	{
		return untyped __call__("imageinterlace", image, interlace);
	}
	
	/** Finds whether an image is a truecolor image  */
	public static inline function imageIsTrueColor ( image:GDImageResource ):Bool
	{
		return untyped __call__("imageistruecolor ", image );
	}
	
	/** Output image to browser or file as JPEG */
	public static function imageJpeg ( image:GDImageResource, ?filename:String=null, ?quality:Int=80 ):Bool
	{
		return untyped __call__("imagejpeg", image, filename, quality);
	}
	
	
	/** Set the alpha blending flag to use the bundled libgd layering effects  */
	public static function imageLayerEffect ( image:GDImageResource, effect:GDImageLayerEffect ):Bool
	{
		var filters = [GDImageLayerEffect.REPLACE, GDImageLayerEffect.NORMAL, GDImageLayerEffect.OVERLAY];
		
		var c = 0;
		for ( i in filters)
		{
			if (i == effect) break;
			c++;
		}
		
		return untyped __call__("imagelayereffect", image, c);
	}
	
	/** draws a line from x1, y1 to x2, y2 (top left is 0, 0) in image image of color color. */
	public static inline function imageLine (image:GDImageResource, x1:Int, y1:Int, x2:Int, y2:Int, color:Int ):Bool
	{
		return untyped __call__("imageline", image, x1, y1, x2, y2, color);
	}
	
	/** Load a new font */
	public static inline function imageLoadFont ( file:String ):Int
	{
		return untyped __call__("imageloadfont", file);
	}
	
	/** Copy the palette from one image to another  */
	public static inline function imagePaletteCopy ( destination:GDImageResource, source:GDImageResource ):Void
	{
		untyped __call__("imagepalettecopy", destination, source);
	}
	
	/** Output image to browser or file as PNG  */
	public static inline function imagePng ( image:GDImageResource, ?filename:String ):Bool
	{
		return untyped __call__("imagepng", image, filename);
	}
	
	/** creates a polygon in image  */
	public static inline function imagePolygon ( image:GDImageResource, points:Array<Dynamic>, num_points:Int, color:Int ):Bool
	{
		return untyped __call__("imagepolygon", image, points, num_points, color);
	}
	
	/** Give the bounding box of a text rectangle using PostScript Type1 fonts  */
	public static inline function imagePSBBox ( text:String, font:Int, size:Int, ?space:Int, ?tightness:Int, angle:Float ):Array<Dynamic>
	{
		return untyped __call__("imagepsbbox", text, font, size, space, tightness, angle);
	}
	
	/** Change the character encoding vector of a font  */
	public static inline function imagePSEncodeFont( font_index:GDFontResource, encodingfile:String ):Bool
	{
		return untyped __call__("imagepsencodefont", font_index, encodingfile );
	}
	
	/** Extend or condense a font  */
	public static inline function imagePSExtendFont( font_index:Int, extend:Float ):Bool
	{
		return untyped __call__("imagepsextendfont", font_index, extend );
	}
	
	/** Free memory used by a PostScript Type 1 font   */
	public static inline function imagePSFreeFont ( fontindex:GDFontResource ):Bool
	{
		return untyped __call__("imagepsfreefont", fontindex );
	}
	
	/** Load a PostScript Type 1 font from file  */
	public static inline function imagePSLoadFont ( filename:String ):GDFontResource
	{
		return untyped __call__("imagepsloadfont", filename );
	}
	
	/** Slant a font */
	public static inline function imagePSSlantFont ( font_index:GDFontResource, slant:Float ):Bool
	{
		return untyped __call__("imagepsslantfont", font_index, slant );
	}
	
	/** To draw a text string over an image using PostScript Type1 fonts  */
	public static inline function imagePSText ( image:GDImageResource, text:String, font:GDFontResource, size:Int, foreground:Int, background:Int, x:Int, y:Int, ?space:Int, ?tightness:Int, ?angle:Float, ?antialias_steps:Int )
	{
		return untyped __call__("imagepstext", image, text, font, size, foreground, background, x, y, space, tightness, angle, antialias_steps );
	}
	
	/** creates a rectangle of color col in image image starting at upper left coordinate x1, y1 and ending at bottom right coordinate x2, y2. 0, 0 is the top left corner of the image.   */
	public static inline function imageRectangle ( image:GDImageResource, x1:Int, y1:Int, x2:Int, y2:Int, col:Int ):Bool
	{
		return untyped __call__("imagerectangle", image, x1, y1, x2, y2, col );
	}
	
	/** Rotate an image with a given angle */
	public static inline function imageRotate ( src_im:GDImageResource, angle:Float, bgd_color:Int, ?ignore_transparent:Int ):GDImageResource
	{
		return untyped __call__("imagerotate", src_im, angle, bgd_color, ignore_transparent);
	}
	
	/** Set the flag to save full alpha channel information (as opposed to single-color transparency) when saving PNG images  */
	public static inline function imageSaveAlpha( image:GDImageResource, saveflag:Bool ):Bool
	{
		return untyped __call__("imagesavealpha ", image, saveflag );
	}
	
	/** Set the brush image for line drawing */
	public static inline function imageSetBrush ( image:GDImageResource, brush:GDImageResource ):Bool
	{
		return untyped __call__("imageSetBrush", image, brush );
	}
	
	/** Set the brush image for line drawing */
	public static inline function imageSetPixel ( image:GDImageResource, x:Int, y:Int, color:Int ):Bool
	{
		return untyped __call__("imagesetpixel", image, x, y, color );
	}
	
	/** Set the style for line drawing */
	public static inline function  imageSetStyle ( image:GDImageResource, style:Array<Dynamic> ):Bool
	{
		return untyped __call__("imagesetstyle", image, style );
	}
	
	/** Set the style for line drawing */
	public static inline function   imageSetThickness ( image:GDImageResource, thickness:Int ):Bool
	{
		return untyped __call__("imagesetthickness", image, thickness );
	}
	
	/** Set the tile image for filling */
	public static inline function imageSetTile ( image:GDImageResource, tile:GDImageResource ):Bool
	{
		return untyped __call__("imagesettile", image, tile );
	}
	
	/** Draw a string horizontally  */
	public static inline function imageString ( image:GDImageResource, font:Int, x:Int, y:Int, s:String, col:Int ):Bool
	{
		return untyped __call__("imagestring", image, font, x, y, s, col );
	}
	
	/** Draw a string vertically */
	public static inline function imageStringUp ( image:GDImageResource, font:Int, x:Int, y:Int, s:String, col:Int ):Bool
	{
		return untyped __call__("imagestringup", image, font, x, y, s, col );
	}
	
	/** Get image width  */
	public static inline function imageSX  ( image:GDImageResource ):Int
	{
		return untyped __call__("imagesx", image);
	}
	
	/** Get image height  */
	public static inline function imageSY  ( image:GDImageResource ):Int
	{
		return untyped __call__("imagesy", image);
	}
	
	/** Convert a true color image to a palette image  */
	public static inline function imageTrueColorToPalette ( image:GDImageResource, dither:Bool, ncolors:Int ):Bool
	{
		return untyped __call__("imagetruecolortopalette", image, dither, ncolors);
	}
	
	/** Convert a true color image to a palette image  */
	public static inline function imageTTFBBox( size:Float, angle:Float, fontfile:String, text:String ):Array<Dynamic>
	{
		return untyped __call__("imagettfbbox", size, angle, fontfile, text);
	}
	
	/** Write text to the image using TrueType fonts  */
	public static inline function imageTTFText( image:GDImageResource, size:Float, angle:Float, x:Int, y:Int, color:Int, fontfile:String, text:String ):Array<Dynamic>
	{
		return untyped __call__("imagettftext", image, size, angle, x, y, color, fontfile, text);
	}
	
	/** Return the image types supported by this PHP build   */
	public static inline function imageTypes():Int
	{
		return untyped __call__("imageTypes");
	}
	
	/** Output image to browser or file as WBMP  */
	public static inline function imageWBmp ( image:GDImageResource, ?filename:String, ?foreground:Int ):Bool
	{
		return untyped __call__("imagewbmp", image, filename, foreground);
	}
	
	/** Output image to browser or file as WBMP  */
	public static inline function imageXbm ( image:GDImageResource, ?filename:String, ?foreground:Int ):Bool
	{
		return untyped __call__("imagexbm", image, filename, foreground);
	}
	
	/** Embed binary IPTC data into a JPEG image */
	public static inline function iptcEmbed ( iptcdata:String, jpeg_file_name:String, ?spool:Int ):Dynamic
	{
		return untyped __call__("iptcembed", iptcdata, jpeg_file_name, spool);
	}
	
	/** Parse a binary IPTC http://www.iptc.org/ block into single tags.  */
	public static inline function iptcParse ( iptcblock:String ):Array<Dynamic>
	{
		return untyped __call__("iptcparse", iptcblock);
	}
	
	/** Convert JPEG image file to WBMP image file  */
	public static inline function jpeg2wbmp ( jpegname:String, wbmpname:String, d_height:Int, d_width:Int, threshold:Int):Int
	{
		return untyped __call__("jpeg2wbmp", jpegname, wbmpname, d_height, d_width, threshold);
	}
	
	/** Convert PNG image file to WBMP image file  */
	public static inline function png2wbmp ( pngname:String, wbmpname:String, d_height:Int, d_width:Int, threshold:Int ):Int
	{
		return untyped __call__("png2wbmp", pngname, wbmpname, d_height, d_width, threshold);
	}

	
}

typedef GDImageResource = { }
typedef GDFontResource = { }

typedef GDColorDef = {
	var red:Int;
	var green:Int;
	var blue:Int;
	var alpha:Int;
}

typedef GDImageSizeResult = {
	var width:Int;
	var height:Int;
	var type:GDImageType;
	var bits:Int;
	var channels:Int;
	var mime:String;
}

enum GDImageLayerEffect
{
	REPLACE;
	NORMAL;
	OVERLAY;
}

enum GDImageFilter
{
	NEGATE;
	GRAYSCALE;
	BRIGHTNESS;
	CONTRAST;
	COLORIZE;
	EDGEDETECT;
	EMBOSS;
	GAUSSIAN_BLUR;
	SELECTIVE_BLUR;
	MEAN_REMOVAL;
	SMOOTH;
}

enum GDImageType
{
	GIF;
	JPG;
	PNG;
	SWF;
	PSD;
	BMP;
	TIFF_II;
	TIFF_MM;
	JPC;
	JP2;
	JPX;
	JB2;
	SWC;
	IFF;
	WBMP;
	XBM;
}