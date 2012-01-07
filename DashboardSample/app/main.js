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
            childViews: 'dashboard title list',

            dashboard: M.DashboardView.design({
                events: {
                    tap: {
                        target: DashboardSample.ApplicationController,
                        action: function(id) {
                            this.events.unshift({
                                label: (this.events.length + 1) + ') ' + M.ViewManager.getViewById(id).label + ' (global)'
                            });
                            this.set('events', this.events);
                        }
                    }
                },
                itemsPerLine: 3,
                isEditable: NO,
                contentBinding: {
                    target: DashboardSample.ApplicationController,
                    property: 'items'
                }
            }),

            title: M.ToolbarView.design({
                value: 'Event-Tracker',
                cssClass: 'toolbar'
            }),

            list: M.ListView.design({
                listItemTemplateView: DashboardSample.TemplateView,
                contentBinding: {
                    target: DashboardSample.ApplicationController,
                    property: 'events'
                }
            })
        })

    })

});