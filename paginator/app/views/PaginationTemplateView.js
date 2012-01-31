paginator.paginationTemplateView = M.ListItemView.design({

    childViews: 'objid',

    events: {
        tap: {
            //target:mobileCRM.BusinesspartnerController,
            //action:'businessPartnerSelected'
        }
    },

    objid: M.LabelView.design({
        isInline: YES,
        computedValue: {
            valuePattern: '<%= objectID %>',
            operation: function(v) {
                return v + ' ';
            }
        },
        cssClass: 'redListItemLabel'
    })
});