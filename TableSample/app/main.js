// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: TableSample
// ==========================================================================

var TableSample  = TableSample || {};

TableSample.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage : 'page1',

    page1: M.PageView.design({

        events: {

            pageshow: {

                target: TableSample.ApplicationController,

                action: 'init'

            }

        },

        childViews: 'header content',

        header: M.ToolbarView.design({

            value: 'Table Sample'

        }),

        content: M.ScrollView.design({

            childViews: 'table',

            table: M.TableView.design({

                cssClass: 'myTable',

                header: {

                    data:['Date', 'User', 'Tweet'],

                    cols: ['25%', '35%', '40%']

                },

                contentBinding: {

                    target: TableSample.ApplicationController,

                    property: 'content'

                }

            })

        })

    })

});