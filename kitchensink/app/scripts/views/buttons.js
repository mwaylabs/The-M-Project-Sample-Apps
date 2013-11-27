/*global kitchensink, M*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.ButtonsView = M.View.extend({
        grid: 'col-xs-12'
    }, {

        singleButtons: M.View.extend({
            value: 'Buttons',
            grid: 'row'
        }, {

            grid6Button: M.ButtonView.extend({
                grid: 'col-xs-6',
                value: 'Grid Button 6'
            }),

            eventButton: M.ButtonView.extend({
                grid: 'col-xs-6',
                value: M.Model.create({
                    _value_: 1
                }),
                counter: 1,
                events: {
                    tap: function( event, element ) {
                        var count = element.model.get('_value_');
                        element.model.set('_value_', ++count);
                    }
                }
            }),

            deactiveButton: M.ButtonView.extend({
                grid: 'col-xs-12',
                value: M.Model.create({
                    _value_: 1
                }),
                enabled: NO,
                counter: 1,
                events: {
                    tap: function( event, element ) {
                        var count = element.model.get('_value_');
                        element.model.set('_value_', ++count);
                    }
                }
            }),

            activateDeactivedButton: M.ButtonView.extend({
                grid: 'col-xs-12',
                value: 'Toogle enable state for the button above',
                events: {
                    tap: function( event, element ) {
                        var buttonAbove = element.scope.content.childViews.singleButtons.childViews.deactiveButton;
                        if( buttonAbove.isEnabled() ) {
                            buttonAbove.disable();
                        } else {
                            buttonAbove.enable();
                        }

                    }
                }
            })

        }),

        colorfulButtons: M.View.extend({
            value: 'Colorful Buttons',
            grid: 'row'
        }, {

            defaultButton: M.ButtonView.extend({
                grid: 'col-xs-6',
                value: 'Default Color'
            }),

            purpleButton: M.ButtonView.extend({
                grid: 'col-xs-6',
                cssClass: 'm-primary',
                value: 'm-primary'
            }),

            greenButton: M.ButtonView.extend({
                grid: 'col-xs-6',
                cssClass: 'm-success',
                value: 'm-success'
            }),

            redButton: M.ButtonView.extend({
                grid: 'col-xs-6',
                cssClass: 'm-error',
                value: 'm-error'
            }),

            orangeButton: M.ButtonView.extend({
                grid: 'col-xs-6',
                cssClass: 'm-warning',
                value: 'm-warning'
            }),

            yellowButton: M.ButtonView.extend({
                grid: 'col-xs-6',
                cssClass: 'm-info',
                value: 'm-info'
            }),

            greyButton: M.ButtonView.extend({
                grid: 'col-xs-6',
                cssClass: 'm-fuzzy',
                value: 'm-fuzzy'
            })

        }),

        colorfulDisabledButtons: M.View.extend({
            value: 'Colorful Buttons deactivated',
            grid: 'row'
        }, {

            defaultButton: M.ButtonView.extend({
                grid: 'col-xs-6',
                enabled: NO,
                value: 'Default Color'
            }),

            purpleButton: M.ButtonView.extend({
                enabled: NO,
                grid: 'col-xs-6',
                cssClass: 'm-primary',
                value: 'm-primary'
            }),

            greenButton: M.ButtonView.extend({
                enabled: NO,
                grid: 'col-xs-6',
                cssClass: 'm-success',
                value: 'm-success'
            }),

            redButton: M.ButtonView.extend({
                enabled: NO,
                grid: 'col-xs-6',
                cssClass: 'm-error',
                value: 'm-error'
            }),

            orangeButton: M.ButtonView.extend({
                enabled: NO,
                grid: 'col-xs-6',
                cssClass: 'm-warning',
                value: 'm-warning'
            }),

            yellowButton: M.ButtonView.extend({
                enabled: NO,
                grid: 'col-xs-6',
                cssClass: 'm-info',
                value: 'm-info'
            }),

            greyButton: M.ButtonView.extend({
                enabled: NO,
                grid: 'col-xs-6',
                cssClass: 'm-fuzzy',
                value: 'm-fuzzy'
            })

        }),

        buttonGroup: M.View.extend({
            value: 'ButtonGroup',
            grid: 'row'
        }, {
            buttongroupExample: M.ButtonGroupView.extend({

            }, {

                firstButton: M.ButtonView.extend({
                    value: 'first button',
                    gri1d: 'col-xs-3'
                }),

                secondButton: M.ButtonView.extend({
                    value: 'second button',
                    grid1: 'col-xs-2'
                }),

                thirdButton: M.ButtonView.extend({
                    value: 'third button',
                    gri1d: 'col-xs-3'
                }),

                fourthButton: M.ButtonView.extend({
                    value: 'fourth button',
                    gri1d: 'col-xs-4'
                })
            }),

            buttongroupExampleGrid: M.ButtonGroupView.extend({

            }, {

                firstButton: M.ButtonView.extend({
                    value: 'first button',
                    gri1d: 'col-xs-2'
                }),

                secondButton: M.ButtonView.extend({
                    value: 'second button',
                    grid1: 'col-xs-4'
                }),

                thirdButton: M.ButtonView.extend({
                    value: 'third button',
                    gri1d: 'col-xs-6'
                })
            })
        })



    });

})();
