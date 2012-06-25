
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: HTMLView 
// ==========================================================================

var HTMLView  = HTMLView || {};

HTMLView.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage : 'page1',

    page1: M.PageView.design({

        childViews: 'usage yellow green blue',

        usage : M.HTMLView.design({

            url: 'usage.html'
        }),
        yellow : M.HTMLView.design({
            cssClass : 'one',
            url: 'view_1.html'
        }),

        green : M.HTMLView.design({
            cssClass : 'one',
            url: 'view_2.html'
        }),

        blue : M.HTMLView.design({
            cssClass : 'one',
            url: 'view_3.html'
        })

    })

});