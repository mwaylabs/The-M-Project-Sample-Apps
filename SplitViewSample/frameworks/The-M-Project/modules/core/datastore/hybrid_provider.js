// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      25.02.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

M.TARGET_REMOTE = 'remote';
M.TARGET_LOCAL = 'local';
M.TARGET_BOTH = 'both';


m_require('core/utility/logger.js');

/**
 * @class
 *
 * 
 *
 * @extends M.Object
 */
M.DataProviderHybrid = M.Object.extend(
/** @scope M.DataProvider.prototype */ {

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

    onSuccess: null,

    onError: null,

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
                code: 123123,
                msg: 'No enough local data provider passed'
            });
        }
        if(!dp.config.remote) {
            throw M.Error.extend({
                code: 123123,
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
    find: function() {  

    },

    /**
     * 
     */
    save: function(obj) {
        this.setOriginCallbacks(obj);

        if(obj.target) {
            switch(obj.target) {

                case M.TARGET_LOCAL:
                    this.localProvider.save(obj);
                    break;

                case M.TARGET_REMOTE:
                    this.remoteProvider.save(obj);
                    break;

                case M.TARGET_BOTH:
                    this.localProvider.save(obj);
                    this.remoteProvider.save(obj);
                    break;
            }
        }


        this.localProvider.save(obj);
        this.remoteProvider.save(obj);
    },

    /**
     *
     */
    del: function() {

    },

    setOriginCallbacks: function(obj) {
        if (obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
            obj.onSuccess = this.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action]);
            this.onSuccess = obj.onSuccess;
        } else if(obj.onSuccess === 'function') {
            this.onSuccess = obj.onSuccess;
        }
    },

    handleSuccessCallback: function() {

    },

    handleErrorCallback: function() {
        
    }

});