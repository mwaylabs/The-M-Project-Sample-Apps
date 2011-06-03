m_require('app/views/tabs.js');
m_require('app/views/utilities_page.js');
m_require('app/views/utilities_date_page.js');

KitchenSink.UtilitiesDate2 = M.PageView.design({

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
            value: 'Format a date',
            anchorLocation: M.CENTER
        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({
        childViews: 'textfield button markupTitle markup',

        textfield: M.TextFieldView.design({

            value: 'mm/dd/yyyy HH:MM:ss',

            isGrouped: NO

        }),

        button: M.ButtonView.design({

            value: 'Format date',

            events: {
                tap:{
                    target: KitchenSink.UtilitiesDateController,
                    action: 'formatDate1'
                }
            }

        }),

        markupTitle: M.LabelView.design({
            value: 'The current date',
            cssClass: 'titleSource'
        }),

        markup: M.LabelView.design({
            computedValue: {

                value: '',

                contentBinding: {
                    target: KitchenSink.UtilitiesDateController,
                    property: 'date1'
                },

                operation: function(v) {

                    if (!v || v === '' || v === null) {
                        v = M.Date.now().format('mm/dd/yyyy HH:MM:ss')
                    }

                    return v;

                }

            },
            cssClass: 'source'
        })

    }),

    tabBar: KitchenSink.TabBar
});