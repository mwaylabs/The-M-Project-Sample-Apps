/*global $, M*/


(function( global ) {
    'use strict';

    global.kitchensink = M.Application.extend().create(global.kitchensink.mconfig);

    $(document).ready(function() {

        global.kitchensink.start({
            routing: {
                routes: {
                    '': 'menuController',
                    'forms': 'formsController',
                    'buttons': 'buttonsController',
                    'modals': 'modalsController',
                    'lists': 'listsController',
                    'texts': 'textsController',
                    'tabbars': 'tabbarsController',
                    'tabbar(/:tab)': 'tabbarController',
                    'transitions(/:name)': 'transitionsController',
                    'i18n': 'i18n',
                    //m:routes
                },
                menuController: global.kitchensink.Controllers.MenuController.create(),
                formsController: global.kitchensink.Controllers.FormsController.create(),
                buttonsController: global.kitchensink.Controllers.ButtonsController.create(),
                listsController: global.kitchensink.Controllers.ListsController.create(),
                modalsController: global.kitchensink.Controllers.ModalsController.create(),
                textsController: global.kitchensink.Controllers.TextsController.create(),
                tabbarsController: global.kitchensink.Controllers.TabbarsController.create(),
                tabbarController: global.kitchensink.Controllers.TabbarController.create(),
                transitionsController: global.kitchensink.Controllers.TransitionsController.create(),
                i18n: global.kitchensink.Controllers.I18nController.create(),
                //m:controllers
            }
        });
    });

})(this);