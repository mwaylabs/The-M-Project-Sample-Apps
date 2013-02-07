m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_panel_view_page.js');

KitchenSink.ControlsPanelViewPage1 = M.PageView.design({

    childViews: 'header content tabBar leftRevealPanel leftPushPanel rightOverlayPanel',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            events: {
                tap:{
                    target: KitchenSink.ControlsPanelViewController,
                    action: 'here'
                }
            }

        }),

        title: M.LabelView.design({

            value: 'Default button',

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'button1 button2 button3  markupTitle markup',

        button1: M.ButtonView.design({
            value: 'Reveal left panel',
            events: {
                tap: {
                    target: KitchenSink.ControlsPanelViewController,
                    action: 'openLeftRevealPanel'
                }
            }
        }),

        button2: M.ButtonView.design({
            value: 'Push left panel',
            events: {
                tap: {
                    target: KitchenSink.ControlsPanelViewController,
                    action: 'openLeftPushPanel'
                }
            }
        }),

        button3: M.ButtonView.design({

            value: 'Overlay right panel',
            events: {
                tap: {
                    target: KitchenSink.ControlsPanelViewController,
                    action: 'openRightOverlayPanel'
                }
            }
        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.PanelView.design({\n\n\tposition: M.LEFT,\n\n\tdisplay: M.REVEAL,\n\n\tchildViews: \'label\',\n\n\tlabel: M.LabelView.design({\n\n\t\tvalue: \'Left Panel: Reveal\'\n\n\t}) \n\n })',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar,

    leftRevealPanel: M.PanelView.design ({

        position:M.LEFT,

        display:M.REVEAL,

        childViews: 'label button',

        label:M.LabelView.design({
            value: '<h1>Left Panel: Reveal</h1>' +
            '<p>This panel is positioned on the left with the reveal display mode.</p>' +
            '<p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>'
        }),

        button:M.ButtonView.design({
            value: 'Close Panel',
            events: {
                tap: {
                    target: KitchenSink.ControlsPanelViewController,
                    action: 'closePanel'
                }
            }
        })
    }),

    leftPushPanel: M.PanelView.design ({

        position:M.LEFT,

        display:M.PUSH,

        childViews: 'label button',

        label:M.LabelView.design({
            value: '<h1>Left Panel: Push</h1>' +
            '<p>This panel is positioned on the left with the push display mode.</p>' +
            '<p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>'
        }),

        button:M.ButtonView.design({
            value: 'Close Panel',
            events: {
                tap: {
                    target: KitchenSink.ControlsPanelViewController,
                    action: 'closePanel'
                }
            }
        })
    }),

    rightOverlayPanel: M.PanelView.design ({

        position:M.RIGHT,

        display:M.OVERLAY,

        childViews: 'label button',

        label:M.LabelView.design({
            value: '<h1>Right Panel: Overlay</h1>' +
            '<p>This panel is positioned on the right with the overlay display mode.</p>' +
            '<p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>'
        }),

        button:M.ButtonView.design({
            value: 'Close Panel',
            events: {
                tap: {
                    target: KitchenSink.ControlsPanelViewController,
                    action: 'closePanel'
                }
            }
        })
    })

});