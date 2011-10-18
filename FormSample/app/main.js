// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: FormSample 
// ==========================================================================

var FormSample = FormSample || {};

FormSample.app = M.Application.design({

    entryPage : 'page1',

    page1: M.PageView.design({

        events: {
            pageshow: {
                target: FormSample.ApplicationController,
                action: 'init'
            }
        },

        childViews: 'header content',

        header: M.ToolbarView.design({
            value: 'Form Sample'
        }),

        content: M.ScrollView.design({
            childViews: 'form buttonGrid clearLSButton',
            form: M.FormView.design({
                childViews: 'grid',

                showAlertDialogOnError: YES,

                grid: M.GridView.design({
                    childViews: 'firstname container',

                    layout: M.TWO_COLUMNS,

                    firstname: M.TextFieldView.design({
                        label: 'Firstname',
                        initialText: 'Firstname',
                        validators: [M.PresenceValidator],
                        cssClassOnInit: 'initialText'
                    }),

                    container: M.ContainerView.design({
                        childViews: 'lastname',

                        lastname: M.TextFieldView.design({
                            label: 'Lastname',
                            initialText: 'Lastname',
                            validators: [M.PresenceValidator],
                        cssClassOnInit: 'initialText'
                        })
                    })
                })
                
            }),


            buttonGrid: M.GridView.design({
                childViews: 'clearButton saveButton',

                layout: M.TWO_COLUMNS,

                clearButton: M.ButtonView.design({
                    value: 'Clear',
                    events: {
                        tap: {
                            target: FormSample.ApplicationController,
                            action: 'clearForm'
                        }
                    }
                }),

                saveButton: M.ButtonView.design({
                    value: 'Save To Local Storage',
                    events : {
                        tap: {
                            target: FormSample.ApplicationController,
                            action: 'save'
                        }
                    }
                })
            }),

            clearLSButton: M.ButtonView.design({
                value: 'Clear Local Storage',
                events : {
                    tap: {
                        target: FormSample.ApplicationController,
                        action: 'clear'
                    }
                },
                cssClass: 'a tmp-actionsheet-destructive-button'
            })
            
        })
    })
});