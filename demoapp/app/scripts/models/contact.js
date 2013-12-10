/*global demoapp*/

demoapp.Models = demoapp.Models || {};

(function() {
    'use strict';

    demoapp.Models.ContactModel = M.Model.extend({
        // an id for every entry
        idAttribute: '_id',
        // the entity
        entity: {
            // profide a name to identify the collection/model
            name: 'contact',
            fields: {
                // the identifier of the model
                _id: { type: M.CONST.TYPE.STRING, required: YES, index: YES },
                // the name of the model
                name: { type: M.CONST.TYPE.STRING },
                // the lastnamename of the model
                lastname: { type: M.CONST.TYPE.STRING }
            }
        }
    });

})();
