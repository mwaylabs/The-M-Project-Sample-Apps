// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Memory
// ==========================================================================

var Memory = Memory || {};

Memory.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage : 'page1',

    page1: M.PageView.design({

        events: {
            pageshow: {
                target: Memory.ApplicationController,
                action: 'init'
            }
        },

        childViews: 'content',

        content: M.ScrollView.design({

            childViews: 'moves moveCounter timer timerCounter pitch',

            moves: M.LabelView.design({
                value: 'Moves: ',
                isInline: YES
            })

            ,moveCounter: M.LabelView.design({

                value: '',
                isInline: YES,
                contentBinding: {
                    target: Memory.ApplicationController,
                    property: 'moves'
                }
            }),

            timer: M.LabelView.design({
                value: 'Time: ',
                isInline: YES
            })

            ,timerCounter: M.LabelView.design({

                value: '',
                isInline: YES,
                contentBinding: {
                    target: Memory.ApplicationController,
                    property: 'timer'
                }
            }),

            pitch: M.DashboardView.design({
                events: {
                    tap: {
                        target: Memory.ApplicationController,
                        action: 'itemClicked'
                    }
                },
                itemsPerLine: 4,
                isEditable: NO,
                contentBinding: {
                    target: Memory.ApplicationController,
                    property: 'cards'
                }
            })


        })


    })

});