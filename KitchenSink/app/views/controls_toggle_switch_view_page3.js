m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toolbar_view_page.js');

KitchenSink.ControlsToggleSwitchViewPage3 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            isFixed: YES,

            events: {
                tap:{
                    target: KitchenSink.ControlsToggleSwitchController,
                    action: 'here'
                }
            }

        }),

        title: M.LabelView.design({

            value: 'Default toolbar',

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'toggleswitch markupTitle markup',

        toggleswitch:M.ToggleSwitchView.design({
            label: 'Select language',
            isMini: NO,
            onLabel: 'DE',
            offLabel: 'EN',
            offValue: 'en',
            onValue: 'de',
            isInline: YES,
            cssClass:'lang',
            events:{
                change:{
                    action: function(id, ev){
                        alert("the view with the id: " + id + " has changed to: " + M.ViewManager.getViewById(id).getValue());
                    }
                }
            }
        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ToggleSwitchView.design({\n\n\tlabel: "Select language",\n\n\tisMini: NO,\n\n\tonLabel: "DE",\n\n\toffLabel: "EN",\n\n\toffValue: "en",\n\n\tonValue:\n\n\t"de",\n\n\tisInline: YES,\n\n\tcssClass:"lang",\n\n\tevents:{\n\n\t\tchange:{\n\n\t\t\taction: function(){\n\n\t\t\t\t\talert("the view with the id: " + id + " has changed to: " + M.ViewManager.getViewById(id).getValue());\n\n\t\t\t }\n\n\t\t }\n\n\t }\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});