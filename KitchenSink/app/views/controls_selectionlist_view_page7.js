m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_selectionlist_view_page.js');

KitchenSink.ControlsSelectionListViewPage7 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            events: {
                tap:{
                    target: KitchenSink.ControlsSelectionListViewController,
                    action: 'here'
                }
            }

        }),

        title: M.LabelView.design({

            value: 'valueBinding Example',

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'selectionList setValueBindingValueButton markupTitle markup buttonmarkup',

        selectionList: M.SelectionListView.design({

            selectionMode: M.SINGLE_SELECTION_DIALOG,

            initialText: 'Please choose',

            contentBinding: {
                target: KitchenSink.ControlsSelectionListViewController,
                property: 'valueBindingContent'
            },

            valueBinding: {
                target: KitchenSink.ControlsSelectionListViewController,
                property: 'valueBindingValue'
            }

        }),

        setValueBindingValueButton:M.ButtonView.design({

            value: 'Set selection to 07:00:00',

            events:{
                tap:{
                    target: KitchenSink.ControlsSelectionListViewController,
                    action: 'setValueBindingValue'
                }
            }
        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.SelectionListView.design({\n\n\tinitialText: \'Please choose\',\n\n\tselectionMode: M.SINGLE_SELECTION_DIALOG,\n\n\tcontentBinding: {\n\n\t\ttarget: KitchenSink.ControlsSelectionListViewController,\n\n\t\tproperty: \'valueBindingContent\'\n\n\t}),\n\n\tvalueBinding: {\n\n\t\ttarget: KitchenSink.ControlsSelectionListViewController,,\n\n\t\tproperty: \'valueBindingValue\'\n\n\t})\n\n})',

            cssClass: 'source'

        }),

        buttonmarkup: M.LabelView.design({

            value: 'KitchenSink.ControlsSelectionListViewController.set\n("valueBindingValue", "07:00:00");',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});