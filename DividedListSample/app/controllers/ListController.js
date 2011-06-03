// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: DividedListSample
// Controller: ListController
// ==========================================================================

DividedListSample.ListController = M.Controller.extend({

    contacts: null,

    init: function() {

        M.Request.init({
            url: 'contacts.json',
            isJSON: YES,
            beforeSend: function(req) {
                //...
            },
            onSuccess: function(data){
                DividedListSample.ListController.set('contacts', data);
            },
            onError: function(request, message){
                console.log(message);
            }
        }).send();

    },

    searchStringDidChange: function(searchBar) {
        var searchBar = M.ViewManager.getViewById(searchBar);
        console.log(searchBar.value);
    }

});