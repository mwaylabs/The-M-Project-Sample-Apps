/*global $*/

// PLEASE DON'T CHANGE OR REMOVE THE COMMENTS.
// All comments in this file are necessary for the build process.

 /**
  * This is the start point for your application.
  * Here we have two things to do.
  *
  * 1. Initialize the routers
  * 2. Initialize the controllers
  *
  * Routers are used for routing your application URL to a controller.
  * Any ":param" in the route definitions are passed as arguments
  * to the controller.
  *
  * Hint:
  * Use the generator to create a controller.
  * https://github.com/mwaylabs/generator-m#controller
  *
  * Example:
  *
  * routing: {
  *     routes: {
  *         ''         : 'indexController',
  *         'settings' : 'settingsController',
  *         'page/:id' : 'pageController'
  *     },
  *     ''                   : global.APPNAME.Controllers.IndexController.create(),
  *     'settingsController' : global.APPNAME.Controllers.SettingsController.create(),
  *     'pageController'     : global.APPNAME.Controllers.PageController.create(),
  * }
  *
  * http://localhost:9000/ will call the indexController
  * http://localhost:9000/#settings will call the settingsController
  * http://localhost:9000/#page/1 will call the pageController with id as an agrument.
  *
  * For further information go to:
  * http://backbonejs.org/#Router
  */

(function( global ) {
    'use strict';

    // The app gets initialized with the configuration provided from the config.js
    // and gets appended to the global (window) namespace named like the app
    global.kitchensink = M.Application.extend().create(global.kitchensink.mconfig);

    $(document).ready(function() {

         // If the DOM is ready, initialize the router
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
                    'split(/:subview)': 'split',
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
                split: global.kitchensink.Controllers.SplitController.create(),
                //m:controllers
            }
        });
    });

})(this);