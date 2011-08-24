// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DatepickerSample 
// ==========================================================================

var DatepickerSample  = DatepickerSample || {};

DatepickerSample.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage : 'page1',

    page1: M.PageView.design({
        childViews: 'header content',
        header: M.ToolbarView.design({
            value: 'Datepicker Sample'
        }),
        content: M.ScrollView.design({
            childViews: 'text button1 button2 button3',
            text: M.TextFieldView.design({
                events: {
                    tap: {
                        target: DatepickerSample.ApplicationController,
                        action: 'getDate'
                    }
                }
            }),
            button1: M.ButtonView.design({
                value: 'Pick a date!',
                events: {
                    tap: {
                        target: DatepickerSample.ApplicationController,
                        action: 'getDate'
                    }
                }
            }),
            button2: M.ButtonView.design({
                value: 'Pick a time!',
                events: {
                    tap: {
                        target: DatepickerSample.ApplicationController,
                        action: 'getTime'
                    }
                }
            }),
            button3: M.ButtonView.design({
                value: 'Pick a date and time!',
                events: {
                    tap: {
                        target: DatepickerSample.ApplicationController,
                        action: 'getDatetime'
                    }
                }
            })
        })
    })

});