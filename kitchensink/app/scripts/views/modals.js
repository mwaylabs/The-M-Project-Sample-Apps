/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.ModalsView = M.View.extend({
        // The view should be in a grid
        grid: 'col-xs-12'
    }, {

        toastExample: M.View.extend({
            value: 'M.Toast',
            grid: 'row'
        }, {
            showRawToast: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                value: 'Show raw Toast',
                events: {
                    tap: function() {
                        // Display a information for 500ms
                        M.Toast.show({text: 'Displayed ' + M.Toast.CONST.RAW + ' ms', timeout: M.Toast.CONST.RAW});
                    }
                }
            }),

            showMediumToast: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                value: 'Show medium Toast',
                events: {
                    tap: function() {
                        // Display a information for 2000ms
                        M.Toast.show('Displayed ' + M.Toast.CONST.MEDIUM + ' ms');
                    }
                }
            }),

            showCrispyToast: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                value: 'Show crispy Toast',
                events: {
                    tap: function() {
                        // Display a information for 4000ms
                        M.Toast.show({text: 'Displayed ' + M.Toast.CONST.CRISPY + ' ms', timeout: M.Toast.CONST.CRISPY});
                    }
                }
            })
        }),

        laoderExample: M.View.extend({
            value: 'M.Loader',
            grid: 'row'
        }, {
            toggleLoader: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                value: 'Show Loader for 1 sec',
                events: {
                    tap: function() {
                        M.Loader.toggle();
                        setTimeout(function(){
                            M.Loader.toggle();
                        }, 1000);
                    }
                }
            }),

            toggleLoaderText: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                value: 'Show Loader with Text for 1 sec',
                events: {
                    tap: function() {
                        M.Loader.toggle('Loading');
                        setTimeout(function(){
                            M.Loader.toggle();
                        }, 1000);
                    }
                }
            })
        })

    });

})();
