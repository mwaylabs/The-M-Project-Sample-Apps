/*global kitchensink*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.TransitionsController = kitchensink.Controllers.AbstractController.extend({

        pageHeadline: 'Transitions',

        sourceCodePath: 'scripts/views/transitions_first.js',

        transitionModel: null,
        _contentViewFirst: null,
        _contentViewSecond: null,
        _headerViewFirst: null,
        _headerViewSecond: null,

        _initViews: function( name ) {

            if( !this.transitionModel) {
                this.transitionModel = M.Model.create({name: M.PageTransitions.CONST.NONE});
                this.transitionModel.on('change', function( model ) {

                    if( M.PageTransitions.isAnimating()) {
                        return;
                    }

                    var transtionName = model.get('name');
                    var route = 'transitions';
                    if( this.contentView !== this._contentViewSecond) {
                        route += '/second';
                    }

                    kitchensink.navigate({
                        route: route,
                        transition: M.PageTransitions.CONST[transtionName]
                    });
                }, this);
            }

            if( name === null ) {

                // Create the ContentView with the controller (this) as scope
                if( !this._contentViewFirst ) {
                    this._contentViewFirst = kitchensink.Views.TransitionsFirstView.create(this, null, true);
                }

                // Create the HeaderView with the controller (this) as scope
                if( !this._headerViewFirst ) {
                    this._headerViewFirst = kitchensink.Views.BackheaderView.create(this, null, true);
                }
                this.contentView = this._contentViewFirst;
                this.headerView = this._headerViewFirst;

            } else {

                // Create the ContentView with the controller (this) as scope
                if( !this._contentViewSecond ) {
                    this._contentViewSecond = kitchensink.Views.TransitionsSecondView.create(this, null, true);
                }

                // Create the HeaderView with the controller (this) as scope
                if( !this._headerViewSecond ) {
                    this._headerViewSecond = kitchensink.Views.BackheaderView.create(this, null, true);
                }
                this.contentView = this._contentViewSecond;
                this.headerView = this._headerViewSecond;
            }

            this._applyViews();
        },

        // Register menu item for this view
        registerToMenu: function( menuController ) {
            menuController.registerMenuItem({
                value: 'Transitions',
                goto: 'transitions'
            });
        }

    });

})();
