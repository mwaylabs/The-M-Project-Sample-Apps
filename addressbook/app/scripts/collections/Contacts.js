/*global Addressbook, Backbone*/

Addressbook.Collections = Addressbook.Collections || {};

(function () {
    'use strict';

    Addressbook.Collections.ContactsCollection = M.Collection.extend({
        model: Addressbook.Models.ContactsModel,
        store: new M.BikiniStore({
            useLocalStore: NO
        }),
        url: 'http://ec2-23-23-24-142.compute-1.amazonaws.com:8200/bikini/contacts'
    });


})();
