# My first The-M-Project 2.0 App from scratch

In this tutorial we first build a very basic application. You will learn how to use The-M-Project.
1. The first step is to create the app and switch the content on a buttonpress with a transition
2. Then you learn how to use models and collections and connect them with bikini 

# Step 1 - Basic Sample App

## Setup

1. Install the generator if you haven't already. [Looking for details?](https://github.com/mwaylabs/generator-m/blob/master/README.md)
2. 
2. Create a folder and name it after the application name and open it.

	```
	mkdir demoapp && cd $_
	```

3. Inside of the folder run the The-M-Project generator
	
	```
	yo m
	```
	
4. The generator guides you through several configuration steps

	1. Select a Template
		- First you have to choose a basic template of your application.
		- You find details to all the available templates [here](https://github.com/mwaylabs/The-M-Project/tree/absinthe#layouts-1).
	2. Work with or without Sass
		- It is up to you if you want to use Sass inside of your project or not.
		- If you want to use Sass we recommend Compass. [Details about Sass/Compass](#compass).
	3. Make sure you have a internet connection - all the dependencies getting installed.
	
## Develop the application

We want to develop a simple app with two pages and use different transitions to switch between both.

[The sample app source code is on GitHub](https://github.com/mwaylabs/The-M-Project-Sample-Apps) (with a blank layout and without Sass).
Read about the [Application Lifecycle](https://github.com/mwaylabs/The-M-Project/tree/absinthe#application-lifecycle)

1. Start the Testserver

	```
	// Stop the server with ctrl+c
	grunt server
	
	```
	
2. Run the Application: [http://localhost:9000/](http://localhost:9000/) to see what we have so far - should be empty.

3. open app/scripts/main.js
	
	- There is no Controller defined
	- The Router points to no Controller
	- The app is accessable through a global namespace

	```javascript
		// The app gets initialized with the configuration provided from the config.js
		// and gets appended to the global (window) namespace named like the app 
		global.demoapp = M.Application.extend().create(global.demoapp.mconfig);
	    $(document).ready(function() {
	
		// If the DOM is ready, initialize the router
	        global.demoapp.start({
	            routing: {
	                routes: {
	                    //m:routes -- don't edit this
	                },
	                //m:controllers -- don't edit this
	            }
	        });
	    });
	
	```
	
4. Setup the both Controller
	- The first page should contain a menu
		- The Menu should be our entry point. The route to it is [http://localhost:9000/](http://localhost:9000/)
	- The second page is a detail of a selected menu item
		- Use detail as a route [http://localhost:9000/detail](http://localhost:9000/detail)
	- This generates both files
		- `scripts/controllers/menu.js`
		- `scripts/controllers/detail.js`
	- The generator adds a script tag for every view to the `index.html`
	- The generator adds every controller to the router inside the `app/scripts/main.js`

	```
	// The first argument is the name of the controller
	yo m:controller menu ''
	// The second argument is the route to the controller
	yo m:controller detail detail
	// Start the server again
	grunt server
	```
	
	- open [http://localhost:9000/](http://localhost:9000/) to call the `applicationStart` of the MenuController
	- open [http://localhost:9000/#detail](http://localhost:9000/#detail) to call the `applicationStart` of the DetailController

5. Add a [Layout](https://github.com/mwaylabs/The-M-Project/tree/absinthe#layouts-1)
	- Both Controllers share a layout so add initialize it inside the `applicationStart` of the demoapp.MenuController
	
	```javascript
	...
	applicationStart: function(settings) {
		// Create a layout and apply it to the application
	   	var layout = M.SwitchLayout.extend().create(this);
		demoapp.setLayout(layout);
	}
	...
	```
6. Extend one Controller from the other
	- Since both Controller should share the same Layout they can share the same code.
	- Change the `scripts/controllers/detail.js`
	
	```javascript
	...
	// Extend the MenuController
	demoapp.Controllers.DetailController = demoapp.Controllers.MenuController.extend({
		
		// Remove unused methods
    });
	...
	```
	
7. Create the basic Views

	```javascript
	// The first argument is the name of the view
	yo m:view menu
	yo m:view detail
	```
	- This generates the both files
		- `scripts/views/menu.js`
		- `scripts/views/detail.js`
	- The generator adds a script tag for every view to the `index.html`

8. Initialze the Views
	- Every View is bound to a Controller
	- Implement a `initViews` method for both controllers
	- Create a `contentView` property for the controllers and assign the generated Views to it
	- Application start
		1. Initialize the Layout
		2. Apply the Layout to the app
		3. Initialize the Views
		4. Render the views by applying them to the layout
	- show
		1. Initialize the Views
		2. Change the from one content to another
	
	```javascript
	// scripts/controllers/detail.js
	demoapp.Controllers.DetailController = demoapp.Controllers.MenuController.extend({

        initViews: function(){
	        // Initialzie the DetailView  with the controller (this) as scope
            this.contentView = demoapp.Views.DetailView.create(this);
        }
    });
	
	```

	```javascript
	// scripts/controllers/menu.js
	 demoapp.Controllers.MenuController = M.Controller.extend({

        // The Content of the page
        contentView: null,

        // Called when the Application starts
        applicationStart: function () {
            // Create a layout and apply it to the application
            var layout = M.SwitchLayout.extend().create(this);
            // Set the Layout to the View
            demoapp.setLayout(layout);
            // Initialize the Views
            this.initViews();
            // Apply the Views to the Layout (render)
            this._applyViews();
        },

        show: function () {
            // Initialize the Views
            this.initViews();
            // Apply the Views to the Layout (render)
            this._applyViews();
            // Switch the Layout
            demoapp.getLayout().startTransition();
        },

        initViews: function(){
            // Create the MenuView with the controller (this) as scope
            this.contentView = demoapp.Views.MenuView.create(this);
        },

        _applyViews: function() {
            demoapp.getLayout().applyViews({
                content: this.contentView
            });
        }
    });
	
	```

9. Add content and interaction to the views

	```javascript
	// scripts/views/detail.js
	demoapp.Views.DetailView = M.View.extend({
        // The properties of a view

        // The view should be in a grid
        grid: 'col-xs-12',
        // Every view has a value
        value: 'Detail'
    }, {
        // The childViews

        // Add a button to navigate to the MenuView
        button: M.ButtonView.extend({
            // The Text of the Button
            value: 'Back to the Menu',
            // The events of the button
            events: {
                // On tab call the scope method 'gotoMenuPage' (scope is the DetailController)
                tap: 'gotoMenuView'
            }
        })
    });
	
	```
	
	```javascript
	// scripts/views/menu.js
	demoapp.Views.MenuView = M.View.extend({
        // The properties of a view

        // The view should be in a grid
        grid: 'col-xs-12',
        // Every view has a value
        value: 'Menu'
    }, {
        // The childViews

        // Add a button to navigate to the MenuView
        button: M.ButtonView.extend({
            // The Text of the Button
            value: 'To the Detail View',
            // The events of the button
            events: {
                // On tab call the scope method 'gotoMenuPage' (scope is the DetailController)
                tap: 'gotoDetailView'
            }
        })
    });	
	```
	
10. Add Navigation methods to the Controller

	```javascript
	// scripts/controllers/detail.js
	...
	// Navigation: on button tap
        gotoMenuView: function(){
            // navigate to the menu view via a route
            demoapp.navigate({
                route: ''
            });
        }
	...
	
	```

	```javascript
	// scripts/controllers/menu.js
	...
	// Navigation: on button tap
        gotoDetailView: function(){
            // navigate to the detail view via a route
            demoapp.navigate({
                route: '/detail'
            });
        }
	...
		
	```
	
11. Change Transitions
	- To get an overview of all available transitions have a look at the `M.PageTransitions.CONST`
	
	```javascript
	demoapp.navigate({
		route: '/detail',
		transition: M.PageTransitions.CONST.FALL
	});
	
	```
	
12. You want more? Look at the sample apps to get an idea of how to use The-M-Project. The [Kitchensink](http://www.the-m-project.org/apps/absinthe/kitchensink/index.html) is a good starting point.


# Step 2 - Working with models and collections
Tipp: M.Model and M.Collection are extended from [Backbone.Model](http://backbonejs.org/#Model) and [Backbone.Collection](http://backbonejs.org/#Collection)

1. Create a collection called contacts

	- this will create a folder `scripts/collections` and inside a file called `contacts.js`
	
    ```
    yo m:collection contacts
    ```
2. Create a model called contact
	- this will create a folder `scripts/models` and inside a file called `contact.js`

    ```
    yo m:model contact
    ```
    
3. Assign the `contact` model to the `contacts` collection. Open `scripts/collections`. Default the model is called the same as the collection in this case `ContactsModel` so just remove the `s`:

	```
	demoapp.Collections.ContactsCollection = M.Collection.extend({
		//assign the contact model to this collection
        model: demoapp.Models.ContactModel
    });
	```
	
5. Create the collection inside the Menucontroller. `scripts/controllers/menu.js`
	1. define a variable for it 

		```	
		...
		// define contacts collection
	    contacts: null,    
	    ...
		
		```
	
	2. Initialze the collection inside `applicationStart` and `show` before the `initViews` call.

		```
		...
			// Called when the Application starts
        applicationStart: function () {
           	 // Create a layout and apply it to the application
           	 var layout = M.SwitchLayout.extend().create(this);
           	 // Set the Layout to the View
           	 demoapp.setLayout(layout);
           	 // Initialze the Collection
           	 this.initData();
           	 // Initialize the Views
           	 this.initViews();
           	 // Apply the Views to the Layout (render)
           	 this._applyViews();
        },

        show: function () {
            // Initialze the Collection
            this.initData();
            // Initialize the Views
            this.initViews();
            // Apply the Views to the Layout (render)
            this._applyViews();
            // Switch the Layout
            demoapp.getLayout().startTransition();
        },
        ...
		```

	3. Implement `initData` with demo data
	
		```
		// initialze the data
		initData: function(){
            // create the contacts collections if it doesn't exist
            if(!this.contacts){
                this.contacts = demoapp.Collections.ContactsCollection.create(this.getContacts());
            }
        },

		// get the contacts
        getContacts: function(){
            // create some demo data
            return [{"name": 'foo', "lastname": "bar"}, {"name": 'max', "lastname": "mustermann"}];
        }
		```
	
4. Display the collection using a `M.ListView` in `scripts/views/menu.js`

Tipp: Look at the Kitchensink for example code


	- create a M.ListView
	- apply a grid (from left to right with some padding)
	- set the scopeKey	- the collections name inside the controller
	- add a `M.ListItemView` as a blue print for every entry
	- extend the template from `M.ListItemView` to fit to the collection model. Every attribute of the model can be displayed with '<%= ATTRIBUTE_NAME %>'

	```
	...
	// The contacts list       
        contactsList: M.ListView.extend({

            // fit into the grid - whole page
            grid: 'col-xs-12',

            // the collection inside the menu controller
            scopeKey: 'contacts',

            // This property contains the listitem view
            listItemView: M.ListItemView.extend({

                // Extend the default template with this one. It gets injected into the <%= _value_ %> placeholder
                extendTemplate: '<span><%= name %></span> <span><%= lastname %></span>'
            })


        })
        ...
	```
5. Test the application

The application should display a basic list with the both entries.

```
grunt server
```

6. Add contacts through a submit form
	1. Create the input fields in `scripts/views/menu.js`
	
		```
		...
		// an input field for the lastname
        addLastName: M.TextfieldView.extend({
            // fit into the grid
            grid: 'col-xs-12',
            // label it as lastname with a placeholder ...
            placeholder: 'Lastname',
            // and a label
            label: 'Lastname',
            // add a nice icon from http://fontawesome.io/icons/
            icon: 'fa-users',
            // bind the view to a controller model attribute
            scopeKey: 'newContact.lastname'
        }),

        // an input field for the firstname
        addFirstName: M.TextfieldView.extend({
            // fit into the grid
            grid: 'col-xs-12',
            // label it as lastname with a placeholder ...
            placeholder: 'Firstname',
            // and a label
            label: 'Firstname',
            // add a nice icon from http://fontawesome.io/icons/
            icon: 'fa-user',
            // bind the view to a controller model attribute
            scopeKey: 'newContact.name'
        }),
        ...
	
		```
	2. Add an submit button to `scripts/views/menu.js`

		```
		...
		// a submit button for adding a entry to the list
        addButton: M.ButtonView.extend({
            //fit into the grid
            grid: 'col-xs-12',
            // The Text of the Button
            value: 'Add',
            // The events of the button
            events: {
                // On tab call the scope method 'addContact' (scope is the MenuController)
                tap: 'addContact'
            }
        }),
		...
		```
7. Extend the controller to serve the new features

	1. Add an attribute for the TextFieldViews
	
		```
		...
		// use this model as reference to the form views
        newContact: null,
		...

		```
		
	2. Implement the tap callback of the `addButton` inside the `scripts/controller/menu.js`
		On the tab create a new model based on the `newContact` model. Thanks to [backbone.stickit](http://nytimes.github.io/backbone.stickit/) the model and the view are always in sync.
	
		```
		addContact: function(){
            // add a new model instance based on the the new contact model to the collection
this.contacts.add(demoapp.Models.ContactModel.create(this.newContact.attributes));
        }
		```
		
8. Store the data inside the `localStorage`


	














