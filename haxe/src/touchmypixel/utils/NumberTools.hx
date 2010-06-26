/**
 * ...
 * @author Tony Polinelli
 */

package peepee.utils;

class NumberTools 
{

	public static function constrain(n:Float, ?min:Float, ?max:Float):Float
	{
		if (min == null) min = Math.NEGATIVE_INFINITY;
		if (max == null) max = Math.POSITIVE_INFINITY;
		if (n < min) n = min;
		if (n > max) n = max;
		return(n);
	}
	
	public static function getNumberSuffix(number:Float):String
	{
		var num:String = Std.string(number);
		var e = "";
		if (number > 10 && number < 14)
		{
			e = "th";
		} 
		else 
		{
			switch(num.charAt(num.length-1))
			{
				case ("1"): e = "st"; 
				case ("2"): e = "nd"; 
				case ("3"): e = "rd"; 
				default: e = "th";
			}
		}
		return e;
	}
	
	public static function formatToDollars(value:Float, includeDecimals:Bool = false, addDollor:Bool = true):Void
	{
		/*var left = Std.string(Math.floor(value));
		var right = value - left;
		var rightCut = Math.round(right * 100) / 100;
		var leftFormat = "";
		var leftOut = "";
		//for (i = 0; i < left.length; i++) {
		for (i in 0...left.length){
			if (i % 3 == 0 && i != 0) {
				leftFormat += ",";
			}
			leftFormat += left.charAt(left.length - 1 - i);
		}
		//for (i = 0; i < leftFormat.length; i++) {
		for (i in 0...leftFormat.length){
			leftOut += leftFormat.charAt(leftFormat.length - 1 - i);
		}
		if (includeDecimals) {
			if (addDollor) return("$" + leftFormat + "." + rightCut);
			return(leftFormat + "." + rightCut);
		} else {
			if (addDollor) return ("$" + leftOut);
			return (leftOut);
		}*/
	}
	
	public static function zeroNumber(number:Float, ?padToLeft:Int=1, ?padToRight:Int=0, ?padWith:String="0"):String
	{
		var parts = Std.string(number).split(".");
		var left:String = parts[0];
		var right:String = parts[1] != null ? parts[1] : "";
		
		if (left.length < padToLeft)
		{
			var diff = padToLeft - left.length;
			while (diff > 0)
			{
				left = padWith + left;
				diff--;
			}
		}
		
		if (right.length < padToRight)
		{
			var diff = padToRight - right.length;
			while (diff > 0)
			{
				right += padWith;
				diff--;
			}
		}
		
		return left + (right != ""? "." : "") + right;
	}
	
}