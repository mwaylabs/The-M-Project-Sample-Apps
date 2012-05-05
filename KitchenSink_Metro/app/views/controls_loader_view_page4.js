m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_loader_view_page.js');

KitchenSink.ControlsLoaderViewPage4 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            events: {
                tap:{
                    target: KitchenSink.ControlsLoaderViewController,
                    action: 'here'
                }
            }

        }),

        title: M.LabelView.design({

            value: 'Loader as info message',

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'buttonOn markupTitle markup',

        buttonOn: M.ButtonView.design({

            value: 'Show',

            events: {
                tap:{
                    target: KitchenSink.ControlsLoaderViewController,
                    action: 'showLoader4'
                }
            }

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'M.LoaderView.show(\'This message will disappear in 5 seconds!\', YES);\nwindow.setTimeout(function() {\n\tM.LoaderView.hide();\n}, 5000);\n\nM.LoaderView.hide();',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});