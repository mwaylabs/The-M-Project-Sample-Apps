// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: �2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Todos2.TodoItemView = M.ListItemView.design({

    events: {
        tap: {
            target: Todos2.TodoController,
            action: 'showDetails'
        }
    },

    childViews: 'title text date',

    title : M.LabelView.design({
        valuePattern: '<%= title %>'
    }),

    text : M.LabelView.design({
        valuePattern: '<%= text %>',
        cssClass: 'listText'
    }),

    date : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= date %>',
            operation: function(date, label) {
                return M.I18N.l('due_date') + ': ' + date.format(M.I18N.l('due_date_format'));
            }
        },
        cssClass: 'listDate'
    })    

});