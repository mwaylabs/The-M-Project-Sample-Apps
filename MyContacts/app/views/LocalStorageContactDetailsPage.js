// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9-pre
//
// Project: MyContacts
// Page: LocalStorageContactDetailsPage
// ==========================================================================

m_require('app/views/Tabs.js');

MyContacts.LocalStorageContactDetailsPage = M.PageView.design({

        childViews: 'header content',     

        header: M.ToolbarView.design({

            childViews: 'nameLabel',

            nameLabel: M.LabelView.design({
                label: '',
                contentBinding: {
                    target: MyContacts.LocalStorageController,
                    property: 'currentContactName'
                },
                anchorLocation: M.CENTER
            }),

            showBackButton: YES,

            anchorLocation: M.TOP

        }),

        content: M.ScrollView.design({

            childViews: 'firstNameField lastNameField streetField numberField zipField cityField phoneField updateButton delButton',

            firstNameField: M.TextFieldView.design({
                label: 'First Name'
            }),

            lastNameField: M.TextFieldView.design({
                label: 'Last Name'
            }),

            streetField: M.TextFieldView.design({
                label: 'Street'
            }),

            numberField: M.TextFieldView.design({
                label: 'No.'
            }),

            zipField: M.TextFieldView.design({
                label: 'Zip'
            }),

            cityField: M.TextFieldView.design({
                label: 'City'
            }),

            phoneField: M.TextFieldView.design({
                label: 'Phone'
            }),

            updateButton: M.ButtonView.design({
                value: 'Update Contact',
                cssClass: 'e',
                events: {
                    tap: {
                        target: MyContacts.LocalStorageController,
                        action: 'updateContact'
                    }
                }
            }),

            delButton: M.ButtonView.design({
                value: 'Delete Contact',
                cssClass: 'b',
                events: {
                    tap: {
                        target: MyContacts.LocalStorageController,
                        action: 'deleteContact'
                    }
                }
            })

        }),

        tabs: MyContacts.Tabs
});

