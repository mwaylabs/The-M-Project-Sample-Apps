// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: DualbindSample 
// ==========================================================================

var DualbindSample  = DualbindSample || {};

DualbindSample.app = M.Application.design({
    
    entryPage: 'page',

    page: M.PageView.design({

        childViews: 'header content',

        header: M.ToolbarView.design({
                value: 'Dualbind Sample',
                anchorLocation : M.TOP
        }),

        content: M.ScrollView.design({

            /* order in childViews string defines render order*/
            childViews: 'inputField1 inputField2 inputField3 inputField4',

            inputField1: M.TextFieldView.design({
                name: 'input_field1',
                contentBinding: {
                    target: DualbindSample.InputController,
                    property: 'input'
                },
                contentBindingReverse: {
                    target: DualbindSample.InputController,
                    property: 'input'
                },
                initialText: 'Enter some text here ...'
            }),

            inputField2: M.TextFieldView.design({
                name: 'input_field2',
                contentBinding: {
                    target: DualbindSample.InputController,
                    property: 'input'
                },
                contentBindingReverse: {
                    target: DualbindSample.InputController,
                    property: 'input'
                },
                initialText: '... or here ...'
            }),

            inputField3: M.TextFieldView.design({
                name: 'input_field3',
                contentBinding: {
                    target: DualbindSample.InputController,
                    property: 'input'
                },
                contentBindingReverse: {
                    target: DualbindSample.InputController,
                    property: 'input'
                },
                initialText: '... or here ...'
            }),

            inputField4: M.TextFieldView.design({
                name: 'input_field4',
                contentBinding: {
                    target: DualbindSample.InputController,
                    property: 'input'
                },
                contentBindingReverse: {
                    target: DualbindSample.InputController,
                    property: 'input'
                },
                initialText: '... or even here!'
            })

        })

    })

});