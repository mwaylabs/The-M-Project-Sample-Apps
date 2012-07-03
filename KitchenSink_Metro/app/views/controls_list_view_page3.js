m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_list_view_page.js');
m_require('app/views/controls_list_view_page3_template.js');

KitchenSink.ControlsListViewPage3 = M.PageView.design({

    events: {
        pageshow:{

            target: KitchenSink.ControlsListViewController,

            action: 'initPage3'

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

            value: 'Complex list',

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'list markupTitle markup',

        list: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsListViewPage3Template,

            contentBinding: {
                target: KitchenSink.ControlsListViewController,
                property: 'page3'
            }

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode (list item template)',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'MyApp.MyListTemplate = M.ListItemView.design({\n\n\tchildViews: \'image name subtitle\',\n\n\timage: M.ImageView.design({\n\n\t\tcomputedValue: {\n\n\t\t\tvaluePattern: \'<%= image %>\',\n\n\t\t\toperation: function(v) {\n\n\t\t\t\treturn \'theme/images/\' + v;\n\n\t\t\t}\n\n\t\t},\n\n\t\tcssClass: \'listPage3Image\'\n\n\t}),\n\n\tname: M.LabelView.design({\n\n\t\tvaluePattern: \'<%= name %>\'\n\n\t}),\n\n\tsubtitle: M.LabelView.design({\n\n\t\tvaluePattern: \'<%= subtitle %>\',\n\n\t\tcssClass: \'listPage3Subtitle\'\n\n\t})\n\n});',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});