DashboardSample.TemplateView = M.ListItemView.design({
    childViews: 'string',
    isSelectable: NO,
    string: M.LabelView.design({
        valuePattern: '<%= label %>'
    })
});