// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.8-1
//
// Project: DatePickerSample
// Controller: DateController
// ==========================================================================

DatePickerSample.DateController = M.Controller.extend({

    date: null,

    dateString: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {
            var date = M.Date.now();
            this.set('date', date);
        }

    },
    
    genDate: function() {

        var date = M.ViewManager.getView('page1', 'datePicker').value;

        if(!date) {
            return;
        }

        this.set('dateString', date.format('dd.mm.yyyy HH:MM'));
        
    }

});