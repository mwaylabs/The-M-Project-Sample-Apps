/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.I18nView = M.View.extend({
        grid: 'col-xs-12'
    }, {

        welcome: M.TextView.extend({
            tagName: 'h2',
            value: M.I18N.get('app.welcome')
        }),

        themproject: M.TextView.extend({
            value: M.I18N.get('app.themproject', {
                version: M.Version
            })
        }),

        btn: M.ButtonGroupView.extend({}, {

            btnEn: M.ButtonView.extend({
                grid: 'col-xs-6',
                value: 'English',
                events: {
                    tap: 'changeLocaleToEn'
                }
            }),

            btnDe: M.ButtonView.extend({
                grid: 'col-xs-6',
                value: 'German',
                events: {
                    tap: 'changeLocaleToDe'
                }
            })
        })
    });

})();
