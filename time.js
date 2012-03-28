//Format Strings:
////////////////////
//%s - seconds
//%m - minutes
//%h - hours
//%d - days
//can have a modifier like:
//%s{5, 0}
//in the format of:
//{
//    length to zero pad to reach (if number is >= length no modification is made), 
//    decimal precision (rounded) where 0 is whole number (rounded)
//}
//so if we have 4.356 seconds
//%s	    = '4'
//%s{0}	    = '4'
//%s{0, 0}  = '4'
//%s{2}	    = '04'
//%s{2, 2}  = '04.36'
//%s{3, 1}  = '004.4'
/////////////////////
    
!function(window, undefined) {
    //private vars
    var get_formatters = /%[smhd](\{[\d]+(,[ ]*[\d]+)?\})?/g;

    //ctor
    function Time(ms) {
	this._secs = 0;
	this._mins = 0;
	this._hrs = 0;
	this._days = 0;
	
	if(ms) {
	    var x = ms / 1000;
	    
	    this._secs = x % 60;
	    x /= 60;
	    this._mins = x % 60;
	    x /= 60;
	    this._hrs = x % 24;
	    x /= 24;
	    this._days = x;
	}
    }
    
    //public instance methods
    Time.prototype.toString = function(fmat) {
	var formats = fmat.match(get_formatters);
	
	for(var i in formats) {
	    var f = formats[i],
		type = f.substring(0, 2),
		nums = f.match(/[\d]+/g),
		padding = 0, precision = 0, value = 0;
	    
	    if(nums) {
		padding = nums[0];
		if(nums[1]) precision = nums[1];
	    }
	    
	    switch(f.substring(0,2)) {
		case '%s':
		    value = this._secs;
		    break;
		case '%m':
		    value = this._mins;
		    break;
		case '%h':
		    value = this._hrs;
		    break;
		case '%d':
		    value = this._days;
		    break;
	    }
	    
	    fmat = fmat.replace(f, pad(Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision), padding));
	}
	
	return fmat;
    };
    
    //public static methods
    Time.format = function(ms, fmat) {
	return (new Time(ms)).toString(fmat);
    };
    
    //private methods
    function pad(num, len) {
	var str = '' + num; //convert to string
	while(str.length < len) {
	    str = '0' + str;
	}
	
	return str;
    }
    
    //exports, for node
    try {
	module.exports = Time;
    } 
    //if it fails to register for node, register for browser
    catch(e) {
	window.Time = Time;
    }
}(window);