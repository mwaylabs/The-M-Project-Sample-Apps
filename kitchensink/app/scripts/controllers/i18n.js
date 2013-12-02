/*global kitchensink*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.I18nController = kitchensink.Controllers.AbstractController.extend({

        pageHeadline: 'i18n',

        transitionModel: null,

        _initViews: function() {
            if( !this.contentView ) {
                this.contentView = kitchensink.Views.I18nView.create(this, null, true);
            }

            if( !this.headerView ) {
                this.headerView = kitchensink.Views.BackheaderView.create(this, null, true);
            }

            this._applyViews();
        },

        registerToMenu: function( menuController ) {
            menuController.registerMenuItem({
                _value_: 'i18n',
                goto: 'i18n'
            });
        },

        changeLocaleToDe: function() {
            this.changeLocale('de')
        },

        changeLocaleToEn: function() {
            this.changeLocale('en')
        },

        changeLocale: function(locale) {
            M.I18N.setLocale( locale );
        }
    });

})();
