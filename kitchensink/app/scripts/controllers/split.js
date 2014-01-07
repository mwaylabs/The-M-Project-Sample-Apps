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
            } else {
                this.applicationStart(menuId, viewId);
            }
        },

        setLayout: function() {
            this.tabLayout = M.SplitLayout.extend({

                onLandscape: function() {
                     this.$el.addClass('hide-menu-button');
                },

                onPortrait: function() {
                    this.$el.removeClass('hide-menu-button');
                },

            }).create(this, null, true);

            kitchensink.setLayout(this.tabLayout);
        },

        _initViews: function( menuId, viewId ) {
            menuId = menuId || 0;
            viewId = viewId || 0;

            this._buildMenuView(menuId);
            this._buildContentView('Home');
            this._buildContentView(viewId);

            this.menuView = this['menuView' + menuId];

            if( viewId > 0 ) {
                this.contentView = this['contentView' + viewId]
            } else {
                this.contentView = this.contentViewHome;
            }

            this._currentViewId = viewId;
            this._currentMenuId = menuId;
            this._applyViews();
        },

        _applyViews: function() {
            var views = {
                content: this.contentView,
                left: this.menuView
            };
            kitchensink.getLayout().applyViews(views);
        },

        _buildMenuView: function( menuId ) {
            menuId = parseInt(menuId, 10);

            if( !this['menuLevel' + menuId] ) {
                var navItems = [];
                for( var i = 1; i < 7; i++ ) {
                    var obj = {};
                    if( menuId === 0 ) {
                        obj.menuId = i;
                        obj['value'] = 'SplitView ' + i
                    } else {
                        obj.viewId = i;
                        obj['value'] = 'SplitView ' + menuId + '/' + obj.viewId
                    }
                    navItems.push(obj)
                }
                this['menuLevel' + menuId] = M.Collection.create(navItems);
            }

            if( !this['menuView' + menuId] ) {

                var childViews = {};

                if( menuId ) {
                    childViews.back = M.ButtonView.extend({
                        value: '',
                        cssClass: 'splitBackButton',
                        icon: 'fa-arrow-circle-o-left',
                        events: {
                            tap: function() {
                                this._navigateMenu(0);
                            }
                        }
                    });
                }

                childViews.menu = M.ListView.extend({
                    scopeKey: 'menuLevel' + menuId,
                    listItemView: M.ListItemView.extend({
                        type: M.ListItemView.CONST.LINKED,
                        events: {
                            tap: function( event, element ) {
                                var menuId = element.model.get('menuId');
                                var viewId = element.model.get('viewId');

                                if( viewId ) {
                                    this._navigateContent(viewId)
                                } else {
                                    this._navigateMenu(menuId)
                                }
                            },
                        }
                    })
                });

                if( menuId === 0 ) {
                    childViews.back = M.ButtonView.extend({
                        value: 'Back to the Kitchensink',
                        cssClass: 'splitBackKitchensink',
                        events: {
                            tap: function() {
                                kitchensink.navigate({
                                    route: ''
                                });
                            }
                        }
                    });
                }

                this['menuView' + menuId] = M.View.extend({}, childViews).create(this, null, true)
            }
        },

        _buildContentView: function( viewId ) {
            if( !this['contentView' + viewId] ) {
                this['contentView' + viewId] = M.View.extend({
                    // The views grid
                }, {
                    toolbar: M.ToolbarView.extend({
                        value: 'Split Layout ' + viewId
                    }, {
                        first: M.ButtonView.extend({
                            cssClass: 'menu-button',
                            icon: 'fa-bars',
                            events: {
                                tap: function() {
                                    this.tabLayout.toggleLeftContainer();
                                }
                            }
                        })
                    }),

                    tf: M.View.extend({
                        grid: 'col-xs-12',
                        value: 'Content ' + viewId
                    })
                }).create(this, null, true);
            }
        },

        gotoPage: function( event, element ) {
            var goto = element.model.get('goto');
            this._navigateContent(goto);
        },

        _navigateMenu: function( id ) {
            kitchensink.navigate({
                route: 'split/' + id + '/' + this._currentViewId
            })
        },

        _navigateContent: function( id ) {
            kitchensink.navigate({
                route: 'split/' + this._currentMenuId + '/' + id
            });
            this.tabLayout.closeLeftContainer();
        },

        registerToMenu: function( menuController ) {
            menuController.registerMenuItem({
                value: 'Split',
                goto: 'split'
            });
        }

    });

})();
