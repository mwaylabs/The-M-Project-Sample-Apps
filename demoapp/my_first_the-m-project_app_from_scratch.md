# My first The-M-Project App from scratch

## Setup

1. Install the generator if you havn't allready. [looking for details?](https://github.com/mwaylabs/generator-m/blob/master/README.md)

2. Create a folder and name it after the application name and open it.

	```mkdir demoapp && cd $_```

3. Inside of the folder run the The-M-Project generator
	
	```yo m```
	
4. The generator guides you through several configuration steps

	1. Select a Template
		- First you have to choose a basic template of your application.
		- You find details to all the available templates [here](#templates).
	2. Work with or without Sass
		- It is up to you if you want to use Sass inside of your project or not.
		- If you want to use Sass we recommend Compass. [Details about Sass/Compass](#compass).
	3. Make sure you have a internet connection - all the dependencies getting installed.
	
## Develop the application

We want to develop a simple app with two pages and use different transitions to switch between those twos

[The sample app source code is on GitHub](https://github.com/mwaylabs/The-M-Project-Sample-Apps) (with a blank layout and without Sass)
Read about the [Application Lifecycle](#lifecycle)

1. Start the Testserver

	```
	// Stop the server with ctrl+c
	grunt server
	
	```
	
2. Run the Application: [http://localhost:9000/](http://localhost:9000/) to see what we have so far - should be empty.

3. open app/scripts/main.js
	
	- There is no Controller defined
	- The Router points to no Controller
	- The app is accessable through a the global namespace

	```
	// The app gets initialized with the configuration provided from the config.js
	// and gets appended to the global (window) namespace named like the app 
	global.demoapp = M.Application.extend().create(global.demoapp.mconfig);

    $(document).ready(function() {

		// If the DOM is ready initialzie the router
        global.demoapp.start({
            routing: {
                routes: {
                    //m:routes
                },
                //m:controllers
            }
        });
    });
	
	```
	
4. Setup the both Controller
	- The first page should contain a menu
		- The Menu should be our entry point so the route to it is [http://localhost:9000/](http://localhost:9000/)
	- The second page is a detail of a selected menu item
		- Use detail as route [http://localhost:9000/detail](http://localhost:9000/detail)
	- This generates the both files
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

5. Add a [Layout](#layout)
	- Both Controllers share a layout so add initialize it inside the `applicationStart` of the demoapp.MenuController
	
	```
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
	
	```
	...
	// Extend the MenuController
	demoapp.Controllers.DetailController = demoapp.Controllers.MenuController.extend({
		
		// Remove unused methods
    });
	...
	```
	
7. Create the basic Views

	```
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
	
	```
	// scripts/controllers/detail.js
	demoapp.Controllers.DetailController = demoapp.Controllers.MenuController.extend({

        initViews: function(){
	        // Initialzie the DetailView  with the controller (this) as scope
            this.contentView = demoapp.Views.DetailView.create(this);
        }
    });
	
	```

	```
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

	```
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
	
	```
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

	```
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

	```
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
	
	```
	demoapp.navigate({
		route: '/detail',
		transition: M.PageTransitions.CONST.FALL
	});
	
	```
	
12. Look a the sample apps to get an idea of how to use The-M-Project. The [Kitchensink](http://www.the-m-project.org/apps/absinthe/index.html) is a good starting point.