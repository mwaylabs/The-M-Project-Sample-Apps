
MyContacts.ApplicationController = M.Controller.extend({

    showDetails: function(viewId, recordId) {

        switch(MyContacts.Tabs.activeTab.value) {   // constants defined in MyContacts.Tabs (tabs.js)

            case MyContacts.LS_TAB:
                MyContacts.LocalStorageController.showDetails(viewId, recordId);
            break;

            case MyContacts.WS_TAB:
                MyContacts.WebSqlController.showDetails(viewId, recordId);
            break;

            case MyContacts.R_TAB:
                MyContacts.RemoteStorageController.showDetails(viewId, recordId);
            break;

            case MyContacts.CDB_TAB:
                MyContacts.CouchDbController.showDetails(viewId, recordId);
            break;
            
        }
    }

});