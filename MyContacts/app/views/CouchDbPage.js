
m_require('app/views/ContactItemView.js');
m_require('app/views/Tabs.js');

MyContacts.CouchDbPage = M.PageView.design({

    events: {
        pageshow: {
            target: MyContacts.CouchDbController,
            action: 'init'
        }
    },

    childViews: 'header content tabs',

    header: M.ToolbarView.design({

        childViews: 'centerLabel addButton',

        centerLabel: M.LabelView.design({
            value: 'CouchDB',
            anchorLocation: M.CENTER
        }),

        addButton: M.ButtonView.design({
            value: 'new',
            icon: 'plus',
            events: {
                tap: {
                    target: MyContacts.CouchDbController,
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
                target: MyContacts.CouchDbController,
                property: 'contacts'
            },
            listItemTemplateView: MyContacts.ContactItemView
        })
    }),

    tabs: MyContacts.Tabs

});

