// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9-pre
//
// Project: MyContacts
// Page: ContactItemView
// ==========================================================================

MyContacts.ContactItemView = M.ListItemView.design({

    childViews: 'firstName lastName linebreakLabel street number zip city phone',

    cssClass: 'contactItem',

    target: MyContacts.ApplicationController,
    action: 'showDetails',

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
        isInline:YES,
        cssClass: 'lastName'
    }),

    linebreakLabel: M.LabelView.design({
        value: '&#160',
        cssClass: 'hidden'
    }),

    street: M.LabelView.design({
        isInline: YES,
        computedValue: {
            valuePattern: '<%= street %>',
            operation: function(v) {
                return v + ' ';
            }
        },
        cssClass: 'address'
    }),

    number : M.LabelView.design({
        isInline: YES,
        computedValue: {
            valuePattern: '<%= number %>',
            operation: function(v) {
                return v + ' | ';
            }
        },
        cssClass: 'address'
    }),

    zip : M.LabelView.design({
        isInline: YES,
        computedValue: {
            valuePattern: '<%= zip %>',
            operation: function(v) {
                return v + ' ';
            }
        },
        cssClass: 'address'
    }),

    city : M.LabelView.design({
        isInline: YES,
        valuePattern: '<%= city %>',
        cssClass: 'address'
    }),

    phone : M.LabelView.design({
        isInline: YES,
        computedValue: {
            valuePattern: '<%= phone %>',
            operation: function(v) {
                return ' | Telefon: ' + v ;
            }
        },
        cssClass: 'address'
    })

    
});

