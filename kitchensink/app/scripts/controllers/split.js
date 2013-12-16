/*global kitchensink*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.SplitController = kitchensink.Controllers.AbstractController.extend({

        tabLayout: null,

        /**
         * The application start (after reload)
         */
        applicationStart: function( menuId, viewId ) {
            this.setLayout();
            this._initViews(menuId, viewId);
        },

        show: function( menuId, viewId ) {

            if( this.tabLayout ) {

                if( kitchensink.getLayout() !== this.tabLayout ) {
                    this.setLayout();
                }
                this._initViews(menuId, viewId);

                kitchensink.getLayout().startTransition();

            } else {
                this.applicationStart( menuId, viewId );
            }
        },

        setLayout: function() {
            this.tabLayout = M.SplitLayout.extend({

            }).create(this, null, true);
            kitchensink.setLayout(this.tabLayout);
        },

        _initViews: function( menuId, viewId ) {


            if( !menuId ) {
                menuId = 1;
            }
            if( !viewId ) {
                viewId = 1;
            }
            viewId = menuId + '-' + viewId;

            this._getMenuView(menuId);
            this._getContentView(viewId);

            this.contentView = this['contentView' + viewId]
            this.menuView = this['menuView' + menuId]

            this._applyViews();
        },

        _getMenuView: function( menuId ) {

            if( !this['menuLevel' + menuId] ) {
                var navItems = [];
                for( var i = 1; i < 6; i++ ) {
                    var link = i;
                    if( menuId > 1 ) {
                        link = menuId + '/' + i;
                    }
                    navItems.push({_value_: 'SplitView ' + link, goto: link})
                }
                this['menuLevel' + menuId] = M.Collection.create(navItems);
            }

            if( !this['menuView' + menuId] ) {
                this['menuView' + menuId] = M.ListView.extend({
                    scopeKey: 'menuLevel' + menuId,
                    listItemView: M.ListItemView.extend({
                        type: M.ListItemView.CONST.LINKED,
                        events: {
                            tap: 'gotoPage'
                        }
                    })
                }).create(this, null, true)
            }
        },

        _getContentView: function( viewId ) {
            if( !this['contentView' + viewId] ) {
                console.log('Create view: ' + viewId);
                this['contentView' + viewId] = M.View.extend({
                    // The views grid
                    grid: 'col-xs-12'
                }, {
                    backButton: M.ButtonView.extend({
                        grid: 'col-xs-12',
                        value: 'Back to the Kitchensink Menu',
                        events: {
                            tap: function() {
                                // Go back to the MenuController
                                kitchensink.navigate({
                                    route: ''
                                });
                            }
                        }
                    })
                }).create({value: 'SplitView ' + viewId});
            }
        },

        gotoPage: function( event, element ) {
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
