// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: PersistentToolbar
// View: Page6
// ==========================================================================

PersistentToolbar.Page6 = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
        pageshow: {
            target: PersistentToolbar.AppController,
            action: 'init'
        }
    },
    
    cssClass: 'Page6',

    childViews: 'header content footer',

    header: M.ToolbarView.design({
        value: 'HEADER',
        anchorLocation: M.TOP,
        contentBinding:{
            target: PersistentToolbar.AppController,
            property : 'headerTitle'
        },
        isPersistent: NO
    }),

    content: M.ScrollView.design({
        childViews: 'label',
        label: M.LabelView.design({
            value: 'next',
            events:{
                vclick:{
                    target: PersistentToolbar.AppController,
                    action: 'next'
                }
            }
        })
    }),

    footer: M.ToolbarView.design({
        value: 'FOOTER',
        anchorLocation: M.BOTTOM
    })

});

