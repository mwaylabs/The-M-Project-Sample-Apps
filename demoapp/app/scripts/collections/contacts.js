/*global demoapp*/

demoapp.Collections = demoapp.Collections || {};

(function() {
    'use strict';

    demoapp.Collections.ContactsCollection = M.Collection.extend({
        model: demoapp.Models.ContactModel,
        store: M.BikiniStore.create( {
            useLocalStore:   true, // (default) store the data for offline use
            useOfflineChanges: true // (default) allow changes to the offline data
        })
    });

})();
