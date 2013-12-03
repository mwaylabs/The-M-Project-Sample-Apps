/*global kitchensink*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.TransitionsController = kitchensink.Controllers.AbstractController.extend({

        pageHeadline: 'Transitions',

        transitionModel: null,
        _contentViewFirst: null,
        _contentViewSecond: null,
        _headerViewFirst: null,
        _headerViewSecond: null,

        _initViews: function( settings ) {

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

            if( settings.name === null ) {
                if( !this._contentViewFirst ) {
                    this._contentViewFirst = kitchensink.Views.TransitionsFirstView.create(this, null, true);
                }
                if( !this._headerViewFirst ) {
                    this._headerViewFirst = kitchensink.Views.BackheaderView.create(this, null, true);
                }
                this.contentView = this._contentViewFirst;
                this.headerView = this._headerViewFirst;

            } else {
                if( !this._contentViewSecond ) {
                    this._contentViewSecond = kitchensink.Views.TransitionsSecondView.create(this, null, true);
                }
                if( !this._headerViewSecond ) {
                    this._headerViewSecond = kitchensink.Views.BackheaderView.create(this, null, true);
                }
                this.contentView = this._contentViewSecond;
                this.headerView = this._headerViewSecond;
            }

            this._applyViews();
        },

        registerToMenu: function( menuController ) {
            menuController.registerMenuItem({
                _value_: 'Transitions',
                goto: 'transitions'
            });
        }

    });

})();
