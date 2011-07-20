// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9-pre
//
// Project: MyContacts
// Page: RemotePage
// ==========================================================================

m_require('app/views/ContactItemView.js');
m_require('app/views/Tabs.js');

MyContacts.RemotePage = M.PageView.design({

    events: {
        pageshow: {
            target: MyContacts.RemoteStorageController,
            action: 'init'
        }
    },

    childViews: 'header content tabs',

    header: M.ToolbarView.design({

        childViews: 'centerLabel addButton',

        centerLabel: M.LabelView.design({
            value: 'Remote Storage',
            anchorLocation: M.CENTER
        }),

        addButton: M.ButtonView.design({
            value: 'new',
            icon: 'plus',
            events: {
                tap: {
                    target: MyContacts.RemoteStorageController,
                    action: 'newContact'
                }
            },
            anchorLocation: M.RIGHT
        }),

        anchorLocation: M.TOP



    }),

    content: M.ScrollView.design({
        childViews: 'contactList',

        contactList: M.ListView.design({
            contentBinding: {
                target: MyContacts.RemoteStorageController,
                property: 'contacts'
            },
            listItemTemplateView: MyContacts.ContactItemView
        })
    }),

    tabs: MyContacts.Tabs
});

