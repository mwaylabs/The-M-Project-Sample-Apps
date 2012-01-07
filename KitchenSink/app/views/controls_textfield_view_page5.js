m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_textfield_view_page.js');

KitchenSink.ControlsTextFieldViewPage5 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            events: {
                tap:{
                    target: KitchenSink.ControlsTextFieldViewController,
                    action: 'here'
                }
            }

        }),

        title: M.LabelView.design({

            value: 'Input type date',

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'textfield markupTitle markup',

        textfield: M.TextFieldView.design({

            isGrouped: NO,

            inputType: M.INPUT_DATE

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.TextFieldView.design({\n\n\tisGrouped: NO,\n\n\tinputType: M.INPUT_DATE\n\n})\n\n',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});