// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: StoreSample
// Controller: ListController
// ==========================================================================

StoreSample.ListController = M.Controller.extend({

    items: {},

    selectionListItems: {},

    init: function(isFirstLoad) {
        if(isFirstLoad) {
            this.selectionListItems['initialOption'] = {
                value: 'selectOption',
                label: 'Select a person'
            }
            this.set('selectionListItems', this.selectionListItems);
        }
    },

    add: function(record, state) {
        this.items[state] = this.items[state] || {};

        /* add to list (and maybe overwrite a previous version of that record) */
        this.items[state][record.m_id] = record;

        /* add to selection list items (if not deleted_permanently) */
        if(state !== 'deleted_permanently') {
            this.selectionListItems[record.m_id] = this.selectionListItems[record.m_id] || {};
            this.selectionListItems[record.m_id].value = record.m_id;
            this.selectionListItems[record.m_id].label = record.get('firstName') + ' ' + record.get('lastName');
        }

        /* init content binding */
        this.set('items', this.items);
        this.set('selectionListItems', this.selectionListItems);
    },

    remove: function(record, state) {
        if(this.items[state]) {
            delete this.items[state][record.m_id];
            delete this.selectionListItems[record.m_id];

            if(_.keys(this.items[state]).length === 0) {
                delete this.items[state];
            }
        }

        /* init content binding */
        this.set('items', this.items);
        this.set('selectionListItems', this.selectionListItems);
    }

});
