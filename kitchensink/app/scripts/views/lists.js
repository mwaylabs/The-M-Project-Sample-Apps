/*global kitchensink, M*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.ListsView = M.View.extend({
        grid: 'col-xs-12'
    }, {

        listExamples: M.View.extend({
            grid: 'row'
        }, {

            basicExample: M.View.extend({
                value: 'Basic List Example',
                grid: 'col-xs-12'

            }, {
                basicListExample: M.ListView.extend({

                    grid: 'col-xs-12',

                    _value_: M.Collection.create([
                        {_value_: 'List Item 1'},
                        {_value_: 'List Item 2'},
                        {_value_: 'List Item 3'},
                        {_value_: 'List Item 4'},
                        {_value_: 'List Item 5'},
                        {_value_: 'List Item 6'}
                    ])

                })
            }),

            activeExample: M.View.extend({
                value: 'Basic List Example with active state',
                grid: 'col-xs-12'
            }, {
                basicActiveState: M.ListView.extend({

                    grid: 'col-xs-12',

                    _value_: M.Collection.create([
                        {_value_: 'List Item 1 with active state'},
                        {_value_: 'List Item 2 with active state'},
                        {_value_: 'List Item 3 with active state'},
                        {_value_: 'List Item 4 with active state'},
                        {_value_: 'List Item 5 with active state'},
                        {_value_: 'List Item 6 with active state'}
                    ]),

                    listItemView: M.ListItemView.extend({})

                })
            }),

            linkedExample: M.View.extend({
                value: 'Linked List Example',
                grid: 'col-xs-12'
            }, {
                basicActiveState: M.ListView.extend({

                    grid: 'col-xs-12',

                    _value_: M.Collection.create([
                        {_value_: 'List Item 1 with active state'},
                        {_value_: 'List Item 2 with active state'},
                        {_value_: 'List Item 3 with active state'},
                        {_value_: 'List Item 4 with active state'},
                        {_value_: 'List Item 5 with active state'},
                        {_value_: 'List Item 6 with active state'}
                    ]),

                    listItemView: M.ListItemView.extend({
                        type: M.ListItemView.CONS.LINKED
                    })

                })
            }),

            linkedCustomIconExample: M.View.extend({
                value: 'Linked List with custom icon Example',
                grid: 'col-xs-12'
            }, {
                basicActiveState: M.ListView.extend({

                    grid: 'col-xs-12',

                    _value_: M.Collection.create([
                        {_value_: 'List Item 1 with active state'},
                        {_value_: 'List Item 2 with active state'},
                        {_value_: 'List Item 3 with active state'},
                        {_value_: 'List Item 4 with active state'},
                        {_value_: 'List Item 5 with active state'},
                        {_value_: 'List Item 6 with active state'}
                    ]),

                    listItemView: M.ListItemView.extend({
                        type: M.ListItemView.CONS.LINKED,
                        icon: 'fa-html5'
                    })

                })
            }),

            linkedCustomIconOnListExample: M.View.extend({
                value: 'Linked List with custom icon Example',
                grid: 'col-xs-12'
            }, {
                linkedCustomIconOnList: M.ListView.extend({

                    grid: 'col-xs-12',

                    _value_: M.Collection.create([
                        {_value_: 'Android'},
                        {_value_: 'Linux'},
                        {_value_: 'Apple'},
                        {_value_: 'Windows'}
                    ]),

                    listItemView: M.ListItemView.extend({
                        type: M.ListItemView.CONS.ICON,
                        getIcon: function() {
                            return 'fa-' + this.model.get('_value_').toLocaleLowerCase();
                        }
                    })

                })
            })
        })

    });

})();
