m_require('app/views/Tabs.js');

MyContacts.WebSqlAddContactPage = M.PageView.design({

    cssClass: 'page',

    childViews: 'header content tabs',

    header: M.ToolbarView.design({
        childViews: 'centerLabel',

        centerLabel: M.LabelView.design({
            value: 'New Contact',
            anchorLocation: M.CENTER
        }),

        showBackButton: YES,

        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({

        childViews: 'firstNameField lastNameField streetField numberField zipField cityField phoneField addButton l',

        firstNameField: M.TextFieldView.design({
            initialText: 'First Name',
            cssClassOnInit:'light',
            cssClass: 'field'
        }),

        lastNameField: M.TextFieldView.design({
            initialText: 'Last Name',
            cssClassOnInit:'light',
            cssClass: 'field'
        }),

        streetField: M.TextFieldView.design({
            initialText: 'Street',
            cssClass: 'inlineFieldBig field',
            cssClassOnInit:'light'
        }),

        numberField: M.TextFieldView.design({
            initialText: 'No.',
            cssClass: 'inlineFieldSmall field',
            cssClassOnInit:'light'
        }),

        zipField: M.TextFieldView.design({
            initialText: 'Zip',
            cssClassOnInit:'light',
            cssClass: 'field'
        }),

        cityField: M.TextFieldView.design({
            initialText: 'City',
            cssClassOnInit:'light',
            cssClass: 'field'
        }),

        phoneField: M.TextFieldView.design({
            initialText: 'Phone, e.g. (+49) 0711 13245768',
            cssClassOnInit:'light',
            cssClass: 'field'
        }),

        addButton: M.ButtonView.design({
            value: 'Add contact',
            icon: '+',
            target: MyContacts.WebSqlController,
            action: 'addContact'
        }),

        l: M.LabelView.design({
            value:'&#160;'
        })

    }),

    tabs: MyContacts.Tabs
});

