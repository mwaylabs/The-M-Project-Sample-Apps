/**
 * The Grunt configuration file for The-M-Project.
 * Version: 0.1.0
 *
 * This file allows you to modify the default grunt options
 * without a full understanding how grunt works.
 *
 * For further information how you can customize grunt go to:
 * http://gruntjs.com/getting-started
 */

var config = {

    // Configurable paths
    paths: {
        // The location for the build
        dist: "dist",

        // The location for the app root
        app: "app"
    },

    // Options for the server task.
    server: {

        // Open the app in your default browser.
        openBrowser: true,

        // Reloads everytime you save a file in your project.
        autoReload: true,

        // The port on which the webserver will respond.
        port: 9000,

        // We use grunt-connect-proxy for the proxy task.
        // For further information go to:
        // https://github.com/drewzboto/grunt-connect-proxy
        proxies: [
            {
                context: "/myServer",
                host: "your.server.com",
                port: 80,
                https: false
            }
        ]
    },

    // Options for the test task.
    test: {
        // The port on which the webserver will respond.
        port: 9001
    }
};

module.exports = config;