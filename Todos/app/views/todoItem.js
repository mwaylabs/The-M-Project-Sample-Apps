// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso
//
// Project: Todos
// View: TodoItemView
// ==========================================================================

Todos.TodoItem = M.ListItemView.design({

    events: {
        tap: {
            target: Todos.DetailsController,
            action: 'showDetails'
        }
    },

    cssClass: 'listItem',

    childViews: 'title text date buttonDone buttonEdit',

    title : M.LabelView.design({
        valuePattern: '<%= title %>'
    }),

    text : M.LabelView.design({
        valuePattern: '<%= text %>',
        cssClass: 'listText'
    }),

    date: M.LabelView.design({
        computedValue: {
            valuePattern: '<%= date %>',
            operation: function(date) {
                return M.I18N.l('due_date') + ': ' + date.format(M.I18N.l('due_date_format'));
            }
        },
        cssClass: 'listDate'
    }),

    buttonDone: M.ButtonView.design({
        value: '',
        icon: 'check',
        events: {
            tap: {
                target: Todos.ListController,
                action: 'markAsDone'
            }
        }
    }),

    buttonEdit: M.ButtonView.design({
        value: '',
        icon: 'gear',
        events: {
            tap: {
                action: function(id, m_id) {
                    var listItemId = $('#' + id).parent().parent().parent().parent().attr('id');
                    $('#' + listItemId).trigger('tap');
                }
            }
        }
    })

});