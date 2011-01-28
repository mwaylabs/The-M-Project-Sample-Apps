// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.Task = M.Model.create({
    __name__: 'Task',

    text: M.Model.attr('String', {
        isRequired: YES
    })

}, M.LocalStorageProvider);// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.TaskWebSql = M.Model.create({
    __name__: 'Task',

    text: M.Model.attr('String', {
        isRequired: YES
    })

}, M.WebSqlProvider.configure({
    dbName: 'KitchenSinkDB'
}));// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsButtonViewController
// ==========================================================================

KitchenSink.ControlsButtonGroupViewController = M.Controller.extend({

    controlsList: null,

    activeButton: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default button group",
                    page: "controlsButtonGroupView1"

                },

                {

                    name: "Vertical button group",
                    page: "controlsButtonGroupView2"

                },

                {

                    name: "Multi button group",
                    page: "controlsButtonGroupView3"

                },

                {

                    name: "Multi button gr. (not inset)",
                    page: "controlsButtonGroupView4"

                },

                {

                    name: "Multi button gr. (not compact)",
                    page: "controlsButtonGroupView5"

                },

                {

                    name: "getActiveButton()",
                    page: "controlsButtonGroupView6"

                },

                {

                    name: "setActiveButton()",
                    page: "controlsButtonGroupView7"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsButtonGroupView', M.TRANSITION.SLIDE, YES);

    },

    getActiveButton: function() {

        var buttonGroup = M.ViewManager.getView('controlsButtonGroupView6', 'buttonGroup');
        this.set('activeButton', buttonGroup.getActiveButton() ? buttonGroup.getActiveButton().value : '-');

    },

    setActiveButton: function() {

        var buttonGroup = M.ViewManager.getView('controlsButtonGroupView7', 'buttonGroup');
        var childViews = $.trim(buttonGroup.childViews).split(' ');
        for(var i in childViews) {
            var button = M.ViewManager.getView(buttonGroup, childViews[i]);
            if(button && button.value === 'Button 1') {
                buttonGroup.setActiveButton(button);
            }
        }

    }

});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsButtonViewController
// ==========================================================================

KitchenSink.ControlsButtonViewController = M.Controller.extend({

    controlsList: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default button",
                    page: "controlsButtonView1"

                },

                {

                    name: "Button with icon",
                    page: "controlsButtonView2"

                },

                {

                    name: "\"Icon only\" button",
                    page: "controlsButtonView3"

                },

                {

                    name: "Inline button",
                    page: "controlsButtonView4"

                },

                {

                    name: "Inline button with icon",
                    page: "controlsButtonView5"

                },

                {

                    name: "Custom styled button",
                    page: "controlsButtonView6"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsButtonView', M.TRANSITION.SLIDE, YES);

    }

});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsController
// ==========================================================================

KitchenSink.ControlsController = M.Controller.extend({

    controlsList: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "M.ButtonView",
                    page: "controlsButtonView"

                },

                {

                    name: "M.ButtonGroupView",
                    page: "controlsButtonGroupView"

                },

                /*{

                    name: "M.ContainerView",
                    page: "ControlsContainerViewPage"

                },*/

                {

                    name: "M.DialogView",
                    page: "controlsDialogView"

                },

                {

                    name: "M.GridView",
                    page: "controlsGridView"

                },

                {

                    name: "M.ImageView",
                    page: "controlsImageView"

                },

                {

                    name: "M.LabelView",
                    page: "controlsLabelView"

                },

                {

                    name: "M.ListView",
                    page: "controlsListView"

                },

                {

                    name: "M.LoaderView",
                    page: "controlsLoaderView"

                },

                /*{

                    name: "M.PageView",
                    page: "ControlsPageViewPage"

                },

                {

                    name: "M.ScrollView",
                    page: "ControlsScrollViewPage"

                },*/

                {

                    name: "M.SearchBarView",
                    page: "controlsSearchBarView"

                },

                {

                    name: "M.SelectionListView",
                    page: "controlsSelectionListView"

                },

                {

                    name: "M.TabBarView",
                    page: "controlsTabBarView"

                },

                {

                    name: "M.TextFieldView",
                    page: "controlsTextFieldView"

                },

                {

                    name: "M.ToggleView",
                    page: "controlsToggleView"

                },

                {

                    name: "M.ToolbarView",
                    page: "controlsToolbarView"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    }

});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsDialogViewController
// ==========================================================================

KitchenSink.ControlsDialogViewController = M.Controller.extend({

    controlsList: null,

    callback: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Alert dialog",
                    page: "controlsDialogView1"

                },

                {

                    name: "Confirm dialog",
                    page: "controlsDialogView2"

                },

                {

                    name: "Actionsheet dialog (default)",
                    page: "controlsDialogView3"

                },

                {

                    name: "Actionsheet dialog",
                    page: "controlsDialogView4"

                },

                {

                    name: "Working with callbacks",
                    page: "controlsDialogView5"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsDialogView', M.TRANSITION.SLIDE, YES);

    },

    openAlert: function() {

        M.DialogView.alert({

            title: 'Alert dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

        })

    },

    openConfirm: function() {

        M.DialogView.confirm({

            title: 'Confirm dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

        })

    },

    openActionsheet: function() {

        M.DialogView.actionSheet({

            title: 'Actionsheet dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

        })

    },

    openActionsheet2: function() {

        M.DialogView.actionSheet({

            title: 'Actionsheet dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

            buttons: {

                button1: {
                    title: 'Button 1'
                },

                button2: {
                    title: 'Button 2'
                },

                button3: {
                    title: 'Button 3'
                }
                
            }

        })

    },

    openActionsheet3: function() {

        M.DialogView.actionSheet({

            title: 'Actionsheet dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

            onCancel: {

                target: this,

                action: 'callbackCancel'

            },

            buttons: {

                button1: {

                    title: 'Button 1',

                    target: this,

                    action: 'callbackButton1'

                },

                button2: {

                    title: 'Button 2',

                    target: this,

                    action: 'callbackButton2'

                },

                button3: {

                    title: 'Button 3',

                    target: this,

                    action: 'callbackButton3'

                }
                
            }

        })

    },

    callbackCancel: function() {

        this.set('callback', 'Cancel button');

    },

    callbackButton1: function() {

        this.set('callback', 'Button 1');

    },

    callbackButton2: function() {

        this.set('callback', 'Button 2');

    },

    callbackButton3: function() {

        this.set('callback', 'Button 3');

    }

});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsDialogViewController
// ==========================================================================

KitchenSink.ControlsGridViewController = M.Controller.extend({

    controlsList: null,

    callback: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Two columns grid",
                    page: "controlsGridView1"

                },

                {

                    name: "Three columns grid",
                    page: "controlsGridView2"

                },

                {

                    name: "Custom grid",
                    page: "controlsGridView3"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsGridView', M.TRANSITION.SLIDE, YES);

    }

});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsDialogViewController
// ==========================================================================

KitchenSink.ControlsImageViewController = M.Controller.extend({

    controlsList: null,

    callback: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default image",
                    page: "controlsImageView1"

                },

                {

                    name: "Image with CSS styling",
                    page: "controlsImageView2"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsImageView', M.TRANSITION.SLIDE, YES);

    }

});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsDialogViewController
// ==========================================================================

KitchenSink.ControlsLabelViewController = M.Controller.extend({

    controlsList: null,

    callback: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default label",
                    page: "controlsLabelView1"

                },

                {

                    name: "Label with computed value",
                    page: "controlsLabelView2"

                },

                {

                    name: "Hyperlink label (internal)",
                    page: "controlsLabelView3"

                },

                {

                    name: "Hyperlink label (external)",
                    page: "controlsLabelView4"

                },

                {

                    name: "Inline labels",
                    page: "controlsLabelView5"

                },

                {

                    name: "Inline labels & comp. values",
                    page: "controlsLabelView6"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsLabelView', M.TRANSITION.SLIDE, YES);

    },

    hyperlink1: function() {

        M.DialogView.alert({

            title: 'Alert dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

        })

    }

});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsListViewController = M.Controller.extend({

    controlsList: null,

    page1: null,

    page2: null,

    page3: null,

    page4: null,

    callback: null,

    searchString: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default list",
                    page: "controlsListView1"

                },

                {

                    name: "Segmented list",
                    page: "controlsListView2"

                },

                {

                    name: "Complex list",
                    page: "controlsListView3"

                },

                {

                    name: "Counted list",
                    page: "controlsListView4"

                },

                {

                    name: "Default searchbar list",
                    page: "controlsListView5"

                },

                {

                    name: "Custom searchbar list",
                    page: "controlsListView6"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    initPage1: function(isFirstLoad) {

        if(isFirstLoad) {

            var page1 = [

                {

                    name: "Item 1"

                },

                {

                    name: "Item 2"

                },

                {

                    name: "Item 3"

                },

                {

                    name: "Item 4"

                },

                {

                    name: "Item 5"

                }

            ];

            this.set('page1', page1);

        }

    },

    initPage2: function(isFirstLoad) {

        if(isFirstLoad) {

            var page2 = {

                'List 1': [

                    {

                        name: "Item 1"

                    },

                    {

                        name: "Item 2"

                    }

                ],

                'List 2': [

                    {

                        name: "Item 1"

                    },

                    {

                        name: "Item 2"

                    },

                    {

                        name: "Item 3"

                    }

                ],

                'List 3': [

                    {

                        name: "Item 1"

                    }

                ]

            };

            this.set('page2', page2);

        }

    },

    initPage3: function(isFirstLoad) {

        if(isFirstLoad) {

            var page3 = [

                {

                    name: "Item 1",

                    subtitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr...",

                    image: "square_cyan.png"

                },

                {

                    name: "Item 2",

                    subtitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr...",

                    image: "square_yellow.png"

                },

                {

                    name: "Item 3",

                    subtitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr...",

                    image: "square_magenta.png"

                },

                {

                    name: "Item 4",

                    subtitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr...",

                    image: "square_green.png"

                },

                {

                    name: "Item 5",

                    subtitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr...",

                    image: "square_red.png"

                }

            ];

            this.set('page3', page3);

        }

    },


    initPage4: function(isFirstLoad) {

        if(isFirstLoad) {

            var page4 = [

                {

                    name: "Item 1",

                    number: "2"

                },

                {

                    name: "Item 2",

                    number: "9"

                },

                {

                    name: "Item 3",

                    number: "24"

                },

                {

                    name: "Item 4",

                    number: "4"

                },

                {

                    name: "Item 5",

                    number: "11"

                }

            ];

            this.set('page4', page4);

        }

    },

    initPage5: function(isFirstLoad) {

        if(isFirstLoad) {

            var page5 = [

                {

                    name: "Item 1"

                },

                {

                    name: "Item 2"

                },

                {

                    name: "Item 3"

                },

                {

                    name: "Item 4"

                },

                {

                    name: "Item 5"

                }

            ];

            this.set('page5', page5);

        }

    },

    initPage6: function(isFirstLoad) {

        if(isFirstLoad) {

            var page6 = [

                {

                    name: "Item 1"

                },

                {

                    name: "Item 2"

                },

                {

                    name: "Item 3"

                },

                {

                    name: "Item 4"

                },

                {

                    name: "Item 5"

                }

            ];

            this.set('page6', page6);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsListView', M.TRANSITION.SLIDE, YES);

    },

    searchStringDidChange: function(str) {

        str = str ? str : '-';

        this.set('searchString', str);

    }

});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsLoaderViewController = M.Controller.extend({

    controlsList: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default loader",
                    page: "controlsLoaderView1"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsLoaderView', M.TRANSITION.SLIDE, YES);

    },

    showLoader: function() {

        M.LoaderView.show();

    },

    hideLoader: function() {

        M.LoaderView.hide();

    }

});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsSearchBarViewController = M.Controller.extend({

    controlsList: null,

    output1: null,

    output2: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default searchbar",
                    page: "controlsSearchBarView1"

                },

                {

                    name: "Searchbar with initial text",
                    page: "controlsSearchBarView2"

                },

                {

                    name: "Get searchstring",
                    page: "controlsSearchBarView3"

                },

                {

                    name: "Link searchbar to label",
                    page: "controlsSearchBarView4"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsSearchBarView', M.TRANSITION.SLIDE, YES);

    },

    getValue: function() {

        var value = M.ViewManager.getView('controlsSearchBarView3', 'searchbar').value;

        this.set('output1', value ? value : '-');

    }

});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsSelectionListViewController = M.Controller.extend({

    controlsList: null,

    selection: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Selection list (single selection)",
                    page: "controlsSelectionListView1"

                },

                {

                    name: "Selection list (multiple selection)",
                    page: "controlsSelectionListView2"

                },

                {

                    name: "Selection list (single selection dialog)",
                    page: "controlsSelectionListView3"

                },

                {

                    name: "getSelection()",
                    page: "controlsSelectionListView4"

                },

                {

                    name: "setSelection()",
                    page: "controlsSelectionListView5"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsSelectionListView', M.TRANSITION.SLIDE, YES);

    },

    getSelection: function() {

        var selection = M.ViewManager.getView('controlsSelectionListView4', 'selectionList').getSelection();

        this.set('selection', selection.length > 0 ? selection : '-');

    },

    setSelection: function() {

        M.ViewManager.getView('controlsSelectionListView5', 'selectionList').setSelection('item2');

    }

});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsTabBarViewController = M.Controller.extend({

    controlsList: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default tab bar",
                    page: "controlsTabBarView1"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsTabBarView', M.TRANSITION.SLIDE, YES);

    }

});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsTextFieldViewController = M.Controller.extend({

    controlsList: null,

    textfieldvalue: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default textfield",
                    page: "controlsTextFieldView1"

                },

                {

                    name: "Textfield with initial text",
                    page: "controlsTextFieldView2"

                },

                {

                    name: "Two linked textfields",
                    page: "controlsTextFieldView3"

                },

                {

                    name: "Custom textfield",
                    page: "controlsTextFieldView4"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsTextFieldView', M.TRANSITION.SLIDE, YES);

    }

});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsToggleViewController = M.Controller.extend({

    controlsList: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Toggle buttons automatically",
                    page: "controlsToggleView1"

                },

                {

                    name: "Toggle buttons manually",
                    page: "controlsToggleView2"

                },

                {

                    name: "Toggle complex view",
                    page: "controlsToggleView3"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsToggleView', M.TRANSITION.SLIDE, YES);

    },

    toggleButtons: function() {

        M.ViewManager.getView('controlsToggleView2', 'toggle').toggleView();

    },

    toggleViews: function() {

        M.ViewManager.getView('controlsToggleView3', 'toggle').toggleView();

    }

});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsToolbarViewController = M.Controller.extend({

    controlsList: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default toolbar",
                    page: "controlsToolbarView1"

                },

                {

                    name: "Toolbar with back button",
                    page: "controlsToolbarView2"

                },

                {

                    name: "Toolbar with two buttons",
                    page: "controlsToolbarView3"

                },

                {

                    name: "Toolbar with button group",
                    page: "controlsToolbarView4"

                },

                {

                    name: "Custom toolbar",
                    page: "controlsToolbarView5"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsToolbarView', M.TRANSITION.SLIDE, YES);

    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.DataController = M.Controller.extend({

    dataList: null,

    init: function(isFirstLoad) {
        
        if(isFirstLoad) {

            var dataList = [
                {
                    name: "LocalStorage ToDo App Example",
                    page: "dataLocalStorageTaskApp"
                },
                {
                    name: "WebSQL ToDo App Example",
                    page: "dataWebSqlTaskApp"
                },
                {
                    name: "M.Request: Send GET Request",
                    page: "dataRequestSample"
                }
            ];
            
            this.set('dataList', dataList);
        }
    },

    dataSelected: function(id) {
        var dataName = M.ViewManager.getView(id, 'name').value;
        var data = _.detect(this.dataList, function(data) {
            return data.name === dataName;
        });
        
        this.switchToPage(data.page);
    },

    here: function() {
        this.switchToPage('data', M.TRANSITION.SLIDE, YES);
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.DataLocalStorageTaskAppController = M.Controller.extend({

    tasks: null,
    currentTask:null,

    init: function() {
        KitchenSink.Task.find();
        this.setTasks();
    },

    addTask: function() {

         if(!M.ViewManager.getView('dataLocalStorageTaskApp', 'form').validate()) {
            if(M.Validator.validationErrors) {
                M.ViewManager.getView('dataLocalStorageTaskApp', 'form').showErrors();
                return;
            }
        }

        var text = M.ViewManager.getView('dataLocalStorageTaskApp', 'taskField').value

        task = KitchenSink.Task.createRecord({
            text: M.ViewManager.getView('dataLocalStorageTaskApp', 'taskField').value
        });

        task.save();
        this.setTasks();
        M.ViewManager.getView('dataLocalStorageTaskApp', 'taskField').setValue('');
    },

    removeTodo: function(domId, modelId) {  
        this.currentTask = KitchenSink.Task.recordManager.getRecordForId(modelId);
        
        /*M.DialogView.confirm({
            title: 'Delete a Task',
            message: 'Do you really want to delete this item?',

            onOk: {
                target: this,
                action: 'deleteTodo'
            }
        });*/
        if(confirm("Do you really want to delete this item?")) {
            this.deleteTodo();
        }
    },

    deleteTodo: function() {
        this.currentTask.del();
        this.setTasks();
    },

    setTasks: function() {
        this.set('tasks', KitchenSink.Task.records());
    },

    edit: function() {
        M.ViewManager.getView('dataLocalStorageTaskApp', 'taskList').toggleRemove({
            target: this,
            action: 'removeTodo'
        });
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      12.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.DataRequestSampleController = M.Controller.extend({

    markupValue: null,

    titleValue: null,

    getRequest: function() {
        var keyword = M.ViewManager.getView('dataRequestSample', 'keywordField').value;               

        // use 'html5' as keyword if no keyword entered
        keyword = keyword == '' || !keyword ? 'html5' : keyword;

        this.set('titleValue', 'The latest tweets for: ' + keyword);

        that = this;

        M.Request.init({
            url: '/twitter/search.json?q=' + keyword + '&rpp=10',
            method: 'GET',
            isJSON: YES,
            contentType: 'application/JSON',
            timeout: 5000,
            onSuccess: function(data) {
                // hide the loader when request is completed
                M.LoaderView.hide();
                
                that.showResponse(data);
            },
            onError: function(req, msg) {
                // hide the loader when request is completed
                M.LoaderView.hide();
            },
            beforeSend: function() {
                M.LoaderView.show();
            }
        }).send();   
    },

    showResponse: function(data) {

        var response = '-';

        if(data) {
            response = '';
            _.each(data.results, function(res) {
                response += res.created_at + '\n';
                response += '<img class="twitter_pic" src="' + res.profile_image_url +  '" /><span class="twitter_user_name">' + res.from_user + '</span>: ' + res.text + '\n\n';
            });
            response = response.substring(0,response.length - 2); // delete last two \n
        }

        this.set('markupValue', response);
        //M.ViewManager.getView('dataRequestSample', 'markup').setValue('data');
    },

    showError: function(req, msg) {
        this.set('markupValue', msg);
    }
    
});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.DataWebSqlTaskAppController = M.Controller.extend({

    tasks: null,
    currentTask:null,

    init: function() {
        KitchenSink.TaskWebSql.find({
            onSuccess: {
                target: this,
                action: 'setTasks'
            }
        });

    },

    addTask: function() {

         if(!M.ViewManager.getView('dataWebSqlTaskApp', 'form').validate()) {
            if(M.Validator.validationErrors) {
                M.ViewManager.getView('dataWebSqlTaskApp', 'form').showErrors();
                return;
            }
        }

        var text = M.ViewManager.getView('dataWebSqlTaskApp', 'taskField').value

        task = KitchenSink.TaskWebSql.createRecord({
            text: M.ViewManager.getView('dataWebSqlTaskApp', 'taskField').value
        });

        task.save({
            onSuccess: {
                target: this,
                action: 'setTasks'
            }
        });
        M.ViewManager.getView('dataWebSqlTaskApp', 'taskField').setValue('');
    },

    removeTodo: function(domId, modelId) {
        this.currentTask = KitchenSink.TaskWebSql.recordManager.getRecordForId(modelId);

        /*M.DialogView.confirm({
            title: 'Delete a Task',
            message: 'Do you really want to delete this item?',

            onOk: {
                target: this,
                action: 'deleteTodo'
            }
        });*/

        if(confirm("Do you really want to delete this item?")) {
            this.deleteTodo();
        }
    },

    deleteTodo: function() {
        this.currentTask.del({
            onSuccess: {
                target: this,
                action: 'setTasks'
            }
        });
    },

    setTasks: function() {
        this.set('tasks', KitchenSink.TaskWebSql.records());
    },

    edit: function() {
        M.ViewManager.getView('dataWebSqlTaskApp', 'taskList').toggleRemove({
            target: this,
            action: 'removeTodo'
        });
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      14.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.UtilitiesController = M.Controller.extend({

    utilitiesList: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var utilitiesList = [
                {
                    name: "M.I18n: Internationalization",
                    page: "utilitiesI18n"
                },

                {
                    name: "M.Date",
                    page: "utilitiesDate"
                }
            ];

            this.set('utilitiesList', utilitiesList);
        }
    },

    utilitySelected: function(id) {
        var utilityName = M.ViewManager.getView(id, 'name').value;
        var utility = _.detect(this.utilitiesList, function(utility) {
            return utility.name === utilityName;
        });

        this.switchToPage(utility.page);
    },

    here: function() {
        this.switchToPage('utilities', M.TRANSITION.SLIDE, YES);
    }

});KitchenSink.UtilitiesDateController = M.Controller.extend({

    dateList: null,

    date1: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var dateList = [
                {
                    name: "Get the current date",
                    page: "utilitiesDate1"
                },

                {
                    name: "Format a date",
                    page: "utilitiesDate2"
                }
            ];
            this.set('dateList', dateList);
        }

    },

    dateSelected: function(id) {

        var dateName = M.ViewManager.getView(id, 'name').value;
        var date = _.detect(this.dateList, function(date) {
            return date.name === dateName;
        });

        this.switchToPage(date.page);
    },

    here: function() {
        this.switchToPage('utilitiesDate', M.TRANSITION.SLIDE, YES);
    },

    formatDate1: function() {
        var format = M.ViewManager.getView('utilitiesDate2', 'textfield').value;
        this.set('date1', M.Date.now().format(format));
    }

});KitchenSink.UtilitiesI18nController = M.Controller.extend({

    i18nList: null,

    language: null,

    language2: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var i18nList = [
                {
                    name: "Localizing a label",
                    page: "utilitiesI18n1"
                },

                {
                    name: "Get the navigator's language",
                    page: "utilitiesI18n2"
                },

                {
                    name: "Get the current language",
                    page: "utilitiesI18n3"
                }
            ];
            this.set('i18nList', i18nList);
        }

    },

    i18nSelected: function(id) {

        var i18nName = M.ViewManager.getView(id, 'name').value;
        var i18n = _.detect(this.i18nList, function(i18n) {
            return i18n.name === i18nName;
        });

        this.switchToPage(i18n.page);
    },

    here: function() {
        this.switchToPage('utilitiesI18n', M.TRANSITION.SLIDE, YES);
    },

    getLanguage: function() {
        var lang = M.I18N.getLanguage(YES);
        this.set('language', lang);
    },

    getLanguage2: function() {
        var lang = M.I18N.getLanguage();
        this.set('language2', lang);
    }

});KitchenSink.ControlsButtonGroupViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsButtonGroupViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsButtonViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsButtonViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsDialogViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsDialogViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsGridViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsGridViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsImageViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsImageViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsLabelViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsLabelViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsListViewPage1Template = M.ListItemView.design({

    childViews: 'name',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsListViewPage2Template = M.ListItemView.design({

    childViews: 'name',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsListViewPage3Template = M.ListItemView.design({

    childViews: 'image name subtitle',

    image: M.ImageView.design({

        computedValue: {

            valuePattern: '<%= image %>',

            operation: function(v) {

                return '../theme/images/' + v;

            }
            
        },

        cssClass: 'listPage3Image'

    }),

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    }),

    subtitle: M.LabelView.design({

        valuePattern: '<%= subtitle %>',

        cssClass: 'listPage3Subtitle'

    })

});KitchenSink.ControlsListViewPage4Template = M.ListItemView.design({

    childViews: 'name counter',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    }),

    counter: M.LabelView.design({

        valuePattern: '<%= number %>',

        cssClass: 'ui-li-count'

    })

});KitchenSink.ControlsListViewPage5Template = M.ListItemView.design({

    childViews: 'name',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsListViewPage6Template = M.ListItemView.design({

    childViews: 'name',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsListViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsListViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsLoaderViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsLoaderViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsSearchBarViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsSearchBarViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsSelectionListViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsSelectionListViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsTabBarViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsTabBarViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsTextFieldViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsTextFieldViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsToggleViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsToggleViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});KitchenSink.ControlsToolbarViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsToolbarViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.DataLocalStorageTaskAppTemplate = M.ListItemView.design({
    childViews: 'text',
    
    text: M.LabelView.design({
        valuePattern: '<%= text %>'
    })

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.DataPageListItemTemplate = M.ListItemView.design({
    childViews: 'name',

    target: KitchenSink.DataController,
    action: 'dataSelected',

    name: M.LabelView.design({
        valuePattern: '<%= name %>'
    })
});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.DataWebSqlTaskAppTemplate = M.ListItemView.design({
    childViews: 'text',

    text: M.LabelView.design({
        valuePattern: '<%= text %>'
    })

});KitchenSink.TabBar = M.TabBarView.design({

    childViews: 'TabUI TabUtil TabData',

    anchorLocation: M.BOTTOM,

    TabUI: M.TabBarItemView.design({

        value: 'Controls',
        page: 'controls',
        icon: 'controls',
        isActive: YES

    }),

    TabUtil: M.TabBarItemView.design({

        value: 'Utilities',
        page: 'utilities',
        icon: 'utilities'
    }),

    TabData: M.TabBarItemView.design({

        value: 'Data',
        page: 'data',
        icon: 'storage'

    })
});m_require('app/views/tabs.js');
m_require('app/views/controls_page_list_item_template.js');

KitchenSink.PageControls = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsController,

        action: 'init'

    },
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Controls',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsPageListItemTemplate,
            
            contentBinding: 'KitchenSink.ControlsController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_searchbar_view_page_list_item_template.js');

KitchenSink.ControlsSearchBarViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsSearchBarViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsSearchBarViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.SearchBarView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsSearchBarViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsSearchBarViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_searchbar_view_page.js');

KitchenSink.ControlsSearchBarViewPage1 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsSearchBarViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Default searchbar',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'searchbar markupTitle markup',

        searchbar: M.SearchBarView.design({}),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.SearchBarView.design({})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_searchbar_view_page.js');

KitchenSink.ControlsSearchBarViewPage2 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsSearchBarViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Searchbar with initial text',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'searchbar markupTitle markup',

        searchbar: M.SearchBarView.design({

            initialText: 'Keyword...',

            cssClassOnInit: 'initialText'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.SearchBarView.design({\n\n\tinitialText: \'Keyword...\',\n\n\tcssClassOnInit: \'initialText\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_searchbar_view_page.js');

KitchenSink.ControlsSearchBarViewPage3 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsSearchBarViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Get searchstring',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'searchbar button markupTitle markup',

        searchbar: M.SearchBarView.design({}),

        button: M.ButtonView.design({

            value: 'Get value',

            target: KitchenSink.ControlsSearchBarViewController,

            action: 'getValue'

        }),

        markupTitle: M.LabelView.design({

            value: 'Searchstring',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: '-',

            contentBinding: 'KitchenSink.ControlsSearchBarViewController.output1',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_searchbar_view_page.js');

KitchenSink.ControlsSearchBarViewPage4 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsSearchBarViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Link searchbar to label',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'searchbar markupTitle markup',

        searchbar: M.SearchBarView.design({

            contentBindingReverse: 'KitchenSink.ControlsSearchBarViewController.output2'

        }),

        markupTitle: M.LabelView.design({

            value: 'Searchstring',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: '-',

            contentBinding: 'KitchenSink.ControlsSearchBarViewController.output2',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_selectionlist_view_page_list_item_template.js');

KitchenSink.ControlsSelectionListViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsSelectionListViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsSelectionListViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.SelectionListView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsSelectionListViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsSelectionListViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_selectionlist_view_page.js');

KitchenSink.ControlsSelectionListViewPage1 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsSelectionListViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Selection list (single selection)',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'selectionList markupTitle markup',

        selectionList: M.SelectionListView.design({

            childViews: 'item1 item2 item3 item4',

            selectionMode: M.SINGLE_SELECTION,

            item1: M.SelectionListItemView.design({

                value: 'item1',

                label: 'Item 1',
                
                isSelected: YES
                
            }),

            item2: M.SelectionListItemView.design({

                value: 'item2',

                label: 'Item 2'

            }),

            item3: M.SelectionListItemView.design({

                value: 'item3',

                label: 'Item 3'

            }),

            item4: M.SelectionListItemView.design({

                value: 'item4',

                label: 'Item 4'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.SelectionListView.design({\n\n\tchildViews: \'item1 item2 item3 item4\',\n\n\tselectionMode: M.SINGLE_SELECTION,\n\n\titem1: M.SelectionListItemView.design({\n\n\t\tvalue: \'item1\',\n\n\t\tlabel: \'Item 1\',\n\n\t\tisSelected: YES\n\n\t}),\n\n\titem2: M.SelectionListItemView.design({\n\n\t\tvalue: \'item2\',\n\n\t\tlabel: \'Item 2\'\n\n\t}),\n\n\titem3: M.SelectionListItemView.design({\n\n\t\tvalue: \'item3\',\n\n\t\tlabel: \'Item 3\'\n\n\t}),\n\n\titem4: M.SelectionListItemView.design({\n\n\t\tvalue: \'item4\',\n\n\t\tlabel: \'Item 4\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_selectionlist_view_page.js');

KitchenSink.ControlsSelectionListViewPage2 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsSelectionListViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Selection list (multiple selection)',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'selectionList markupTitle markup',

        selectionList: M.SelectionListView.design({

            childViews: 'item1 item2 item3 item4',

            selectionMode: M.MULTIPLE_SELECTION,

            item1: M.SelectionListItemView.design({

                value: 'item1',

                label: 'Item 1',
                
                isSelected: YES
                
            }),

            item2: M.SelectionListItemView.design({

                value: 'item2',

                label: 'Item 2'

            }),

            item3: M.SelectionListItemView.design({

                value: 'item3',

                label: 'Item 3'

            }),

            item4: M.SelectionListItemView.design({

                value: 'item4',

                label: 'Item 4'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.SelectionListView.design({\n\n\tchildViews: \'item1 item2 item3 item4\',\n\n\tselectionMode: M.MULTIPLE_SELECTION,\n\n\titem1: M.SelectionListItemView.design({\n\n\t\tvalue: \'item1\',\n\n\t\tlabel: \'Item 1\',\n\n\t\tisSelected: YES\n\n\t}),\n\n\titem2: M.SelectionListItemView.design({\n\n\t\tvalue: \'item2\',\n\n\t\tlabel: \'Item 2\'\n\n\t}),\n\n\titem3: M.SelectionListItemView.design({\n\n\t\tvalue: \'item3\',\n\n\t\tlabel: \'Item 3\'\n\n\t}),\n\n\titem4: M.SelectionListItemView.design({\n\n\t\tvalue: \'item4\',\n\n\t\tlabel: \'Item 4\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_selectionlist_view_page.js');

KitchenSink.ControlsSelectionListViewPage3 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsSelectionListViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Selection list (multiple selection)',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'selectionList markupTitle markup',

        selectionList: M.SelectionListView.design({

            childViews: 'item1 item2 item3 item4',

            selectionMode: M.SINGLE_SELECTION_DIALOG,

            item1: M.SelectionListItemView.design({

                value: 'item1',

                label: 'Item 1',
                
                isSelected: YES
                
            }),

            item2: M.SelectionListItemView.design({

                value: 'item2',

                label: 'Item 2'

            }),

            item3: M.SelectionListItemView.design({

                value: 'item3',

                label: 'Item 3'

            }),

            item4: M.SelectionListItemView.design({

                value: 'item4',

                label: 'Item 4'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.SelectionListView.design({\n\n\tchildViews: \'item1 item2 item3 item4\',\n\n\tselectionMode: M.SINGLE_SELECTION_DIALOG,\n\n\titem1: M.SelectionListItemView.design({\n\n\t\tvalue: \'item1\',\n\n\t\tlabel: \'Item 1\',\n\n\t\tisSelected: YES\n\n\t}),\n\n\titem2: M.SelectionListItemView.design({\n\n\t\tvalue: \'item2\',\n\n\t\tlabel: \'Item 2\'\n\n\t}),\n\n\titem3: M.SelectionListItemView.design({\n\n\t\tvalue: \'item3\',\n\n\t\tlabel: \'Item 3\'\n\n\t}),\n\n\titem4: M.SelectionListItemView.design({\n\n\t\tvalue: \'item4\',\n\n\t\tlabel: \'Item 4\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_selectionlist_view_page.js');

KitchenSink.ControlsSelectionListViewPage4 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsSelectionListViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'getSelection()',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'selectionList button markupTitle markup',

        selectionList: M.SelectionListView.design({

            childViews: 'item1 item2 item3 item4',

            selectionMode: M.MULTIPLE_SELECTION,

            item1: M.SelectionListItemView.design({

                value: 'item1',

                label: 'Item 1',
                
                isSelected: YES
                
            }),

            item2: M.SelectionListItemView.design({

                value: 'item2',

                label: 'Item 2'

            }),

            item3: M.SelectionListItemView.design({

                value: 'item3',

                label: 'Item 3'

            }),

            item4: M.SelectionListItemView.design({

                value: 'item4',

                label: 'Item 4'

            })

        }),

        button: M.ButtonView.design({

            value: 'get selection',

            target: KitchenSink.ControlsSelectionListViewController,

            action: 'getSelection'
            
        }),

        markupTitle: M.LabelView.design({

            value: 'Selected item (value)',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: '-',

            contentBinding: 'KitchenSink.ControlsSelectionListViewController.selection',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_selectionlist_view_page.js');

KitchenSink.ControlsSelectionListViewPage5 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsSelectionListViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'setSelection()',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'selectionList button',

        selectionList: M.SelectionListView.design({

            childViews: 'item1 item2 item3 item4',

            selectionMode: M.SINGLE_SELECTION,

            item1: M.SelectionListItemView.design({

                value: 'item1',

                label: 'Item 1',
                
                isSelected: YES
                
            }),

            item2: M.SelectionListItemView.design({

                value: 'item2',

                label: 'Item 2'

            }),

            item3: M.SelectionListItemView.design({

                value: 'item3',

                label: 'Item 3'

            }),

            item4: M.SelectionListItemView.design({

                value: 'item4',

                label: 'Item 4'

            })

        }),

        button: M.ButtonView.design({

            value: 'set selection (Item 2)',

            target: KitchenSink.ControlsSelectionListViewController,

            action: 'setSelection'
            
        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_tabbar_view_page_list_item_template.js');

KitchenSink.ControlsTabBarViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsTabBarViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsTabBarViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.TabBarView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsTabBarViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsTabBarViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_tabbar_view_page.js');

KitchenSink.ControlsTabBarViewPage1 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsTabBarViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Default tab bar',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'tabs markupTitle markup',

        tabs: M.TabBarView.design({

            childViews: 'tab1 tab2 tab3',

            name: 'tabBar1',

            tab1: M.TabBarItemView.design({

                value: 'Tab 1'

            }),

            tab2: M.TabBarItemView.design({

                value: 'Tab 2'

            }),

            tab3: M.TabBarItemView.design({

                value: 'Tab 3'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.TabBarView.design({\n\n\tchildViews: \'tab1 tab2 tab3\',\n\n\tname: \'tabBar1\',\n\n\ttab1: M.TabBarItemView.design({\n\n\t\tvalue: \'Tab 1\'\n\n\t}),\n\n\ttab2: M.TabBarItemView.design({\n\n\t\tvalue: \'Tab 2\'\n\n\t}),\n\n\ttab2: M.TabBarItemView.design({\n\n\t\tvalue: \'Tab 3\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_textfield_view_page_list_item_template.js');

KitchenSink.ControlsTextFieldViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsTextFieldViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsTextFieldViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.TextFieldView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsTextFieldViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsTextFieldViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_textfield_view_page.js');

KitchenSink.ControlsTextFieldViewPage1 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsTextFieldViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Default textfield',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'textfield markupTitle markup',

        textfield: M.TextFieldView.design({

            isGrouped: NO

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.TextFieldView.design({\n\n\tisGrouped: NO\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_textfield_view_page.js');

KitchenSink.ControlsTextFieldViewPage2 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsTextFieldViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Textfield with initial text',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'textfield markupTitle markup',

        textfield: M.TextFieldView.design({

            isGrouped: NO,

            initialText: 'Type something...',

            cssClassOnInit: 'initialText'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.TextFieldView.design({\n\n\tisGrouped: NO\n\n\tinitialText: \'Type something...\',\n\n\tcssClassOnInit: \'initialText\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_textfield_view_page.js');

KitchenSink.ControlsTextFieldViewPage3 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsTextFieldViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Two linked textfields',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'textfield1 textfield2 markupTitle markup',

        textfield1: M.TextFieldView.design({

            isGrouped: NO,

            contentBinding: 'KitchenSink.ControlsTextFieldViewController.textfieldvalue',

            contentBindingReverse: 'KitchenSink.ControlsTextFieldViewController.textfieldvalue'

        }),

        textfield2: M.TextFieldView.design({

            isGrouped: NO,

            contentBinding: 'KitchenSink.ControlsTextFieldViewController.textfieldvalue',

            contentBindingReverse: 'KitchenSink.ControlsTextFieldViewController.textfieldvalue'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.TextFieldView.design({\n\n\tisGrouped: NO,\n\n\tcontentBinding: \'MyApp.MyController.property\',\n\n\tcontentBindingReverse: \'MyApp.MyController.property\'\n\n})\n\nM.TextFieldView.design({\n\n\tisGrouped: NO,\n\n\tcontentBinding: \'MyApp.MyController.property\',\n\n\tcontentBindingReverse: \'MyApp.MyController.property\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_textfield_view_page.js');

KitchenSink.ControlsTextFieldViewPage4 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsTextFieldViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Custom textfield',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'textfield markupTitle markup',

        textfield: M.TextFieldView.design({

            isGrouped: NO,

            cssClass: 'customTextField'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.TextFieldView.design({\n\n\tisGrouped: NO,\n\n\tcontentBinding: \'MyApp.MyController.property\',\n\n\tcontentBindingReverse: \'MyApp.MyController.property\'\n\n})\n\nM.TextFieldView.design({\n\n\tisGrouped: NO,\n\n\tcontentBinding: \'MyApp.MyController.property\',\n\n\tcontentBindingReverse: \'MyApp.MyController.property\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toggle_view_page_list_item_template.js');

KitchenSink.ControlsToggleViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsToggleViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsToggleViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.ToggleView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsToggleViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsToggleViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toggle_view_page.js');

KitchenSink.ControlsToggleViewPage1 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsToggleViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Toggle buttons automatically',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'toggle markupTitle markup',

        toggle: M.ToggleView.design({

            childViews: 'button1 button2',

            toggleOnClick: YES,

            button1: M.ButtonView.design({

                value: 'Button 1'
                
            }),

            button2: M.ButtonView.design({

                value: 'Button 2'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ToggleView.design({\n\n\tchildViews: \'button1 button2\',\n\n\ttoggleOnClick: YES,\n\n\tbutton1: M.ButtonView.design({\n\n\t\tvalue: \'Button 1\'\n\n\t}),\n\n\tbutton2: M.ButtonView.design({\n\n\t\tvalue: \'Button 2\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toggle_view_page.js');

KitchenSink.ControlsToggleViewPage2 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsToggleViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Toggle buttons manually',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'toggle button markupTitle markup',

        toggle: M.ToggleView.design({

            childViews: 'button1 button2',

            button1: M.ButtonView.design({

                value: 'Button 1'
                
            }),

            button2: M.ButtonView.design({

                value: 'Button 2'

            })

        }),

        button: M.ButtonView.design({

            value: 'Toggle buttons',

            target: KitchenSink.ControlsToggleViewController,

            action: 'toggleButtons'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ViewManager.getView(\'MyPage\', \'toggleControl\').toggleView();',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toggle_view_page.js');

KitchenSink.ControlsToggleViewPage3 = M.PageView.design({
    
    childViews: 'header toggle content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsToggleViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Toggle complex view',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    toggle: M.ToggleView.design({

        childViews: 'content1 content2',

        content1: M.ScrollView.design({

            childViews: 'label textfield grid',

            label: M.LabelView.design({

               value: 'I am the label of the first view.'

            }),

            textfield: M.TextFieldView.design({

                isGrouped: NO,

                value: 'I am the textfield of the first view.'

            }),

            grid: M.GridView.design({

                layout: M.TWO_COLUMNS,

                childViews: 'button1 button2',

                button1: M.ButtonView.design({

                    value: 'Button 1' 

                }),

                button2: M.ButtonView.design({

                    value: 'Button 2'

                })

            })

        }),

        content2: M.ScrollView.design({

            childViews: 'label',

            label: M.LabelView.design({

               value: 'Now it\s all gone. I am all alone on the second view.'

            }) 

        })

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Toggle views',

            target: KitchenSink.ControlsToggleViewController,

            action: 'toggleViews'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ViewManager.getView(\'MyPage\', \'toggleControl\').toggleView();',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toolbar_view_page_list_item_template.js');

KitchenSink.ControlsToolbarViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsToolbarViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsToolbarViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.ToggleView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsToolbarViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsToolbarViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toolbar_view_page.js');

KitchenSink.ControlsToolbarViewPage1 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsToolbarViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Default toolbar',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'toolbar markupTitle markup',

        toolbar: M.ToolbarView.design({

            value: 'Toolbar'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ToolbarView.design({\n\n\tvalue: \'Toolbar\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toolbar_view_page.js');

KitchenSink.ControlsToolbarViewPage2 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsToolbarViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Toolbar with back button',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'toolbar markupTitle markup',

        toolbar: M.ToolbarView.design({

            childViews: 'backButton label',

            backButton: M.ButtonView.design({

                anchorLocation: M.LEFT,

                value: 'Back',

                icon: 'arrow-l'

            }),

            label: M.LabelView.design({

                anchorLocation: M.CENTER,

                value: 'Toolbar'                

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ToolbarView.design({\n\n\tchildViews: \'backButton label\',\n\n\tbackButton: M.ButtonView.design({\n\n\t\tanchorLocation: M.LEFT,\n\n\t\tvalue: \'Back\',\n\n\t\ticon: \'arrow-l\'\n\n\t}),\n\n\tlabel: M.LabelView.design({\n\n\t\tanchorLocation: M.CENTER,\n\n\t\tvalue: \'Toolbar\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toolbar_view_page.js');

KitchenSink.ControlsToolbarViewPage3 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsToolbarViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Toolbar with two buttons',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'toolbar markupTitle markup',

        toolbar: M.ToolbarView.design({

            childViews: 'backButton label rightButton',

            backButton: M.ButtonView.design({

                anchorLocation: M.LEFT,

                value: 'Back',

                icon: 'arrow-l'

            }),

            label: M.LabelView.design({

                anchorLocation: M.CENTER,

                value: 'Toolbar'                

            }),

            rightButton: M.ButtonView.design({

                anchorLocation: M.RIGHT,

                value: 'Save',

                icon: 'check'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ToolbarView.design({\n\n\tchildViews: \'backButton label\',\n\n\tbackButton: M.ButtonView.design({\n\n\t\tanchorLocation: M.LEFT,\n\n\t\tvalue: \'Back\',\n\n\t\ticon: \'arrow-l\'\n\n\t}),\n\n\tlabel: M.LabelView.design({\n\n\t\tanchorLocation: M.CENTER,\n\n\t\tvalue: \'Toolbar\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toolbar_view_page.js');

KitchenSink.ControlsToolbarViewPage4 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsToolbarViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Toolbar with button group',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'toolbar markupTitle markup',

        toolbar: M.ToolbarView.design({

            childViews: 'buttonGroup',

            cssClass: 'myToolbar2',

            buttonGroup: M.ButtonGroupView.design({

                anchorLocation: M.CENTER,

                childViews: 'button1 button2 button3',

                button1: M.ButtonView.design({

                    value: 'Button 1'

                }),

                button2: M.ButtonView.design({

                    value: 'Button 2'

                }),

                button3: M.ButtonView.design({

                    value: 'Button 3'

                })

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ToolbarView.design({\n\n\tchildViews: \'buttonGroup\',\n\n\tcssClass: \'myToolbar2\',\n\n\tbuttonGroup: M.ButtonGroupView.design({\n\n\t\tanchorLocation: M.CENTER,\n\n\t\tchildViews: \'button1 button2 button3\',\n\n\t\tbutton1: M.ButtonView.design({\n\n\t\t\tvalue: \'Button 1\'\n\n\t\t}),\n\n\t\tbutton2: M.ButtonView.design({\n\n\t\t\tvalue: \'Button 2\'\n\n\t\t}),\n\n\t\tbutton3: M.ButtonView.design({\n\n\t\t\tvalue: \'Button 3\'\n\n\t\t})\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toolbar_view_page.js');

KitchenSink.ControlsToolbarViewPage5 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsToolbarViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Toolbar with two buttons',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'toolbar markupTitle markup',

        toolbar: M.ToolbarView.design({

            childViews: 'image grid',

            cssClass: 'myToolbar',

            image: M.ImageView.design({

                anchorLocation: M.LEFT,

                value: 'theme/images/square_cyan.png'

            }),

            grid: M.GridView.design({

                anchorLocation: M.CENTER,

                layout: M.TWO_COLUMNS,

                childViews: 'button label',

                button: M.ButtonView.design({

                    value: 'Button'

                }),

                label: M.LabelView.design({

                    value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr...',

                    cssClass: 'toolbarText'

                })

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ToolbarView.design({\n\n\tchildViews: \'image grid\',\n\n\tcssClass: \'myToolbar\',\n\n\timage: M.ImageView.design({\n\n\t\tanchorLocation: M.LEFT,\n\n\t\tvalue: \'theme/images/square_cyan.png\'\n\n\t}),\n\n\tgrid: M.GridView.design({\n\n\t\tanchorLocation: M.CENTER,\n\n\t\tlayout: M.TWO_COLUMNS,\n\n\t\tchildViews: \'button label\',\n\n\t\tbutton: M.ButtonView.design({\n\n\t\t\tvalue: \'Button\'\n\n\t\t}),\n\n\t\tlabel: M.LabelView.design({\n\n\t\t\tvalue: \'Lorem ipsum dolor sit amet, consetetur sadipscing elitr...\',\n\n\t\t\tcssClass: \'toolbarText\'\n\n\t\t})\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');

KitchenSink.PageCore = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Core',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        // ...

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/data_page_list_item_template.js');

KitchenSink.PageData = M.PageView.design({

    onLoad : {
        target: KitchenSink.DataController,
        action: 'init'
    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Data',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'dataList',

        dataList: M.ListView.design({
            listItemTemplateView: KitchenSink.DataPageListItemTemplate,
            contentBinding: 'KitchenSink.DataController.dataList'
        })
    }),

    tabBar: KitchenSink.TabBar

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      12.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('app/views/tabs.js');
m_require('app/views/data_page.js');

KitchenSink.DataRequestSamplePage = M.PageView.design({
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({
            value: 'Back',
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            target: KitchenSink.DataController,
            action: 'here'
        }),

        title: M.LabelView.design({
            value: "M.Request: Send GET Request",
            anchorLocation: M.CENTER
        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({
        childViews: 'keywordField requestButton markupTitle markup',

        keywordField: M.TextFieldView.design({
            name: 'keyword_field',
            initialText: 'Enter keyword for twitter search...',
            target: KitchenSink.DataRequestSampleController,
            action: 'getRequest',
            triggerActionOnEnter: YES,
            cssClassOnInit: 'initialText'
        }),

        requestButton: M.ButtonView.design({
            value: 'Send Request',
            target: KitchenSink.DataRequestSampleController,
            action: 'getRequest'
        }),

        markupTitle: M.LabelView.design({
            value: 'The latest tweets',
            contentBinding: 'KitchenSink.DataRequestSampleController.titleValue',
            cssClass: 'titleSource'
        }),

        markup: M.LabelView.design({
            value: '-',
            contentBinding: 'KitchenSink.DataRequestSampleController.markupValue',
            cssClass: 'source'
        })

    }),

    tabBar: KitchenSink.TabBar
});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('app/views/tabs.js');
m_require('app/views/data_page.js');
m_require('app/views/data_local_storage_task_app_template.js');

KitchenSink.DataWebSqlTaskAppPage = M.PageView.design({

    onLoad : {
        target: KitchenSink.DataWebSqlTaskAppController,
        action: 'init'
    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton centerLabel toggleView',

        centerLabel: M.LabelView.design({
            value: 'WebSQL ToDo App Example',
            anchorLocation: M.CENTER
        }),

        toggleView: M.ToggleView.design({
            childViews: 'button1 button2',
            anchorLocation: M.RIGHT,
            toggleOnClick: YES,

            button1: M.ButtonView.design({
                value: 'Edit',
                target: KitchenSink.DataWebSqlTaskAppController,
                action: 'edit',
                icon: 'gear'
            }),

            button2: M.ButtonView.design({
                value: 'Save',
                target: KitchenSink.DataWebSqlTaskAppController,
                action: 'edit',
                icon: 'check'
            })
        }),

        backButton: M.ButtonView.design({
            value: 'Back',
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            target: KitchenSink.DataController,
            action: 'here'
        }),

        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({

        childViews: 'form taskList',

        form: M.FormView.design({

            childViews: 'taskField',

            showAlertDialogOnError: YES,

            alertTitle: 'No text entered.',

            taskField: M.TextFieldView.design({
                name: 'todo_field',
                initialText: 'Enter Task...',
                validators: [M.PresenceValidator.customize({
                    msg: 'Please enter a text describing your task!'
                })],
                target: KitchenSink.DataWebSqlTaskAppController,
                action: 'addTask',
                triggerActionOnEnter: YES
            })
        }),

        taskList: M.ListView.design({
            listItemTemplateView: KitchenSink.DataWebSqlTaskAppTemplate,
            contentBinding: 'KitchenSink.DataWebSqlTaskAppController.tasks'
        })
    }),

    tabBar: KitchenSink.TabBar
});
m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_group_view_page_list_item_template.js');

KitchenSink.ControlsButtonGroupViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsButtonGroupViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.ButtonGroupView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsButtonGroupViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsButtonGroupViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_group_view_page.js');

KitchenSink.ControlsButtonGroupViewPage1 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonGroupViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Default button group',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'buttonGroup markupTitle markup',

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'button1 button2',

            button1: M.ButtonView.design({

                value: 'Button 1'

            }),

            button2: M.ButtonView.design({

                value: 'Button 2'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ButtonGroupView.design({\n\n\tchildViews: \'button1 button2\',\n\n\tbutton1: M.ButtonView.design({\n\n\t\tvalue: \'Button 1\'\n\n\t}),\n\n\tbutton2: M.ButtonView.design({\n\n\t\tvalue: \'Button 2\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_group_view_page.js');

KitchenSink.ControlsButtonGroupViewPage2 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonGroupViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Vertical button group',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'buttonGroup markupTitle markup',

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'button1 button2',

            direction: M.VERTICAL,

            button1: M.ButtonView.design({

                value: 'Button 1'

            }),

            button2: M.ButtonView.design({

                value: 'Button 2'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ButtonGroupView.design({\n\n\tchildViews: \'button1 button2\',\n\n\tdirection: M.VERTICAL,\n\n\tbutton1: M.ButtonView.design({\n\n\t\tvalue: \'Button 1\'\n\n\t}),\n\n\tbutton2: M.ButtonView.design({\n\n\t\tvalue: \'Button 2\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_group_view_page.js');

KitchenSink.ControlsButtonGroupViewPage3 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonGroupViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Multi button group',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'buttonGroup markupTitle markup',

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'button1 button2 button3 button4',

            numberOfLines: 2,

            buttonsPerLine: 2,

            button1: M.ButtonView.design({

                value: 'Button 1'

            }),

            button2: M.ButtonView.design({

                value: 'Button 2'

            }),

            button3: M.ButtonView.design({

                value: 'Button 3'

            }),

            button4: M.ButtonView.design({

                value: 'Button 4'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'M.ButtonGroupView.design({\n\n\tchildViews: \'button1 button2 button3 button4\',\n\n\tnumberOfLines: 2,\n\n\tbuttonsPerLine: 2,\n\n\tbutton1: M.ButtonView.design({\n\n\t\tvalue: \'Button 1\'\n\n\t}),\n\n\tbutton2: M.ButtonView.design({\n\n\t\tvalue: \'Button 2\'\n\n\t})\n\n\tbutton3: M.ButtonView.design({\n\n\t\tvalue: \'Button 3\'\n\n\t})\n\n\tbutton4: M.ButtonView.design({\n\n\t\tvalue: \'Button 4\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_group_view_page.js');

KitchenSink.ControlsButtonGroupViewPage4 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonGroupViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Multi button gr. (not inset)',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'buttonGroup markupTitle markup',

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'button1 button2 button3 button4',

            isInset: NO,

            numberOfLines: 2,

            buttonsPerLine: 2,

            button1: M.ButtonView.design({

                value: 'Button 1'

            }),

            button2: M.ButtonView.design({

                value: 'Button 2'

            }),

            button3: M.ButtonView.design({

                value: 'Button 3'

            }),

            button4: M.ButtonView.design({

                value: 'Button 4'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'M.ButtonGroupView.design({\n\n\tchildViews: \'button1 button2 button3 button4\',\n\n\tisInset: NO,\n\n\tnumberOfLines: 2,\n\n\tbuttonsPerLine: 2,\n\n\tbutton1: M.ButtonView.design({\n\n\t\tvalue: \'Button 1\'\n\n\t}),\n\n\tbutton2: M.ButtonView.design({\n\n\t\tvalue: \'Button 2\'\n\n\t})\n\n\tbutton3: M.ButtonView.design({\n\n\t\tvalue: \'Button 3\'\n\n\t})\n\n\tbutton4: M.ButtonView.design({\n\n\t\tvalue: \'Button 4\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_group_view_page.js');

KitchenSink.ControlsButtonGroupViewPage5 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonGroupViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Multi button gr. (not compact)',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'buttonGroup markupTitle markup',

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'button1 button2 button3 button4',

            numberOfLines: 2,

            buttonsPerLine: 2,

            isCompact: NO,

            button1: M.ButtonView.design({

                value: 'Button 1'

            }),

            button2: M.ButtonView.design({

                value: 'Button 2'

            }),

            button3: M.ButtonView.design({

                value: 'Button 3'

            }),

            button4: M.ButtonView.design({

                value: 'Button 4'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'M.ButtonGroupView.design({\n\n\tchildViews: \'button1 button2 button3 button4\',\n\n\tnumberOfLines: 2,\n\n\tbuttonsPerLine: 2,\n\n\tisCompact: NO,\n\n\tbutton1: M.ButtonView.design({\n\n\t\tvalue: \'Button 1\'\n\n\t}),\n\n\tbutton2: M.ButtonView.design({\n\n\t\tvalue: \'Button 2\'\n\n\t})\n\n\tbutton3: M.ButtonView.design({\n\n\t\tvalue: \'Button 3\'\n\n\t})\n\n\tbutton4: M.ButtonView.design({\n\n\t\tvalue: \'Button 4\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_group_view_page.js');

KitchenSink.ControlsButtonGroupViewPage6 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonGroupViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'getActiveButton()',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'buttonGroup getButton activeButtonLabel activeButtonName',

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'button1 button2',

            button1: M.ButtonView.design({

                value: 'Button 1'

            }),

            button2: M.ButtonView.design({

                value: 'Button 2'

            })

        }),

        getButton: M.ButtonView.design({

            value: 'get active button',

            target: KitchenSink.ControlsButtonGroupViewController,

            action: 'getActiveButton'
            
        }),

        activeButtonLabel: M.LabelView.design({

            value: 'Active Button: ',

            cssClass: 'titleSource'
            
        }),

        activeButtonName: M.LabelView.design({

            value: '-',

            contentBinding: 'KitchenSink.ControlsButtonGroupViewController.activeButton',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_group_view_page.js');

KitchenSink.ControlsButtonGroupViewPage7 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonGroupViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'setActiveButton()',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'buttonGroup setButton',

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'button1 button2',

            button1: M.ButtonView.design({

                value: 'Button 1'

            }),

            button2: M.ButtonView.design({

                value: 'Button 2'

            })

        }),

        setButton: M.ButtonView.design({

            value: 'set active button (Button 1)',

            target: KitchenSink.ControlsButtonGroupViewController,

            action: 'setActiveButton'
            
        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_view_page_list_item_template.js');

KitchenSink.ControlsButtonViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsButtonViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.ButtonView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsButtonViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsButtonViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_view_page.js');

KitchenSink.ControlsButtonViewPage1 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Default button',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Button'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ButtonView.design({\n\n\tvalue: \'Button\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_view_page.js');

KitchenSink.ControlsButtonViewPage2 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Default button',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Button',

            icon: 'grid'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ButtonView.design({\n\n\tvalue: \'Button\'\n\n\ticon: \'grid\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_view_page.js');

KitchenSink.ControlsButtonViewPage3 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: '"Icon only" button',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Button',

            icon: 'grid',

            isIconOnly: YES

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ButtonView.design({\n\n\tvalue: \'Button\'\n\n\ticon: \'grid\'\n\n\tisIconOnly: YES\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_view_page.js');

KitchenSink.ControlsButtonViewPage4 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Inline button',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Button',

            isInline: YES

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ButtonView.design({\n\n\tvalue: \'Button\'\n\n\tisInline: YES\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_view_page.js');

KitchenSink.ControlsButtonViewPage5 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Inline button with icon',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Button',

            icon: 'grid',

            isInline: YES

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ButtonView.design({\n\n\tvalue: \'Button\'\n\n\ticon: \'grid\'\n\n\tisInline: YES\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_view_page.js');

KitchenSink.ControlsButtonViewPage6 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Custom styled button',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Button',

            cssClass: 'customButton'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ButtonView.design({\n\n\tvalue: \'Button\'\n\n\tcssClass: \'customButton\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_dialog_view_page_list_item_template.js');

KitchenSink.ControlsDialogViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsDialogViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsDialogViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.DialogView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsDialogViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsDialogViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_dialog_view_page.js');

KitchenSink.ControlsDialogViewPage1 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsDialogViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Alert dialog',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Open alert dialog',

            target: KitchenSink.ControlsDialogViewController,

            action: 'openAlert'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.DialogView.alert({\n\n\ttitle: \'Alert dialog\',\n\n\tmessage: \'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_dialog_view_page.js');

KitchenSink.ControlsDialogViewPage2 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsDialogViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Confirm dialog',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Open confirm dialog',

            target: KitchenSink.ControlsDialogViewController,

            action: 'openConfirm'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.DialogView.confirm({\n\n\ttitle: \'Confirm dialog\',\n\n\tmessage: \'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_dialog_view_page.js');

KitchenSink.ControlsDialogViewPage3 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsDialogViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Actionsheet dialog (default)',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Open actionsheet dialog',

            target: KitchenSink.ControlsDialogViewController,

            action: 'openActionsheet'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.DialogView.confirm({\n\n\ttitle: \'Confirm dialog\',\n\n\tmessage: \'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_dialog_view_page.js');

KitchenSink.ControlsDialogViewPage4 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsDialogViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Actionsheet dialog',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Open actionsheet dialog',

            target: KitchenSink.ControlsDialogViewController,

            action: 'openActionsheet2'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.DialogView.actionSheet({\n\n\ttitle: \'Actionsheet dialog 2\',\n\n\tmessage: \'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\',\n\n\tbuttons: {\n\n\t\tbutton1: {\n\n\t\t\ttitle: \'Button 1\'\n\n\t\t},\n\n\t\tbutton2: {\n\n\t\t\ttitle: \'Button 2\'\n\n\t\t},\n\n\t\tbutton3: {\n\n\t\t\ttitle: \'Button 2\'\n\n\t\t}\n\n\t}\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_dialog_view_page.js');

KitchenSink.ControlsDialogViewPage5 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsDialogViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Working with callbacks',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Open actionsheet dialog',

            target: KitchenSink.ControlsDialogViewController,

            action: 'openActionsheet3'

        }),

        markupTitle: M.LabelView.design({

            value: 'Button clicked',
            
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: '-',

            contentBinding: 'KitchenSink.ControlsDialogViewController.callback',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_grid_view_page_list_item_template.js');

KitchenSink.ControlsGridViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsGridViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsGridViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.GridView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsGridViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsGridViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_grid_view_page.js');

KitchenSink.ControlsGridViewPage1 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsGridViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Two columns grid',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'grid markupTitle markup',

        grid: M.GridView.design({

            childViews: 'label1 label2',

            layout: M.TWO_COLUMNS,

            label1: M.LabelView.design({

                value: 'Column 1'

            }),

            label2: M.LabelView.design({

                value: 'Column 2'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.GridView.design({\n\n\tchildViews: \'label1 label2\',\n\n\tlayout: M.TWO_COLUMNS,\n\n\tlabel1: M.LabelView.design({\n\n\t\tvalue: \'Column 1\'\n\n\t}),\n\n\tlabel2: M.LabelView.design({\n\n\t\tvalue: \'Column 2\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_grid_view_page.js');

KitchenSink.ControlsGridViewPage2 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsGridViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Three columns grid',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'grid markupTitle markup',

        grid: M.GridView.design({

            childViews: 'label1 label2 label3',

            layout: M.THREE_COLUMNS,

            label1: M.LabelView.design({

                value: 'Column 1'

            }),

            label2: M.LabelView.design({

                value: 'Column 2'

            }),

            label3: M.LabelView.design({

                value: 'Column 3'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.GridView.design({\n\n\tchildViews: \'label1 label2 label3\',\n\n\tlayout: M.THREE_COLUMNS,\n\n\tlabel1: M.LabelView.design({\n\n\t\tvalue: \'Column 1\'\n\n\t}),\n\n\tlabel2: M.LabelView.design({\n\n\t\tvalue: \'Column 2\'\n\n\t}),\n\n\tlabel3: M.LabelView.design({\n\n\t\tvalue: \'Column 3\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_grid_view_page.js');

KitchenSink.ControlsGridViewPage3 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsGridViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Custom grid',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'grid markupTitle markup',

        grid: M.GridView.design({

            childViews: 'label1 label2 label3',

            layout: {
                cssClass: 'container',
                columns: {
                    0: 'column1',
                    1: 'column2',
                    2: 'column3'
                }
            },

            label1: M.LabelView.design({

                value: 'Red'

            }),

            label2: M.LabelView.design({

                value: 'Green'

            }),

            label3: M.LabelView.design({

                value: 'Blue'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'M.GridView.design({\n\n\tchildViews: \'label1 label2 label3\',\n\n\tlayout: {\n\n\t\tcssClass: \'container\',\n\n\t\tcolumns: {\n\n\t\t\t0: \'column1\',\n\n\t\t\t1: \'column2\',\n\n\t\t\t2: \'column3\'\n\n\t\t}\n\n\t},\n\n\tlabel1: M.LabelView.design({\n\n\t\tvalue: \'Red\'\n\n\t}),\n\n\tlabel2: M.LabelView.design({\n\n\t\tvalue: \'Green\'\n\n\t}),\n\n\tlabel3: M.LabelView.design({\n\n\t\tvalue: \'Blue\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_grid_view_page_list_item_template.js');

KitchenSink.ControlsImageViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsImageViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsImageViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.ImageView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsImageViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsImageViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_image_view_page.js');

KitchenSink.ControlsImageViewPage1 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsImageViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Default image',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'image markupTitle markup',

        image: M.ImageView.design({

            value: 'theme/images/mway_logo_sm.png'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ImageView.design({\n\n\tvalue: \'theme/images/mway_logo_sm.png\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_image_view_page.js');

KitchenSink.ControlsImageViewPage2 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsImageViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Image with CSS styling',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'image markupTitle markup',

        image: M.ImageView.design({

            value: 'theme/images/mway_logo_sm.png',

            cssClass: 'myImage'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ImageView.design({\n\n\tvalue: \'theme/images/mway_logo_sm.png\',\n\n\tcssClass: \'myImage\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_label_view_page_list_item_template.js');

KitchenSink.ControlsLabelViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsLabelViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsLabelViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.LabelView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsLabelViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsLabelViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_label_view_page.js');

KitchenSink.ControlsLabelViewPage1 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsLabelViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Default label',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'label markupTitle markup',

        label: M.LabelView.design({

            value: 'Label'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.LabelView.design({\n\n\tvalue: \'Label\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_label_view_page.js');

KitchenSink.ControlsLabelViewPage2 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsLabelViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Label with computed value',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'label markupTitle markup',

        label: M.LabelView.design({

            computedValue: {

                value: 'label',

                operation: function(v) {

                    return v.toUpperCase()

                }
            }

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.LabelView.design({\n\n\tcomputedValue: {\n\n\t\tvalue: \'label\',\n\n\t\toperation: function(v) {\n\n\t\t\treturn v.toUpperCase()\n\n\t\t}\n\n\t}\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_label_view_page.js');

KitchenSink.ControlsLabelViewPage3 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsLabelViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Hyperlink label (internal)',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'label markupTitle markup',

        label: M.LabelView.design({

            value: 'Click to open an alert dialog.',

            target: KitchenSink.ControlsLabelViewController,

            action: 'hyperlink1'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.LabelView.design({\n\n\tvalue: \'Click to open alert\',\n\n\ttarget: MyApp.MyController,\n\n\taction: \'myAction\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_label_view_page.js');

KitchenSink.ControlsLabelViewPage4 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsLabelViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Hyperlink label (external)',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'label markupTitle markup',

        label: M.LabelView.design({

            value: 'Click to open google.com.',

            hyperlinkType: M.HYPERLINK_WEBSITE,

            hyperlinkTarget: 'http://www.google.com'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.LabelView.design({\n\n\tvalue: \'Click to open google.com.\',\n\n\thyperlinkType: M.HYPERLINK_WEBSITE,\n\n\thyperlinkTarget: \'http://www.google.com\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_label_view_page.js');

KitchenSink.ControlsLabelViewPage5 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsLabelViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Inline labels',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'label1 label2 markupTitle markup',

        label1: M.LabelView.design({

            value: 'We are both ',

            isInline: YES

        }),

        label2: M.LabelView.design({

            value: 'inline labels.',

            isInline: YES

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.LabelView.design({\n\n\tvalue: \'We are both \',\n\n\tisInline: YES\n\n})\n\nM.LabelView.design({\n\n\tvalue: \'inline labels.\',\n\n\tisInline: YES\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_label_view_page.js');

KitchenSink.ControlsLabelViewPage6 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsLabelViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Inline labels & comp. values',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'label1 label2 markupTitle markup',

        label1: M.LabelView.design({

            value: 'The current time is ',

            isInline: YES

        }),

        label2: M.LabelView.design({

            computedValue: {

                operation: function() {

                    var d = M.Date.now();
                    return d.format('HH:MM') + '.';

                }

            },

            isInline: YES

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.LabelView.design({\n\n\tvalue: \'The current time is \',\n\n\tisInline: YES\n\n})\n\nM.LabelView.design({\n\n\tcomputedValue: {\n\n\t\toperation: function() {\n\n\t\t\tvar d = M.Date.now();\n\n\t\t\treturn d.format(\'HH:MM\');\n\n\t\t}\n\n\t},\n\n\tisInline: YES\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_list_view_page_list_item_template.js');

KitchenSink.ControlsListViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsListViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsListViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.ListView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsListViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsListViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_list_view_page.js');
m_require('app/views/controls_list_view_page1_template.js');

KitchenSink.ControlsListViewPage1 = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsListViewController,

        action: 'initPage1'

    },
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsListViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Default list',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'list markupTitle markup',

        list: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsListViewPage1Template,

            contentBinding: 'KitchenSink.ControlsListViewController.page1'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'M.ListView.design({\n\n\tlistItemTemplateView: MyApp.MyListTemplate,\n\n\tcontentBinding: \'MyApp.MyController.property\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_list_view_page.js');
m_require('app/views/controls_list_view_page2_template.js');

KitchenSink.ControlsListViewPage2 = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsListViewController,

        action: 'initPage2'

    },
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsListViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Segmented list',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'list markupTitle markup',

        list: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsListViewPage2Template,

            contentBinding: 'KitchenSink.ControlsListViewController.page2',

            isDividedList: YES

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'M.ListView.design({\n\n\tlistItemTemplateView: MyApp.MyListTemplate,\n\n\tcontentBinding: \'MyApp.MyController.property\',\n\n\tisDividedList: YES\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_list_view_page.js');
m_require('app/views/controls_list_view_page3_template.js');

KitchenSink.ControlsListViewPage3 = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsListViewController,

        action: 'initPage3'

    },
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsListViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Complex list',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'list markupTitle markup',

        list: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsListViewPage3Template,

            contentBinding: 'KitchenSink.ControlsListViewController.page3'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode (list item template)',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'MyApp.MyListTemplate = M.ListItemView.design({\n\n\tchildViews: \'image name subtitle\',\n\n\timage: M.ImageView.design({\n\n\t\tcomputedValue: {\n\n\t\t\tvaluePattern: \'<%= image %>\',\n\n\t\t\toperation: function(v) {\n\n\t\t\t\treturn \'theme/images/\' + v;\n\n\t\t\t}\n\n\t\t},\n\n\t\tcssClass: \'listPage3Image\'\n\n\t}),\n\n\tname: M.LabelView.design({\n\n\t\tvaluePattern: \'<%= name %>\'\n\n\t}),\n\n\tsubtitle: M.LabelView.design({\n\n\t\tvaluePattern: \'<%= subtitle %>\',\n\n\t\tcssClass: \'listPage3Subtitle\'\n\n\t})\n\n});',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_list_view_page.js');
m_require('app/views/controls_list_view_page4_template.js');

KitchenSink.ControlsListViewPage4 = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsListViewController,

        action: 'initPage4'

    },
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsListViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Counted list',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'list markupTitle markup',

        list: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsListViewPage4Template,

            contentBinding: 'KitchenSink.ControlsListViewController.page4',

            isCountedList: YES

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode (list item template)',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'MyApp.MyListTemplate = M.ListItemView.design({\n\n\tchildViews: \'name counter\',\n\n\tname: M.LabelView.design({\n\n\t\tvaluePattern: \'<%= name %>\'\n\n\t}),\n\n\tcounter: M.LabelView.design({\n\n\t\tvaluePattern: \'<%= number %>\',\n\n\t\tcssClass: \'ui-li-count\'\n\n\t})\n\n});',            

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_list_view_page.js');
m_require('app/views/controls_list_view_page5_template.js');

KitchenSink.ControlsListViewPage5 = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsListViewController,

        action: 'initPage5'

    },
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsListViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Default searchbar list',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'list markupTitle markup',

        list: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsListViewPage5Template,

            contentBinding: 'KitchenSink.ControlsListViewController.page5',

            hasSearchBar: YES

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode (list item template)',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'M.ListView.design({\n\n\tlistItemTemplateView: MyApp.MyListTemplate,\n\n\tcontentBinding: \'MyApp.MyController.property\',\n\n\thasSearchBar: YES\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_list_view_page.js');
m_require('app/views/controls_list_view_page6_template.js');

KitchenSink.ControlsListViewPage6 = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsListViewController,

        action: 'initPage6'

    },
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsListViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Custom searchbar list',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'list markupTitle markup',

        list: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsListViewPage6Template,

            contentBinding: 'KitchenSink.ControlsListViewController.page6',

            hasSearchBar: YES,

            usesDefaultSearchBehaviour: NO,

            searchBar: {

                target: KitchenSink.ControlsListViewController,

                action: 'searchStringDidChange',

                triggerActionOnChange: YES,

                triggerActionOnKeyUp: YES

            }

        }),

        markupTitle: M.LabelView.design({

            value: 'Searchstring',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: '-',

            contentBinding: 'KitchenSink.ControlsListViewController.searchString',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_loader_view_page_list_item_template.js');

KitchenSink.ControlsLoaderViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsLoaderViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsLoaderViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.LoaderView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsLoaderViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsLoaderViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_loader_view_page.js');

KitchenSink.ControlsLoaderViewPage1 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsLoaderViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Default loader',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'grid markupTitle markup',

        grid: M.GridView.design({

            childViews: 'buttonOn buttonOff',

            layout: M.TWO_COLUMNS,

            buttonOn: M.ButtonView.design({

                value: 'Show',

                target: KitchenSink.ControlsLoaderViewController,

                action: 'showLoader'

            }),

            buttonOff: M.ButtonView.design({

                value: 'Hide',

                target: KitchenSink.ControlsLoaderViewController,

                action: 'hideLoader'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'M.LoaderView.show();\n\nM.LoaderView.hide();',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('app/views/tabs.js');
m_require('app/views/data_page.js');
m_require('app/views/data_local_storage_task_app_template.js');

KitchenSink.DataLocalStorageTaskAppPage = M.PageView.design({

    onLoad : {
        target: KitchenSink.DataLocalStorageTaskAppController,
        action: 'init'
    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton centerLabel toggleView',

        centerLabel: M.LabelView.design({
            value: 'LocalStorage ToDo App Example',
            anchorLocation: M.CENTER
        }),

        toggleView: M.ToggleView.design({
            childViews: 'button1 button2',
            anchorLocation: M.RIGHT,
            toggleOnClick: YES,

            button1: M.ButtonView.design({
                value: 'Edit',
                target: KitchenSink.DataLocalStorageTaskAppController,
                action: 'edit',
                icon: 'gear'
            }),

            button2: M.ButtonView.design({
                value: 'Save',
                target: KitchenSink.DataLocalStorageTaskAppController,
                action: 'edit',
                icon: 'check'
            })
        }),

        backButton: M.ButtonView.design({
            value: 'Back',
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            target: KitchenSink.DataController,
            action: 'here'
        }),

        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({

        childViews: 'form taskList',

        form: M.FormView.design({
            childViews: 'taskField',

            showAlertDialogOnError: YES,
            alertTitle: 'No text entered.',
            taskField: M.TextFieldView.design({
                name: 'todo_field',
                initialText: 'Enter Task...',
                validators: [M.PresenceValidator.customize({
                    msg: 'Please enter a text describing your task!'
                })],
                target: KitchenSink.DataLocalStorageTaskAppController,
                action: 'addTask',
                triggerActionOnEnter: YES
            })
        }),

        taskList: M.ListView.design({
            listItemTemplateView: KitchenSink.DataLocalStorageTaskAppTemplate,
            contentBinding: 'KitchenSink.DataLocalStorageTaskAppController.tasks'
        })
    }),

    tabBar: KitchenSink.TabBar
});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.UtilitiesDateListItemTemplate = M.ListItemView.design({
    childViews: 'name',

    target: KitchenSink.UtilitiesDateController,
    action: 'dateSelected',

    name: M.LabelView.design({
        valuePattern: '<%= name %>'
    })
});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.UtilitiesI18nListItemTemplate = M.ListItemView.design({
    childViews: 'name',

    target: KitchenSink.UtilitiesI18nController,
    action: 'i18nSelected',

    name: M.LabelView.design({
        valuePattern: '<%= name %>'
    })
});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      14.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.UtilitiesPageListItemTemplate = M.ListItemView.design({
    childViews: 'name',

    target: KitchenSink.UtilitiesController,
    action: 'utilitySelected',

    name: M.LabelView.design({
        valuePattern: '<%= name %>'
    })
});m_require('app/views/tabs.js');
m_require('app/views/utilities_page_list_item_template.js');

KitchenSink.PageUtilities = M.PageView.design({

    onLoad : {
        target: KitchenSink.UtilitiesController,
        action: 'init'
    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Utilities',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'utilList',

        utilList: M.ListView.design({
            listItemTemplateView: KitchenSink.UtilitiesPageListItemTemplate,
            contentBinding: 'KitchenSink.UtilitiesController.utilitiesList'
        })

    }),

    tabBar: KitchenSink.TabBar

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      14.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('app/views/tabs.js');
m_require('app/views/utilities_page.js');
m_require('app/views/utilities_date_list_item_template.js');

KitchenSink.UtilitiesDatePage = M.PageView.design({

    onLoad : {
        target: KitchenSink.UtilitiesDateController,
        action: 'init'
    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({
        childViews: 'backButton title',

        backButton: M.ButtonView.design({
            value: 'Back',
            icon: 'arrow-l',
            anchorLocation: M.LEFT,

            target: KitchenSink.UtilitiesController,
            action: 'here'  
        }),

        title: M.LabelView.design({
            value: 'M.Date',
            anchorLocation: M.CENTER
        }),

        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'dateList',

        dateList: M.ListView.design({
            listItemTemplateView: KitchenSink.UtilitiesDateListItemTemplate,
            contentBinding: 'KitchenSink.UtilitiesDateController.dateList'
        })
    }),

    tabBar: KitchenSink.TabBar

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      14.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('app/views/tabs.js');
m_require('app/views/utilities_page.js');
m_require('app/views/utilities_i18n_list_item_template.js');

KitchenSink.UtilitiesI18nPage = M.PageView.design({

    onLoad : {
        target: KitchenSink.UtilitiesI18nController,
        action: 'init'
    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({
        childViews: 'backButton title',

        backButton: M.ButtonView.design({
            value: 'Back',
            icon: 'arrow-l',
            anchorLocation: M.LEFT,

            target: KitchenSink.UtilitiesController,
            action: 'here'  
        }),

        title: M.LabelView.design({
            value: 'M.I18n: Internationalization',
            anchorLocation: M.CENTER
        }),

        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'i18nList',

        i18nList: M.ListView.design({
            listItemTemplateView: KitchenSink.UtilitiesI18nListItemTemplate,
            contentBinding: 'KitchenSink.UtilitiesI18nController.i18nList'
        })
    }),

    tabBar: KitchenSink.TabBar

});m_require('app/views/tabs.js');
m_require('app/views/utilities_page.js');
m_require('app/views/utilities_date_page.js');

KitchenSink.UtilitiesDate1 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({
        childViews: 'backButton title',

        backButton: M.ButtonView.design({
            value: 'Back',
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            target: KitchenSink.UtilitiesDateController,
            action: 'here'
        }),

        title: M.LabelView.design({
            value: 'Get the current date',
            anchorLocation: M.CENTER
        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({
        childViews: 'label markupTitle markup',

        label: M.LabelView.design({

            computedValue: {

                value: 'The current date is ',

                operation: function(v) {

                    return v + M.Date.now().format('mm/dd/yyyy HH:MM:ss');

                }

            }

        }),

        markupTitle: M.LabelView.design({
            value: 'Sourcecode',
            cssClass: 'titleSource'
        }),

        markup: M.LabelView.design({
            value: 'M.LabelView.design({\n\n\tcomputedValue: {\n\n\t\tvalue: \'The current date is \',\n\n\t\toperation: function(v) {\n\n\t\t\treturn v + M.Date.now().format(\'mm/dd/yyyy HH:MM:ss\');\n\n\t\t}\n\n\t}\n\n})',
            cssClass: 'source'
        })

    }),

    tabBar: KitchenSink.TabBar
});m_require('app/views/tabs.js');
m_require('app/views/utilities_page.js');
m_require('app/views/utilities_date_page.js');

KitchenSink.UtilitiesDate2 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({
        childViews: 'backButton title',

        backButton: M.ButtonView.design({
            value: 'Back',
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            target: KitchenSink.UtilitiesDateController,
            action: 'here'
        }),

        title: M.LabelView.design({
            value: 'Format a date',
            anchorLocation: M.CENTER
        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({
        childViews: 'textfield button markupTitle markup',

        textfield: M.TextFieldView.design({

            value: 'mm/dd/yyyy HH:MM:ss',

            isGrouped: NO

        }),

        button: M.ButtonView.design({

            value: 'Format date',

            target: KitchenSink.UtilitiesDateController,

            action: 'formatDate1'

        }),

        markupTitle: M.LabelView.design({
            value: 'The current date',
            cssClass: 'titleSource'
        }),

        markup: M.LabelView.design({
            computedValue: {

                value: '',

                contentBinding: 'KitchenSink.UtilitiesDateController.date1',

                operation: function(v) {

                    if(!v || v === '' || v === null) {
                        v = M.Date.now().format('mm/dd/yyyy HH:MM:ss')
                    }

                    return v;

                }

            },
            cssClass: 'source'
        })

    }),

    tabBar: KitchenSink.TabBar
});m_require('app/views/tabs.js');
m_require('app/views/utilities_page.js');
m_require('app/views/utilities_i18n_page.js');

KitchenSink.UtilitiesI18n1 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({
        childViews: 'backButton title',

        backButton: M.ButtonView.design({
            value: 'Back',
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            target: KitchenSink.UtilitiesI18nController,
            action: 'here'
        }),

        title: M.LabelView.design({
            value: 'Localizing a label',
            anchorLocation: M.CENTER
        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({
        childViews: 'label markupTitle markup',

        label: M.LabelView.design({

            value: M.I18N.l('welcome')

        }),

        markupTitle: M.LabelView.design({
            value: 'Sourcecode',
            cssClass: 'titleSource'
        }),

        markup: M.LabelView.design({
            value: 'M.LabelView.design({\n\n\tvalue: M.I18N.l(\'welcome\')\n\n})',
            cssClass: 'source'
        })

    }),

    tabBar: KitchenSink.TabBar
});m_require('app/views/tabs.js');
m_require('app/views/utilities_page.js');
m_require('app/views/utilities_i18n_page.js');

KitchenSink.UtilitiesI18n2 = M.PageView.design({

    onLoad : {
        target: KitchenSink.UtilitiesI18nController,
        action: 'getLanguage'
    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({
        childViews: 'backButton title',

        backButton: M.ButtonView.design({
            value: 'Back',
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            target: KitchenSink.UtilitiesI18nController,
            action: 'here'
        }),

        title: M.LabelView.design({
            value: 'Get the navigator\'s language',
            anchorLocation: M.CENTER
        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({
        childViews: 'label1 label2 markupTitle markup',

        label1: M.LabelView.design({

            value: 'The navigator\'s language is ',

            isInline: YES

        }),

        label2: M.LabelView.design({

            value: '',

            computedValue: {

                contentBinding: 'KitchenSink.UtilitiesI18nController.language',

                operation: function(v) {

                    return '\'' + v + '\''

                }
            },

            isInline: YES

        }),

        markupTitle: M.LabelView.design({
            value: 'Sourcecode',
            cssClass: 'titleSource'
        }),

        markup: M.LabelView.design({
            value: 'var language = M.I18N.getLanguage(YES);',
            cssClass: 'source'
        })

    }),

    tabBar: KitchenSink.TabBar
});m_require('app/views/tabs.js');
m_require('app/views/utilities_page.js');
m_require('app/views/utilities_i18n_page.js');

KitchenSink.UtilitiesI18n3 = M.PageView.design({

    onLoad : {
        target: KitchenSink.UtilitiesI18nController,
        action: 'getLanguage2'
    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({
        childViews: 'backButton title',

        backButton: M.ButtonView.design({
            value: 'Back',
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            target: KitchenSink.UtilitiesI18nController,
            action: 'here'
        }),

        title: M.LabelView.design({
            value: 'Get the current language',
            anchorLocation: M.CENTER
        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({
        childViews: 'label1 label2 markupTitle markup',

        label1: M.LabelView.design({

            value: 'The current language is ',

            isInline: YES

        }),

        label2: M.LabelView.design({

            value: '',

            computedValue: {

                contentBinding: 'KitchenSink.UtilitiesI18nController.language2',

                operation: function(v) {

                    return '\'' + v + '\''

                }
            },

            isInline: YES

        }),

        markupTitle: M.LabelView.design({
            value: 'Sourcecode',
            cssClass: 'titleSource'
        }),

        markup: M.LabelView.design({
            value: 'var language = M.I18N.getLanguage();',
            cssClass: 'source'
        })

    }),

    tabBar: KitchenSink.TabBar
});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso
//
// Project: KitchenSink 
// ==========================================================================

var KitchenSink  = KitchenSink || {};

KitchenSink.app = M.Application.design({

    controls: KitchenSink.PageControls,

    controlsButtonView: KitchenSink.ControlsButtonViewPage,
    
    controlsButtonView1: KitchenSink.ControlsButtonViewPage1,

    controlsButtonView2: KitchenSink.ControlsButtonViewPage2,

    controlsButtonView3: KitchenSink.ControlsButtonViewPage3,

    controlsButtonView4: KitchenSink.ControlsButtonViewPage4,

    controlsButtonView5: KitchenSink.ControlsButtonViewPage5,

    controlsButtonView6: KitchenSink.ControlsButtonViewPage6,

    controlsButtonGroupView: KitchenSink.ControlsButtonGroupViewPage,

    controlsButtonGroupView1: KitchenSink.ControlsButtonGroupViewPage1,

    controlsButtonGroupView2: KitchenSink.ControlsButtonGroupViewPage2,

    controlsButtonGroupView3: KitchenSink.ControlsButtonGroupViewPage3,

    controlsButtonGroupView4: KitchenSink.ControlsButtonGroupViewPage4,

    controlsButtonGroupView5: KitchenSink.ControlsButtonGroupViewPage5,

    controlsButtonGroupView6: KitchenSink.ControlsButtonGroupViewPage6,

    controlsButtonGroupView7: KitchenSink.ControlsButtonGroupViewPage7,

    controlsDialogView: KitchenSink.ControlsDialogViewPage,

    controlsDialogView1: KitchenSink.ControlsDialogViewPage1,

    controlsDialogView2: KitchenSink.ControlsDialogViewPage2,

    controlsDialogView3: KitchenSink.ControlsDialogViewPage3,

    controlsDialogView4: KitchenSink.ControlsDialogViewPage4,

    controlsDialogView5: KitchenSink.ControlsDialogViewPage5,

    controlsGridView: KitchenSink.ControlsGridViewPage,

    controlsGridView1: KitchenSink.ControlsGridViewPage1,

    controlsGridView2: KitchenSink.ControlsGridViewPage2,

    controlsGridView3: KitchenSink.ControlsGridViewPage3,

    controlsImageView: KitchenSink.ControlsImageViewPage,

    controlsImageView1: KitchenSink.ControlsImageViewPage1,

    controlsImageView2: KitchenSink.ControlsImageViewPage2,

    controlsLabelView: KitchenSink.ControlsLabelViewPage,

    controlsLabelView1: KitchenSink.ControlsLabelViewPage1,

    controlsLabelView2: KitchenSink.ControlsLabelViewPage2,

    controlsLabelView3: KitchenSink.ControlsLabelViewPage3,

    controlsLabelView4: KitchenSink.ControlsLabelViewPage4,

    controlsLabelView5: KitchenSink.ControlsLabelViewPage5,

    controlsLabelView6: KitchenSink.ControlsLabelViewPage6,

    controlsListView: KitchenSink.ControlsListViewPage,

    controlsListView1: KitchenSink.ControlsListViewPage1,

    controlsListView2: KitchenSink.ControlsListViewPage2,

    controlsListView3: KitchenSink.ControlsListViewPage3,

    controlsListView4: KitchenSink.ControlsListViewPage4,

    controlsListView5: KitchenSink.ControlsListViewPage5,

    controlsListView6: KitchenSink.ControlsListViewPage6,

    controlsLoaderView: KitchenSink.ControlsLoaderViewPage,

    controlsLoaderView1: KitchenSink.ControlsLoaderViewPage1,

    controlsSearchBarView: KitchenSink.ControlsSearchBarViewPage,

    controlsSearchBarView1: KitchenSink.ControlsSearchBarViewPage1,

    controlsSearchBarView2: KitchenSink.ControlsSearchBarViewPage2,

    controlsSearchBarView3: KitchenSink.ControlsSearchBarViewPage3,

    controlsSearchBarView4: KitchenSink.ControlsSearchBarViewPage4,

    controlsSelectionListView: KitchenSink.ControlsSelectionListViewPage,

    controlsSelectionListView1: KitchenSink.ControlsSelectionListViewPage1,

    controlsSelectionListView2: KitchenSink.ControlsSelectionListViewPage2,

    controlsSelectionListView3: KitchenSink.ControlsSelectionListViewPage3,

    controlsSelectionListView4: KitchenSink.ControlsSelectionListViewPage4,

    controlsSelectionListView5: KitchenSink.ControlsSelectionListViewPage5,

    controlsTabBarView: KitchenSink.ControlsTabBarViewPage,

    controlsTabBarView1: KitchenSink.ControlsTabBarViewPage1,

    controlsTextFieldView: KitchenSink.ControlsTextFieldViewPage,

    controlsTextFieldView1: KitchenSink.ControlsTextFieldViewPage1,

    controlsTextFieldView2: KitchenSink.ControlsTextFieldViewPage2,

    controlsTextFieldView3: KitchenSink.ControlsTextFieldViewPage3,

    controlsTextFieldView4: KitchenSink.ControlsTextFieldViewPage4,

    controlsToggleView: KitchenSink.ControlsToggleViewPage,

    controlsToggleView1: KitchenSink.ControlsToggleViewPage1,

    controlsToggleView2: KitchenSink.ControlsToggleViewPage2,

    controlsToggleView3: KitchenSink.ControlsToggleViewPage3,

    controlsToolbarView: KitchenSink.ControlsToolbarViewPage,

    controlsToolbarView1: KitchenSink.ControlsToolbarViewPage1,

    controlsToolbarView2: KitchenSink.ControlsToolbarViewPage2,

    controlsToolbarView3: KitchenSink.ControlsToolbarViewPage3,

    controlsToolbarView4: KitchenSink.ControlsToolbarViewPage4,

    controlsToolbarView5: KitchenSink.ControlsToolbarViewPage5,

    core: KitchenSink.PageCore,

    utilities: KitchenSink.PageUtilities,

    utilitiesI18n: KitchenSink.UtilitiesI18nPage,

    utilitiesI18n1: KitchenSink.UtilitiesI18n1,

    utilitiesI18n2: KitchenSink.UtilitiesI18n2,

    utilitiesI18n3: KitchenSink.UtilitiesI18n3,

    utilitiesDate: KitchenSink.UtilitiesDatePage,

    utilitiesDate1: KitchenSink.UtilitiesDate1,

    utilitiesDate2: KitchenSink.UtilitiesDate2,

    data: KitchenSink.PageData,

    dataLocalStorageTaskApp: KitchenSink.DataLocalStorageTaskAppPage,

    dataWebSqlTaskApp: KitchenSink.DataWebSqlTaskAppPage,

    dataRequestSample: KitchenSink.DataRequestSamplePage

});