// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: PersistentToolbar
// Controller: AppController
// ==========================================================================

PersistentToolbar.AppController = M.Controller.extend({

    /* sample controller property */
    headerTitle: '',


    init: function(isFirstLoad) {

        this.set("headerTitle", M.ViewManager.getCurrentPage().id);
    },

    next: function(){
        try{
            var page = Number(M.ViewManager.getCurrentPage().cssClass.split('Page')[1])+1;
            if(page >= 6){
                page = 1;
            }
            this.switchToPage('page' + page);
        }catch(e){
            console.log("something went terrible wrong. Why are you doing such crazy stuff. Note to the coder: you're made of stupid. Not you watcher :D");
        }
    },

    back: function(){
        try{
            var page = Number(M.ViewManager.getCurrentPage().cssClass.split('Page')[1])-1;
            if(page <= 0){
                page = 1;
            }
            this.switchToPage('page' + page);
        }catch(e){
            console.log("something went terrible wrong. Why are you doing such crazy stuff. Note to the coder: you're made of stupid. Not you watcher :D");
        }
    }


});
