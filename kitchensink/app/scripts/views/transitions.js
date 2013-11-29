/*global kitchensink, M, _*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.TransitionsView = M.View.extend({
        grid: 'col-xs-12'
    }, {

        selectView: M.View.extend({
            grid: 'row',
            value: 'Please choose a transition from the list'
        }, {
            selectionlistExample: M.SelectView.extend({
                grid: 'col-xs-12',
                scopeKey: 'transitionModel.name',
                selectOptions: {
                    collection: (function() {
                        var list = [];
                        var obj = M.PageTransitions.CONST;
                        for( var key in obj ) {
                            list.push({label: key, value: key});
                        }
                        return list;
                    })()
                }
            })
        }),

        randomView: M.View.extend({
            grid: 'row',
            value: 'or surprise yourself'
        }, {
            random: M.ButtonView.extend({
                grid: 'col-xs-12',
                value: 'Random ',
                events: {
                    tap: function() {
                        var list = Object.keys(M.PageTransitions.CONST);
                        var name = list[_.random(0, list.length - 1)];
                        this.transitionModel.set('name', name);
                    }
                }
            }),

        }),

        info: M.TextView.extend({
            scopeKey: 'transitionModel.name',
            onGet: function( value ) {
                return 'M.PageTransitions.CONST.' + value;
            },
            grid: 'col-xs-12',
            cssClass: 'stencil',
            icon: 'fa-css3'
        })

    });

})();
