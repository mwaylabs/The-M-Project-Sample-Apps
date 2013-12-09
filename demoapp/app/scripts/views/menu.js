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

        addLastName: M.TextfieldView.extend({
            grid: 'col-xs-12',
            label: 'Lastname',
            icon: 'fa-users',
            placeholder: 'Lastname',
            scopeKey: 'newContact.lastname'
        }),

        addFirstName: M.TextfieldView.extend({
            grid: 'col-xs-12',
            label: 'Firstname',
            scopeKey: 'newContact.name',
            icon: 'fa-user',
            placeholder: 'Firstname'
        }),

        addButton: M.ButtonView.extend({
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
