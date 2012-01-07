FormSample.Template = M.ListItemView.design({

    childViews: 'firstname lastname',

    isSelectable: NO,

    firstname: M.LabelView.design({

        valuePattern: '<%= firstName %>',
        isInline: YES

    }),

    lastname: M.LabelView.design({

        valuePattern: '<%= lastName %>',
        isInline: YES

    })

});