// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: twitter
// Page: TwitterResultsView
// ==========================================================================

Twitter.TwitterResultsView = M.ListItemView.design({

    childViews: 'image1 label1 label2 text',

    events: {
        tap: {
            target: Twitter.TwitterController,
            action: 'showUser'
        }
    },

    image1: M.ImageView.design({
        valuePattern: '<%= profile_image_url %>',
        cssClass: 'listThumb'
    }),

    label1 : M.LabelView.design({
        valuePattern: '<%= from_user %>',
        cssClass: 'username'
    }),

    label2 : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= created_at %>',
            operation: function(v) {
                var date = M.Date.create(v);
                return date.format('mm/dd/yyyy HH:MM');
            }
        },
        cssClass: 'date'
    }),

    text : M.LabelView.design({
        valuePattern: '<%= text %>',
        cssClass: 'text'
    })

});