/*global $*/

// PLEASE DON'T CHANGE OR REMOVE THE COMMENTS.
// All comments in this file are necessary for the build process.

(function(global) {
    'use strict';

    global.demoapp = M.Application.extend(global.demoapp).create(global.demoapp.mconfig);

    $(document).ready(function() {

        global.demoapp.start({
            routing: {
                routes: {
                    '': 'menu',
                    'detail': 'detail',
                    //m:routes
                },
                detail: global.demoapp.Controllers.DetailController.create(),
                menu: global.demoapp.Controllers.MenuController.create(),
                //m:controllers
            }
        });
    });

})(this);
