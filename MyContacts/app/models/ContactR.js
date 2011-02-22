// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9-pre
//
// Project: MyContacts
// Model: ContactR
// ==========================================================================

MyContacts.ContactR = M.Model.create({
    __name__: 'ContactR', // do not delete this property!

    firstName: M.Model.attr('String', {
        isRequired:YES
    }),

    lastName: M.Model.attr('String', {
        isRequired:YES
    }),

    street: M.Model.attr('String', {
        isRequired:YES
    }),

    number: M.Model.attr('String', {
        isRequired:YES
    }),

    zip: M.Model.attr('String', {
        isRequired:NO
    }),

    city: M.Model.attr('String', {
        isRequired: YES
    }),

    phone: M.Model.attr('String', {
        isRequired:NO
    })

}, M.DataProviderRemoteStorage.configure({
    /**
     * tableName: {
     *   crud_method: {
     *     url: 'url',
     *     httpMethod: 'GET'
     *   }
     * }
     */

    'ContactR': {
        url: '/contacts_heroku',

        identifier: 'id',

        //attrMapping: {
            /* remoteAttr: sourceAttr */
            /*'firstName': 'firstName',
            'lastName': 'lastName',
            'street': 'street',
            'city': 'lastName',
            'zip': 'zip',
            'id': 'ID'
        },*/

        init : {
            initFirst: NO,
            url: '/contacts',
            httpMethod: 'PUT'
        },

        create: {
            url: function(id) {
                return '/contacts.json'
            },
            httpMethod: 'POST',

            /* needs to return obj that can be passed to M.Request.data (is serialized before request) */
            map: function(obj) {
                var o = {
                    firstName: obj.firstName,
                    lastName: obj.lastName,
                    street: obj.street,
                    number: obj.number,
                    zip: obj.zip,
                    city : obj.city,
                    phone: obj.phone
                };
                o['created_at'] = obj[M.META_CREATED_AT];
                o['updated_at'] = obj[M.META_UPDATED_AT];

                return {
                    contact:o
                };
            }
        },

        read: {

            url: {
                one: function(id) {
                    return '/contacts/' + id + '.json'
                    /* url for fetching one entity */
                },
                all: function(id) {
                    return '/contacts.json'
                    /* url for fetching all entities */
                }
            },

            httpMethod: 'GET',

            /* map needs to return record obj which can be handled by createRecord */
            map: function(obj) {
                var o = {
                    ID: obj.contact.id,
                    firstName: obj.contact.firstName,
                    lastName: obj.contact.lastName,
                    street: obj.contact.street,
                    number: obj.contact.number,
                    zip: obj.contact.zip,
                    city : obj.contact.city,
                    phone: obj.contact.phone
                };
                o[M.META_CREATED_AT] = obj.contact.created_at;
                o[M.META_UPDATED_AT] = obj.contact.updated_at;
                return o;
            }
        },

        update: {
            url: function(id) {
                return '/contacts/' + id + '.json'
            },
            httpMethod: 'PUT',
            map: function(obj) {
                var o = {
                    firstName: obj.firstName,
                    lastName: obj.lastName,
                    street: obj.street,
                    number: obj.number,
                    zip: obj.zip,
                    city : obj.city,
                    phone: obj.phone
                };
                o['created_at'] = obj[M.META_CREATED_AT];
                o['updated_at'] = obj[M.META_UPDATED_AT];

                return {
                    contact:o
                };
            }
        },

        del: {
            url: function(id) {
                return '/contacts/' + id + '.json'
            },
            httpMethod: 'DELETE'
        }
    }}
        ));