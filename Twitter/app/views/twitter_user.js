// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: twitter
// Page: TwitterUserView
// ==========================================================================

Twitter.TwitterUserView = M.ListItemView.design({

    childViews: 'date label1',

    items: 'results',

    isSelectable: NO,

    date : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= createdAr %>',
            operation: function(v) {
                var date = M.Date.create(v);
                return date.format('mm/dd/yyyy HH:MM');
            }
        },
        cssClass: 'date'
    }),

    label1 : M.LabelView.design({
        valuePattern: '<%= tweet %>',
        cssClass: 'text'
    })

});