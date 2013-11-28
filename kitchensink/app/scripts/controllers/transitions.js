/*global kitchensink, M*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.TransitionsController = kitchensink.Controllers.AbstractController.extend({

        pageHeadline: 'Transitions',

        transitionModel: null,

        _initViews: function() {
            if( !this.contentView ) {
                this.transitionModel = M.Model.create({name: M.PageTransitions.CONST.NONE});
                this.transitionModel.on('change', function( model ) {
                    var transtionName = model.get('name');
                    kitchensink.navigate({
                        route: 'transitions/' + transtionName,
                        transition: M.PageTransitions.CONST[transtionName]
                    });
                }, this);
                this.contentView = kitchensink.Views.TransitionsView.create(this, null, true);
            }

            if( !this.headerView ) {
                this.headerView = kitchensink.Views.BackheaderView.create(this, null, true);
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
