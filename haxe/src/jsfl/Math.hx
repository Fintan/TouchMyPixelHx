package jsfl;
import jsfl.Fl;

extern class Math {
	public static function concatMatrix(mat1:Matrix,mat2:Matrix):Matrix;
	public static function invertMatrix(mat:Matrix):Matrix;
	public static function pointDistance(pt1:JSFLPoint,pt2:JSFLPoint):Float;
}