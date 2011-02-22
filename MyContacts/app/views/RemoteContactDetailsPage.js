// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9-pre
//
// Project: MyContacts
// Page: RemoteContactDetailsPage
// ==========================================================================

m_require('app/views/Tabs.js');

MyContacts.RemoteContactDetailsPage = M.PageView.design({

	  /*
	   * uncomment the following lines, to use the onLoad function
	   * to trigger a function every time the page is rendered.
	   */
	   
	  /*
	  onLoad: {
      	target: ServerTest.MyController,
	 	action: 'init'
	  },
	  */

        childViews: 'header content',     

        header: M.ToolbarView.design({

            childViews: 'nameLabel',

            nameLabel: M.LabelView.design({
                label: '',
                contentBinding: 'MyContacts.RemoteStorageController.currentContactName',
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
                target: MyContacts.RemoteStorageController,
                action: 'updateContact'
            }),

            delButton: M.ButtonView.design({
                value: 'Delete Contact',
                cssClass: 'b',
                target: MyContacts.RemoteStorageController,
                action: 'deleteContact'
            })

        })

      /*
	   * uncomment this lines, to use a footer in this page.
	   * To see the footer add the footer to the child view
	   */

      /*
       ,footer: M.ToolbarView.design({
            value: 'FOOTER',
            anchorLocation: M.BOTTOM
       })
       */
});

