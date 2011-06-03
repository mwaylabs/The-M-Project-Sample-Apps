// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: DialogSample 
// ==========================================================================

var DialogSample  = DialogSample || {};

DialogSample.app = M.Application.design({
    
    entryPage: 'page',
    
    page: M.PageView.design({

        childViews: 'header content',

        header: M.ToolbarView.design({
            value: 'Dialog Sample',
            anchorLocation: M.TOP
        }),

        content: M.ScrollView.design({

            childViews: 'alertButton confirmButton actionSheetButton notification',

            alertButton: M.ButtonView.design({
                events: {
                    tap: {
                        target: DialogSample.DialogController,
                        action: 'openAlert'
                    }
                },
                value: 'Open alert dialog'
            }),

            confirmButton: M.ButtonView.design({
                events: {
                    tap: {
                        target: DialogSample.DialogController,
                        action: 'openConfirm'
                    }
                },
                value: 'Open confirm dialog'
            }),

            actionSheetButton: M.ButtonView.design({
                events: {
                    tap: {
                        target: DialogSample.DialogController,
                        action: 'openActionSheet'
                    }
                },
                value: 'Open actionSheet dialog'
            }),
            notification: M.LabelView.design({
                contentBinding: {
                    target: DialogSample.DialogController,
                    property: 'notification'
                },
                value: '',
                cssClass: 'notification'

            })

        })

    })

});