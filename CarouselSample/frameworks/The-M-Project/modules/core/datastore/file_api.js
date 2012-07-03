// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2012 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      27.03.2012
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/data_provider.js');

/**
 * @class
 *
 * Saves records as files in filesystem of mobile device.
 *
 * Depends on PhoneGap's File API and though can only be used in native containers with PhoneGap environment
 *
 * @extends M.DataProvider
 */
M.DataProviderFileAPI = M.DataProvider.extend(
    /** @scope M.DataProviderFileAPI.prototype */ {

        /**
         * The type of this object.
         * @type String
         */
        type:'M.DataProviderFileAPI',


        configure:function (obj) {
            function onDeviceReady() {

            }
        },



        /**
         *
         */
        save:function (obj) {
            try {

            } catch (e) {

            }

        },

        /**
         *
         */
        del:function (obj) {
            try {

            } catch (e) {

            }
        },

        /**
         *
         */
        find:function (obj) {
            if (obj.key) {

            }

            if (obj.query) {

            }
        },

        /**
         *
         */
        findByKey:function (obj) {

            return NO;
        },

        /**
         *
         */
        findAll:function (obj) {

            return result;
        },

        /**
         *
         */
        buildRecord:function (key, obj) {

            return record;
        },

        /**
         *
         */
        allKeys:function (obj) {
            return keys;
        }
    });
