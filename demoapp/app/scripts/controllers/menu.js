/*global demoapp*/

demoapp.Controllers = demoapp.Controllers || {};

(function() {
    'use strict';

    demoapp.Controllers.MenuController = M.Controller.extend({

        // The Content of the page
        contentView: null,

        // define contacts collection
        contacts: null,

        // use this model as reference to the form views
        newContact: null,

        // Called when the Application starts
        applicationStart: function () {
            // Create a layout and apply it to the application
            var layout = M.SwitchLayout.extend().create(this);
            // Set the Layout to the View
            demoapp.setLayout(layout);
            // Initialze the Collection
            this.initData();
            // Initialize the Views
            this.initViews();
            // Apply the Views to the Layout (render)
            this._applyViews();
        },

        show: function () {
            // Initialze the Collection
            this.initData();
            // Initialize the Views
            this.initViews();
            // Apply the Views to the Layout (render)
            this._applyViews();
            // Switch the Layout
            demoapp.getLayout().startTransition();
        },

        initViews: function(){
            // Create the MenuView with the controller (this) as scope
            this.contentView = demoapp.Views.MenuView.create(this);
        },

        _applyViews: function() {
            demoapp.getLayout().applyViews({
                content: this.contentView
            });
        },

        // Navigation: on button tap
        gotoDetailView: function(){
            // navigate to the detail view via a route
            demoapp.navigate({
                route: '/detail',
                transition: M.PageTransitions.CONST.FALL
            });
        },

        // initialze the data
        initData: function(){
            //create a model to store the first and the last name
            this.newContact = demoapp.Models.ContactModel.create();
            // create the contacts collections if it doesn't exist
            if(!this.contacts){
                this.contacts = demoapp.Collections.ContactsCollection.create(this.getContacts());
            }

        },

        // get the contacts
        getContacts: function(){
            // create some demo data
            return [{"name": 'foo', "lastname": "bar"}, {"name": 'max', "lastname": "mustermann"}];
        },

        addContact: function(){
            // add a new model instance based on the the new contact model to the collection
            this.contacts.add(demoapp.Models.ContactModel.create(this.newContact.attributes));
        }
    });

})();
