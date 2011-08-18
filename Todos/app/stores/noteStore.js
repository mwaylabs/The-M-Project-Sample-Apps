// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Todos
// Model: NoteStore
// ==========================================================================

Todos.NoteStore = M.Store.create({

    model: Todos.NoteModel,

    dataProvider: M.DataProviderWebStorage.configure({
        storage: M.WEBSTORAGE_LOCAL
    })

});
