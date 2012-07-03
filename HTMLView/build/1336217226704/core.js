
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
M.Version = '1.1';

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
Object.getPrototypeOf(localStorage).clear = function(param) {
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
}

// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * Creates an object based on a passed prototype.
     *
     * @param {Object} proto The prototype of the new object.
     */
    create: function(proto) {
        var f = function(){};
        f.prototype = proto;
        return new f();
    },

    /**
     * Includes passed properties into a given object.
     *
     * @param {Object} properties The properties to be included into the given object.
     */
    include: function(properties) {
        for(var prop in properties) {
            this[prop] = properties[prop];
        }
    },

    /**
     * Creates a new class and extends it with all functions of the defined super class
     * The function takes multiple input arguments. Each argument serves as additional
     * super classes - see mixins.
     *
     * @param {Object} properties The properties to be included into the given object.
     */
    extend: function(properties){
        /* create the new object */
        var obj = M.Object.create(this);

        /* assign the properties passed with the arguments array */
        obj.include(properties);

        /* return the new object */
        return obj;
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
     * @param {Object|String} value The value to be set.
     */
    set: function(key, value) {
        this[key] = value;
    },

    /**
     * This method will remove an object from the DOM and then delete it. 
     */
    destroy: function() {
        if(this.id && $('#' + this.id)) {
            M.EventDispatcher.unregisterEvents(this);
            M.ViewManager.unregister(this);
            $('#' + this.id).remove();
        }
        delete this;
    }

};
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * You should almost always make requests asynchronous. You can change this
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
     * If set, contains the request's callbacks in sub objects. There are three
     * possible callbacks that can be used:
     *
     *   - beforeSend
     *   - success
     *   - error
     *
     * A callback object consists of at least an action but can also specify a
     * target object that determines the scope for that action. If a target is
     * specified, the action can either  be a string (the name if a method within
     * the specified scope) or a function. If there is no target specified, the
     * action must be a function. So a success callback could e.g. look like:
     *
     *   callbacks: {
     *     success: {
     *       target: MyApp.MyController,
     *       action: 'successCallback'
     *     }
     *   }
     *
     * Or it could look like:
     *
     *   callbacks: {
     *     success: {
     *       target: MyApp.MyController,
     *       action: function() {
     *         // do something...
     *       }
     *     }
     *   }
     *
     * Depending on the type of callback, there are different parameters, that
     * are automatically passed to the callback:
     *
     *   - beforeSend(request)
     *   - success(data, msg, request)
     *   - error(request, msg)
     *
     * For further information about that, take a look at the internal callbacks
     * of M.Request:
     *
     *   - internalBeforeSend
     *   - internalOnSuccess
     *   - internalOnError
     *
     * @type Object
     */
    callbacks: null,

    /**
     * This property can be used to specify whether or not to cache the request.
     * Setting this to YES will set the 'Cache-Control' property of the request
     * header to 'no-cache'.
     *
     * @Boolean
     */
    sendNoCacheHeader: YES,

    /**
     * This property can be used to specify whether or not to send a timestamp
     * along with the request in order to make every request unique. Since some
     * browsers (e.g. Android) automatically cache identical requests, setting
     * this property to YES will add an additional parameter to the request,
     * containing the current timestamp.
     *
     * So if you have any trouble with caching of requests, try setting this to
     * YES. But note, that it might also cause trouble on the server-side if they
     * do not expect this additional parameter.
     *
     * @Boolean
     */
    sendTimestamp: NO,

    /**
     * The data body of the request.
     *
     * @type String, Object
     */
    data: null,

    /**
     * Holds the jQuery request object
     *
     * @type Object
     */
    request: null,

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
        obj = obj ? obj : {};
        return this.extend({
            method: obj['method'] ? obj['method'] : this.method,
            url: obj['url'] ? obj['url'] : this.url,
            isAsync: (obj['isAsync'] !== undefined && obj['isAsync'] !== null) ? obj['isAsync'] : this.isAsync,
            isJSON: (obj['isJSON'] !== undefined && obj['isJSON'] !== null) ? obj['isJSON'] : this.isJSON,
            timeout: obj['timeout'] ? obj['timeout'] : this.timeout,
            data: obj['data'] ? obj['data'] : this.data,
            callbacks: obj['callbacks'],
            sendNoCacheHeader: obj['sendNoCacheHeader'],
            sendTimestamp: obj['sendTimestamp'],
            beforeSend: obj['beforeSend'] ? obj['beforeSend'] : this.beforeSend,
            onError: obj['onError'] ? obj['onError'] : this.onError,
            onSuccess: obj['onSuccess'] ? obj['onSuccess'] : this.onSuccess
        });
    },

    /**
     * A pre-callback that is called right before the request is sent.
     *
     * Note: This method will be removed with v1.0! Use the callbacks
     * property instead.
     *
     * @deprecated
     * @param {Object} request The XMLHttpRequest object.
     */
    beforeSend: function(request){},

    /**
     * The callback to be called if the request failed.
     *
     * Note: This method will be removed with v1.0! Use the callbacks
     * property instead.
     *
     * @deprecated
     * @param {Object} request The XMLHttpRequest object.
     * @param {String} msg The error message.
     */
    onError: function(request, msg){},

    /**
     * The callback to be called if the request succeeded.
     *
     * Note: This method will be removed with v1.0! Use the callbacks
     * property instead.
     *
     * @deprecated
     * @param {String|Object} data The data returned from the server.
     * @param {String} msg A String describing the status.
     * @param {Object} request The XMLHttpRequest object.
     */
    onSuccess: function(data, msg, request){},

    /**
     * This method is an internal callback that is called right before a
     * request is send.
     *
     * @param {Object} request The XMLHttpRequest object.
     */
    internalBeforeSend: function(request){
        if(this.sendNoCacheHeader) {
            request.setRequestHeader('Cache-Control', 'no-cache');
        }

        if(!this.callbacks && this.beforeSend) {
            this.beforeSend(request);
        }

        if(this.callbacks && this.callbacks['beforeSend'] && M.EventDispatcher.checkHandler(this.callbacks['beforeSend'])) {
            M.EventDispatcher.callHandler(this.callbacks['beforeSend'], null, NO, [request]);
        }
    },

    /**
     * This method is an internal callback that is called if a request
     * failed.
     *
     * @param {Object} request The XMLHttpRequest object.
     * @param {String} msg The error message.
     */
    internalOnError: function(request, msg){
        if(!this.callbacks && this.onError) {
            this.onError(request, msg);
        }

        if(this.callbacks && this.callbacks['error'] && M.EventDispatcher.checkHandler(this.callbacks['error'])) {
            M.EventDispatcher.callHandler(this.callbacks['error'], null, NO, [request, msg]);
        }
    },

    /**
     * This method is an internal callback that is called if the request
     * succeeded.
     *
     * @param {String|Object} data The data returned from the server.
     * @param {String} msg A String describing the status.
     * @param {Object} request The XMLHttpRequest object.
     */
    internalOnSuccess: function(data, msg, request){
        if(!this.callbacks && this.onSuccess) {
            this.onSuccess(data, msg, request);
        }

        if(this.callbacks && this.callbacks['success'] && M.EventDispatcher.checkHandler(this.callbacks['success'])) {
            M.EventDispatcher.callHandler(this.callbacks['success'], null, NO, [data, msg, request]);
        }
    },

    /**
     * Sends an Ajax request by using jQuery's $.ajax().
     * Needs init first!
     */
    send: function(){
        this.request = $.ajax({
            type: this.method,
            url: this.url,
            async: this.isAsync,
            dataType: this.isJSON ? 'json' : 'text',
            contentType: this.isJSON ? 'application/json' : 'application/x-www-form-urlencoded',
            timeout: this.timeout,
            data: this.data ? this.data : '',
            context: this,
            beforeSend: this.internalBeforeSend,
            success: this.internalOnSuccess,
            error: this.internalOnError,
            cache: !this.sendTimestamp
        });
    },

    /**
     * Aborts this request. Delegate to jQuery
     *
     * @return Boolean Indicating whether request exists and is aborted or not
     */
    abort: function() {
        if(this.request) {
            this.request.abort();
            return YES;
        }
        return NO;
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * D 	    Day of the week as number.
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

        var	token = /d{1,4}|D{1}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;
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
            D:    D,
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
     * This method returns a timestamp.
     *
     * @returns {Number} The current date as a timestamp.
     */
    getTimestamp: function() {
        if(this.date) {
            return this.date.getTime();
        }
        return null
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
            M.Logger.log('no date specified!', M.ERR);
        }

        return this.extend({
            date: new Date(this.getTimestamp() + milliseconds)
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
        var firstDateInMilliseconds = this.date ? this.getTimestamp() : null;
        var secondDateInMilliseconds = date.date ? date.getTimestamp() : null;
        
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
            M.Logger.log('invalid date passed.', M.ERR);
        } else {
            M.Logger.log('invalid date.', M.ERR);
        }
    },


    /**
     * This method computes the calendar week of a date. It can either be executed on a M.Date object,
     * to get the calendar week of that date, or you can pass parameters to get the calendar week
     * for the specified date.
     *
     * @param {Number} year The year part of the date, e.g. 2011. Must be four digits.
     * @param {Number} month The month part of the date: 0-11. Must be one/two digit.
     * @param {Number} day The day part of the date: 1-31. Must be one/two digits.
     *
     * @returns {Number} The calendar week: 1-52.
     */
    getCalendarWeek: function(year, month, day){
        if(!year) {
            year = parseInt(this.format('yyyy'));
            month = parseInt(this.format('m'));
            day = parseInt(this.format('d'));
        } else {
            month += 1;
        }

        var a = Math.floor((14 - (month)) / 12);
        var y = year + 4800 - a;
        var m = (month) + (12 * a) - 3;
        var jd = day + Math.floor(((153 * m) + 2) / 5) + (365 * y) + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
        var d4 = (jd + 31741 - (jd % 7)) % 146097 % 36524 % 1461;
        var L = Math.floor(d4 / 1460);
        var d1 = ((d4 - L) % 365) + L;
        var calendarWeek = Math.floor(d1 / 7) + 1;

        return calendarWeek;
    },

    /**
     * This method returns an array containing all dates within one calendar week. If no parameters are given,
     * the calendar week of the current date is taken.
     *
     * @param {Number} calendarWeek The calendar week. Note: Pass 'null' if you use this method on an existing M.Date object.
     * @param {Boolean} startWeekOnMonday Determines whether a week starts on monday or sunday (optional, default is NO).
     * @param {Number} year The year (optional, default is current year).
     *
     * @returns {Array} An array containing all dates within the specified calendar week.
     */
    getDatesOfCalendarWeek: function(calendarWeek, startWeekOnMonday, year) {
        year = year && !isNaN(year) ? year : (this.date ? this.format('yyyy') : M.Date.now().format('yyyy'));
        var newYear = M.Date.create('01/01/' + year);
        var newYearWeekDay = newYear.format('D');

        var firstWeek = null;
        if(startWeekOnMonday) {
            firstWeek = newYearWeekDay == 1 ? newYear : newYear.daysFromDate(8 - (newYearWeekDay == 0 ? 7 : newYearWeekDay));
        } else {
            firstWeek = newYearWeekDay == 0 ? newYear : newYear.daysFromDate(7 - newYearWeekDay);
        }

        calendarWeek = calendarWeek ? calendarWeek : this.getCalendarWeek();

        var requiredWeek = firstWeek.daysFromDate((calendarWeek - 1) * 7);

        var dates = [];
        for(var i = 0; i < 7; i++) {
            var date = requiredWeek.daysFromDate(i);
            date = M.Date.create(date.format('mm') + '/' + date.format('dd') + '/' + date.format('yyyy'));
            dates.push(date);
        }

        return dates;
    },

    /**
     * This method returns a date for a given calendar week and day of this week.
     *
     * @param {Number} calendarWeek The calendar week.
     * @param {Number} dayOfWeek The day of the week (0 = sunday, ..., 7 = saturday).
     * @param {Number} year The year (optional, default is current year).
     *
     * @returns {M.Date} The date.
     */
    getDateByWeekdayAndCalendarWeek: function(calendarWeek, dayOfWeek, year) {
        if(calendarWeek && !isNaN(calendarWeek) && ((dayOfWeek && !isNaN(dayOfWeek)) || dayOfWeek === 0)) {
            var dates = M.Date.getDatesOfCalendarWeek(calendarWeek, NO, year);
            if(dates && dates.length > 0 && dates[dayOfWeek]) {
                return dates[dayOfWeek];
            } else {
                M.Logger.log('Day ' + dayOfWeek + ' of calendar week ' + calendarWeek + ' could not be found!', M.ERR);
            }
        } else {
            M.Logger.log('Please pass a valid calendarWeek and a valid day of the week!', M.ERR);
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

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      03.05.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * @class
 *
 * M.DeviceSwitch defines a prototype for using device specific objects within
 * an application developed with The M-Project.
 *
 * @extends M.Object
 */
M.DeviceSwitch = M.Object.extend(
/** @scope M.DeviceSwitch.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DeviceSwitch',

    /**
     * The name of the current device.
     *
     * @type String
     */
    device: null,

    /**
     * This method returns the specialized string for the given key based on
     * the current device/environment.
     *
     * @param {String} key The key to the specialized string.
     * @returns {String} The specialized string based on the current device/environment.
     */
    s: function(key) {
        return this.specialize(key);
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
    specialize: function(key) {
        if(!this.device) {
            M.Logger.log('No device specified!', M.ERR);
            return null;
        }

        if(this[this.device] && this[this.device][key]) {
            return this[this.device][key];
        } else {
            M.Logger.log('Key \'' + key + '\' not defined for device \'' + this.device + '\'.', M.WARN);
            return null;
        }
    }

});

M.DS = M.DeviceSwitch;
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
M.PORTRAIT_TOP = 0;

/**
 * A constant value for inverse portrait orientation mode.
 *
 * @type String
 */
M.PORTRAIT_BOTTOM = 180;

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
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Environment',

    /**
     * This property contains a custom configuration of the awesome modernizr
     * library We currently only use this for detecting supported input types
     * of the browser.
     *
     * @private
     * @type Object
     */
    modernizr: {
        inputtypes: (function(props){var docElement=document.documentElement;var inputs={};var smile=":)";var inputElem=document.createElement("input");for(var i=0,bool,inputElemType,defaultView,len=props.length;i<len;i++){inputElem.setAttribute("type",inputElemType=props[i]);bool=inputElem.type!=="text";if(bool){inputElem.value=smile;inputElem.style.cssText="position:absolute;visibility:hidden;";if(/^range$/.test(inputElemType)&&inputElem.style.WebkitAppearance!==undefined){docElement.appendChild(inputElem);defaultView=document.defaultView;bool=defaultView.getComputedStyle&&defaultView.getComputedStyle(inputElem,null).WebkitAppearance!=="textfield"&&inputElem.offsetHeight!==0;docElement.removeChild(inputElem)}else if(/^(search|tel)$/.test(inputElemType)){}else if(/^(url|email)$/.test(inputElemType)){bool=inputElem.checkValidity&&inputElem.checkValidity()===false;}else if(/^color$/.test(inputElemType)){docElement.appendChild(inputElem);bool=inputElem.value!=smile;docElement.removeChild(inputElem)}else{bool=inputElem.value!=smile}}inputs[props[i]]=!!bool;}return inputs})("search tel url email datetime date month week time datetime-local number range color".split(" "))
    },

    /**
     * Checks the connection status by sending an ajax request
     * and waiting for the response to decide whether online or offline.
     *
     * The callback is called when the request returns successful or times out. The parameter to callback is a
     * string saying either offline or online.
     *
     * @param {Object} callback The object, consisting of target and action, defining the callback.
     * @param {String} url Optional. The request url. When not given, a request is made to http://www.google.de/images/logos/ps_logo2.png.
     */
    getConnectionStatus: function(callback, url){
        url = url ? url : 'http://www.google.de/images/logos/ps_logo2.png';
        var that = this;
        var image = M.ImageView.design({
            value: url,
            events: {
                load: {
                    action: function(id) {
                        var image = M.ViewManager.getViewById(id);
                        image.destroy();
                        if(callback && M.EventDispatcher.checkHandler(callback, 'online')){
                            that.bindToCaller(callback.target, callback.action, M.ONLINE)();
                        }
                    }
                },
                error: {
                    action: function(id) {
                        var image = M.ViewManager.getViewById(id);
                        image.destroy();
                        if(callback && M.EventDispatcher.checkHandler(callback, 'offline')){
                            that.bindToCaller(callback.target, callback.action, M.OFFLINE)();
                        }
                    }
                }
            }
        });
        $('body').append(image.render());
        image.registerEvents();
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
     * Returns the currently available width and height of the browser window
     * as an array:
     *
     * 0 -> width
     * 1 -> height
     *
     * @returns {Array} The width and height of the user's browser window.
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
     * Returns the total size of the page/document, means not only the area of the browser window.
     *
     * 0 -> width
     * 1 -> height
     *
     * @returns {Array} The width and height of the document.
     */
    getTotalSize: function() {
        return [this.getTotalWidth(), this.getTotalHeight()];
    },

    /**
     * Returns the total width of the page/document, means not only the area of the browser window.
     * Uses jQuery.
     *
     * @returns {Number} The total width of the document.
     */
    getTotalWidth: function() {
        return $(document).width();
    },

    /**
     * Returns the total height of the page/document, means not only the area of the browser window.
     * Uses jQuery.
     *
     * @returns {Number} The total height of the document.
     */
    getTotalHeight: function() {
        return $(document).height();
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
     * @return {Number|Boolean} The orientation type as a constant value. (If the orientation can not be detected: NO.)
     */
    getOrientation: function() {
        switch(window.orientation) {
            case 0:
                return M.PORTRAIT_TOP;
            case false:
                return M.PORTRAIT_BOTTOM;
            case 90:
                return M.LANDSCAPE_LEFT;
            case -90:
                return M.LANDSCAPE_RIGHT;
            default:
                M.Logger.log('This device does not support orientation detection.', M.WARN);
                return NO;
        }
    },

    /**
     * This method checks if the browser supports a certain input type specified with
     * HTML5. This check is based on Modernizr. For further information abbout the
     * input types, take a look at the W3C spec:
     * http://dev.w3.org/html5/spec/Overview.html#states-of-the-type-attribute
     *
     * @param {String} inputTye The HTML5 input type to be checked.
     * @return {Boolean} A flag telling you if the input type is supported or not.
     */
    supportsInputType: function(inputType) {
        if(this.modernizr.inputtypes && this.modernizr.inputtypes[inputType] === YES) {
            return YES;
        }
        return NO;
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
 * M.I18N defines a prototype for internationalisation and localisation within
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
     * @param {Object} context An object containing value parts for the translated string
     * @returns {String} The localized string based on the current application language.
     */
    l: function(key, context) {
        return this.localize(key, context);
    },

    /**
     * This method returns the localized string for the given key based on
     * the current language. It is internally used as a wrapper for l() for
     * a better readability.
     *
     * @private
     * @param {String} key The key to the localized string.
     * @param {Object} context An object containing value parts for the translated string
     * @returns {String} The localized string based on the current application language.
     */
    localize: function(key, context) {
        var translation;
        if(!M.Application.currentLanguage) {
            M.Application.currentLanguage = this.getLanguage();
        }
        if(this[M.Application.currentLanguage] && this[M.Application.currentLanguage][key]) {
            translation = this[M.Application.currentLanguage][key];
        } else if(this[M.Application.defaultLanguage] && this[M.Application.defaultLanguage][key]) {
            M.Logger.log('Key \'' + key + '\' not defined for language \'' + M.Application.currentLanguage + '\', switched to default language \'' + M.Application.defaultLanguage + '\'', M.WARN);
            translation = this[M.Application.defaultLanguage][key];
        }  else if(this[this.defaultLanguage] && this[this.defaultLanguage][key]) {
            M.Logger.log('Key \'' + key + '\' not defined for language \'' + M.Application.currentLanguage + '\', switched to system\'s default language \'' + this.defaultLanguage + '\'', M.WARN);
            translation = this[this.defaultLanguage][key];
        } else {
            M.Logger.log('Key \'' + key + '\' not defined for both language \'' + M.Application.currentLanguage + '\' and the system\'s default language \'' + this.defaultLanguage + '\'', M.WARN);
            return null;
        }
        if(context) {
            try {
                translation = _.template(translation, context);
            } catch(e) {
                M.Logger.log('Error in I18N: Check your context object and the translation string with key "'+ key + '". Error Message: ' + e, M.ERR);
            }
        }
        return translation;
    },

    /**
     * This method sets the applications current language and forces it to reload.
     *
     * @param {String} language The language to be set.
     */
    setLanguage: function(language) {
        if(!this.isLanguageAvailable(language)) {
            M.Logger.log('There is no language \'' + language + '\' specified (using default language \'' + this.defaultLanguage + '\' instead!', M.WARN);
            this.setLanguage(this.defaultLanguage);
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
            } else {
                return this.defaultLanguage;
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

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      24.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * @class
 *
 * M.Location defines a prototype for a location object. It is mainly used by
 * the M.LocationManager and contains properties like latitude and longitude,
 * that specify the retrieved location.
 *
 * @extends M.Object
 */
M.Location = M.Object.extend(
/** @scope M.Location.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Location',

    /**
     * The latitude of this location.
     *
     * @type Number
     */
    latitude: null,

    /**
     * The longitude of this location.
     *
     * @type Number
     */
    longitude: null,

    /**
     * The date this location was retrieved.
     *
     * @type M.Date
     */
    date: null,

    /**
     * This property specifies the location's accuracy in meters.
     *
     * @type Number
     */
    accuracy: null,

    /**
     * This property contains a reference to the object, that called the
     * update() of this location. This reference is needed for calling back
     * to the defined success and error callbacks.
     *
     * @private
     * @type Object
     */
    caller: null,

    /**
     * This method contains a reference to the specified success callback
     * method.
     *
     * @type Function
     */
    onUpdateSuccess: null,

    /**
     * This method contains a reference to the specified error callback
     * method.
     *
     * @type Function
     */
    onUpdateError: null,

    /**
     * This method initializes an M.Location object with the passed latitude
     * and longitude parameters. This method can be used to manually create
     * an M.Location object if the position is already known.
     *
     * To create an M.Location object with the user's current position, you
     * will have to use the M.LocationManager, respectively its getLocation()
     * method.
     *
     * Nevertheless you can use this method to initialiy create an M.Location
     * object with a specified location and then later use its update() method
     * to retrieve the real and current location of the user / device.
     *
     * @param {Number} latitude The latitude of the location.
     * @param {Number} longitude The longitude of the location.
     */
    init: function(latitude, longitude) {
        return this.extend({
            latitude: latitude,
            longitude: longitude
        });
    },

    /**
     * This method is used to automatically update the location. Since this
     * is an asyncrhonous process, you have to specify two callback methods
     * in case of success or error. additionally you can pass along options
     * to configure the retrieving process.
     *
     * For further information about the parameters, check out getLocation()
     * in M.LocationManager since this method is called out of update().
     *
     * If the update was successful, the properties of the location object
     * are updated and your specified callback is called (without parameter).
     *
     * If the update goes wrong, your specified error callback is called with
     * the error message as its only parameter. The error message will be one
     * of the following constant string values:
     *   - PERMISSION_DENIED
     *   - POSITION_UNAVAILABLE
     *   - TIMEOUT
     *   - UNKNOWN_ERROR
     *   - NOT_SUPPORTED
     *
     * @param {Object} caller The object, calling this function.
     * @param {Object} onSuccess The success callback.
     * @param {Object} onError The error callback.
     * @param {Object} options The options for retrieving a location.
     */
    update: function(caller, onSuccess, onError, options) {
        this.caller = caller;
        this.onUpdateSuccess = onSuccess;
        this.onUpdateError = onError;
        
        M.LocationManager.getLocation(this, this.onUpdateSuccessInternal, this.onUpdateErrorInternal, options);
    },

    /**
     * This method is called automatically as the success callback of the
     * update(). After updating this location object, the external success
     * callback is called.
     *
     * @param {Object} position The position object of the Geolocation API.
     */
    onUpdateSuccessInternal: function(position) {
        if(position && position.coords) {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.date = M.Date.now();

            if(this.caller) {
                if(this.onUpdateSuccess) {
                    this.bindToCaller(this.caller, this.onUpdateSuccess)();
                } else {
                    M.Logger.log('No success callback specified for update() of M.Location.', M.INFO);
                }
            } else {
                M.Logger.log('No caller specified for update() of M.Location.', M.WARN);
            }
        } else {
            M.Logger.log('An internal error occured while retrieving the position.', M.ERR);
        }
    },

    /**
     * This method is called automatically as the error callback of the
     * update(). After updating this location object, the external error
     * callback is called.
     *
     * @param {Object} position The error that occurred.
     */
    onUpdateErrorInternal: function(error) {
        if(this.caller) {
            if(this.onUpdateError) {
                this.bindToCaller(this.caller, this.onUpdateError, error)();
            } else {
                M.Logger.log('No error callback specified for update() of M.Location.', M.INFO);
            }
        } else {
            M.Logger.log('No caller specified for update() of M.Location.', M.WARN);
        }
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Frank
// Date:      04.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * @class
 *
 * The string builder is a utility object to join multiple strings to one single string.
 *
 * @extends M.Object
 */
M.StringBuilder = M.Object.extend(
/** @scope M.StringBuilder.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.StringBuilder',

    /**
     * An array containing all strings used within this string builder.
     *
     * @type Array
     */
    strings: null,

    /**
     * This method appends the given string, 'value', to its internal list of strings. With
     * an additional parameter 'count', you can force this method to add the string multiple
     * times.
     *
     * @param {String} value The value of the string to be added.
     * @param {Number} count The number to specify how many times the string will be added.
     * @returns {Boolean} The result of this operation: success/YES, error/NO.
     */
    append: function (value, count) {
        count = typeof(count) === 'number' ? count : 1;
        if (value) {
            for(var i = 1; i <= count; i++) {
                this.strings.push(value);
            }
            return YES;
        }
    },

    /**
     * This method clears the string builders internal string list.
     */
    clear: function () {
        this.strings.length = 0;
    },

    /**
     * This method returns a single string, consisting of all previously appended strings. They
     * are concatenated in the order they were appended to the string builder.
     *
     * @returns {String} The concatenated string of all appended strings.
     */
    toString: function () {
        return this.strings.join("");
    },

    /**
     * This method creates a new string builder instance.
     *
     * @param {String} str The initial string for this string builder.
     */
    create: function(str) {
        var stringBuilder = this.extend({
            strings: []
        });
        stringBuilder.append(str);
        
        return stringBuilder;
    }
    
});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

// Returns a unique identifier

m_require('core/foundation/object.js');

M.UniqueId = M.Object.extend({
    uuid: function(len, radix) {
        // based on Robert Kieffer's randomUUID.js at http://www.broofa.com
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [];
        //len = len ? len : 32; 
        radix = radix || chars.length;
        var i;

        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    }
});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/request.js');

/**
 * A constant value for logging level: info.
 *
 * @type Number
 */
M.INFO = 0;

/**
 * A constant value for logging level: debug.
 *
 * @type Number
 */
M.DEBUG = 1;

/**
 * A constant value for logging level: warning.
 *
 * @type Number
 */
M.WARN = 2;

/**
 * A constant value for logging level: error.
 *
 * @type Number
 */
M.ERR = 3;

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

        /* are we in production mode, then do not throw any logs */
        if(M.Application.getConfig('debugMode') === 'false') {
            return;
        }

        /* Prevent a console.log from blowing things up if we are on a browser that doesn't support this. */
        if (typeof console === 'undefined') {
            window.console = {} ;
            console.log = console.info = console.warn = console.error = function(){};
        }
        
        switch (level) {
            case M.DEBUG:
                this.debug(msg);
                break;
            case M.ERR:
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

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      24.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/location.js');

/**
 * A constant value for permisson denied error.
 *
 * @type String
 */
M.LOCATION_PERMISSION_DENIED = 'PERMISSION_DENIED';

/**
 * A constant value for position unavailable error.
 *
 * @type String
 */
M.LOCATION_POSITION_UNAVAILABLE = 'POSITION_UNAVAILABLE';

/**
 * A constant value for timeout error.
 *
 * @type String
 */
M.LOCATION_TIMEOUT = 'TIMEOUT';

/**
 * A constant value for unknown error.
 *
 * @type String
 */
M.LOCATION_UNKNOWN_ERROR = 'UNKNOWN_ERROR';

/**
 * A constant value for not supported error.
 *
 * @type String
 */
M.LOCATION_NOT_SUPPORTED = 'NOT_SUPPORTED';

/**
 * A constant value for already receiving error.
 *
 * @type String
 */
M.LOCATION_ALREADY_RECEIVING = 'ALREADY_RECEIVING';

/**
 * A constant value for location type: approximate.
 *
 * @type Number
 */
M.LOCATION_TYPE_APPROXIMATE = 0;

/**
 * A constant value for location type: geometric center.
 *
 * @type Number
 */
M.LOCATION_TYPE_GEOMETRIC_CENTER = 1;

/**
 * A constant value for location type: range interpolated.
 *
 * @type Number
 */
M.LOCATION_TYPE_RANGE_INTERPOLATED = 2;

/**
 * A constant value for location type: rooftop.
 *
 * @type Number
 */
M.LOCATION_TYPE_ROOFTOP = 3;

/**
 * A constant value for connection error of the google geocoder.
 *
 * @type String
 */
M.LOCATION_GEOCODER_ERROR = 'ERROR';

/**
 * A constant value for an invalid request of the google geocoder.
 *
 * @type String
 */
M.LOCATION_GEOCODER_INVALID_REQUEST = 'INVALID_REQUEST';

/**
 * A constant value for an error due to too many requests to the google geocoder service.
 *
 * @type String
 */
M.LOCATION_GEOCODER_OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT';

/**
 * A constant value for a denied request of the google geocoder.
 *
 * @type String
 */
M.LOCATION_GEOCODER_REQUEST_DENIED = 'REQUEST_DENIED';

/**
 * A constant value for an unknown error of the google geocoder.
 *
 * @type String
 */
M.LOCATION_GEOCODER_UNKNOWN_ERROR = 'UNKNOWN_ERROR';

/**
 * A constant value for no results of the google geocoder.
 *
 * @type String
 */
M.LOCATION_GEOCODER_ZERO_RESULTS = 'ZERO_RESULTS';

/**
 * @class
 *
 * M.LocationManager defines a prototype for managing the user's respectively the
 * device's location, based on the HTML 5 Geolocation API. The M.LocationManager
 * provides machanism to retrieve, manage and update a location.
  *
 * @extends M.Object
 */
M.LocationManager = M.Object.extend(
/** @scope M.LocationManager.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.LocationManager',

    /**
     * This property contains the date, as an M.Date object, of the last geolocation
     * call. It is needed internally to interpret the timeout.
     *
     * @type M.Date
     */
    lastLocationUpdate: null,

    /**
     * This property contains a reference to google maps geocoder class. It is used
     * in combination with the getLocationByAddress() method. 
     *
     * @type Object
     */
    geoCoder: null,

    /**
     * This property specifies whether the M.LocationManager is currently trying to
     * get a position or not.
     *
     * @type Boolean
     */
    isGettingLocation: NO,

    /**
     * This method is used for retrieving the current location.
     *
     * The first two parameters define the success and error callbacks. They are
     * called once the location was retrieved successfully (success callback) or
     * if it failed (error callback).
     *
     * The success callback will be called with an M.Location object containing
     * all the information about the location that was retrieved.
     *
     * The error callback will be called with one of the following constant
     * string values:
     *   - PERMISSION_DENIED
     *   - POSITION_UNAVAILABLE
     *   - TIMEOUT
     *   - UNKNOWN_ERROR
     *   - NOT_SUPPORTED
     *
     * The third parameter, options, can be used to define some parameters for
     * retrieving the location. These are based on the HTML5 Geolocation API but
     * extend it:
     *
     *   http://dev.w3.org/geo/api/spec-source.html#position_options_interface
     *
     * A valid options parameter could look like:
     * 
     *   {
     *     enableHighAccuracy: YES,
     *     maximumAge: 600000,
     *     timeout: 0,
     *     accuracy: 100
     *   }
     *
     * If you do not specify any options, the following default values are taken:
     *
     *   enableHighAccuracy = NO --> turned off, due to better performance
     *   maximumAge = 0 --> always retrieve a new location
     *   timeout = 5000 --> 5 seconds until timeout error
     *   accuracy = 50 --> 50 meters accuracy
     *
     * @param {Object} caller The object, calling this function. 
     * @param {Object} onSuccess The success callback.
     * @param {Object} onError The error callback.
     * @param {Object} options The options for retrieving a location.
     */
    getLocation: function(caller, onSuccess, onError, options) {
        if(this.isGettingLocation) {
            M.Logger.log('M.LocationManager is currently already trying to retrieve a location.', M.WARN);
            this.bindToCaller(caller, onError, M.LOCATION_ALREADY_RECEIVING)();
        } else {
            this.isGettingLocation = YES; 
        }

        var that = this;

        this.lastLocationUpdate = M.Date.now();

        options = options ? options : {};
        options.enableHighAccuracy = options.enableHighAccuracy ? options.enableHighAccuracy : NO;
        options.maximumAge = options.maximumAge ? options.maximumAge : 0;
        options.timeout = options.timeout ? options.timeout : 3000;

        if(navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    that.isGettingLocation = NO;
                    if(!options.accuracy || (options.accuracy && position.coords.accuracy <= options.accuracy)) {
                        var location = M.Location.extend({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                            date: M.Date.now()
                        });
                        that.bindToCaller(caller, onSuccess, location)();
                    } else {
                        M.Logger.log('Location retrieved, but accuracy too low: ' + position.coords.accuracy, M.INFO);
                        
                        var now = M.Date.now();
                        options.timeout = options.timeout - that.lastLocationUpdate.timeBetween(now);
                        that.getLocation(caller, onSuccess, onError, options);
                    }
                },
                function(error) {
                    that.isGettingLocation = NO;
                    switch (error.code) {
                        case 1:
                            that.bindToCaller(caller, onError, M.LOCATION_PERMISSION_DENIED)();
                            break;
                        case 2:
                            that.bindToCaller(caller, onError, M.LOCATION_POSITION_UNAVAILABLE)();
                            break;
                        case 3:
                            that.bindToCaller(caller, onError, M.LOCATION_TIMEOUT)();
                            break;
                        default:
                            that.bindToCaller(caller, onError, M.LOCATION_UNKNOWN_ERROR)();
                            break;
                    }
                },
                options
            );
        } else {
            that.bindToCaller(that, onError, M.LOCATION_NOT_SUPPORTED)();
        }
    },

    /**
     * This method tries to transform a given address into an M.Location object.
     * This method is based on the google maps api, respectively on its geocoder
     * class.
     *
     * If a valid location could be found matching the given address parameter,
     * the success callback is called with a valid M.Location object as its
     * only parameter, containing the information about this location.
     *
     * If no location could be retrieved, the error callback is called, with the
     * error message as its only parameter. Possible values for this error message
     * are the following:
     *
     *   - M.LOCATION_GEOCODER_ERROR
     *
     *   - M.LOCATION_GEOCODER_INVALID_REQUEST
     *
     *   - M.LOCATION_GEOCODER_OVER_QUERY_LIMIT
     *
     *   - M.LOCATION_GEOCODER_REQUEST_DENIED
     *
     *   - M.LOCATION_GEOCODER_UNKNOWN_ERROR
     *
     *   - M.LOCATION_GEOCODER_ZERO_RESULTS
     *
     * @param {Object} caller The object, calling this function.
     * @param {Function} onSuccess The method to be called after retrieving the location.
     * @param {Function} onError The method to be called if retrieving the location went wrong.
     * @param {String} address The address to be transformed into an M.Location object.
     */
    getLocationByAddress: function(caller, onSuccess, onError, address) {
        if(address && typeof(address) === 'string') {
            if(!this.geoCoder) {
                this.geoCoder = new google.maps.Geocoder();
            }

            var that = this;

            this.geoCoder.geocode({
                address: address,
                language: M.I18N.getLanguage().substr(0, 2),
                region: M.I18N.getLanguage().substr(3, 2)
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var bestResult = null;
                    _.each(results, function(result) {
                        if(!bestResult || M['LOCATION_TYPE_' + bestResult.geometry.location_type] < M['LOCATION_TYPE_' + result.geometry.location_type]) {
                            bestResult = result;
                        }
                    })
                    if(bestResult) {
                        that.bindToCaller(caller, onSuccess, M.Location.init(bestResult.geometry.location.lat(), bestResult.geometry.location.lng()))();
                    }
                } else {
                    switch (status) {
                        case 'ERROR':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_ERROR)();
                            break;
                        case 'INVALID_REQUEST':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_INVALID_REQUEST)();
                            break;
                        case 'OVER_QUERY_LIMIT':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_OVER_QUERY_LIMIT)();
                            break;
                        case 'REQUEST_DENIED':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_REQUEST_DENIED)();
                            break;
                        case 'ZERO_RESULTS':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_ZERO_RESULTS)();
                            break;
                        default:
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_UNKNOWN_ERROR)();
                            break;
                    }
                }
            });
        }
    },

    /**
     * This method tries to transform a given location as an M.Location object into
     * a valid address. This method is based on the google maps api, respectively
     * on its geocoder class.
     *
     * If a valid address could be found matching the given location parameter,
     * the success callback is called with a valid address string as its only
     * parameter.
     *
     * Note: If you set the getAddressAsComponents parameter to YES, the address
     * will be passed to the success callback as an object containing the address'
     * components. Use this option if you want to put the address together manually.
     *
     * If no address could be retrieved, the error callback is called, with the
     * error message as its only parameter. Possible values for this error message
     * are the following:
     *
     *   - M.LOCATION_GEOCODER_ERROR
     *
     *   - M.LOCATION_GEOCODER_INVALID_REQUEST
     *
     *   - M.LOCATION_GEOCODER_OVER_QUERY_LIMIT
     *
     *   - M.LOCATION_GEOCODER_REQUEST_DENIED
     *
     *   - M.LOCATION_GEOCODER_UNKNOWN_ERROR
     *
     *   - M.LOCATION_GEOCODER_ZERO_RESULTS
     *
     * @param {Object} caller The object, calling this function.
     * @param {Function} onSuccess The method to be called after retrieving the address.
     * @param {Function} onError The method to be called if retrieving the address went wrong.
     * @param {M.Location} location The location to be transformed into an address.
     * @param {Boolean} getAddressAsComponents Return the address as an object containing the components.
     */
    getAddressByLocation: function(caller, onSuccess, onError, location, getAddressAsComponents) {
        if(location && typeof(location) === 'object' && location.type === 'M.Location') {
            if(!this.geoCoder) {
                this.geoCoder = new google.maps.Geocoder();
            }

            var that = this;

            this.geoCoder.geocode({
                location: new google.maps.LatLng(location.latitude, location.longitude),
                language: M.I18N.getLanguage().substr(0, 2),
                region: M.I18N.getLanguage().substr(3, 2)
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if(results[0] && getAddressAsComponents) {
                        var components = {};
                        _.each(results[0].address_components, function(component) {
                            _.each(component.types, function(type) {
                                components[type] = component['long_name'] ? component['long_name'] : component['short_name']
                            });
                        });
                        that.bindToCaller(caller, onSuccess, components)();
                    } else if(results[0]) {
                        that.bindToCaller(caller, onSuccess, results[0].formatted_address)();
                    } else {
                        that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_ZERO_RESULTS)();
                    }
                } else {
                    switch (status) {
                        case 'ERROR':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_ERROR)();
                            break;
                        case 'INVALID_REQUEST':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_INVALID_REQUEST)();
                            break;
                        case 'OVER_QUERY_LIMIT':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_OVER_QUERY_LIMIT)();
                            break;
                        case 'REQUEST_DENIED':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_REQUEST_DENIED)();
                            break;
                        case 'ZERO_RESULTS':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_ZERO_RESULTS)();
                            break;
                        default:
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_UNKNOWN_ERROR)();
                            break;
                    }
                }
            });
        }
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.07.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/logger.js');

/**
 * @class
 *
 * A data consumer can be called a read-only data provider. It's only job is it to retrieve some data form
 * remote services, e.g. a webservice, and to push them into the store.
 *
 * Note: So far we only support data in JSON format!
 *
 * @extends M.Object
 */
M.DataConsumer = M.Object.extend(
/** @scope M.DataConsumer.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DataConsumer',

    /**
     * This property can be used to specify the path to the desired data within
     * the response. Simply name the path by concatenating the path parts with
     * a '.', e.g.: 'path.to.my.desired.response'.
     *
     * @type String
     */
    responsePath: null,

    /**
     * This property specifies the used http method for the request. By default
     * GET is used.
     *
     * @type String
     */
    httpMethod: 'GET',

    /**
     * This property can be used to specify whether or not to append any fetched
     * data sets to the existing records. If set to NO, the model's records are
     * removed whenever the find() method is called.
     *
     * @type Boolean
     */
    appendRecords: YES,

    /**
     * The urlParams property will be pushed to the url() method of your data
     * consumer. This should look like:
     *
     *   url: function(query, rpp) {
     *     return 'http://www.myserver.com/request?query=' + query + '&rpp=' + rpp
     *   }
     *
     * @type String
     */
    urlParams: null,

    /**
     * Use this method within your model to configure the data consumer. Set
     * resp. override all the default object's properties, e.g.:
     *
     *   {
     *     urlParams: {
     *       query: 'html5',
     *       rpp: 10
     *     },
     *     appendRecords: YES,
     *     callbacks: {
     *       success: {
     *         target: MyApp.MyController,
     *         action: 'itWorked'
     *       },
     *       error: {
     *         action: function(e) {
     *           console.log(e);
     *         }
     *       }
     *     },
     *     map: function(obj) {
     *       return {
     *         userName: obj.from_user,
     *         userImage: obj.profile_image_url,
     *         createdAt: obj.created_at,
     *         tweet: obj.text
     *       };
     *     }
     *   }
     *
     * @param {Object} obj The configuration parameters for the data consumer.
     */
    configure: function(obj) {
        return this.extend(obj);
    },

    /**
     * This method is automatically called by the model, if you call the model's
     * find(). To execute the data consuming processs imply pass along an object
     * specifying the call's parameters as follows:
     *
     * {
     *   urlParams: {
     *     query: 'html5',
     *     rpp: 10
     *   }
     * }
     *
     * These parameters will automatically be added to the url, using the
     * url() method of your data consumer.
     *
     * Depending on the success/failure of the call, the specified success
     * resp. error callback will be called.
     *
     * @param {Object} obj The options for the call.
     */
    find: function(obj) {
        this.include(obj);

        var that = this;
        M.Request.init({
            url: this.bindToCaller(this, this.url, _.toArray(this.urlParams))(),
            isJSON: YES,
            callbacks: {
                success: {
                    target: this,
                    action: function(data, message, request){
                        /* if no data was returned, skip this */
                        if(data) {
                            /* apply response path */
                            if(this.responsePath) {
                                var responsePath = this.responsePath.split('.');
                                _.each(responsePath, function(subPath) {
                                    data = data[subPath];
                                });
                            }

                            /* if no data was found inside responsePath, skip */
                            if(data && !_.isArray(data) || _.isArray(data) && data.length > 0) {
                                /* make sure we've got an array */
                                if(!_.isArray(data)) {
                                    data = [data];
                                }

                                /* apply map function and create a record for all data sets */
                                var records = [];
                                _.each(data, function(d) {
                                    var record = obj.model.createRecord(that.map(d));
                                    records.push(record);
                                });

                                /* call callback */
                                if(this.callbacks && M.EventDispatcher.checkHandler(this.callbacks['success'])) {
                                    M.EventDispatcher.callHandler(this.callbacks['success'], null, NO, [records]);
                                }
                            } else {
                                /* log message, that there were no data sets found in given response path */
                                M.Logger.log('There were no data sets found in response path \'' + this.responsePath + '\'.', M.INFO);

                                /* call callback */
                                if(this.callbacks && M.EventDispatcher.checkHandler(this.callbacks['success'])) {
                                    M.EventDispatcher.callHandler(this.callbacks['success'], null, NO, [[]]);
                                }
                            }
                        } else {
                            /* log message, this there were no data sets returned */
                            M.Logger.log('There was no data returned for url \'' + this.bindToCaller(this, this.url, _.toArray(this.urlParams))() + '\'.', M.INFO);

                            /* call callback */
                            if(this.callbacks && M.EventDispatcher.checkHandler(this.callbacks['success'])) {
                                M.EventDispatcher.callHandler(this.callbacks['success'], null, NO, [[]]);
                            }
                        }
                    }
                },
                error: {
                    target: this,
                    action: function(request, message){
                        /* call callback */
                        if(this.callbacks && M.EventDispatcher.checkHandler(this.callbacks['error'])) {
                            M.EventDispatcher.callHandler(this.callbacks['error'], null, NO, message);
                        }
                    }
                }
            }
        }).send();
    },

    /**
     * Override this method within the data consumer's configuration, to map
     * the response object to your model's properties as follows:
     *
     *   map: function(obj) {
     *       return {
     *           userName: obj.from_user,
     *           userImage: obj.profile_image_url,
     *           createdAt: obj.created_at,
     *           tweet: obj.text
     *       };
     *   }
     *
     * @param {Object} obj The response object.
     * @interface
     */
    map: function(obj) {
        // needs to be implemented by concrete data consumer object
    },

    /**
     * Override this method within the data consumer's configuration, to tell
     * the component which url to connect to and with which parameters as
     * follows:
     *
     *   url: function(query, rpp) {
     *     return 'http://www.myserver.com/request?query=' + query + '&rpp=' + rpp
     *   }
     *
     * The parameters passed to this method are defined by the configuration
     * of your data consumer. See the urlParams property for further information
     * about that.
     *
     * @interface
     */
    url: function() {
        // needs to be implemented by concrete data consumer object
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      25.02.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

M.TARGET_REMOTE = 'remote';
M.TARGET_LOCAL = 'local';
M.TARGET_BOTH = 'both';

M.PRIO_REMOTE = 'prio_remote';
M.PRIO_LOCAL = 'prio_local';
M.PRIO_BOTH = 'prio_both';


m_require('core/utility/logger.js');

/**
 * @class
 *
 * 
 *
 * @extends M.Object
 */
M.DataProviderHybrid = M.Object.extend(
/** @scope M.DataProviderHybrid.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DataProviderHybrid',

    /**
     * Indicates whether data provider operates asynchronously or not.
     *
     * @type Boolean
     */
    isAsync: YES,

    /**
     *
     * @type Object
     */
    localProvider: null,

    /**
     *
     * @type Object
     */
    remoteProvider: null,

    /**
     * Defines the operation type: 1 for 'remote' or 'local', 2 for 'both'
     * @type Number
     */
    usedProviders: 0,

    callbackCounter: 0,

    onSuccess: null,

    onError: null,

    callbacks: {
        success: {
            local: null,
            remote: null
        },
        error: {
            local: null,
            remote: null
        }
    },

    /**
     * 
     * @type Object
     */
    config: null,

    configure: function(obj) {
        var dp = this.extend({
            config:obj
        });
        if(!dp.config.local) {
            throw M.Error.extend({
                code: M.ERR_MODEL_PROVIDER_NOT_SET,
                msg: 'No local data provider passed'
            });
        }
        if(!dp.config.remote) {
            throw M.Error.extend({
                code: M.ERR_MODEL_PROVIDER_NOT_SET,
                msg: 'No remote data provider passed'
            });
        }
        dp.localProvider = dp.config.local;
        dp.remoteProvider = dp.config.remote;

        // maybe some value checking before
        return dp;
    },

    /**
     *
     */
    find: function(obj) {
        this.crud(obj, 'find');
    },

    /**
     * 
     */
    save: function(obj) {
        this.crud(obj, 'save');
    },

    /**
     *
     */
    del: function(obj) {
        this.crud(obj, 'del');
    },


    /**
     *
     * @param {Obj} obj The param obj
     * @param {String} op The operation to be performed on the actual data provider
     */
    crud: function(obj, op) {

        obj.target = obj.target || M.TARGET_BOTH;

        if(!obj.prio) {
            if(obj.target === M.TARGET_BOTH) {
                obj.prio = M.PRIO_BOTH;
            } else {
                if(obj.target === M.TARGET_LOCAL) {
                    obj.prio = M.PRIO_LOCAL;
                } else if(obj.target === M.PRIO_REMOTE) {
                    obj.prio = M.PRIO_REMOTE;
                }
            }
        }

        this.callbackCounter = 0;
        this.setOriginCallbacks(obj);
        /* set intermediate callbacks for data provider call */
        this.setIntermediateCallbacks(obj);

        switch(obj.target) {

            case M.TARGET_LOCAL:
                this.usedProviders = 1;
                this.localProvider[op](obj);
                break;

            case M.TARGET_REMOTE:
                this.usedProviders = 1;
                this.remoteProvider[op](obj);
                break;

            case M.TARGET_BOTH:
                this.usedProviders = 2;
                this.localProvider[op](obj);
                this.remoteProvider[op](obj);
                break;
        }
    },
    
    setOriginCallbacks: function(obj) {
        if (obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
            obj.onSuccess = this.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action]);
            this.onSuccess = obj.onSuccess;
        } else if(obj.onSuccess === 'function') {
            this.onSuccess = obj.onSuccess;
        }

        if (obj.onError && obj.onError.target && obj.onError.action) {
            obj.onError = this.bindToCaller(obj.onError.target, obj.onError.target[obj.onSuccess.action]);
            this.onError = obj.onError;
        } else if(obj.onError === 'function') {
            this.onError = obj.onError;
        }
    },

    setIntermediateCallbacks: function(obj) {
        obj.onSuccess = {
            target: this,
            action: 'handleSuccessCallback'
        };
        obj.onError = {
            target: this,
            action: 'handleErrorCallback'
        };
    },

    handleSuccessCallback: function(res, obj, dp) {

        if(dp.type === this.localProvider.type) {
            this.callbacks.success.local = {result: res, param: obj, dataProvider:dp};
        } else if(dp.type === this.remoteProvider.type) {
            this.callbacks.success.remote = {result: res, param: obj, dataProvider:dp};
        }

        this.callbackCounter = this.callbackCounter + 1;

        if(this.callbackCounter === this.usedProviders) {
            this.calculateOperationState();
        }
    },

    handleErrorCallback: function(err, obj, dp) {
 
        if(dp.type === this.localProvider.type) {
            this.callbacks.error.local = {err: err, param: obj, dataProvider:dp};
        } else if(dp.type === this.remoteProvider.type) {
            this.callbacks.error.remote = {err: err, param: obj, dataProvider:dp};

            // TODO: put into remote data providers
            obj.model.state_remote = M.STATE_FAIL;
        }

        this.callbackCounter = this.callbackCounter + 1;

        /* if this is the last callback */
        if(this.callbackCounter === this.usedProviders) {
            this.calculateOperationState();
        }
    },
    
    calculateOperationState: function(obj) {
        switch(obj.prio) {
            case M.PRIO_LOCAL:
                if(!this.callbacks.success.local) {
                    this.onError(this.error.local.err, obj);
                } else {
                    this.onSuccess(this.success.local.result, obj);
                }
            case M.PRIO_REMOTE:
                if(!this.callbacks.error.local) {
                    this.onError(this.error.remote.err, obj);
                } else {
                    this.onSuccess(this.success.remote.result, obj);
                }
            case M.PRIO_BOTH:
                /* if one of the callback failed */
                if(!this.callbacks.success.local || !this.callbacks.success.remote) {
                    /* return remote error */
                    this.onError(this.error.remote.err, obj);
                } else {  /* if both callbacks have been success callbacks */
                    this.onSuccess(this.success.remote.result, obj);
                }
            break;
        }
    }
});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
};
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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



});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      11.02.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================


m_require('core/utility/logger.js');

/**
 * @class
 *
 * The root object for Error objects
 *
 * M.Error encapsulates errors in The-M-Project.
 * Should be passed to error callbacks.
 *
 * 0-99:    general errors
 *
 * 100-199: Model and Validation errors
 *
 * 200-299:   WebSQL errors
 *
 * 300-400:   CouchDB errors
 *
 *
 * Constant                             Code    Situation
 * --------                             ----    ---------
 * M.ERR_UNDEFINED                      0       The reason for the error could not be clarified.
 * M.ERR_CONNECTION                     1       A connection to an external service could not be established
 *
 * M.ERR_VALIDATION_PRESENCE            100     A model record failed validation due to a property is not set but required to be.
 * M.ERR_VALIDATION_URL                 101     A model record failed validation due to a property does not represent a valid URL but is required to do so.
 * M.ERR_VALIDATION_PHONE               102     A model record failed validation due to a property does not represent a phone number but is required to do so.
 * M.ERR_VALIDATION_NUMBER              103     A model record failed validation due to a property is not of type number or represents a number but is required to do so.
 * M.ERR_VALIDATION_NOTMINUS            104     A model record failed validation due to a property contains a minus value but it is required to do not.
 * M.ERR_VALIDATION_EMAIL               105     A model record failed validation due to a property does not represent a valid eMail but is required to do so.
 * M.ERR_VALIDATION_DATE                106     A model record failed validation due to a property does not represent a valid date but is required to do so.
 *
 * M.ERR_MODEL_PROVIDER_NOT_SET         120     A data provider has not been set.
 *
 * M.ERR_WEBSQL_UNKNOWN                 200     The transaction failed for reasons unrelated to the database itself and not covered by any other error code.
 * M.ERR_WEBSQL_DATABASE                201     The statement failed for database reasons not covered by any other error code.
 * M.ERR_WEBSQL_VERSION                 202     The operation failed because the actual database version was not what it should be. For example, a statement found that the actual database version no longer matched the expected version of the Database or DatabaseSync object, or the Database.changeVersion() or DatabaseSync.changeVersion() methods were passed a version that doesn't match the actual database version.
 * M.ERR_WEBSQL_TOO_LARGE               203     The statement failed because the data returned from the database was too large. The SQL "LIMIT" modifier might be useful to reduce the size of the result set.
 * M.ERR_WEBSQL_QUOTA                   204     The statement failed because there was not enough remaining storage space, or the storage quota was reached and the user declined to give more space to the database.
 * M.ERR_WEBSQL_SYNTAX                  205     The statement failed because of a syntax error, or the number of arguments did not match the number of ? placeholders in the statement, or the statement tried to use a statement that is not allowed, such as BEGIN, COMMIT, or ROLLBACK, or the statement tried to use a verb that could modify the database but the transaction was read-only.
 * M.ERR_WEBSQL_CONSTRAINT              206     An INSERT, UPDATE, or REPLACE statement failed due to a constraint failure. For example, because a row was being inserted and the value given for the primary key column duplicated the value of an existing row.
 * M.ERR_WEBSQL_TIMEOUT                 207     A lock for the transaction could not be obtained in a reasonable time.
 * M.ERR_WEBSQL_PROVIDER_NO_DBHANDLER   208     No DBHandler, initialization did not take place or failed.
 * M.ERR_WEBSQL_BULK_NO_RECORDS         210     No Records given for bulk transaction
 *
 * M.ERR_COUCHDB_CONFLICT               300     A conflict occured while saving a document in CouchDB, propably caused by duplicate IDs
 * M.ERR_COUCHDB_DBNOTFOUND             301     The provided database could not be found.
 * M.ERR_COUCHDB_DBEXISTS               302     The db already exists and therefor cannot be created again.
 * M.ERR_COUCHDB_DOCNOTFOUND            303     No document was found for the provided ID in the database.
 *
 *
 *
 *
 * @extends M.Object
*/


/**
 * A constant value for an undefined error.
 *
 * @type Number
 */
M.ERR_UNDEFINED = 0;

/**
 * A constant value for an error occuring when a connection to an external service could not be established.
 *
 * @type Number
 */
M.ERR_CONNECTION = 1;

/**
 * A model record failed validation due to a property is not set but required to be.
 *
 * @type Number
 */
M.ERR_VALIDATION_PRESENCE = 100;

/**
 * A model record failed validation due to a property does not represent a valid URL but is required to do so.
 *
 * @type Number
 */
M.ERR_VALIDATION_URL = 101;

/**
 * A model record failed validation due to a property does not represent a phone number but is required to do so.
 *
 * @type Number
 */
M.ERR_VALIDATION_PHONE = 102;

/**
 * A model record failed validation due to a property is not of type number or represents a number but is required to do so.
 *
 * @type Number
 */
M.ERR_VALIDATION_NUMBER = 103;

/**
 * A model record failed validation due to a property contains a minus value but it is required to do not.
 *
 * @type Number
 */
M.ERR_VALIDATION_NOTMINUS = 104;

/**
 * A model record failed validation due to a property does not represent a valid eMail but is required to do so.
 *
 * @type Number
 */
M.ERR_VALIDATION_EMAIL = 105;

/**
 * A model record failed validation due to a property does not represent a valid eMail but is required to do so.
 *
 * @type Number
 */
M.ERR_VALIDATION_DATE = 106;

/**
 * A Data Provider was not set for a model.
 *
 * @type Number
 */
M.ERR_MODEL_PROVIDER_NOT_SET = 120;


/* WebSQL Error Codes (see e.g. http://www.w3.org/TR/webdatabase/) */
/**
 * A constant value for an error occuring with WebSQL.
 * "The transaction failed for reasons unrelated to the database itself and not covered by any other error code."
 * Error code in WebSQL specification: 0
 *
 * @type Number
 */
M.ERR_WEBSQL_UNKNOWN = 200;

/**
 * A constant value for an error occuring with WebSQL.
 * "The statement failed for database reasons not covered by any other error code."
 * Error code in WebSQL specification: 1
 *
 * @type Number
 */
M.ERR_WEBSQL_DATABASE = 201;

/**
 * A constant value for an error occuring with WebSQL.
 * "The transaction failed for reasons unrelated to the database itself and not covered by any other error code."
 * Error code in WebSQL specification: 2
 *
 * @type Number
 */
M.ERR_WEBSQL_VERSION = 202;

/**
 * A constant value for an error occuring with WebSQL.
 * "The statement failed because the data returned from the database was too large. The SQL "LIMIT" modifier might be useful to reduce the size of the result set."
 * Error code in WebSQL specification: 3
 *
 * @type Number
 */
M.ERR_WEBSQL_TOO_LARGE = 203;

/**
 * A constant value for an error occuring with WebSQL.
 * "The statement failed because there was not enough remaining storage space, or the storage quota was reached and the user declined to give more space to the database."
 * Error code in WebSQL specification: 4
 *
 * @type Number
 */
M.ERR_WEBSQL_QUOTA = 204;

/**
 * A constant value for an error occuring with WebSQL.
 * "The statement failed because of a syntax error, or the number of arguments did not match the number of ? placeholders in the statement, or the statement tried to use a statement that is not allowed, such as BEGIN, COMMIT, or ROLLBACK, or the statement tried to use a verb that could modify the database but the transaction was read-only."
 * Error code in WebSQL specification: 5
 *
 * @type Number
 */
M.ERR_WEBSQL_SYNTAX = 205;

/**
 * A constant value for an error occuring with WebSQL.
 * "An INSERT, UPDATE, or REPLACE statement failed due to a constraint failure. For example, because a row was being inserted and the value given for the primary key column duplicated the value of an existing row."
 * Error code in WebSQL specification: 6
 *
 * @type Number
 */
M.ERR_WEBSQL_CONSTRAINT = 206;

/**
 * A constant value for an error occuring with WebSQL.
 * "A lock for the transaction could not be obtained in a reasonable time."
 * Error code in WebSQL specification: 7
 *
 * @type Number
 */
M.ERR_WEBSQL_TIMEOUT = 207;

/* following errors are WebSQL Data Provider errors. */

/**
 * A constant value for an error occuring when dbHandler does not exist in
 * data provider. Reason: Initialization did not take place or failed.
 *
 * @type Number
 */
M.ERR_WEBSQL_PROVIDER_NO_DBHANDLER = 208;

/**
 * A constant value for an error occuring with bulkSave operation in dataprovider.
 * No Record array was passed to the method via the param obj.
 *
 * @type Number
 */
M.ERR_WEBSQL_BULK_NO_RECORDS = 210;


/**
 * A constant value for an error occuring when a conflict appears when saving a document in CouchDB. This is propably caused by duplicate IDs
 *
 * @type Number
 */
M.ERR_COUCHDB_CONFLICT = 300;

/**
 * A constant value for an error occuring if the provided database could not be found
 *
 * @type Number
 */
M.ERR_COUCHDB_DBNOTFOUND = 301;

/**
 * A constant value for an error occuring if a database that shall be created already exists
 *
 * @type Number
 */
M.ERR_COUCHDB_DBEXISTS = 302;

/**
 * A constant value for an error occuring if a document could not be found
 *
 * @type Number
 */
M.ERR_COUCHDB_DOCNOTFOUND = 303;

M.Error = M.Object.extend(
/** @scope M.Error.prototype */ {
    code: '',
    msg: '',
    errObj: null
});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
M.EventDispatcher = M.Object.extend(
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
    lastEvent: {},

    /**
     * This method is used to register events and link them to a corresponding action.
     * 
     * @param {String|Object} eventSource The view's id or a DOM object.
     * @param {Object} events The events to be registered for the given view or DOM object.
     */
    registerEvents: function(eventSource, events, recommendedEvents, sourceType) {
        if(!events || typeof(events) !== 'object') {
            M.Logger.log('No events passed for \'' + eventSource + '\'!', M.WARN);
            return;
        }

        eventSource = this.getEventSource(eventSource);
        if(!this.checkEventSource(eventSource)) {
            return;
        }

        _.each(events, function(handler, type) {
            M.EventDispatcher.registerEvent(type, eventSource, handler, recommendedEvents, sourceType, YES);
        });
    },

    /**
     * This method is used to register a certain event for a certain view or DOM object
     * and link them to a corresponding action.
     *
     * @param {String} type The type of the event.
     * @param {String|Object} eventSource The view's id, the view object or a DOM object.
     * @param {Object} handler The handler for the event.
     * @param {Object} recommendedEvents The recommended events for this event source.
     * @param {Object} sourceType The type of the event source.
     * @param {Boolean} isInternalCall The flag to determine whether this is an internal call or not.
     */
    registerEvent: function(type, eventSource, handler, recommendedEvents, sourceType, isInternalCall, skipUnbinding) {
        if(!isInternalCall) {
            if(!handler || typeof(handler) !== 'object') {
                M.Logger.log('No event passed!', M.WARN);
                return;
            }

            eventSource = this.getEventSource(eventSource);
            if(!this.checkEventSource(eventSource)) {
                return;
            }
        }

        if(!(recommendedEvents && _.indexOf(recommendedEvents, type) > -1)) {
            if(sourceType && typeof(sourceType) === 'string') {
                M.Logger.log('Event type \'' + type + '\' not recommended for ' + sourceType + '!', M.WARN);
            } else {
                M.Logger.log('Event type \'' + type + '\' not recommended!', M.WARN);
            }
        }

        if(!this.checkHandler(handler, type)) {
            return;
        }

        /* switch enter event to keyup with keycode 13 */
        if(type === 'enter') {
            eventSource.bind('keyup', function(event) {
                if(event.which === 13) {
                    $(this).trigger('enter');
                }
            });
        }

        var that = this;
        var view = M.ViewManager.getViewById(eventSource.attr('id'));
        eventSource.bind(type, function(event) {
            /* discard false twice-fired events in some special cases */
            if(eventSource.attr('id') && M.ViewManager.getViewById(eventSource.attr('id')).type === 'M.DashboardItemView') {
                if(that.lastEvent.tap && that.lastEvent.tap.view === 'M.DashboardItemView' && that.lastEvent.tap.x === event.clientX && that.lastEvent.tap.y === event.clientY) {
                    return;
                } else if(that.lastEvent.taphold && that.lastEvent.taphold.view === 'M.DashboardItemView' && that.lastEvent.taphold.x === event.clientX && that.lastEvent.taphold.y === event.clientY) {
                    return;
                }
            }

            /* no propagation (except some specials) */
            var killEvent = YES;
            if(eventSource.attr('id')) {
                var view = M.ViewManager.getViewById(eventSource.attr('id'));
                if(view.type === 'M.SearchBarView') {
                    killEvent = NO;
                } else if((type === 'click' || type === 'tap') && view.type === 'M.ButtonView' && view.parentView && view.parentView.type === 'M.ToggleView' && view.parentView.toggleOnClick) {
                    killEvent = NO;
                } else if(view.hyperlinkTarget && view.hyperlinkType) {
                    killEvent = NO;
                } else if(type === 'pageshow') {
                    killEvent = NO;
                }
            }
            if(killEvent) {
                event.preventDefault();
                event.stopPropagation();
            }

            /* store event in lastEvent property for capturing false twice-fired events */
            if(M.ViewManager.getViewById(eventSource.attr('id'))) {
                that.lastEvent[type] = {
                    view: M.ViewManager.getViewById(eventSource.attr('id')).type,
                    date: +new Date(),
                    x: event.clientX,
                    y: event.clientY
                }
            }

            /* event logger, uncomment for development mode */
            //M.Logger.log('Event \'' + event.type + '\' did happen for id \'' + event.currentTarget.id + '\'', M.INFO);

            if(handler.nextEvent) {
                that.bindToCaller(handler.target, handler.action, [event.currentTarget.id ? event.currentTarget.id : event.currentTarget, event, handler.nextEvent])();
            } else {
                that.bindToCaller(handler.target, handler.action, [event.currentTarget.id ? event.currentTarget.id : event.currentTarget, event])();
            }
        });
    },

    /**
     * This method can be used to unregister events.
     *
     * @param {String|Object} eventSource The view's id, the view object or a DOM object.
     */
    unregisterEvents: function(eventSource) {
        eventSource = this.getEventSource(eventSource);
        if(!this.checkEventSource(eventSource)) {
            return;
        }
        eventSource.unbind();
    },

    /**
     * This method can be used to unregister events.
     *
     * @param {String} type The type of the event.
     * @param {String|Object} eventSource The view's id, the view object or a DOM object.
     */
    unregisterEvent: function(type, eventSource) {
        eventSource = this.getEventSource(eventSource);
        if(!this.checkEventSource(eventSource)) {
            return;
        }
        eventSource.unbind(type);
    },

    /**
     * This method is used to explicitly call an event handler. We mainly use this for
     * combining internal and external events.
     *
     * @param {Object} handler The handler for the event.
     * @param {Object} event The original DOM event.
     * @param {Boolean} passEvent Determines whether or not to pass the event and its target as the first parameters for the handler call.
     * @param {Array} parameters The (additional) parameters for the handler call.
     */
    callHandler: function(handler, event, passEvent, parameters) {
        if(!this.checkHandler(handler, (event && event.type ? event.type : 'undefined'))) {
            return;
        }

        if(!passEvent) {
            this.bindToCaller(handler.target, handler.action, parameters)();
        } else {
            this.bindToCaller(handler.target, handler.action, [event.currentTarget.id ? event.currentTarget.id : event.currentTarget, event])();
        }
    },

    /**
     * This method is used to check the handler. It tests if target and action are
     * specified correctly.
     *
     * @param {Object} handler The handler for the event.
     * @param {String} type The type of the event.
     * @return {Boolean} Specifies whether or not the check was successful.
     */
    checkHandler: function(handler, type) {
        if(typeof(handler.action) === 'string') {
            if(handler.target) {
                if(handler.target[handler.action] && typeof(handler.target[handler.action]) === 'function') {
                    handler.action = handler.target[handler.action];
                    return YES;
                } else {
                    M.Logger.log('No action \'' + handler.action + '\' found for given target and the event type \'' + type + '\'!', M.WARN);
                    return NO;
                }
            } else {
                M.Logger.log('No valid target passed for action \'' + handler.action + '\' and the event type \'' + type + '\'!', M.WARN);
                return NO;
            }
        } else if(typeof(handler.action) !== 'function') {
            M.Logger.log('No valid action passed for the event type \'' + type + '\'!', M.WARN);
            return NO;
        }

        return YES;
    },

    /**
     * This method is used to get the event source as a DOM object.
     *
     * @param {Object|String} eventSource The event source.
     * @return {Object} The event source as dom object.
     */
    getEventSource: function(eventSource) {
        if(typeof(eventSource) === 'string') {
            eventSource = $('#' + eventSource + ':first');
        } else {
            eventSource = $(eventSource);
        }
        
        return eventSource;
    },

    /**
     * This method is used to check the event source. It tests if it is correctly
     * specified.
     *
     * @param {Object} eventSource The event source.
     * @return {Boolean} Specifies whether or not the check was successful.
     */
    checkEventSource: function(eventSource) {
        if(!eventSource) {
            M.Logger.log('The event source is invalid!', M.WARN);
            return NO;
        }
        
        return YES;
    },

    dispatchOrientationChangeEvent: function(id, event, nextEvent) {
        var orientation = M.Environment.getOrientation();
        if(orientation === M.PORTRAIT_BOTTOM || orientation === M.PORTRAIT_TOP) {
            $('html').removeClass('landscape');
            $('html').addClass('portrait');
        } else {
            $('html').removeClass('portrait');
            $('html').addClass('landscape');
        }
        $('#' + M.ViewManager.getCurrentPage().id).trigger('orientationdidchange');
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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

m_require('core/utility/logger.js');

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
     * It's as unique as it needs to be: four digits, each digits can be one of 32 chars
     *
     * @type String
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
     *
     * @type String
     */
    state_remote: M.STATE_UNDEFINED,

    /**
     * determines whether model shall be validated before saving to storage or not.
     * @type Boolean
     */
    usesValidation: NO,

    /**
     * The model's data provider. A data provider persists the model to a certain storage.
     *
     * @type Object
     */
    dataProvider: null,

    getUniqueId: function() {
        return M.UniqueId.uuid(4);
    },

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
            m_id: obj.m_id ? obj.m_id : this.getUniqueId(),
            record: obj /* properties that are added to record here, but are not part of __meta, are deleted later (see below) */
        });
        delete obj.m_id;
        rec.state = obj.state ? obj.state : M.STATE_NEW;
        delete obj.state;

        /* set timestamps if new */
        if(rec.state === M.STATE_NEW) {
            rec.record[M.META_CREATED_AT] = +new Date();
            rec.record[M.META_UPDATED_AT] = +new Date();
        }

        for(var i in rec.record) {

            if(i === M.META_CREATED_AT || i === M.META_UPDATED_AT) {
                continue;
            }

            /* if record contains properties that are not part of __meta (means that are not defined in the model blueprint) delete them */
            if(!rec.__meta.hasOwnProperty(i)) {
                M.Logger.log('Deleting "' + i + '" property. It\'s not part of ' + this.name + ' definition.', M.WARN);
                delete rec.record[i];
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
            usesValidation: obj.usesValidation ? obj.usesValidation : this.usesValidation
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
        model.__meta[M.META_CREATED_AT] = this.attr('String', { // could be 'Date', too
            isRequired:YES
        });
        model.__meta[M.META_UPDATED_AT] = this.attr('String', { // could be 'Date', too
            isRequired:YES
        });

        model.recordManager = M.RecordManager.extend({records:[]});

        /* save model in modelList with model name as key */
        this.modelList[model.name] = model;

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
                    var r = this.recordManager.getRecordById(recProp);
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
            this.record[M.META_UPDATED_AT] = +new Date();
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
            M.Logger.log('No data provider given.', M.ERR);
        }
        obj = obj ? obj : {};
        /* check if the record list shall be cleared (default) before new found model records are appended to the record list */
        obj.deleteRecordList = obj.deleteRecordList ? obj.deleteRecordList : YES;
        if(obj.deleteRecordList) {
            this.recordManager.removeAll();
        }
        if(!this.dataProvider) {
            M.Logger.log('No data provider given.', M.ERR);
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
     * which does not necessarily indicate whether the operation was successful, because the operation is asynchronous, means the operation's result is not predictable.
     */
    save: function(obj) {
        if(!this.dataProvider) {
            M.Logger.log('No data provider given.', M.ERR);
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
            M.Logger.log('No data provider given.', M.ERR);
        }
        obj = obj ? obj : {};
        if(!this.m_id) {
            return NO;
        }

       var isDel = this.dataProvider.del($.extend(obj, {model: this}));
        if(isDel) {
            this.state = M.STATE_DELETED;
            return YES;
        }
    },

    /**
     * completes the model record by loading all referenced entities.
     *
     * @param {Function | Object} obj The param object with query, cascade flag and callbacks.
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
            case 'M.DataProviderLocalStorage':
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
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
            if(key === entry.observable || (entry.observable.indexOf('.') > 0 && entry.observable.indexOf(key) > -1)) {
                entry.observer.contentDidChange();
            } else if(key.indexOf('.') > 0 && entry.observable.indexOf(key.substring(0, key.lastIndexOf('.'))) === 0) {
                entry.observer.contentDidChange();
            }
        });
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
M.DataProviderDummy = M.DataProvider.extend(
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

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
M.DataProviderLocalStorage = M.DataProvider.extend(
    /** @scope M.DataProviderLocalStorage.prototype */ {

    /**
     * The type of this object.
     * @type String
     */
    type:'M.DataProviderLocalStorage',

    /**
     * Saves a model record to the local storage
     * The key is the model record's name combined with id, value is stringified object
     * e.g.
     * Note_123 => '{ text: 'buy some food' }'
     *
     * @param {Object} that (is a model).
     * @returns {Boolean} Boolean indicating whether save was successful (YES|true) or not (NO|false).
     */
    save:function (obj) {
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
        } catch (e) {
            M.Logger.log('Error saving ' + obj.model.record + ' to localStorage with key: ' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + this.m_id, M.WARN);
            M.Logger.log('Error ' + e.code + ', ' + e.name + ': ' + e.message);
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
    del:function (obj) {
        try {
            if (localStorage.getItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + obj.model.m_id)) { // check if key-value pair exists
                localStorage.removeItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + obj.model.m_id);
                obj.model.recordManager.remove(obj.model.m_id);
                return YES;
            }
            return NO;
        } catch (e) {
            M.Logger.log('Error removing key: ' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + obj.model.m_id + ' from localStorage', M.WARN);
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
     * @returns {Object|Boolean} Returns an object if find is done with a key, an array of objects when a query is given or no parameter passed.
     * @throws Exception when query tries to compare two different data types
     */
    find:function (obj) {
        if (obj.key) {
            var record = this.findByKey(obj);
            if (!record) {
                return NO;
            }
            /*construct new model record with the saved id*/
            var reg = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_([0-9a-zA-Z]+)$').exec(obj.key);
            var m_id = reg && reg[1] ? reg[1] : null;
            if (!m_id) {
                M.Logger.log('retrieved model has no valid key: ' + obj.key, M.ERR);
                return NO;
            }
            var m = obj.model.createRecord($.extend(record, {m_id:m_id, state:M.STATE_VALID}));
            return m;
        }

        if (obj.query) {
            var q = obj.query;
            var missing = [];
            if (!q.identifier) {
                missing.push('identifier');
            }
            if (!q.operator) {
                missing.push('operator');
            }
            if (q.value === undefined || q.value === null) {
                missing.push('value');
            }

            if (missing.length > 0) {
                M.Logger.log('Wrong query format:', missing.join(', '), ' is/are missing.', M.WARN);
                return [];
            }

            var ident = q.identifier;
            var op = q.operator;
            var val = q.value;

            var res = this.findAll(obj);

            // check if query is correct in respect of data types
            if(res && res.length > 0) {
                var o = res[0];
                if (typeof(o.record[ident]) != o.__meta[ident].dataType.toLowerCase()) {
					if(!(o.__meta[ident].dataType.toLowerCase() == "reference" && typeof(o.record[ident]) == "string"))
						throw 'Query: "' + ident + op + val + '" tries to compare ' + typeof(o.record[ident]) + ' with ' + o.__meta[ident].dataType.toLowerCase() + '.';
                }
            }

            switch (op) {
                case '=':

                    res = _.select(res, function (o) {
                        return o.record[ident] === val;
                    });
                    break;

                case '~=': // => includes (works only on strings)

                    if(obj.model.__meta[ident].dataType.toLowerCase() !== 'string') {
                        throw 'Query: Operator "~=" only works on string properties. Property "' + ident + '" is of type ' + obj.model.__meta[ident].dataType.toLowerCase() + '.';
                    }
                    // escape all meta regex meta characters: \, *, +, ?, |, {, [, (,), ^, $,., # and space
                    var metaChars = ['\\\\', '\\*', '\\+', '\\?', '\\|', '\\{', '\\}', '\\[', '\\]', '\\(', '\\)', '\\^', '\\$', '\\.', '\\#'];

                    for(var i in metaChars) {
                        val = val.replace(new RegExp(metaChars[i], 'g'), '\\' + metaChars[i].substring(1,2));
                    }

                    // replace whitespaces with regex equivalent
                    val = val.replace(/\s/g, '\\s');

                    var regex = new RegExp(val);

                    res = _.select(res, function(o) {
                        return regex.test(o.record[ident]);
                    });

                    break;

                case '!=':
                    res = _.select(res, function (o) {
                        return o.record[ident] !== val;
                    });
                    break;
                case '<':
                    res = _.select(res, function (o) {
                        return o.record[ident] < val;
                    });
                    break;
                case '>':
                    res = _.select(res, function (o) {
                        return o.record[ident] > val;
                    });
                    break;
                case '<=':
                    res = _.select(res, function (o) {
                        return o.record[ident] <= val;
                    });
                    break;
                case '>=':
                    res = _.select(res, function (o) {
                        return o.record[ident] >= val;
                    });
                    break;
                default:
                    M.Logger.log('Query has unknown operator: ' + op, M.WARN);
                    res = [];
                    break;

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
    findByKey:function (obj) {
        if (obj.key) {

            var reg = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX);
            /* assume that if key starts with local storage prefix, correct key is given, other wise construct it and key might be m_id */
            obj.key = reg.test(obj.key) ? obj.key : M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + obj.key;

            if (localStorage.getItem(obj.key)) { // if key is available
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
    findAll:function (obj) {
        var result = [];
        for (var i = 0; i < localStorage.length; i++) {
            var k = localStorage.key(i);
            regexResult = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_').exec(k);
            if (regexResult) {
                var record = this.buildRecord(k, obj);//JSON.parse(localStorage.getItem(k));

                /*construct new model record with the saved m_id*/
                var reg = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_([0-9a-zA-Z]+)$').exec(k);
                var m_id = reg && reg[1] ? reg[1] : null;
                if (!m_id) {
                    M.Logger.log('Model Record m_id not correct: ' + m_id, M.ERR);
                    continue; // if m_id does not exist, continue with next record element
                }
                var m = obj.model.createRecord($.extend(record, {m_id:m_id, state:M.STATE_VALID}));

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
    buildRecord:function (key, obj) {
        var record = JSON.parse(localStorage.getItem(key));
        for (var i in record) {
            if (obj.model.__meta[i] && typeof(record[i]) !== obj.model.__meta[i].dataType.toLowerCase()) {
                switch (obj.model.__meta[i].dataType) {
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
    allKeys:function (obj) {
        var keys = [];
        for (var i = 0; i < localStorage.length; i++) {
            var k = localStorage.key(i)
            regexResult = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_').exec(k);
            if (regexResult) {
                keys.push(k);
            }
        }
        return keys;
    }

});

// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
 * Encapsulates access to a remote storage, a json based web service.
 *
 * @extends M.DataProvider
 */
M.DataProviderRemoteStorage = M.DataProvider.extend(
/** @scope M.RemoteStorageProvider.prototype */ {

    /**
     * The type of this object.
     * @type String
     */
    type: 'M.DataProviderRemoteStorage',

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

            this.remoteQuery('create', config.url + config.create.url(obj.model.get('ID')), config.create.httpMethod, dataResult, obj, null);

        } else { // make an update request

            dataResult = config.update.map(obj.model.record);

            var updateUrl = config.url + config.update.url(obj.model.get('ID'));

            this.remoteQuery('update', updateUrl, config.update.httpMethod, dataResult, obj, function(xhr) {
                  xhr.setRequestHeader("X-Http-Method-Override", config.update.httpMethod);
            });
        }

    },

    del: function(obj) {
        var config = this.config[obj.model.name];
        var delUrl = config.del.url(obj.model.get('ID'));
        delUrl = config.url + delUrl;

        this.remoteQuery('delete', delUrl, config.del.httpMethod, null, obj,  function(xhr) {
            xhr.setRequestHeader("X-Http-Method-Override", config.del.httpMethod);
        });
    },

    find: function(obj) {
        var config = this.config[obj.model.name];

        var readUrl = obj.ID ? config.read.url.one(obj.ID) : config.read.url.all();
        readUrl = config.url + readUrl;

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
                result.push(obj.model.createRecord($.extend(config.read.map(res), {state: M.STATE_VALID})));
            }
        } else if(typeof(data) === 'object') {
            result.push(obj.model.createRecord($.extend(config.read.map(data), {state: M.STATE_VALID})));
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
                if(obj.onSuccess) {
                    if(obj.onSuccess.target && obj.onSuccess.action) {
                        obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action], [data]);
                        if(opType === 'read') {
                            that.createModelsFromResult(data, obj.onSuccess, obj);
                        } else {
                            obj.onSuccess();
                        }
                    } else if(typeof(obj.onSuccess) === 'function') {
                        that.createModelsFromResult(data, obj.onSuccess, obj);
                    }

                }else {
                    M.Logger.log('No success callback given.', M.WARN);
                }
            },
            onError: function(xhr, msg) {

                var err = M.Error.extend({
                    code: M.ERR_CONNECTION,
                    msg: msg
                });

                if(obj.onError && typeof(obj.onError) === 'function') {
                    obj.onError(err);
                }
                if(obj.onError && obj.onError.target && obj.onError.action) {
                    obj.onError = this.bindToCaller(obj.onError.target, obj.onError.target[obj.onError.action], err);
                    obj.onError();
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

}); 
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * A RegEx describing a US date.
     * Used for validation.
     *
     * @type Function (actually a RegEx)
     */
    patternDateUS:  /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})(\s+([0-9]{2})\:([0-9]{2})(\:([0-9]{2}))?)?$/,

    /**
     * A RegEx describing a german date.
     * Used for validation.
     *
     * @type Function (actually a RegEx)
     */
    patternDateDE:  /^([0-9]{2})\.([0-9]{2})\.([0-9]{4})(\s+([0-9]{2})\:([0-9]{2})(\:([0-9]{2}))?)?$/,

    /**
     * Validation method. First checks if value is not null, undefined or an empty string and then tries to create a {@link M.Date} with it.
     * Pushes different validation errors depending on where the validator is used: in the view or in the model.
     *
     * @param {Object} obj Parameter object. Contains the value to be validated, the {@link M.ModelAttribute} object of the property and the model record's id.
     * @returns {Boolean} Indicating whether validation passed (YES|true) or not (NO|false).
     */
    validate: function(obj, key) {
        /* validate the date to be a valid german or us date: dd.mm.yyyy or mm/dd/yyyy */
        if(obj.isView) {
            if(obj.value === null || obj.value === undefined || obj.value === '' || !(this.patternDateUS.test(obj.value) || this.patternDateDE.test(obj.value)) || !M.Date.create(obj.value)) {
                var err = M.Error.extend({
                    msg: this.msg ? this.msg : key + ' is not a valid date.',
                    code: M.ERR_VALIDATION_DATE,
                    errObj: {
                        msg: this.msg ? this.msg : key + ' is not a valid date.',
                        viewId: obj.id,
                        validator: 'DATE',
                        onSuccess: obj.onSuccess,
                        onError: obj.onError
                    }
               });
               this.validationErrors.push(err);
               return NO;
            }
            return YES;
        } else {
            if(obj.value.type && obj.value.type !== 'M.Date' && (obj.value === null || obj.value === undefined || obj.value === '' || !M.Date.create(obj.value))) {
                var err = M.Error.extend({
                    msg: this.msg ? this.msg : obj.property + ' is not a valid date.',
                    code: M.ERR_VALIDATION_DATE,
                    errObj: {
                        msg: this.msg ? this.msg : obj.property + ' is not a valid date.',
                        modelId: obj.modelId,
                        validator: 'DATE',
                        onSuccess: obj.onSuccess,
                        onError: obj.onError
                    }
                });
                this.validationErrors.push(err);
                return NO;
            }
            return YES;
        }
    }
});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
        if (typeof(obj.value) !== 'string') {
            return NO;
        }

        if (this.pattern.test(obj.value)) {
            return YES;
        }

        var err = M.Error.extend({
            msg: this.msg ? this.msg : obj.value + ' is not a valid email adress.',
            code: M.ERR_VALIDATION_EMAIL,
            errObj: {
                msg: obj.value + ' is not a valid email adress.',
                modelId: obj.modelId,
                property: obj.property,
                viewId: obj.viewId,
                validator: 'EMAIL',
                onSuccess: obj.onSuccess,
                onError: obj.onError
            }
        });
        this.validationErrors.push(err);

        return NO;
    }
    
});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
               var err = M.Error.extend({
                    msg: this.msg ? this.msg : obj.value + ' is a minus value. This is not allowed.',
                    code: M.ERR_VALIDATION_NOTMINUS,
                    errObj: {
                        msg: obj.value + ' is a minus value. This is not allowed.',
                        modelId: obj.modelId,
                        property: obj.property,
                        viewId: obj.viewId,
                        validator: 'NUMBER',
                        onSuccess: obj.onSuccess,
                        onError: obj.onError
                    }
               });
               this.validationErrors.push(err);
               return NO;
           }
           return YES;
       }

       if(typeof(obj.value) === 'string') {
           var pattern = /-/;
           if(this.pattern.exec(obj.value)) {
                var err = M.Error.extend({
                    msg: this.msg ? this.msg : obj.value + ' is a minus value. This is not allowed.',
                    code: M.ERR_VALIDATION_NOTMINUS,
                    errObj: {
                        msg: obj.value + ' is a minus value. This is not allowed.',
                        modelId: obj.modelId,
                        property: obj.property,
                        viewId: obj.viewId,
                        validator: 'NUMBER',
                        onSuccess: obj.onSuccess,
                        onError: obj.onError
                    }
               });
               this.validationErrors.push(err);
               return NO;
           }
           return YES;
       }
    }
});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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

        var err = M.Error.extend({
            msg: this.msg ? this.msg : obj.value + ' is not a number.',
            code: M.ERR_VALIDATION_NUMBER,
            errObj: {
                msg: obj.value + ' is not a number.',
                modelId: obj.modelId,
                property: obj.property,
                viewId: obj.viewId,
                validator: 'NUMBER',
                onSuccess: obj.onSuccess,
                onError: obj.onError
            }
        });

        this.validationErrors.push(err);

        return NO;
    }
});

// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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


        var err = M.Error.extend({
            msg: this.msg ? this.msg : obj.value + ' is not a phone number.',
            code: M.ERR_VALIDATION_PHONE,
            errObj: {
                msg: obj.value + ' is not a phone number.',
                modelId: obj.modelId,
                property: obj.property,
                viewId: obj.viewId,
                validator: 'PHONE',
                onSuccess: obj.onSuccess,
                onError: obj.onError
            }
        });

        this.validationErrors.push(err);
        return NO;
    }
    
});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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

                var err = M.Error.extend({
                    msg: this.msg ? this.msg : key + ' is required and is not set.',
                    code: M.ERR_VALIDATION_PRESENCE,
                    errObj: {
                        msg: this.msg ? this.msg : key + ' is required and is not set.',
                        viewId: obj.id,
                        validator: 'PRESENCE',
                        onSuccess: obj.onSuccess,
                        onError: obj.onError
                    }
                });
                this.validationErrors.push(err);
                
            } else {
                var err = M.Error.extend({
                    msg: this.msg ? this.msg : obj.property + 'is required and is not set.',
                    code: M.ERR_VALIDATION_PRESENCE,
                    errObj: {
                        msg: this.msg ? this.msg : obj.property + ' is required and is not set.',
                        modelId: obj.modelId,
                        property: obj.property,
                        validator: 'PRESENCE',
                        onSuccess: obj.onSuccess,
                        onError: obj.onError
                    }
                });
                this.validationErrors.push(err);
            }
            return NO;
        }
        return YES;
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * Validation method. Executes url regex pattern to string.
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
        
        var err = M.Error.extend({
            msg: this.msg ? this.msg : obj.value + ' is not a valid url.',
            code: M.ERR_VALIDATION_URL,
            errObj: {
                msg: obj.value + ' is not a valid url.',
                modelId: obj.modelId,
                property: obj.property,
                viewId: obj.viewId,
                validator: 'PHONE',
                onSuccess: obj.onSuccess,
                onError: obj.onError
            }
        });
        this.validationErrors.push(err);
        return NO;
    }
    
});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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

        var rec = this.getRecordById(m_id);

        if(rec) {
            this.records = _.select(this.records, function(r){
                return r.m_id !== rec.m_id;
            });
        }

        delete rec;
    },

    /**
    * Returns a record from the record array identified by the interal model id.
    * @param {Number} m_id The internal model id of the model record.
    * @deprecated
    */
    getRecordForId: function(m_id) {
        return this.getRecordById(m_id);
    },

    /**
     * Returns a record from the record array identified by the interal model id.
     * @param {Number} m_id The internal model id of the model record.
     */
    getRecordById: function(m_id) {
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
    
});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * This property contains the relevant information about the view's computed value. In
     * particular it is used to specify the pre-value, the content binding and the just-
     * in-time performed operation, that computes the view's value.
     *
     * @property {Object}
     */
    computedValue: null,

    /**
     * The path to a content that is bound to the view's value. If this content
     * changes, the view will automatically be updated.
     *
     * @property {String}
     */
    contentBinding: null,

    /**
     * The path to a content that is bound to the view's value (reverse). If this
     * the view's value changes, the bound content will automatically be updated.
     *
     * @property {String}
     */
    contentBindingReverse: null,

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
     * This property is used to specify a view's events and their corresponding actions.
     *
     * @type Object
     */
    events: null,

    /**
     * This property is used to specify a view's internal events and their corresponding actions.
     *
     * @private
     * @type Object
     */
    internalEvents: null,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: null,

    /**
     * This method encapsulates the 'extend' method of M.Object for better reading of code syntax.
     * It triggers the content binding for this view,
     * gets an ID from and registers itself at the ViewManager.
     *
     * @param {Object} obj The mixed in object for the extend call.
     */
    design: function(obj) {
        var view = this.extend(obj);
        view.id = M.ViewManager.getNextId();
        M.ViewManager.register(view);

        view.attachToObservable();
        
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
            var childViews = this.getChildViewsAsArray();
            for(var i in childViews) {
                if(this[childViews[i]]) {
                    this[childViews[i]]._name = childViews[i];
                    this[childViews[i]].parentView = this;
                    this.html += this[childViews[i]].render();
                } else {
                    this.childViews = this.childViews.replace(childViews[i], ' ');
                    M.Logger.log('There is no child view \'' + childViews[i] + '\' available for ' + this.type + ' (' + (this._name ? this._name + ', ' : '') + '#' + this.id + ')! It will be excluded from the child views and won\'t be rendered.', M.WARN);
                }

                if(this.type === 'M.PageView' && this[childViews[i]].type === 'M.TabBarView') {
                    this.hasTabBarView = YES;
                    this.tabBarView = this[childViews[i]];
                }
            }
            return this.html;
        }
    },

    /**
     * This method is used internally for removing a view's child views both from DOM and the
     * view manager.
     *
     * @private
     */
    removeChildViews: function() {
        var childViews = this.getChildViewsAsArray();
        for(var i in childViews) {
            if(this[childViews[i]].childViews) {
                this[childViews[i]].removeChildViews();
            }
            this[childViews[i]].destroy();
            M.ViewManager.unregister(this[childViews[i]]);
        }
        $('#' + this.id).empty();
    },

    /**
     * This method transforms the child views property (string) into an array.
     *
     * @returns {Array} The child views as an array.
     */
    getChildViewsAsArray: function() {
        return $.trim(this.childViews.replace(/\s+/g, ' ')).split(' ');
    },

    /**
     * This method creates and returns an associative array of all child views and
     * their values.
     *
     * The key of an array item is the name of the view specified in the view
     * definition. The value of an array item is the value of the corresponding
     * view.
     *
     * @returns {Array} The child view's values as an array.
     */
    getValues: function() {
        var values = {};
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
            for(var i in childViews) {
                if(Object.getPrototypeOf(this[childViews[i]]).hasOwnProperty('getValue')) {
                    values[childViews[i]] = this[childViews[i]].getValue();
                }
                if(this[childViews[i]].childViews) {
                    var newValues = this[childViews[i]].getValues();
                    for(var value in newValues) {
                        values[value] = newValues[value];
                    }
                }
            }
        }
        return values;
    },

    /**
     * @interface
     *
     * This method defines an interface method for getting the view's value. This should
     * be implemented for any view that offers a value and can be used within a form view.
     */
    getValue: function() {
        
    },

    /**
     * This method creates and returns an associative array of all child views and
     * their ids.
     *
     * The key of an array item is the name of the view specified in the view
     * definition. The value of an array item is the id of the corresponding
     * view.
     *
     * @returns {Array} The child view's ids as an array.
     */
    getIds: function() {
        var ids = {};
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
            for(var i in childViews) {
                if(this[childViews[i]].id) {
                    ids[childViews[i]] = this[childViews[i]].id;
                }
                if(this[childViews[i]].childViews) {
                    var newIds = this[childViews[i]].getIds();
                    for(var id in newIds) {
                        ids[id] = newIds[id];
                    }
                }
            }
        }
        return ids;
    },


    /**
     * Clears the html property of a view and triggers the same method on all of its
     * child views.
     */
    clearHtml: function() {
        this.html = '';
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
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
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     */
    registerEvents: function() {
        var externalEvents = {};
        for(var event in this.events) {
            /* map orientationchange event to orientationdidchange event */
            if(event === 'orientationchange') {
                event = 'orientationdidchange';
            }
            externalEvents[event] = this.events[event];
        }

        if(this.internalEvents) {
            for(var event in this.internalEvents) {
                /* map orientationchange event to orientationdidchange event */
                if(this.internalEvents[event]) {
                    if(event === 'orientationchange') {
                        this.internalEvents['orientationdidchange'] = this.internalEvents[event];
                        delete this.internalEvents[event];
                    }
                }
            }
        }

        if(this.internalEvents && externalEvents) {
            for(var event in externalEvents) {
                if(this.internalEvents[event]) {
                    this.internalEvents[event].nextEvent = externalEvents[event];
                    delete externalEvents[event];
                }
            }
            M.EventDispatcher.registerEvents(this.id, this.internalEvents, this.recommendedEvents, this.type);
        } else if(this.internalEvents) {
            M.EventDispatcher.registerEvents(this.id, this.internalEvents, this.recommendedEvents, this.type);
        }

        if(externalEvents) {
            M.EventDispatcher.registerEvents(this.id, externalEvents, this.recommendedEvents, this.type);
        }
        
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
            for(var i in childViews) {
                this[childViews[i]].registerEvents();
            }
        }
    },

    /**
     * This method triggers the theme method on all children.
     */
    themeChildViews: function() {
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
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
        var contentBinding = this.contentBinding ? this.contentBinding : (this.computedValue) ? this.computedValue.contentBinding : null;

        if(!contentBinding) {
            return;
        }

        var value = contentBinding.target;
        var propertyChain = contentBinding.property.split('.');
        _.each(propertyChain, function(level) {
            if(value) {
                value = value[level];
            }
        });

        if(value === undefined || value === null) {
            M.Logger.log('The value assigned by content binding (property: \'' + contentBinding.property + '\') for ' + this.type + ' (' + (this._name ? this._name + ', ' : '') + '#' + this.id + ') is invalid!', M.WARN);
            return;
        }

        if(this.contentBinding) {
            this.value = value;
        } else if(this.computedValue.contentBinding) {
            this.computedValue.value = value;
        }

        this.renderUpdate();
        this.delegateValueUpdate();
    },

    /**
     * This method attaches the view to an observable to be later notified once the observable's
     * state did change.
     */
    attachToObservable: function() {
        var contentBinding = this.contentBinding ? this.contentBinding : (this.computedValue) ? this.computedValue.contentBinding : null;

        if(!contentBinding) {
            return;
        }

        if(typeof(contentBinding) === 'object') {
            if(contentBinding.target && typeof(contentBinding.target) === 'object') {
                if(contentBinding.property && typeof(contentBinding.property) === 'string') {
                    var propertyChain = contentBinding.property.split('.');
                    if(contentBinding.target[propertyChain[0]] !== undefined) {
                        if(!contentBinding.target.observable) {
                            contentBinding.target.observable = M.Observable.extend({});
                        }
                        contentBinding.target.observable.attach(this, contentBinding.property);
                        this.isObserver = YES;
                    } else {
                        M.Logger.log('The specified target for contentBinding for \'' + this.type + '\' (' + (this._name ? this._name + ', ' : '') + '#' + this.id + ')\' has no property \'' + contentBinding.property + '!', M.WARN);
                    }
                } else {
                    M.Logger.log('The type of the value of \'action\' in contentBinding for \'' + this.type + '\' (' + (this._name ? this._name + ', ' : '') + '#' + this.id + ')\' is \'' + typeof(contentBinding.property) + ' but it must be of type \'string\'!', M.WARN);
                }
            } else {
                M.Logger.log('No valid target specified in content binding \'' + this.type + '\' (' + (this._name ? this._name + ', ' : '') + '#' + this.id + ')!', M.WARN);
            }
        } else {
            M.Logger.log('No valid content binding specified for \'' + this.type + '\' (' + (this._name ? this._name + ', ' : '') + '#' + this.id + ')!', M.WARN);
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
        /**
         * delegate value updates to a bound controller, but only if the view currently is
         * the master
         */
        if(this.contentBindingReverse && this.hasFocus) {
            this.contentBindingReverse.target.set(this.contentBindingReverse.property, this.value);
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
     * implemented with a specific behaviour for any input view. This method defines a basic
     * functionality for clearing a view's value. This should be overwritten with a specific
     * behaviour for most input view. What we do here is nothing but to call the cleaValue
     * method for any child view.
     */
    clearValue: function() {

    },

    /**
     * This method defines a basic functionality for clearing a view's value. This should be
     * overwritten with a specific behaviour for most input view. What we do here is nothing
     * but to call the cleaValue method for any child view.
     */
    clearValues: function() {
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
            for(var i in childViews) {
                if(this[childViews[i]].childViews) {
                    this[childViews[i]].clearValues();
                }
                if(typeof(this[childViews[i]].clearValue) === 'function'){
                    this[childViews[i]].clearValue();
                }
            }
        }
        this.clearValue();
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

});

// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * Switch the active tab in the application. This includes both activating this tab
     * visually and switching the page.
     *
     * @param {M.TabBarItemView} tab The tab to be activated.
     */
    switchToTab: function(tab) {
        if(!(tab.parentView && tab.parentView.type === 'M.TabBarView')) {
            M.Logger.log('Please provide a valid tab bar item to the switchToTab method.', M.WARN);
            return;
        }
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
            this.switchToPage(newPage, M.TRANSITION.NONE, NO, YES);
        }
    },

    /**
     * Switch the active page in the application.
     *
     * @param {Object|String} page The page to be displayed or its name.
     * @param {String} transition The transition that should be used. Default: horizontal slide
     * @param {Boolean} isBack YES will cause a reverse-direction transition. Default: NO
     * @param {Boolean} updateHistory Update the browser history. Default: YES
     */
    switchToPage: function(page, transition, isBack, updateHistory) {
        var timeStart = M.Date.now();
        page = page && typeof(page) === 'object' ? page : M.ViewManager.getPage(page);

        if(page) {
            transition = transition ? transition : M.TRANSITION.SLIDE;
            isBack = isBack !== undefined ? isBack : NO;
            updateHistory = updateHistory !== undefined ? updateHistory : YES;

            /* Now do the page change by using a jquery mobile method and pass the properties */
            if(page.type === 'M.PageView') {
                $.mobile.changePage($('#' + page.id), {
                    transition: M.Application.getConfig('useTransitions') ? transition : M.TRANSITION.NONE,
                    reverse: M.Application.getConfig('useTransitions') ? isBack : NO,
                    changeHash: updateHistory,
                    showLoadMsg: NO
                });
            }

            /* Save the current page in the view manager */
            M.ViewManager.setCurrentPage(page);
        } else {
            M.Logger.log('Page "' + page + '" not found', M.ERR);
        }
    },

    /**
     * This method initializes the notification of all observers, that observe the property behind 'key'.
     *
     * @param {String} key The key of the property to be changed.
     * @param {Object|String} value The value to be set.
     */
    set: function(key, value) {
        var keyPath = key.split('.');

        if(keyPath.length === 1) {
            this[key] = value;
        } else {
            var t = (this[keyPath[0]] = this[keyPath[0]] ? this[keyPath[0]] : {});
            for(var i = 1; i < keyPath.length - 1; i++) {
                t = (t[keyPath[i]] = t[keyPath[i]] ? t[keyPath[i]] : {});
            }

            t[keyPath[keyPath.length - 1]] = value;
        }

        if(!this.observable) {
            return;
        }

        this.observable.notifyObservers(key);
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * An associative array containing all views used in the application. The key for a view is
     * its id.
     *
     * @type Object
     */
    viewList: {},

    /**
     * An associative array containing all pages used in the application. The key for a page is
     * its id.
     *
     * @type Object
     */
    pageList: {},

    /**
     * A reference to the currently displayed page.
     *
     * @type Object
     */
    currentPage: null,

    /**
     * A reference to the currently rendered page.
     *
     * @type Object
     */
    currentlyRenderedPage: null,

    /**
     * A reference to the latest found view which is necessary for the findView() method.
     *
     * @type Object
     */
    foundView: null,

    /**
     * Returns the next Id build from nextId property incremented by 1 and the prefix.
     * The id is used as the value for the HTML attribute id.
     * 
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
        this.viewList[view.id] = view;

        if(view.type === 'M.PageView') {
            this.pageList[view.id] = view;
        }
    },

    /**
     * Unregisters the view from the viewlist array.
     *
     * @param {Object} view The view to be unregistered from the viewlist.
     */
    unregister: function(view) {
        delete this.viewList[view.id];
    },

    /**
     * Returns the view object from the view list array identified
     * by the value of its id attribute.
     *
     * @param {String} id The DOM id of the corresponding view object.
     * @returns {Object} The view object from the view list identified by id.
     */
    getViewById: function(id) {
        return this.viewList[id];
    },

	/**
     * another naming for getViewById - same same as getViewById
     *
     * @param {String} id The DOM id of the corresponding view object.
     * @returns {Object} The view object from the view list identified by id.
     */

    findViewById: function(id) {
        return this.getViewById(id);
    },

    /**
     * Returns the id for a given view.
     *
     * @param {Object} view The view for which the id value is wanted.
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
     * @param {String|Object} parentView The name of the parent view (if it is a page) or the parent view itself.
     * @param {String} targetView The name of the view to be returned.
     * @returns {Object} The view object from the view list identified by the view's name and the page where it's on.
     */
    getView: function(parentView, targetView) {
        if(typeof(parentView) !== 'object') {
            parentView = M.Application.pages[parentView] ? M.Application.pages[parentView] : (M.ViewManager.getViewById(parentView) ? M.ViewManager.getViewById(parentView) : null);
        }
        var view = null;

        /* reset previously found views before searching again */
        this.foundView = null;
        if(parentView) {
            view = this.findView(parentView, targetView);
        }

        if(!view) {
            M.Logger.log('view \'' + targetView + '\' not found.', M.WARN);
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
     * @param {Object} parentView The parent view to search in.
     * @param {String} targetView The name of the view to be returned.
     * @returns {Object} The last found view.
     */
    findView: function(parentView, targetView) {
        if(parentView.childViews) {
            var childViews = parentView.getChildViewsAsArray();
            for(var i in childViews) {
                if(targetView === childViews[i]) {
                    this.foundView =  parentView[targetView];
                    return this.foundView;
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
     * @param {String} pageName The name of the page to be returned.
     * @returns {Object} M.Page object identified by its name.
     */
    getPage: function(pageName) {
        var page = M.Application.pages[pageName];

        if(!page) {
            M.Logger.log('page \'' + pageName + '\' not found.', M.WARN);
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

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * This property is set to NO once the first page within an application was loaded. So this
     * can be used as a hook to trigger some actions at the first load of any view. To do initial
     * things for a specific view, use the isFirstLoad property of M.PageView.
     *
     * @type Boolean
     */
    isFirstLoad: YES,

    /**
     * This property can be used to define the application's entry page. If set, this page will
     * be the first to be displayed if your application is started.
     *
     * Even if this property is not absolutely necessary, we highly recommend to specify an entry
     * page! 
     *
     * @type String
     */
    entryPage: null,

    /**
     * This property contains the application-specific configurations. It is automatically set by Espresso
     * during the init process of an application. To access these properties within the application, use the
     * getConfig() method of M.Application.
     */
    config: {},

    /**
     * This method encapsulates the 'include' method of M.Object for better reading of code syntax.
     * Basically it integrates the defined pages within the application into M.Application and sets
     * some basic configuration properties, e.g. the default language.
     *
     * @param {Object} obj The mixed in object for the extend call.
     */
    design: function(obj) {
        var pages = {};
        for(var pageName in obj) {
            if(obj[pageName] && obj[pageName].type === 'M.PageView') {
                pages[pageName] = obj[pageName];
            }
        }      
        this.include({
            pages: pages
        });

        this.entryPage = ((obj.entryPage && typeof(obj.entryPage) === 'string') ? obj.entryPage : null);

        return this;
    },

    /**
     * The application's main-method, that is called automatically on load of the app.
     * Inside this method the rendering is initiated and all pages are bound to the 'pageshow'
     * event so one can do some action whenever a page is loaded.
     */
    main: function() {
        var that = this;

        /* first lets get the entry page and remove it from pagelist and viewlist */
        var entryPage = M.ViewManager.getPage(M.Application.entryPage);
        delete M.ViewManager.viewList[entryPage.id];
        delete M.ViewManager.pageList[entryPage.id];

        /* set the default id 'm_entryPage' for entry page */
        entryPage.id = 'm_entryPage';

        /* now lets render entry page to get it into the DOM first and set it as the current page */
        entryPage.render();
        M.ViewManager.setCurrentPage(entryPage);

        /* now lets render all other pages */
        _.each(M.ViewManager.pageList, function(page) {
            page.render();
        });

        /* finally add entry page back to pagelist and view list, but with new key 'm_entryPage' */
        M.ViewManager.viewList['m_entryPage'] = entryPage;
        M.ViewManager.pageList['m_entryPage'] = entryPage;
    },

    /**
     *
     * @param {String} key The key of the configuration value to want to retrieve.
     * @returns {String} The value in the application's config object with the key 'key'.
     */
    getConfig: function(key) {
        if(this.config[key]) {
            return this.config[key];
        }
        return null;
    }

});