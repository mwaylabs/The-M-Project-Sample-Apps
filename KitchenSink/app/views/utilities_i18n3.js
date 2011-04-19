m_require('app/views/tabs.js');
m_require('app/views/utilities_page.js');
m_require('app/views/utilities_i18n_page.js');

KitchenSink.UtilitiesI18n3 = M.PageView.design({

    onLoad : {
        target: KitchenSink.UtilitiesI18nController,
        action: 'getLanguage2'
    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({
        childViews: 'backButton title',

        backButton: M.ButtonView.design({
            value: 'Back',
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            target: KitchenSink.UtilitiesI18nController,
            action: 'here'
        }),

        title: M.LabelView.design({
            value: 'Get the current language',
            anchorLocation: M.CENTER
        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({
        childViews: 'label1 label2 markupTitle markup',

        label1: M.LabelView.design({

            value: 'The current language is ',

            isInline: YES

        }),

        label2: M.LabelView.design({

            value: '',

            computedValue: {

                contentBinding: 'KitchenSink.UtilitiesI18nController.language2',

                operation: function(v) {

                    return '\'' + v + '\''

                }
            },

            isInline: YES

        }),

        markupTitle: M.LabelView.design({
            value: 'Sourcecode',
            cssClass: 'titleSource'
        }),

        markup: M.LabelView.design({
            value: 'var language = M.I18N.getLanguage();',
            cssClass: 'source'
        })

    }),

    tabBar: KitchenSink.TabBar
});