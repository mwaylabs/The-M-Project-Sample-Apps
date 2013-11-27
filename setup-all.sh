#! /usr/bin/env sh

for dir in *; do
	test -d "$dir" || continue
    cd $dir
    echo "Run setup for" $dir
    bower install
    npm install
    cd -
done

echo "Done!"