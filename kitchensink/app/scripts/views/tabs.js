/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.TabsView = [
        {
            icon: 'fa-cloud',
            headline: 'Tab1',
            content: M.TabView.extend({
                value: 'Tab1 Content'
            }, {
                tab: kitchensink.Views.TabView
            })
        },
        {
            icon: 'fa-cloud',
            headline: 'Tab2',
            content: M.TabView.extend({
                value: 'Tab2 Content'
            }, {
                tab: kitchensink.Views.TabView
            })
        },
        {
            icon: 'fa-cloud',
            headline: 'Tab3',
            content: M.TabView.extend({
                value: 'Tab3 Content'
            }, {
                tab: kitchensink.Views.TabView
            })
        },
        {
            icon: 'fa-cloud',
            headline: 'Tab4',
            content: M.TabView.extend({
                value: 'Tab4 Content'
            }, {
                tab: kitchensink.Views.TabView
            })
        },
        {
            icon: 'fa-cloud',
            headline: 'Tab5',
            content: M.TabView.extend({
                value: 'Tab5 Content'
            }, {
                tab: kitchensink.Views.TabView
            })
        },
        {
            icon: 'fa-cloud',
            headline: 'Tab6',
            content: M.TabView.extend({
                value: 'Tab6 Content'
            }, {
                tab: kitchensink.Views.TabView
            })
        }
    ];
})();
