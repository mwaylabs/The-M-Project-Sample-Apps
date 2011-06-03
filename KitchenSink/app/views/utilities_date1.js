m_require('app/views/tabs.js');
m_require('app/views/utilities_page.js');
m_require('app/views/utilities_date_page.js');

KitchenSink.UtilitiesDate1 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({
        childViews: 'backButton title',

        backButton: M.ButtonView.design({
            value: 'Back',
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            events: {
                tap:{
                    target: KitchenSink.UtilitiesDateController,
                    action: 'here'
                }
            }
        }),

        title: M.LabelView.design({
            value: 'Get the current date',
            anchorLocation: M.CENTER
        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({
        childViews: 'label markupTitle markup',

        label: M.LabelView.design({

            computedValue: {

                value: 'The current date is ',

                operation: function(v) {

                    return v + M.Date.now().format('mm/dd/yyyy HH:MM:ss');

                }

            }

        }),

        markupTitle: M.LabelView.design({
            value: 'Sourcecode',
            cssClass: 'titleSource'
        }),

        markup: M.LabelView.design({
            value: 'M.LabelView.design({\n\n\tcomputedValue: {\n\n\t\tvalue: \'The current date is \',\n\n\t\toperation: function(v) {\n\n\t\t\treturn v + M.Date.now().format(\'mm/dd/yyyy HH:MM:ss\');\n\n\t\t}\n\n\t}\n\n})',
            cssClass: 'source'
        })

    }),

    tabBar: KitchenSink.TabBar
});