// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: �2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      03.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Twitter.TwitterController = M.Controller.extend({

    results: null,

    userResults: null,

    searchString: null,

    username: null,

    search: function() {
        //var searchString = Twitter.app.page1.content.searchField.value;
        var searchString = M.ViewManager.getView('page1', 'searchField').value;
        if(!searchString) {
            return;
        }

        M.LoaderView.show();

        M.Request.init({
            url: 'twitter/search.json?q=' + searchString + '&rpp=10',
            isJSON: YES,
            beforeSend: function(req) {
                //...
            },
            onSuccess: function(data){
                M.LoaderView.hide();
                if(data && data.results && data.results.length > 0) {
                    Twitter.TwitterController.set('results', data);
                    Twitter.TwitterController.set('searchString', 'Results for \'' + searchString + '\'');
                    M.Controller.switchToPage(M.ViewManager.getPage('page2'));
                } else if (data && data.results) {
                   M.DialogView.alert({
                       title: 'Nothing found...',
                       message: 'Your search for \'' + searchString + '\' didn\'t bring up any results. Please try something else.'
                   });
                } else {
                   M.DialogView.alert({
                       title: 'Connection Error',
                       message: 'No connection could be established! Please check your connection status and try again. If this message keeps coming up, you probably didn\'t add the necessary proxy to your server.'
                   });
                }
            },
            onError: function(data){
                M.LoaderView.hide();
            }
        }).send();
    },

    showUser: function(id) {
        var view = M.ViewManager.getViewById(id);
        var username = M.ViewManager.getView(view, 'label1').value;

        if(!username) {
            return;
        }

        M.LoaderView.show();

        M.Request.init({
            url: 'twitter/search.json?from=' + username + '&rpp=10',
            isJSON: YES,
            beforeSend: function(req) {
                //...
            },
            onSuccess: function(data){
                M.LoaderView.hide();
                Twitter.TwitterController.set('userResults', data);
                Twitter.TwitterController.set('username', username);
                M.Controller.switchToPage(M.ViewManager.getPage('page3'));
            },
            onError: function(data){
                M.LoaderView.hide();
            }
        }).send();
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: �2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Twitter.TwitterResultsView = M.ListItemView.design({

    childViews: 'image1 label1 label2 text',

    target: Twitter.TwitterController,

    action: 'showUser',

    image1: M.ImageView.design({
        valuePattern: '<%= profile_image_url %>',
        cssClass: 'listThumb'
    }),

    label1 : M.LabelView.design({
        valuePattern: '<%= from_user %>',
        cssClass: 'username'
    }),

    label2 : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= created_at %>',
            operation: function(v) {
                var date = M.Date.create(v);
                return date.format('mm/dd/yyyy HH:MM');
            }
        },
        cssClass: 'date'
    }),

    text : M.LabelView.design({
        valuePattern: '<%= text %>',
        cssClass: 'text'
    })

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: �2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      03.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Twitter.TwitterUserView = M.ListItemView.design({

    childViews: 'date label1',

    items: 'results',
    
    date : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= created_at %>',
            operation: function(v) {
                var date = M.Date.create(v);
                return date.format('mm/dd/yyyy HH:MM');
            }
        },
        cssClass: 'date'
    }),

    label1 : M.LabelView.design({
        valuePattern: '<%= text %>',
        cssClass: 'text'
    })

});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: Twitter 
// ==========================================================================

var Twitter  = Twitter || {};

Twitter.app = M.Application.design({

    page1: M.PageView.design({

            childViews: 'header content',

            header: M.ToolbarView.design({
                value: 'Twitter Demo',
                anchorLocation : M.TOP
            }),

            content: M.ScrollView.design({

                childViews: 'searchField button label',

                searchField: M.TextFieldView.design({
                    initialText: 'search term...',
                    cssClassOnInit: 'textfieldInit',
                    target: Twitter.TwitterController,
                    action: 'search',
                    triggerActionOnEnter: YES,
                    isGrouped: NO
                }),

                button: M.ButtonView.design({
                    value: 'Search',
                    target: Twitter.TwitterController,
                    action: 'search'
                }),

                label: M.LabelView.design({

                    value: '&#160;'

                })
                
            })
        
    }),

    page2: M.PageView.design({
        childViews: 'header content',

        header: M.ToolbarView.design({
            value: 'Twitter Demo',
            contentBinding: 'Twitter.TwitterController.searchString',
            anchorLocation : M.TOP,
            showBackButton: YES
        }),

        content: M.ScrollView.design({
            childViews: 'list1',

            list1: M.ListView.design({
                contentBinding: 'Twitter.TwitterController.results',
                items: 'results',
                listItemTemplateView: Twitter.TwitterResultsView,
                removeItemsOnUpdate: YES
            })
        })
    }),

    page3: M.PageView.design({
        childViews: 'header content',

        header: M.ToolbarView.design({
            value: 'Twitter Demo',
            contentBinding: 'Twitter.TwitterController.username',
            anchorLocation : M.TOP,
            showBackButton: YES
        }),

        content: M.ScrollView.design({
            childViews: 'list1',

            list1: M.ListView.design({
                contentBinding: 'Twitter.TwitterController.userResults',
                items: 'results',
                listItemTemplateView: Twitter.TwitterUserView,
                removeItemsOnUpdate: YES
            })
        })
    })

});