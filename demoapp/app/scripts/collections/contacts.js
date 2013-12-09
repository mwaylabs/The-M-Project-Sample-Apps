/*global demoapp*/

demoapp.Collections = demoapp.Collections || {};

(function() {
    'use strict';

    demoapp.Collections.ContactsCollection = M.Collection.extend({
        model: demoapp.Models.ContactModel
    });

})();
