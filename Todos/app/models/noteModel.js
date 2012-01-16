// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Todos
// Model: NoteModel
// ==========================================================================

Todos.NoteModel = M.Model.create({

    __name__: 'Note',

    usesValidation: NO,

    title: M.Model.attr('String', {
        isRequired: YES,
        defaultValue: ''
    }),

    text: M.Model.attr('String', {
        isRequired: YES,
        defaultValue: ''
    }),

    date: M.Model.attr('Date', {
        defaultValue: ''
    }),

    done: M.Model.attr('Boolean', {
        defaultValue: NO
    })

}, M.DataProviderLocalStorage);
