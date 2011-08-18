m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_list_view_page.js');
m_require('app/views/controls_list_view_page7_template.js');

KitchenSink.ControlsListViewPage7 = M.PageView.design({

    events: {
        pageshow:{

            target: KitchenSink.ControlsListViewController,

            action: 'initPage7'

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
                    target: KitchenSink.ControlsListViewController,
                    action: 'here'
                }
            }

        }),

        title: M.LabelView.design({

            value: 'Non-selectable list',

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'list markupTitle markup',

        list: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsListViewPage7Template,

            contentBinding: {
                target: KitchenSink.ControlsListViewController,
                property: 'page7'
            }

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode (template view)',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'MyApp.MyTemplate = M.ListItemView.design({\n\n\tchildViews: \'name\',\n\n\tisSelectable: NO,\n\n\tname: M.LabelView.design({\n\n\t\tvaluePattern: \'<%= name %>\'\n\n\t})\n\n});',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});