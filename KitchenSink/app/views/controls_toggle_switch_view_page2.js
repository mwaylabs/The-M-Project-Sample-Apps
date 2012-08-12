m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toolbar_view_page.js');

KitchenSink.ControlsToggleSwitchViewPage2 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            isFixed: YES,

            events: {
                tap:{
                    target: KitchenSink.ControlsToggleSwitchController,
                    action: 'here'
                }
            }

        }),

        title: M.LabelView.design({

            value: 'Default toolbar',

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'toggleswitch markupTitle markup',

        toggleswitch:M.ToggleSwitchView.design({
            label: 'I am the label and this switch has isMini:YES',
            isMini: YES
        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ToggleSwitchView.design({\n\n\tlabel: \'I am the label and this switch has isMini:YES\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});