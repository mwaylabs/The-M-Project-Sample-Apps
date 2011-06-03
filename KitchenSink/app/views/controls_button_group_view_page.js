m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_group_view_page_list_item_template.js');

KitchenSink.ControlsButtonGroupViewPage = M.PageView.design({

    events: {
        pageshow:{

            target: KitchenSink.ControlsButtonGroupViewController,

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
                    target: KitchenSink.ControlsButtonViewController,
                    action: 'back'
                }
            }

        }),

        title: M.LabelView.design({

            value: 'M.ButtonGroupView',

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsButtonGroupViewPageListItemTemplate,

            contentBinding: {
                target: KitchenSink.ControlsButtonGroupViewController,
                property: 'controlsList'
            }

        })

    }),

    tabBar: KitchenSink.TabBar

});