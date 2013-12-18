/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.ButtonsView = M.View.extend({
        // Additional css class for the view.
        cssClass: 'kitchen-buttons',
        // The view should be in a grid
        grid: 'col-xs-12'
    }, {

        singleButtons: M.View.extend({
            value: 'Buttons',
            grid: 'row ktichen-row'
        }, {

            grid6Button: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                value: 'Grid Button 6'
            }),

            eventButton: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                value: M.Model.create({
                    _value: 1
                }),
                counter: 1,
                events: {
                    tap: function( event, element ) {
                        var count = element.model.get('_value');
                        element.model.set('_value', ++count);
                    }
                }
            }),

            deactiveButton: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                value: M.Model.create({
                    _value: 1
                }),
                enabled: NO,
                counter: 1,
                events: {
                    tap: function( event, element ) {
                        var count = element.model.get('_value');
                        element.model.set('_value', ++count);
                    }
                }
            }),

            activateDeactivedButton: M.ButtonView.extend({
                grid: 'col-xs-12',
                value: 'Toogle enable state for the button above',
                events: {
                    tap: function( event, element ) {
                        var buttonAbove = element.scope.contentView.childViews.singleButtons.childViews.deactiveButton;
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
            grid: 'row ktichen-row'
        }, {

            defaultButton: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                value: 'Default Color'
            }),

            purpleButton: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                cssClass: 'm-primary',
                value: 'm-primary'
            }),

            greenButton: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                cssClass: 'm-success',
                value: 'm-success'
            }),

            redButton: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                cssClass: 'm-error',
                value: 'm-error'
            }),

            orangeButton: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                cssClass: 'm-warning',
                value: 'm-warning'
            }),

            yellowButton: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                cssClass: 'm-info',
                value: 'm-info'
            }),

            greyButton: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                cssClass: 'm-fuzzy',
                value: 'm-fuzzy'
            })

        }),

        colorfulDisabledButtons: M.View.extend({
            value: 'Colorful Buttons deactivated',
            grid: 'row ktichen-row'
        }, {

            defaultButton: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                enabled: NO,
                value: 'Default Color'
            }),

            purpleButton: M.ButtonView.extend({
                enabled: NO,
                grid: 'col-xs-12 col-sm-6 col-md-4',
                cssClass: 'm-primary',
                value: 'm-primary'
            }),

            greenButton: M.ButtonView.extend({
                enabled: NO,
                grid: 'col-xs-12 col-sm-6 col-md-4',
                cssClass: 'm-success',
                value: 'm-success'
            }),

            redButton: M.ButtonView.extend({
                enabled: NO,
                grid: 'col-xs-12 col-sm-6 col-md-4',
                cssClass: 'm-error',
                value: 'm-error'
            }),

            orangeButton: M.ButtonView.extend({
                enabled: NO,
                grid: 'col-xs-12 col-sm-6 col-md-4',
                cssClass: 'm-warning',
                value: 'm-warning'
            }),

            yellowButton: M.ButtonView.extend({
                enabled: NO,
                grid: 'col-xs-12 col-sm-6 col-md-4',
                cssClass: 'm-info',
                value: 'm-info'
            }),

            greyButton: M.ButtonView.extend({
                enabled: NO,
                grid: 'col-xs-12 col-sm-6 col-md-4',
                cssClass: 'm-fuzzy',
                value: 'm-fuzzy'
            })

        }),

        iconButtons: M.View.extend({
            value: 'Buttons with Icons',
            grid: 'row ktichen-row'
        }, {

            iconButton: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                value: 'Icon Default',
                icon: 'fa-cog'
            }),

            iconOnlyButtonRight: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-4 col-md-3',
                icon: 'fa-cog',
                cssClass: 'm-info right',
                value: 'Icon Right'
            }),

            iconOnlyButtonRightSmall: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-4 col-md-3',
                icon: 'fa-headphones',
                cssClass: 'm-fuzzy left',
                value: 'Icon Left'
            }),

            iconOnlyButton: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                icon: 'fa-gear',
                cssClass: 'm-success',
                value: ''
            }),

            iconOnlyButtonSmall: M.ButtonView.extend({
                grid: 'col-xs-1',
                cssClass: 'm-error',
                value: '',
                icon: 'fa-calendar'
            })

        }),

        disabledIconButtons: M.View.extend({
            value: 'Buttons with Icons',
            grid: 'row ktichen-row'
        }, {

            iconButton: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                value: 'Icon Default',
                enabled: NO,
                icon: 'fa-cog'
            }),

            iconOnlyButtonRight: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-4 col-md-3',
                icon: 'fa-cog',
                cssClass: 'm-info right',
                enabled: NO,
                value: 'Icon Right'
            }),

            iconOnlyButtonRightSmall: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-4 col-md-3',
                icon: 'fa-headphones',
                cssClass: 'm-fuzzy left',
                enabled: NO,
                value: 'Icon Left'
            }),

            iconOnlyButton: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                icon: 'fa-gear',
                enabled: NO,
                cssClass: 'm-success',
                value: ''
            }),

            iconOnlyButtonSmall: M.ButtonView.extend({
                grid: 'col-xs-4',
                cssClass: 'm-error',
                value: '',
                enabled: NO,
                icon: 'fa-calendar'
            })

        }),

        buttonGroup: M.View.extend({
            value: 'ButtonGroup',
            grid: 'row ktichen-row'
        }, {
            buttongroupExample: M.ButtonGroupView.extend({

            }, {

                firstButton: M.ButtonView.extend({
                    value: 'first button',
                    grid: 'col-xs-3'
                }),

                secondButton: M.ButtonView.extend({
                    value: 'second button',
                    grid: 'col-xs-3'
                }),

                thirdButton: M.ButtonView.extend({
                    value: 'third button',
                    grid: 'col-xs-3'
                }),

                fourthButton: M.ButtonView.extend({
                    value: 'fourth button',
                    grid: 'col-xs-3'
                })
            }),

            buttongroupExampleGrid: M.ButtonGroupView.extend({

            }, {

                firstButton: M.ButtonView.extend({
                    value: 'first button',
                    grid: 'col-xs-2'
                }),

                secondButton: M.ButtonView.extend({
                    value: 'second button',
                    grid: 'col-xs-4'
                }),

                thirdButton: M.ButtonView.extend({
                    value: 'third button',
                    grid: 'col-xs-6'
                })
            })
        }),

        iconButtonGroup: M.View.extend({
            value: 'ButtonGroup',
            grid: 'row ktichen-row'
        }, {
            buttongroupExample: M.ButtonGroupView.extend({

            }, {

                firstButton: M.ButtonView.extend({
                    value: 'Plane',
                    grid: 'col-xs-3',
                    icon: 'fa-plane'
                }),

                secondButton: M.ButtonView.extend({
                    value: 'Jet',
                    grid: 'col-xs-3',
                    icon: 'fa-fighter-jet'
                }),

                thirdButton: M.ButtonView.extend({
                    value: 'Rocket',
                    grid: 'col-xs-3',
                    icon: 'fa-rocket'
                })
            }),

            buttongroupExample2: M.ButtonGroupView.extend({

            }, {

                xing: M.ButtonView.extend({
                    value: '',
                    grid: 'col-xs-3 col-sm-1',
                    icon: 'fa-xing'
                }),

                rss: M.ButtonView.extend({
                    value: '',
                    grid: 'col-xs-3 col-sm-1',
                    icon: 'fa-rss'
                }),

                twitter: M.ButtonView.extend({
                    value: '',
                    grid: 'col-xs-3 col-sm-1',
                    icon: 'fa-twitter'
                }),
                stackoverflow: M.ButtonView.extend({
                    value: '',
                    grid: 'col-xs-3 col-sm-1',
                    icon: 'fa-stack-overflow'
                }),

                github: M.ButtonView.extend({
                    value: '',
                    grid: 'col-xs-3 col-sm-1',
                    icon: 'fa-github'
                }),

                google: M.ButtonView.extend({
                    value: '',
                    grid: 'col-xs-3 col-sm-1',
                    icon: 'fa-google-plus'
                }),
                linkedin: M.ButtonView.extend({
                    value: '',
                    grid: 'col-xs-3 col-sm-1',
                    icon: 'fa-linkedin'
                }),

                tumblr: M.ButtonView.extend({
                    value: '',
                    grid: 'col-xs-3 col-sm-1',
                    icon: 'fa-tumblr'
                }),

                pinterest: M.ButtonView.extend({
                    value: '',
                    grid: 'col-xs-3 col-sm-1',
                    icon: 'fa-pinterest'
                }),
                instagram: M.ButtonView.extend({
                    value: '',
                    grid: 'col-xs-3 col-sm-1',
                    icon: 'fa-instagram'
                }),

                flickr: M.ButtonView.extend({
                    value: '',
                    grid: 'col-xs-3 col-sm-1',
                    icon: 'fa-flickr'
                }),

                youtube: M.ButtonView.extend({
                    value: '',
                    grid: 'col-xs-3 col-sm-1',
                    icon: 'fa-youtube'
                })
            })
        })

    });

})();
