// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: VersionSample 
// ==========================================================================

var VersionSample  = VersionSample || {};

VersionSample.app = M.Application.design({

    entryPage : 'page1',

    page1: M.PageView.design({

        childViews: 'header content',

        header: M.ToolbarView.design({
            value: 'Version Sample'
        }),

        content: M.ScrollView.design({
            childViews: 'label',

            label: M.LabelView.design({
                computedValue: {
                    operation: function(v) {
                        return 'Version ' + M.Application.getConfig('version');
                    }
                }
            })
        })

    })

});