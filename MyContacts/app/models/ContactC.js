// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9-pre
//
// Project: MyContacts
// Model: ContactC
// ==========================================================================

MyContacts.ContactC = M.Model.create({
    __name__: 'ContactC', // do not delete this property!

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

}, M.DataProviderCouchDb.configure({
    dbName: 'my_contacts',
    url: '/couchone'
}));