/*global demoapp*/

demoapp.Collections = demoapp.Collections || {};

(function() {
    'use strict';

    demoapp.Collections.ContactsCollection = M.Collection.extend({
        // assign the contact model to this collection
        model: demoapp.Models.ContactModel,
        // the collection uses the localStorage of the browser through the M.LocalStorageStore
        store: M.LocalStorageStore.create( {})
    });

})();
