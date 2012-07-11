// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: PersistentToolbar
// View: Page2
// ==========================================================================

PersistentToolbar.Page2 = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
        pageshow: {
            target: PersistentToolbar.AppController,
            action: 'init'
        }
    },
    
    cssClass: 'Page2',

    childViews: 'header content footer',

    header: M.ToolbarView.design({

        childViews: 'back title',


        title:M.LabelView.design({
            anchorLocation: M.CENTER,
            value: '',
            contentBinding:{
                target: PersistentToolbar.AppController,
                property : 'headerTitle'
            }
        }),

        back:M.ButtonView.design({

            anchorLocation: M.LEFT,
            value:'back',
            icon: 'back',
            events:{
                vclick:{
                    target: PersistentToolbar.AppController,
                    action: 'back'
                }
            }
        }),

        anchorLocation: M.TOP
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

