// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: �2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @namespace
 * The The-M-Project namespace.
 *
 * All The-M-Project methods and functions are defined inside of this namespace.
 */
var M = M || {};

/**
 * The version of The-M-Project
 */
M.version = '0.1';

/**
 * These command is used by the build tool to control the load order.
 * It does nothing on the client side.
 */
var m_require = m_require || function require() {};

/**
 * global constant to write YES instead of true
 */
var YES = true;
/**
 * global constant to write NO instead of false
 */
var NO = false;

M.LOCAL_STORAGE_PREFIX = '#m#';
M.LOCAL_STORAGE_SUFFIX = '_';

/* TODO: evaluate if the timestamp constants could be included in config file, for user's customization */
/**
 * constant that defines name of createdAt property and column name
 */
M.META_CREATED_AT = '_createdAt';
/**
 * constant that defines name of updatedAt property and column name
 */
M.META_UPDATED_AT = '_updatedAt';
/**
 * constant that defines name of m_id column name
 */
M.META_M_ID = '_m_id';

/**
 * Overwrites clear() of LocalStorage to clear only key-value pairs belonging to the application. If the previously existing,
 * delivered clear shall be used, users have to pass 'f' as param to clear to force it.
 * @param {String} param One character string. If it is 'f' (means 'force'), the existing clear() is used to clear the whole storage
 * if param is undefined or another letter, the custom clear is used.
 */
localStorage.__proto__.clear = function(param) {
    /* Call localStorage.clear() with parameter 'f' to use system wide localStorage.clear() */
    var l = this.length;
    if(param === 'f') {
        var l = this.length;
        for (var i = l - 1; i >= 0; i--){
            this.removeItem(this.key(i));
        }
    } else {
        for (var i = l - 1; i >= 0; i--){
            var k = this.key(i);
            var regexResult = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX).exec(k);
            if(regexResult) {
                this.removeItem(k);
            }
        }
    }
}// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: �2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/m.js');

/**
 * @class
 *
 * Base class of all objects.
 */

/**
 * @constructor
 */
M.Object =
/** @scope M.Object.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Object',

    /**
     * Creates an object.
     * 
     * @param obj
     */
    create: function(obj) {
        var f = function(){};
        f.prototype = obj;
        return new f();
    },

    /**
     * Creates a new class and extends it with all functions of the defined super class
     * The function takes multiple input arguments. Each argument serves as additional
     * super classes - see mixins.
     */
    extend: function(){
        var f = function(){};
        for(prop in this) {
            f.prototype[prop] = this[prop];
        }
        for(var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            for(prop in obj) {
                f.prototype[prop] = obj[prop];
            }
        }
        return new f();
    },

    include: function() {
        for(var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            for(prop in obj) {
                this[prop] = obj[prop];
            }
        }
    },

    /**
     * Binds a method to its caller, so it is always executed within the right scope.
     *
     * @param {Object} caller The scope of the method that should be bound.
     * @param {Object} method The method to be bound.
     * @param {Object} arg One or more arguments. If more, then apply is used instead of call.
     */
    bindToCaller: function(caller, method, arg) {
        return function() {
            if(_.isArray(arg)) {
                return method.apply(caller, arg);
            }
            return method.call(caller, arg);
        }
    },

    /**
     * Returns the class property behind the given key.
     *
     * @param {String} key The key of the property to be returned.
     */
    get: function(key) {
        return this[key];
    },

    /**
     * Returns the class property behind the given key.
     *
     * @param {String} key The key of the property to be changed.
     * @param {Object, String} value The value to be set.
     */
    set: function(key, value) {
        this[key] = value;
    },

    /**
     * This method will remove an object from the DOM and then delete it. 
     */
    destroy: function() {
        if(this.id && $('#' + this.id)) {
            $('#' + this.id).remove();
        }
        delete this;
    }

};// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: �2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      28.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * @class
 *
 * The root class for every request. Makes ajax requests. Is used e.g. for querying REST web services.
 * First M.Request.init needs to be called, then send.
 *
 * @extends M.Object
 */
M.Request = M.Object.extend(
/** @scope M.Request.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Request',

    /**
     * Initializes a request. Sets the parameter of this request object with the passed values.
     * 
     * @param {Object} obj The parameter object. Includes:
     * * method: the http method to use, e.g. 'POST'
     * * url: the request url, e.g. 'twitter.com/search.json' (needs a proxy to be set because of Same-Origin-Policy)
     * * isAsync: defines whether request should be made async or not. defaults to YES. Should be YES.
     * * isJSON: defines whether to process request and response as JSON
     * * timout: defines timeout in milliseconds
     * * data: the data to be transmitted
     * * beforeSend: callback that is called before request is sent
     * * onError: callback that is called when an error occured
     * * onSuccess: callback that is called when request was successful
     */
    init: function(obj){
        this.method = obj['method'] ? obj['method'] : this.method;
        this.url = obj['url'] ? obj['url'] : this.url;
        this.isAsync = obj['isAsync'] ? obj['isAsync'] : this.isAsync;
        this.isJSON = obj['isJSON'] ? obj['isJSON'] : this.isJSON;
        this.timeout = obj['timeout'] ? obj['timeout'] : this.timeout;
        this.data = obj['data'] ? obj['data'] : this.data;
        this.beforeSend = obj['beforeSend'] ? obj['beforeSend'] : this.beforeSend;
        this.onError = obj['onError'] ? obj['onError'] : this.onError;
        this.onSuccess = obj['onSuccess'] ? obj['onSuccess'] : this.onSuccess;
        return this;
    },

    /**
     * The HTTP method to use.
     *
     * Defaults to GET.
     *
     * @type String
     */
    method: 'GET',

    /**
     * The URL this request is sent to.
     *
     * @type String
     */
    url: null,

    /**
     * Sends the request asynchronously instead of blocking the browser.
     * You should almost always make requests asynchronous. �You can change this
     * options with the async() helper option (or simply set it directly).
     *
     * Defaults to YES.
     *
     * @type Boolean
     */
    isAsync: YES,


    /**
     * Processes the request and response as JSON if possible.
     *
     * Defaults to NO.
     *
     * @type Boolean
     */
    isJSON: NO,

    /**
     * Optional timeout value of the request in milliseconds.
     *
     * @type Number
     */
    timeout: null,

    /**
     * The data body of the request.
     *
     * @property {String, Object} 
     */
    data: null,

    /**
     * A pre-callback that is called right before the request is sent.
     *
     * @param {Object} request The XMLHttpRequest object.
     */
    beforeSend: function(request){},

    /**
     * The callback to be called if the request failed.
     *
     * @param {Object} request The XMLHttpRequest object.
     * @param {String} msg The error message.
     */
    onError: function(request, msg){},

    /**
     * The callback to be called if the request succeeded.
     * @param {String, Object} data The data returned from the server.
     * @param {String} msg A String describing the status.
     * @param {Object} request The XMLHttpRequest object.
     */
    onSuccess: function(data, msg, request){},


    /**
     * Sends an Ajax request by using jQuery's $.ajax().
     * Needs init first!
     */
    send: function(){
        $.ajax({
            type: this.method,
            url: this.url,
            async: this.isAsync,
            dataType: this.isJSON ? 'json' : 'text',
            timeout: this.timeout,
            data: this.data ? this.data : '',
            context: this,
            beforeSend: this.beforeSend,
            success: this.onSuccess,
            error: this.onError
        });
    }

});

// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      11.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * A constant value for milliseconds.
 *
 * @type String
 */
M.MILLISECONDS = 'milliseconds';

/**
 * A constant value for seconds.
 *
 * @type String
 */
M.SECONDS = 'seconds';

/**
 * A constant value for minutes.
 *
 * @type String
 */
M.MINUTES = 'minutes';

/**
 * A constant value for hours.
 *
 * @type String
 */
M.HOURS = 'hours';

/**
 * A constant value for days.
 *
 * @type String
 */
M.DAYS = 'days';

/**
 * A constant array for day names.
 *
 * @type String
 */
M.DAY_NAMES = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

/**
 * A constant array for month names.
 *
 * @type String
 */
M.MONTH_NAMES = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

/**
 * @class
 * 
 * M.Date defines a prototype for creating, handling and computing dates. It is basically a wrapper
 * to JavaScripts own date object that provides more convenient functionalities.
 *
 * @extends M.Object
 */
M.Date = M.Object.extend(
/** @scope M.Date.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Date',
    /**
     * The native JavaScript date object.
     *
     * @type Object
     */
    date: null,

    /**
     * Returns the current date, e.g.
     * Thu Nov 11 2010 14:20:55 GMT+0100 (CET)
     *
     * @returns {M.Date} The current date.
     */
    now: function() {
        return this.extend({
            date: new Date()
        });
    },

    /**
     * This method returns the date, 24h in the future.
     *
     * @returns {M.Date} The current date, 24 hours in the future.
     */
    tomorrow: function() {
        return this.daysFromNow(1);
    },

    /**
     * This method returns the date, 24h in the past.
     *
     * @returns {M.Date} The current date, 24 hours in the past.
     */
    yesterday: function() {
        return this.daysFromNow(-1);
    },

    /**
     * This method returns a date for a given date string. It is based on JS Date's parse
     * method.
     *
     * The following formats are accepted (time and timezone are optional):
     * - 11/12/2010
     * - 11/12/2010 15:28:15
     * - 11/12/2010 13:28:15 GMT
     * - 11/12/2010 15:28:15 GMT+0200
     * - 12 November 2010
     * - 12 November 2010 15:28:15
     * - 12 November 2010 13:28:15 GMT
     * - 12 November 2010 15:28:15 GMT+0200
     * - 12 Nov 2010
     * - 12 Nov 2010 15:28:15
     * - 12 Nov 2010 13:28:15 GMT
     * - 12 Nov 2010 15:28:15 GMT+0200
     *
     * If a wrong formatted date string is given, the method will return null. Otherwise a
     * JS Date object will be returned.
     *
     * @param {String} dateString The date string specifying a certain date.
     * @returns {M.Date} The date, specified by the given date string.
     */
    create: function(dateString) {
        var milliseconds = typeof(dateString) === 'number' ? dateString : null;

        if(!milliseconds) {
            var regexResult = /(\d{1,2})\.(\d{1,2})\.(\d{2,4})/.exec(dateString);
            if(regexResult && regexResult[1] && regexResult[2] && regexResult[3]) {
                var date = $.trim(dateString).split(' ');
                dateString = regexResult[2] + '/' + regexResult[1] + '/' + regexResult[3] + (date[1] ? ' ' + date[1] : '');
            }
            milliseconds = Date.parse(dateString);
        }

        if(dateString && !milliseconds) {
            M.Logger.log('Invalid dateString \'' + dateString + '\'.', M.WARN);
            return null;
        } else if(!dateString) {
            return this.now();
        }

        return this.extend({
            date: new Date(milliseconds)
        });
    },

    /**
     * This method formats a given date object according to the passed 'format' property and
     * returns it as a String.
     *
     * The following list defines the special characters that can be used in the 'format' property
     * to format the given date:
     *
     * d        Day of the month as digits; no leading zero for single-digit days.
     * dd 	    Day of the month as digits; leading zero for single-digit days.
     * ddd 	    Day of the week as a three-letter abbreviation.
     * dddd 	Day of the week as its full name.
     * m 	    Month as digits; no leading zero for single-digit months.
     * mm 	    Month as digits; leading zero for single-digit months.
     * mmm 	    Month as a three-letter abbreviation.
     * mmmm 	Month as its full name.
     * yy 	    Year as last two digits; leading zero for years less than 10.
     * yyyy 	Year represented by four digits.
     * h 	    Hours; no leading zero for single-digit hours (12-hour clock).
     * hh 	    Hours; leading zero for single-digit hours (12-hour clock).
     * H 	    Hours; no leading zero for single-digit hours (24-hour clock).
     * HH 	    Hours; leading zero for single-digit hours (24-hour clock).
     * M 	    Minutes; no leading zero for single-digit minutes.
     * MM 	    Minutes; leading zero for single-digit minutes.
     * s 	    Seconds; no leading zero for single-digit seconds.
     * ss 	    Seconds; leading zero for single-digit seconds.
     * l or L 	Milliseconds. l gives 3 digits. L gives 2 digits.
     * t 	    Lowercase, single-character time marker string: a or p.
     * tt   	Lowercase, two-character time marker string: am or pm.
     * T 	    Uppercase, single-character time marker string: A or P.
     * TT 	    Uppercase, two-character time marker string: AM or PM.
     * Z 	    US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the Opera browser, the GMT/UTC offset is returned, e.g. GMT-0500
     * o 	    GMT/UTC timezone offset, e.g. -0500 or +0230.
     * S 	    The date's ordinal suffix (st, nd, rd, or th). Works well with d.
     *
     * @param {String} format The format.
     * @param {Boolean} utc Determines whether to convert to UTC time or not. Default: NO.
     * @returns {String} The date, formatted with a given format.
     */
    format: function(format, utc) {
        if(isNaN(this.date)) {
            M.Logger.log('Invalid date!', M.WARN);   
        }

        var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;
        var	timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
        var	timezoneClip = /[^-+\dA-Z]/g;
        var	pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

		if(arguments.length == 1 && Object.prototype.toString.call(this.date) == "[object String]" && !/\d/.test(this.date)) {
			format = this.date;
			date = undefined;
		}

		var	_ = utc ? "getUTC" : "get";
        var	d = this.date[_ + "Date"]();
        var	D = this.date[_ + "Day"]();
        var	m = this.date[_ + "Month"]();
        var	y = this.date[_ + "FullYear"]();
        var	H = this.date[_ + "Hours"]();
        var	Min = this.date[_ + "Minutes"]();
        var	s = this.date[_ + "Seconds"]();
        var	L = this.date[_ + "Milliseconds"]();
        var	o = utc ? 0 : this.date.getTimezoneOffset();
        var	flags = {
            d:    d,
            dd:   pad(d),
            ddd:  M.DAY_NAMES[D],
            dddd: M.DAY_NAMES[D + 7],
            m:    m + 1,
            mm:   pad(m + 1),
            mmm:  M.MONTH_NAMES[m],
            mmmm: M.MONTH_NAMES[m + 12],
            yy:   String(y).slice(2),
            yyyy: y,
            h:    H % 12 || 12,
            hh:   pad(H % 12 || 12),
            H:    H,
            HH:   pad(H),
            M:    Min,
            MM:   pad(Min),
            s:    s,
            ss:   pad(s),
            l:    pad(L, 3),
            L:    pad(L > 99 ? Math.round(L / 10) : L),
            t:    H < 12 ? "a"  : "p",
            tt:   H < 12 ? "am" : "pm",
            T:    H < 12 ? "A"  : "P",
            TT:   H < 12 ? "AM" : "PM",
            Z:    utc ? "UTC" : (String(this.date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
            o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
            S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
        };
        
		return format.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
    },

    /**
     * This method returns a date in the future or past, based on 'days'. Basically it adds or
     * subtracts x times the milliseconds of a day, but also checks for clock changes and
     * automatically includes these into the calculation of the future or past date.
     *
     * @param {Number} days The number of days to be added to or subtracted from the current date.
     * @returns {M.Date} The current date, x days in the future (based on parameter 'days').
     */
    daysFromNow: function(days) {
        var date = this.now();
        return date.daysFromDate(days);
    },

    /**
     * This method returns a date in the future or past, based on 'days' and a given date. Basically
     * it adds or subtracts x days, but also checks for clock changes and automatically includes
     * these into the calculation of the future or past date.
     *
     * @param {Number} days The number of days to be added to or subtracted from the current date.
     * @returns {M.Date} The date, x days in the future (based on parameter 'days').
     */
    daysFromDate: function(days) {
        return this.millisecondsFromDate(days * 24 * 60 * 60 * 1000);
    },

    /**
     * This method returns a date in the future or past, based on 'hours'. Basically it adds or
     * subtracts x times the milliseconds of an hour, but also checks for clock changes and
     * automatically includes these into the calculation of the future or past date.
     *
     * @param {Number} hours The number of hours to be added to or subtracted from the current date.
     * @returns {M.Date} The current date, x hours in the future (based on parameter 'hours').
     */
    hoursFromNow: function(hours) {
        var date = this.now();
        return date.hoursFromDate(hours);
    },

    /**
     * This method returns a date in the future or past, based on 'hours' and a given date. Basically
     * it adds or subtracts x hours, but also checks for clock changes and automatically includes
     * these into the calculation of the future or past date.
     *
     * @param {Number} hours The number of hours to be added to or subtracted from the current date.
     * @returns {M.Date} The date, x hours in the future (based on parameter 'hours').
     */
    hoursFromDate: function(hours) {
        return this.millisecondsFromDate(hours * 60 * 60 * 1000);
    },

    /**
     * This method returns a date in the future or past, based on 'minutes'. Basically it adds or
     * subtracts x times the milliseconds of a minute, but also checks for clock changes and
     * automatically includes these into the calculation of the future or past date.
     *
     * @param {Number} minutes The number of minutes to be added to or subtracted from the current date.
     * @returns {M.Date} The current date, x minutes in the future (based on parameter 'minutes').
     */
    minutesFromNow: function(minutes) {
        var date = this.now();
        return date.minutesFromDate(minutes);
    },

    /**
     * This method returns a date in the future or past, based on 'minutes' and a given date. Basically
     * it adds or subtracts x minutes, but also checks for clock changes and automatically includes
     * these into the calculation of the future or past date.
     *
     * @param {Number} minutes The number of minutes to be added to or subtracted from the current date.
     * @returns {M.Date} The date, x minutes in the future (based on parameter 'minutes').
     */
    minutesFromDate: function(minutes) {
        return this.millisecondsFromDate(minutes * 60 * 1000);
    },

    /**
     * This method returns a date in the future or past, based on 'seconds'. Basically it adds or
     * subtracts x times the milliseconds of a second, but also checks for clock changes and
     * automatically includes these into the calculation of the future or past date.
     *
     * @param {Number} seconds The number of seconds to be added to or subtracted from the current date.
     * @returns {M.Date} The current date, x seconds in the future (based on parameter 'seconds').
     */
    secondsFromNow: function(seconds) {
        var date = this.now();
        return date.secondsFromDate(seconds);
    },

    /**
     * This method returns a date in the future or past, based on 'seconds' and a given date. Basically
     * it adds or subtracts x seconds, but also checks for clock changes and automatically includes
     * these into the calculation of the future or past date.
     *
     * @param {Number} seconds The number of seconds to be added to or subtracted from the current date.
     * @returns {M.Date} The date, x seconds in the future (based on parameter 'seconds').
     */
    secondsFromDate: function(seconds) {
        return this.millisecondsFromDate(seconds * 1000);
    },

    /**
     * This method returns a date in the future or past, based on 'milliseconds'. Basically it adds or
     * subtracts x milliseconds, but also checks for clock changes and automatically includes these
     * into the calculation of the future or past date.
     *
     * @param {Number} milliseconds The number of milliseconds to be added to or subtracted from the current date.
     * @returns {M.Date} The current date, x milliseconds in the future (based on parameter 'milliseconds').
     */
    millisecondsFromNow: function(milliseconds) {
        var date = this.now();
        return date.millisecondsFromDate(milliseconds);
    },

    /**
     * This method returns a date in the future or past, based on 'milliseconds' and a given date. Basically
     * it adds or subtracts x milliseconds, but also checks for clock changes and automatically includes
     * these into the calculation of the future or past date.
     *
     * @param {Number} milliseconds The number of milliseconds to be added to or subtracted from the current date.
     * @returns {M.Date} The date, x milliseconds in the future (based on parameter 'milliseconds').
     */
    millisecondsFromDate: function(milliseconds) {
        if(!this.date) {
            M.Logger.log('no date specified!', M.ERROR);
        }

        var outputDate = new Date(Date.parse(this.date) + milliseconds);
        return this.extend({
            date: new Date(Date.parse(outputDate) + (outputDate.getTimezoneOffset() - this.date.getTimezoneOffset()) * (60 * 1000))
        });
    },

    /**
     * This method returns the time between two dates, based on the given returnType.
     *
     * Possible returnTypes are:
     * - M.MILLISECONDS: milliseconds
     * - M.SECONDS: seconds
     * - M.MINUTES: minutes
     * - M.HOURS: hours
     * - M.DAYS: days
     *
     * @param {Object} date The date.
     * @param {String} returnType The return type for the call.
     * @returns {Number} The time between the two dates, computed as what is specified by the 'returnType' parameter.
     */
    timeBetween: function(date, returnType) {
        var firstDateInMilliseconds = this.date ? this.date.valueOf() : null;
        var secondDateInMilliseconds = date.date ? date.date.valueOf() : null;
        
        if(firstDateInMilliseconds && secondDateInMilliseconds) {
            switch (returnType) {
                case M.DAYS:
                    return (secondDateInMilliseconds - firstDateInMilliseconds) / (24 * 60 * 60 * 1000);
                    break;
                case M.HOURS:
                    return (secondDateInMilliseconds - firstDateInMilliseconds) / (60 * 60 * 1000);
                    break;
                case M.MINUTES:
                    return (secondDateInMilliseconds - firstDateInMilliseconds) / (60 * 1000);
                    break;
                case M.SECONDS:
                    return (secondDateInMilliseconds - firstDateInMilliseconds) / 1000;
                    break;
                case M.MILLISECONDS:
                default:
                    return (secondDateInMilliseconds - firstDateInMilliseconds);
                    break;
            }
        } else if(firstDateInMilliseconds) {
            M.Logger.log('invalid date passed.', M.ERROR);
        } else {
            M.Logger.log('invalid date.', M.ERROR);
        }
    },

    /**
     * This method is used for stringify an M.Date object, e.g. when persisting it into locale storage.
     *
     * @private
     * @returns {String} The date as a string.
     */
    toJSON: function() {
        return String(this.date);
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      22.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * A constant value for being offline.
 *
 * @type String
 */
M.OFFLINE = 'offline';

/**
 * A constant value for being online.
 *
 * @type String
 */
M.ONLINE = 'online';

/**
 * A constant value for portrait orientation mode.
 *
 * @type String
 */
M.PORTRAIT = 0;

/**
 * A constant value for landscape right orientation mode.
 *
 * @type String
 */
M.LANDSCAPE_RIGHT = -90;

/**
 * A constant value for landscape left orientation mode.
 *
 * @type String
 */
M.LANDSCAPE_LEFT = 90;


/**
 * @class
 *
 * M.Environment encapsulates methods to retrieve information about the
 * environment, like browser used, platform, user agent (based on navigator
 * object) or whether or not the device is online (determined via an ajax
 * request).
 *
 * @extends M.Object
 */
M.Environment = M.Object.extend(
/** @scope M.Environment.prototype */ {

    /**
     * Checks the connection status by sending an ajax request
     * and waiting for the response to decide whether online or offline.
     *
     * The callback is called when the request returns successful or times out. The parameter to callback is a
     * string saying either offline or online.
     *
     * @param {function} callback The function to be called when request returns.
     * @param {String} url Optional. The request url. When not given, a request is made to google.com. (Note: Add a proxy: /google)
     * @param {Number} timeout Optional. Time in milliseconds until request is considered to be timed out. Defaults to 5 seconds.
     */
    getConnectionStatus: function(callback, url, timeout){
        M.Request.init({
            url: url ? url : '/google',
            isJSON: NO,
            timeout: timeout ? timeout : 5000,
            onSuccess: function(data){
                callback(M.ONLINE);
            },
            onError: function(data){
                callback(M.OFFLINE);
            }
        }).send();
    },

    /**
     * Returns the userAgent as received from navigator object.
     * E.g. "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Chrome/7.0.517.44 Safari/534.7"
     *
     * @returns {String} The user agent.
     */
    getUserAgent: function() {
        return navigator.userAgent;
    },

    /**
     * Returns the platform as received from navigator object.
     * E.g. "MacIntel"
     *
     * @returns {String} The user's platform.
     */
    getPlatform: function() {
        return navigator.platform;
    },

    /**
     * Returns the browser version as received from navigator object.
     * E.g. "5.0 (Macintosh; U; Intel Mac OS X 10_6_5; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Chrome/7.0.517.44 Safari/534.7"
     *
     * @returns {String} The user's browser.
     */
    getBrowserName: function() {
        return navigator.appName;
    },

    /**
     * Returns the currently available width and height of the browser window
     * as an array:
     *
     * 0 -> width
     * 1 -> height
     *
     * @returns {Array} The widht and height of the user's browser window.
     */
    getSize: function() {
        var viewportWidth;
        var viewportHeight;

        if(typeof window.innerWidth != 'undefined') {
            viewportWidth = window.innerWidth,
            viewportHeight = window.innerHeight
        } else if(typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
            viewportWidth = document.documentElement.clientWidth,
            viewportHeight = document.documentElement.clientHeight
        } else {
            viewportWidth = document.getElementsByTagName('body')[0].clientWidth,
            viewportHeight = document.getElementsByTagName('body')[0].clientHeight
        }

        return [viewportWidth, viewportHeight];
    },

    /**
     * Returns the currently available width of the browser window.
     *
     * @returns {Number} The width of the user's browser window.
     */
    getWidth: function() {
        return this.getSize()[0];
    },

    /**
     * Returns the currently available height of the browser window.
     *
     * @returns {Number} The height of the user's browser window.
     */
    getHeight: function() {
        return this.getSize()[1];
    },

    /**
     * This method returns the device's current orientation, depending on whether
     * or not the device is capable of detecting the current orientation. If the
     * device is unable to detect the current orientation, this method will return
     * NO.
     *
     * Possible return values are:
     *
     *   - M.PORTRAIT
     *   - M.LANDSCAPE_LEFT
     *   - M.LANDSCAPE_RIGHT
     *
     * @return {Number, Boolean} The orientation type as a constant value. (If the orientation can not be detected: NO.)
     */
    getOrientation: function() {
        switch(window.orientation) {
            case M.PORTRAIT:
                return M.PORTRAIT;
            case M.LANDSCAPE_LEFT:
                return M.LANDSCAPE_LEFT;
            case M.LANDSCAPE_RIGHT:
                return M.LANDSCAPE_RIGHT;
            default:
                M.Logger.log('This device does not support orientation detection.', M.WARN);
                return NO;
        }
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      29.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * @class
 *
 * M.I18N defines a prototype for for internationalisation and localisation within
 * The M-Project. It is used to set and get the application's language and to
 * localize any string within an application.
 *
 * @extends M.Object
 */
M.I18N = M.Object.extend(
/** @scope M.I18N.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.I18N',

    /**
     * The system's default language.
     *
     * @type String
     */
    defaultLanguage: 'en_us',

    /**
     * This property is used to map the navigator's language to an ISO standard
     * if necessary. E.g. 'de' will be mapped to 'de_de'. Currently we only provide
     * support for english and german. More languages are about to come or can be
     * added by overwriting this property.
     *
     * @type Object
     */
    languageMapper: {
        de: 'de_de',
        en: 'en_us'
    },
    
    /**
     * This method returns the localized string for the given key based on
     * the current language.
     *
     * @param {String} key The key to the localized string.
     * @returns {String} The localizes string based on the current application language.
     */
    l: function(key) {
        return this.localize(key);
    },

    /**
     * This method returns the localized string for the given key based on
     * the current language. It is internally used as a wrapper for l() for
     * a better readability.
     *
     * @private
     * @param {String} key The key to the localized string.
     * @returns {String} The localizes string based on the current application language.
     */
    localize: function(key) {
        if(!M.Application.currentLanguage) {
            M.Application.currentLanguage = this.getLanguage();
        }

        if(this[M.Application.currentLanguage] && this[M.Application.currentLanguage][key]) {
            return this[M.Application.currentLanguage][key];
        } else if(this[M.Application.defaultLanguage] && this[M.Application.defaultLanguage][key]) {
            M.Logger.log('Key \'' + key + '\' not defined for language \'' + M.Application.currentLanguage + '\', switched to default language \'' + M.Application.defaultLanguage + '\'', M.WARN);
            return this[M.Application.defaultLanguage][key];
        }  else if(this[this.defaultLanguage] && this[this.defaultLanguage][key]) {
            M.Logger.log('Key \'' + key + '\' not defined for language \'' + M.Application.currentLanguage + '\', switched to system\'s default language \'' + this.defaultLanguage + '\'', M.WARN);
            return this[this.defaultLanguage][key];
        } else {
            M.Logger.log('Key \'' + key + '\' not defined for both language \'' + M.Application.currentLanguage + '\' and the system\'s default language \'' + this.defaultLanguage + '\'', M.WARN);
        }

    },

    /**
     * This method sets the applications current language and forces it to reload.
     *
     * @param {String} language The language to be set.
     */
    setLanguage: function(language) {
        if(!this.isLanguageAvailable(language)) {
            M.Logger.log('There is no language \'' + language + '\' specified!', M.WARN);
            return;
        } else if(language && language === M.Application.currentLanguage) {
            M.Logger.log('Language \'' + language + '\' already selected', M.INFO);
            return;
        }

        if(localStorage) {
            localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'lang', language);
            location.href = location.protocol + '//' + location.host + location.pathname;
        }
    },

    /**
     * This method is used to get a language for the current user. This process is divided
     * into three steps. If one step leads to a language, this on is returned. The steps are
     * prioritized as follows:
     *
     * - get the user's language by checking his navigator
     * - use the application's default language
     * - use the systems's default language
     *
     * @param {Boolean} returnNavigatorLanguage Specify whether to return the navigator's language even if this language is not supported by this app.
     * @returns {String} The user's language.
     */
    getLanguage: function(returnNavigatorLanguage) {
        var language = null;

        if(localStorage) {
            language = localStorage.getItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'lang');
        }

        if(language) {
            return language;
        } else if(navigator) {
            var regexResult = /([a-zA-Z]{2,3})[\s_.-]?([a-zA-Z]{2,3})?/.exec(navigator.language);
            if(regexResult && this[regexResult[0]]) {
                return regexResult[0].toLowerCase();
            } else if(regexResult && regexResult[1] && this.languageMapper[regexResult[1]]) {
                var language = this.languageMapper[regexResult[1]];
                return language.toLowerCase();
            } else if(M.Application.defaultLanguage) {
                return M.Application.defaultLanguage.toLowerCase();
            }
        } else {
            return this.defaultLanguage;
        }
    },

    /**
     * This method checks if the passed language is available within the app or not. 
     *
     * @param {String} language The language to be checked.
     * @returns {Boolean} Indicates whether the requested language is available or not.
     */
    isLanguageAvailable: function(language) {
        if(this[language] && typeof(this[language]) === 'object') {
            return true;
        } else {
            M.Logger.log('no language \'' + language + '\' specified.', M.WARN);
            return false;
        }
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      22.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * A constant value for mathematical flooring.
 *
 * @type String
 */
M.FLOOR = 'floor';

/**
 * A constant value for mathematical ceiling.
 *
 * @type String
 */
M.CEIL = 'ceil';

/**
 * A constant value for mathematical rounding.
 *
 * @type String
 */
M.ROUND = 'round';

/**
 * @class
 *
 * This prototype defines methods for simpler handling of mathematical operations.
 *
 * @extends M.Object
 */
M.Math = M.Object.extend(
/** @scope M.Math.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Math',

    /**
     * This method returns the value of the base to the power of the exponent. So e.g.
     * pow(2, 3) would return '2 to the power of 3' --> 8.
     *
     * @param base {Number} The base.
     * @param exponent {Number} The exponent.
     * @returns {Number} The result of the operation.
     */
    pow: function(base, exponent) {
        return Math.pow(base, exponent);
    },

    /**
     * The method returns a random number within the range given by the min property
     * and the max property, including the min and max value.
     *
     * A test with 100.000 iterations for random(1, 3) created the following distribution:
     * - 1: 33.2%
     * - 2: 33.2%
     * - 3: 33.6%
     *
     * @param min {Number} The minimal value.
     * @param max {Number} The maximal value.
     * @returns {Number} The result of the operation.
     */
    random: function(min, max) {
        return Math.ceil(Math.random() * (max - min + 1) + min - 1);
    },

    /**
     * The method returns rounded version of the given input number. There are three
     * types of rounding available:
     *
     * - M.FLOOR: Returns the next lower integer, so 2.1 and 2.9 both would return 2.
     * - M.CEIL: Returns the next higher integer, so 2.1 and 2.9 both would return 3.
     * - M.ROUND: Returns the nearest integer, so 2.1 would return 2 and 2.9 would return 3.
     *
     * With the optional third parameter 'decimals', you can specify the number of decimal digits to be
     * returned. For example round(1.2345, M.FLOOR, 3) would return 1.234. The default for this parameter
     * is 0.
     *
     * @param input {Number} The input value.
     * @param type {String} The type of rounding.
     * @param type {Number} The number of decimals (only available for M.ROUND).
     * @returns {Number} The result of the operation.
     */
    round: function(input, type, decimals) {
        if(decimals) {
            input = input * (Math.pow(10, decimals));
        }
        var output = 0;
        switch (type) {
            case M.FLOOR:
                output = Math.floor(input);
                break;
            case M.CEIL:
                output = Math.ceil(input);
                break;
            case M.ROUND:
                default:
                output = Math.round(input);
                break;
        }
        if(decimals) {
            var outputStr = String(output / (Math.pow(10, decimals))).split('.');
            if(outputStr.length > 1) {
                output = parseFloat(outputStr[0] + '.' + outputStr[1].substring(0, decimals));
            } else {
                output = parseFloat(outputStr);
            }
        }

        return output;
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      11.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * @class
 *
 * This prototype defines decoding and encoding mechanisms based on the Base64 algorithm. You
 * normally don't call this object respectively its methods directly, but let M.Cypher handle
 * this.
 *
 * @extends M.Object
 */
M.Base64 = M.Object.extend(
/** @scope M.Base64.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Base64',

    /**
     * The key string for the base 64 decoding and encoding.
     *
     * @type String
     */
    keyString: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",    

    /**
     * This method encodes a given input string, using the base64 encoding.
     *
     * @param {String} input The string to be encoded.
     * @returns {String} The base64 encoded string.
     */
    encode: function(input) {
        var output = '';
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = M.Cypher.utf8_encode(input);

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if(isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if(isNaN(chr3)) {
                enc4 = 64;
            }

            output += this.keyString.charAt(enc1) + this.keyString.charAt(enc2) + this.keyString.charAt(enc3) + this.keyString.charAt(enc4);
        }

        return output;
    },

    /**
     * This method decodes a given input string, using the base64 decoding.
     *
     * @param {String} input The string to be decoded.
     * @returns {String} The base64 decoded string.
     */
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {
            enc1 = this.keyString.indexOf(input.charAt(i++));
            enc2 = this.keyString.indexOf(input.charAt(i++));
            enc3 = this.keyString.indexOf(input.charAt(i++));
            enc4 = this.keyString.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if(enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            
            if(enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        return M.Cypher.utf8_decode(output);
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      11.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * @class
 *
 * This prototype defines a hashing mechanism based on the SHA256 algorithm. You normally
 * don't call this object respectively its methods directly, but let M.Cypher handle
 * this.
 *
 * @extends M.Object
 */
M.SHA256 = M.Object.extend(
/** @scope M.SHA256.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.SHA256',

    /**
     * Defines the bits per input character: 8 - ASCII, 16 - Unicode
     *  
     * @type Number
     */
    chrsz: 8,

    /**
     * Defines the hex output format: 0 - lowercase, 1 - uppercase
     *
     * @type Number
     */
    hexcase: 0,

    /**
     * This method is called from the 'outside world', controls the hashing and
     * finally returns the hash value.
     *
     * @param {String} input The input string to be hashed.
     * @returns {String} The sha256 hashed string.
     */
    hash: function(input) {
        input = M.Cypher.utf8_encode(input);
        return this.binb2hex(this.core_sha256(this.str2binb(input), input.length * this.chrsz));
    },

    /**
     * @private
     */
    safe_add: function(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    },

    /**
     * @private
     */
    S: function(X, n) {
        return ( X >>> n ) | (X << (32 - n));
    },

    /**
     * @private
     */
    R: function(X, n) {
        return ( X >>> n );
    },

    /**
     * @private
     */
    Ch: function(x, y, z) {
        return ((x & y) ^ ((~x) & z));
    },

    /**
     * @private
     */
    Maj: function(x, y, z) {
        return ((x & y) ^ (x & z) ^ (y & z));
    },

    /**
     * @private
     */
    Sigma0256: function(x) {
        return (this.S(x, 2) ^ this.S(x, 13) ^ this.S(x, 22));
    },

    /**
     * @private
     */
    Sigma1256: function(x) {
        return (this.S(x, 6) ^ this.S(x, 11) ^ this.S(x, 25));
    },

    /**
     * @private
     */
    Gamma0256: function(x) {
        return (this.S(x, 7) ^ this.S(x, 18) ^ this.R(x, 3));
    },

    /**
     * @private
     */
    Gamma1256: function(x) {
        return (this.S(x, 17) ^ this.S(x, 19) ^ this.R(x, 10));
    },

    /**
     * @private
     */
    core_sha256: function(m, l) {
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;

        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;

        for (var i = 0; i < m.length; i += 16) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];

            for (var j = 0; j < 64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = this.safe_add(this.safe_add(this.safe_add(this.Gamma1256(W[j - 2]), W[j - 7]), this.Gamma0256(W[j - 15])), W[j - 16]);

                T1 = this.safe_add(this.safe_add(this.safe_add(this.safe_add(h, this.Sigma1256(e)), this.Ch(e, f, g)), K[j]), W[j]);
                T2 = this.safe_add(this.Sigma0256(a), this.Maj(a, b, c));

                h = g;
                g = f;
                f = e;
                e = this.safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = this.safe_add(T1, T2);
            }

            HASH[0] = this.safe_add(a, HASH[0]);
            HASH[1] = this.safe_add(b, HASH[1]);
            HASH[2] = this.safe_add(c, HASH[2]);
            HASH[3] = this.safe_add(d, HASH[3]);
            HASH[4] = this.safe_add(e, HASH[4]);
            HASH[5] = this.safe_add(f, HASH[5]);
            HASH[6] = this.safe_add(g, HASH[6]);
            HASH[7] = this.safe_add(h, HASH[7]);
        }
        return HASH;
    },

    /**
     * @private
     */
    str2binb: function(str) {
        var bin = Array();
        var mask = (1 << this.chrsz) - 1;
        for (var i = 0; i < str.length * this.chrsz; i += this.chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / this.chrsz) & mask) << (24 - i % 32);
        }
        return bin;
    },

    /**
     * @private
     */
    binb2hex: function(binarray) {
        var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                    hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8  )) & 0xF);
        }
        return str;
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/request.js');

/**
 * A constant value for logging level: debug.
 *
 * @type Number
 */
M.DEBUG = 0;

/**
 * A constant value for logging level: error.
 *
 * @type Number
 */
M.ERROR = 1;

/**
 * A constant value for logging level: warning.
 *
 * @type Number
 */
M.WARN = 2;

/**
 * A constant value for logging level: info.
 *
 * @type Number
 */
M.INFO = 3;

/**
 * @class
 *
 * M.Logger defines the prototype for any logging object. It is used to log messages out of the application
 * based on a given logging level.
 *
 * @extends M.Object
 */
M.Logger = M.Object.extend(
/** @scope M.Logger.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Logger',

    /**
     * This method is used to log anything out of an application based on the given logging level.
     * Possible values for the logging level are:
     *
     * - debug:   M.DEBUG
     * - error:   M.ERROR
     * - warning: M.WARN
     * - info: M.INFO
     *
     * @param {String} msg The logging message.
     * @param {Number} level The logging level.
     */
    log: function(msg, level) {
        level = level || M.DEBUG;

        /* Prevent a console.log from blowing things up if we are on a browser that doesn't support this. */
        if (typeof console === 'undefined') {
            window.console = {} ;
            console.log = console.info = console.warn = console.error = function(){};
        }
        
        switch (level) {
            case M.DEBUG:
                this.debug(msg);
                break;
            case M.ERROR:
                this.error(msg);
                break;
            case M.WARN:
                this.warn(msg);
                break;
            case M.INFO:
                this.info(msg);
                break;
            default:
                this.debug(msg);
                break;
        }
    },

    /**
     * This method is used to log a message on logging level debug.
     *
     * @private
     * @param {String} msg The logging message.
     */
    debug: function(msg) {
        console.debug(msg);
    },

    /**
     * This method is used to log a message on logging level error.
     *
     * @private
     * @param {String} msg The logging message.
     */
    error: function(msg) {
        console.error(msg);
    },

    /**
     * This method is used to log a message on logging level warning.
     *
     * @private
     * @param {String} msg The logging message.
     */
    warn: function(msg) {
        console.warn(msg);
    },

    /**
     * This method is used to log a message on logging level info.
     *
     * @private
     * @param {String} msg The logging message.
     */
    info: function(msg) {
        console.info(msg);
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      11.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/cypher_algorithms/base64.js');
m_require('core/utility/cypher_algorithms/sha256.js');

/**
 * @class
 *
 * M.Cypher defines a prototype for handling decoding, encoding and hashing of string
 * based values.
 *
 * @extends M.Object
 */
M.Cypher = M.Object.extend(
/** @scope M.Cypher.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Cypher',

    /**
     * The default decoder.
     *
     * @type M.Base64
     */
    defaultDecoder: M.Base64,

    /**
     * The default encoder.
     *
     * @type M.Base64
     */

    defaultEncoder: M.Base64,

    /**
     * The default hash algorithm.
     *
     * @type M.SHA256
     */

    defaultHasher: M.SHA256,

    /**
     * This method is the one that initiates the decoding of a given string, based on either
     * the default decoder or a custom decoder.
     *
     * @param {String} input The input string to be decoded.
     * @param {Object} algorithm The algorithm object containing a decode method.
     * @returns {String} The decoded string.
     */
    decode: function(input, algorithm) {

        if(algorithm && algorithm.decode) {
            return algorithm.decode(input);
        } else {
            return this.defaultDecoder.decode(input);
        }
        
    },

    /**
     * This method is the one that initiates the encoding of a given string, based on either
     * the default encoder or a custom encoder.
     *
     * @param {String} input The input string to be decoded.
     * @param {Object} algorithm The algorithm object containing a encode method.
     * @returns {String} The encoded string.
     */
    encode: function(input, algorithm) {

        if(algorithm && algorithm.encode) {
            return algorithm.encode(input);
        } else {
            return this.defaultEncoder.encode(input);
        }

    },

    /**
     * This method is the one that initiates the hashing of a given string, based on either
     * the default hashing algorithm or a custom hashing algorithm.
     *
     * @param {String} input The input string to be hashed.
     * @param {Object} algorithm The algorithm object containing a hash method.
     * @returns {String} The hashed string.
     */
    hash: function(input, algorithm) {

        if(algorithm && algorithm.hash) {
            return algorithm.hash(input);
        } else {
            return this.defaultHasher.hash(input);
        }

    },

    /**
     * Private method for UTF-8 encoding
     *
     * @private
     * @param {String} string The string to be encoded.
     * @returns {String} The utf8 encoded string.
     */
    utf8_encode : function (string) {
        string = string.replace(/\r\n/g, '\n');
        var utf8String = '';

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utf8String += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utf8String += String.fromCharCode((c >> 6) | 192);
                utf8String += String.fromCharCode((c & 63) | 128);
            }
            else {
                utf8String += String.fromCharCode((c >> 12) | 224);
                utf8String += String.fromCharCode(((c >> 6) & 63) | 128);
                utf8String += String.fromCharCode((c & 63) | 128);
            }

        }

        return utf8String;
    },

    /**
     * Private method for UTF-8 decoding
     *
     * @private
     * @param {String} string The string to be decoded.
     * @returns {String} The utf8 decoded string.
     */
    utf8_decode : function (utf8String) {
        var string = '';
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utf8String.length ) {

            c = utf8String.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }  else if((c > 191) && (c < 224)) {
                c2 = utf8String.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utf8String.charCodeAt(i+1);
                c3 = utf8String.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: �2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      28.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/logger.js');

/**
 * @class
 *
 * Wraps access to any defined data source and is the only interface for a model to
 * access this data.
 *
 * @extends M.Object
 */
M.DataProvider = M.Object.extend(
/** @scope M.DataProvider.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DataProvider',

    /**
     * Indicates whether data provider operates asynchronously or not.
     *
     * @type Boolean
     */
    isAsync: NO,

    /**
     * Interface method.
     * Implemented by specific data provider.
     */
    find: function(query) {
    },

    /**
     * Interface method.
     * Implemented by specific data provider.
     */
    save: function() {
    },

    /**
     * Interface method.
     * Implemented by specific data provider.
     */
    del: function() {

    },

    /**
     * Checks if object has certain property.
     *
     * @param {obj} obj The object to check.
     * @param {String} prop The property to check for.
     * @returns {Booleans} Returns YES (true) if object has property and NO (false) if not.
     */
    check: function(obj, prop) {
       return obj[prop] ? YES : NO;
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      18.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/logger.js');

/**
 * @class
 *
 * M.ModelAttribute encapsulates all meta information about a model record's property:
 * * is it required?
 * * what data type is it of? (important for mapping to relational database schemas)
 * * what validators shall be applied
 * All M.ModelAttributes for a model record are saved under {@link M.Model#__meta} property of a model.
 * Each ModelAttribute is saved with the record properties name as key.
 * That means:
 *
 * model.record[propA] is the value of the property.
 * model.__meta[propA] is the {@link M.ModelAttribute} object for the record property.
 *
 * @extends M.Object
 */
M.ModelAttribute = M.Object.extend(
/** @scope M.ModelAttribute.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ModelAttribute',

    /**
     * The data type for the model record property.
     * Extremely important e.g. to map model to relational database table.
     *
     * @type String
     */
    dataType: null,

    /**
     * Indicates whether this property is required to be set before persisting.
     * If YES, then automatically @link M.PresenceValidator is added to the property, to check the presence.
     * 
     * @type Boolean
     */
    isRequired: NO,

    /**
     * Indicates whether an update has been performed on this property with the set method or not.
     * @type Boolean
     */
    isUpdated: NO,

    /**
     * Array containing all validators for this model record property.
     * E.g. [@link M.PresenceValidator, @link M.NumberValidator]
     * @type Object
     */
    validators: null,

    /**
     * Record properties that define references have their referenced entity saved here.
     * @type Object
     */
    refEntity: null,

    /**
     * Iterates over validators array and calls validate on each validator with the param object passed to the validator.
     * @param {Object} obj The parameter object containing the model id, the record as M.ModelAttribute object and the value of the property.
     * @returns {Boolean} Indicates wheter the property is valid (YES|true) or invalid (NO|false).
     */
    validate: function(obj) {
        var isValid = YES;
        for (var i in this.validators) {
            if(!this.validators[i].validate(obj)) {
               isValid = NO; 
            }
        }
        return isValid;
    }
});

//
// CLASS METHODS
//

/**
 * Returns a model attribute.
 *
 * @param dataType The data type of the attribute: e.g. String 
 * @param opts options for the attribute, such as defaultValue, isRequired flag, etc. ...
 * @returns {Object} {@link M.ModelAttribute} object
 */
M.ModelAttribute.attr = function(dataType, opts) {
    //console.log('attr in model_attribute');
    if (!opts) {
        opts = {};
    }
    if (!opts.dataType) {
        opts.dataType = dataType || 'String';
    }

    /* if validators array is not set and attribute is required, define validators as an empty array, (this is for adding M.PresenceValidator automatically */
    if (!opts.validators && opts.isRequired) {
        opts.validators = [];
    }

    /* if model attribute is required, presence validator is automatically inserted */
    if (opts.isRequired) {
        /* check if custom presence validator has been added to validators array, if not add the presence validator*/
        if( _.select(opts.validators, function(v){return v.type === 'M.PresenceValidator'}).length === 0) {
            opts.validators.push(M.PresenceValidator);
        }
    }
    return this.extend(opts);
};// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      19.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/logger.js');

/**
 * @class
 *
 * The prototype for every validator. All validation logic is implemented in the specific validators.
 *
 * @extends M.Object
 */
M.Validator = M.Object.extend(
/** @scope M.Validator.prototype */ {

    /**
     * The type of this object.
     * @type String
     */
    type: 'M.Validator',

    /**
     * "Class-wide" array containing error objects.
     * Specific validators do NOT have an own validationErrors array, but use this one to write errors to.
     * 
     * Error object represent errors that occured during validation.
     * E.g. error object:
     *
     * {
     *   msg: 'E-Mail adress not valid.',
     *   modelId: 'Task_123',
     *   property: 'email',
     *   viewId: 'm_123',
     *   validator: 'EMAIL',
     *   onSuccess: function(){proceed();}
     *   onError: function(markTextFieldError(); console.log('email not valid')}; 
     * }
     * 
     *
     * @type Array|Object
     */
    validationErrors: [],

    /**
     * extends this.
     *
     * Can be used to provide a custom error msg to a validator
     * E.g.
     * M.EmailValidator.customize({msg: 'Please provide a valid e-mail adress.'});
     *
     * @param obj
     * @returns {Object} The customized validator.
     */
    customize: function(obj) {
        return this.extend(obj);
    },

    /**
     * Empties the error buffer, is done before each new validation process
     */
    clearErrorBuffer: function() {
        this.validationErrors.length = 0;
    }



});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      27.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/logger.js');

/**
 * @class
 *
 * Object for dispatching all incoming events.
 *
 * @extends M.Object
 */
M.EventDispatcher = M.Object.create(
/** @scope M.EventDispatcher.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.EventDispatcher',

    /**
     * Saves the latest on click event to make sure that there are no multiple events
     * fired for one click.
     *
     * @type {Object}
     */
    lastOnClickEvent: null,

    /**
     * This method is called whenever an event is triggered within the app.
     *
     * @param {Object} evt The event.
     */
    eventDidHappen: function(evt) {
        /* WORKAROUND FOR FOOTER / HEADER BUG IN JQM */
        /* TODO: REMOVE ONCE IT IS FIXED BY JQM */
        if(evt.type === 'scrollstart') {
            $.fixedToolbars.hide(YES);
        } else {
            window.setTimeout('$.fixedToolbars.show()', 100);
        }

        this.delegateEvent(evt.type, evt.currentTarget.id, evt.keyCode);
    },

    /**
     * This method is called whenever an onClick event is triggered within the app. This is
     * not the common way to catch events, but in some cases it might be necessary to use
     * the onClick property. 
     *
     * @param {String} type The type of event that occured, e.g. 'click'.
     * @param {String} id The id of the element that triggered the event.
     * @param {Number} keyCode The keyCode property of the event, necessary for keypress event, e.g. keyCode is 13 when enter is pressed.
     * @param {String} orientation The orientation of the device (only passed if an orientationChange event did happen).
     */
    onClickEventDidHappen: function(type, id, keyCode) {
        var evt = {
            type: type,
            id: id,
            keyCode: keyCode,
            date: M.Date.create()
        };

        /* only delegate the incoming event if there hasn't been the same event within the last 100 milliseconds */
        if(!this.lastOnClickEvent || (this.lastOnClickEvent && this.lastOnClickEvent.date.timeBetween(evt.date, M.MILLISECONDS)) > 100) {
            this.lastOnClickEvent = evt;
            if(!M.Application.viewManager.getViewById(id).inEditMode) {
                this.delegateEvent(type, id, keyCode);
            }
        }
    },

    /**
     * This method looks for a corresponding event inside the view manager and
     * delegates the call directly to the responsible controller defined by the
     * target and action properties of the view.
     *
     * @param {String} type The type of event that occured, e.g. 'click'.
     * @param {String} id The id of the element that triggered the event.
     * @param {Number} keyCode The keyCode property of the event, necessary for keypress event, e.g. keyCode is 13 when enter is pressed.
     * @param {String} orientation The orientation of the device (only passed if an orientationChange event did happen).
     */
    delegateEvent: function(type, id, keyCode) {
        var view = M.Application.viewManager.getViewById(id);

        if(!view && type !== 'orientationchange') {
            return;
        }

        switch(type) {
            case 'click':
                if(view && view.internalTarget && view.internalAction) {
                    view.internalTarget[view.internalAction](id, view.modelId);
                }
                if(view && view.target && view.action && view.type !== 'M.TextFieldView' && view.type !== 'M.SearchBarView') {
                    view.target[view.action](id, view.modelId);
                }
                break;
            case 'change':
                view.setValueFromDOM(type);
                break;
            case 'keyup':
                if(keyCode === 13 && view.triggerActionOnEnter && (view.type === 'M.TextFieldView' || view.type === 'M.SearchBarView')) {
                    if(view && view.target && view.action) {
                        view.target[view.action](id);
                    }
                } else if(view.type === 'M.TextFieldView' || view.type === 'M.SearchBarView') {
                    view.setValueFromDOM(type);
                }
                break;
            case 'focusin':
                view.gotFocus(type);
                break;
            case 'focusout':
                view.lostFocus(type);
                break;
            case 'orientationchange':
                M.Application.viewManager.getCurrentPage().orientationDidChange();
                break;
        }
    },

    /**
     * Registers events given from eventList to a view defined by an id. Can be used to register events after application load.
     * @param {String} id The View Id, e.g. m_123
     * @param {String} eventList The Events one after another in a string divided by whitespace.
     */
    registerEvents: function(id, eventList) {
        var that = this;
        $('#' + id).bind(eventList, function(evt) {
            that.eventDidHappen(evt);
        });
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      05.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/logger.js');

/**
 * @class
 *
 * The root object for ModelRegistry.
 *
 * Model Registry is a central point for all models to get their Global Unique Identifier,
 * which is important for storage (guid is primary key as default).
 *
 * @extends M.Object
 */
M.ModelRegistry = M.Object.extend(
/** @scope M.ModelRegistry.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ModelRegistry',


    /**
     * An array containing objects that save the model's name and their next GUId.
     * Acts globally.
     * @type Array|Object
     */
    registry: [],

    /**
     * Calculates the next ID for a model named by modelName.
     *
     * @param {String} modelName The name of the model, e.g. 'Person'.
     * @returns {Number} The next internal model id for the model identified by modelName parameter.
     */
    getNextId: function(modelName) {
        for(i in this.registry){
            if(this.registry[i].modelName === modelName){
                this.registry[i].m_id = this.registry[i].m_id + 1;
                localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + modelName, this.registry[i].m_id);
                return this.registry[i].m_id;
            }
        }
        return null;
    },

    /**
     * Sets the id for a certain model.
     *
     * @param {String} modelName The name of the model, e.g. 'Person'.
     * @param {Number} m_id The id of the model, e.g. 1.
     */
    setId: function(modelName, m_id) {
        for(i in this.registry){
            if(this.registry[i].modelName === modelName){
                this.registry[i].m_id = m_id;
            }
        }
    },

    /**
     * Register a model in the registry.
     * Set nextGUId for this model to initial value 0.
     * 
     * @param {String} modelName The name of the model, e.g. 'Person'.
     */
    register: function(modelName) {

        if(_.detect(this.registry, function(m){ return m.modelName === modelName })) {
            return;
        }

        var obj = {
            modelName: modelName,
            m_id: 0
        };
        this.registry.push(obj);
        
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: �2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      29.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/logger.js');

/**
 * @class
 *
 * The observable knows all observers, mainly views, and pushes updates if necessary.
 *
 * @extends M.Object
 */
M.Observable = M.Object.extend(
/** @scope M.Observable.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Observable',

    /**
     * List that contains pairs of an observer with an observable. An observer is tightened to one
     * observable, but one observable can have multiple observers.
     *
     * @type Array|Object
     */
    bindingList: null,

    /**
     * Attach an observer to an observable.
     *
     * @param {String} observer The observer.
     * @param {String} observable The observable.
     */
    attach: function(observer, observable) {
        if(!this.bindingList) {
            this.bindingList = [];
        }
        this.bindingList.push({
            observer: observer,
            observable: observable
        });
    },

    /**
     * Detach an observer from an observable.
     *
     * @param {String} observer The observer.
     */
    detach: function(observer) {
        /* grep is a jQuery function that finds
         * elements in an array that satisfy a certain criteria.
         * It works on a copy so we have to assign the "cleaned"
         * array to our bindingList.
         */
        this.bindlingList = $.grep(this.bindlingList, function(value, index) {
                return value.observer !== observer;
        });
    },

    /**
     * Notify all observers that observe the property behind 'key'.
     *
     * @param {String} key The key of the property that changed.
     */
    notifyObservers: function(key) {
        _.each(this.bindingList, function(entry){
            if(key === entry.observable){
                entry.observer.contentDidChange();
            }
        });
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      20.12.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/data_provider.js');

/**
 * @class
 *
 * To be used when no data provider needed for model.
 * Prints warning messages when calling CRUD functions.
 *
 * @extends M.DataProvider
 */
M.DummyProvider = M.DataProvider.extend(
/** @scope M.DummyProvider.prototype */ {

    find: function() {
        M.Logger.log('DummyProvider does not support find().', M.WARN);
    },

    save: function() {
        M.Logger.log('DummyProvider does not support save().', M.WARN);
    },

    del: function() {
        M.Logger.log('DummyProvider does not support del().', M.WARN);
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      15.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/data_provider.js');

/**
 * @class
 * 
 * Encapsulates access to LocalStorage (in-browser key value store).
 * LocalStorage is an in-browser key-value store to persist data.
 * This data provider persists model records as JSON strings with their name and id as key.
 * When fetching these strings from storage, their automatically converted in their corresponding model records.
 *
 * Operates synchronous.
 *
 * @extends M.DataProvider
 */
M.LocalStorageProvider = M.DataProvider.extend(
/** @scope M.LocalStorageProvider.prototype */ {

    /**
     * The type of this object.
     * @type String
     */
    type: 'M.LocalStorageProvider',

    /**
     * Saves a model record to the local storage
     * The key is the model record's name combined with id, value is stringified object
     * e.g.
     * Note_123 => '{ text: 'buy some food' }'
     *
     * @param {Object} that (is a model).
     * @returns {Boolean} Boolean indicating whether save was successful (YES|true) or not (NO|false).
     */
    save: function(obj) {
        try {
            //console.log(obj);
            /* add m_id to saved object */
            /*var a = JSON.stringify(obj.model.record).split('{', 2);
            a[2] = a[1];
            a[1] = '"m_id":' + obj.model.m_id + ',';
            a[0] = '{';
            var value = a.join('');*/
            var value = JSON.stringify(obj.model.record);
            localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + obj.model.m_id, value);
            return YES;
        } catch(e) {
            M.Logger.log(M.WARN, 'Error saving ' + obj.model.record + ' to localStorage with key: ' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + that.m_id);
            return NO;
        }

    },              

    /**
     * deletes a model from the local storage
     * key defines which one to delete
     * e.g. key: 'Note_123'
     *
     * @param {Object} obj The param obj, includes model
     * @returns {Boolean} Boolean indicating whether save was successful (YES|true) or not (NO|false).
     */
    del: function(obj) {
        try {
            if(localStorage.getItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + obj.model.m_id)){ // check if key-value pair exists
                localStorage.removeItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + obj.model.m_id);
                obj.model.recordManager.remove(obj.model.m_id);
                return YES;
            }
            return NO;
        } catch(e) {
            M.Logger.log(M.WARN, 'Error removing key: ' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + obj.model.m_id + ' from localStorage');
            return NO;
        }
    },

    /**
     * Finds all models of type defined by modelName that match a key or a simple query.
     * A simple query example: 'price < 2.21'
     * Right now, no AND or OR joins possible, just one query constraint.
     *
     * If no query is passed, all models are returned by calling findAll()
     * @param {Object} The param object containing e.g. the query or the key.
     * @returns {Object|Boolean} Returns an object if find is done with a key, an array of objects when a query is given or no
     * parameter passed.
     */
    find: function(obj) {
        if(obj.key) {
            console.log('got the key...');
            var record = this.findByKey(obj);
            if(!record) {
                return NO;
            }
            /*construct new model record with the saved id*/
            var reg = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_([0-9]+)').exec(obj.key);
            var m_id = reg && reg[1] ? reg[1] : null;
            if (!m_id) {
                M.Logger.log('retrieved model has no valid key: ' + obj.key, M.ERROR);
                return NO;
            }
            var m = obj.model.createRecord($.extend(record, {m_id: parseInt(m_id), state: M.STATE_VALID}));
            return m;
        }

        if(obj.query){
            /**
             * RegEx to match simple queries. E.g.:
             * username = 'paul'
             * price < 12.23
             * result >= -23
             * Captures:
             * 1:   identifier      ( e.g. price )      => (\w*)
             * 2:   operator        ( e.g. < )          => ([<>!=]{1,2}) (actually !! is also allowed but will result in an error
             * 3:   value           ( e.g. 12.23 )      => String or Number: (['"]\w*['"]|(-)?\d+(\.\d+)?)
             */
            var query_regex = /^\s*(\w*)\s*([<>!=]{1,2})\s*(['"]?\w*['"]?|(-)?\d+(\.\d+)?)\s*$/;
            var regexec = query_regex.exec(obj.query);
            if(regexec) {
                var ident = regexec[1];
                var op = regexec[2];
                var val = regexec[3].replace(/['"]/g, "");/* delete quotes from captured string, needs to be done in regex*/
                var res = this.findAll(obj);
                switch(op) {
                    case '=':
                        res = _.select(res, function(o){
                            return o.record[ident] === val;
                        });
                        break;
                    case '!=':
                        res = _.select(res, function(o){
                            return o.record[ident] !== val;
                        });
                        break;
                    case '<':
                        res = _.select(res, function(o){
                            return o.record[ident] < val;
                        });
                        break;
                    case '>':
                        res = _.select(res, function(o){
                            return o.record[ident] > val;
                        });
                        break;
                    case '<=':
                        res = _.select(res, function(o){
                            return o.record[ident] <= val;
                        });
                        break;
                    case '>=':
                        res = _.select(res, function(o){
                            return o.record[ident] >= val;
                        });
                        break;
                    default:
                        M.Logger.log('Unknown operator in query: ' + op, M.WARN);
                        res = [];
                        break;
                }
            } else{
                M.Logger.log('Query does not satisfy query grammar.', M.WARN);
                res = [];
            }

            return res;
            
        } else { /* if no query is passed, all models for modelName shall be returned */
            return this.findAll(obj);
        }
    },

    /**
     * Finds a record identified by the key.
     *
     * @param {Object} The param object containing e.g. the query or the key.
     * @returns {Object|Boolean} Returns an object identified by key, correctly built as a model record by calling
     * or a boolean (NO|false) if no key is given or the key does not exist in LocalStorage.
     * parameter passed.
     */
    findByKey: function(obj) {
        if(obj.key) {

            var reg = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX);
            /* assume that if key starts with local storage prefix, correct key is given, other wise construct it and key might be m_id */
            obj.key = reg.test(obj.key) ? obj.key : M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + obj.key;

            if(localStorage.getItem(obj.key)) { // if key is available
                return this.buildRecord(obj.key, obj)
            } else {
                return NO;
            }
        }
        M.Logger.log("Please provide a key.", M.WARN);
        return NO;
    },

    /**
     * Returns all models defined by modelName.
     *
     * Models are saved with key: Modelname_ID, e.g. Note_123
     *
     * @param {Object} obj The param obj, includes model
     * @returns {Object} The array of fetched objects/model records. If no records the array is empty.
     */
    findAll: function(obj) {
        var result = [];
        for (var i = 0; i < localStorage.length; i++){
            var k = localStorage.key(i);
            regexResult = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_').exec(k);
            if(regexResult) {
                var record = this.buildRecord(k, obj);//JSON.parse(localStorage.getItem(k));

                /*construct new model record with the saved m_id*/
                var reg = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_([0-9]+)').exec(k);
                var m_id = reg && reg[1] ? reg[1] : null;
                if (!m_id) {
                    M.Logger.log('Model Record m_id not correct: ' + m_id, M.ERROR);
                    continue; // if m_id does not exist, continue with next record element
                }
                var m = obj.model.createRecord($.extend(record, {m_id: parseInt(m_id), state: M.STATE_VALID}));
                
                result.push(m);
            }
        }
        return result;
    },

    /**
     * Fetches a record from LocalStorage and checks whether automatic parsing by JSON.parse set the elements right.
     * Means: check whether resulting object's properties have the data type define by their model attribute object.
     * E.g. String containing a date is automatically transfered into a M.Date object when the model attribute has the data type
     * 'Date' set for this property.
     * 
     * @param {String} key The key to fetch the element from LocalStorage
     * @param {Object} obj The param object, includes model
     * @returns {Object} record The record object. Includes all model record properties with correctly set data types.
     */
    buildRecord: function(key, obj) {
        var record = JSON.parse(localStorage.getItem(key));
        for(var i in record) {
            if(obj.model.__meta[i] && typeof(record[i]) !== obj.model.__meta[i].dataType.toLowerCase()) {
                switch(obj.model.__meta[i].dataType) {
                    case 'Date':
                        record[i] = M.Date.create(record[i]);
                        break;
                }
            }
        }
        return record;
    },

    /**
     * Returns all keys for model defined by modelName.
     *
     * @param {Object} obj The param obj, includes model
     * @returns {Object} keys All keys for model records in LocalStorage for a certain model identified by the model's name.
     */
    allKeys: function(obj) {
        var keys = [];
        for (var i = 0; i < localStorage.length; i++){
            var k = localStorage.key(i)
            regexResult = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_').exec(k);
            if(regexResult) {
                keys.push(k);
            }
        }
        return keys;
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      02.12.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/data_provider.js');

/**
 * @class
 *
 * Encapsulates access to a remote storage, a json based webservice.
 *
 * @extends M.DataProvider
 */
M.RemoteStorageProvider = M.DataProvider.extend(
/** @scope M.RemoteStorageProvider.prototype */ {

    /**
     * The type of this object.
     * @type String
     */
    type: 'M.RemoteStorageProvider',

    /**
     * The type of this object.
     * @type Object
     */
    config: null,

    /* CRUD methods */

    save: function(obj) {

        var config = this.config[obj.model.name];
        var result = null;
        var dataResult = null;

        if(obj.model.state === M.STATE_NEW) {   /* if the model is new we need to make a create request, if not new then we make an update request */

            dataResult = config.create.map(obj.model.record);

            this.remoteQuery('create', config.location + config.create.url, config.create.httpMethod, dataResult, obj, null);   
            
        } else { // make an update request

            dataResult = config.update.map(obj.model.record);

            var updateUrl = config.location + config.update.url.replace(/<%=\s+([.|_|-|$|�|a-zA-Z]+[0-9]*[.|_|-|$|�|a-zA-Z]*)\s*%>/, obj.model.record.ID);

            this.remoteQuery('update', updateUrl, config.update.httpMethod, dataResult, obj, function(xhr) {
                  xhr.setRequestHeader("X-Http-Method-Override", config.update.httpMethod);
            });
        }
        
    },

    del: function(obj) {
        var config = this.config[obj.model.name];
        var delUrl = config.del.url.replace(/<%=\s+([.|_|-|$|�|a-zA-Z]+[0-9]*[.|_|-|$|�|a-zA-Z]*)\s*%>/,obj.model.get('ID'));
        delUrl = config.location + delUrl;

        this.remoteQuery('delete', delUrl, config.del.httpMethod, null, obj,  function(xhr) {
            xhr.setRequestHeader("X-Http-Method-Override", config.del.httpMethod);
        });
    },

    find: function(obj) {
        var config = this.config[obj.model.name];

        var readUrl = obj.ID ? config.read.url.one.replace(/<%=\s+([.|_|-|$|�|a-zA-Z]+[0-9]*[.|_|-|$|�|a-zA-Z]*)\s*%>/,obj.ID) : config.read.url.all;
        readUrl = config.location + readUrl;

        this.remoteQuery('read', readUrl, config.read.httpMethod, null, obj);

    },

    createModelsFromResult: function(data, callback, obj) {
        var result = [];
        var config = this.config[obj.model.name];
        if(_.isArray(data)) {
            for(var i in data) {
                var res = data[i];
                /* create model  record from result by first map with given mapper function before passing
                 * to createRecord
                 */
                result.push(obj.model.createRecord($.extend(config.read.map(res[config.objIdentifier]), {state: M.STATE_VALID})));
            }
        } else if(typeof(data) === 'object') {
            result.push(obj.model.createRecord($.extend(config.read.map(data[config.objIdentifier]), {state: M.STATE_VALID})));
        }
        callback(result);
    },

    remoteQuery: function(opType, url, type, data, obj, beforeSend) {
        var that = this;
        var config = this.config[obj.model.name];
        
        M.Request.init({
            url: url,
            method: type,
            isJSON: YES,
            contentType: 'application/JSON',
            data: data ? data : null,
            onSuccess: function(data, msg, xhr) {

                /*
                * delete from record manager if delete request was made.
                */
                if(opType === 'delete') {
                    obj.model.recordManager.remove(obj.model.m_id);
                }

                /*
                * call the receiveIdentifier method if provided, that sets the ID for the newly created model
                */
                if(opType === 'create') {
                    if(config.create.receiveIdentifier) {
                        config.create.receiveIdentifier(data, obj.model);
                    } else {
                        M.Logger.log('No ID receiving operation defined.');
                    }
                }

                /*
                * call callback 
                */
                if(obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
                    obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action], [data]);
                    if(opType === 'read') {
                        that.createModelsFromResult(data, obj.onSuccess, obj);
                    } else {
                        obj.onSuccess();
                    }
                }else {
                    M.Logger.log('No success callback given.', M.WARN);
                }
            },
            onError: function(xhr, msg) {
                if(obj.onError && typeof(obj.onError) === 'function') {
                    obj.onError(msg);
                }
                if(obj.onError && obj.onError.target && obj.onError.action) {
                    obj.onError = this.bindToCaller(obj.onError.target, obj.onError.target[obj.onError.action], msg);
                    obj.onError(msg);
                } else if (typeof(obj.onError) !== 'function') {
                    M.Logger.log('No error callback given.', M.WARN);
                }
            },
            beforeSend: beforeSend ? beforeSend : null
        }).send();    
    },

    /**
     * creates a new data provider instance with the passed configuration parameters
     * @param obj
     */
    configure: function(obj) {
        console.log('configure() called.');
        // maybe some value checking
        return this.extend({
            config:obj
        });
    }

}); // ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      18.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/data_provider.js');

/**
 * @class
 *
 * Encapsulates access to WebSQL (in-browser sqlite storage). All CRUD operations are asynchronous. That means that onSuccess
 * and onError callbacks have to be passed to the function calls to have the result returned when operation finished.
 *
 * WebSQL Error Codes (see e.g. http://www.w3.org/TR/webdatabase/):
 *
 * Constant         Code    Situation
 * --------         ----    ---------
 * UNKNOWN_ERR      0       The transaction failed for reasons unrelated to the database itself and not covered by any other error code.
 * DATABASE_ERR     1       The statement failed for database reasons not covered by any other error code.
 * VERSION_ERR      2       The operation failed because the actual database version was not what it should be. For example, a statement found that the actual database version no longer matched the expected version of the Database or DatabaseSync object, or the Database.changeVersion() or DatabaseSync.changeVersion() methods were passed a version that doesn't match the actual database version.
 * TOO_LARGE_ERR    3       The statement failed because the data returned from the database was too large. The SQL "LIMIT" modifier might be useful to reduce the size of the result set.
 * QUOTA_ERR        4       The statement failed because there was not enough remaining storage space, or the storage quota was reached and the user declined to give more space to the database.
 * SYNTAX_ERR       5       The statement failed because of a syntax error, or the number of arguments did not match the number of ? placeholders in the statement, or the statement tried to use a statement that is not allowed, such as BEGIN, COMMIT, or ROLLBACK, or the statement tried to use a verb that could modify the database but the transaction was read-only.
 * CONSTRAINT_ERR   6       An INSERT, UPDATE, or REPLACE statement failed due to a constraint failure. For example, because a row was being inserted and the value given for the primary key column duplicated the value of an existing row.
 * TIMEOUT_ERR      7       A lock for the transaction could not be obtained in a reasonable time.
 *
 * @extends M.DataProvider
 */
M.WebSqlProvider = M.DataProvider.extend(
/** @scope M.WebSqlProvider.prototype */ {

    /**
     * The type of this object.
     * @type String
     */
    type: 'M.WebSqlProvider',

    /**
     * Configuration object
     * @type Object
     */
    config: {},

    /**
     * Indicates whether data provider operates asynchronously or not.
     * 
     * @type Boolean
     */
    isAsync: YES,

    /**
     * Is set to YES when initialization ran successfully, means when {@link M.WebSqlProvider#init} was called, db and table created. 
     * @type Boolean
     */
    isInitialized: NO,

    /**
     * Object containing all rules for mapping JavaScript data types to SQLite data types.
     * @type Object
     */
    typeMapping: {
        'String': 'varchar(255)',
        'Text': 'text',
        'Float': 'float',
        'Integer': 'integer',
        'Number': 'integer',
        'Reference': 'integer',
        'Date': 'varchar(255)',
        'Boolean': 'boolean'
    },

    /**
     * Is set when database "opened". Acts as handler for all db operations => transactions, queries, etc.
     * @type Object
     */
    dbHandler: null,

    /**
     * Saves the internal callback function. Is needed when provider/db is not initialized and init() must be executed first to have the return point again after
     * initialization. 
     * @type Function
     */
    internalCallback: null,

    /**
     * Used internally. External callback for success case. 
     * @private
     */
    onSuccess: null,

    /**
     * Used internally. External callback for error case.
     * @private
     */
    onError: null,

    /**
     * Opens a database and creates the appropriate table for the model record.
     * 
     * @param {Object} obj The param obj, includes model. Not used here, just passed through.
     * @param {Function} callback The function that called init as callback bind to this.
     * @private
     */
    init: function(obj, callback) {
        if(!this.internalCallback) {
            this.internalCallback = callback;
        }
        this.openDb();
        this.createTable(obj, callback);
    },

    /*
    * CRUD methods
    */

    /**
     * Saves a model in the database. Constructs the sql query from the model record. Prepares an INSERT or UPDATE depending on the state
     * of the model. If M.STATE_NEW then prepares an INSERT, if M.STATE_VALID then prepares an UPDATE. The operation itself
     * is done by {@link M.WebSqlProvider#performOp} that is called
     *
     * @param {Object} obj The param obj, includes:
     * * onSuccess callback
     * * onError callback
     * * the model
     */
     save: function(obj) {
        //console.log('save() called.');

        this.onSuccess = obj.onSuccess;
        this.onError = obj.onError;

        /**
         * if not already done, initialize db/table first
         */
        if(!this.isInitialized) {
            this.internalCallback = this.save;
            this.init(obj);
            return;
        }

        var pre_suffix = '';
        var sif

        if(obj.model.state === M.STATE_NEW) { // perform an INSERT

            var sql = 'INSERT INTO ' + obj.model.name + ' (';
            for(var prop in obj.model.record) {
                sql += prop + ', ';
            }

            /* now name m_id column */
            sql += M.META_M_ID + ') ';

            //sql = sql.substring(0, sql.lastIndexOf(',')) + ') ';

            /* VALUES(12, 'Test', ... ) */
            sql += 'VALUES (';

            for(var prop2 in obj.model.record) {
                //console.log(obj.model.record[prop2]);
                /* if property is string or text write value in quotes */
                pre_suffix = obj.model.__meta[prop2].dataType === 'String' || obj.model.__meta[prop2].dataType === 'Text' || obj.model.__meta[prop2].dataType === 'Date' ? '"' : '';
                /* if property is date object, convert to string by calling toJSON */
                recordPropValue = (obj.model.record[prop2].type === 'M.Date') ? obj.model.record[prop2].toJSON() : obj.model.record[prop2];
                sql += pre_suffix + recordPropValue + pre_suffix + ', ';
            }

            sql += obj.model.m_id + ')';

            //sql = sql.substring(0, sql.lastIndexOf(',')) + '); ';

            //console.log(sql);

            this.performOp(sql, obj, 'INSERT');

        } else { // perform an UPDATE with id of model

            var sql = 'UPDATE ' + obj.model.name + ' SET ';

            var nrOfUpdates = 0;

            for(var p in obj.model.record) {
                
                if(p === 'ID' || !obj.model.__meta[p].isUpdated) { /* if property has not been updated, then exclude from update call */
                    continue;
                }
                nrOfUpdates = nrOfUpdates + 1;
                
                pre_suffix = obj.model.__meta[p].dataType === 'String' || obj.model.__meta[p].dataType === 'Text' || obj.model.__meta[p].dataType === 'Date' ? '"' : '';

                /* if property is date object, convert to string by calling toJSON */
                recordPropValue = obj.model.__meta[p].dataType === 'Date' ? obj.model.record[p].toJSON() : obj.model.record[p];

                sql += p + '=' + pre_suffix + recordPropValue + pre_suffix + ', ';
            }
            sql = sql.substring(0, sql.lastIndexOf(','));
            sql += ' WHERE ' + 'ID=' + obj.model.record.ID + ';';

            //console.log(sql);

            /* if no properties updated, do nothing, just return by calling onSuccess callback */
            if(nrOfUpdates === 0) {
                if (obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
                    obj.onSuccess = this.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action]);
                    obj.onSuccess();
                }else if(obj.onSuccess && typeof(obj.onSuccess) === 'function') {
                    obj.onSuccess(result);
                }
            } else {
                this.performOp(sql, obj, 'UPDATE');
            }
        }
    },

    /**
     * Performs operation on WebSQL storage: INSERT, UPDATE or DELETE. Is used by {@link M.WebSqlProvider#save} and {@link M.WebSqlProvider#del}.
     * Calls is made asynchronously, means that result is just available in callback.
     * @param {String} sql The query.
     * @param {Object} obj The param object. Contains e.g. callbacks (onError & onSuccess)
     * @param {String} opType The String identifying the operation: 'INSERT', 'UPDATE' oder 'DELETE'
     * @private
     */
    performOp: function(sql, obj, opType) {

        var that = this;
        this.dbHandler.transaction(function(t) {
            t.executeSql(sql, null, function() {
                if(opType === 'INSERT') { /* after INSERT operation set the assigned DB ID to the model records id */
                    that.queryDbForId(obj.model);
                }
            }, function() { // error callback for SQLStatementTransaction
                M.Logger.log('Incorrect statement: ' + sql, M.ERROR);
            });
        },
        function(sqlError) { // errorCallback
            /* bind error callback */
            if (obj.onError && obj.onError.target && obj.onError.action) {
                obj.onError = this.bindToCaller(obj.onError.target, obj.onError.target[obj.onError.action], sqlError);
                obj.onError();
            } else if(obj.onError && typeof(obj.onError) === 'function') {
                obj.onError(sqlError);
            }
        },

        function() {    // voidCallback (success)
             /* delete  the model from the model record list */
            if(opType === 'DELETE') {
                obj.model.recordManager.remove(obj.model.m_id);
            }
            /* bind success callback */
            if (obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
                obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action]);
                obj.onSuccess();
            }else if(obj.onSuccess && typeof(obj.onSuccess) === 'function') {
                obj.onSuccess(result);
            }
        });
    },

    /**
     * Prepares delete query for a model record. Operation itself is performed by {@link M.WebSqlProvider#performOp}.
     * Tuple is identified by ID (not the internal model id, but the ID provided by the DB in record).
     *
     * @param {Object} obj The param obj, includes:
     * * onSuccess callback
     * * onError callback
     * * the model
     */
    del: function(obj) {
        //console.log('del() called.');
        if(!this.isInitialized) {
            this.internalCallback = this.del;
            this.init(obj, this.bindToCaller(this, this.del));
            return;
        }

        var sql = 'DELETE FROM ' + obj.model.name + ' WHERE ID=' + obj.model.record.ID + ';';

        //console.log(sql);

        this.performOp(sql, obj, 'DELETE');
    },


    /**
     * Finds model records in the database. If a constraint is given, result is filtered.
     * @param {Object} obj The param object. Includes:
     * * model: the model blueprint
     * * onSuccess:
     * * onError:
     * * columns: Array of strings naming the properties to be selected: ['name', 'age'] => SELECT name, age FROM...
     * * constraint: Object containing itself two properties:
     *      * statement: a string with the statement, e.g. 'WHERE ID = ?'
     *      * parameters: array of strings with the parameters, length array must be the same as the number of ? in statement
     *          => ? are substituted with the parameters
     * * order: String with the ORDER expression: e.g. 'ORDER BY price ASC'
     * * limit: Number defining the number of max. result items
     */
    find: function(obj) {
        //console.log('find() called.');

        this.onSuccess = obj.onSuccess;
        this.onError = obj.onError;

        if(!this.isInitialized) {
            this.internalCallback = this.find;
            this.init(obj, this.bindToCaller(this, this.find));
            return;
        }
        
        var sql = 'SELECT ';

        if(obj.columns) {
            /* ID column always needs to be in de result relation */
            if(!(_.include(obj.columns, 'ID'))) {
                obj.columns.push('ID');
            }

            if(obj.columns.length > 1) {
                sql += obj.columns.join(', ');
            } else if(obj.columns.length == 1) {
                sql += obj.columns[0] + ' ';
            }
        } else {
            sql += '* ';
        }

        sql += ' FROM ' + obj.model.name + ' ';

        var stmtParameters = [];

        /* now process constraint */
        if(obj.constraint) {

            var n = obj.constraint.statement.split("?").length - 1;
            //console.log('n: ' + n);
            /* if parameters are passed we assign them to stmtParameters, the array that is passed for prepared statement substitution*/
            if(obj.constraint.parameters) {

                if(n === obj.constraint.parameters.length) { /* length of parameters list must match number of ? in statement */
                    sql += obj.constraint.statement;
                    stmtParameters = obj.constraint.parameters;
                } else {
                    M.Logger.log('Not enough parameters provided for statement: given: ' + obj.constraint.parameters.length + ' needed: ' + n, M.ERROR);
                    return NO;
                }
           /* if no ? are in statement, we handle it as a non-prepared statement
            * => developer needs to take care of it by himself regarding
            * sql injection
            */
            } else if(n === 0) {
                sql += obj.constraint.statement;
            }
        }

        /* now attach order */
        if(obj.order) {
            sql += ' ORDER BY ' + obj.order
        }

        /* now attach limit */
        if(obj.limit) {
            sql += ' LIMIT ' + obj.limit
        }

        //console.log(sql);

        var result = [];
        var that = this;
        this.dbHandler.readTransaction(function(t) {
            t.executeSql(sql, stmtParameters, function (tx, res) {
                var len = res.rows.length, i;
                for (var i = 0; i < len; i++) {
                    var rec = JSON.parse(JSON.stringify(res.rows.item(i))); /* obj returned form WebSQL is non-writable, therefore needs to be converted */
                    /* set m_id property of record to m_id got from db, then delete m_id property named after db column (M.META_M_ID) */
                    rec['m_id'] = rec[M.META_M_ID];
                    delete rec[M.META_M_ID];
                    /* create model record from result with state valid */
                    /* $.extend merges param1 object with param2 object*/
                    var myRec = obj.model.createRecord($.extend(rec, {state: M.STATE_VALID}));

                    /* create M.Date objects for all date properties */
                    for(var j in myRec.__meta) {
                        /* here we can work with setter and getter because myRec already is a model record */
                        if(myRec.__meta[j].dataType === 'Date' && typeof(myRec.get(j)) === 'string') {
                            myRec.set(j, M.Date.create(myRec.get(j)));
                        }
                    }
                    
                    /* add to result array */
                    result.push(myRec);
                }

            }, function(){M.Logger.log('Incorrect statement: ' + sql, M.ERROR)}) // callbacks: SQLStatementErrorCallback
        }, function(sqlError){ // errorCallback
            /* bind error callback */
            if(obj.onError && obj.onError.target && obj.onError.action) {
                obj.onError = this.bindToCaller(obj.onError.target, obj.onError.target[obj.onError.action], sqlError);
                obj.onError();
            } else if (typeof(obj.onError) !== 'function') {
                M.Logger.log('Target and action in onError not defined.', M.ERROR);
            }
        }, function() { // voidCallback (success)
            /* bind success callback */
            if(obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
                /* [result] is a workaround for bindToCaller: bindToCaller uses call() instead of apply() if an array is given.
                 * result is an array, but what call is doing with it is wrong in this case. call maps each array element to one method
                 * parameter of the function called. Our callback only has one parameter so it would just pass the first value of our result set to the
                 * callback. therefor we now put result into an array (so we have an array inside an array) and result as a whole is now passed as the first
                 * value to the callback.
                 *  */
                obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action], [result]);
                obj.onSuccess();
            }else if(obj.onSuccess && typeof(obj.onSuccess) === 'function') {
                obj.onSuccess(result);
            }
        });
    },


    /**
     * @private
     */
    openDb: function() {
        //console.log('openDb() called.');
        /* openDatabase(db_name, version, description, estimated_size, callback) */
        try {
            if (!window.openDatabase) {
                M.DialogView.alert({
                    message: 'Your browser does not support WebSQL.',
                    title: 'WebSQL Not Supported.'
                });
            } else {
                //this.dbHandler = openDatabase(this.config.dbName, '1.0', 'Database for ' + M.Application.name, this.config.size);
                /* leave version empty to open database regardless of its version */
                if(!this.dbHandler) {
                    this.dbHandler = openDatabase(this.config.dbName, '', 'Database for ' + M.Application.name, this.config.size);
                }

            }
        } catch(e) {
            
            if (e == 2) {
                // Version number mismatch.
                //M.Logger.log('Invalid database version.', M.ERROR);
                M.DialogView.alert({
                    message: 'Database version 1.0 not supported.',
                    title: 'Invalid database version.'
                });
            } else {
                //M.Logger.log('Unknown error ' + e + '.', M.ERROR);
                M.DialogView.alert({
                    message: e,
                    title: 'Unknown error.'
                });
            }
            return;
        }
        
    },


    /**
     * Creates the table corresponding to the model record.
     * @private
     */
    createTable: function(obj, callback) {
        //console.log('createTable() called.');
        //console.log(obj);
        var sql = 'CREATE TABLE IF NOT EXISTS '  + obj.model.name
                    + ' (ID INTEGER PRIMARY KEY ASC AUTOINCREMENT UNIQUE';

        for(var r in obj.model.__meta) {
            if(r === 'ID') {/* skip ID, it is defined manually above */
                continue;
            }
           sql += ', ' + this.buildDbAttrFromProp(obj.model, r);
        }

        sql += ', ' + M.META_M_ID + ' INTEGER NOT NULL);';

        //console.log(sql);

        if(this.dbHandler) {
            var that = this;
            try {
                /* transaction has 3 parameters: the transaction callback, the error callback and the success callback */
                this.dbHandler.transaction(function(t) {
                    t.executeSql(sql);
                }, function(sqlError){ // errorCallback
                    /* bind error callback */
                    if(obj.onError && obj.onError.target && obj.onError.action) {
                        obj.onError = this.bindToCaller(obj.onError.target, obj.onError.target[obj.onError.action], sqlError);
                        obj.onError();
                    } else if (typeof(obj.onError) === 'function') {
                        obj.onError(sqlError);
                    } else {M.Logger.log('Target and action in onError not defined.', M.ERROR); }}, that.bindToCaller(that, that.handleDbReturn, [obj, callback])); // success callback
            } catch(e) {
                M.Logger.log('Error code: ' + e.code + ' msg: ' + e.message, M.ERROR);
                return;
            }
        } else {
            M.Logger.log('dbHandler does not exist.', M.ERROR);
        }
    },

    /**
     * Creates a new data provider instance with the passed configuration parameters
     * @param {Object} obj Includes dbName
     */
    configure: function(obj) {
        //console.log('configure() called.');
        obj.size = obj.size ? obj.size : 1024*1024;
        // maybe some value checking
        return this.extend({
            config:obj
        });
    },

    /* Helper methods */

    /**
     * @private
     * Creates the column definitions from the properties of the model record with help of the meta information that
     * the {@link M.ModelAttribute} objects provide.
     * @param {Object}
     * @returns {String} The string used for db create to represent this property.
     */
    buildDbAttrFromProp: function(model, prop) {

        var type = this.typeMapping[model.__meta[prop].dataType].toUpperCase();

        var isReqStr = model.__meta[prop].isRequired ? ' NOT NULL' : '';

        return prop + ' ' + type + isReqStr;
    },


    /**
     * Queries the WebSQL storage for the maximum db ID that was provided for a table that is defined by model.name. Delegates to
     * {@link M.WebSqlProvider#setDbIdOfModel}.
     *
     * @param {Object} model The table's model
     */
    queryDbForId: function(model) {
        var that = this;
        this.dbHandler.readTransaction(function(t) {
            var r = t.executeSql('SELECT seq as ID FROM sqlite_sequence WHERE name="' + model.name + '"', [], function (tx, res) {
                that.setDbIdOfModel(model, res.rows.item(0).ID);
            });
        });
    },

    /**
     * @private
     * Is called when creating table successfully returned and therefor sets the initialization flag of the provider to YES.
     * Then calls the internal callback => the function that called init().
     */
    handleDbReturn: function(obj, callback) {
        //console.log('handleDbReturn() called.');
        this.isInitialized = YES;
        this.internalCallback(obj, callback);
    },

    /**
     * @private
     * Is called from queryDbForId, sets the model record's ID to the latest value of ID in the database.
     */
    setDbIdOfModel: function(model, id) {
        model.record.ID = id;
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      25.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/validator.js')

/**
 * @class
 *
 * Validates a given date. Validates whether it is possible to create a {@link M.Date} (then valid) or not (then invalid).
 *
 * @extends M.Validator
 */
M.DateValidator = M.Validator.extend(
/** @scope M.DateValidator.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DateValidator',

    /**
     * Validation method. First checks if value is not null, undefined or an empty string and then tries to create a {@link M.Date} with it.
     * Pushes different validation errors depending on where the validator is used: in the view or in the model.
     *
     * @param {Object} obj Parameter object. Contains the value to be validated, the {@link M.ModelAttribute} object of the property and the model record's id.
     * @returns {Boolean} Indicating whether validation passed (YES|true) or not (NO|false).
     */
    validate: function(obj, key) {
        /* validate the date to be a valid german or us date: dd.mm.yyyy or mm/dd/yyyy */
        var patternDateUS =  /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})(\s+([0-9]{2})\:([0-9]{2})(\:([0-9]{2}))?)?$/;
        var patternDateDE =  /^([0-9]{2})\.([0-9]{2})\.([0-9]{4})(\s+([0-9]{2})\:([0-9]{2})(\:([0-9]{2}))?)?$/;

        if(obj.isView) {
            if(obj.value === null || obj.value === undefined || obj.value === '' || !(patternDateUS.test(obj.value) || patternDateDE.test(obj.value)) || !M.Date.create(obj.value)) {
                this.validationErrors.push({
                    msg: this.msg ? this.msg : key + ' is not a valid date.',
                    viewId: obj.id,
                    validator: 'DATE',
                    onSuccess: obj.onSuccess,
                    onError: obj.onError
                });
                return NO;
            }
            return YES;
        } else {
            if(obj.value.type && obj.value.type !== 'M.Date' && (obj.value === null || obj.value === undefined || obj.value === '' || !M.Date.create(obj.value))) {
                this.validationErrors.push({
                    msg: this.msg ? this.msg : obj.property + ' is not a valid date.',
                    modelId: obj.modelId,
                    property: obj.property,
                    validator: 'DATE',
                    onSuccess: obj.onSuccess,
                    onError: obj.onError
                });
                return NO;
            }
            return YES;
        }
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      22.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/validator.js')

/**
 * @class
 *
 * Validates a String if it represents a valid e-mail adress.
 *
 * @extends M.Validator
 */
M.EmailValidator = M.Validator.extend(
/** @scope M.EmailValidator.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.EmailValidator',

    /**
     * @type {RegExp} The regular expression for a valid e-mail address
     */
    pattern: /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)\@((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/,

    /**
     * Validation method. Executes e-mail regex pattern to string. 
     *
     * @param obj Parameter object. Contains the value to be validated, the {@link M.ModelAttribute} object of the property and the model record's id.
     * @returns {Boolean} Indicating whether validation passed (YES|true) or not (NO|false).
     */
    validate: function(obj) {
        if (typeof(obj.value !== 'string')) {
            return NO;
        }
        
        if (this.pattern.exec(obj.value)) {
            return YES;
        }
        this.validationErrors.push({
            msg: obj.value + ' is not a valid email adress.',
            modelId: obj.modelId,
            property: obj.property,
            viewId: obj.viewId,
            validator: 'EMAIL',
            onSuccess: obj.onSuccess,
            onError: obj.onError
        });
        return NO;
    }
    
});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      22.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/validator.js')

/**
 * @class
 *
 * Validates if it represents a minus number. Works with numbers and strings containing just a number.
 *
 * @extends M.Validator
 */
M.NotMinusValidator = M.Validator.extend(
/** @scope M.NotMinusValidator.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.NotMinusValidator',

    /**
     * Validation method. Distinguishes between type of value: number or string. Both possible. If number value is checked if less than zero,
     * if string value is checked if ^prefixed with a minus sign ( - ).
     *
     * @param {Object} obj Parameter object. Contains the value to be validated, the {@link M.ModelAttribute} object of the property and the model record's id.
     * @returns {Boolean} Indicating whether validation passed (YES|true) or not (NO|false).
     */
    validate: function(obj) {

       if(typeof(obj.value) === 'number') {
           if(obj.value < 0) {
                this.validationErrors.push({
                    msg: obj.value + ' is a minus value. This is not allowed.',
                    modelId: obj.modelId,
                    property: obj.property,
                    viewId: obj.viewId,
                    validator: 'NUMBER',
                    onSuccess: obj.onSuccess,
                    onError: obj.onError
                });
                return NO;
           }
           return YES;
       }

       if(typeof(obj.value) === 'string') {
           var pattern = /-/;
           if(this.pattern.exec(obj.value)) {
               this.validationErrors.push({
                    msg: obj.value + ' is a minus value. This is not allowed.',
                    modelId: obj.modelId,
                    property: obj.property,
                    viewId: obj.viewId,
                    validator: 'NUMBER',
                    onSuccess: obj.onSuccess,
                    onError: obj.onError
                });
                return NO;
           }
           return YES;
       }
    }
});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      22.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/validator.js')

/**
 * @class
 *
 * Validates if passed value is a number. Works with Strings and Numbers. Strings are parsed into numbers and then checked.
 *
 * @extends M.Validator
 */
M.NumberValidator = M.Validator.extend(
/** @scope M.NumberValidator.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.NumberValidator',

    /**
     * Validation method. If value's type is not "number" but a string, the value is parsed into an integer or float and checked versus the string value with '=='.
     * The '==' operator makes an implicit conversion of the value. '===' would return false.
     *
     * @param {Object} obj Parameter object. Contains the value to be validated, the {@link M.ModelAttribute} object of the property and the model record's id.
     * @returns {Boolean} Indicating whether validation passed (YES|true) or not (NO|false).
     */
    validate: function(obj) {
        if(typeof(obj.value) === 'number') {
            return YES;
        }

        /* == makes implicit conversion */ 
        if(typeof(obj.value) === 'string' && (parseInt(obj.value) == obj.value || parseFloat(obj.value) == obj.value)) {
            return YES;        
        }

        this.validationErrors.push({
            msg: obj.value + ' is not a number.',
            modelId: obj.modelId,
            property: obj.property,
            viewId: obj.viewId,
            validator: 'NUMBER',
            onSuccess: obj.onSuccess,
            onError: obj.onError
        });
        return NO;
    }
});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      22.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/validator.js')

/**
 * @class
 *
 * Validates a string if it matches a phone number pattern.
 *
 * @extends M.Validator
 */
M.PhoneValidator = M.Validator.extend(
/** @scope M.PhoneValidator.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.PhoneValidator',

    /**
     * It is assumed that phone numbers consist only of: 0-9, -, /, (), .
     * @type {RegExp} The regular expression detecting a phone adress.
     */
    pattern: /^[0-9-\/()+\.\s]+$/,

    /**
     * Validation method. Executes e-mail regex pattern to string. 
     *
     * @param {Object} obj Parameter object. Contains the value to be validated, the {@link M.ModelAttribute} object of the property and the model record's id.
     * @returns {Boolean} Indicating whether validation passed (YES|true) or not (NO|false).
     */
    validate: function(obj) {
        if (typeof(obj.value !== 'string')) {
            return NO;
        }

        if (this.pattern.exec(obj.value)) {
            return YES;
        }
        this.validationErrors.push({
            msg: obj.value + ' is not a phone number.',
            modelId: obj.modelId,
            property: obj.property,
            viewId: obj.viewId,
            validator: 'PHONE',
            onSuccess: obj.onSuccess,
            onError: obj.onError
        });
        return NO;
    }
    
});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      23.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/validator.js')

/**
 * @class
 *
 * Validates if value is existing. Used, e.g. for every property in a model record that is marked as  'required' ({@link M.Model#isRequired}.
 *
 * @extends M.Validator
 */
M.PresenceValidator = M.Validator.extend(
/** @scope M.PresenceValidator.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.PresenceValidator',

    /**
     * Validation method. First checks if value is not null, undefined or an empty string and then tries to create a {@link M.Date} with it.
     * Pushes different validation errors depending on where the validator is used: in the view or in the model.
     *
     * @param {Object} obj Parameter object. Contains the value to be validated, the {@link M.ModelAttribute} object of the property and the model record's id.
     * @param {String} key
     * @returns {Boolean} Indicating whether validation passed (YES|true) or not (NO|false).
     */
    validate: function(obj, key) {
        if(obj.value === null || obj.value === undefined || obj.value === '') {
            if(obj.isView) {
                this.validationErrors.push({
                    msg: this.msg ? this.msg : key + ' is required and is not set.',
                    viewId: obj.id,
                    validator: 'PRESENCE',
                    onSuccess: obj.onSuccess,
                    onError: obj.onError
                });
            } else {
                this.validationErrors.push({
                    msg: this.msg ? this.msg : obj.property + ' is required and is not set.',
                    modelId: obj.modelId,
                    property: obj.property,
                    validator: 'PRESENCE',
                    onSuccess: obj.onSuccess,
                    onError: obj.onError
                });
            }
            return NO;
        }
        return YES;
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      22.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/validator.js')

/**
 * @class
 *
 * Validates if value represents a valid URL.
 *
 * @extends M.Validator
 */
M.UrlValidator = M.Validator.extend(
/** @scope M.UrlValidator.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.UrlValidator',

    /**
     * @type {RegExp} The regular expression for a valid web URL
     */
    pattern: /^(http[s]\:\/\/)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?$/,

    /**
     * Validation method. Executes urk regex pattern to string. 
     *
     * @param {Object} obj Parameter object. Contains the value to be validated, the {@link M.ModelAttribute} object of the property and the model record's id.
     * @returns {Boolean} Indicating whether validation passed (YES|true) or not (NO|false).
     */
    validate: function(obj) {
        if (typeof(obj.value !== 'string')) {
            return NO;
        }

        if (this.pattern.exec(obj.value)) {
            return YES;
        }
        this.validationErrors.push({
            msg: obj.value + ' is not a valid url.',
            modelId: obj.modelId,
            property: obj.property,
            viewId: obj.viewId,
            validator: 'PHONE',
            onSuccess: obj.onSuccess,
            onError: obj.onError
        });
        return NO;
    }
    
});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      28.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

M.STATE_UNDEFINED = 'state_undefined';
M.STATE_NEW = 'state_new';
M.STATE_INSYNCPOS = 'state_insyncpos';
M.STATE_INSYNCNEG = 'state_insyncneg';
M.STATE_LOCALCHANGED = 'state_localchange';
M.STATE_VALID = 'state_valid';
M.STATE_INVALID = 'state_invalid';
M.STATE_DELETED = 'state_deleted';

m_require('core/foundation/model_registry.js');

/*
    TODO: make model customizable regarding performance killing features. means configurable activation of certain features:
    - validation
    - model references
    - maybe also: automatic date transformation
 */

/**
 * @class
 * 
 * M.Model is the prototype for every model and for every model record (a model itself is the blueprint for a model record).
 * Models hold the business data of an application respectively the application's state. It's usually the part of an application that is persisted to storage.
 * M.Model acts as the gatekeeper to storage. It uses data provider for persistence and validators to validate its records.
 * 
 * @extends M.Object
 */
M.Model = M.Object.extend(
/** @scope M.Model.prototype */ { 
    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Model',

    /**
     * The name of the model.
     *
     * @type String
     */
    name: '',

    /**
     * Unique identifier for the model record.
     *
     * Note: Unique doesn't mean that this m_id is a global unique ID, it is just unique
     * for records of this type of model.
     *
     * @type Number
     */
    m_id: null,

    /**
     * The model's record defines the properties that are semantically bound to this model:
     * e.g. a person's record is (in simplest case): firstname, lastname, age.
     *
     * @type Object record
     */
    record: null,

    /**
     * Object containing all meta information for the object's properties
     * @type Object
     */
    __meta: {},

    /**
     * Manages records of this model
     * @type Object
     */
    recordManager: null,

    /**
     * List containing all models in application
     * @type Object|Array
     */
    modelList: {},

    /**
     * A constant defining the model's state. Important e.g. for syncing storage
     * @type String
     */
    state: M.STATE_UNDEFINED,


    /**
     * determines whether model shall be validated before saving to storage or not.
     * @type Boolean
     */
    usesValidation: YES,

    /**
     * The model's data provider. A data provider persists the model to a certain storage.
     *
     * @type Object
     */
    dataProvider: null,

    /**
     * Creates a new record of the model, means an instance of the model based on the blueprint.
     * You pass the object's specific attributes to it as an object.
     *
     * @param {Object} obj The properties object, e.g. {firstname: 'peter', lastname ='fox'}
     * @returns {Object} The model record with the passed properties set. State depends on newly creation or fetch from storage: if
     * from storage then state is M.STATE_NEW or 'state_new', if fetched from database then it is M.STATE_VALID or 'state_valid'
     */
    createRecord: function(obj) {
        
        var rec = this.extend({
            m_id: obj.m_id ? obj.m_id : M.Application.modelRegistry.getNextId(this.name),
            record: obj /* properties that are added to record here, but are not part of __meta, are deleted later (see below) */
        });
        delete obj.m_id;
        rec.state = obj.state ? obj.state : M.STATE_NEW;
        delete obj.state;

        /* set timestamps if new */
        if(rec.state === M.STATE_NEW) {
            rec.record[M.META_CREATED_AT] = M.Date.now().format('yyyy/mm/dd HH:MM:ss');
            rec.record[M.META_UPDATED_AT] = M.Date.now().format('yyyy/mm/dd HH:MM:ss');
        }

        for(var i in rec.record) {
            if(i === 'ID' || i === M.META_CREATED_AT || i === M.META_UPDATED_AT) {
                continue;
            }

            /* if reference to a record entity is in param obj, assign it like in set. */
            if(rec.__meta[i].dataType === 'Reference' && rec.record[i] && rec.record[i].type && rec.record[i].type === 'M.Model') {
                // call set of model
                rec.set(i, rec.record[i]);
            }
            
            if(rec.__meta[i]) {
                rec.__meta[i].isUpdated = NO;    
            }

            /* if record contains properties that are not part of __meta (means that are not defined in the model blueprint) delete them */
            if(!rec.__meta.hasOwnProperty(i)) {
                delete rec.record[i];
            }
        }

        this.recordManager.add(rec);
        return rec;
    },

    /** 
     * Create defines a new model blueprint. It is passed an object with the model's attributes and the model's business logic
     * and after it the type of data provider to use.
     *
     * @param {Object} obj An object defining the model's  
     * @param {Object} dp The data provider to use, e. g. M.LocalStorageProvider
     * @returns {Object} The model blueprint: acts as blueprint to all records created with @link M.Model#createRecord
     */
    create: function(obj, dp) {
        var model = M.Model.extend({
            __meta: {},
            name: obj.__name__,
            dataProvider: dp,
            recordManager: {},
            usesValidation: obj.usesValidation === null || obj.usesValidation === undefined ? this.usesValidation : obj.usesValidation
        });
        delete obj.__name__;
        delete obj.usesValidation;

        for(var prop in obj) {
            if(typeof(obj[prop]) === 'function') {
                model[prop] = obj[prop];
            } else if(obj[prop].type === 'M.ModelAttribute') {
                model.__meta[prop] = obj[prop];    
            }
        }

        /* add ID, _createdAt and _modifiedAt properties in meta for timestamps  */
        model.__meta['ID'] = this.attr('Integer', {
            isRequired:NO
        });
        model.__meta[M.META_CREATED_AT] = this.attr('String', { // could be 'Date', too
            isRequired:YES
        });
        model.__meta[M.META_UPDATED_AT] = this.attr('String', { // could be 'Date', too
            isRequired:YES
        });

        model.recordManager = M.RecordManager.extend({records:[]});

        /* if dataprovider is WebSqlProvider, create table for this model and add ID ModelAttribute Object to __meta */
        if(model.dataProvider.type === 'M.WebSqlProvider') {
            model.dataProvider.init({model: model, onError:function(err){console.log(err);}}, function() {});
            model.dataProvider.isInitialized = YES;
        }

        M.Application.modelRegistry.register(model.name);

        /* save model in modelList with model name as key */
        this.modelList[model.name] = model;

        /* Re-set the just registered model's id, if there is a value stored */
        /* Model Registry stores the current id of a model type into localStorage */
        var m_id = localStorage.getItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + model.name);
        if(m_id) {
            M.Application.modelRegistry.setId(model.name, parseInt(m_id));
        }
        return model;
    },

    /**
     * Defines a to-one-relationship.
     * @param refName
     * @param refEntity
     */
    hasOne: function(refEntity, obj) {
        var relAttr = this.attr('Reference', {
            refType: 'toOne',
            reference: refEntity,
            validators: obj.validators,
            isRequired: obj.isRequired
        });
        return relAttr;
    },

    /**
     * Defines a to-many-relationship
     * @param colName
     * @param refEntity
     * @param invRel
     */
    hasMany: function(colName, refEntity, invRel) {
        var relAttr = this.attr('Reference', {
            refType: 'toMany',
            reference: refEntity
        });
        return relAttr;
    },

    /**
     * Returns a M.ModelAttribute object to map an attribute in our record.
     *
     * @param {String} type type of the attribute
     * @param {Object} opts options for the attribute, like required flag and validators array
     * @returns {Object} An M.ModelAttribute object configured with the type and options passed to the function.
     */
    attr: function(type, opts) {
        return M.ModelAttribute.attr(type, opts); 
    },

    /*
     * get and set methods for encapsulated attribute access
     */

    /**
     * Get attribute propName from model, if async provider is used, get on references does not return the property value but a boolean indicating
     * the load status. get must then be called again in onSuccess callback to retrieve the value
     * @param {String} propName the name of the property whose value shall be returned
     * @param {Object} obj optional parameter containing the load force flag and callbacks, e.g.:
     * {
     *   force: YES,
     *   onSuccess: function() { console.log('yeah'); }
     * }
     * @returns {Boolean|Object|String} value of property or boolean indicating the load status
     */
    get: function(propName, obj) {
        var metaProp = this.__meta[propName];
        var recProp = this.record[propName];
        /* return ref entity if property is a reference */
        if(metaProp && metaProp.dataType === 'Reference') {
            if(metaProp.refEntity) {// if entity is already loaded and assigned here in model record
                return metaProp.refEntity;
            } else if(recProp) { // if model record has a reference set, but it is not loaded yet
                if(obj && obj.force) { // if force flag was set
                    /* custom call to deepFind with record passed only being the one property that needs to be filled, type of dp checked in deepFind */
                    var callback = this.dataProvider.isAsync ? obj.onSuccess : null
                    this.deepFind([{
                        prop: propName,
                        name: metaProp.reference,
                        model: this.modelList[metaProp.reference],
                        m_id: recProp
                    }], callback);
                    if(!this.dataProvider.isAsync) { // if data provider acts synchronous, we can now return the fetched entity
                        return metaProp.refEntity;
                    }
                    return YES;
                } else { // if force flag was not set, and object is not in memory and record manager load is not done and we return NO
                    var r = this.recordManager.getRecordForId(recProp);
                    if(r) { /* if object is already loaded and in record manager don't access storage */
                        return r;
                    } else {
                        return NO; // return
                    }
                }
            } else { // if reference has not been set yet
                return null;
            }
        }
        /* if propName is not a reference, but a "simple" property, just return it */
        return recProp;
    },

    /**
     * Set attribute propName of model with value val, sets' property to isUpdated (=> will be included in UPDATE call)
     * and sets a new timestamp to _updatedAt. Will not do anything, if newVal is the same as the current prop value.
     * @param {String} propName the name of the property whose value shall be set
     * @param {String|Object} val the new value
     */
    set: function(propName, val) {

        /* TODO: implement hasMany... */
        /* TODO: evaluate whether to save m_id in record and entity reference in __meta or other way round */
        if(this.__meta[propName].dataType === 'Reference' && val.type && val.type === 'M.Model') {    // reference set
            /* first check if new value is passed */ 
            if(this.record[propName] !== val.m_id) {
                /* set m_id of reference in record */
                this.record[propName] = val.m_id;
                this.__meta[propName].refEntity = val;
            }
            return;
        }

        if(this.record[propName] !== val) {
            this.record[propName] = val;
            this.__meta[propName].isUpdated = YES;
            /* mark record as updated with new timestamp*/
            this.record['_updatedAt'] = M.Date.now().format('yyyy/mm/dd HH:MM:ss');
        }        
    },

    /**
     * Returns the records array of the model's record manager.
     * @returns {Object|Array} The records array of record manager.
     */
    records: function() {
        if(this.recordManager && this.recordManager.records) {
            return this.recordManager.records;
        }
    },

    /**
     * Validates the model, means calling validate for each property.
     * @returns {Boolean} Indicating whether this record is valid (YES|true) or not (NO|false).
     */
    validate: function() {
        var isValid = YES;
        var validationErrorOccured = NO;
        /* clear validation error buffer before validation */
        M.Validator.clearErrorBuffer();

        /*
        * validationBasis depends on the state of the model: if the model is in state NEW, all properties (__meta includes all)
        * shall be considered for validation. if model is in another state, the model's record is used. example: the model is loaded from
        * a database with only two properties included (select name, age FROM...). record now only contains these two properties but __meta
        * still has all properties listed. models are valid if loaded from database so when saved again only the loaded properties need to get
        * validated because all others have not been touched. that's why then record is used.
        * */
        var validationBasis = this.state === M.STATE_NEW ? this.__meta : this.record;

        for (var i in validationBasis) {
            if(i === 'ID') { // skip property ID
                continue;
            }
            var prop = this.__meta[i];
            var obj = {
                value: this.record[i],
                modelId: this.name + '_' + this.m_id,
                property: i
            };
            if (!prop.validate(obj)) {
                isValid = NO;
            }
        }
        /* set state of model */
        /*if(!isValid) {
            this.state = M.STATE_INVALID;
        } else {
            this.state = M.STATE_VALID;   
        }*/
        return isValid;
    },

    /* CRUD Methods below */
    /**
     * Calls the corresponding find() of the data provider to fetch data based on the passed query or key.
     *
     * @param {Object} obj The param object with query or key and callbacks.
     * @returns {Boolean|Object} Depends on data provider used. When WebSQL used, a boolean is returned, the find result is returned asynchronously,
     * because the call itself is asynchronous. If LocalStorage is used, the result of the query is returned.
     */
    find: function(obj){
        if(!this.dataProvider) {
            M.Logger.log('No data provider given.', M.ERROR);
        }
        obj = obj ? obj : {};
        /* check if the record list shall be cleared (default) before new found model records are appended to the record list */
        /* TODO: needs to be placed in callback */
        obj['deleteRecordList'] = obj['deleteRecordList'] ? obj.deleteRecordList : YES;
        if(obj.deleteRecordList) {
            this.recordManager.removeAll();
        }
        if(!this.dataProvider) {
            M.Logger.log('No data provider given.', M.ERROR);
        }

        /* extends the given obj with self as model property in obj */
        return this.dataProvider.find( $.extend(obj, {model: this}) );
    },

    /**
     * Create or update a record in storage if it is valid (first check this).
     * If param obj includes cascade:YES then save is cascadaded through all references recursively.
     *
     * @param {Object} obj The param object with query, cascade flag and callbacks.
     * @returns {Boolean} The result of the data provider function call. Is a boolean. With LocalStorage used, it indicates if the save operation was successful.
     * When WebSQL is used, the result of the save operation returns asynchronously. The result then is just the standard result returned by the web sql provider's save method
     * which does not necessarily indicate whether the operation was successful, because the operation is asynchronous, means the operation's end is not predictable. 
     */
    save: function(obj) {
        if(!this.dataProvider) {
            M.Logger.log('No data provider given.', M.ERROR);
        }
        obj = obj ? obj: {};
        if(!this.m_id) {
            return NO;
        }
        var isValid = YES;

        if(this.usesValidation) {
            isValid = this.validate();
        }

        if(obj.cascade) {
            for(var prop in this.__meta) {
                if(this.__meta[prop] && this.__meta[prop].dataType === 'Reference' && this.__meta[prop].refEntity) {
                    this.__meta[prop].refEntity.save({cascade:YES}); // cascades recursively through all referenced model records
                }
            }
        }

        if(isValid) {
            return this.dataProvider.save($.extend(obj, {model: this}));
        }
    },

    /**
     * Delete a record in storage.
     * @returns {Boolean} Indicating whether deletion was successful or not (only with synchronous data providers, e.g. LocalStorage). When asynchronous data providers
     * are used, e.g. WebSQL provider the real result comes asynchronous and here just the result of the del() function call of the @link M.WebSqlProvider is used.
     */
    del: function(obj) {
        if(!this.dataProvider) {
            M.Logger.log('No data provider given.', M.ERROR);
        }
        obj = obj ? obj : {};
        if(!this.m_id) {
            return NO;
        }

       var isDel = this.dataProvider.del($.extend(obj, {model: this}));
        if(isDel) {
            this.state = M.STATE_DELETED;
            return YES
        }
        
    },

    /**
     * completes the model record by loading all referenced entities.
     *
     * @param {Function |�Object} obj The param object with query, cascade flag and callbacks.
     */
    complete: function(callback) {
        //console.log('complete...');
        var records = [];
        for(var i in this.record) {
            if(this.__meta[i].dataType === 'Reference') {
                //records.push(this.__meta[i].refEntity);
                records.push({
                    prop:i,
                    name: this.__meta[i].reference,
                    model: this.modelList[this.__meta[i].reference],
                    m_id: this.record[i]
                });
            }
        }
        this.deepFind(records, callback);
    },

    // TODO: handle onSuccess AND onError
    deepFind: function(records, callback) {
        //console.log('deepFind...');
        //console.log('### records.length: ' + records.length);
        if(records.length < 1) {    // recursion end constraint
            if(callback) {
                callback();
            }
            return;
        }
        var curRec = records.pop(); // delete last element, decreases length of records by 1 => important for recursion constraint above
        var cb = this.bindToCaller(this, this.deepFind,[records, callback]); // cb is callback for find in data provider
        var that = this;


        switch(this.dataProvider.type) {

            case 'M.WebSqlProvider':
                this.modelList[curRec.name].find({     // call find on to fetched model record object
                    constraint: {
                        statement: 'WHERE ' + M.META_M_ID + ' = ? ',
                        parameters: [curRec.m_id] // length must match number of ? in statements
                    },

                    onSuccess: function(result) {
                        that.setReference(result, that, curRec.prop, cb);
                    },
                    onError: function(err) {
                        M.Logger.log('Error: ' + err, M.ERROR);
                    }
                });

                break;

            case 'M.LocalStorageProvider':

                var ref = this.modelList[curRec.name].find({
                    key: curRec.m_id
                });

                this.__meta[curRec.prop].refEntity = ref;

                this.deepFind(records, callback); // recursion
                break;

            default:
                    
                break;
        }
    },

    setReference: function(result, that, prop, callback) {
        that.__meta[prop].refEntity = result[0];    // set reference in source model defined by that
        callback();
    },

    /**
     * sync model with storage (only websql)
     */
    schemaSync: function() {

    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: �2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      27.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/* Available transitions for page changes */
M.TRANSITION = {};
M.TRANSITION.NONE = 'none';
M.TRANSITION.SLIDE = 'slide';
M.TRANSITION.SLIDEUP = 'slideup';
M.TRANSITION.SLIDEDOWN = 'slidedown';
M.TRANSITION.POP = 'pop';
M.TRANSITION.FADE = 'fade';
M.TRANSITION.FLIP = 'flip';

m_require('core/foundation/observable.js');

/**
 * @class
 *
 * The root class for every controller.
 *
 * Controllers, respectively their properties, are observables. Views can observe them.
 *
 * @extends M.Object
 */
M.Controller = M.Object.extend(
/** @scope M.Controller.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Controller',

    /**
     * Makes the controller's properties observable.
     */
    observable: null,

    /**
     * Helper function to build the location href for the view to be displayed.
     *
     * @param {String} id The id of the new target.
     */
    buildLocationHref: function(id) {
        return location.pathname + '#' + id;
    },

    /**
     * Switch the active tab in the application. This includes both activating this tab
     * visually and switching the page.
     *
     * @param {M.TabBarView} tab The tab to be activated.
     */
    switchToTab: function(tab) {
        var currentTab = tab.parentView.activeTab;
        var newPage = M.ViewManager.getPage(tab.page);       

        /* store the active tab in tab bar view */
        tab.parentView.setActiveTab(tab);

        if(tab === currentTab) {
            var currentPage = M.ViewManager.getCurrentPage();
            if(currentPage !== newPage) {
                this.switchToPage(newPage, null, YES, NO);
            }
        } else {
            this.switchToPage(newPage, newPage.tabBarView.transition ? newPage.tabBarView.transition : M.TRANSITION.NONE, NO, NO);
        }
    },

    /**
     * Switch the active page in the application.
     *
     * @param {Object, String} page The page to be displayed or its name.
     * @param {String} transition The transition that should be used. Default: horizontal slide
     * @param {Boolean} isBack YES will cause a reverse-direction transition. Default: NO
     * @param {Boolean} changeLoc Update the browser history. Default: YES
     */
    switchToPage: function(page, transition, isBack, changeLoc) {
        var timeStart = M.Date.now();
        page = page && typeof(page) === 'object' ? page : M.Application.viewManager.getPage(page);

        if(page) {
            transition = transition ? transition : M.TRANSITION.SLIDE;
            isBack = isBack !== undefined ? isBack : NO;
            changeLoc = changeLoc !== undefined ? changeLoc : YES;

            /* Now do the page change by using a jquery mobile method and pass the properties */
            if(page.type === 'M.PageView') {
                //console.log('$.mobile.changePage(' + page.id + ', ' + (M.Application.useTransitions ? transition : M.TRANSITION.NONE) + ', ' + (M.Application.useTransitions ? isBack : NO) + ', ' + changeLoc + ');');
                $.mobile.changePage(page.id, M.Application.useTransitions ? transition : M.TRANSITION.NONE, M.Application.useTransitions ? isBack : NO, changeLoc);
            } else if(page.type === 'M.AlertDialogView' || page.type === 'M.ConfirmDialogView' || page.type === 'M.ActionSheetDialogView') {
                $.mobile.changePage($('#' + page.id), M.Application.useTransitions ? transition : M.TRANSITION.NONE, M.Application.useTransitions ? isBack : NO, changeLoc);
            }
            
            /* Save the current page in the view manager */
            M.Application.viewManager.setCurrentPage(page);
        } else {
            M.Logger.log('Page "' + page + '" not found', M.ERROR);
        }
    },

    /**
     * Returns the class property behind the given key and informs its observers.
     *
     * @param {String} key The key of the property to be changed.
     * @param {Object, String} value The value to be set.
     */
    set: function(key, value) {
        this[key] = value;
        this.observable.notifyObservers(key);
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/model.js');

/**
 * @class
 *
 * The root object for RecordManager.
 *
 * A RecordManager is used by a controllers and is an interface that makes it easy for him to
 * handle his model records.
 *
 * @extends M.Object
 */
M.RecordManager = M.Object.extend(
/** @scope M.RecordManager.prototype */ { 
    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.RecordManager',

    /**
     * Array containing all currently loaded records.
     *
     * @type Object
     */
    records: [],

    /**
     * Add the given model to the modelList.
     *
     * @param {Object} record
     */
    add: function(record) {
        this.records.push(record);
    },

    /**
     * Concats an array if records to the records array.
     *
     * @param {Object} record
     */
    addMany: function(arrOfRecords) {

        if(_.isArray(arrOfRecords)){
            this.records = this.records.concat(arrOfRecords);

        } else if(arrOfRecords.type === 'M.Model') {
            this.add(arrOfRecords);
        }

    },

    /**
     * Resets record list 
     */
    removeAll: function() {
        this.records.length = 0;
    },

    /**
     * Deletes a model record from the record array
     * @param {Number} m_id The internal model id of the model record.
     */
    remove: function(m_id) {

        if(!m_id) {
            M.Logger.log('No id given.', M.WARN);
            return;
        }
        if(typeof(m_id) === 'string') {
            m_id = parseInt(m_id);
        }
        rec = this.getRecordForId(m_id);

        if(rec) {
            this.records = _.select(this.records, function(r){
                return r.m_id !== rec.m_id;
            });
        }
    },

    /**
     * Returns a record from the record array identified by the interal model id.
     * @param {Number} m_id The internal model id of the model record.
     */
    getRecordForId: function(m_id) {
        var record = _.detect(this.records, function(r){
            return r.m_id === m_id;
        });
        return record;
    },

    /**
     * Debug method to print out all content from the records array to the console.
     */
    dumpRecords: function() {
        _.each(this.records, function(rec){
            //console.log(rec.m_id);
            console.log(rec);
        });
    }
    
});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/model.js');

/**
 * @class
 *
 * M.View defines the prototype for any view within The M-Project. It implements lots of basic
 * properties and methods that are used in many derived views. M.View specifies a default
 * behaviour for functionalities like rendering, theming, delegating updates etc.
 *
 * @extends M.Object
 */
M.View = M.Object.extend(
/** @scope M.View.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.View',

    /**
     * A boolean value to definitely recognize a view as a view, independent on its
     * concrete type, e.g. M.ButtonView or M.LabelView.
     *
     * @type Boolean
     */
    isView: YES,

    /**
     * The value property is a generic property for all values. Even if not all views
     * really use it, e.g. the wrapper views like M.ButtonGroupView, most of it do.
     *
     * @property {String}
     */
    value: null,

    /**
     * The path to a content that is bind to the view's value.
     *
     * @property {String}
     */
    contentBinding: null,

    /**
     * An array specifying the view's children.
     *
     * @type Array
     */
    childViews: null,

    /**
     * Indicates whether this view currently has the focus or not.
     *
     * @type Boolean
     */
    hasFocus: NO,

    /**
     * The id of the view used for the html attribute id. Every view gets its own unique
     * id during the rendering process.
     */
    id: null,

    /**
     * Indicates whether the view should be displayed inline or not. This property isn't
     * supported by all views, but e.g. by M.LabelView or M.ButtonView.
     */
    isInline: NO,

    /*
     * Indicates whether the view is currently enabled or disabled.
     */
    isEnabled: YES,

    /**
     * This property determines whether to apply a theme to a view or not.
     *
     * @type Boolean
     */
    applyTheme: YES,

    /**
     * This property can be used to save a reference to the view's parent view.
     *
     * @param {Object}
     */
    parentView: null,

    /**
     * If a view represents a model, e.g. within a list view, this property is used to save
     * the model's id. So the view can be used to get to the record.
     *
     * @param {Object}
     */
    modelId: null,

    /**
     * This property can be used to assign a css class to the view to get a custom styling.
     *
     * @type String
     */
    cssClass: null,

    /**
     * This property can be used to assign a css style to the view. This allows you to
     * create your custom styles inline.
     *
     * @type String
     */
    cssStyle: null,

    /**
     * This property can be used to assign a css class to the view if an error occurs. The
     * applying of this class is automatically triggered if the validation of the view
     * goes wrong. This property is mainly used by input views, e.g. M.TextFieldView.
     *
     * @type String
     */
    cssClassOnError: null,

    /**
     * This property can be used to assign a css class to the view on its initialization. This
     * property is mainly used for input ui elements like text fields, that might have a initial
     * value that should be rendered in a different style than the later value entered by the
     * user. This property is mainly used by input views, e.g. M.TextFieldView.
     *
     * @type String
     */
    cssClassOnInit: null,

    /**
     * This property is used internally to recursively build the pages html representation.
     * It is once set within the render method and then eventually updated within the
     * renderUpdate method.
     *
     * @type String
     */
    html: '',

    /**
     * Determines whether an onChange event will trigger a defined action or not.
     * This property is basically interesting for input ui elements, e.g. for
     * text fields.
     *
     * @type Boolean
     */
    triggerActionOnChange: NO,

    /**
     * Determines whether an onKeyUp event will trigger a defined action or not.
     * This property is basically interesting for input ui elements, e.g. for
     * text fields.
     *
     * @type Boolean
     */
    triggerActionOnKeyUp: NO,

    /**
     * Determines whether an onKeyUp event with the enter button will trigger a defined
     * action or not. This property is basically interesting for input ui elements, e.g.
     * for text fields.
     *
     * @type Boolean
     */
    triggerActionOnEnter: NO,

    /**
     * This method encapsulates the 'extend' method of M.Object for better reading of code syntax.
     * It triggers the content binding for this view,
     * gets an ID from and registers itself at the ViewManager.
     *
     * @param {Object} obj The mixed in object for the extend call.
     */
    design: function(obj) {
        var view = this.extend(obj);
        if(view.contentBinding) {
            view.attachToObservable(view.contentBinding);
        } else if(view.computedValue && view.computedValue.contentBinding) {
            view.attachToObservable(view.computedValue.contentBinding);
        }
        view.id = M.Application.viewManager.getNextId();
        M.Application.viewManager.register(view);
        return view;
    },

     /**
     * This is the basic render method for any views. It does not specific rendering, it just calls
     * renderChildViews method. Most views overwrite this method with a custom render behaviour.
     * 
     * @private
     * @returns {String} The list item view's html representation.
     */
    render: function() {
        this.renderChildViews();
        return this.html;
    },

    /**
     * @interface
     *
     * This method defines an interface method for updating an already rendered html representation
     * of a view. This should be implemented with a specific behaviour for any view.
     */
    renderUpdate: function() {

    },

    /**
     * Triggers render() on all children. This method defines a basic behaviour for rendering a view's
     * child views. If a custom behaviour for a view is desired, the view has to overwrite this method.
     *
     * @private
     */
    renderChildViews: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            for(var i in childViews) {
                if(this.type === 'M.PageView' && this[childViews[i]].type === 'M.TabBarView') {
                    this.hasTabBarView = YES;
                    this.tabBarView = this[childViews[i]];
                }
                if(this[childViews[i]]) {
                    this.html += this[childViews[i]].render();
                } else {
                    M.Logger.log(childViews[i] + ' is undefinded. Can\' call render() of an undefinded object', M.ERROR);
                }
            }
            return this.html;
        }
    },

    /**
     * Clears the html property of a view and triggers the same method on all of its
     * child views.
     */
    clearHtml: function() {
        this.html = '';
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            for(var i in childViews) {
                this[childViews[i]].clearHtml();
            }
        }
    },

    /**
     * If the view's computedValue property is set, compute the value. This allows you to
     * apply a method to a dynamically set value. E.g. you can provide your value with an
     * toUpperCase().
     */
    computeValue: function() {
        if(this.computedValue) {
            this.value = this.computedValue.operation(this.computedValue.valuePattern ? this.value : this.computedValue.value, this);
        }
    },

    /**
     * This method is a basic implementation for theming a view. It simply calls the
     * themeChildViews method. Most views overwrite this method with a custom theming
     * behaviour.
     */
    theme: function() {
        this.themeChildViews();
    },

    /**
     * This method triggers the theme method on all children.
     */
    themeChildViews: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            for(var i in childViews) {
                this[childViews[i]].theme();
            }
        }
    },

    /**
     * The contentDidChange method is automatically called by the observable when the
     * observable's state did change. It then updates the view's value property based
     * on the specified content binding.
     */
    contentDidChange: function(){
        var bindingPath = this.contentBinding ? this.contentBinding.split('.') : this.computedValue.contentBinding.split('.');
        if(bindingPath && bindingPath.length === 3 && !(this.hasFocus && this.type === 'M.TextFieldView')) {
            if(this.contentBinding) {
                this.value = eval(bindingPath[0])[bindingPath[1]][bindingPath[2]];
            } else {
                this.computedValue.value = eval(bindingPath[0])[bindingPath[1]][bindingPath[2]];
            }
            this.renderUpdate();
            this.delegateValueUpdate();
        } else if(bindingPath && bindingPath.length === 3) {
            return;
        } else {
            var bindingPathString = bindingPath.join('.');
            M.Logger.log('bindingPath \'' + bindingPathString + '\' not valid', M.Error);
        }
    },

    /**
     * This method attaches the view to an observable to be later notified once the observable's
     * state did change.
     *
     * @param {String} contentBinding The path to the observable property.
     */
    attachToObservable: function(contentBinding) {
        var bindingPath = contentBinding.split('.');
        if(bindingPath && bindingPath.length === 3 && eval(bindingPath[0]) && eval(bindingPath[0])[bindingPath[1]]) {
            var controller = eval(bindingPath[0])[bindingPath[1]];
            if(!controller.observable) {
                controller.observable = M.Observable.extend({});
            }
            controller.observable.attach(this, bindingPath[2]);
            this.isObserver = YES;
        } else {
            var bindingPathString = bindingPath.join('.');
            M.Logger.log('bindingPath \'' + bindingPathString + '\' not valid', M.Error);
        }
    },

    /**
     * @interface
     * 
     * This method defines an interface method for setting the view's value from its DOM
     * representation. This should be implemented with a specific behaviour for any view.
     */
    setValueFromDOM: function() {

    },

    /**
     * This method delegates any value changes to a controller, if the 'contentBindingReverse'
     * property is specified.
     */
    delegateValueUpdate: function() {
        /* delegate value updates to a binded controller,
           but only if the view currently is the master */
        if(this.contentBindingReverse && this.hasFocus) {
            var params = this.contentBindingReverse.split('.');
            var controller = eval(params[0]);
            controller[params[1]].set(params[2], this.value);
        }
    },

    /**
     * @interface
     *
     * This method defines an interface method for styling the view. This should be
     * implemented with a specific behaviour for any view.
     */
    style: function() {

    },

    /**
     * This method is called whenever the view got the focus and basically only sets
     * the view's hasFocus property to YES. If a more complex behaviour is desired,
     * a view has to overwrite this method.
     */
    gotFocus: function() {
        this.hasFocus = YES;
    },

    /**
     * This method is called whenever the view lost the focus and basically only sets
     * the view's hasFocus property to NO. If a more complex behaviour is desired,
     * a view has to overwrite this method.
     */
    lostFocus: function() {
        this.hasFocus = NO;
    },

    /**
     * This method secure the passed string. It is mainly used for securing input elements
     * like M.TextFieldView but since it is part of M.View it can be used and called out
     * of any view.
     *
     * So far we only replace '<' and '>' with their corresponding html entity. The functionality
     * of this method will be extended in the future. If a more complex behaviour is desired,
     * any view using this method has to overwrite it.
     *
     * @param {String} str The string to be secured.
     * @returns {String} The secured string.
     */
    secure: function(str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },

    /**
     * This method parses a given string, replaces any new line, '\n', with a line break, '<br/>',
     * and returns the modified string. This can be useful especially for input views, e.g. it is
     * used in context with the M.TextFieldView.
     *
     * @param {String} str The string to be modified.
     * @returns {String} The modified string.
     */
    nl2br: function(str) {
        if(str) {
            if(typeof(str) !== 'string') {
                str = String(str);
            }
            return str.replace(/\n/g, '<br />');
        }
        return str;
    },

    /**
     * This method parses a given string, replaces any tabulator, '\t', with four spaces, '&#160;',
     * and returns the modified string. This can be useful especially for input views, e.g. it is
     * used in context with the M.TextFieldView.
     *
     * @param {String} str The string to be modified.
     * @returns {String} The modified string.
     */
    tab2space: function(str) {
        if(str) {
            if(typeof(str) !== 'string') {
                str = String(str);
            }
            return str.replace(/\t/g, '&#160;&#160;&#160;&#160;');
        }
        return str;
    },

    /**
     * @interface
     *
     * This method defines an interface method for clearing a view's value. This should be
     * implemented with a specific behaviour for any input view.
     */
    clearValue: function() {
        
    },

    /**
     * Adds a css class to the view's DOM representation.
     *
     * @param {String} cssClass The css class to be added.
     */
    addCssClass: function(cssClass) {
        $('#' + this.id).addClass(cssClass);
    },

    /**
     * Removes a css class to the view's DOM representation.
     *
     * @param {String} cssClass The css class to be added.
     */
    removeCssClass: function(cssClass) {
        $('#' + this.id).removeClass(cssClass);
    },

    /**
     * Adds or updates a css property to the view's DOM representation.
     *
     * @param {String} key The property's name.
     * @param {String} value The property's value.
     */
    setCssProperty: function(key, value) {
        $('#' + this.id).css(key, value);
    },

    /**
     * Removes a css property from the view's DOM representation.
     *
     * @param {String} key The property's name.
     */
    removeCssProperty: function(key) {
        this.setCssProperty(key, '');
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: �2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/view.js');


/**
 * @class
 *
 * The ViewManager manages and knows all views that are used in the application. The ViewManager is part of M.Application.
 *
 * It is used by various other components (e.g. controller: switchToPage) to connect from javascript objects to their
 * HTML representation. 
 *
 * @extends M.Object
 */
M.ViewManager = M.Object.extend(
/** @scope M.ViewManager.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ViewManager',

    /**
     * The nextId delivered to a view (used as html id attribute value) with prefix m_.
     * Initial state is 0, will be incremeneted by 1 on each call.
     *
     * @type Number
     */
    nextId: 0,

    /**
     * Prefix for Id.
     *
     * @type String
     */
    idPrefix: 'm_',

    /**
     * Array containing all views used in the application.
     *
     * @type Object
     */
    viewList: [],

    /**
     * A reference to the currently displayed page.
     *
     * @type Object
     */
    currentPage: null,

    /**
     * A reference to the latest found view which is necessary for the findView() method.
     *
     * @type Object
     */
    foundView: null,

    /**
     * Returns the next Id build from nextId property incremented by 1 and the prefix.
     * The id is used as the value for the HTML attribute id.
     * @returns {String} The next id for a view, e.g. 'm_123' (if last id was 'm_122').
     */
    getNextId: function() {
        this.nextId = this.nextId + 1;
        return this.idPrefix + this.nextId;
    },

    /**
     * Adds the view to the viewlist array.
     *
     * @param {Object} view The view to be registered in the viewlist.
     */
    register: function(view) {
        this.viewList.push(view);
    },

    /**
     * Returns the view object from the view list array identified
     * by the value of its id attribute.
     *
     * @param {String} id
     * @returns {Object} The view object from the view list identified by id.
     */
    getViewById: function(id) {
        var view = _.detect(this.viewList, function(v) {
            return v.id === id;
        });
        return view;
    },

    /**
     * Returns the id for a given view.
     *
     * @param {Object} view. The view for which the id value is wanted.
     * @returns {String} The id of a view object.
     */
    getIdByView: function(view) {
        return view.id;
    },

    /**
     * Returns the view object from the view list array identified by the view's
     * name and its surrounding view. If there are multiple views with the same
     * name on the same surrounding view, the first result is returned.
     *
     * Note: Try to use unique names for your views within the same surrounding view!
     *
     * @param {String, Object} parentView. The name of the parent view (if it is a page), its id or the parent view itself.
     * @param {String} targetView. The name of the view to be returned.
     * @returns {Object} The view object from the view list identified by the view's name and the page where it's on.
     */
    getView: function(parentView, targetView) {
        if(typeof(parentView) !== 'object') {
            parentView = M.Application.pages[parentView] ? M.Application.pages[parentView] : (this.getViewById(parentView) ? this.getViewById(parentView) : null);  
        }
        var view = null;

        /* reset previously found views before searching again */
        this.foundView = null;
        if(parentView) {
            view = this.findView(parentView, targetView);
        }

        if(!view) {
            M.Logger.log('view \'' + targetView + '\' not found on page \'' + targetView + '\'', M.WARN);
        }
        return view;
    },

    /**
     * Searches for a certain view within a given parent view. If it is found, the result
     * is returned. Otherwise the search algorithm checks for possible child views and then
     * recursively searches within these child views for the target view.
     *
     * This method is mainly used by the getView() method to find a view within a page.
     *
     * @param {Object} parentView. The parent view to search in.
     * @param {String} targetView. The name of the view to be returned.
     * @returns {Object} The last found view.
     */
    findView: function(parentView, targetView) {
        if(parentView.childViews) {
            var childViews = $.trim(parentView.childViews).split(' ');
            for(var i in childViews) {
                if(targetView === childViews[i]) {
                    this.foundView =  parentView[targetView];
                } else {
                    this.findView(parentView[childViews[i]], targetView);
                }
            }
        }
        return this.foundView;
    },

    /**
     * Returns the page object from the view list array identified by its name. If
     * there are multiple pages with the same name, the first result is returned.
     *
     * Note: Try to use unique names for your pages!
     *
     * @param {String} pageName. The name of the page to be returned.
     * @returns {Object} M.Page object identified by its name.
     */
    getPage: function(pageName) {
        var page = M.Application.pages[pageName];

        if(!page) {
            M.Logger.log('page \'' + pageName + '\' not found', M.WARN);
        }
        return page;
    },

    /**
     * Returns the currently displayed page.
     * @returns {Object} The currently displayed page.
     */
    getCurrentPage: function() {
        return this.currentPage;
    },

    /**
     * Sets the currently displayed page.
     * @param {Object} page The page to be set as current page.
     */
    setCurrentPage: function(page) {
        this.currentPage = page;
    },

    /**
     * Debug method to print out all content from the viewlist array to the console.
     * @private
     */
    dumpViewList: function() {
      _.each(this.viewList, function(view){
        console.log(view.id + ': '+ view.type);
      });  
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: �2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/view_manager.js');

/**
 * @class
 *
 * The root class for an application.
 *
 * @extends M.Object
 */
M.Application = M.Object.extend(
/** @scope M.Application.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Application',

    /**
     * The application's name.
     *
     * @type String
     */
    name: null,

    /**
     * The application's view manager.
     *
     * @type Object
     */
    viewManager: M.ViewManager,

    /**
     * The application's model registry.
     *
     * @type Object
     */
    modelRegistry: M.ModelRegistry,

    /**
     * The application's event dispatcher.
     *
     * @type Object
     */
    eventDispatcher: M.EventDispatcher,

    /**
     * The application's cypher object, used for encoding and decoding.
     *
     * @type Object
     */
    cypher: M.Cypher,

    /**
     * The application's current language.
     *
     * @type String
     */
    currentLanguage: null,

    /**
     * The application's default / fallback language.
     *
     * @type String
     */
    defaultLanguage: null,

    /**
     * This property determines whether to use transitions within the application, e.g. on
     * page switches, or not. If set to NO, there will be no framework-sided transitions.
     *
     * @type Boolean
     */
    useTransitions: YES,

    /**
     * This property is set to NO once the first page within an application was loaded. So this
     * can be used as a hook to trigger some actions at the first load of any view. To do initial
     * things for a specific view, use the isFirstLoad property of M.PageView.
     *
     * @type Boolean
     */
    isFirstLoad: YES,

    /**
     * This method encapsulates the 'include' method of M.Object for better reading of code syntax.
     * Basically it integrates the defined pages within the application into M.Application and sets
     * some basic configuration properties, e.g. the default language.
     *
     * @param {Object} obj The mixed in object for the extend call.
     */
    design: function(obj) {
        this.include({
            pages: obj
        });
        return this;
    },

    /**
     * The application's main-method, that is called automatically on load of the app.
     * Inside this method the rendering is initiated and all pages are bound to the 'pageshow'
     * event so one can do some action whenever a page is loaded.
     */
    main: function() {
        var that = this;

        /* live is jQuery fn that binds an event to all elements matching a certain selector now and in the future */
        var eventList = 'click change keyup focus blur orientationchange tap taphold swipe swipeleft swiperight scrollstart scrollstop';
        $('*[id]').live(eventList, function(evt) {
            that.eventDispatcher.eventDidHappen(evt);
        });

        /* also bind the orientationchange event to the body of the application */
        $('body').bind('orientationchange', function(evt) {
            that.eventDispatcher.eventDidHappen(evt);
        });

        var html = '';
        for(i in this.viewManager.viewList) {
            if(this.viewManager.viewList[i].type === 'M.PageView') {
                html += this.viewManager.viewList[i].render();
                /* bind the pageshow event to any view's pageDidLoad property function */
                $('#' + this.viewManager.viewList[i].id).bind('pagebeforeshow', this.bindToCaller(this.viewManager.viewList[i], this.viewManager.viewList[i].pageWillLoad));

                /* bind the pageshow event to any view's pageWillLoad property function */
                $('#' + this.viewManager.viewList[i].id).bind('pageshow', this.bindToCaller(this.viewManager.viewList[i], this.viewManager.viewList[i].pageDidLoad));

                /* bind the pagebeforehide event to any view's pageWillHide property function */
                $('#' + this.viewManager.viewList[i].id).bind('pagebeforehide', this.bindToCaller(this.viewManager.viewList[i], this.viewManager.viewList[i].pageWillHide));

                /* bind the pagehide event to any view's pageDidHide property function */
                $('#' + this.viewManager.viewList[i].id).bind('pagehide', this.bindToCaller(this.viewManager.viewList[i], this.viewManager.viewList[i].pageDidHide));

                /* set the first page as current page to be displayed */
                if(!this.viewManager.getCurrentPage()) {
                    this.viewManager.setCurrentPage(this.viewManager.viewList[i]);
                }
            }
        }
    }

});