// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: TabsButtonGroupsSample 
// ==========================================================================

var TabsButtonGroupsSample  = TabsButtonGroupsSample || {};

TabsButtonGroupsSample.app = M.Application.design({

    entryPage: 'page1',


    page1: M.PageView.design({

        childViews: 'header content tabs',

        cssClass: 'page1',

        header: M.ToolbarView.design({
    
                value: 'BIRD',

                anchorLocation: M.TOP

        }),

        content: M.ScrollView.design({

            childViews: 'buttonGroup',

            buttonGroup: M.ButtonGroupView.design({

                childViews: 'button1 button2 button3 button4',

                target: TabsButtonGroupsSample.Controller,

                action: 'selChanged',

                button1: M.ButtonView.design({
                    value: '#FF0000',
                    isActive: YES
                }),

                button2: M.ButtonView.design({
                    value: '#AA0000'
                }),

                button3: M.ButtonView.design({
                    value: '#550000'
                }),

                button4: M.ButtonView.design({
                    value: '#000000'
                })

            })

        }),

        tabs: TabsButtonGroupsSample.Tabs

    }),

    page2: M.PageView.design({

        childViews: 'header content tabs',

        cssClass: 'page2',

        header: M.ToolbarView.design({

                value: 'EYE',
                anchorLocation: M.TOP

        }),

        content: M.ScrollView.design({

            childViews: 'buttonGroup',

            buttonGroup: M.ButtonGroupView.design({

                childViews: 'button1 button2 button3 button4',

                target: TabsButtonGroupsSample.Controller,

                action: 'selChanged',

                direction: M.VERTICAL,

                button1: M.ButtonView.design({
                    value: '#00FF00',
                    isActive: YES
                }),

                button2: M.ButtonView.design({
                    value: '#00AA00'
                }),

                button3: M.ButtonView.design({
                    value: '#005500'
                }),

                button4: M.ButtonView.design({
                    value: '#000000'
                })

            })

        }),

        tabs: TabsButtonGroupsSample.Tabs

    }),

    page3: M.PageView.design({

        childViews: 'header content tabs',

        cssClass: 'page3',

        header: M.ToolbarView.design({

                value: 'BEER',
                anchorLocation: M.TOP

        }),

        content: M.ScrollView.design({

            childViews: 'buttonGroup',

            buttonGroup: M.ButtonGroupView.design({

                childViews: 'button1 button2 button3 button4',

                target: TabsButtonGroupsSample.Controller,

                buttonsPerLine: 2,

                action: 'selChanged',

                button1: M.ButtonView.design({
                    value: '#0000FF',
                    isActive: YES
                }),

                button2: M.ButtonView.design({
                    value: '#0000AA'
                }),

                button3: M.ButtonView.design({
                    value: '#000055'
                }),

                button4: M.ButtonView.design({
                    value: '#000000'
                })

            })

        }),

        tabs: TabsButtonGroupsSample.Tabs

    }),

    page4: M.PageView.design({

        childViews: 'header content tabs',

        cssClass: 'page4',

        header: M.ToolbarView.design({

                value: 'GIFT',
                anchorLocation: M.TOP

        }),

        content: M.ScrollView.design({

            childViews: 'buttonGroup',

            buttonGroup: M.ButtonGroupView.design({

                childViews: 'button1 button2 button3 button4',

                buttonsPerLine: 2,

                isCompact: NO,

                target: TabsButtonGroupsSample.Controller,

                action: 'selChanged',

                button1: M.ButtonView.design({
                    value: '#FFFF00',
                    isActive: YES
                }),

                button2: M.ButtonView.design({
                    value: '#AAAA00'
                }),

                button3: M.ButtonView.design({
                    value: '#555500'
                }),

                button4: M.ButtonView.design({
                    value: '#000000'
                })

            })

        }),

        tabs: TabsButtonGroupsSample.Tabs

    }),

    page5: M.PageView.design({

        childViews: 'header content tabs',

        cssClass: 'page5',

        header: M.ToolbarView.design({

                value: 'LOVE',
                anchorLocation: M.TOP

        }),

        content: M.ScrollView.design({

            childViews: 'buttonGroup',

            buttonGroup: M.ButtonGroupView.design({

                childViews: 'button1 button2 button3 button4',

                target: TabsButtonGroupsSample.Controller,

                buttonsPerLine: 2,

                isInset: NO,

                action: 'selChanged',

                button1: M.ButtonView.design({
                    value: '#FF00CC',
                    isActive: YES
                }),

                button2: M.ButtonView.design({
                    value: '#AA0088'
                }),

                button3: M.ButtonView.design({
                    value: '#550044'
                }),

                button4: M.ButtonView.design({
                    value: '#000000'
                })

            })

        }),

        tabs: TabsButtonGroupsSample.Tabs

    })

});