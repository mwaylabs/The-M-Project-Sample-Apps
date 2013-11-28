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
            }),

            customListExample: M.View.extend({

                value: 'Custom List',

                grid: 'col-xs-12'

            }, {

                linkedCustomIconOnList: M.ListView.extend({

                    grid: 'col-xs-12',

                    _value_: M.Collection.create([

                        {headline: 'Sir Timothy John "Tim" Berners-Lee', text: 'The inventor of the World Wide Web.', image: 'http://upload.wikimedia.org/wikipedia/commons/8/83/Tim_Berners-Lee-Knight-crop.jpg'},
                        {headline: 'Brendan Eich', text: 'Creator of the JavaScript scripting language.', image: 'http://upload.wikimedia.org/wikipedia/commons/0/09/BEich.jpg'},
                        {headline: 'Stefan Jauker', text: 'Creator of the JaukerScript', image: 'http://www.mwaysolutions.com/files/9113/7396/2289/img_team_stefan-jauker.png'},
                        {headline: 'Steven Paul "Steve" Jobs', text: 'Was the co-founder (along with Steve Wozniak and Ronald Wayne), chairman, and CEO of Apple Inc.', image: 'http://upload.wikimedia.org/wikipedia/commons/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg'},
                        {headline: 'William Henry "Bill" Gates III', text: 'The former chief executive and current chairman of Microsoft', image: 'http://upload.wikimedia.org/wikipedia/commons/b/bd/Dts_news_bill_gates_wikipedia.JPG'}

                    ]),

                    listItemView: M.ListItemView.extend({

                        cssClass: 'custom-list',

                        extendTemplate: '<div class="row"><div class="col-xs-2" style="background-image: url(<%= image %>)"></div><div class="col-xs-10"><h4><%= headline %></h4><h6><%= text %></h6></div></div>',

                        events: {
                            tap: function( event, element ) {
                                M.Toast.show(element.model.get('text'));
                            }
                        }

                    })

                })
            })
        })

    });

})();
