﻿/*
				var val = Reflect.field(obj,prop);
				if ( val != null && val == member){
					return true;
				}
			}
			
			#if !flash
			#else
				var keys:Array<String> = Reflect.fields(obj);
				
				if (keys.length > 0) return keys;
				
				var c = Type.getClass(obj);
				var xml : flash.xml.XML = untyped __global__["flash.utils.describeType"](c);
				if (xml.factory.length() == 0) return keys;
				var vars = xml.factory[0].child("variable");
				for( i in 0...vars.length() ) {
					var f = vars[i].attribute("name").toString();
					if( !obj.hasOwnProperty(f) )
						continue;
					keys.push(f);
				}
				return keys;
			#end