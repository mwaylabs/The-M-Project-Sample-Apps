MyContacts.LS_TAB = 'LocalStorage';
MyContacts.WS_TAB = 'WebSQL';
MyContacts.R_TAB = 'Remote';
MyContacts.CDB_TAB = 'CouchDB';

MyContacts.Tabs = M.TabBarView.design({

    childViews: 'tabItem1 tabItem2 tabItem3 tabItem4',

    anchorLocation: M.BOTTOM,

    transition: M.TRANSITION.NONE,

    name: 'tabbar1',

    tabItem1: M.TabBarItemView.design({

        value: MyContacts.LS_TAB,
        page: 'localStorageContacts',
        icon: 'notepad',
        isActive: YES

    }),

    tabItem2: M.TabBarItemView.design({

        value: MyContacts.WS_TAB,
        page: 'webSqlContacts',
        icon: 'todo'

    }),

    tabItem3: M.TabBarItemView.design({

        value: MyContacts.R_TAB,
        page: 'remoteContacts',
        icon: 'settings'

    }),

    tabItem4: M.TabBarItemView.design({

        value: MyContacts.CDB_TAB,
        page: 'couchDbContacts',
        icon: 'settings'

    })

})