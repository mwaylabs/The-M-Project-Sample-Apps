// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.8-1
//
// Project: DatePickerSample 
// ==========================================================================

var DatePickerSample  = DatePickerSample || {};

DatePickerSample.app = M.Application.design({

    entryPage : 'page1',

    page1: M.PageView.design({

        onLoad: {

            target: DatePickerSample.DateController,

            action: 'init'

        },

        childViews: 'header content',

        header: M.ToolbarView.design({

            value: 'Datepicker Sample',

            anchorLocation: M.TOP

        }),

        content: M.ScrollView.design({

            childViews: 'datePicker spacer button label1 label2',

            datePicker: M.DatePickerView.design({

                contentBinding: 'DatePickerSample.DateController.date',

                isDateTimePicker: YES

            }),

            spacer: M.LabelView.design({

                value: '&#160;',

                cssClass: 'spacer'

            }),

            button: M.ButtonView.design({

                value: 'get date',

                target: DatePickerSample.DateController,

                action: 'genDate'

            }),

            label1: M.LabelView.design({

                value: 'Date: ',

                isInline: YES

            }),

            label2: M.LabelView.design({

                value: '-',

                isInline: YES,

                contentBinding: 'DatePickerSample.DateController.dateString'

            })

        })

    }),

    page2: M.PageView.design({

        childViews: 'header',

        header: M.ToolbarView.design({

            value: 'Page 2'

        })

    })

});