KitchenSink.ControlsToggleListViewListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    events: {
        tap: {
            target:KitchenSink.ControlsToggleSwitchController,
            action:'controlSelected'
        }
    },

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});