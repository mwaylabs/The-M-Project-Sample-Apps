// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9-pre
//
// Project: MyContacts
// Page: WebSqlContactDetailsPage
// ==========================================================================

m_require('app/views/Tabs.js');

MyContacts.WebSqlContactDetailsPage = M.PageView.design({

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

            childViews: 'back nameLabel',

            nameLabel: M.LabelView.design({
                label: '',
                contentBinding: {
                    target: MyContacts.WebSqlController,
                    property: 'currentContactName'
                },
                anchorLocation: M.CENTER
            }),

            back: M.ButtonView.design({
                value: 'back',
                icon: 'arrow-l',
                anchorLocation: M.LEFT,
                events: {
                    tap: {
                        target: MyContacts.LocalStorageController,
                        action: function() {
                            this.switchToPage('webSqlContacts', null, YES);
                        }
                    }
                }
            }),

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
                        target: MyContacts.WebSqlController,
                        action: 'updateContact'
                    }
                }
            }),

            delButton: M.ButtonView.design({
                value: 'Delete Contact',
                cssClass: 'b',
                events: {
                    tap: {
                        target: MyContacts.WebSqlController,
                        action: 'deleteContact'
                    }
                }
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

