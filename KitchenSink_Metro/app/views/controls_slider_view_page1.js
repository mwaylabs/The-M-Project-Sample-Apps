m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_slider_view_page.js');

KitchenSink.ControlsSliderViewPage1 = M.PageView.design({

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
                    action: 'here'
                }
            }

        }),

        title: M.LabelView.design({

            value: 'Default slider',

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'slider markupTitle markup',

        slider: M.SliderView.design({}),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.SliderView.design({})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});