#! /usr/bin/env sh

rm -rf upload
mkdir upload

for dir in *; do
    test -d "$dir" || continue
	cd $dir;
	rm -rf app/bower_components/themproject/
    rm -rf dist/
    bower install
    grunt build
    mv dist/ ../upload/$dir
    cd -
done