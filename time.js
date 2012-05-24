//Format Strings:
////////////////////
//%M - miliseconds
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
    
!function(undefined) {
    //private vars
    var get_formatters = /%[smhdM](\{[\d]+(,[ ]*[\d]+)?\})?/g,
	formatters = {
	    ms: '%M',
	    secs: '%s',
	    mins: '%m',
	    hrs: '%h',
	    days: '%d'
	}

    //ctor
    function Time(ms) {
	this._total_ms = 0;
	if(ms) this._total_ms = ms;
	
	//parseMs(this);
    }
    
    //public instance methods
    Time.prototype.toString = function(fmat) {
	var formats = fmat.match(get_formatters),
	    largest = getLargestFormatter(fmat);
	    
	parseMs(this, largest);
	
	for(var i = 0; i < formats.length; ++i) {
	    var f = formats[i],
		type = f.substr(0, 2),
		nums = f.match(/[\d]+/g),
		padding = 0, precision = 0, value = 0;
	    
	    if(nums) {
		padding = nums[0];
		if(nums[1]) precision = nums[1];
	    }
	    
	    switch(f.substr(0,2)) {
		case formatters.ms:
		    value = this._ms;
		    break;
		case formatters.secs:
		    value = this._secs;
		    break;
		case formatters.mins:
		    value = this._mins;
		    break;
		case formatters.hrs:
		    value = this._hrs;
		    break;
		case formatters.days:
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
    
    function getLargestFormatter(fmat) {
	if(fmat.indexOf(formatters.days) > -1)
	    return formatters.days;
	if(fmat.indexOf(formatters.hrs) > -1)
	    return formatters.hrs;
	if(fmat.indexOf(formatters.mins) > -1)
	    return formatters.mins;
	if(fmat.indexOf(formatters.secs) > -1)
	    return formatters.secs;
	if(fmat.indexOf(formatters.ms) > -1)
	    return formatters.ms;
    }
    
    function parseMs(t, upTo) {
	var ms = t._total_ms;
	
	t._ms = 0;
	t._secs = 0;
	t._mins = 0;
	t._hrs = 0;
	t._days = 0;
	
	if(ms) {
	    //ms in ms, ms in sec, sec in min, min in hrs, hrs in days
	    var woopDivisor = [1, 1000, 60, 60, 24],
		woopFormat = [formatters.ms, formatters.secs, formatters.mins, formatters.hrs, formatters.days],
		woopUnits = ['_ms', '_secs', '_mins', '_hrs', '_days'],
		i = 0, maxWoop = 5;
	    
	    do
	    {
		ms /= woopDivisor[i];
		
		if(woopDivisor[i + 1] && woopFormat[i] != upTo)
		    t[woopUnits[i]] = ms % woopDivisor[i + 1];
		else if (ms >= 1)
		    t[woopUnits[i]] = ms;
		
		++i;
	    } while(i < maxWoop && woopFormat[i - 1] != upTo);
	}
    }
    
    //exports, for node
    if(typeof(exports) !== 'undefined')
        exports.Time = Time;
    else
        window.Time = Time;
}();