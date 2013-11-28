/*global kitchensink, M*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    var views = [
        {
            _value_: 'M.ButtonView',
            goto:'buttons'

        },
        {
            _value_: 'Form Views',
            goto:'forms'
        }
    ];

    kitchensink.Controllers.MenuController = kitchensink.Controllers.AbstractController.extend({

        tmpViews: null,

        _initViews: function(){

             //Init the collection
            if( !this.tmpViews ) {
                this.tmpViews = kitchensink.Collections.TmpviewsCollection.create(views);
            }

            //create the menu
            if( !this.contentView ) {
                this.contentView = kitchensink.Views.MenuView.create(this, null, true);
            }

            if( !this.headerView ) {
                this.headerView = M.View.extend({
                    tagName: 'h2',
                    grid: 'col-md-12',
                    value: M.I18N.get('global.appName', {aka: 'Absinth'})
                }).create()
            }

            this._applyViews();
        },

        gotoPage: function( event, element ) {

            var goto = element.model.get('goto');
            var route = '';
            switch(goto){
                case 'forms':
                    route = 'forms'
                    break;
                case 'buttons':
                    route = 'buttons'
                    break;
            };

            kitchensink.navigate({
                route: route
            });

        }

    });

})();
