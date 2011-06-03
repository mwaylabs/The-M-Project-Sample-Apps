// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: FormSample
// Model: Name
// ==========================================================================

FormSample.Name = M.Model.create({
    __name__: 'Name', // do not delete this property!

    firstName: M.Model.attr('String',{
        isRequired:YES
    }),

    lastName: M.Model.attr('String', {
        isRequired:YES
    })

}, M.DataProviderLocalStorage);
