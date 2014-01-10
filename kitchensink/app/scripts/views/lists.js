/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.ListsView = M.View.extend({
        // The view should be in a grid
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

                    // The list view's items
                    value: M.Collection.create([
                        {value: 'List Item 1'},
                        {value: 'List Item 2'},
                        {value: 'List Item 3'},
                        {value: 'List Item 4'},
                        {value: 'List Item 5'},
                        {value: 'List Item 6'}
                    ])

                })
            }),

            activeExample: M.View.extend({
                value: 'Basic List Example with active state',
                grid: 'col-xs-12'
            }, {
                basicActiveState: M.ListView.extend({

                    grid: 'col-xs-12',

                    // The list view's items
                    value: M.Collection.create([
                        {value: 'List Item 1 with active state'},
                        {value: 'List Item 2 with active state'},
                        {value: 'List Item 3 with active state'},
                        {value: 'List Item 4 with active state'},
                        {value: 'List Item 5 with active state'},
                        {value: 'List Item 6 with active state'}
                    ]),

                    // This property contains the listitem view
                    listItemView: M.ListItemView.extend({})

                })
            }),

            linkedExample: M.View.extend({
                value: 'Linked List Example',
                grid: 'col-xs-12'
            }, {
                basicActiveState: M.ListView.extend({

                    grid: 'col-xs-12',

                    // The list view's items
                    value: M.Collection.create([
                        {value: 'List Item 1 with active state'},
                        {value: 'List Item 2 with active state'},
                        {value: 'List Item 3 with active state'},
                        {value: 'List Item 4 with active state'},
                        {value: 'List Item 5 with active state'},
                        {value: 'List Item 6 with active state'}
                    ]),

                    // This property contains the listitem view.
                    listItemView: M.ListItemView.extend({
                        // Sets a special type for this listitem view.
                        type: M.ListItemView.CONST.LINKED
                    })

                })
            }),

            linkedCustomIconExample: M.View.extend({
                value: 'Linked List with custom icon Example',
                grid: 'col-xs-12'
            }, {
                basicActiveState: M.ListView.extend({

                    grid: 'col-xs-12',

                    // The list view's items
                    value: M.Collection.create([
                        {value: 'List Item 1 with active state'},
                        {value: 'List Item 2 with active state'},
                        {value: 'List Item 3 with active state'},
                        {value: 'List Item 4 with active state'},
                        {value: 'List Item 5 with active state'},
                        {value: 'List Item 6 with active state'}
                    ]),

                    listItemView: M.ListItemView.extend({
                        // Sets a special type for this listitem view.
                        type: M.ListItemView.CONST.LINKED,
                        // Sets a font awsome icon for this listitem view.
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

                    // The list view's items
                    value: M.Collection.create([
                        {value: 'Android'},
                        {value: 'Linux'},
                        {value: 'Apple'},
                        {value: 'Windows'}
                    ]),

                    listItemView: M.ListItemView.extend({
                        type: M.ListItemView.CONST.ICON,
                        // Sets a font awsome icon for this listitem view.
                        getIcon: function() {
                            return 'fa-' + this.model.get('value').toLocaleLowerCase();
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

                    // The list view's items
                    value: M.Collection.create([

                        {headline: 'Sir Timothy John "Tim" Berners-Lee', text: 'The inventor of the World Wide Web.', image: 'http://upload.wikimedia.org/wikipedia/commons/8/83/Tim_Berners-Lee-Knight-crop.jpg'},
                        {headline: 'Brendan Eich', text: 'Creator of the JavaScript scripting language.', image: 'http://upload.wikimedia.org/wikipedia/commons/0/09/BEich.jpg'},
                        {headline: 'Stefan Jauker', text: 'Creator of the JaukerScript', image: 'http://www.mwaysolutions.com/files/9113/7396/2289/img_team_stefan-jauker.png'},
                        {headline: 'Steven Paul "Steve" Jobs', text: 'Was the co-founder (along with Steve Wozniak and Ronald Wayne), chairman, and CEO of Apple Inc.', image: 'http://upload.wikimedia.org/wikipedia/commons/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg'},
                        {headline: 'William Henry "Bill" Gates III', text: 'The former chief executive and current chairman of Microsoft', image: 'http://upload.wikimedia.org/wikipedia/commons/b/bd/Dts_news_bill_gates_wikipedia.JPG'}

                    ]),

                    // This property contains the listitem view
                    listItemView: M.ListItemView.extend({

                        cssClass: 'custom-list',

                        // Extend the default template with this one. It gets injected into the <%= value %> placeholder
                        extendTemplate: '<div class="row"><div class="col-xs-2" style="background-image: url(<%= image %>)"></div><div class="col-xs-10"><h4><%= headline %></h4><h6><%= text %></h6></div></div>',

                        events: {
                            // Register a tap event for this listitem view.
                            tap: function( event, element ) {
                                M.Toast.show(element.model.get('text'));
                            }
                        }

                    })

                })
            }),

            customListExampleWithChildViews: M.View.extend({
                value: 'Custom List with childViews',
                grid: 'col-xs-12'
            }, {

                customListExampleWithChildViews: M.ListView.extend({

                    grid: 'col-xs-12',

                    // The list view's items
                    value: M.Collection.create([

                        {headline: 'Sir Timothy John "Tim" Berners-Lee', text: 'The inventor of the World Wide Web.', image: 'http://upload.wikimedia.org/wikipedia/commons/8/83/Tim_Berners-Lee-Knight-crop.jpg'},
                        {headline: 'Brendan Eich', text: 'Creator of the JavaScript scripting language.', image: 'http://upload.wikimedia.org/wikipedia/commons/0/09/BEich.jpg'},
                        {headline: 'Stefan Jauker', text: 'Creator of the JaukerScript', image: 'http://www.mwaysolutions.com/files/9113/7396/2289/img_team_stefan-jauker.png'},
                        {headline: 'Steven Paul "Steve" Jobs', text: 'Was the co-founder (along with Steve Wozniak and Ronald Wayne), chairman, and CEO of Apple Inc.', image: 'http://upload.wikimedia.org/wikipedia/commons/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg'},
                        {headline: 'William Henry "Bill" Gates III', text: 'The former chief executive and current chairman of Microsoft', image: 'http://upload.wikimedia.org/wikipedia/commons/b/bd/Dts_news_bill_gates_wikipedia.JPG'}

                    ]),

                    // all list items use this as blueprint
                    listItemView: M.ListItemView.extend({ }, {
                        // headline is a childView
                        headline: M.View.extend({
                            // cause it is a childview it should use the parent (listItemView) value
                            useParentValue: YES,
                            // render the headline of the model
                            extendTemplate: '<%= headline %>'
                        }),
                        // text is a childView
                        text: M.View.extend({
                            // cause it is a childview it should use the parent (listItemView) value
                            useParentValue: YES,
                            // render the text of the model
                            extendTemplate: '<%= text %>'
                        })
                    })



                })
            }),

            customListExampleWithChildViewGetters: M.View.extend({
                value: 'Custom List with Getters for Headline, Item and Footer for every Row ',
                grid: 'col-xs-12'
            }, {

                customListExampleWithChildViewGetters: M.ListView.extend({

                    grid: 'col-xs-12',

                    // The list view's items
                    value: M.Collection.create([

                        {headline: 'Sir Timothy John "Tim" Berners-Lee', text: 'The inventor of the World Wide Web.', image: 'http://upload.wikimedia.org/wikipedia/commons/8/83/Tim_Berners-Lee-Knight-crop.jpg'},
                        {headline: 'Brendan Eich', text: 'Creator of the JavaScript scripting language.', image: 'http://upload.wikimedia.org/wikipedia/commons/0/09/BEich.jpg'},
                        {headline: 'Stefan Jauker', text: 'Creator of the JaukerScript', image: 'http://www.mwaysolutions.com/files/9113/7396/2289/img_team_stefan-jauker.png'},
                        {headline: 'Steven Paul "Steve" Jobs', text: 'Was the co-founder (along with Steve Wozniak and Ronald Wayne), chairman, and CEO of Apple Inc.', image: 'http://upload.wikimedia.org/wikipedia/commons/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg'},
                        {headline: 'William Henry "Bill" Gates III', text: 'The former chief executive and current chairman of Microsoft', image: 'http://upload.wikimedia.org/wikipedia/commons/b/bd/Dts_news_bill_gates_wikipedia.JPG'}

                    ]),

                    // gets called for every render process before getListItem
                    // if the third parameter is defined the view was rendered before and can be reused
                    getListItemHeader: function( model, index, view ) {
                        return view || M.ListItemView.extend({
                            cssClass: 'list-item-header',
                            value: 'List Item Header for: ' + model.get('headline'),
                            enabled: NO
                        });
                    },

                    // gets called for every render process after getListItem
                    // if the third parameter is defined the view was rendered before and can be reused
                    getListItemFooter: function( model, index, view ) {
                        return view || M.ListItemView.extend({
                            cssClass: 'list-item-footer',
                            value: 'List Item footer for: ' + model.get('headline'),
                            enabled: NO
                        });
                    },

                    // gets called for every render process before getListItemFooter and after getListItemHeader
                    // if the third parameter is defined the view was rendered before and can be reused
                    getListItem: function( model, index, view ) {

                        if(view){
                            return view;
                        } else {
                            return M.ListItemView.extend({
                                childViews: {
                                    text: M.View.extend({
                                        useParentValue: YES,
                                        extendTemplate: '<span><%= headline %>: </span><span><%= text %></span>'
                                    })
                                }
                            });
                        }
                    }
                })
            }),

            filterListView: M.View.extend({
                value: 'Custom List with filter',
                grid: 'col-xs-12'
            }, {

                // a input to filter the a list
                filterInput: M.TextfieldView.extend({
                    // put it into a grid
                    grid: 'col-xs-12',
                    // put it into a grid
                    events: {
                        // bind every entry
                        keyup: function( event, view ) {
                            // get the list view
                            var listView = view.getParent().childViews.customListExampleWithChildViewGetters;
                            // set the filter value it is possible to access it via getFilterValue()
                            listView.setFilterValue({ val: view.getValue() });
                            // filter the list
                            listView.filter();
                            // it is also possible to give the filter value to the filter method
                            //listView.filter({ val: view.getValue() });
                        }
                    }
                }),

                customListExampleWithChildViewGetters: M.ListView.extend({

                    grid: 'col-xs-12',

                    // The list view's items
                    value: M.Collection.create([

                        {headline: 'Sir Timothy John "Tim" Berners-Lee', text: 'The inventor of the World Wide Web.', image: 'http://upload.wikimedia.org/wikipedia/commons/8/83/Tim_Berners-Lee-Knight-crop.jpg'},
                        {headline: 'Brendan Eich', text: 'Creator of the JavaScript scripting language.', image: 'http://upload.wikimedia.org/wikipedia/commons/0/09/BEich.jpg'},
                        {headline: 'Stefan Jauker', text: 'Creator of the JaukerScript', image: 'http://www.mwaysolutions.com/files/9113/7396/2289/img_team_stefan-jauker.png'},
                        {headline: 'Steven Paul "Steve" Jobs', text: 'Was the co-founder (along with Steve Wozniak and Ronald Wayne), chairman, and CEO of Apple Inc.', image: 'http://upload.wikimedia.org/wikipedia/commons/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg'},
                        {headline: 'William Henry "Bill" Gates III', text: 'The former chief executive and current chairman of Microsoft', image: 'http://upload.wikimedia.org/wikipedia/commons/b/bd/Dts_news_bill_gates_wikipedia.JPG'}

                    ]),

                    // gets called on every filter call
                    filterBy: function( model ) {

                        // get the filter value set by the filter() call or via setFilterValue()
                        if( this.getFilterValue() === true ) {
                            // if true return every element
                            return true;
                        }
                        // get the filter value: { val: view.getValue() }
                        var val = this.getFilterValue();
                        // check if there is a match
                        if( model.get('headline').toLowerCase().indexOf(val.val.toLowerCase()) >= 0 || model.get('text').toLowerCase().indexOf(val.val.toLowerCase()) >= 0 ) {
                            // add the item to the list
                            return true;
                        }

                        // add the item not the list
                        return false;
                    },

                    // gets called for every render process also on the filter
                    getListItem: function( model, index, view ) {

                        // for demo purposes set even or odd class on a listitem
                        var cssClass = 'even';
                        if( index % 2 ) {
                            cssClass = 'odd'
                        }
                        // if it is possible to reuse the view use it here
                        if(view){
                            return view.$el.removeClass('odd').removeClass('even').addClass(cssClass);
                        }
                        // or create a new one
                        return M.ListItemView.extend({
                            cssClass: cssClass
                        }, {
                            headline: M.View.extend({
                                useParentValue: YES,
                                extendTemplate: '<%= headline %>'
                            }),
                            text: M.View.extend({
                                useParentValue: YES,
                                extendTemplate: '<%= text %>'
                            })
                        })
                    }
                })
            })
        })

    });

})();
