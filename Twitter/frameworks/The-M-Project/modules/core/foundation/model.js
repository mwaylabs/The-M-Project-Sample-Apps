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

M.STATE_NEW = 'state_new';
M.STATE_NEW_VALID = 'state_new_valid';
M.STATE_NEW_INVALID = 'state_new_invalid';
M.STATE_DIRTY = 'state_dirty';
M.STATE_DIRTY_VALID = 'state_dirty_valid';
M.STATE_DIRTY_INVALID = 'state_dirty_invalid';
M.STATE_INSYNC = 'state_insync';
M.STATE_DELETED = 'state_deleted';

m_require('core/data/model_registry.js');

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
     * The model's data defines the properties that are semantically bound to this model:
     * e.g. a person's data is (in simplest case): firstname, lastname, age.
     *
     * @type Object data
     */
    data: null,

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


    state_remote: M.STATE_UNDEFINED,

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
            m_id: obj.m_id ? obj.m_id : M.ModelRegistry.getNextId(this.name),
            data: obj /* properties that are added to data here, but are not part of __meta, are deleted later (see below) */
        });
        delete obj.m_id;
        rec.state = obj.state ? obj.state : M.STATE_NEW;
        delete obj.state;

        /* set timestamps if new */
        if(rec.state === M.STATE_NEW) {
            rec.data[M.Application.getConfig('timeStampCreated')] = +new Date();//M.Date.now().format('yyyy/mm/dd HH:MM:ss');
            rec.data[M.Application.getConfig('timeStampUpdated')] = +new Date();//M.Date.now().format('yyyy/mm/dd HH:MM:ss');
        }

        for(var i in rec.data) {

            if(i === 'ID' || i === M.Application.getConfig('timeStampCreated') || i === M.Application.getConfig('timeStampUpdated')) {
                continue;
            }

            /* if data contains properties that are not part of __meta (means that are not defined in the model blueprint) delete them */
            if(!rec.__meta.hasOwnProperty(i)) {
                M.Logger.log('Model ' + this.name + ' has no property called ' + i, M.WARN);
                delete rec.data[i];
                continue;
            }

            /* if reference to a data entity is in param obj, assign it like in set. */
            if(rec.__meta[i].dataType === 'Reference' && rec.data[i] && rec.data[i].type && rec.data[i].type === 'M.Model') {
                // call set of model
                rec.set(i, rec.data[i]);
            }
            
            if(rec.__meta[i]) {
                rec.__meta[i].isUpdated = NO;    
            }
        }

        //this.recordManager.add(rec);
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
    create: function(obj) {
        var model = M.Model.extend({
            __meta: {},
            name: obj.__name__,
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
        model.__meta[M.Application.getConfig('timeStampCreated')] = this.attr('String', { // could be 'Date', too
            isRequired:YES
        });
        model.__meta[M.Application.getConfig('timeStampUpdated')] = this.attr('String', { // could be 'Date', too
            isRequired:YES
        });

        /* CouchDB documents have a rev property for managing versions*/
        /*if(model.dataProvider.type === 'M.DataProviderCouchDb') {
            model.__meta['rev'] = this.attr('String', {
                isRequired:NO
            });     
        }

        model.recordManager = M.RecordManager.extend({records:[]});

         if dataprovider is WebSqlProvider, create table for this model and add ID ModelAttribute Object to __meta */
        /*if(model.dataProvider.type === 'M.DataProviderWebSql') {
            model.dataProvider.init({model: model, onError:function(err){M.Logger.log(err, M.ERR);}}, function() {});
            model.dataProvider.isInitialized = YES;
        }*/

        M.ModelRegistry.register(model.name);

        /* save model in modelList with model name as key */
        this.modelList[model.name] = model;

        /* Re-set the just registered model's id, if there is a value stored */
        /* Model Registry stores the current id of a model type into localStorage */
        var m_id = localStorage.getItem(M.Application.getConfig('keyPrefix') + M.Application.name + M.Application.getConfig('keySuffix') + model.name);
        if(m_id) {
            M.ModelRegistry.setId(model.name, parseInt(m_id));
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
        var recProp = this.data[propName];
        /* return ref entity if property is a reference */
        if(metaProp && metaProp.dataType === 'Reference') {
            if(metaProp.refEntity) {// if entity is already loaded and assigned here in model data
                return metaProp.refEntity;
            } else if(recProp) { // if model data has a reference set, but it is not loaded yet
                if(obj && obj.force) { // if force flag was set
                    /* custom call to deepFind with data passed only being the one property that needs to be filled, type of dp checked in deepFind */
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
            if(this.data[propName] !== val.m_id) {
                /* set m_id of reference in data */
                this.data[propName] = val.m_id;

                this.__meta[propName].refEntity = val;
            }
            return;
        }

        if(this.data[propName] !== val) {
            this.data[propName] = val;
            this.__meta[propName].isUpdated = YES;

            /* now set the record's state to dirty */
            this.state = M.STATE_DIRTY;

            /* mark data as updated with new timestamp*/
            this.data[M.Application.getConfig('timeStampUpdated')] = M.Date.now().format('yyyy/mm/dd HH:MM:ss');
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
    // MOVE TO STORE
    find: function(obj){
        if(!this.dataProvider) {
            M.Logger.log('No data provider given for this store.', M.ERR);
            return;
        }
        obj = obj ? obj : {};
        /* check if the record list shall be cleared (default) before new found model records are appended to the record list */
        /* TODO: handle in store / DP
        obj['deleteRecordList'] = obj['deleteRecordList'] ? obj.deleteRecordList : YES;
        if(obj.deleteRecordList) {
            this.recordManager.removeAll();
        }*/

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
    // MOVE TO STORE
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

    // MOVE TO STORE
    bulkImport: function(obj){
        if(!this.dataProvider) {
            M.Logger.log('No data provider given.', M.ERR);
        }
        if(this.dataProvider.type !== 'M.DataProviderWebSql') {
            var err = M.Error.extend({

            });

            if (obj.onError && obj.onError.target && obj.onError.action) {
                obj.onError = that.bindToCaller(obj.onError.target, obj.onError.target[obj.onError.action], err);
                obj.onError();
            } else if (typeof(obj.onError) === 'function') {
                obj.onError(err);
            } else {
                M.Logger.log('Target and action in onError not defined.', M.ERR);
            }
            return NO;
        }
        obj = obj ? obj : {};
        /* extends the given obj with self as model property in obj */
        return this.dataProvider.bulkImport( $.extend(obj, {model: this}) );
    },

    /**
     * Delete a record in storage.
     * @returns {Boolean} Indicating whether deletion was successful or not (only with synchronous data providers, e.g. LocalStorage). When asynchronous data providers
     * are used, e.g. WebSQL provider the real result comes asynchronous and here just the result of the del() function call of the @link M.WebSqlProvider is used.
     */
    // MOVE TO STORE
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
            return YES
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

    // TODO: handle onSuccess AND onError
    // MOVE TO STORE
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

            case 'M.DataProviderWebSql':
                this.modelList[curRec.name].find({     // call find on to fetched model record object
                    constraint: {
                        statement: 'WHERE ' + M.META_M_ID + ' = ? ',
                        parameters: [curRec.m_id] // length must match number of ? in statements
                    },

                    onSuccess: function(result) {
                        that.setReference(result, that, curRec.prop, cb);
                    },
                    onError: function(err) {
                        M.Logger.log('Error: ' + err, M.ERR);
                    }
                });

                break;

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
    },

    /**
     * sync model with storage (only websql)
     */
    // MOVE TO STORE
    schemaSync: function() {

    }

});