SplitViewSample.MyListItemView = M.ListItemView.design({
    childViews: 'label',

    label: M.LabelView.design({
        valuePattern: '<%= value %>'
    })
});