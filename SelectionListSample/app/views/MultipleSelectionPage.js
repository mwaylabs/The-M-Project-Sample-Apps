// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: SelectionListSample
// Page: MultipleSelectionPage
// ==========================================================================

m_require('app/views/TabBar.js');

SelectionListSample.MultipleSelectionPage = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Multiple',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'selectionList textField buttonGroup',

        selectionList: M.SelectionListView.design({

            //applyTheme: NO,

            childViews: 'optionGermany optionItaly optionUS optionSpain',

            selectionMode: M.MULTIPLE_SELECTION,

            label: 'Language',

            optionGermany: M.SelectionListItemView.design({
                value: 'germany',
                label: 'Germany (germany)',
                isSelected: YES
            }),

            optionItaly: M.SelectionListItemView.design({
                value: 'italy',
                label: 'Italy (italy)'
            }),

            optionUS: M.SelectionListItemView.design({
                value: 'us',
                label: 'United States (us)'
            }),

            optionSpain: M.SelectionListItemView.design({
                value: 'spain',
                label: 'Spain (spain)'
            })

        }),

        textField: M.TextFieldView.design({

            isGrouped: NO,

            cssClass: 'textField',

            cssClassOnInit: 'textFieldInit',

            initialText: 'e.g.: spain, germany'

        }),

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'setButton getButton',

            isSelectable: NO,

            setButton: M.ButtonView.design({

                value: 'set selection',

                target: SelectionListSample.MultipleSelectionController,

                action: 'setSelection'

            }),

            getButton: M.ButtonView.design({

                value: 'get selection',

                target: SelectionListSample.MultipleSelectionController,

                action: 'getSelection'

            })

        })

    }),

    tabBar: SelectionListSample.TabBar

})

