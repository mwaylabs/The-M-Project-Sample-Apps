// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: ColorWheel 
// ==========================================================================

var ColorWheel  = ColorWheel || {};

ColorWheel.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage : 'page1',

    page1: M.PageView.design({

        events: {
            pageshow: {
                target: ColorWheel.ApplicationController,
                action: 'init'
            }
        },

        childViews: 'grid',

        grid: M.GridView.design({

            layout: M.TWO_COLUMNS,

            childViews: 'box wheel',

            box: M.ContainerView.design({
                
            }),

            wheel: M.CanvasView.design({
                
            })

        })

    })

});