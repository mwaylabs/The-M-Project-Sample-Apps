#!/usr/bin/env node

var espresso  = require('../../Espresso/core/espresso').Espresso;

var server = new espresso.Server(true);

var app = server.getNewApp(__dirname);

app.loadTheApplication();

app.loadTheMProject();

app.build(function (options) {
    app.prepareForServer(function (opt){
        server.run("ChartingSample");
    })
});