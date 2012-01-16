// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Todos
// View: SettingsPage
// ==========================================================================

m_require('app/views/tabs.js');

Todos.SettingsPage = M.PageView.design({

    events: {
        pageshow: {
            target: Todos.SettingsController,
            action: 'init'
        }
    },

    childViews: 'header content tabs',

    header: M.ToolbarView.design({
        value: M.I18N.l('settings'),
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({

        childViews: 'langSelection contactHeader contactText contactMail contactUrl',

        langSelection: M.SelectionListView.design({

            childViews: 'item1 item2 item3 item4 item5 item6 item7 item8 item9 item10 item11 item12 item13 item14 item15',

            selectionMode: M.SINGLE_SELECTION_DIALOG,

            label: M.I18N.l('language'),

            name: 'language',

            cssClass: 'todos_form',

            events: {
                change: {
                    target: Todos.SettingsController,
                    action: 'changeLanguage'
                }
            },

            item1: M.SelectionListItemView.design({

                label: M.I18N.l('german'),
                value: 'de_de'

            }),

            item2: M.SelectionListItemView.design({

                label: M.I18N.l('english'),
                value: 'en_us'

            }),

            item3: M.SelectionListItemView.design({

                label: M.I18N.l('spanish'),
                value: 'es_es'

            }),

            item4: M.SelectionListItemView.design({

                label: M.I18N.l('portuguese'),
                value: 'pt_br'

            }),

            item5: M.SelectionListItemView.design({

                label: M.I18N.l('chinese-simple'),
                value: 'zh_cn'

            }),

            item6: M.SelectionListItemView.design({

                label: M.I18N.l('chinese-traditional'),
                value: 'zh_tw'

            }),

            item7: M.SelectionListItemView.design({

                label: M.I18N.l('russian'),
                value: 'ru_ru'

            }),

            item8: M.SelectionListItemView.design({

                label: M.I18N.l('italian'),
                value: 'it_it'

            }),

            item9: M.SelectionListItemView.design({

                label: M.I18N.l('polish'),
                value: 'pl_pl'

            }),

            item10: M.SelectionListItemView.design({

                label: M.I18N.l('dutch'),
                value: 'nl_nl'

            }),

            item11: M.SelectionListItemView.design({

                label: M.I18N.l('slovakian'),
                value: 'sk_sk'

            }),

            item12: M.SelectionListItemView.design({

                label: M.I18N.l('korean'),
                value: 'ko_kr'

            }),

            item13: M.SelectionListItemView.design({

                label: M.I18N.l('swedish'),
                value: 'sv_sv'

            }),

            item14: M.SelectionListItemView.design({

                label: M.I18N.l('finnish'),
                value: 'fi_fi'

            }),

            item15: M.SelectionListItemView.design({

                label: M.I18N.l('frensh'),
                value: 'fr_fr'

            })

        }),

        contactHeader: M.LabelView.design({

            value: M.I18N.l('contact'),

            cssClass: 'label'

        }),

        contactText: M.LabelView.design({

            value: M.I18N.l('contactText'),

            cssClass: 'contactText'

        }),

        contactMail: M.LabelView.design({

            value: 'info@panacoda.com',

            hyperlinkType: M.HYPERLINK_EMAIL,

            hyperlinkTarget: 'info@panacoda.com'

        }),

        contactUrl: M.LabelView.design({

            value: 'www.panacoda.com',

            hyperlinkType: M.HYPERLINK_WEBSITE,

            hyperlinkTarget: 'http://www.panacoda.com/'

        })

    }),

    tabs: Todos.Tabs

});

