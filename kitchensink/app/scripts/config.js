
(function(global) {
    'use strict';

    // PLEASE DON'T CHANGE OR REMOVE THE COMMENTS.
    // All comments in this file are necessary for the build process.
    
    global.kitchensink = global.kitchensink || {};

    global.kitchensink.mconfig = {

        // The global namespace for the app. Needed by the framework.
        name: 'kitchensink',

        // Defines the languages for the app.
        // All languages files are located in app/i18n
        locales: [
            {locale: 'en'},
            //m:i18n
        ],

        //specify the file type of the language files. default is 'json'
        localesFileType: 'js',

        // A flag whether to enable the debugView or not.
        // Shake your device to toggle the debugView.
        debugView: YES
    };

})(this);