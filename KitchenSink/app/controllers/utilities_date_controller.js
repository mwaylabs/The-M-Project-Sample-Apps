KitchenSink.UtilitiesDateController = M.Controller.extend({

    dateList: null,

    date1: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var dateList = [
                {
                    name: "Get the current date",
                    page: "utilitiesDate1"
                },

                {
                    name: "Format a date",
                    page: "utilitiesDate2"
                }
            ];
            this.set('dateList', dateList);
        }

    },

    dateSelected: function(id) {

        var dateName = M.ViewManager.getView(id, 'name').value;
        var date = _.detect(this.dateList, function(date) {
            return date.name === dateName;
        });

        this.switchToPage(date.page);
    },

    here: function() {
        this.switchToPage('utilitiesDate', M.TRANSITION.SLIDE, YES);
    },

    formatDate1: function() {
        var format = M.ViewManager.getView('utilitiesDate2', 'textfield').value;
        this.set('date1', M.Date.now().format(format));
    }

});