#!/usr/bin/env node

var espresso  = require('../../Espresso/core/espresso').Espresso;

var server = new espresso.Server(__dirname);

    server.run("ChartingSample");
