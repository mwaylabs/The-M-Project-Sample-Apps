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

    kitchensink.Controllers.MenuController = M.Controller.extend({

        tmpViews: null,

        applicationStart: function () {
            this._init();

            kitchensink.setLayout(M.SwitchHeaderContentLayout.design(this, null, true));

            //fill the layout with a view and render it
            kitchensink.getLayout().applyViews({
                header: this.header,
                content: this.menu
            });
        },

        show: function () {
            this._init();
            kitchensink.getLayout().applyViews({
                header: this.header,
                content: this.menu
            });
            kitchensink.getLayout().startTransition();
        },

        _init: function(){

            //Init the collection
            this.tmpViews = this.tmpViews || kitchensink.Collections.TmpviewsCollection.create(views);

            //create the menu
            this.menu = this.menu || kitchensink.Views.MenuView.create(this, null, true);

            this.header = this.header || M.View.extend({
                tagName: 'h2',
                grid: 'col-md-12',
                value: M.I18N.get('global.appName', {aka: 'Absinth'})
            }).create()
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
