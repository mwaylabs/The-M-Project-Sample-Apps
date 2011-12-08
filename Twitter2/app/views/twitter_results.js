// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: twitter
// Page: TwitterResultsView
// ==========================================================================

Twitter2.TwitterResultsView = M.ListItemView.design({

    childViews: 'image1 label1 label2 text',

    events: {
        tap: {
            target: Twitter2.TwitterController,
            action: 'showUser'
        }
    },

    image1: M.ImageView.design({
        valuePattern: '<%= userImage %>',
        cssClass: 'listThumb'
    }),

    label1 : M.LabelView.design({
        valuePattern: '<%= userName %>',
        cssClass: 'username'
    }),

    label2 : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= createdAt %>',
            operation: function(v) {
                var date = M.Date.create(v);
                return date.format('mm/dd/yyyy HH:MM');
            }
        },
        cssClass: 'date'
    }),

    text : M.LabelView.design({
        valuePattern: '<%= tweet %>',
        cssClass: 'text'
    })

});