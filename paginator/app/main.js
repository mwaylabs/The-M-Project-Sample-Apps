// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: paginator
// ==========================================================================
m_require('app/views/PaginationTemplateView.js');
var paginator  = paginator || {};


paginator.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage : 'page1',

    page1: M.PageView.design({

		events: {
	       pageshow: {
	           target: paginator.appController,
	           action: 'init'
	       }
	   },

        childViews: 'header content footer',

        header: M.ToolbarView.design({
            value: 'HEADER',
            anchorLocation: M.TOP
        }),

        content: M.ScrollView.design({
            childViews: 'label pagination',
            label: M.LabelView.design({
                value: 'Welcome to The M-Project'
            }),
			pagination: M.PaginationView.design({
				contentBinding: {
	                target: paginator.appController,
	                property: 'list'
	            },
	            listItemTemplateView: paginator.paginationTemplateView,
	            itemsPerPage: 5,
	            idName: 'objectID'
			})
        }),

        footer: M.ToolbarView.design({
            value: 'FOOTER',
            anchorLocation: M.BOTTOM
        })
    
    })

});