// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: StoreSample
// View: CreatePage
// ==========================================================================

StoreSample.ListTemplate = M.ListItemView.design({

    childViews: 'firstName lastName',

    firstName: M.LabelView.design({
        computedValue: {
            valuePattern: '<%= firstName %>',
            operation: function(v) {
                return v + ', '
            }
        },
        isInline: YES
    }),

    lastName: M.LabelView.design({
        valuePattern: '<%= lastName %>',
        isInline: YES
    })

});