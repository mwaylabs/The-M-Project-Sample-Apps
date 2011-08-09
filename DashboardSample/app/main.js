// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DashboardSample 
// ==========================================================================

var DashboardSample  = DashboardSample || {};

DashboardSample.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage : 'page1',

    page1: M.PageView.design({

        childViews: 'header content',

        events: {
            pageshow: {
                target: DashboardSample.ApplicationController,
                action: 'init'
            }
        },

        header: M.ToolbarView.design({
            value: 'DashboardSample'
        }),

        content: M.ScrollView.design({
            childViews: 'dashboard',

            dashboard: M.DashboardView.design({
                events: {
                    tap: {
                        action: function() {
                            alert('TAPPED');
                        }
                    }
                },

                itemsPerLine: 3,

                contentBinding: {
                    target: DashboardSample.ApplicationController,
                    property: 'items'
                }
            })
        })

    })

});