// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * This defines the prototype for any button view. A button is a view element that is
 * typically used for triggering an action, e.g. switching to another page, firing a
 * request or opening a dialog.
 *
 * @extends M.View
 */
M.ButtonView = M.View.extend(
/** @scope M.ButtonView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ButtonView',

    /**
     * Determines whether this button is active or not.
     *
     * Note: This property is only used if the button is part of a button group (M.ButtonGroupView).
     *
     * @type Boolean
     */
    isActive: NO,

    /**
     * Determines whether to display the button ony with an icon but no text or not.
     *
     * @type Boolean
     */
    isIconOnly: NO,

    /**
     * Renders a button as an input tag. Input is automatically converted by jQuery mobile.
     *
     * @private
     * @returns {String} The button view's html representation.
     */
    render: function() {
        this.html += '<a data-role="button" href="#" id="' + this.id + '"' + this.style() + '>' + this.value + '</a>';
        
        return this.html;
    },

    /**
     * Updates the value of the button with DOM access by jQuery.
     *
     * @private
     */
    renderUpdate: function() {
        $('#' + this.id).parent().find('.ui-btn-text').text(this.value);
        this.theme();
    },

    /**
     * Sets the button's value and calls renderUpdate() to make the value update visible.
     *
     * @param {String} value The button's new value.
     */
    setValue: function(value) {
        this.value = value;
        this.renderUpdate();
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the button.
     *
     * @private
     */
    theme: function() {
        $('#' + this.id).button();
    },

    /**
     * Applies some style-attributes to the button.
     *
     * @private
     * @returns {String} The button's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.isInline) {
            html += ' data-inline="true"';
        }
        if(this.icon) {
            html += ' data-icon="' + this.icon + '"';
        }
        if(this.cssClass) {
            html += ' data-theme="' + this.cssClass + '"';
        }
        if(this.isIconOnly) {
            html += ' data-iconpos="notext"';
        }
        if(this.cssStyle) {
            html += 'style="' + this.cssStyle + '"';
        }
        return html;
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      03.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('ui/button.js');

/**
 * @class
 *
 * This is the prototype for any list item view. It can only be used as child view of a list
 * view (M.ListView).
 *
 * @extends M.View
 */
M.ListItemView = M.View.extend(
/** @scope M.ListItemView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ListItemView',

    /**
     * States whether the list view item is currently in edit mode or not. This is mainly used by
     * the built-in toggleRemove() functionality of list views.
     *
     * @type Boolean
     */
    inEditMode: NO,

    /**
     * This property determines whether a list item has one single action that is triggered
     * once there is a click anywhere inside the list item or if there are specific actions
     * defined for single ui elements within one list item.
     *
     * @type Boolean
     */
    hasSingleAction: YES,

    /**
     * This property contains the list item's delete button that is automatically shown if the
     * list view's built-in toggleRemove() functionality is used.
     *
     * @type M.ButtonView
     */
    deleteButton: M.ButtonView.design({
        icon: 'delete',
        target: null,
        action: '',
        value: ''
    }),

    /**
     * This property is used to specify an internal target for an automatically called action, e.g.
     * this is used by the built-in toggleRemove() functionality.
     *
     * @type Object
     */
    internalTarget: null,

    /**
     * This property is used to specify an internal action for an automatically called action, e.g.
     * this is used by the built-in toggleRemove() functionality.
     *
     * @type Object
     */
    internalAction: 'setActiveListItem',

    /**
     * This property reffers to the list item's parent list view..
     *
     * @type M.ListView
     */
    listView: null,

    /**
     * This property determines whether the list item is a divider or not.
     *
     * @type Boolean
     */
    isDivider: NO,

    /**
     * Renders a list item as an li-tag. The rendering is initiated by the parent list view.
     *
     * @private
     * @returns {String} The list item view's html representation.
     */
    render: function() {
        this.html = '<li id="' + this.id + '"' + this.style();

        this.html += ' onclick="M.EventDispatcher.onClickEventDidHappen(\'click\', \'' + this.id + '\');"';
        this.internalTarget = this.listView;

        if(this.isDivider) {
            this.html += ' data-role="list-divider"';
        }

        this.html += '>';

        if(this.childViews) {
            if(this.inEditMode) {
                this.html += '<a href="#">';
                this.renderChildViews();
                this.html += '</a>';

                this.html += this.deleteButton.render();
            } else {
                this.html += '<a href="#">';
                this.renderChildViews();
                this.html += '</a>';
            }
        } else if(this.value) {
            this.html += this.value;
        }

        this.html += '</li>';
        
        return this.html;
    },

    /**
     * Applies some style-attributes to the list item.
     *
     * @private
     * @returns {String} The list item's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      02.12.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for horizontal alignment.
 *
 * @type String
 */
M.HORIZONTAL = 'horizontal';

/**
 * A constant value for vertical alignment.
 *
 * @type String
 */
M.VERTICAL = 'vertical';


/**
 * @class
 *
 * A button group is a vertically or / and horizontally aligned group of buttons. There
 * are basically three different types of a button group:
 *
 * - horizontally aligned buttons
 *     1 - 2 - 3
 *
 * - vertically aligned buttons
 *     1
 *     |
 *     2
 *     |
 *     3
 *
 * - horizontally and vertically aligned buttons
 *     1 - 2
 *     |   |
 *     3 - 4
 * 
 * @extends M.View
 */
M.ButtonGroupView = M.View.extend(
/** @scope M.ButtonGroupView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ButtonGroupView',

    /**
     * This property determines whether to render the button group horizontally
     * or vertically. Default: horizontal.
     *
     * Possible values are:
     * - M.HORIZONTAL: horizontal
     * - M.VERTICAL: vertical
     *
     * @type String
     */
    direction: M.HORIZONTAL,

    /**
     * Determines whether to display the button group view 'inset' or at full width.
     *
     * @type Boolean
     */
    isInset: YES,

    /**
     * Determines whether to display the button group compact, i.e. without top/bottom
     * margin. This property only is relevant in combination with multiple lines of
     * buttons (c.p.: buttonsPerLine property).
     *
     * @type Boolean
     */
    isCompact: YES,

    /**
     * This property, if set, defines how many buttons are rendered per line. If there
     * are more buttons defined that fitting into one line, the following buttons are
     * rendered into a new line. Make sure, the number of your buttons is divisible by
     * the number of buttons per line, since only full lines are displayed. So if you
     * for example specify 5 buttons and 2 buttons per line, the fifth button won't be
     * visible.
     *
     * If e.g. 4 buttons are specified and this property is set to 2, the rendering will
     * be as follows:
     *
     *     1 -- 2
     *     3 -- 4
     *
     * @type Number
     */
    buttonsPerLine: null,

    /**
     * This property is used to internally store the number of lines that are necessary
     * to render all buttons according to the buttonsPerLine property.
     *
     * @private
     * @type Number
     */
    numberOfLines: null,

    /**
     * This property refers to the currently rendered line, if there is more than one.
     *
     * @private
     * @type Number
     */
    currentLine: null,

    /**
     * This property contains an array of html ids referring to the several lines of grouped
     * buttons, if there is more than one at all.
     *
     * @private
     * @type Array
     */
    lines: null,

    /**
     * This property contains a reference to the currently selected button.
     *
     * @private
     * @type Object
     */
    activeButton: null,

    /**
     * This property determines whether the buttons of this button group are selectable or not. If
     * set to YES, a click on one of the buttons will set this button as the currently active button
     * and automatically change its styling to visualize its selection.
     *
     * @type Boolean
     */
    isSelectable: YES,

    /**
     * Renders a button group as a div container and calls the renderChildViews
     * method to render the included buttons.
     *
     * @private
     * @returns {String} The button group view's html representation.
     */
    render: function() {
        /* check if multiple lines are necessary before rendering */
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            if(this.buttonsPerLine && this.buttonsPerLine < childViews.length) {
                var numberOfButtons = 0;
                for(var i in childViews) {
                    if(this[childViews[i]] && this[childViews[i]].type === 'M.ButtonView') {
                        numberOfButtons = numberOfButtons + 1;
                    }
                }
                if(this.buttonsPerLine < numberOfButtons) {
                    this.numberOfLines = M.Math.round(numberOfButtons / this.buttonsPerLine, M.FLOOR);
                }
            }
        }

        /* if there are multiple lines, render multiple horizontally aligned button groups */
        if(this.numberOfLines) {
            /* set the direction to horizontally, no matter what it was set to before */
            this.direction = M.HORIZONTAL;

            /* this is a wrapper for the multiple button groups.
               if it is not inset, assign css class 'ui-listview' for clearing the padding of the surrounding element */
            this.html += '<div id="' + this.id + '"';
            this.html += this.isInset ? '' : ' class="ui-listview"';
            this.html += '>';

            /* create a button group for every line */
            this.lines = [];
            for(var i = 0; i < this.numberOfLines; i++) {
                this.currentLine = i + 1;
                /* store current line in lines property for use in renderChildViews() */
                this.lines.push(this.id + '_' + i);

                this.html += '<div data-role="controlgroup" href="#" id="' + this.id + '_' + i + '" data-type="' + this.direction + '"';

                /* if isCompact, assign specific margin, depending on line number (first, last, other) */
                if(!this.isInset || this.isCompact) {
                    if(i == 0) {
                        this.html += this.isInset ? ' style="margin-bottom:0px"' : ' style="margin:0px"';
                    } else if(i > 0 && i < this.numberOfLines - 1) {
                        this.html += this.isInset ? ' style="margin:0px 0px 0px 0px"' : ' style="margin:0px"';
                    } else if(i < this.numberOfLines) {
                        this.html += this.isInset ? ' style="margin-top:0px"' : ' style="margin:0px"';
                    }
                }

                this.html += '>';

                /* render the buttons for the current line */
                this.renderChildViews();

                this.html += '</div>';
            }
            this.html += '</div>';
        } else {
            this.html += '<div data-role="controlgroup" href="#" id="' + this.id + '" data-type="' + this.direction + '">';

            this.renderChildViews();

            this.html += '</div>';
        }

        return this.html;
    },

    /**
     * Triggers render() on all children of type M.ButtonGroupView.
     *
     * @private
     */
    renderChildViews: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            var currentButtonIndex = 0;

            for(var i in childViews) {
                if(this[childViews[i]] && this[childViews[i]].type === 'M.ButtonView') {
                    currentButtonIndex = currentButtonIndex + 1;

                    if(!this.numberOfLines || M.Math.round(currentButtonIndex / this.buttonsPerLine, M.CEIL) === this.currentLine) {

                        var button = this[childViews[i]];
                        /* reset buttons html, to make sure it doesn't get rendered twice if this is multi button group */
                        button.html = '';

                        button.parentView = this;
                        button.internalTarget = this;
                        button.internalAction = 'setActiveButton';

                        /* check if button has own target / action, otherwise use target / action from button group */
                        if(!button.target) {
                            if(this.target && this.action) {
                                button.target = this.target;
                                button.action = this.action;
                            }
                        }

                        /* if the buttons are horizontally aligned, compute their width depending on the number of buttons
                           and set the right margin to '-2px' since the jQuery mobile default would cause an ugly gap to
                           the right of the button group */
                        if(this.direction === M.HORIZONTAL) {
                            button.cssStyle = 'margin-right:-2px;width:' + 100 / (this.numberOfLines ? this.buttonsPerLine : childViews.length) + '%';
                        }

                        /* finally render the button and add it to the button groups html */
                        this.html += this[childViews[i]].render();
                    }
                } else {
                    M.Logger.log('childview of button group is no button.', M.WARN);
                }
            }
        }
    },

    /**
     * This method themes the button group and activates one of the included buttons
     * if its isActive property is set.
     *
     * @private
     */
    theme: function() {
        /* if there are multiple lines of buttons, it's getting heavy */
        if(this.numberOfLines) {
            
            /* iterate through all lines */
            for(var line in this.lines) {
                line = parseInt(line);

                /* style the current line */
                $('#' + this.lines[line]).controlgroup();
                var childViews = $.trim(this.childViews).split(' ');
                var currentButtonIndex = 0;
                
                /* if isCompact, iterate through all buttons */
                if(this.isCompact) {
                    for(var i in childViews) {
                        i = parseInt(i);
                        if(this[childViews[i]] && this[childViews[i]].type === 'M.ButtonView') {
                            currentButtonIndex = currentButtonIndex + 1;
                            var currentLine = M.Math.round(currentButtonIndex / this.buttonsPerLine, M.CEIL) - 1;
                            var button = this[childViews[i]];

                            /* if the button belongs to the current line adjust its styling according to its position,
                               e.g. the first button in the first row gets the css class 'ui-corner-tl' (top left). */
                            if(line === currentLine) {

                                /* first line */
                                if(line === 0 && this.numberOfLines > 1) {
                                    /* first button */
                                    if(currentButtonIndex === 1) {
                                        $('#' + button.id).removeClass('ui-corner-left');
                                        if(this.isInset) {
                                            $('#' + button.id).addClass('ui-corner-tl');
                                        }
                                    /* last button */
                                    } else if(currentButtonIndex === this.buttonsPerLine) {
                                        $('#' + button.id).removeClass('ui-corner-right');
                                        if(this.isInset) {
                                            $('#' + button.id).addClass('ui-corner-tr');
                                        }
                                    }
                                /* last line */
                                } else if(line === this.numberOfLines - 1) {
                                    /* first button */
                                    if(currentButtonIndex === (currentLine * this.buttonsPerLine) + 1) {
                                        $('#' + button.id).removeClass('ui-corner-left');
                                        $('#' + button.id).addClass('ui-corner-bl');
                                    /* last button */
                                    } else if(currentButtonIndex === ((currentLine + 1) * this.buttonsPerLine)) {
                                        $('#' + button.id).removeClass('ui-corner-right');
                                        $('#' + button.id).addClass('ui-corner-br');
                                    }
                                /* all other lines */
                                } else {
                                    /* first button */
                                    if(currentButtonIndex === (currentLine * this.buttonsPerLine) + 1) {
                                        $('#' + button.id).removeClass('ui-corner-left');
                                    /* last button */
                                    } else if(currentButtonIndex === ((currentLine + 1) * this.buttonsPerLine)) {
                                        $('#' + button.id).removeClass('ui-corner-right');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        /* if there is only on row, simply style that button group */
        } else {
            $('#' + this.id).controlgroup();
        }

        /* iterate through all buttons and activate on of them, according to the button's isActive property */
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            for(var i in childViews) {
                if(this[childViews[i]] && this[childViews[i]].type === 'M.ButtonView') {
                    var button = this[childViews[i]];
                    if(button.isActive) {
                        this.setActiveButton(button.id);
                        break;
                    }
                }
            }
        }
    },

    /**
     * This method returns the currently selected button of this button group. If no
     * button is selected, null is returned.
     *
     * @returns {M.ButtonView} The currently active button of this button group.
     */
    getActiveButton: function() {
        return this.activeButton;  
    },

    /**
     * This method activates one button within the button group.
     *
     * @param {M.ButtonView, String} id The button to be set active or its id.
     */
    setActiveButton: function(id) {
        if(this.isSelectable) {
            this.activeButton = null;
            $('#' + this.id).find('a').each(function() {
                var button = M.ViewManager.getViewById($(this).attr('id'));
                button.removeCssClass('ui-btn-active');
                button.isActive = NO;
            });

            var button = M.ViewManager.getViewById(id);
            if(!button) {
                if(id && typeof(id) === 'object' && id.type === 'M.ButtonView') {
                    button = id;
                }
            }
            if(button) {
                button.addCssClass('ui-btn-active');
                button.isActive = YES;
                this.activeButton = button;
            }
        }
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      01.12.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * A container view renders a simple div container that can be used to display
 * any html valid content, e.g. by third party frameworks.
 *
 * @extends M.View
 */
M.ContainerView = M.View.extend(
/** @scope M.ContainerView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ContainerView',

    /**
     * Renders a simple div container and applies css classes if specified.
     *
     * @private
     * @returns {String} The container view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '"' + this.style() + '></div>';

        this.renderChildViews();

        return this.html;
    },

    /**
     * Applies some style-attributes to the container view.
     *
     * @private
     * @returns {String} The container's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      23.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @classx
 *
 * This is the prototype of any dialog view. It is responsible for showing and later
 * hiding a dialog.
 *
 * @extends M.View
 */
M.DialogView = M.View.extend(
/** @scope M.DialogView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DialogView',

    /**
     * Contains the ids of the button's within a dialog. They are used to later register a click
     * event to all of these views.
     *
     * @type Array
     */
    buttonIds: [],

    /**
     * This property states whether the dialog is currently active or not.
     *
     * @type Boolean
     */
    isActive: NO,

    /**
     * The dialog's callback, split in target / action. It is called once the dialog's closing
     * transition did finish.
     *
     * @type Object
     */
    callback: {},

    /**
     * This method controls the process of bringing a dialog to the screen.
     *
     * @private
     */
    show: function() {

        /* register the onHide event for this dialog */
        $('#' + this.id).live('pagehide', this.bindToCaller(this, this.dialogDidHide));

        /* call the dialog's render() */
        this.render();

        /* theme it */
        this.theme();

        /* register the buttons at the event dispatcher */
        for(var i in this.buttonIds) {
            M.Application.eventDispatcher.registerEvents(this.buttonIds[i], 'click');
        }

        /* finally show the dialog on the screen */
        M.Controller.switchToPage(this, this.transition, NO, NO);

        this.isActive = YES;

    },

    /**
     * This method triggers the styling of the dialog and its sub views.
     *
     * @private
     */
    theme: function() {
        $('#' + this.id).page();
    },

    /**
     * This method creates an alert dialog based on the given customizing parameters and
     * initiates its displaying on the screen.
     *
     * @param {Object} obj The customizing parameters of the alert dialog view.
     */
    alert: function(obj) {
        M.AlertDialogView.design(obj).show();
    },

    /**
     * This method creates an confirm dialog based on the given customizing parameters and
     * initiates its displaying on the screen.
     *
     * @param {Object} obj The customizing parameters of the confirm dialog view.
     */
    confirm: function(obj) {
        M.ConfirmDialogView.design(obj).show();
    },

    /**
     * This method creates an actionSheet dialog based on the given customizing parameters and
     * initiates its displaying on the screen.
     *
     * @param {Object} obj The customizing parameters of the actionSheet dialog view.
     */
    actionSheet: function(obj) {
         M.ActionSheetDialogView.design(obj).show();
    },

    /**
     * This method is automatically called right before the dialog will be closed. It is
     * used to store the dialogs specified callbacks, if specified.
     *
     * @private
     * @param {String} id The id of the dialog.
     */
    dialogWillClose: function(id) {
        if(this.isActive) {
            var button = M.ViewManager.getViewById(id);
            if(this[button.role] && this[button.role].target && this[button.role].action) {
                this.callback.target = this[button.role].target;
                this.callback.action = this[button.role].action;
            } else if (this.buttons && this.buttons[button.role] && this.buttons[button.role].target && this.buttons[button.role].action) {
                this.callback.target = this.buttons[button.role].target;
                this.callback.action = this.buttons[button.role].action;
            }
            $('#' + this.id).dialog('close');
            this.isActive = NO;
        }
    },

    /**
     * This method is automatically called right after the dialog was closed. It is used to
     * call the dialog's specified callback and to destroy it by calling M.Object's destroy
     * method.
     *
     * @private
     */
    dialogDidHide: function() {
        if(this) {
            if(this.callback && this.callback.target && this.callback.action) {
                this.callback.target[this.callback.action]();
            }
            this.destroy();
        }
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      23.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('ui/dialog.js');

/**
 * @class
 *
 * This is the prototype for any action sheet dialog view. It is derived from M.DialogView
 * and mainly used for implementing a action sheet dialog view specific render method.
 *
 * @extends M.DialogView 
 */
M.ActionSheetDialogView = M.DialogView.extend(
/** @scope M.ActionSheetDialogView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ActionSheetDialogView',

    /**
     * The default title of an action sheet dialog.
     *
     * @type String
     */
    title: 'ActionSheet',

    /**
     * The default transition of an action sheet dialog.
     *
     * @type String
     */
    transition: M.TRANSITION.SLIDEUP,

    /**
     * Determines whether the action sheet dialog gets a default cancel button.
     *
     * @type Boolean
     */
    hasCancelButton: YES,

    /**
     * Renders an action sheet dialog as a slide-up page.
     *
     * @private
     * @returns {String} The action sheet dialog view's html representation.
     */
    render: function() {
        this.html = '<div data-role="dialog" id="' + this.id + '">';
        this.html += '<div data-role="content"><h2>' + this.title + '</h2>';
        this.html += this.message ? this.message : '';

        if(this.buttons) {
            for(var buttonName in this.buttons) {
                var button = M.ButtonView.design({
                    value: this.buttons[buttonName].title,
                    target: this,
                    action: 'dialogWillClose',
                    role: buttonName,
                    cssClass: this.buttons[buttonName].cssClass ? this.buttons[buttonName].cssClass : (buttonName === 'cancel' ? 'c' : 'b')
                });
                this.buttonIds.push(button.id);
                this.html += button.render();
            }
        }

        if(this.hasCancelButton) {
            var button = M.ButtonView.design({
                value: 'Cancel',
                cssClass: 'c',
                target: this,
                action: 'dialogWillClose',
                role: 'onCancel'
            });
            this.buttonIds.push(button.id);
            this.html += button.render();
        }

        this.html += '</div>';

        $('body').append(this.html);
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      23.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('ui/dialog.js');

/**
 * @class
 *
 * This is the prototype for any alert dialog view. It is derived from M.DialogView
 * and mainly used for implementing a alert dialog view specific render method.
 *
 * @extends M.DialogView
 */
M.AlertDialogView = M.DialogView.extend(
/** @scope M.AlertDialogView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.AlertDialogView',

    /**
     * The default title of an alert dialog.
     *
     * @type String
     */
    title: 'Alert',

    /**
     * The default message of an alert dialog.
     *
     * @type String
     */
    message: '',

    /**
     * The default transition of an alert dialog.
     *
     * @type String
     */
    transition: M.TRANSITION.POP,

    /**
     * Determines whether the alert dialog gets a default ok button.
     *
     * @type Boolean
     */
    hasOkButton: YES,

    /**
     * Renders an alert dialog as a pop-up page.
     *
     * @private
     * @returns {String} The alert dialog view's html representation.
     */
    render: function() {
        this.html = '<div data-role="dialog" id="' + this.id + '">';
        this.html += '<div data-role="header" data-position="fixed"><h1>' + this.title + '</h1></div>';
        this.html += '<div data-role="content">' + this.message;

        if(this.hasOkButton) {
            var button = M.ButtonView.design({
                value: 'OK',
                cssClass: 'b',
                target: this,
                action: 'dialogWillClose',
                role: 'onOk'
            });
            this.buttonIds.push(button.id);
            this.html += button.render();
        }

        this.html += '</div>';        
        this.html += '</div>';

        $('body').append(this.html);
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      23.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('ui/dialog.js');

/**
 * @class
 *
 * This is the prototype for any confirm dialog view. It is derived from M.DialogView
 * and mainly used for implementing a confirm dialog view specific render method.
 *
 * @extends M.DialogView
 */
M.ConfirmDialogView = M.DialogView.extend(
/** @scope M.ConfirmDialogView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ConfirmDialogView',

    /**
     * The default title of an confirm dialog.
     *
     * @type String
     */
    title: 'Confirm',

    /**
     * The default message of an confirm dialog.
     *
     * @type String
     */
    message: '',

    /**
     * The default transition of an confirm dialog.
     *
     * @type String
     */
    transition: M.TRANSITION.POP,

    /**
     * Determines whether the confirm dialog gets a default ok button.
     *
     * @type Boolean
     */
    hasOkButton: YES,

    /**
     * Determines whether the confirm dialog gets a default cancel button.
     *
     * @type Boolean
     */
    hasCancelButton: YES,

    /**
     * Renders an confirm dialog as a pop-up page.
     *
     * @private
     * @returns {String} The confirm dialog view's html representation.
     */
    render: function() {
        this.html = '<div data-role="dialog" id="' + this.id + '">';
        this.html += '<div data-role="header" data-position="fixed"><h1>' + this.title + '</h1></div>';
        this.html += '<div data-role="content">' + this.message;

        if(this.hasOkButton) {
            var button = M.ButtonView.design({
                value: 'OK',
                cssClass: 'b',
                target: this,
                action: 'dialogWillClose',
                role: 'onOk'
            });
            this.buttonIds.push(button.id);
            this.html += button.render();
        }

        if(this.hasCancelButton) {
            var button = M.ButtonView.design({
                value: 'Cancel',
                cssClass: 'c',
                target: this,
                action: 'dialogWillClose',
                role: 'onCancel'
            });
            this.buttonIds.push(button.id);
            this.html += button.render();
        }

        this.html += '</div>';

        this.html += '</div>';

        $('body').append(this.html);
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      25.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * M.FormViews is the prototype of a form view, a container like view for grouping
 * input views, e.g. M.TextFieldView. It covers a lot of the jobs concerning the
 * validation of input views. There is no visible representation of an M.FormView,
 * it is only used to ease the validation process and its accessing out of a
 * controller.
 * 
 * @extends M.View
 */
M.FormView = M.View.extend(
/** @scope M.FormView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.FormView',

    /**
     * Determines whether to automatically show an alert dialog view out of the showError method
     * if the validation failed or not. So if set to YES, all error messages are shown in an alert
     * dialog view once the showError method is called.
     *
     * @type Boolean
     */
    showAlertDialogOnError: YES,

    /**
     * The title of the alert view that comes up automatically if the validation fails, depending
     * one the 'showAlertOnError' property.
     *
     * @type String
     */
     alertTitle: 'Validation Error(s)',

    /**
     * This method triggers the validate() on all child views, respectively
     * on their validators.
     *
     * @returns {Boolean} The result of the validation process: valid or not.
     */
    validate: function() {
        M.Validator.clearErrorBuffer();
        var isValid = YES;
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            for(var i in childViews) {
                var childView = this[childViews[i]];
                if(childView && childView.validators) {
                    _.each(childView.validators, function(validator) {
                        if(!validator.validate(childView, childViews[i])) {
                            isValid = NO;
                        }
                    });
                }
                if(childView && childView.cssClassOnError) {
                    childView.removeCssClass(childView.cssClassOnError);
                }
            }
        }

        return isValid;
    },

    /**
     * This method adds a css class specified by the cssClassOnError property to any
     * view that caused a validation error and has this property specified.
     *
     * If the showAlertDialogOnError property is set to YES, a alert dialog view
     * is display additionally, presenting the error messages of all invalid views.
     */
    showErrors: function() {
        var errors = '';
        _.each(M.Validator.validationErrors, function(error) {
            var view = M.ViewManager.getViewById(error.viewId);
            if(view && view.cssClassOnError) {
                view.addCssClass(view.cssClassOnError);
            }
            errors += '<li>' + error.msg + '</li>';
        });

        if(this.showAlertDialogOnError) {
            M.DialogView.alert({
                title: this.alertTitle,
                message: errors
            });
        }
    },

    /**
     * This method clears the form by clearing all input's values.
     */
    clearForm: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            for(var i in childViews) {
                var childView = this[childViews[i]];
                childView.clearValue();
            }
        }
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for a two column layout of a grid view.
 *
 * @type String
 */
M.TWO_COLUMNS = {
    cssClass: 'ui-grid-a',
    columns: {
        0: 'ui-block-a',
        1: 'ui-block-b'
    }
};

/**
 * A constant value for a three column layout of a grid view.
 *
 * @type String
 */
M.THREE_COLUMNS = {
    cssClass: 'ui-grid-b',
    columns: {
        0: 'ui-block-a',
        1: 'ui-block-b',
        2: 'ui-block-c'
    }
};

/**
 * @class
 *
 * M.GridView defines a prototype of a grid view, that allows you to display several
 * views horizontally aligned. Therefore you can either use a predefined layout or you
 * can provide a custom layout.
 * 
 * @extends M.View
 */
M.GridView = M.View.extend(
/** @scope M.GridView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.GridView',

    /**
     * The layout for the grid view. There are two predefined layouts available:
     * 
     * - M.TWO_COLUMNS: a two column layout, width: 50% / 50%
     * - M.THREE_COLUMNS: a three column layout, width: 33% / 33% / 33%
     *
     * To specify your own layout, you will have to implement some css classes and
     * then define your layout like:
     *
     *     cssClass: 'cssClassForWholeGrid',
     *     columns: {
     *         0: 'cssClassForColumn1',
     *         1: 'cssClassForColumn2',
     *         2: 'cssClassForColumn3',
     *         3: 'cssClassForColumn4',
     *         //........
     *     }
     *
     * @type Object
     */
    layout: null,

    /**
     * Renders a grid view based on the specified layout.
     *
     * @private
     * @returns {String} The grid view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '" ' + this.style() + '>';

        this.renderChildViews();

        this.html += '</div>';

        return this.html;
    },

    /**
     * Triggers render() on all children and includes some special grid view logic
     * concerning the rendering of these child views.
     *
     * @private
     */
    renderChildViews: function() {
        if(this.childViews) {
            if(this.layout) {
                var arr = this.childViews.split(' ');
                for(var i in this.layout.columns) {
                    if(this[arr[i]]) {
                        this.html += '<div class="' + this.layout.columns[i] + '">';

                        this.html += this[arr[i]].render();

                        this.html += '</div>';
                    }
                }
            } else {
                M.Logger.log('No layout specified for GridView', M.ERROR);
            }
        }
    },

    /**
     * This method themes the grid view, respectively its child views.
     *
     * @private
     */
    theme: function() {
        this.themeChildViews();
    },

    /**
     * Applies some style-attributes to the grid view.
     *
     * @private
     * @returns {String} The grid view's styling as html representation.
     */
    style: function() {
        if(this.layout) {
            var html = 'class="' + this.layout.cssClass + '"';
            return html;
        }
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * The is the prototype of any image view. It basically renders a simple image and
 * can be styled using a css class.
 *
 * @extends M.View
 */
M.ImageView = M.View.extend(
/** @scope M.ImageView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ImageView',

    /**
     * Renders an image view based on the specified layout.
     *
     * @private
     * @returns {String} The image view's html representation.
     */
    render: function() {
        this.computeValue();
        this.html += '<img id="' + this.id + '" src="' + this.value + '"' + this.style() + '>';
        return this.html;
    },

    /**
     * Applies some style-attributes to the image view.
     *
     * @private
     * @returns {String} The image view's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for hyperlink of type email.
 *
 * @type String
 */
M.HYPERLINK_EMAIL = 'mail';

/**
 * A constant value for hyperlink of type website.
 *
 * @type String
 */
M.HYPERLINK_WEBSITE = 'website';

/**
 * A constant value for hyperlink of type phone number.
 *
 * @type String
 */
M.HYPERLINK_PHONE = 'phone';

/**
 * @class
 *
 * The is the prototype of any label view. It basically renders a simple plain
 * text can be styled using several properties of M.LabelView or providing one
 * ore more css classes.
 *
 * @extends M.View
 */
M.LabelView = M.View.extend(
/** @scope M.LabelView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.LabelView',

    /**
     * Determines whether a new line '\n' within the label's value should be transformed
     * into a line break '<br/>' before it is rendered. Default: YES.
     *
     * @type Boolean
     */
    newLineToBreak: YES,

    /**
     * Determines whether a tabulator '\t' within the label's value should be transformed
     * into four spaces '&#160;' before it is rendered. Default: YES.
     *
     * @type Boolean
     */
    tabToSpaces: YES,

    /**
     * This property can be used to specify a certain hyperlink type for this label. It only
     * works in combination with the hyperlinkTarget property.
     *
     * @type String
     */
    hyperlinkType: null,

    /**
     * This property can be used to specify a hyperlink target for this label. It only
     * works in combination with the hyperlinkType property.
     *
     * @type String
     */
    hyperlinkTarget: null,

    /**
     * Renders a label view as a div tag with corresponding data-role attribute and inner
     * text defined by value.
     *
     * @private
     * @returns {String} The image view's styling as html representation.
     */
    render: function() {
        this.computeValue();
        this.html += '<div id="' + this.id + '"' + this.style() + '>';

        if(this.hyperlinkTarget && this.hyperlinkType) {
            switch (this.hyperlinkType) {
                case M.HYPERLINK_EMAIL:
                    this.html += '<a rel="external" href="mailto:' + this.hyperlinkTarget + '">';
                    break;
                case M.HYPERLINK_WEBSITE:
                    this.html += '<a rel="external" target="_blank" href="' + this.hyperlinkTarget + '">';
                    break;
                case M.HYPERLINK_PHONE:
                    this.html += '<a rel="external" href="tel:' + this.hyperlinkTarget + '">';
                    break;
            }
        }

        this.html += this.newLineToBreak ? this.nl2br(this.tabToSpaces ? this.tab2space(this.value) : this.value) : (this.tabToSpaces ? this.tab2space(this.value) : this.value);

        if(this.hyperlinkTarget && this.hyperlinkType) {
            this.html += '</a>';
        }

        this.html += '</div>';
        
        return this.html;
    },

    /**
     * Updates the value of the label with DOM access by jQuery.
     *
     * @private
     */
    renderUpdate: function() {
        this.computeValue();
        $('#' + this.id).html(this.newLineToBreak ? this.nl2br(this.value) : this.value);
    },

    /**
     * Applies some style-attributes to the label.
     *
     * @private
     * @returns {String} The label's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.isInline) {
            html += ' style="display:inline;"';
        }
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      02.12.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * M.LoaderView is the prototype for a loader a.k.a. activity indicator. This very simple
 * view can be used to show the user that something is happening, e.g. while the application
 * is waiting for a request to return some data.
 *
 * @extends M.View
 */
M.LoaderView = M.View.extend(
/** @scope M.LoaderView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.LoaderView',

    /**
     * This property states whether the loader has already been initialized or not.
     *
     * @type Boolean
     */
    isInitialized: NO,

    /**
     * This method initializes the loader by loading it once.
     *
     * @private 
     */
    initialize: function() {
        if(!this.isInitialized) {
            this.show();
            this.hide();
        }
    },

    /**
     * This method shows the loader.
     */
    show: function() {
        $.mobile.pageLoading();
    },

    /**
     * This method hides the loader.
     */
    hide: function() {
        $.mobile.pageLoading(YES);
    }
    
});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * M.PageView is the prototype of any page. It is the seconds 'highest' view, right after
 * M.Application. A page is the container view for all other views.
 *
 * @extends M.View
 */
M.PageView = M.View.extend(
/** @scope M.PageView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.PageView',

    /**
     * States whether a page is loaded the first time or not. It is automatically set to NO
     * once the page was first loaded.
     *
     * @type Boolean
     */
    isFirstLoad: YES,

    /**
     * This property can be used to set the page's beforeLoad action.
     *
     * @type Object
     */
    beforeLoad: null,

    /**
     * This property can be used to set the page's onLoad action.
     *
     * @type Object
     */
    onLoad: null,

    /**
     * This property can be used to set the page's beforeHide action.
     *
     * @type Object
     */
    beforeHide: null,

    /**
     * This property can be used to set the page's onHide action.
     *
     * @type Object
     */
    onHide: null,

    /**
     * This property can be used to set the page's onOrientationChange action.
     *
     * @type Object
     */
    onOrientationChange: null,

    /**
     * Indicates whether the page has a tab bar or not.
     *
     * @type Boolean
     */
    hasTabBarView: NO,

    /**
     * The page's tab bar.
     *
     * @type M.TabBarView
     */
    tabBarView: null,

    /**
     * Renders in three steps:
     * 1. Rendering Opening div tag with corresponding data-role
     * 2. Triggering render process of child views
     * 3. Rendering closing tag
     *
     * @private
     * @returns {String} The page view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '" data-role="page"' + this.style() + '>';

        this.renderChildViews();

        this.html += '</div>';

        this.writeToDOM();
        this.theme();
    },

    /**
     * This method writes the view's html string into the DOM. M.Page is the only view that does
     * that. All other views just deliver their html representation to a page view.
     */
    writeToDOM: function() {
        document.write(this.html);
    },

    /**
     * This method is called right before the page is loaded. If a beforeLoad-action is defined
     * for the page, it is now called.
     */
    pageWillLoad: function() {
        /* if this is the first page to be loaded, check if there is a tab bar and an active tab
           specified and switch to this tab */
        if(M.Application.isFirstLoad) {
            M.Application.isFirstLoad = NO;
            var currentPage = M.ViewManager.getCurrentPage();
            if(currentPage && currentPage.hasTabBarView) {
                var tabBarView = currentPage.tabBarView;
                var activePage = M.ViewManager.getPage(tabBarView.activeTab.page);
                if(activePage !== currentPage) {
                    M.Controller.switchToPage(tabBarView.activeTab.page);
                }
            }
        }
        
        if(this.beforeLoad) {
            this.beforeLoad.target[this.beforeLoad.action](this.isFirstLoad);
        }
    },

    /**
     * This method is called right after the page was loaded. If a onLoad-action is defined
     * for the page, it is now called.
     */
    pageDidLoad: function() {
        if(this.onLoad) {
            this.onLoad.target[this.onLoad.action](this.isFirstLoad);            
        }

        /* if there is a list on the page, reset it: deactivate possible active list items */
        $('#' + this.id).find('.ui-btn-active').each(function() {
            if(M.ViewManager.getViewById($(this).attr('id')) && M.ViewManager.getViewById($(this).attr('id')).type === 'M.ListItemView') {
                var listItem = M.ViewManager.getViewById($(this).attr('id'));
                listItem.removeCssClass('ui-btn-active');
            }
        });

        /* initialize the loader for later use (if not already done) */
        if(M.LoaderView) {
            M.LoaderView.initialize();
        }

        /* WORKAROUND FOR FOOTER / HEADER BUG IN JQM */
        /* TODO: REMOVE ONCE IT IS FIXED BY JQM */
        window.setTimeout('scroll(0, 0)', 100);
        window.setTimeout('$.fixedToolbars.show()', 150);

        this.isFirstLoad = NO;
    },

    /**
     * This method is called right before the page is hidden. If a beforeHide-action is defined
     * for the page, it is now called.
     */
    pageWillHide: function() {
        if(this.beforeHide) {
            this.beforeHide.target[this.beforeHide.action]();
        }
    },

    /**
     * This method is called right after the page was hidden. If a onHide-action is defined
     * for the page, it is now called.
     */
    pageDidHide: function() {
        if(this.onHide) {
            this.onHide.target[this.onHide.action]();
        }
    },

    /**
     * This method is called if the device's orientation changed.
     */
    orientationDidChange: function() {
        if(this.onOrientationChange) {
            this.onOrientationChange.target[this.onOrientationChange.action](M.Environment.getOrientation());
        }
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the page and call the theme() of
     * its child views.
     *
     * @private
     */
    theme: function() {
        $('#' + this.id).page();
        this.themeChildViews();
    },

    /**
     * Applies some style-attributes to the page.
     *
     * @private
     * @returns {String} The page's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            if(!html) {
                html += ' class="';
            }
            html += this.cssClass;
        }
        if(html) {
            html += '"';
        }
        return html;
    }
    
});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * The defines the prototype of a scrollable content view. It should be used as a wrapper
 * for any content that isn't part of a header or footer toolbar / tabbar.
 *
 * @extends M.View
 */
M.ScrollView = M.View.extend(
/** @scope M.ScrollView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ScrollView',

    /**
     * Renders in three steps:
     * 1. Rendering Opening div tag with corresponding data-role
     * 2. Triggering render process of child views
     * 3. Rendering closing tag
     *
     * @private
     * @returns {String} The scroll view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '" data-role="content">';

        this.renderChildViews();

        this.html += '</div>';

        return this.html;
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the scroll view and call the
     * theme() of its child views.
     *
     * @private
     */
    theme: function() {
        $('#' + this.id).page();
        this.themeChildViews();
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * M.SearchBarView defines a prototype of a search bar that can be used inside of a list
 * view or independently as a plain input field with a search styling.
 *
 * @extends M.View
 */
M.SearchBarView = M.View.extend(
/** @scope M.SearchBarView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.SearchBarView',

    /**
     * Determines whether the search bar is part of a list view.
     *
     * @type Boolean
     */
    isListViewSearchBar: NO,

    /**
     * If the search bar belongs to a list view, this property contains this
     * list view.
     *
     * @type M.ListView
     */
    listView: null,

    /**
     * The initial text shown inside the search bar field describing the input or making a suggestion for
     * input e.g. "Please enter your Name."
     *
     * @type String
     */
    initialText: '',

    /**
     * Renders a search bar.
     *
     * @private
     * @returns {String} The search bar view's html representation.
     */
    render: function() {
        this.html += '<form role="search"' + this.style() + '>';

        this.html += '<input id="' + this.id + '" data-type="search" value="' + (this.value ? this.value : this.initialText) + '" class="' + this.cssClass + '" />';

        this.html += '</form>';

        return this.html;
    },

    /**
     * Updates a SearchBarView with DOM access by jQuery.
     *
     * @private
     */
    renderUpdate: function() {
        $('#' + this.id).val(this.value);
        this.styleUpdate();
    },

    /**
     * This method sets its value to the value it has in its DOM representation
     * and then delegates these changes to a controller property if the
     * contentBindingReverse property is set.
     *
     * Additionally call target / action if set.
     *
     * @param {Object} evt The event triggered this method.
     */
    setValueFromDOM: function(evt) {
        this.value = this.secure($('#' + this.id).val());
        this.delegateValueUpdate();
        
        if((evt === 'change' && this.triggerActionOnChange || evt === 'keyup' && this.triggerActionOnKeyUp) && this.target && this.action) {
            this.target[this.action](this.value);
        }
    },

    /**
     * Applies some style-attributes to the button.
     *
     * @private
     * @returns {String} The search bar's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.isListViewSearchBar) {
            html += ' class="ui-listview-filter"';
        }
        return html;
    },

    /**
     * Method to append css styles inline to the rendered view on the fly.
     *
     * @private
     */
    styleUpdate: function() {
        if(this.isInline) {
            $('#' + this.id).attr('display', 'inline');
        } else {
            $('#' + this.id).removeAttr('display');
        }

        if(!this.isEnabled) {
            $('#' + this.id).attr('disabled', 'disabled');
        } else {
            $('#' + this.id).removeAttr('disabled');
        }
    },

    /**
     * This method is called whenever the view gets the focus.
     * If there is a initial text specified and the value of this search bar field
     * still equals this initial text, the value is emptied.
     */
    gotFocus: function() {
        if(this.initialText && (!this.value || this.initialText === this.value)) {
            this.setValue('');
            if(this.cssClassOnInit) {
                this.removeCssClass(this.cssClassOnInit);
            }
        }
        this.hasFocus = YES;
    },

    /**
     * This method is called whenever the view lost the focus.
     * If there is a initial text specified and the value of this search bar field
     * is empty, the value is set to the initial text.
     */
    lostFocus: function() {
        if(this.initialText && !this.value) {
            this.setValue(this.initialText, NO);
            this.value = '';
            if(this.cssClassOnInit) {
                this.addCssClass(this.cssClassOnInit);
            }
        }
        this.hasFocus = NO;
    },


    /**
     * This method sets its value to the value it has in its DOM representation
     * and then delegates these changes to a controller property if the
     * contentBindingReverse property is set.
     *
     * Additionally call target / action if set.
     *
     * @param {Object} evt The event triggered this method.
     */
    setValueFromDOM: function(evt) {
        this.value = this.secure($('#' + this.id).val());
        this.delegateValueUpdate();

        if((evt === 'change' && this.triggerActionOnChange || evt === 'keyup' && this.triggerActionOnKeyUp) && this.target && this.action) {
            this.target[this.action](this.value);
        }
    },

    /**
     * This method sets the text field's value, initiates its re-rendering
     * and call the delegateValueUpdate().
     *
     * @param {String} value The value to be applied to the text field view.
     * @param {Boolean} delegateUpdate Determines whether to delegate this value update to any observer or not.
     */
    setValue: function(value, delegateUpdate) {
        this.value = value;
        this.renderUpdate();

        if(delegateUpdate) {
            this.delegateValueUpdate();
        }
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the search bar field.
     *
     * @private
     */
    theme: function() {
        if(this.initialText && !this.value && this.cssClassOnInit) {
            this.addCssClass(this.cssClassOnInit);
        }
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      03.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('ui/search_bar.js');

/**
 * @class
 *
 * M.ListView is the prototype of any list view. It is used to display static or dynamic
 * content as vertically aligned list items (M.ListItemView). A list view provides some
 * easy to use helper method, e.g. an out-of-the-box delete view for items.
 *
 * @extends M.View
 */
M.ListView = M.View.extend(
/** @scope M.ListView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ListView',

    /**
     * Determines whether to remove all item if the list is updated or not.
     *
     * @type Boolean
     */
    removeItemsOnUpdate: YES,

    /**
     * Determines whether to display the list as a divided list or not.
     *
     * @type Boolean
     */
    isDividedList: NO,

    /**
     * If the list view is a divided list, this property can be used to customize the style
     * of the list's dividers.
     *
     * @type String
     */
    cssClassForDivider: null,

    /**
     * Determines whether to display the the number of child items for each list item view.
     *
     * @type Boolean
     */
    isCountedList: NO,

    /**
     * If the list view is a counted list, this property can be used to customize the style
     * of the list item's counter.
     *
     * @type String
     */
    cssClassForCounter: null,

    /**
     * This property can be used to customize the style of the list view's split view. For example
     * the toggleRemove() of a list view uses the built-in split view functionality.
     *
     * @type String
     */
    cssClassForSplitView: null,

    /**
     * The list view's items, respectively its child views.
     *
     * @type Array
     */
    items: null,

    /**
     * States whether the list view is currently in edit mode or not. This is mainly used by the
     * built-in toggleRemove() functionality. 
     *
     * @type Boolean
     */
    inEditMode: NO,

    /**
     * This property contains all available options for the edit mode. For example the target and action
     * of the automatically rendered delete button can be specified using this property.
     *
     * @type Object
     */
    editOptions: null,

    /**
     * Defines if the ListView is rendered with prefixed numbering for each item.
     *
     * @type Boolean
     */
    isNumberedList: NO,

    /**
     * This property contains the list view's template view, the blueprint for every child view.
     *
     * @type M.ListItemView
     */
    listItemTemplateView: null,

    /**
     * Determines whether to display the list view 'inset' or at full width.
     *
     * @type Boolean
     */
    isInset: NO,

    /**
     * The list view's search bar.
     *
     * @type Object
      */
    searchBar: M.SearchBarView,

    /**
     * Determines whether or not to display a search bar at the top of the list view. 
     *
     * @type Boolean
     */
    hasSearchBar: NO,

    /**
     * If the hasSearchBar property is set to YES, this property determines whether to use the built-in
     * simple search filters or not. If set to YES, the list is simply filtered on the fly according
     * to the entered search string. Only list items matching the entered search string will be visible.
     *
     * If a custom search behaviour is needed, this property must be set to NO.
     *
     * @type Boolean
     */
    usesDefaultSearchBehaviour: YES,

    /**
     * An object containing target and action to be triggered if the search string changes.
     *
     * @type Object
     */
    onSearchStringDidChange: null,

    /**
     * This method renders the empty list view either as an ordered or as an unordered list. It also applies
     * some styling, if the corresponding properties where set.
     *
     * @private
     * @returns {String} The list view's styling as html representation.
     */
    render: function() {
        if(this.hasSearchBar && !this.usesDefaultSearchBehaviour) {
            this.searchBar.isListViewSearchBar = YES;
            this.searchBar.listView = this;
            this.searchBar = M.SearchBarView.design(this.searchBar);
            this.html += this.searchBar.render();
        }

        var listTagName = this.isNumberedList ? 'ol' : 'ul';
        this.html += '<' + listTagName + ' id="' + this.id + '" data-role="listview"' + this.style() + '></' + listTagName + '>';
        
        return this.html;
    },

    /**
     * This method adds a new list item to the list view by simply appending its html representation
     * to the list view inside the DOM. This method is based on jQuery's append().
     *
     * @param {String} item The html representation of a list item to be added.
     */
    addItem: function(item) {
        $('#' + this.id).append(item);
    },

    /**
     * This method removes all of the list view's items by removing all of its content in the DOM. This
     * method is based on jQuery's empty().
     */
    removeAllItems: function() {
        $('#' + this.id).empty();
    },

    /**
     * Updates the the list view by re-rendering all of its child views, respectively its item views. There
     * is no rendering done inside this method itself. It is more like the manager of the rendering process
     * and delegates the responsibility to renderListItemDivider() and renderListItemView() based on the
     * given list view configuration.
     *
     * @private
     */
    renderUpdate: function() {

        /* Remove all list items if the removeItemsOnUpdate property is set to YES */
        if(this.removeItemsOnUpdate) {
            this.removeAllItems();
        }

        /* Save this in variable that for later use within an other scope (e.g. _each()) */
        var that = this;

        /* Get the list view's content as an object from the assigned content binding */
        var content = eval(this.contentBinding);

        /* Get the list view's template view for each list item */
        var templateView = this.listItemTemplateView;

        /* If there is an items property, re-assign this to content, otherwise iterate through content itself */
        if(this.items) {
            content = content[this.items];
        }

        if(this.isDividedList) {
            _.each(content, function(items, divider) {
                that.renderListItemDivider(divider);
                that.renderListItemView(items, templateView);
            });
        } else {
            this.renderListItemView(content, templateView);
        }

        /* Finally let the whole list look nice */
        this.themeUpdate();
    },

    /**
     * Renders a list item divider based on a string given by its only parameter.
     *
     * @param {String} name The name of the list divider to be rendered.
     * @private
     */
    renderListItemDivider: function(name) {
        var obj = M.ListItemView.design({});
        obj.value = name;
        obj.isDivider = YES,
        this.addItem(obj.render());
        obj.theme();
    },

    /**
     * This method renders list items based on the passed parameters.
     *
     * @param {Array} content The list items to be rendered.
     * @param {M.ListItemView} templateView The template for for each list item.
     * @private
     */
    renderListItemView: function(content, templateView) {
        /* Save this in variable that for later use within an other scope (e.g. _each()) */
        var that = this;

        _.each(content, function(item) {

            /* Create a new object for the current template view */
            var obj = templateView.design({});

            /* If item is a model, assign the model's id to the view's modelId property */
            if(item.type === 'M.Model') {
                obj.modelId = item.m_id;
            /* Otherwise, if there is an id property, save this automatically to have a reference */
            } else if(item.id) {
                obj.modelId = item.id;
            }

            /* Get the child views as an array of strings */
            var childViewsArray = obj.childViews.split(' ');

            /* If the item is a model, read the values from the 'record' property instead */
            var record = item.type === 'M.Model' ? item.record : item;

            /* Iterate through all views defined in the template view */
            for(var i in childViewsArray) {
                /* Create a new object for the current view */
                obj[childViewsArray[i]] = obj[childViewsArray[i]].design({});

                var regexResult = null;
                if(obj[childViewsArray[i]].computedValue) {
                    /* This regex looks for a variable inside the template view (<%= ... %>) ... */
                    regexResult = /^<%=\s+([.|_|-|$|�|a-zA-Z]+[0-9]*[.|_|-|$|�|a-zA-Z]*)\s*%>$/.exec(obj[childViewsArray[i]].computedValue.valuePattern);
                } else {
                    regexResult = /^<%=\s+([.|_|-|$|�|a-zA-Z]+[0-9]*[.|_|-|$|�|a-zA-Z]*)\s*%>$/.exec(obj[childViewsArray[i]].valuePattern);
                }

                /* ... if a match was found, the variable is replaced by the corresponding value inside the record */
                if(regexResult) {
                    switch (obj[childViewsArray[i]].type) {
                        case 'M.LabelView':
                        case 'M.ButtonView':
                        case 'M.ImageView':
                            obj[childViewsArray[i]].value = record[regexResult[1]];
                            break;
                    }
                }
            }

            /* If edit mode is on, render a delete button */
            if(that.inEditMode) {
                obj.inEditMode = that.inEditMode;
                obj.deleteButton = obj.deleteButton.design({
                    modelId: obj.modelId,
                    target: that.editOptions.target,
                    action: that.editOptions.action
                });
            }

            /* set the list view as 'parent' for the current list item view */
            obj.listView = that;

            /* Add the current list view item to the list view ... */
            that.addItem(obj.render());

            /* ... once it is in the DOM, make it look nice */
            for(var i in childViewsArray) {
                obj[childViewsArray[i]].theme();
            }
        });
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the list view.
     *
     * @private
     */
    theme: function() {
        $('#' + this.id).listview();
        if(this.searchBar) {
            this.searchBar.theme();
        }
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to re-style the list view.
     *
     * @private
     */
    themeUpdate: function() {
        $('#' + this.id).listview('refresh');
    },

    /**
     * This method activates the edit mode and forces the list view to re-render itself
     * and to display a remove button for every list view item.
     *
     * @param {Object} options The options for the remove button.
     */
    toggleRemove: function(options) {
        if(eval(this.contentBinding)) {
            this.inEditMode = !this.inEditMode;
            this.editOptions = options;
            this.renderUpdate();
        }
    },

    /**
     * This method activates a list item by applying the default 'isActive' css style to its
     * DOM representation.
     *
     * @param {String} listItemId The id of the list item to be set active.
     */
    setActiveListItem: function(listItemId) {
        $('#' + this.id).find('li').each(function() {
            var listItem = M.ViewManager.getViewById($(this).attr('id'));
            listItem.removeCssClass('ui-btn-active');
        });
        M.ViewManager.getViewById(listItemId).addCssClass('ui-btn-active')
    },

    /**
     * Applies some style-attributes to the list view.
     *
     * @private
     * @returns {String} The list's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.isDividedList && this.cssClassForDivider) {
            html += ' data-dividertheme="' + this.cssClassForDivider + '"';
        }
        if(this.isInset) {
            html += ' data-inset="true"';
        }
        if(this.isCountedList && this.cssClassForCounter) {
            html += ' data-counttheme="' + this.cssClassForCounter + '"';
        }
        if(this.cssClassForSplitView) {
            html += ' data-splittheme="' + this.cssClassForSplitView + '"';
        }
        if(this.hasSearchBar && this.usesDefaultSearchBehaviour) {
            html += ' data-filter="true"';
        }
        return html;
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      30.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * M.SelectionListItemView defines the prototype of any selection list item. It can only be used
 * as a child view for a selection list view.
 *
 * @extends M.View
 */
M.SelectionListItemView = M.View.extend(
/** @scope M.SelectionListItemView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.SelectionListItemView',

    /**
     * This property can be used to specify a label for a selection list item. If
     * set, the label will be displayed instead of the value, so you can use the
     * item's value as an internal value.
     *
     * E.g. if you use a selection list to select a color, you could set an item's
     * value to '#FF0000' but its label to 'Red'. If there is no label specified,
     * the value is displayed instead.
     *
     * @type String
     */
    label: null,

    /**
     * This property states whether a selection list item is selected or not.
     *
     * @type Boolean
     */
    isSelected: NO,

    /**
     * Renders a selection list item.
     * 
     * @private
     * @returns {String} The selection list item view's html representation.
     */
    render: function() {
        if(this.parentView && this.parentView.selectionMode === M.SINGLE_SELECTION_DIALOG) {
            this.html += '<option id="' + this.id + '" value="' + this.value + '"';

            if((!this.parentView.initialText && this.isSelected && typeof(this.isSelected) === 'boolean') || (this.isSelected === String(YES))) {
                if(!this.parentView.selection) {
                    this.html += ' selected="selected"';
                    this.parentView.selection = this;
                }
            }

            this.html += '>';
            
            this.html += this.label ? this.label : this.value;

            this.html += '</option>';
        } else {
            this.html += '<input type="' + this.parentView.selectionMode + '" ';

            if(!this.applyTheme || !this.parentView.applyTheme) {
                this.html += 'data-role="none" ';
            }            

            this.html +=  'name="' + (this.parentView.name ? this.parentView.name : this.parentView.id);

            this.html += '" id="' + this.id + '"';

            if((this.isSelected && typeof(this.isSelected) === 'boolean') || (this.isSelected === String(YES))) {
                if(this.parentView.selectionMode === M.SINGLE_SELECTION) {
                    if(!this.parentView.selection) {
                        this.html += ' checked="checked"';
                        this.parentView.selection = this;
                    }
                } else {
                    this.html += ' checked="checked"';

                    if(!this.parentView.selection) {
                        this.parentView.selection = [];
                    }
                    this.parentView.selection.push(this);
                }
            }

            this.html += '/>';
            this.html += '<label for="' + this.id + '">' + (this.label ? this.label : this.value) + '</label>';
        }

        return this.html;
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the selection list item.
     *
     * @private
     */
    theme: function() {
        if(this.parentView && !this.parentView.isInsideFormView && this.applyTheme && this.parentView.applyTheme) {
            $('#' + this.id).checkboxradio();
        }
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      30.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for single selection mode.
 *
 * @type String
 */
M.SINGLE_SELECTION = 'radio';

/**
 * A constant value for multiple selection mode.
 *
 * @type String
 */
M.MULTIPLE_SELECTION = 'checkbox';

/**
 * A constant value for single selection mode in a dialog / popup.
 *
 * @type String
 */
M.SINGLE_SELECTION_DIALOG = 'select';

m_require('ui/selection_list_item.js');

/**
 * @class
 *
 * This defines the prototype of any selection list view. A selection list view displays
 * a list with several items of which either only one single item (M.SINGLE_SELECTION /
 * M.SINGLE_SELECTION_DIALOG) or many items (M.MULTIPLE_SELECTION) can be selected.
 *
 * @extends M.View
 */
M.SelectionListView = M.View.extend(
/** @scope M.SelectionListView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.SelectionListView',

    /**
     * Determines whether to remove all item if the list is updated or not.
     *
     * @type Boolean
     */
    removeItemsOnUpdate: YES,

    /**
     * The selection mode for this selection list. This can either be single or
     * multiple selection. To set this value use one of the three constants:
     *
     * - M.SINGLE_SELECTION
     *
     *   This selection mode will render a selection list with several list items
     *   of which only one can be selected. Whenever a new item is selected, the
     *   previously selected item automatically gets de-selected. This selection
     *   mode's behaviour is equivalent to the plain HTML's radio button.
     *
     *
     * - M.SINGLE_SELECTION_DIALOG
     *
     *   This selection mode will render a selection list equivalent to the plain
     *   HTML's select menu. Only the currently selected item will be visible, and
     *   by clicking on this item, the selection list will be displayed in a dialog
     *   respectively a popup view. By selecting on of the items, this popup will
     *   automatically close and the selected value will be displayed.
     *
     *
     * - M.MULTIPLE_SELECTION
     *
     *   This selection mode will render a selection list with several list items
     *   of which all be selected. So the selection of a new item doesn't lead to
     *   automatic de-selected of previously selected items. This selection mode's
     *   behaviour is equivalent to the plain HTML's checkboxes.
     *
     * @type String
     */
    selectionMode: M.SINGLE_SELECTION,

    /**
     * This property is used to define a method that is executed onSelect of an
     * item of this selection list.
     *
     * @type Object
     */
    onSelect: null,

    /**
     * The selected item(s) of this list.
     *
     * @type String, Array
     */
    selection: null,
    
    /**
     * This property is used to specify an initial value for the selection list if
     * it is running in 'single selection dialog' (M.SINGLE_SELECTION_DIALOG) mode.
     * This value is then displayed at startup. You would typically use this e.g. to
     * specify something like: 'Please select...'.
     *
     * As long as this initial value is 'selected', the getSelection() of this selection
     * list will return nothing. Once a 'real' option is selected, this value is
     * removed from the selection list.
     *
     * Note: This property currently doesn't support non-themed selection lists (see the
     * applyTheme property).
     *
     * @type String
     */
    initialText: null,

    /**
     * The label proeprty defines a text that is shown above or next to the selection list as a 'title'
     * for the selection list. e.g. "Name:". If no label is specified, no label will be displayed.
     *
     * @type String
     */
    label: null,

    /**
     * Determines whether to display the selection list grouped with the label specified with the label property.
     * If set to YES, the selection list and its label are wrapped in a container and styled as a unit 'out of
     * the box'. If set to NO, custom styling could be necessary.
     *
     * @type Boolean
     */
    isGrouped: NO,

    /**
     * Renders a selection list.
     *
     * @private
     * @returns {String} The selection list view's html representation.
     */
    render: function() {

        this.html += '<div id="' + this.id + '_container"';

        if(this.isGrouped) {
            this.html += ' data-role="fieldcontain"';
        }

        if(this.cssClass) {
            this.html += ' class="';
            var cssClasses = $.trim(this.cssClass).split(' ');            
            for(var i in cssClasses) {
                this.html += (i > 0 ? ' ' : '') + cssClasses[i] + '_container';
            }
            this.html += '"';
        }

        this.html += '>';

        if(this.selectionMode === M.SINGLE_SELECTION_DIALOG) {
            
            if(this.label) {
                this.html += '<label for="' + this.id + '">' + this.label + '</label>';
            }

            this.html += '<select ';

            if(!this.applyTheme) {
                this.html += 'data-role="none" ';

            }

            this.html += 'id="' + this.id + '"' + this.style() + ' onchange="M.EventDispatcher.onClickEventDidHappen(\'click\', \'' + this.id + '\');">';

            this.renderChildViews();

            this.html += '</select>';

            /* set internal action for select-menu to get informed if the selected item did change */
            this.internalTarget = this;
            this.internalAction = 'itemSelected';

        } else {

            this.html += '<fieldset ';

            if(!this.applyTheme) {
                this.html += 'data-role="none" ';
            } else {
                this.html += 'data-role="controlgroup" ';
            }
            this.html += 'id="' + this.id + '">';

            if(this.label) {
                this.html += '<legend>' + this.label + '</legend>';
            }

            this.renderChildViews();

            this.html += '</fieldset>';

        }

        this.html += '</div>';

        return this.html;
    },

    /**
     * Triggers render() on all children of type M.ButtonView based on the specified
     * selection mode (single or multiple selection).
     *
     * @private
     */
    renderChildViews: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');

            for(var i in childViews) {
                var view = this[childViews[i]];
                if(view.type === 'M.SelectionListItemView') {
                    view.parentView = this;
                    view.internalTarget = this;
                    view.internalAction = 'itemSelected';
                    this.html += view.render();
                } else {
                    M.Logger.log('Invalid child views specified for SelectionListView. Only SelectionListItemViews accepted.', M.WARN);
                }
            }
        } else if(!this.contentBinding) {
            M.Logger.log('No SelectionListItemViews specified.', M.WARN);
        }
    },

    /**
     * This method adds a new selection list item to the selection list view by simply appending
     * its html representation to the selection list view inside the DOM. This method is based
     * on jQuery's append().
     *
     * @param {String} item The html representation of a selection list item to be added.
     */
    addItem: function(item) {
        $('#' + this.id).append(item);
    },

    /**
     * This method removes all of the selection list view's items by removing all of its content in
     * the DOM. This method is based on jQuery's empty().
     */
    removeAllItems: function() {
        $('#' + this.id).empty();
    },

    /**
     * Updates the the selection list view by re-rendering all of its child views, respectively its
     * item views.
     *
     * @private
     */
    renderUpdate: function() {
        if(this.removeItemsOnUpdate || this.selectionMode === M.SINGLE_SELECTION_DIALOG) {
            this.removeAllItems();

            if(this.label && !(this.selectionMode === M.SINGLE_SELECTION_DIALOG)) {
                this.addItem('<legend>' + this.label + '</legend>');
            } else if(this.selectionMode === M.SINGLE_SELECTION_DIALOG) {
                if(this.label) {
                    //this.addItem('<label for="' + this.id + '">' + this.label + '</label>');
                }
                //this.addItem('<select id="' + this.id + '" onchange="M.EventDispatcher.onClickEventDidHappen(\'click\', \'' + this.id + '\');"></select>');
            }
        }
        
        if(this.contentBinding) {
            var items = eval(this.contentBinding);
            for(var i in items) {
                var item  = items[i];
                var obj = null;
                if(this.selectionMode === M.SINGLE_SELECTION_DIALOG) {
                    obj = M.SelectionListItemView.design({
                        value: item.value ? item.value : item,
                        label: item.label ? item.label : (item.value ? item.value : item),
                        parentView: this
                    });
                } else {
                    obj = M.SelectionListItemView.design({
                        value: item.value,
                        label: item.label,
                        name: item.name,
                        isSelected: item.isSelected,
                        parentView: this,
                        internalTarget: this,
                        internalAction: 'itemSelected'
                    });
                }

                this.addItem(obj.render());
            }
            this.themeUpdate();
        }
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the selection list.
     *
     * @private
     */
    theme: function() {
        if(this.selectionMode === M.SINGLE_SELECTION_DIALOG && this.applyTheme) {
            $('#' + this.id).selectmenu();
            if(this.initialText) {
                $('#' + this.id + '-button').find('span.ui-btn-text').html(this.initialText);
            }
        } else if(this.selectionMode !== M.SINGLE_SELECTION_DIALOG && this.applyTheme) {
            $('#' + this.id).controlgroup();
        }
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the selection list.
     *
     * @private
     */
    themeUpdate: function() {
        if(this.selectionMode === M.SINGLE_SELECTION_DIALOG && this.applyTheme) {
            $('#' + this.id).selectmenu('refresh');
            if(this.initialText) {
                $('#' + this.id + '-button').find('span.ui-btn-text').html(this.initialText);
            }
        } else if(this.selectionMode !== M.SINGLE_SELECTION_DIALOG) {
            $('#' + this.id).controlgroup();
        }
    },

    /**
     * Method to append css styles inline to the rendered selection list.
     *
     * @private
     * @returns {String} The selection list's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    },

    /**
     * This method is called everytime a item is selected / clicked. If the selected item
     * changed, the defined onSelect action is triggered.
     *
     * @param {String} id The id of the selected item.
     */
    itemSelected: function(id) {
        var item = this.selectionMode === M.SINGLE_SELECTION_DIALOG ? M.ViewManager.getViewById($('#' + this.id + ' :selected').attr('id')) : M.ViewManager.getViewById(id);

        if(this.selectionMode === M.SINGLE_SELECTION || this.selectionMode === M.SINGLE_SELECTION_DIALOG) {
            if(!_.isEqual(item, this.selection)) {
                this.selection = item;
                if(this.onSelect && this.onSelect.target && this.onSelect.action) {
                    this.onSelect.target[this.onSelect.action]();
                }
            }
        } else {        
            if(!this.selection) {
                this.selection = [];
            }

            if($('#' + id + ':checked').length > 0) {
                this.selection.push(item);
            } else {
                this.selection = _.select(this.selection,  function(i) {
                    return i !== item;
                });
            }

            if(this.onSelect && this.onSelect.target && this.onSelect.action) {
                this.onSelect.target[this.onSelect.action]();
            }
        }
    },

    /**
     * This method returns the selected item's value(s) either as a String (M.SINGLE_SELECTION)
     * or as an Array (M.MULTIPLE_SELECTION).
     *
     * @param {Boolean} returnObject Determines whether to return the selected item(s) as object or not.
     * @returns {String, Object, Array} The selected item's value(s).
     */
    getSelection: function(returnObject) {
        if(this.selectionMode === M.SINGLE_SELECTION || this.selectionMode === M.SINGLE_SELECTION_DIALOG) {
            if(this.selection) {
                if(returnObject) {
                    return this.selection;
                } else {
                    return this.selection.value;
                }
            }
        } else {
            if(this.selection) {
                var selection = [];
                _.each(this.selection, function(item) {
                    if(returnObject) {
                        selection.push(item);
                    } else {
                        selection.push(item.value);
                    }
                });
                return selection;
            }
        }
    },

    /**
     * This method can be used to select items programmatically. The given parameter can either
     * be a String (M.SINGLE_SELECTION) or an Array (M.MULTIPLE_SELECTION).
     *
     * @param {String, Array} selection The selection that should be applied to the selection list.
     */
    setSelection: function(selection) {
        var that = this;
        if(this.selectionMode === M.SINGLE_SELECTION && typeof(selection) === 'string') {
            $('#' + this.id).find('input').each(function() {
                var item = M.ViewManager.getViewById($(this).attr('id'));
                if(item.value === selection) {
                    that.removeSelection();
                    item.isSelected = YES;
                    that.selection = item;
                    $(this).attr('checked', 'checked');
                    if(that.applyTheme) {
                        $(this).siblings('label:first').addClass('ui-btn-active');
                        $(this).siblings('label:first').find('span .ui-icon-radio-off').addClass('ui-icon-radio-on');
                        $(this).siblings('label:first').find('span .ui-icon-radio-off').removeClass('ui-icon-radio-off');
                    }
                }
            });
        } else if(this.selectionMode === M.SINGLE_SELECTION_DIALOG && typeof(selection) === 'string') {
            if(this.applyTheme) {
                $('#' + this.id).find('option').each(function() {
                    var item = M.ViewManager.getViewById($(this).attr('id'));
                    if(item.value === selection) {
                        that.removeSelection();
                        item.isSelected = YES;
                        that.selection = item;
                        $('#' + that.id).val(item.value);
                        if(that.initialText && $('#' + that.id + '-button').find('span.ui-btn-text').html() === that.initialText) {
                            $('#' + that.id + '-button').find('span.ui-btn-text').html(item.label ? item.label : item.value);
                        }
                    }
                });
                this.initialText = null;
                $('#' + this.id).selectmenu('refresh');
            } else {
                $('#' + this.id).find('option').each(function() {
                    var item = M.ViewManager.getViewById($(this).attr('id'));
                    if(item.value === selection) {
                        item.isSelected = YES;
                        that.selection = item;
                        $(this).attr('selected', 'selected');
                    } else {
                        item.isSelected = NO;
                        $(this).attr('selected', '');
                    }
                });
            }
        } else if(typeof(selection) === 'object') {
            var removedItems = NO;
            $('#' + this.id).find('input').each(function() {
                var item = M.ViewManager.getViewById($(this).attr('id'));
                for(var i in selection) {
                    var selectionItem = selection[i];
                    if(item.value === selectionItem) {
                        if(!removedItems) {
                            that.removeSelection();
                            removedItems = YES;
                        }
                        item.isSelected = YES;
                        that.selection.push(item);
                        $(this).attr('checked', 'checked');
                        if(that.applyTheme) {
                            $(this).siblings('label:first').addClass('ui-btn-active');
                            $(this).siblings('label:first').find('span .ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
                            $(this).siblings('label:first').find('span .ui-icon-checkbox-off').removeClass('ui-icon-checkbox-off');
                        }
                    }
                }
            });
        }
        that.theme();
    },

    /**
     * This method de-selects all of the selection list's items.
     */
    removeSelection: function() {
        var that = this;
        var type = null;
        if(this.selectionMode === M.SINGLE_SELECTION || this.selectionMode === M.SINGLE_SELECTION_DIALOG) {
            this.selection = null;

            if(this.selectionMode === M.SINGLE_SELECTION) {
                type = 'radio';
            } else {
                type = 'select';
            }
        } else {
            this.selection = [];
            type = 'checkbox';
        }
        
        if(type !== 'select'){
            $('#' + this.id).find('input').each(function() {
                var item = M.ViewManager.getViewById($(this).attr('id'));
                item.isSelected = NO;
                $(this).removeAttr('checked');
                if(that.applyTheme) {
                    $(this).siblings('label:first').removeClass('ui-btn-active');
                    $(this).siblings('label:first').find('span .ui-icon-' + type + '-on').addClass('ui-icon-' + type + '-off');
                    $(this).siblings('label:first').find('span .ui-icon-' + type + '-on').removeClass('ui-icon-' + type + '-on');
                }
            });
        } else if(type === 'select') {
            $('#' + this.id).find('option').each(function() {
                var item = M.ViewManager.getViewById($(this).attr('id'));
                item.isSelected = NO;
            });
        }
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      16.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * The is the prototype of any tab bar view. A tab bar view is a special variant of a toolbar
 * at the top or bottom of a page, that consists of up to five horizontally aligned tabs. An
 * M.TabBarView can be used the top navigation level for an application since it is always
 * visible an indicates the currently selected tab.
 *
 */
M.TabBarView = M.View.extend(
/** @scope M.TabBarView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.TabBarView',
    
     /**
     * Defines the position of the TabBar. Possible values are:
     *
     * - M.BOTTOM => is a footer tab bar
     * - M.TOP => is a header tab bar
     * - null / not set ==> a tab bar outside header / footer
     *
     * @type String
     */
    anchorLocation: null,

    /**
     * This property defines the tab bar's name. This is used internally to identify
     * the tab bar inside the DOM.
     *
     * @type String
     */
    name: 'tab_bar',

    /**
     * This property holds a reference to the currently active tab.
     *
     * @type M.TabBarItemView
     */
    activeTab: null,

    /**
     * Renders a tab bar as an unordered list.
     *
     * @private
     * @returns {String} The tab bar view's html representation.
     */
    render: function() {
        if(!this.html) {
            this.html = '';

            if(this.anchorLocation) {
                this.html += '<div id="' + this.id + '" data-id="' + this.name + '" data-role="' + this.anchorLocation + '" data-position="fixed"><div data-role="navbar"><ul>';
            } else {
                this.html += '<div data-role="navbar" id="' + this.id + '" data-id="' + this.name + '"><ul>';
            }

            this.renderChildViews();

            this.html += '</ul></div>';

            if(this.anchorLocation) {
                this.html += '</div>';
            }
        }
        return this.html;
    },

    /**
     * Triggers render() on all children of type M.TabBarItemView.
     *
     * @private
     */
    renderChildViews: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');

            /* pre-process the child views to define which tab is selected */
            var hasActiveTab = NO;
            for(var i in childViews) {
                var view = this[childViews[i]];
                if(view.type === 'M.TabBarItemView' && view.isActive) {
                    if(!hasActiveTab) {
                        hasActiveTab = YES;
                        this.activeTab = view;
                    } else {
                        view.isActive = NO;
                    }
                }
            }

            var numTabBarViews = 0;
            for(var i in childViews) {
                var view = this[childViews[i]];
                if(view.type === 'M.TabBarItemView') {
                    numTabBarViews = numTabBarViews + 1;

                    /* set first tab to active tab if nothing else specified */
                    if(numTabBarViews === 1 && !hasActiveTab) {
                        view.isActive = YES;
                        this.activeTab = view;
                    }

                    view.parentView = this;
                    this.html += view.render();
                } else {
                    M.Logger.log('Invalid child views specified for TabBarView. Only TabBarItemViews accepted.', M.WARN);
                }
            }
        } else {
            M.Logger.log('No TabBarItemViews specified.', M.WARN);
            return;
        }
    },

    /**
     * This method visually activates a tab bar item based on a given page.
     *
     * @param {M.TabBarItemView} tab The tab to set active.
     */
    setActiveTab: function(tab) {
        /* deactivate current active tav */
        this.activeTab.isActive = NO;
        var that = this;
        $('[data-id="' + this.name + '"]').each(function() {
            $(this).find('#' + that.activeTab.id).removeClass('ui-btn-active');
        });

        /* activate new tab */
        tab.isActive = YES;
        $('[data-id="' + this.name + '"]').each(function() {
            $(this).find('#' + tab.id).addClass('ui-btn-active');
        });

        /* store active tab in tab bar */
        this.activeTab = tab;
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      16.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * This defines the prototype of any tab bar item view. An M.TabBarItemView can only be
 * used as a child view of a tab bar view.
 *
 * @extends M.View
 */
M.TabBarItemView = M.View.extend(
/** @scope M.TabBarItemView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.TabBarItemView',

    /**
     * Determines whether this TabBarItem is active or not.
     *
     * @type Boolean
     */
    isActive: NO,

    /**
     * This property is used to specify an internal target for an automatically called action. This
     * is used to trigger the switchPage() by clicking on a tab bar item.
     *
     * @type Object
     */
    internalTarget: null,

    /**
     * This property is used to specify an internal action for an automatically called action. This
     * is used to trigger the switchPage() by clicking on a tab bar item.
     *
     * @type Object
     */
    internalAction: 'switchPage',

    /**
     * Renders a tab bar item as a li-element inside of a parent tab bar view.
     *
     * @private
     * @returns {String} The button view's html representation.
     */
    render: function() {
        this.html += '<li><a id="' + this.id + '"' + this.style() + ' href="#">' + this.value + '</a></li>';

        this.internalTarget = this;
        
        return this.html;
    },

    /**
     * This method is automatically called if a tab bar item is clicked. It delegates the
     * page switching job to M.Controller's switchToTab().
     */
    switchPage: function() {
        if(this.page) {
            M.Controller.switchToTab(this);
        } else {
            this.parentView.setActiveTab(this);
        }
    },

    /**
     * Applies some style-attributes to the tab bar item.
     *
     * @private
     * @returns {String} The tab bar item's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        if(this.isActive) {
            html += html != '' ? '' : ' class="';
            html += 'ui-btn-active';
            html += '"';
        }
        if(this.icon) {
            html += ' data-icon="';
            html += this.icon;
            html += '" data-iconpos="top"';
        }
        return html;
    }
    
});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * M.TextFieldView is the prototype of any text field input view. It can be rendered as both
 * a single line text field and a multiple line text field. If it is styled as a multiple
 * line text field, is has a built-in autogrow mechanism so the textfield is getting larger
 * depending on the number of lines of text a user enters.
 *
 * @extends M.View
 */
M.TextFieldView = M.View.extend(
/** @scope M.TextFieldView.prototype */ {

   /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.TextFieldView',

   /**
    * The name of the text field. During the rendering, this property gets assigned to the name
    * property of the text field's html representation. This can be used to manually access the
    * text field's DOM representation later on.
    *
    * @type String
    */
    name: null,

    /**
     * The label proeprty defines a text that is shown above or next to the textfield as a 'title'
     * for the textfield. e.g. "Name:". If no label is specified, no label will be displayed.
     *
     * @type String
     */
    label: null,

    /**
     * The initial text shown inside the text field describing the input or making a suggestion for input
     * e.g. "Please enter your Name."
     *
     * @type String
     */
    initialText: '',

    /**
     * Determines whether to display the textfield grouped with the label specified with the label property.
     * If set to YES, the textfield and its label are wrapped in a container and styled as a unit 'out of
     * the box'. If set to NO, custom styling could be necessary.
     *
     * @type Boolean
     */
    isGrouped: YES,

    /**
     * Defines whether the text field is rendered as an password field or not.
     *
     * @type Boolean
     */
    isPassword: NO,

    /**
     * Defines whether the text field has multiple lines respectively is a text area.
     *
     * @type Boolean
     */
    hasMultipleLines: NO,

    /**
     * Renders a TextFieldView
     * 
     * @private
     * @returns {String} The text field view's html representation.
     */
    render: function() {
        this.html += '<div';

        if(this.isGrouped) {
            this.html += ' data-role="fieldcontain"';
        }

        if(this.cssClass) {
            this.html += ' class="' + this.cssClass + '_container"';
        }

        this.html += '>';

        if(this.label) {
            this.html += '<label for="' + (this.name ? this.name : this.id) + '">' + this.label + '</label>';
        }

        var type = this.isPassword ? 'password' : 'text';

        if(this.hasMultipleLines) {
            this.html += '<textarea cols="40" rows="8" name="' + (this.name ? this.name : this.id) + '" id="' + this.id + '"' + this.style() + '>' + (this.value ? this.value : this.initialText) + '</textarea>';
            
        } else {
            this.html += '<input type="' + type + '" name="' + (this.name ? this.name : this.id) + '" id="' + this.id + '"' + this.style() + ' value="' + (this.value ? this.value : this.initialText) + '" />';
        }

        this.html += '</div>';

        return this.html;
    },

    /**
     * Updates a TextFieldView with DOM access by jQuery.
     *
     * @private
     */
    renderUpdate: function() {
        $('#' + this.id).val(this.value);
        this.styleUpdate();
    },

    /**
     * This method is called whenever the view gets the focus.
     * If there is a initial text specified and the value of this text field
     * still equals this initial text, the value is emptied.
     */
    gotFocus: function() {
        if(this.initialText && (!this.value || this.initialText === this.value)) {
            this.setValue('');
            if(this.cssClassOnInit) {
                this.removeCssClass(this.cssClassOnInit);
            }
        }
        this.hasFocus = YES;
    },

    /**
     * This method is called whenever the view lost the focus.
     * If there is a initial text specified and the value of this text field
     * is empty, the value is set to the initial text.
     */
    lostFocus: function() {
        if(this.initialText && !this.value) {
            this.setValue(this.initialText, NO);
            this.value = '';
            if(this.cssClassOnInit) {
                this.addCssClass(this.cssClassOnInit);
            }
        }
        this.hasFocus = NO;
    },

    /**
     * Method to append css styles inline to the rendered text field.
     *
     * @private
     * @returns {String} The text field's styling as html representation.
     */
    style: function() {
        var html = ' style="';
        if(this.isInline) {
            html += 'display:inline;';
        }
        if(!this.isEnabled) {
            html += 'disabled:disabled;';
        }
        html += '"';
        
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }

        return html;
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the text field.
     *
     * @private
     */
    theme: function() {
        if(this.initialText && !this.value && this.cssClassOnInit) {
            this.addCssClass(this.cssClassOnInit);
        }
    },

    /**
     * Method to append css styles inline to the rendered view on the fly.
     *
     * @private
     */
    styleUpdate: function() {
        if(this.isInline) {
            $('#' + this.id).attr('display', 'inline');
        } else {
            $('#' + this.id).removeAttr('display');
        }

        if(!this.isEnabled) {
            $('#' + this.id).attr('disabled', 'disabled');
        } else {
            $('#' + this.id).removeAttr('disabled');
        }
    },

    /**
     * This method sets its value to the value it has in its DOM representation
     * and then delegates these changes to a controller property if the
     * contentBindingReverse property is set.
     *
     * Additionally call target / action if set.
     *
     * @param {Object} evt The event triggered this method.
     */
    setValueFromDOM: function(evt) {
        this.value = this.secure($('#' + this.id).val());
        this.delegateValueUpdate();

        if((evt === 'change' && this.triggerActionOnChange || evt === 'keyup' && this.triggerActionOnKeyUp) && this.target && this.action) {
            this.target[this.action](this.value);
        }
    },

    /**
     * This method sets the text field's value, initiates its re-rendering
     * and call the delegateValueUpdate().
     *
     * @param {String} value The value to be applied to the text field view.
     * @param {Boolean} delegateUpdate Determines whether to delegate this value update to any observer or not.
     */
    setValue: function(value, delegateUpdate) {
        this.value = value;
        this.renderUpdate();

        if(delegateUpdate) {
            this.delegateValueUpdate();
        }
    },

    /**
     * This method disables the text field by setting the disabled property of its
     * html representation to true.
     */
    disable: function() {
        this.isEnabled = NO;
        this.renderUpdate();
    },

    /**
     * This method enables the text field by setting the disabled property of its
     * html representation to false.
     */
    enable: function() {
        this.isEnabled = YES;
        this.renderUpdate();
    },

    /**
     * This method clears the text field's value, both in the DOM and within the JS object.
     */
    clearValue: function() {
        this.setValue('');
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      09.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * M.ToggleView defines the prototype of any toggle view. A toggle view accepts exactly
 * two child views and provides an easy mechanism to toggle between these two views. An
 * easy example would be to define two different button views that can be toggled, a more
 * complex scenario would be to define two content views (M.ScrollView) with own child views
 * and toggle between them.
 *
 * @extends M.View
 */
M.ToggleView = M.View.extend(
/** @scope M.ToggleView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ToggleView',

    /**
     * States whether the toggle view currently displays its first child view or its second
     * child view.
     *
     * @type Boolean
     */
    isInFirstState: YES,

    /**
     * Determines whether to toggle the view on click. This might be useful if the child views
     * are e.g. buttons.
     *
     * @type Boolean
     */
    toggleOnClick: NO,

    /**
     * Renders a ToggleView and its child views.
     *
     * @private
     * @returns {String} The toggle view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '">';

        this.renderChildViews();

        this.html += '</div>';
        
        return this.html;
    },

    /**
     * This method renders one child view of the toggle view, based on the isInFirstState
     * property: YES = first child view, NO = second child view.
     */
    renderChildViews: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            var childViewIndex = this.isInFirstState ? 0 : 1;

            if(this[childViews[childViewIndex]]) {
                if(this.toggleOnClick) {
                    this[childViews[childViewIndex]].internalTarget = this;
                    this[childViews[childViewIndex]].internalAction = 'toggleView';
                }
                this.html += this[childViews[childViewIndex]].render();
            } else {
                M.Logger.log('Please make sure that there are two child views defined for the toggle view!', M.WARN);
            }
        }
    },

    /**
     * This method is called out of the toggleView method. It basically empties the html
     * representation of the toggle view and then renders the proper child view based on
     * the isInFirstState property: YES = first child view, NO = second child view.
     */
    renderUpdateChildViews: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            var childViewIndex = this.isInFirstState ? 0 : 1;

            if(this[childViews[childViewIndex]]) {
                if(this.toggleOnClick) {
                    this[childViews[childViewIndex]].internalTarget = this;
                    this[childViews[childViewIndex]].internalAction = 'toggleView';
                }
                this[childViews[childViewIndex]].clearHtml();
                return this[childViews[childViewIndex]].render();
            } else {
                M.Logger.log('Please make sure that there are two child views defined for the toggle view!', M.WARN);
            }
        }
    },

    /**
     * This method toggles the child views by first emptying the toggle view's content
     * and then rendering the next child view by calling renderUpdateChildViews().
     */
    toggleView: function() {
        this.isInFirstState = !this.isInFirstState;
        $('#' + this.id).empty();
        $('#' + this.id).html(this.renderUpdateChildViews());
        this.theme();
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the toggle view respectively
     * its child views.
     *
     * @private
     */
    theme: function() {
        this.themeChildViews();
    }

});// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for the anchor location: top.
 *
 * @type String
 */
M.TOP = 'header';

/**
 * A constant value for the anchor location: bottom.
 *
 * @type String
 */
M.BOTTOM = 'footer';

/**
 * A constant value for the anchor location: left.
 *
 * @type Number
 */
M.LEFT = 0;

/**
 * A constant value for the anchor location: center.
 *
 * @type Number
 */
M.CENTER = 1;

/**
 * A constant value for the anchor location: right.
 *
 * @type Number
 */
M.RIGHT = 2;

/**
 * @class
 *
 * The root object for ToolbarViews.
 *
 * @extends M.View
 */
M.ToolbarView = M.View.extend(
/** @scope M.ToolbarView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ToolbarView',

     /**
     * Defines the position of the TabBar. Possible values are:
     *
     * - M.BOTTOM => is a footer bar
     * - M.TOP => is a header bar
     *
     * @type String
     */
    anchorLocation: M.TOP,

    /**
     * Determines whether to display an auto-generated back-button on the left side
     * of the toolbar view or not.
     *
     * @type Boolean
     */
    showBackButton: NO,

    /**
     * This property determines whether to fix the toolbar to the top / bottom of a
     * page. By default this is set to YES.
     *
     * @type Boolean
     */
    isFixed: YES,

    /**
     * Renders a toolbar as a div tag with corresponding data-role attribute and inner
     * h1 child tag (representing the title of the header)
     *
     * @private
     * @returns {String} The toolbar view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '" data-backbtn="' + this.showBackButton + '" data-role="' + this.anchorLocation + '"' + this.style();

        if(this.isFixed) {
            this.html += ' data-position="fixed"';
        }

        this.html += '>';

        this.renderChildViews();

        this.html += '</div>';

        return this.html;
    },

    /**
     * Triggers render() on all children or simply display the value as a label,
     * if it is set.
     */
    renderChildViews: function() {
        if(this.value) {
            this.html += '<h1>' + this.value + '</h1>';
        } else if (this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');

            /* A ToolbarView accepts only 3 childViews, one for each location: left, center, right */
            if(childViews.length > 3) {
                M.Logger.log('To many childViews defined for toolb  arView.', M.WARN);
                return;
            }

            for(var i in childViews) {
                var view = this[childViews[i]];
                switch (view.anchorLocation) {
                    case M.LEFT:
                        this.html += '<div class="ui-btn-left">';
                        this.html += view.render();
                        this.html += '</div>';
                        break;
                    case M.CENTER:
                        this.html += '<h1>';
                        this.html += view.render();
                        this.html += '</h1>';
                        break;
                    case M.RIGHT:
                        this.html += '<div class="ui-btn-right">';
                        this.html += view.render();
                        this.html += '</div>';
                        break;
                }
            }
        }
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the button.
     *
     * @private
     */
    theme: function() {
        this.themeChildViews();
    },

    /**
     * Applies some style-attributes to the toolbar.
     *
     * @private
     * @returns {String} The toolbar's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    }
    
});