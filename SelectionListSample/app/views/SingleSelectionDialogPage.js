// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: SelectionListSample
// Page: SingleSelectionDialogPage
// ==========================================================================

m_require('app/views/TabBar.js');

SelectionListSample.SingleSelectionDialogPage = M.PageView.design({

    childViews: 'header content tabBar',

    events: {
        pageshow: {
            target: SelectionListSample.SingleSelectionDialogController,
            action: 'init'
        }
    },

    header: M.ToolbarView.design({

        value: 'Single (Dialog)',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'grid buttonGroup',

        grid: M.GridView.design({

            childViews: 'selectionList textField ',
            layout: {
                    cssClass: 'newActivityGrid',
                    columns: {
                        0: 'leftColumnNewActivity',
                        1: 'rightColumnNewActivity'
                    }
                },

            selectionList: M.SelectionListView.design({
                events: {
                    change: {
                        action: function(selection, selectionObject) {
                            //console.log(selection);
                        }
                    }
                },

                selectionMode: M.SINGLE_SELECTION_DIALOG,

                label: 'Language',

                cssClass: 'singleSelectionDialog',

                initialText: 'Please choose...',

                /**
                 * This selection list uses content binding to dynamically define its child views. If you
                 * want to switch to a static way of doing this, comment these few lines and uncomment the
                 * code block below.
                 */
                contentBinding: {
                    target: SelectionListSample.SingleSelectionDialogController,
                    property: 'items'
                }

                /**
                 * The following lines show how to statically assign items to a selection list. To use this,
                 * simply comment the lines where we set this view's content binding (right above).
                 */
                /*
                childViews: 'optionGermany optionItaly optionUS optionSpain',

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
                })*/

            }),

            textField: M.TextFieldView.design({

                isGrouped: NO,

                cssClass: 'textField',

                cssClassOnInit: 'textFieldInit',

                initialText: 'e.g.: germany'

            })

        }),

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'setButton getButton',

            isSelectable: NO,

            setButton: M.ButtonView.design({

                value: 'set selection',

                events: {
                    tap: {
                        target: SelectionListSample.SingleSelectionDialogController,
                        action: 'setSelection'
                    }
                }

            }),

            getButton: M.ButtonView.design({

                value: 'get selection',

                events: {
                    tap: {
                        target: SelectionListSample.SingleSelectionDialogController,
                        action: 'getSelection'
                    }
                }

            })

        })

    }),

    tabBar: SelectionListSample.TabBar

})

