m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toggle_switch_view_list_item_template.js');

KitchenSink.ControlsToggleSwitchView = M.PageView.design({

    events: {
        pageshow:{

            target: KitchenSink.ControlsToggleSwitchController,

            action: 'init'

        }},

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            events: {
                tap:{
                    target: KitchenSink.ControlsToggleSwitchController,
                    action: 'back'
                }
            }

        }),

        title: M.LabelView.design({

            value: 'M.ToggleSwitchView',

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsToggleListViewListItemTemplate,

            contentBinding: {
                target: KitchenSink.ControlsToggleSwitchController,
                property: 'controlsList'
            }

        })

    }),

    tabBar: KitchenSink.TabBar

});