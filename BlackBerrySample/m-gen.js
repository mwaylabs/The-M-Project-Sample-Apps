#!/usr/bin/env node

var generator  = require('/cygdrive/d/My Dropbox/Thesis/Development/Espresso/generator/file_generator').FileGenerator;
var argv = require('/cygdrive/d/My Dropbox/Thesis/Development/Espresso/lib/optimist').argv;
var fileGenerator  = new generator();
fileGenerator.gen(argv,__dirname);
