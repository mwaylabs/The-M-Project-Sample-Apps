// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: StoreSample
// View: ReadPage
// ==========================================================================

m_require('app/views/tabs.js');

StoreSample.ReadPage = M.PageView.design({

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
        childViews: 'getPersonsLabel getPersonsButton',

        getPersonsLabel: M.LabelView.design({
            value: 'To load all stored persons into the application, tap the button below. This will advice the app to retrieve all available person records from the local storage.'
        }),

        getPersonsButton: M.ButtonView.design({
            value: 'Get stored persons',
            events: {
                tap: {
                    target: StoreSample.ReadController,
                    action: 'getPersons'
                }
            }
        })
    }),

    tabs: StoreSample.Tabs

});