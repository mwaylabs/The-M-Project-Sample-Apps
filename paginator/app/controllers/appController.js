// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: paginator
// Controller: appController
// ==========================================================================

paginator.appController = M.Controller.extend({

    /* sample controller property */
    list: '',

    /*
    * Sample function
    * To handle the first load of a page.
    */
    init: function(isFirstLoad) {
        if(isFirstLoad) {
            /* do something here, when page is loaded the first time. */
        }
        /* do something, for any other load. */
		this.set('list', [{objectID: 'dasf'}, {objectID: 'asdf'}, {objectID: 3},{objectID: 4},{objectID: 5},{objectID: 6},{objectID: 7},{objectID: 8},{objectID: 9}]);
    },

    /*
    * Example function, which shows how to switch to another page
    * Function is triggered by setting target & action in a view.
    */
    switchToExamplePage: function() {
        /* switch to a page called 'examplePage' */
        this.switchToPage('examplePage');
    }

});
