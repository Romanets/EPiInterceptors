//>>built
define("dojo/data/util/filter",["dojo/_base/lang"],function(_1){var _2=_1.getObject("dojo.data.util.filter",true);_2.patternToRegExp=function(_3,_4){var _5="^";var c=null;for(var i=0;i<_3.length;i++){c=_3.charAt(i);switch(c){case "\\":_5+=c;i++;_5+=_3.charAt(i);break;case "*":_5+=".*";break;case "?":_5+=".";break;case "$":case "^":case "/":case "+":case ".":case "|":case "(":case ")":case "{":case "}":case "[":case "]":_5+="\\";default:_5+=c;}}_5+="$";if(_4){return new RegExp(_5,"mi");}else{return new RegExp(_5,"m");}};return _2;});