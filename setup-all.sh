#! /usr/bin/env sh

updateDependencies="y";
nodedir=$(find . -type d -name 'node_modules' -maxdepth 2)
if [ "$nodedir" != "" ]
then
	read -p "Would you like to update all bower / npm dependencies (y/N)? " updateDependencies
	if [ "$updateDependencies" = "y" ]; then
		for dir in *; do
			test -d "$dir" || continue
		    cd $dir
		    rm -rf app/bower_components
		    rm -rf node_modules
		    cd -
		done
	fi
fi

if [ "$updateDependencies" = "y" ]
then
	for dir in *; do
		test -d "$dir" || continue
	    cd $dir
	    echo "Run setup for: "$dir
	    bower install
	    npm install
	    cd -
	done
fi

echo "------------------------------------------------------\n"
echo "To run an example, simply switch to the directory an run: grunt server"


