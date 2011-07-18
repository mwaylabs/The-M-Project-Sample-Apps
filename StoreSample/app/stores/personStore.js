// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: StoreSample
// Model: PersonStore
// ==========================================================================

StoreSample.PersonStore = M.Store.create({

    model: StoreSample.PersonModel,

    dataProvider: M.DataProviderWebStorage.configure({
        storage: M.WEBSTORAGE_LOCAL
    })

});
