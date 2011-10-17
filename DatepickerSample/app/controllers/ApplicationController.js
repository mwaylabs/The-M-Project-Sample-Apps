// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DatepickerSample
// Controller: ApplicationController
// ==========================================================================

DatepickerSample.ApplicationController = M.Controller.extend({

    getDate: function() {
        M.DatePickerView.show({
            source: M.ViewManager.getView('page1', 'text'),
            useSourceDateAsInitialDate: YES,
            showTimePicker: NO,
            callbacks: {
                before: {
                    action: function(value, date) {
                        console.log('--- START getDate ---');
                        console.log('## before ##');
                        if(value) {
                            console.log('value: ' + value);
                        }
                    }
                },
                confirm: {
                    action: function(value, date) {
                        console.log('## confirm ##');
                        if(value) {
                            console.log('value: ' + value);
                            console.log('--- END getDate ---');
                        }
                    }
                },
                cancel: {
                    action: function() {
                        console.log('## cancel ##');
                        console.log('--- END getDate ---');
                    }
                }
            }
        });
    },

    getTime: function() {
        M.DatePickerView.show({
            source: M.ViewManager.getView('page1', 'text'),
            useSourceDateAsInitialDate: YES,
            showDatePicker: NO,
            callbacks: {
                before: {
                    action: function(value, date) {
                        console.log('--- START getTime ---');
                        console.log('## before ##');
                        if(value) {
                            console.log('value: ' + value);
                        }
                    }
                },
                confirm: {
                    action: function(value, date) {
                        console.log('## confirm ##');
                        if(value) {
                            console.log('value: ' + value);
                            console.log('--- END getTime ---');
                        }
                    }
                },
                cancel: {
                    action: function() {
                        console.log('## cancel ##');
                        console.log('--- END getTime ---');
                    }
                }
            }
        });
    },

    getDatetime: function() {
        M.DatePickerView.show({
            source: M.ViewManager.getView('page1', 'text'),
            useSourceDateAsInitialDate: YES,
            callbacks: {
                before: {
                    action: function(value, date) {
                        console.log('--- START getDatetime ---');
                        console.log('## before ##');
                        if(value) {
                            console.log('value: ' + value);
                        }
                    }
                },
                confirm: {
                    action: function(value, date) {
                        console.log('## confirm ##');
                        if(value) {
                            console.log('value: ' + value);
                            console.log('--- END getDatetime ---');
                        }
                    }
                },
                cancel: {
                    action: function() {
                        console.log('## cancel ##');
                        console.log('--- END getDatetime ---');
                    }
                }
            }
        });
    }

});
