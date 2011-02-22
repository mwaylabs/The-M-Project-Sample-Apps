// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9-pre
//
// Project: MyContacts 
// ==========================================================================

var MyContacts  = MyContacts || {};

MyContacts.app = M.Application.design({

    entryPage : 'localStorageContacts', // define the entry/start page of your app. This property must be provided!

    localStorageContacts: MyContacts.LocalStoragePage,
    localStorageAdd: MyContacts.LocalStorageAddContactPage,
    localStorageContactDetails: MyContacts.LocalStorageContactDetailsPage,

    webSqlContacts: MyContacts.WebSqlPage,
    webSqlAdd: MyContacts.WebSqlAddContactPage,
    webSqlContactDetails: MyContacts.WebSqlContactDetailsPage,

    remoteContacts: MyContacts.RemotePage,
    remoteAdd: MyContacts.RemoteAddContactPage,
    remoteContactDetails: MyContacts.RemoteContactDetailsPage,
    
    couchDbContacts: MyContacts.CouchDbPage,
    couchDbAdd: MyContacts.CouchDbAddContactPage,
    couchDbContactDetails: MyContacts.CouchDbContactDetailsPage

});