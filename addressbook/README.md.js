# Addressbook example

**This app runs with Bikini**

The data are synched between the mobile device/browser and a mongodb using a socket.io and a Rest interface. To get it up and running on you machine you need to have a mongodb instance and the running server.

# [Demo](http://www.the-m-project.org/apps/absinthe/addressbook/index.html)
You can find the running app [here](http://www.the-m-project.org/apps/absinthe/addressbook/index.html)

# Features
The Addressbook app supports online syncronisation and automaticly updates of all clients with socket.io and Rest interfaces.

- Open the [demo application](http://www.the-m-project.org/apps/absinthe/addressbook/index.html) in two browser windows
- Performe a CRUD operation and watch the other window
- Watch the other browser window. It gets updated automaticly.

# Install
1. [Install mongodb as discriped here](http://docs.mongodb.org/manual/installation/)
2. Start the mongodb on localhost
	
	```
	mongod
	```
	
3. Get the server:
	- clone [The-M-Project](https://github.com/mwaylabs/The-M-Project)
	
	```
	git clone https://github.com/mwaylabs/The-M-Project
	cd The-M-Project/server/
	```
4. (Optional) Configure the connection to the mongodb
	- The connection to the database is defined inside `The-M-Project/server/mongodb_rest.js`
	
	```
	var server   = new mongodb.Server("127.0.0.1", 27017, {});
	```
5. Start the server

	```
	node server.js
	// or
	node The-M-Project/server/server.js
	```
6. Test the Addressbook app

	```
	cd path/to//The-M-Project-Sample-Apps/addressbook/
	// inside the addressbook folder
	grunt server
	```
	
7. Now you can build the application and host it on on an webserver.
8. The server also supports [CORS](http://de.wikipedia.org/wiki/Cross-Origin_Resource_Sharing) so you can host too.

	Recommendations:
	- Amazon AWS EC2 Ubuntu instance [we did it](http://www.the-m-project.org/apps/absinthe/addressbook/index.html)
	- [Heroku](https://dashboard.heroku.com/apps)
