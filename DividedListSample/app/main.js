// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: DividedListSample 
// ==========================================================================

var DividedListSample  = DividedListSample || {};

DividedListSample.app = M.Application.design({
    
    entryPage: 'page1',
    
    page1: M.PageView.design({

        events: {
            pageshow: {
                target: DividedListSample.ListController,
                action: 'init'
            }
        },

        childViews: 'header content',

        header: M.ToolbarView.design({
            value: 'Divided List Sample',
            anchorLocation: M.TOP
        }),

        content: M.ScrollView.design({

            childViews: 'contactList',

            contactList: M.ListView.design({

                contentBinding: {
                    target: DividedListSample.ListController,
                    property: 'contacts'
                },
                items: '',
                listItemTemplateView: DividedListSample.ContactList,
                removeItemsOnUpdate: NO,
                isInset: NO,
                isDividedList: YES,
                hasSearchBar: YES,
                searchBarInitialText: 'Suchbegriff...',

                /* comment this out to use a custom search bar (see below) */
                usesDefaultSearchBehaviour: YES


                /* comment this in, to use a custom search bar (see controller) */
                /*usesDefaultSearchBehaviour: NO,
                searchBar: {
                    events: {
                        keyup: {
                            target: DividedListSample.ListController,
                            action: 'searchStringDidChange'
                        }
                    }
                }*/

            })

        })

    })
});