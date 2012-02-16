// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: WebViewSample 
// ==========================================================================

var WebViewSample  = WebViewSample || {};

WebViewSample.app = M.Application.design({

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
            value: 'WebView Sample'
        }),

        content: M.ScrollView.design({
            childViews: 'container btn1 btn2 btn3',
            container: M.ContainerView.design({
                cssClass: 'container',
                childViews: 'webview',
                webview: M.WebView.design({
                    value: 'http://www.the-m-project.org',
                    cssClass: 'myWebView',
                    isScrollable: NO,
                    contentBinding: {
                        target: WebViewSample.ApplicationController,
                        property: 'url'
                    },
                    events: {
                        load: {
                            action: function(id) {
                                $('#' + id).animate({
                                    opacity: 1
                                }, 500);
                            }
                        }
                    }
                })
            }),
            btn1: M.ButtonView.design({
                value: 'The-M-Project',
                events: {
                    tap: {
                        target: WebViewSample.ApplicationController,
                        action: function() {
                            this.updateURL('http://www.the-m-project.org');
                        }
                    }
                }
            }),
            btn2: M.ButtonView.design({
                value: 'jQuery Mobile',
                events: {
                    tap: {
                        target: WebViewSample.ApplicationController,
                        action: function() {
                            this.updateURL('http://www.jquerymobile.com');
                        }
                    }
                }
            }),
            btn3: M.ButtonView.design({
                value: 'Underscore.JS',
                events: {
                    tap: {
                        target: WebViewSample.ApplicationController,
                        action: function() {
                            this.updateURL('http://documentcloud.github.com/underscore/');
                        }
                    }
                }
            })
        })

    })

});