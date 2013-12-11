/*global kitchensink*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.SplitController = kitchensink.Controllers.AbstractController.extend({

        tabLayout: null,
        menuView: null,
        splitMenu: null,
        contentView1: null,
        contentView2: null,
        contentView3: null,

        /**
         * The application start (after reload)
         */
        applicationStart: function( settings ) {
            this.setLayout(settings);
            this._initViews(settings.subview);
        },

        show: function( settings ) {
            if( this.tabLayout ) {
                this._initViews(settings.subview);
                // call animate
                kitchensink.getLayout().startTransition();

            } else {
                this.applicationStart(settings);
            }
        },

        _initMenu: function() {
            if( !this.splitMenu ) {
                this.splitMenu = M.Collection.create([
                    {_value_: 'SplitView 1', goto: '1'},
                    {_value_: 'SplitView 2', goto: '2'},
                    {_value_: 'SplitView 3', goto: '3'}
                ]);
            }
        },

        setLayout: function() {
            this.tabLayout = M.SplitLayout.extend({

                applyAdditionalBehaviourLeftContainer: function (element, layout) {
                    $('body').append('<style>@media (max-width: 480px) {.customSplitBehaviour { display: none !important; }}</style>');
                    element.addClass('customSplitBehaviour');
                }

            }).create(this, null, true);
            kitchensink.setLayout(this.tabLayout);
        },

        _initViews: function( subview ) {

            this._initMenu();

            // Create the ContentView with the controller (this) as scope
            if( !this.contentView1 ) {
                this.contentView1 = kitchensink.Views.SplitView.create({value: 'SplitView 1'});
            }
            if( !this.contentView2 ) {
                this.contentView2 = kitchensink.Views.SplitView.create({value: 'SplitView 2'});
            }
            if( !this.contentView3 ) {
                this.contentView3 = kitchensink.Views.SplitView.create({value: 'SplitView 3'});
            }
            if( !this.menuView ) {
                this.menuView = kitchensink.Views.SplitMenu.create(this, null, true)
            }

            if( subview == 3 ) {
                this.contentView = this.contentView3;
            } else if( subview == 2 ) {
                this.contentView = this.contentView2;
            } else {
                this.contentView = this.contentView1;
            }

            this._applyViews();
        },

        gotoSplitPage: function( event, element ) {
            var goto = element.model.get('goto');

            kitchensink.navigate({
                route: 'split/' + goto
            });
        },

        _applyViews: function() {
            kitchensink.getLayout().applyViews({
                left: this.menuView,
                content: this.contentView
            });
        },

        registerToMenu: function( menuController ) {
            menuController.registerMenuItem({
                _value_: 'Split',
                goto: 'split'
            });
        }

    });

})();
