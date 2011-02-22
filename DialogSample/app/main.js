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

                value: 'Open alert dialog',
                target: DialogSample.DialogController,
                action: 'openAlert'

            }),

            confirmButton: M.ButtonView.design({

                value: 'Open confirm dialog',
                target: DialogSample.DialogController,
                action: 'openConfirm'


            }),

            actionSheetButton: M.ButtonView.design({

                value: 'Open actionSheet dialog',
                target: DialogSample.DialogController,
                action: 'openActionSheet'


            }),
            notification: M.LabelView.design({

                contentBinding: 'DialogSample.DialogController.notification',
                value: '',
                cssClass: 'notification'

            })

        })

    })

});