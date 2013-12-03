#! /usr/bin/env sh

sh setup-all.sh

for dir in *; do
	test -d "$dir" || continue
    cd $dir"/app/bower_components/themproject/"
    rm -rf dist
    ln -s /Users/stefanbuck/projects/TMP2/bikini/.tmp ./dist
    cd -
done