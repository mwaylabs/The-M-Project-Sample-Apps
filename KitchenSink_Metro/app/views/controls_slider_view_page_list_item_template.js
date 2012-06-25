KitchenSink.ControlsSliderViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    events: {
        tap: {
            target:KitchenSink.ControlsSliderViewController,
            action:'controlSelected'
        }
    },

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});