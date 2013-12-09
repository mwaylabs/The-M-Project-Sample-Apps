/*global demoapp*/

demoapp.Views = demoapp.Views || {};

(function() {
    'use strict';

    demoapp.Views.MenuView = M.View.extend({
        // The properties of a view

        // The view should be in a grid
        grid: 'col-xs-12',
        // Every view has a value
        value: 'Menu'
    }, {
        // The childViews

        // Add a button to navigate to the MenuView
        button: M.ButtonView.extend({
            // The Text of the Button
            value: 'To the Detail View',
            // The events of the button
            events: {
                // On tab call the scope method 'gotoMenuPage' (scope is the MenuController)
                tap: 'gotoDetailView'
            }
        }),

        // an input field for the lastname
        addLastName: M.TextfieldView.extend({
            // fit into the grid
            grid: 'col-xs-12',
            // label it as lastname with a placeholder ...
            placeholder: 'Lastname',
            // and a label
            label: 'Lastname',
            // add a nice icon from http://fontawesome.io/icons/
            icon: 'fa-users',
            // bind the view to a controller model attribute
            scopeKey: 'newContact.lastname'
        }),

        // an input field for the firstname
        addFirstName: M.TextfieldView.extend({
            // fit into the grid
            grid: 'col-xs-12',
            // label it as lastname with a placeholder ...
            placeholder: 'Firstname',
            // and a label
            label: 'Firstname',
            // add a nice icon from http://fontawesome.io/icons/
            icon: 'fa-user',
            // bind the view to a controller model attribute
            scopeKey: 'newContact.name'
        }),


        // a submit button for adding a entry to the list
        addButton: M.ButtonView.extend({
            //fit into the grid
            grid: 'col-xs-12',
            // The Text of the Button
            value: 'Add',
            // The events of the button
            events: {
                // On tab call the scope method 'addContact' (scope is the MenuController)
                tap: 'addContact'
            }
        }),


        // The contacts list
        contactsList: M.ListView.extend({

            // fit into the grid - whole page
            grid: 'col-xs-12',

            // the collection inside the menu controller
            scopeKey: 'contacts',

            // This property contains the listitem view
            listItemView: M.ListItemView.extend({

                // Extend the default template with this one. It gets injected into the <%= _value_ %> placeholder
                extendTemplate: '<span><%= name %></span> <span><%= lastname %></span>'
            })


        })
    });

})();
