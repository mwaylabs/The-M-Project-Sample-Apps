// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: DividedListSample
// Page: ContactList
// ==========================================================================

DividedListSample.ContactList = M.ListItemView.design({

    childViews: 'firstName lastName',

    isSelectable: NO,

    firstName : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= firstName %>',
            operation: function(v, label) {
                return v + '&#160;';
            }
        },
        isInline: YES,
        cssClass: 'firstName'
    }),

    lastName : M.LabelView.design({
        valuePattern: '<%= lastName %>',
        isInline: YES,
        cssClass: 'lastName'
    })

});

