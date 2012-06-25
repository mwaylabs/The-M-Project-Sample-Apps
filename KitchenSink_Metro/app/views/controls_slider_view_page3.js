m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_slider_view_page.js');

KitchenSink.ControlsSliderViewPage3 = M.PageView.design({

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

            value: 'Slider with custom steps',

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'slider markupTitle markup',

        slider: M.SliderView.design({

            min: 0,

            max: 100,

            step: 5

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.SliderView.design({\n\n\tmin: 0,\n\n\tmax: 100,\n\n\tstep: 5\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});