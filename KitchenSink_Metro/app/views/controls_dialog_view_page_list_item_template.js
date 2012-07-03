KitchenSink.ControlsDialogViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    events: {
        tap: {
            target:KitchenSink.ControlsDialogViewController,
            action:'controlSelected'
        }
    },

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});