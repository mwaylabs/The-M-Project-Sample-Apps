/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.TextsView = M.View.extend({
        grid: 'col-xs-12'
    }, {

        simpleTextExample: M.View.extend({

            grid: 'row',
            value: 'Simple Text'

        }, {
            shortText: M.TextView.extend({
                grid: 'col-xs-12',
                value: 'This is a short text.'
            }),

            longText: M.TextView.extend({
                grid: 'col-xs-12',
                value: 'This is a long text. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
            })
        }),

        labelTextExample: M.View.extend({

            grid: 'row',
            value: 'Label Text'

        }, {
            shortIconText: M.TextView.extend({
                grid: 'col-xs-12',
                label: 'This is a label',
                value: 'This is a short text.'
            }),

            longIconText: M.TextView.extend({
                grid: 'col-xs-12',
                label: 'Label for long text',
                value: 'This is a long text. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
            })
        }),

        iconTextExample: M.View.extend({

            grid: 'row',
            value: 'Icon Text'

        }, {
            shortIconText: M.TextView.extend({
                grid: 'col-xs-12',
                icon: 'fa-text-height',
                value: 'This is a short text with icon.'
            }),

            longIconText: M.TextView.extend({
                grid: 'col-xs-12',
                icon: 'fa-paperclip',
                value: 'This is a long text with icon. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
            })
        }),

        iconLabelTextExample: M.View.extend({

            grid: 'row',
            value: 'Icon and Label Text'

        }, {
            shortIconText: M.TextView.extend({
                grid: 'col-xs-12',
                icon: 'fa-text-height',
                label: 'This is a label',
                value: 'This is a short text with icon and label'
            }),

            longIconText: M.TextView.extend({
                grid: 'col-xs-12',
                icon: 'fa-paperclip',
                label: 'This is a very long text',
                value: 'This is a long text with icon and label. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
            })
        })

    });

})();
