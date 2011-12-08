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
 * @extends M.Object
 */
M.DataConsumer = M.Object.extend(
/** @scope M.DataProvider.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DataConsumer',

    responsePath: null,

    /**
     *
     * @param {Objec} obj The configuration parameters for the data consumer.
     */
    configure: function(obj) {
        return this.extend(obj);
    },

    /**
     * {
     *   urlParams: {
     *     query: 'html5',
     *     rpp: 10
     *   },
     *   appendRecords: YES,
     *   callbacks: {
     *     success: {
     *       target: MyApp.MyController,
     *       action: 'itWorked'
     *     },
     *     error: {
     *       action: function(e) {
     *         console.log(e);
     *       }
     *     }
     *   }
     * }
     *
     * urlParams will be provided to 'url' method of your store:
     *
     * url: function(query, rpp) {
     *   return 'http://www.myserver.com/request?query=' + query + '&rpp=' + rpp
     * }
     */
    find: function(obj) {
        var that = this;
        M.Request.init({
            url: this.bindToCaller(this, this.url, _.toArray(obj.urlParams))(),
            isJSON: YES,
            beforeSend: function(request) {
                //...
            },
            onSuccess: function(data, message, request){
                /* if no data was returned, skip this */
                if(data) {
                    /* apply response path */
                    if(that.responsePath) {
                     data = data[that.responsePath];
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
                            var record = obj.model.createRecord($.extend(that.map(d), {state: M.STATE_INSYNC}));
                            records.push(record);
                        });

                        /* call callback */
                        that.handleCallback(obj.callbacks, 'success', [obj.opId, {
                            operationType: 'find',
                            records: records
                        }]);
                    } else {
                        /* log message, that there were no data sets found in given response path */
                        M.Logger.log('There were no data sets found in response path \'' + that.responsePath + '\'.', M.INFO);

                        /* call callback */
                        that.handleCallback(obj.callbacks, 'success', [obj.opId, {
                            operationType: 'find',
                            records: []
                        }]);
                    }
                } else {
                    /* log message, that there were no data sets returned */
                    M.Logger.log('There was no data returned for url \'' + that.bindToCaller(this, this.url, _.toArray(obj.urlParams))() + '\'.', M.INFO);

                    /* call callback */
                    that.handleCallback(obj.callbacks, 'success', [obj.opId, {
                        operationType: 'find',
                        records: []
                    }]);
                }
            },
            onError: function(request, message){
                /* call callback */
                that.handleCallback(obj.callbacks, 'error', [obj.opId, {
                    operationType: 'find',
                    error: message
                }]);
            }
        }).send();
    },

    /**
     * Handles Callbacks for data providers. Checks if callbacks are passed to the provider and calls them with
     * the right parameters.
     * @param obj
     * @param callbackName
     * @param callbackArgs
     */
    handleCallback: function(callbacks, callbackName, callbackArgs) {
        if(callbacks && callbacks[callbackName] && M.EventDispatcher.checkHandler(callbacks[callbackName])) {
            this.bindToCaller(callbacks[callbackName].target, callbacks[callbackName].action, callbackArgs)();
        }
    }

});