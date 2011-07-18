// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: StoreSample
// View: CreatePage
// ==========================================================================

m_require('app/views/tabs.js');

StoreSample.CreatePage = M.PageView.design({

    events: {
        pageshow: {
            target: StoreSample.ListController,
            action: 'init'
        }
    },

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
        childViews: 'createPersonLabel createPersonButton spacer savePersonLabel savePersonButton',

        createPersonLabel: M.LabelView.design({
            value: 'By tapping the button below, a person record will be created, containing a firstname and a lastname.'
        }),

        createPersonButton: M.ButtonView.design({
            value: 'Create new person',
            events: {
                tap: {
                    target: StoreSample.CreateController,
                    action: 'createPerson'
                }
            }
        }),

        spacer: M.LabelView.design({
            value: '&#160;'
        }),

        savePersonLabel: M.LabelView.design({
            value: 'In order to save all newly created persons, tap this button. Then the application will store them into the local storage of your browser and mark them as \'in sync\'.'
        }),


        savePersonButton: M.ButtonView.design({
            value: 'Save new persons',
            events: {
                tap: {
                    target: StoreSample.CreateController,
                    action: 'savePersons'
                }
            }
        })
    }),

    tabs: StoreSample.Tabs

});