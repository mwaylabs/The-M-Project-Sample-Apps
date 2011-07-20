// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9-pre
//
// Project: MyContacts
// Page: LocalStoragePage
// ==========================================================================

m_require('app/views/ContactItemView.js');
m_require('app/views/Tabs.js');

MyContacts.LocalStoragePage = M.PageView.design({

	events: {
        pageshow: {
            target: MyContacts.LocalStorageController,
            action: 'init'
        }
    },

    childViews: 'header content tabs',

    header: M.ToolbarView.design({

        childViews: 'centerLabel addButton',

        centerLabel: M.LabelView.design({
            value: 'Local Storage',
            anchorLocation: M.CENTER
        }),

        addButton: M.ButtonView.design({
            value: 'new',
            icon: 'plus',
            anchorLocation: M.RIGHT,
            events: {
                tap: {
                    target: MyContacts.LocalStorageController,
                    action: 'newContact'
                }
            }
        }),
        
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'contactList',

        contactList: M.ListView.design({
            contentBinding: {
                target: MyContacts.LocalStorageController,
                property: 'contacts'
            },
            listItemTemplateView: MyContacts.ContactItemView
        })
    }),

    tabs: MyContacts.Tabs
});

