
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: SelectionListSample
// Controller: MultipleSelectionController
// ==========================================================================

SelectionListSample.MultipleSelectionController = M.Controller.extend({

    items: null,

    init: function(isFirstLoad) {
        if(isFirstLoad) {
            this.set('items', [
                {
                    value: 'germany',
                    label: 'Germany (germany)'
                },
                {
                    value: 'italy',
                    label: 'Italy (italy)'
                },
                {
                    value: 'us',
                    label: 'United States (us)'
                },
                {
                    value: 'spain',
                    label: 'Spain (spain)'
                }
            ]);
        }
    },

    setSelection: function() {

        var selectionList = M.ViewManager.getView('multipleSelection', 'selectionList');
        var textField = M.ViewManager.getView('multipleSelection', 'textField');

        if(!textField.value || textField.value === '') {

            M.DialogView.alert({

                title: 'Error',

                message: 'You have to enter a value in the text field in order to set the selection list\'s selection.'

            });

        } else {

            var textFieldValue = $.trim(textField.value.replace(/\s/gi, ''));

            selectionList.setSelection(textFieldValue.split(','));

            textField.setValue('');

            textField.lostFocus();

        }

    },

    getSelection: function() {

        var selectionList = M.ViewManager.getView('multipleSelection', 'selectionList');
        var selection = selectionList.getSelection(YES);

        var message = '';
        if(selection.length > 0) {
            for(var i in selection) {
                message += selection[i].label + '<br/>';
            }
        } else {
            message = 'Nothing selected...';
        }

        M.DialogView.alert({

            title: 'Selected Item(s)',

            message: message

        });

    }

})
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: SelectionListSample
// Controller: SingleSelectionController
// ==========================================================================

SelectionListSample.SingleSelectionController = M.Controller.extend({

    items: null,

    init: function(isFirstLoad) {
        if(isFirstLoad) {
            this.set('items', [
                {
                    value: 'germany',
                    label: 'Germany (germany)'
                },
                {
                    value: 'italy',
                    label: 'Italy (italy)'
                },
                {
                    value: 'us',
                    label: 'United States (us)'
                },
                {
                    value: 'spain',
                    label: 'Spain (spain)'
                }
            ]);
        }
    },

    setSelection: function() {

        var selectionList = M.ViewManager.getView('singleSelection', 'selectionList');
        var textField = M.ViewManager.getView('singleSelection', 'textField');

        if(!textField.value || textField.value === '') {

            M.DialogView.alert({

                title: 'Error',

                message: 'You have to enter a value in the text field in order to set the selection list\'s selection.'

            });

        } else {

            selectionList.setSelection(textField.value);

            textField.setValue('');

            textField.lostFocus();

        }

    },

    getSelection: function() {

        var selectionList = M.ViewManager.getView('singleSelection', 'selectionList');

        M.DialogView.alert({

            title: 'Selected Item',

            message: selectionList.getSelection(YES) ? selectionList.getSelection(YES).label : 'Nothing selected...'

        });

    }

})
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: SelectionListSample
// Controller: SingleSelectionDialogController
// ==========================================================================

SelectionListSample.SingleSelectionDialogController = M.Controller.extend({

    items: null,

    init: function(isFirstLoad) {
        if(isFirstLoad) {
            this.set('items', [
                {
                    value: 'germany',
                    label: 'Germany (germany)'
                },
                {
                    value: 'italy',
                    label: 'Italy (italy)'
                },
                {
                    value: 'us',
                    label: 'United States (us)'
                },
                {
                    value: 'spain',
                    label: 'Spain (spain)'
                }
            ]);
        }
    },

    setSelection: function() {

        var selectionList = M.ViewManager.getView('singleSelectionDialog', 'selectionList');
        var textField = M.ViewManager.getView('singleSelectionDialog', 'textField');

        if(!textField.value || textField.value === '') {

            M.DialogView.alert({

                title: 'Error',

                message: 'You have to enter a value in the text field in order to set the selection list\'s selection.'

            });

        } else {

            selectionList.setSelection(textField.value);
            
            textField.setValue('');

            textField.lostFocus();

        }

    },

    getSelection: function() {

        var selectionList = M.ViewManager.getView('singleSelectionDialog', 'selectionList');

        M.DialogView.alert({

            title: 'Selected Item',

            message: selectionList.getSelection(YES) ? selectionList.getSelection(YES).label : 'Nothing selected...'

        });

    }

})
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: SelectionListSample
// Page: TabBar
// ==========================================================================

SelectionListSample.TabBar = M.TabBarView.design({

    childViews: 'TabSingleSelection TabMultipleSelection TabSingleSelectionDialog',

    anchorLocation: M.BOTTOM,

    TabSingleSelection: M.TabBarItemView.design({

        value: 'Single',
        page: 'singleSelection',
        isActive: YES

    }),

    TabMultipleSelection: M.TabBarItemView.design({

        value: 'Multiple',
        page: 'multipleSelection'

    }),

    TabSingleSelectionDialog: M.TabBarItemView.design({

        value: 'Single (Dialog)',
        page: 'singleSelectionDialog'
    })

})


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

    events: {
        pageshow: {
            target: SelectionListSample.MultipleSelectionController,
            action: 'init'
        }
    },

    header: M.ToolbarView.design({

        value: 'Multiple',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'selectionList textField buttonGroup',

        selectionList: M.SelectionListView.design({

            events: {
                change: {
                    action: function(selection, selectionObject) {
                        var selectionString = '';
                        for(var i in selection) {
                            selectionString += (selectionString ? ', ' : '') + selection[i];
                        }
                        //console.log(selectionString);
                    }
                }
            },

            selectionMode: M.MULTIPLE_SELECTION,

            label: 'Language',

            /**
             * This selection list uses content binding to dynamically define its child views. If you
             * want to switch to a static way of doing this, comment these few lines and uncomment the
             * code block below.
             */
            contentBinding: {
                target: SelectionListSample.MultipleSelectionController,
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

            initialText: 'e.g.: spain, germany'

        }),

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'setButton getButton',

            isSelectable: NO,

            setButton: M.ButtonView.design({

                value: 'set selection',

                events: {
                    tap: {
                        target: SelectionListSample.MultipleSelectionController,
                        action: 'setSelection'
                    }
                }

            }),

            getButton: M.ButtonView.design({

                value: 'get selection',

                events: {
                    tap: {
                        target: SelectionListSample.MultipleSelectionController,
                        action: 'getSelection'
                    }
                }

            })

        })

    }),

    tabBar: SelectionListSample.TabBar

})


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

        childViews: 'selectionList textField buttonGroup',

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


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: SelectionListSample
// Page: SingleSelectionPage
// ==========================================================================

m_require('app/views/TabBar.js');

SelectionListSample.SingleSelectionPage = M.PageView.design({

    childViews: 'header content tabBar',

    events: {
        pageshow: {
            target: SelectionListSample.SingleSelectionController,
            action: 'init'
        }
    },

    header: M.ToolbarView.design({

        value: 'Single',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'selectionList textField buttonGroup',

        selectionList: M.SelectionListView.design({

            selectionMode: M.SINGLE_SELECTION,

            label: 'Language',

            events: {
                change: {
                    action: function(selection, selectionObject) {
                        //console.log(selection);
                    }
                }
            },

            /**
             * This selection list uses content binding to dynamically define its child views. If you
             * want to switch to a static way of doing this, comment these few lines and uncomment the
             * code block below.
             */
            contentBinding: {
                target: SelectionListSample.SingleSelectionController,
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

            initialText: 'e.g.: us'

        }),

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'setButton getButton',

            isSelectable: NO,

            setButton: M.ButtonView.design({

                value: 'set selection',

                events: {
                    tap: {
                        target: SelectionListSample.SingleSelectionController,
                        action: 'setSelection'
                    }
                }

            }),

            getButton: M.ButtonView.design({

                value: 'get selection',

                events: {
                    tap: {
                        target: SelectionListSample.SingleSelectionController,
                        action: 'getSelection'
                    }
                }

            })

        })

    }),

    tabBar: SelectionListSample.TabBar

})

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: SelectionListSample 
// ==========================================================================

var SelectionListSample  = SelectionListSample || {};

SelectionListSample.app = M.Application.design({

    entryPage: 'singleSelection',

    singleSelection: SelectionListSample.SingleSelectionPage,

    multipleSelection: SelectionListSample.MultipleSelectionPage,

    singleSelectionDialog: SelectionListSample.SingleSelectionDialogPage

});