// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: StoreSample
// View: UpdatePage
// ==========================================================================

m_require('app/views/tabs.js');

StoreSample.UpdatePage = M.PageView.design({

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
        childViews: 'selectPersonLabel selectPersonList spacer updatePersonLabel updatePersonButton spacer saveUpdatedPersonLabel saveUpdatedPersonButton',

        selectPersonLabel: M.LabelView.design({
            value: 'To simulate an update on a record, select a person (if you already created one) from the selection list below. Then update it by tapping the \'Update this person\' button.'
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

        updatePersonLabel: M.LabelView.design({
            value: 'If you have selected a person form the selection list above, tap this button to update it.'
        }),


        updatePersonButton: M.ButtonView.design({
            value: 'Update this person',
            events: {
                tap: {
                    target: StoreSample.UpdateController,
                    action: 'updatePerson'
                }
            }
        }),

        spacer: M.LabelView.design({
            value: '&#160;'
        }),

        saveUpdatedPersonLabel: M.LabelView.design({
            value: 'By tapping the button below, all records, that were updated will be saved to the local storage.'
        }),

        saveUpdatedPersonButton: M.ButtonView.design({
            value: 'Save updated person',
            events: {
                tap: {
                    target: StoreSample.UpdateController,
                    action: 'saveUpdatedPersons'
                }
            }
        })
    }),

    tabs: StoreSample.Tabs

});