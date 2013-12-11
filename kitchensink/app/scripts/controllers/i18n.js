/*global kitchensink*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.I18nController = kitchensink.Controllers.AbstractController.extend({

        pageHeadline: 'i18n',

        sourceCodePath: 'scripts/views/i18n.js',

        transitionModel: null,

        _initViews: function() {

            // Create the ContentView with the controller (this) as scope
            if( !this.contentView ) {
                this.contentView = kitchensink.Views.I18nView.create(this, null, true);
            }

            // Create the HeaderView with the controller (this) as scope
            if( !this.headerView ) {
                this.headerView = kitchensink.Views.BackheaderView.create(this, null, true);
            }

            this._applyViews();
        },

        // Register menu item for this view
        registerToMenu: function( menuController ) {
            menuController.registerMenuItem({
                _value_: 'i18n',
                goto: 'i18n'
            });
        },

        changeLocaleToDe: function() {
            this.changeLocale('de');
        },

        changeLocaleToEn: function() {
            this.changeLocale('en');
        },

        changeLocale: function(locale) {
            // Sets the given locale and trigger render() on all affected views.
            M.I18N.setLocale( locale );
        }
    });

})();
