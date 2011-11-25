// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: SelectionListSample
// Page: TabBar
// ==========================================================================

SelectionListSample.TabBar = M.TabBarView.design({

    childViews: 'TabSingleSelection TabMultipleSelection TabSingleSelectionDialog TabMultipleSelectionDialog',

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
    }),

    TabMultipleSelectionDialog: M.TabBarItemView.design({

        value: 'Multiple (Dialog)',
        page: 'multipleSelectionDialog'
    })

})

