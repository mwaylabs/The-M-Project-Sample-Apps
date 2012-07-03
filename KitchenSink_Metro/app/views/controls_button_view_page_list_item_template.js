KitchenSink.ControlsButtonViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    events: {
        tap: {
            target:KitchenSink.ControlsButtonViewController,
            action:'controlSelected'
        }
    },

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});