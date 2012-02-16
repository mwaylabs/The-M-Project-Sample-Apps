// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: WebViewSample 
// ==========================================================================

var WebViewSample  = WebViewSample || {};

WebViewSample.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage : 'page1',

    page1: M.PageView.design({

        childViews: 'header content',

        events: {
            pageshow: {
                target: WebViewSample.ApplicationController,
                action: 'initApp'
            }
        },

        header: M.ToolbarView.design({
            childViews: 'urlBar btn',
            urlBar: M.TextFieldView.design({
                anchorLocation: M.CENTER,
                cssClass: 'urlBar',
                events: {
                    enter: {
                        target: WebViewSample.ApplicationController,
                        action: 'updateURL'
                    },
                    focus: {
                        action: function(id) {
                            $('#' + id).select();
                        }
                    }
                }
            }),
            btn: M.ButtonView.design({
                anchorLocation: M.RIGHT,
                value: 'Go',
                events: {
                    tap: {
                        target: WebViewSample.ApplicationController,
                        action: 'updateURL'
                    }
                }
            })
        }),

        content: M.ScrollView.design({
            childViews: 'webview',
            webview: M.WebView.design({
                value: 'http://www.the-m-project.org',
                cssClass: 'myWebView',
                isScrollable: YES,
                contentBinding: {
                    target: WebViewSample.ApplicationController,
                    property: 'url'
                }
            })
        })

    })

});