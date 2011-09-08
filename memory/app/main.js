// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: memory 
// ==========================================================================

var memory = memory || {};

memory.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage : 'page1',

    page1: M.PageView.design({

        events: {
            pageshow: {
                target: memory.ApplicationController,
                action: 'init'
            }
        },

        childViews: 'content',

        content: M.ScrollView.design({

            childViews: 'moves moveCounter pitch',

            moves: M.LabelView.design({
                value: 'Moves: ',
                isInline: YES
            })

            ,moveCounter: M.LabelView.design({

                value: '',
                isInline: YES,
                contentBinding: {
                    target: memory.ApplicationController,
                    property: 'moves'
                }
            }),

            pitch: M.DashboardView.design({
                events: {
                    tap: {
                        target: memory.ApplicationController,
                        action: 'itemClicked'
                    }
                },
                itemsPerLine: 4,
                isEditable: NO,
                contentBinding: {
                    target: memory.ApplicationController,
                    property: 'cards'
                }
            })


        })


    })

});