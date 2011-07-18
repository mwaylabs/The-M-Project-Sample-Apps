// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: StoreSample
// View: DeletePage
// ==========================================================================

m_require('app/views/tabs.js');

StoreSample.DeletePage = M.PageView.design({

    childViews: 'header content tabs',

    header: M.ToolbarView.design({

        childViews: 'title infoButton',

        anchorLocation: M.TOP,

        title: M.LabelView.design({
            value: 'Store Sample',
            anchorLocation: M.CENTER
        }),

        infoButton: M.ButtonView.design({
            isIconOnly: YES,
            icon: 'info',
            anchorLocation: M.RIGHT,
            events: {
                tap: {
                    target: StoreSample.NavigationController,
                    action: 'gotoInfoPage'
                }
            }
        })

    }),

    content: M.ScrollView.design({
        childViews: 'selectPersonLabel selectPersonList spacer deletePersonLabel deletePersonButton spacer deleteAllPersonsLabel deleteAllPersonsButton',

        selectPersonLabel: M.LabelView.design({
            value: 'In order to delete a single person, select one form the selection list below. If there is no person to select, create one or load some from the local storage.'
        }),

        selectPersonList: M.SelectionListView.design({
            selectionMode: M.SINGLE_SELECTION_DIALOG,
            contentBinding: {
                target: StoreSample.ListController,
                property: 'selectionListItems'
            }
        }),

        spacer: M.LabelView.design({
            value: '&#160;'
        }),

        deletePersonLabel: M.LabelView.design({
            value: 'If you have selected a person form the selection list above, tap this button to delete it.'
        }),

        deletePersonButton: M.ButtonView.design({
            value: 'Delete this person',
            events: {
                tap: {
                    target: StoreSample.DeleteController,
                    action: 'deletePerson'
                }
            }
        }),

        spacer: M.LabelView.design({
            value: '&#160;'
        }),

        deleteAllPersonsLabel: M.LabelView.design({
            value: 'To delete all persons at once, tap the button below.'
        }),

        deleteAllPersonsButton: M.ButtonView.design({
            value: 'Delete all persons',
            events: {
                tap: {
                    target: StoreSample.DeleteController,
                    action: 'deleteAllPersons'
                }
            }
        })
    }),

    tabs: StoreSample.Tabs

});