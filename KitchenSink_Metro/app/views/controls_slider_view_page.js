m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_slider_view_page_list_item_template.js');

KitchenSink.ControlsSliderViewPage = M.PageView.design({

    events: {
        pageshow:{

            target: KitchenSink.ControlsSliderViewController,

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
                    target: KitchenSink.ControlsSliderViewController,
                    action: 'back'
                }
            }

        }),

        title: M.LabelView.design({

            value: 'M.SliderView',

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsSliderViewPageListItemTemplate,

            contentBinding: {
                target: KitchenSink.ControlsSliderViewController,
                property: 'controlsList'
            }

        })

    }),

    tabBar: KitchenSink.TabBar

});