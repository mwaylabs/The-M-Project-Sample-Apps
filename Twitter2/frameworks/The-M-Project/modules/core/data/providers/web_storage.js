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

m_require('core/data/data_provider.js');


M.WEBSTORAGE_LOCAL = 'localstorage';

M.WEBSTORAGE_SESSION = 'webstorage';

/**
 * @class
 * 
 * Encapsulates access to the Web Storage (in-browser key value store). It can be either the LocalStorage or SessionStorage.
 * LocalStorage is an in-browser key-value store to permanently persist data.
 * SessionStorage is also an in-browser key-value store but only persists data for the lifetime of browser window/tab.
 * This data provider persists model records as JSON strings with their name and id as key.
 * When fetching these strings from storage, their automatically converted in their corresponding model records.
 *
 * Operates synchronous.
 *
 * @extends M.DataProvider
 */
M.DataProviderWebStorage = M.DataProvider.extend(
/** @scope M.DataProviderWebStorage.prototype */ {

    /**
     * The type of this object.
     * @type String
     */
    type: 'M.DataProviderWebStorage',

    /**
     * The storage object. Either window.localStorage or window.sessionStorage
     */
    storage: null,

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
        /* if more that one record is passed, bulk-save them */
        if(_.isArray(obj.record)) {
            var isTransactionValid = YES;
            var txResult = [];
            var txTotal = Math.ceil(obj.record.length/obj.transactionSize);

            /* iterate through all transactions */
            for(var tx = 0; tx < txTotal; tx++) {
                /* iterate through all operations within the current transaction */
                for(var op = 0 + tx * obj.transactionSize; op < (tx + 1) * obj.transactionSize; op++) {
                    /* OPERATION */
                    try {
                        /* save the record (or at least try...) */
                        this.saveRecord(obj.record[op]);

                        /* if it worked (no exception thrown), update its state, store in transaction-array and call success-callback */
                        obj.record[op].state = M.STATE_INSYNC;
                        txResult.push(obj.record[op]);
                        this.handleCallback(obj.callbacks, 'successOp', [obj.opId, {
                            operationType: 'save',
                            record: obj.record[op],
                            opCount: op + 1,
                            opTotal: obj.record.length,
                            txCount: tx + 1,
                            txTotal: txTotal,
                            txOpCount: op  + 1 - (tx * obj.transactionSize),
                            txOpTotal: tx + 1 === txTotal ? obj.record.length % obj.transactionSize : obj.transactionSize
                        }]);
                    } catch(e) {
                        /* if save went wrong (exception thrown), leave operation loop and call error-callback */
                        isTransactionValid = NO;
                        M.Logger.log('Error saving record to localStorage with key: ' + this.keyPrefix + M.Application.name + this.keySuffix + obj.record[op].name + '_' + obj.record[op].m_id, M.WARN);

                        /* error callback for single operation */
                        this.handleCallback(obj.callbacks, 'errorOp', [obj.opId, {
                            operationType: 'save',
                            error: 'Error saving record to localStorage with key: ' + this.keyPrefix + M.Application.name + this.keySuffix + obj.record[op].name + '_' + obj.record[op].m_id
                        }]);
                        break;
                    }
                    if(op === obj.record.length) {
                        break;
                    }
                }

                /* TRANSACTION */
                /* if flag is set to YES, everything is fine, so call success-callback of this transaction */
                if(isTransactionValid) {
                    this.handleCallback(obj.callbacks, 'successTx', [obj.opId, {
                        operationType: 'save',
                        records: txResult,
                        txCount: tx + 1,
                        txTotal: txTotal
                    }]);
                    txResult = [];
                /* if flag is set to NO, something went wrong, so call error-callback of this transaction and leave transaction loop */
                } else {
                    this.handleCallback(obj.callbacks, 'errorTx', [obj.opId, {
                        operationType: 'save',
                        error: 'Error saving record to localStorage with key: ' + this.keyPrefix + M.Application.name + this.keySuffix + obj.record[op].name + '_' + obj.record[op].m_id + '. Transaction #' + (tx + 1) + ' terminated.'
                    }]);
                    break;
                }
            }

            /* GLOBAL */
            /* if flag is set to YES, the whole save process went well, so call global success-callback */
            if(isTransactionValid) {
                this.handleCallback(obj.callbacks, 'success', [obj.opId, {
                    operationType: 'save',
                    records: obj.record
                }]);
            /* if flag is set to NO, something went wrong during the save process, so call global error-callback */
            } else {
                this.handleCallback(obj.callbacks, 'error', [obj.opId, {
                    operationType: 'save',
                    error: 'Error saving record to localStorage with key: ' + this.keyPrefix + M.Application.name + this.keySuffix + obj.record[op].name + '_' + obj.record[op].m_id + '. Transaction #' + (tx + 1) + ' terminated and whole save process terminated.'
                }]);
            }
        /* if only a single record is passed, save it */
        } else {
            try {
                /* save the record (or at least try...) */
                this.saveRecord(obj.record);
                
                /* if it worked (no exception thrown), update its state and call success-callback */
                obj.record.state = M.STATE_INSYNC;
                this.handleCallback(obj.callbacks, 'success', [obj.opId, {
                    operationType: 'save',
                    records: obj.record
                }]);
            } catch(e) {
                /* if save went wrong (exception thrown) and call error-callback */
                M.Logger.log('Error saving record to localStorage with key: ' + this.keyPrefix + M.Application.name + this.keySuffix + obj.record.name + '_' + obj.record.m_id, M.WARN);
                this.handleCallback(obj.callbacks, 'error', [obj.opId, {
                    operationType: 'save',
                    error: 'Error saving record to localStorage with key: ' + this.keyPrefix + M.Application.name + this.keySuffix + obj.record.name + '_' + obj.record.m_id
                }]);
            }
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
        /* if more that one record is passed, bulk-delete them */
        if(_.isArray(obj.record)) {
            var isTransactionValid = YES;
            var txResult = [];
            var txTotal = Math.ceil(obj.record.length/obj.transactionSize);
            var invalidOp = null;

            /* iterate through all transactions */
            for(var tx = 0; tx < txTotal; tx++) {
                /* iterate through all operations within the current transaction */
                for(var op = 0 + tx * obj.transactionSize; op < (tx + 1) * obj.transactionSize; op++) {
                    /* OPERATION */
                    try {
                        /* delete the record (or at least try...) */
                        this.delRecord(obj.record[op]);

                        /* if it worked (no exception thrown), store in transaction-array and call success-callback */
                        txResult.push(obj.record[op]);
                        this.handleCallback(obj.callbacks, 'successOp', [obj.opId, {
                            operationType: 'del',
                            record: obj.record[op],
                            opCount: op + 1,
                            opTotal: obj.record.length,
                            txCount: tx + 1,
                            txTotal: txTotal,
                            txOpCount: op + 1 - (tx * obj.transactionSize),
                            txOpTotal: tx + 1 === txTotal ? obj.record.length % obj.transactionSize : obj.transactionSize
                        }]);
                    } catch(e) {
                        /* if del went wrong (exception thrown), set the state, leave operation loop and call error-callback */
                        obj.record[op].state = M.STATE_DELETED;
                        invalidOp = op;
                        isTransactionValid = NO;
                        M.Logger.log('Error deleting record from localStorage with key: ' + this.keyPrefix + M.Application.name + this.keySuffix + obj.record[op].name + '_' + obj.record[op].m_id, M.WARN);

                        /* error callback for single operation */
                        this.handleCallback(obj.callbacks, 'errorOp', [obj.opId, {
                            operationType: 'del',
                            error: 'Error deleting record from localStorage with key: ' + this.keyPrefix + M.Application.name + this.keySuffix + obj.record[op].name + '_' + obj.record[op].m_id
                        }]);
                        break;
                    }
                    if(op === obj.record.length) {
                        break;
                    }
                }

                /* TRANSACTION */
                /* if flag is set to YES, everything is fine, so call success-callback of this transaction */
                if(isTransactionValid) {
                    this.handleCallback(obj.callbacks, 'successTx', [obj.opId, {
                        operationType: 'del',
                        records: txResult,
                        txCount: tx + 1,
                        txTotal: txTotal
                    }]);
                    txResult = [];
                /* if flag is set to NO, something went wrong, so call error-callback of this transaction and leave transaction loop */
                } else {
                    /* mark all records (within this transaction), that could not be deleted as STATE_DELETED */
                    for(var op = invalidOp; op < (tx + 1) * obj.transactionSize; op++) {
                        obj.record[op].state = M.STATE_DELETED;
                        if(op === obj.record.length) {
                            break;
                        }
                    }
                    this.handleCallback(obj.callbacks, 'errorTx', [obj.opId, {
                        operationType: 'del',
                        error: 'Error deleting record from localStorage with key: ' + this.keyPrefix + M.Application.name + this.keySuffix + obj.record[invalidOp].name + '_' + obj.record[invalidOp].m_id + '. Transaction #' + (tx + 1) + ' terminated.'
                    }]);
                    break;
                }
            }

            /* GLOBAL */
            /* if flag is set to YES, the whole save process went well, so call global success-callback */
            if(isTransactionValid) {
                this.handleCallback(obj.callbacks, 'success', [obj.opId, {
                    operationType: 'del',
                    records: obj.record
                }]);
            /* if flag is set to NO, something went wrong during the save process, so call global success-callback */
            } else {
                /* mark all records, that could not be deleted as STATE_DELETED */
                for(var op = invalidOp; op < obj.record.length; op++) {
                    obj.record[op].state = M.STATE_DELETED;
                }
                this.handleCallback(obj.callbacks, 'error', [obj.opId, {
                    operationType: 'del',
                    error: 'Error deleting record from localStorage with key: ' + this.keyPrefix + M.Application.name + this.keySuffix + obj.record[invalidOp].name + '_' + obj.record[invalidOp].m_id + '. Transaction #' + (tx + 1) + ' terminated and whole save process terminated.'
                }]);
            }
        /* if only a single record is passed, save it */
        } else {
            try {
                /* delete the record (or at least try...) */
                this.delRecord(obj.record);

                /* if it worked (no exception thrown), update its state and call success-callback */
                this.handleCallback(obj.callbacks, 'success', [obj.opId, {
                    operationType: 'del',
                    records: obj.record
                }]);
            } catch(e) {
                /* if save went wrong (exception thrown) and call error-callback */
                M.Logger.log('Error deleting record from localStorage with key: ' + this.keyPrefix + M.Application.name + this.keySuffix + obj.record.name + '_' + obj.record.m_id, M.WARN);
                this.handleCallback(obj.callbacks, 'error', [obj.opId, {
                    operationType: 'del',
                    error: 'Error deleting record from localStorage with key: ' + this.keyPrefix + M.Application.name + this.keySuffix + obj.record.name + '_' + obj.record.m_id
                }]);
            }
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
        // map id property to key property --> refactor data provider and use 'id' instead of 'key'
        obj.key = obj.id;

        if(obj.key) {
            var record = this.findByKey(obj);
            if(!record) {
                this.handleCallback(obj.callbacks, 'error', [obj.opId, {
                    operationType: 'find',
                    error: 'No item found with key ' + obj.key + '.'
                }]);
                return NO;
            }
            /*construct new model record with the saved id*/
            var reg = new RegExp('^' + this.keyPrefix + M.Application.name + this.keySuffix + obj.model.name + '_([0-9]+)').exec(obj.key);
            var m_id = reg && reg[1] ? reg[1] : null;
            if (!m_id) {
                this.handleCallback(obj.callbacks, 'error', [obj.opId, {
                    operationType: 'find',
                    error: 'The retrieved model has no valid key: ' + obj.key
                }]);
                M.Logger.log('retrieved model has no valid key: ' + obj.key, M.ERR);
                return NO;
            }
            var rec = obj.model.createRecord($.extend(record, {m_id: parseInt(m_id), state: M.STATE_INSYNC}));

            this.handleCallback(obj.callbacks, 'success', [obj.opId, {
                operationType: 'find',
                records: rec
            }]);
        } else if(obj.query){
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
                var records = this.findAll(obj, YES);
                switch(op) {
                    case '=':
                        records = _.select(records, function(record){
                            return record.data[ident] === val;
                        });
                        break;
                    case '!=':
                        records = _.select(records, function(o){
                            return o.data[ident] !== val;
                        });
                        break;
                    case '<':
                        records = _.select(records, function(o){
                            return o.data[ident] < val;
                        });
                        break;
                    case '>':
                        records = _.select(records, function(o){
                            return o.data[ident] > val;
                        });
                        break;
                    case '<=':
                        records = _.select(records, function(o){
                            return o.data[ident] <= val;
                        });
                        break;
                    case '>=':
                        records = _.select(records, function(o){
                            return o.data[ident] >= val;
                        });
                        break;
                    default:
                        this.handleCallback(obj.callbacks, 'error', [obj.opId, {
                            operationType: 'find',
                            error: 'Unknown operator in query: ' + op
                        }]);
                        records = null;
                        M.Logger.log('Unknown operator in query: ' + op, M.WARN);
                        break;
                }
            } else {
                this.handleCallback(obj.callbacks, 'error', [obj.opId, {
                    operationType: 'find',
                    error: 'Query does not satisfy query grammar.'
                }]);
                M.Logger.log('Query does not satisfy query grammar.', M.WARN);
                return NO;
            }
            if(records) {
                this.handleCallback(obj.callbacks, 'success', [obj.opId, {
                    operationType: 'find',
                    records: records
                }]);
            }
        } else { /* if no query is passed, all models for modelName shall be returned */
            this.findAll(obj);
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
        var reg = new RegExp('^' + this.keyPrefix + M.Application.name + this.keySuffix);
        /* assume that if key starts with local storage prefix, correct key is given, other wise construct it and key might be m_id */
        obj.key = reg.test(obj.key) ? obj.key : this.keyPrefix + M.Application.name + this.keySuffix + obj.model.name + '_' + obj.key;

        // if key is available
        if(this.storage.getItem(obj.key)) {
            return this.buildRecord(obj.key, obj)
        } else {
            return NO;
        }
    },

    /**
     * Returns all models defined by modelName.
     *
     * Models are saved with key: Modelname_ID, e.g. Note_123
     *
     * @param {Object} obj The param obj, includes model
     * @returns {Object} The array of fetched objects/model records. If no records the array is empty.
     */
    findAll: function(obj, isInternalCall) {

        var result = [];
        for(var i = 0; i < this.storage.length; i++) {
            var k = this.storage.key(i);
            regexResult = new RegExp('^' + this.keyPrefix + M.Application.name + this.keySuffix + obj.model.name + '_').exec(k);
            if(regexResult) {
                var record = this.buildRecord(k, obj);//JSON.parse(this.storage.getItem(k));

                /*construct new model record with the saved m_id*/
                var reg = new RegExp('^' + this.keyPrefix + M.Application.name + this.keySuffix + obj.model.name + '_([0-9]+)').exec(k);
                var m_id = reg && reg[1] ? reg[1] : null;
                if(!m_id) {
                    M.Logger.log('Model Record m_id not correct: ' + m_id, M.ERR);
                    continue; // if m_id does not exist, continue with next record element
                }
                var m = obj.model.createRecord($.extend(record, {m_id: parseInt(m_id), state: M.STATE_INSYNC}));
                
                result.push(m);
            }
        }

        if(isInternalCall) {
            return result;
        }

        var isTransactionValid = YES;
        obj.transactionSize = obj.transactionSize || result.length;

        var txResult = [];
        var txTotal = Math.ceil(result.length/obj.transactionSize);

        // TODO: ADD PSEUDO ERROR-CALLBACKS
        for(var tx = 0; tx < txTotal; tx++) {
            for(var op = 0 + tx * obj.transactionSize; op < (tx + 1) * obj.transactionSize; op++) {
                txResult.push(result[op]);
                this.handleCallback(obj.callbacks, 'successOp', [obj.opId, {
                    operationType: 'find',
                    opCount: op + 1,
                    opTotal: result.length,
                    record: result[op],
                    txCount: tx + 1,
                    txTotal: txTotal,
                    txOpCount: op + 1 - (tx * obj.transactionSize),
                    txOpTotal: tx + 1 === txTotal ? result.length % obj.transactionSize : obj.transactionSize
                }]);
                if(op === result.length) {
                    break;
                }
            }
            this.handleCallback(obj.callbacks, 'successTx', [obj.opId, {
                operationType: 'find',
                records: txResult,
                txCount: tx + 1,
                txTotal: txTotal
            }]);
            txResult = [];
        }
        this.handleCallback(obj.callbacks, 'success', [obj.opId, {
            operationType: 'find',
            records: result
        }]);
        
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
        var record = JSON.parse(this.storage.getItem(key));
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
        for (var i = 0; i < this.storage.length; i++){
            var k = this.storage.key(i)
            regexResult = new RegExp('^' + this.keyPrefix + M.Application.name + this.keySuffix + obj.record.name + '_').exec(k);
            if(regexResult) {
                keys.push(k);
            }
        }
        return keys;
    },

    configure: function(obj) {
        obj = obj || {};
        switch(obj.storage) {
            case M.WEBSTORAGE_SESSION:
                obj.storage = window.sessionStorage; // maybe check if possible
                break;
            case M.WEBSTORAGE_LOCAL:
            default:
                obj.storage = window.localStorage;
                break;
        }

        obj.keyPrefix = obj.keyPrefix ? obj.keyPrefix : M.Application.getConfig('keyPrefix');
        obj.keySuffix = obj.keySuffix ? obj.keySuffix : M.Application.getConfig('keySuffix');

        return this.extend(obj);
    },

    saveRecord: function(record) {
        /* convert record's data to JSON string */
        try {
            var value = JSON.stringify(record.data);
        } catch(e) {
            /* extendable... */
            M.Logger.log(e, M.ERR);
            throw e;
        }

        /* store JSON string in web storage */
        try {
            this.storage.setItem(this.keyPrefix + M.Application.name + this.keySuffix + record.name + '_' + record.m_id, value);
        } catch(e) {
            /* extendable... */
            M.Logger.log(e, M.ERR);
            throw e;
        }
    },

    delRecord: function(record) {
        /* delete record from web storage */
        try {
            this.storage.removeItem(this.keyPrefix + M.Application.name + this.keySuffix + record.name + '_' + record.m_id);
        } catch(e) {
            /* extendable... */
            M.Logger.log(e, M.ERR);
            throw e;
        }
    }
});