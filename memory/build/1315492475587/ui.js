
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * This property can be used to specify a certain hyperlink type for this button. It only
     * works in combination with the hyperlinkTarget property.
     *
     * @type String
     */
    hyperlinkType: null,

    /**
     * This property can be used to specify a hyperlink target for this button. It only
     * works in combination with the hyperlinkType property.
     *
     * @type String
     */
    hyperlinkTarget: null,

    /**
     * This property can be used to specify a tag, that is independent from the button's
     * value. This allows you to identify a button, without having to worry about changes
     * to its value.
     *
     * @type String
     */
    tag: null,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['click', 'tap'],

    /**
     * Renders a button as an input tag. Input is automatically converted by jQuery mobile.
     *
     * @private
     * @returns {String} The button view's html representation.
     */
    render: function() {
        this.computeValue();
        this.html += '<a data-role="button" id="' + this.id + '"' + this.style() + ' ';

        if(this.hyperlinkTarget && this.hyperlinkType) {
            switch (this.hyperlinkType) {
                case M.HYPERLINK_EMAIL:
                    this.html += 'rel="external" href="mailto:' + this.hyperlinkTarget + '"';
                    break;
                case M.HYPERLINK_WEBSITE:
                    this.html += 'rel="external" target="_blank" href="' + this.hyperlinkTarget + '"';
                    break;
                case M.HYPERLINK_PHONE:
                    this.html += 'rel="external" href="tel:' + this.hyperlinkTarget + '"';
                    break;
            }
        } else {
            this.html += 'href="#"';
        }

        this.html += '>' + this.value + '</a>';

        return this.html;
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for list views and their
     * internal events.
     */
    registerEvents: function() {
        if(!this.internalEvents) {
            this.internalEvents = {
                tap: {
                    target: this,
                    action: 'dispatchEvent'
                }
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
    },

    /**
     * Updates the value of the button with DOM access by jQuery.
     *
     * @private
     */
    renderUpdate: function() {
        this.computeValue();
        if(this.parentView && this.parentView.type === 'M.ButtonGroupView') {
            $('#' + this.id).find('.ui-btn-text').text(this.value);
        } else {
            $('#' + this.id).parent().find('.ui-btn-text').text(this.value);
        }
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
    },

    /**
     * This method is called right before the page is loaded. If a beforeLoad-action is defined
     * for the page, it is now called.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    dispatchEvent: function(id, event, nextEvent) {
        if(this.isEnabled && nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }
    },

    /**
     * This method can be used to disable the button. This leads to a visual 'disabled' look and
     * disabled the buttons tap/click events.
     */
    disable: function() {
        if(this.isEnabled) {
            var html = $('#' + this.id).html();
            html = '<div data-theme="c" class="ui-shadow ui-disabled" aria-disabled="true">' + html + '</div>';
            $('#' + this.id).html(html);
            this.isEnabled = NO;
        }
    },

    /**
     * This method can be used to enable a disabled button and make it usable again.
     */
    enable: function() {
        if(!this.isEnabled) {
            var html = $('#' + this.id + ' div').html();
            $('#' + this.id).html(html);
            this.isEnabled = YES;
        }
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
        value: ''
    }),

    /**
     * This property determines whether the list item is a divider or not.
     *
     * @type Boolean
     */
    isDivider: NO,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['tap'],

    /**
     * This property can be used to specify whether a selection list item can be selected or not. Note, that this
     * only affects styling stuff. If set to NO, you still can apply e.g. tap events.
     */
    isSelectable: YES,

    /**
     * Renders a list item as an li-tag. The rendering is initiated by the parent list view.
     *
     * @private
     * @returns {String} The list item view's html representation.
     */
    render: function() {
        this.html = '<li id="' + this.id + '"' + this.style();

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
                if(this.isSelectable) {
                    this.html += '<a href="#">';
                    this.renderChildViews();
                    this.html += '</a>';
                } else {
                    this.renderChildViews();
                }
            }
        } else if(this.value) {
            this.html += this.value;
        }

        this.html += '</li>';
        
        return this.html;
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for list item views and
     * their internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            tap: {
                target: this.parentView,
                action: 'setActiveListItem'
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
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

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['change'],

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
            var childViews = this.getChildViewsAsArray();
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
            this.html += this.style();
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
            this.html += '<div data-role="controlgroup" href="#" id="' + this.id + '" data-type="' + this.direction + '"' + this.style() + '>';

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
            var childViews = this.getChildViewsAsArray();
            var currentButtonIndex = 0;

            for(var i in childViews) {
                if(this[childViews[i]] && this[childViews[i]].type === 'M.ButtonView') {
                    currentButtonIndex = currentButtonIndex + 1;

                    if(!this.numberOfLines || M.Math.round(currentButtonIndex / this.buttonsPerLine, M.CEIL) === this.currentLine) {

                        var button = this[childViews[i]];
                        /* reset buttons html, to make sure it doesn't get rendered twice if this is multi button group */
                        button.html = '';

                        button.parentView = this;
                        button.internalEvents = {
                            tap: {
                                target: this,
                                action: 'buttonSelected'
                            }
                        }

                        /* if the buttons are horizontally aligned, compute their width depending on the number of buttons
                           and set the right margin to '-2px' since the jQuery mobile default would cause an ugly gap to
                           the right of the button group */
                        if(this.direction === M.HORIZONTAL) {
                            button.cssStyle = 'margin-right:-2px;width:' + 100 / (this.numberOfLines ? this.buttonsPerLine : childViews.length) + '%';
                        }

                        /* set the button's _name property */
                        this[childViews[i]]._name = childViews[i];

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
                var childViews = this.getChildViewsAsArray();
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
            var childViews = this.getChildViewsAsArray();
            for(var i in childViews) {
                if(this[childViews[i]] && this[childViews[i]].type === 'M.ButtonView') {
                    var button = this[childViews[i]];
                    if(button.isActive) {
                        this.setActiveButton(button.id);
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
     * @param {M.ButtonView, String} button The button to be set active or its id.
     */
    setActiveButton: function(button) {
        if(this.isSelectable) {
            if(this.activeButton) {
                this.activeButton.removeCssClass('ui-btn-active');
                this.activeButton.isActive = NO;
            }

            var obj = M.ViewManager.getViewById(button);
            if(!obj) {
                if(button && typeof(button) === 'object' && button.type === 'M.ButtonView') {
                    obj = button;
                }
            }
            if(obj) {
                obj.addCssClass('ui-btn-active');
                obj.isActive = YES;
                this.activeButton = obj;
            }
        }
    },

    /**
     * This method activates one button within the button group at the given index.
     *
     * @param {Number} index The index of the button to be set active.
     */
    setActiveButtonAtIndex: function(index) {
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
            var button = this[childViews[index]];
            if(button && button.type === 'M.ButtonView') {
                this.setActiveButton(button);
            }
        }
    },

    /**
     * This method is called everytime a button is activated / clicked.
     *
     * @private
     * @param {String} id The id of the selected item.
     * @param {Object} event The event.
     * @param {Object} nextEvent The application-side event handler.
     */
    buttonSelected: function(id, event, nextEvent) {
        /* if selected button is disabled, do nothing */
        if(M.ViewManager.getViewById(id) && M.ViewManager.getViewById(id).type === 'M.ButtonView' && !M.ViewManager.getViewById(id).isEnabled) {
            return;
        }

        if(!(this.activeButton && this.activeButton === M.ViewManager.getViewById(id))) {
            if(this.isSelectable) {
                if(this.activeButton) {
                    this.activeButton.removeCssClass('ui-btn-active');
                    this.activeButton.isActive = NO;
                }

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

            /* trigger change event for the button group */
            $('#' + this.id).trigger('change');
        }

        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }
    },

    /**
     * Applies some style-attributes to the button group.
     *
     * @private
     * @returns {String} The button group's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.numberOfLines && !this.isInset) {
            html += ' class="ui-listview';
        }
        if(this.cssClass) {
            html += html !== '' ? ' ' + this.cssClass : ' class="' + this.cssClass;
        }
        html += '"';
        return html;
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
        this.html += '<div id="' + this.id + '"' + this.style() + '>';

        this.renderChildViews();

        this.html += '</div>';

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

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      09.08.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * A dashboard view displays images and a corresponding text in a grid-like view
 * and serves as the homescreen of an application. By tapping on of the icons, a
 * user can access certain features of an app. By default, there are three icons
 * in a row and three rows per page possible. But you can easily adjust this to
 * your custom needs.
 *
 * @extends M.View
 */
M.DashboardView = M.View.extend(
/** @scope M.DashboardView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DashboardView',

    /**
     * This property can be used to customize the number of items a dashboard
     * shows per line. By default this is set to three.
     *
     * @type Number
     */
    itemsPerLine: 3,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['click', 'tap'],

    /**
     * This property is used internally for storing the items of a dashboard, when using
     * the content binding feature.
     *
     * @private
     */
    items: [],

    /**
     * This property can be used to specify whether or not the dashboard can be re-arranged
     * by a user.
     *
     * @type Boolean
     */
    isEditable: NO,

    /**
     * This property is used internally to indicate whether the dashboard is currently in
     * edit mode or not.
     *
     * @private
     * @type Boolean
     */
    isInEditMode: NO,

    /**
     * This property defines the dashboard's name. This is used internally to identify
     * the dashboard inside the DOM.
     *
     * Note: If you are using more than one dashboard inside your application, make sure
     * you provide different names.
     *
     * @type String
     */
    name: 'dashboard',

    /**
     * This property is used internally to track the position of touch events.
     *
     * @private
     */
    touchPositions: null,

    /**
     * This property is used internally to know of what type the latest touch events was.
     *
     * @private
     */
    latestTouchEventType: null,

    /**
     * Renders a dashboard.
     *
     * @private
     * @returns {String} The dashboard view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '" class="tmp-dashboard">';
        this.renderChildViews();
        this.html += '</div>';

        /* clear floating */
        this.html += '<div class="tmp-dashboard-line-clear"></div>';

        /* init the touchPositions property */
        this.touchPositions = {};

        return this.html;
    },

    renderChildViews: function() {
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();

            /* lets gather the html together */
            for(var i in childViews) {
                /* set the dashboard item's _name and parentView property */
                this[childViews[i]].parentView = this;
                this[childViews[i]]._name = childViews[i];

                this.html += this.renderDashboardItemView(this[childViews[i]], i);
            }
        }
    },

    renderUpdate: function() {
        if(this.contentBinding) {
            this.removeAllItems();

            /* do we have something in locale storage? */
            var values = localStorage.getItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'dashboard');
            values = values ? JSON.parse(values) : null;

            this.items = [];
            var items = values ? this.sortItemsByValues(this.value, values) : this.value;
            var html = '';

            /* lets gather the html together */
            for(var i in items) {
                html += this.renderDashboardItemView(items[i], i);
            }

            /* add the items to the DOM */
            this.addItems(html);

            /* now the items are in DOM, finally register events */
            for(var i in this.items) {
                this.items[i].registerEvents();
            }
        }
    },

    /**
     * This method adds a given html string, contain the dasboard's items, to the DOM.
     *
     * @param {String} item The html representation of the dashboard items to be added.
     */
    addItems: function(items) {
        $('#' + this.id).append(items);
    },

    /**
     * This method removes all of the dashboard view's items by removing all of its content in the DOM. This
     * method is based on jQuery's empty().
     */
    removeAllItems: function() {
        $('#' + this.id).empty();
    },

    renderDashboardItemView: function(item, itemIndex) {
        if(item && item.value && item.icon) {
            var obj = item.type === 'M.DashboardItemView' ? item : M.DashboardItemView.design({
                value: item.value ? item.value : '',
                icon: item.icon ? item.icon : '',
                label: item.label ? item.label : (item.value ? item.value : ''),
                parentView: this,
                events: item.events
            });
            var html = '';

            /* add item to array for later use */
            this.items.push(obj);

            /* is new line starting? */
            if(itemIndex % this.itemsPerLine === 0) {
                //html += '<div class="tmp-dashboard-line">';
            }

            /* assign the desired width */
            obj.cssStyle = 'width: ' + 100/this.itemsPerLine + '%';

            /* finally render the dashboard item and add it to the dashboard's html */
            html += obj.render();

            /* is a line finished? */
            if(itemIndex % this.itemsPerLine === this.itemsPerLine - 1) {
                //html += '</div><div class="tmp-dashboard-line-clear"></div>';
            }

            /* return the html */
            return html;
        } else {
            M.Logger.log('Childview of dashboard is no valid dashboard item.', M.WARN);
        }
    },

    /**
     * This method is used internally for dispatching the tap event for a dashboard view. If the
     * dashboard view is in edit mode, we do not dispatch the event to the application.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     *
     * @private
     */
    dispatchTapEvent: function(id, event, nextEvent) {
        /* now first call special handler for this item */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }

        /* now call global tap-event handler (if set) */
        if(this.events && this.events.tap) {
            M.EventDispatcher.callHandler(this.events.tap, event, YES);
        }

        /* now store timestamp for last tap event to kill a possible false taphold event */
        this.latestTapEventTimestamp = +new Date();
    },

    /**
     * This method is automatically called when a taphold event is triggered for one
     * of the dashboard's
     */
    editDashboard: function(id, event, nextEvent) {
        this.touchPositions.touchstart = {};
        if(!this.isEditable || this.latestTapEventTimestamp > +new Date() - 500) {
            return;
        }

        if(this.isInEditMode && event) {
            this.stopEditMode();
        } else if((!this.isInEditMode && event) || (this.isInEditMode && !event)) {
            M.EventDispatcher.unregisterEvents(this.id);
            this.isInEditMode = YES;
            _.each(this.items, function(item) {
                item.addCssClass('rotate' + M.Math.random(1, 2));
                M.EventDispatcher.unregisterEvents(item.id);
                if($.support.touch) {
                    M.EventDispatcher.registerEvent(
                        'touchstart',
                        item.id,
                        {
                            target: item.parentView,
                            action: 'editTouchStart'
                        },
                        item.recommendedEvents
                    );
                    M.EventDispatcher.registerEvent(
                        'touchend',
                        item.id,
                        {
                            target: item.parentView,
                            action: 'editTouchEnd'
                        },
                        item.recommendedEvents
                    );
                    M.EventDispatcher.registerEvent(
                        'touchmove',
                        item.id,
                        {
                            target: item.parentView,
                            action: 'editTouchMove'
                        },
                        item.recommendedEvents
                    );
                } else {
                    M.EventDispatcher.registerEvent(
                        'mousedown',
                        item.id,
                        {
                            target: item.parentView,
                            action: 'editMouseDown'
                        },
                        item.recommendedEvents
                    );
                    M.EventDispatcher.registerEvent(
                        'mouseup',
                        item.id,
                        {
                            target: item.parentView,
                            action: 'editMouseUp'
                        },
                        item.recommendedEvents
                    );
                }
            });
        }
    },

    stopEditMode: function() {
        this.isInEditMode = NO;
        _.each(this.items, function(item) {
            item.removeCssClass('rotate1');
            item.removeCssClass('rotate2');
            M.EventDispatcher.unregisterEvents(item.id);
            item.registerEvents();
        });
    },

    setValue: function(items) {
        this.value = items;
        var values = [];
        _.each(items, function(item) {
            values.push(item.value);
        });
        if(localStorage) {
            localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'dashboard', JSON.stringify(values));
        }
    },

    sortItemsByValues: function(items, values) {
        var itemsSorted = [];
        _.each(values, function(value) {
            _.each(items, function(item) {
                if(item.value === value) {
                    itemsSorted.push(item);
                }
            });
        });
        return itemsSorted;
    },

    editTouchStart: function(id, event) {
        this.latestTouchEventType = 'touchstart';
        var latest = event.originalEvent ? (event.originalEvent.changedTouches ? event.originalEvent.changedTouches[0] : null) : null;
        
        this.touchPositions.touchstart = {
            x: latest.clientX,
            y: latest.clientY,
            date: +new Date()
        };

        var that = this;
        window.setTimeout(function() {
            if(that.latestTouchEventType === 'touchstart') {
                that.stopEditMode();
            }
        }, 750);
    },

    editTouchMove: function(id, event) {
        this.latestTouchEventType = 'touchmove';
        var latest = event.originalEvent ? (event.originalEvent.changedTouches ? event.originalEvent.changedTouches[0] : null) : null;

        if(latest) {
            var left = latest.pageX - parseInt($('#' + id).css('width')) / 2;
            var top = latest.pageY - parseInt($('#' + id).css('height')) / 2;
            $('#' + id).css('position', 'absolute');
            $('#' + id).css('left', left + 'px');
            $('#' + id).css('top', top + 'px');

            /* if end event is within certain radius of start event and it took a certain time, and editing */
            /*if(this.touchPositions.touchstart) {
                if(this.touchPositions.touchstart.date < +new Date() - 1500) {
                    if(Math.abs(this.touchPositions.touchstart.x - latest.clientX) < 30 && Math.abs(this.touchPositions.touchstart.y - latest.clientY) < 30) {
                        this.stopEditMode();
                        this.editTouchEnd(id, event);
                    }
                }
            }*/
        }
    },

    editTouchEnd: function(id, event) {
        this.latestTouchEventType = 'touchend';
        var latest = event.originalEvent ? (event.originalEvent.changedTouches ? event.originalEvent.changedTouches[0] : null) : null;
        
        if(event.currentTarget.id) {
            var items = [];
            _.each(this.items, function(item) {
                items.push({
                    id: item.id,
                    x: $('#' + item.id).position().left,
                    y: $('#' + item.id).position().top,
                    item: item
                });
                items.sort(function(a, b) {
                    /* assume they are in one row */
                    if(Math.abs(a.y - b.y) < 30) {
                        if(a.x < b.x) {
                            return -1;
                        } else {
                            return 1;
                        }
                    /* otherwise */
                    } else {
                        if(a.y < b.y) {
                            return -1;
                        } else {
                            return 1;
                        }
                    }
                });
            });
            var objs = [];
            _.each(items, function(item) {
                objs.push(item.item);
            });
            this.setValue(objs);
            this.renderUpdate();

            if(this.isInEditMode) {
                this.editDashboard();
            }
        }
    },

    editMouseDown: function(id, event) {
        this.latestTouchEventType = 'mousedown';

        this.touchPositions.touchstart = {
            x: event.clientX,
            y: event.clientY,
            date: +new Date()
        };

        /* enable mouse move for selected item */
        M.EventDispatcher.registerEvent(
            'mousemove',
            id,
            {
                target: this,
                action: 'editMouseMove'
            },
            M.ViewManager.getViewById(id).recommendedEvents
        );

        var that = this;
        window.setTimeout(function() {
            if(that.latestTouchEventType === 'mousedown') {
                that.stopEditMode();
            }
        }, 750);
    },

    editMouseMove: function(id, event) {
        this.latestTouchEventType = 'mousemove';

        var left = event.pageX - parseInt($('#' + id).css('width')) / 2;
        var top = event.pageY - parseInt($('#' + id).css('height')) / 2;
        $('#' + id).css('position', 'absolute');
        $('#' + id).css('left', left + 'px');
        $('#' + id).css('top', top + 'px');

        /* if end event is within certain radius of start event and it took a certain time, and editing */
        /*if(this.touchPositions.touchstart) {
            if(this.touchPositions.touchstart.date < +new Date() - 1500) {
                if(Math.abs(this.touchPositions.touchstart.x - latest.clientX) < 30 && Math.abs(this.touchPositions.touchstart.y - latest.clientY) < 30) {
                    this.stopEditMode();
                    this.editTouchEnd(id, event);
                }
            }
        }*/
    },

    editMouseUp: function(id, event) {
        this.latestTouchEventType = 'mouseup';

        if(event.currentTarget.id) {
            var items = [];
            _.each(this.items, function(item) {

                /* disable mouse move for all item */
                M.EventDispatcher.unregisterEvent('mousemove', item.id);

                items.push({
                    id: item.id,
                    x: $('#' + item.id).position().left,
                    y: $('#' + item.id).position().top,
                    item: item
                });
                items.sort(function(a, b) {
                    /* assume they are in one row */
                    if(Math.abs(a.y - b.y) < 30) {
                        if(a.x < b.x) {
                            return -1;
                        } else {
                            return 1;
                        }
                    /* otherwise */
                    } else {
                        if(a.y < b.y) {
                            return -1;
                        } else {
                            return 1;
                        }
                    }
                });
            });
            var objs = [];
            _.each(items, function(item) {
                objs.push(item.item);
            });
            this.setValue(objs);
            this.renderUpdate();

            if(this.isInEditMode) {
                this.editDashboard();
            }
        }
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      09.08.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * A dashboard itm view contains an icon and a label and can be used as the only
 * kind of childviews for a dashboard view.
 *
 * @extends M.View
 */
M.DashboardItemView = M.View.extend(
/** @scope M.DashboardItemView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DashboardItemView',

    /**
     * The path/url to the dashboard item's icon.
     *
     * @type String
     */
    icon: null,

    /**
     * The label for the dashboard item. If no label is specified, the value will be
     * displayed instead.
     *
     * @type String
     */
    label: null,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['click', 'tap', 'taphold', 'touchstart', 'touchmove', 'touchend', 'mousedown', 'mousemove', 'mouseup'],

    /**
     * Renders a dashboard item.
     *
     * @private
     * @returns {String} The dashboard item view's html representation.
     */
    render: function() {
        //this.computeValue();

        /* reset html property */
        this.html = '';

        if(!this.icon) {
            M.Logger.log('Please provide an icon for a dashboard item view!', M.WARN);
            return this.html;
        }

        this.html += '<div id="' + this.id + '" class="tmp-dashboard-item" ' + this.style() + '>';

        /* add image */
        var image = M.ImageView.design({
            value: this.icon
        });
        this.html += image.render();

        /* add label */
        this.html += '<div class="tmp-dashboard-item-label">' + (this.label ? this.label : this.value) + '</div>';

        this.html += '</div>';

        return this.html;
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for list item views and
     * their internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            taphold: {
                target: this.parentView,
                action: 'editDashboard'
            },
            tap: {
                target: this.parentView,
                action: 'dispatchTapEvent'
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
    },

    /**
     * Applies some style-attributes to the dashboard item.
     *
     * @private
     * @returns {String} The button's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssStyle) {
            html += 'style="' + this.cssStyle + '"';
        }
        return html;
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      04.02.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * This defines the prototype for a date picker view. A date picker is a special view, that can
 * be called out of a controller. It is shown as a date picker popup, based on the mobiscroll
 * library. You can either connect a date picker with an existing view and automatically pass
 * the selected date to the source's value property, or you can simply use the date picker to
 * select a date, return it to the controller (respectively the callback) and handle the date
 * by yourself.
 *
 * @extends M.View
 */
M.DatePickerView = M.View.extend(
/** @scope M.DatePickerView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DatePickerView',

    /**
     * This property is used to link the date picker to a source. You can either pass the DOM id of
     * the corresponding source or the javascript object itself. Linking the date picker directly
     * to a source results in automatic value updates of this source.
     *
     * Note: Valid sources need to provide a setValue() method.
     *
     * If you do not pass a source, the date picker isn't linked to any view. It simply returns the
     * selected value/date to given callbacks. So you can call the date picker out of a controller
     * and handle the selected date all by yourself.
     *
     * @type String|Object
     */
    source: null,

    /**
     * This property can be used to specify several callbacks for the date picker view. There are
     * three types of callbacks available:
     *
     *     - before
     *         This callback gets called, right before the date picker is shown. It passes along two
     *         parameters:
     *             - value      -> The initial date of the date picker, formatted as a string
     *             - date       -> The initial date of the date picker as d8 object
     *     - confirm
     *         This callback gets called, when a selected date was confirmed. It passes along two
     *         parameters:
     *             - value      -> The selected date of the date picker, formatted as a string
     *             - date       -> The selected date of the date picker as d8 object
     *     - cancel
     *         This callback gets called, when the cancel button is hit. It doesn't pass any
     *         parameters.
     *
     * Setting up one of those callbacks works the same as with other controls of The-M-Project. You
     * simply have to specify an object containing a target function, e.g.:
     *
     * callbacks: {
     *     confirm: {
     *         target: this,
     *         action: 'dateSelected'
     *     },
     *     cancel: {
     *         action: function() {
     *             // do something
     *         }
     *     }
     * }
     *
     * @type Object
     */
    callbacks: null,

    /**
     * This property can be used to specify the initial date for the date picker. If you use the
     * date picker without a source, this date is always picked as the initial date. If nothing is
     * specified, the current date will be displayed.
     *
     * If you use the date picker with a valid source, the initial date is picked as long as there
     * is no valid date available by the source. Once a date was selected and assigned to the source,
     * this is taken as initial date the next time the date picker is opened.
     *
     * @type Object|String
     */
    initialDate: null,

    /**
     * This property can be used to determine whether to use the data source's value as initial date
     * or not. If there is no source specified, this property is irrelevant.
     *
     * Note: If there is a source specified and this property is set to NO, the 'initialDate' property
     * will be used anyway if there is no date value available for the source!
     *
     * @type Boolean
     */
    useSourceDateAsInitialDate: YES,

    /**
     * This property can be used to specify whether to show scrollers for picking a date or not.
     *
     * Note: If both this and the 'showTimePicker' property are set to NO, no date picker will
     * be shown!
     *
     * @type Boolean
     */
    showDatePicker: YES,

    /**
     * This property can be used to specify whether to show scrollers for picking a time or not.
     *
     * Note: If both this and the 'showDatePicker' property are set to NO, no date picker will
     * be shown!
     *
     * @type Boolean
     */
    showTimePicker: YES,

    /**
     * This property can be used to specify whether or not to show labels above of the scrollers.
     * If set to YES, the labels specified with the '...Label' properties are displayed above of
     * the corresponding scroller.
     *
     * @type Boolean
     */
    showLabels: YES,

    /**
     * This property specified the label shown above of the 'year' scroller.
     *
     * Note: This label is only shown if the 'showLabels' property is set to YES.
     *
     * @type String
     */
    yearLabel: 'Year',

    /**
     * This property specified the label shown above of the 'month' scroller.
     *
     * Note: This label is only shown if the 'showLabels' property is set to YES.
     *
     * @type String
     */
    monthLabel: 'Month',

    /**
     * This property specified the label shown above of the 'day' scroller.
     *
     * Note: This label is only shown if the 'showLabels' property is set to YES.
     *
     * @type String
     */
    dayLabel: 'Day',

    /**
     * This property specified the label shown above of the 'hours' scroller.
     *
     * Note: This label is only shown if the 'showLabels' property is set to YES.
     *
     * @type String
     */
    hoursLabel: 'Hours',

    /**
     * This property specified the label shown above of the 'minutes' scroller.
     *
     * Note: This label is only shown if the 'showLabels' property is set to YES.
     *
     * @type String
     */
    minutesLabel: 'Minutes',

    /**
     * You can use this property to enable or disable the AM/PM scroller. If set to NO, the
     * date picker will use the 24h format.
     *
     * @type Boolean
     */
    showAmPm: NO,

    /**
     * This property can be used to specify the first year of the 'year' scroller. By default,
     * this will be set to 20 years before the current year.
     *
     * @type Number
     */
    startYear: null,

    /**
     * This property can be used to specify the last year of the 'year' scroller. By default,
     * this will be set to 20 years after the current year.
     *
     * @type Number
     */
    endYear: null,

    /**
     * This property can be used to customize the date format of the date picker. This is important
     * if you use the date picker on a valid source since the date picker will then automatically
     * push the selected date/datetime to the 'value' property of the source - based on this format.
     *
     * The possible keys:
     *
     *     - m      -> month (without leading zero)
     *     - mm     -> month (two-digit)
     *     - M      -> month name (short)
     *     - MM     -> month name (long)
     *     - d      -> day (without leading zero)
     *     - d      -> day (two digit)
     *     - D      -> day name (short)
     *     - DD     -> day name (long)
     *     - y      -> year (two digit)
     *     - yy     -> year (four digit)
     *
     * @type String
     */
    dateFormat: 'mm/dd/yyyy',

    /**
     * This property can be used to customize the time format of the date picker. This is important
     * if you use the date picker on a valid source since the date picker will then automatically
     * push the selected time/datetime to the 'value' property of the source - based on this format.
     *
     * The possible keys:
     *
     *     - h      -> hours (without leading zero, 12h format)
     *     - hh     -> hours (two-digit, 12h format)
     *     - H      -> hours (without leading zero, 24h format)
     *     - HH     -> hours (two-digit, 24h format)
     *     - i      -> minutes (without leading zero)
     *     - ii     -> minutes (two-digit)
     *     - A      -> AM/PM
     *
     * @type String
     */
    timeFormat: 'HH:ii',

    /**
     * This property determines the order and formating of the date scrollers. The following keys
     * are possible:
     *
     *     - m      -> month (without leading zero)
     *     - mm     -> month (two-digit)
     *     - M      -> month name (short)
     *     - MM     -> month name (long)
     *     - d      -> day (without leading zero)
     *     - d      -> day (two digit)
     *     - y      -> year (two digit)
     *     - yy     -> year (four digit)
     *
     * By default, we use this format: mmddyyyy
     *
     * @type String
     */
    dateOrder: 'mmddyy',

    /**
     * This property specifies a list of full month names.
     *
     * @type Array
     */
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

    /**
     * This property specifies a list of short month names.
     *
     * @type Array
     */
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    /**
     * This property specifies a list of full day names.
     *
     * @type Array
     */
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

    /**
     * This property specifies a list of short day names.
     *
     * @type Array
     */
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

    /**
     * This property can be used to specify the label of the date picker's cancel button. By default
     * it shows 'Cancel'.
     *
     * @type String
     */
    cancelButtonValue: 'Cancel',

    /**
     * This property can be used to specify the label of the date picker's cancel button. By default
     * it shows 'Ok'.
     *
     * @type String
     */
    confirmButtonValue: 'Ok',

    /**
     * This property is used internally to indicate whether the current date picker works on a valid
     * source or was called without one. This is important for stuff like auto-updating the source's
     * DOM representation.
     *
     * @private
     */
    hasSource: YES,

    /**
     * This property is used internally to state whether a value, respectively a date, was selected
     * or not.
     *
     * @private
     * @type Boolean
     */
    isValueSelected: NO,

    /**
     * This method is the only important method of a date picker view for 'the outside world'. From within
     * an application, simply call this method and pass along an object, containing all the properties
     * you want to set, different from default.
     *
     * A sample call:
     *
     * M.DatePickerView.show({
     *     source: M.ViewManager.getView('mainPage', 'myTextField')
     *     initialDate: D8.create('30.04.1985 10:30'),
     *     callbacks: {
     *          confirm: {
     *              target: this,
     *              action: function(value, date) {
     *                  // do something...
     *              }
     *          }
     *     }
     * });
     *
     * @param obj
     */
    show: function(obj) {
        var datepicker = M.DatePickerView.design(obj);

        /* check if it's worth the work at all */
        if(!(datepicker.showDatePicker || datepicker.showTimePicker)) {
            M.Logger.log('In order to use the M.DatepickerView, you have to set the \'showDatePicker\' or \'showTimePicker\' property to YES.', M.ERR);
            return;
        }

        /* calculate the default start and end years */
        this.startYear = this.startYear ? this.startYear : D8.now().format('yyyy') - 20;
        this.endYear = this.endYear ? this.endYear : D8.now().format('yyyy') + 20;

        /* check if we got a valid source */
        if(datepicker.source) {
            /* if we got a view, get its id */
            datepicker.source = typeof(datepicker.source) === 'object' && datepicker.source.type ? datepicker.source.id : datepicker.source;

            var view = M.ViewManager.getViewById(datepicker.source);
            if(view && typeof(view.setValue) === 'function' && $('#' + datepicker.source) && $('#' + datepicker.source).length > 0) {
                datepicker.init();
            } else {
                M.Logger.log('The specified source for the M.DatepickerView is invalid!', M.ERR);
            }
        } else {
            /* use default source (the current page) */
            datepicker.hasSource = NO;
            var page = M.ViewManager.getCurrentPage();
            if(page) {
                datepicker.source = page.id;
                datepicker.init();
            }
        }
    },

    /**
     * This method is used internally to communicate with the mobiscroll library. It actually initializes
     * the creation of the date picker and is responsible for reacting on events. If the cancel or confirm
     * button is hit, this method dispatches the events to the corresponding callbacks.
     *
     * @private
     */
    init: function() {
        var that = this;
        $('#' + this.source).scroller({
            preset: (this.showDatePicker && this.showTimePicker ? 'datetime' : (this.showDatePicker ? 'date' : (this.showTimePicker ? 'time' : null))),
            ampm: this.showAmPm,
            startYear: this.startYear,
            endYear: this.endYear,
            dateFormat: this.dateFormat,
            timeFormat: this.timeFormat,
            dateOrder: this.dateOrder,
            dayText: this.dayLabel,
            hourText: this.hoursLabel,
            minuteText: this.minutesLabel,
            monthText: this.monthLabel,
            yearText: this.yearLabel,
            monthNames: this.monthNames,
            monthNamesShort: this.monthNamesShort,
            dayNames: this.dayNames,
            dayNamesShort: this.dayNamesShort,
            cancelText: this.cancelButtonValue,
            setText: this.confirmButtonValue,

            /* now set the width of the scrollers */
            width: (M.Environment.getWidth() - 20) / 3 - 20 > 90 ? 90 : (M.Environment.getWidth() - 20) / 3 - 20,

            beforeShow: function(input, scroller) {
                that.bindToCaller(that, that.beforeShow, [input, scroller])();
            },
            onClose: function(value, scroller) {
                that.bindToCaller(that, that.onClose, [value, scroller])();
            },
            onSelect: function(value, scroller) {
                that.bindToCaller(that, that.onSelect, [value, scroller])();
            }
        });
        $('#' + this.source).scroller('show');
    },

    /**
     * This method is used internally to handle the 'beforeShow' event. It does some adjustments to the
     * rendered scroller by mobiscroll and finally calls the application's 'before' callback, if it is
     * defined.
     *
     * @param source
     * @param scroller
     */
    beforeShow: function(source, scroller) {
        var source = null;
        var date = null;

        /* try to set the date picker's initial date based on its source */
        if(this.hasSource && this.useSourceDateAsInitialDate) {
            source = M.ViewManager.getViewById(this.source);
            if(source.value) {
                try {
                    date = D8.create(source.value);
                } catch(e) {

                }
                if(date) {
                    if(date.format('yyyy') < this.startYear) {
                        if(this.hasOwnProperty('startYear')) {
                            M.Logger.log('The given date of the source (' + date.format('yyyy') + ') conflicts with the \'startYear\' property (' + this.startYear + ') and therefore will be ignored!', M.WARN);
                        } else {
                            M.Logger.log('The date picker\'s default \'startYear\' property (' + this.startYear + ') conflicts with the given date of the source (' + date.format('yyyy') + ') and therefore will be ignored!', M.WARN);
                            $('#' + this.source).scroller('option', 'startYear', date.format('yyyy'));
                            $('#' + this.source).scroller('setDate', date.date);
                        }
                    } else {
                        $('#' + this.source).scroller('setDate', date.date);
                    }
                }
            }
        }

        /* if there is no source or the retrieval of the date went wrong, try to set it based on the initial date property */
        if(this.initialDate && !date) {
            if(this.initialDate.date) {
                date = this.initialDate;
            } else {
                try {
                    date = D8.create(this.initialDate);
                } catch(e) {

                }
            }
            if(date) {
                if(date.format('yyyy') < this.startYear) {
                    if(this.hasOwnProperty('startYear')) {
                        M.Logger.log('The specified initial date (' + date.format('yyyy') + ') conflicts with the \'startYear\' property (' + this.startYear + ') and therefore will be ignored!', M.WARN);
                    } else {
                        M.Logger.log('The date picker\'s default \'startYear\' property (' + this.startYear + ') conflicts with the specified initial date (' + date.format('yyyy') + ') and therefore will be ignored!', M.WARN);
                        $('#' + this.source).scroller('option', 'startYear', date.format('yyyy'));
                        $('#' + this.source).scroller('setDate', date.date);
                    }
                } else {
                    $('#' + this.source).scroller('setDate', date.date);
                }
            }
        }

        /* now we got the date (or use the current date as default), lets compute this as a formatted text for the callback */
        value = scroller.formatDate(
            this.showDatePicker ? this.dateFormat + (this.showTimePicker ? ' ' + this.timeFormat : '') : this.timeFormat,
            scroller.getDate()
        );

        /* kill parts of the scoller */
        $('.dwv').remove();

        /* inject TMP buttons*/
        var confirmButton = M.ButtonView.design({
            value: this.confirmButtonValue,
            cssClass: 'b tmp-dialog-smallerbtn-confirm',
            events: {
                tap: {
                    action: function() {
                        $('#dw_set').trigger('click');
                    }
                }
            }
        });
        var cancelButton = M.ButtonView.design({
            value: this.cancelButtonValue,
            cssClass: 'd tmp-dialog-smallerbtn-confirm',
            events: {
                tap: {
                    action: function() {
                        $('#dw_cancel').trigger('click');
                    }
                }
            }
        });

        if(this.showDatePicker) {
            var grid = M.GridView.design({
                childViews: 'confirm cancel',
                layout: M.TWO_COLUMNS,
                cssClass: 'tmp-datepicker-buttongrid',
                confirm: confirmButton,
                cancel: cancelButton
            });

            var html = grid.render();
            $('.dw').append(html);
            grid.theme();
            grid.registerEvents();
        } else {
            var html = confirmButton.render();
            html += cancelButton.render();
            $('.dw').append(html);
            confirmButton.theme();
            confirmButton.registerEvents();
            cancelButton.theme();
            cancelButton.registerEvents();
        }

        /* hide default buttons */
        $('#dw_cancel').hide();
        $('#dw_set').hide();

        /* add class to body as selector for showing/hiding labels */
        if(!this.showLabels) {
            $('body').addClass('tmp-datepicker-no-label');
        }

        /* call callback */
        if(this.callbacks && M.EventDispatcher.checkHandler(this.callbacks['before'])) {
            M.EventDispatcher.callHandler(this.callbacks['before'], null, NO, [value, date]);
        }
    },

    onClose: function(value, scroller) {
        /* set value if one was selected */
        var source = null;
        var date = null;
        if(this.isValueSelected) {
            /* first compute the date */
            try {
                date = D8.create(scroller.getDate());
            } catch(e) {

            }

            /* now, if there is a source, auto-update its value */
            if(this.hasSource) {
                source = M.ViewManager.getViewById(this.source);
                if(source) {
                    source.setValue(value);
                }
            }
        }

        /* remove class from body as selector for showing/hiding labels */
        if(!this.showLabels) {
            $('body').removeClass('tmp-datepicker-no-label');
        }

        /* call cancel callback */
        if(!this.isValueSelected && this.callbacks && M.EventDispatcher.checkHandler(this.callbacks['cancel'])) {
            M.EventDispatcher.callHandler(this.callbacks['cancel'], null, NO, []);
        } else if(this.isValueSelected && this.callbacks && M.EventDispatcher.checkHandler(this.callbacks['confirm'])) {
            M.EventDispatcher.callHandler(this.callbacks['confirm'], null, NO, [value, date]);
        }

        /* kill the datepicker */
        $('#' + this.source).scroller('destroy');
        $('.dwo').remove();
        $('.dw').remove();
        this.destroy();
    },

    onSelect: function(value) {
        /* mark the datepicker as 'valueSelected' */
        this.isValueSelected = YES;
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      23.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
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
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * Defines the value of the destructive button (the one button that is showed in red)
     *
     * @type String
     */
    destructiveButtonValue: null,

    /**
     * Defines the value of the cancel button
     *
     * @type String
     */
    cancelButtonValue: null,

    /**
     * Contains the values of all other buttons as strings
     *
     * @type Array
     */
    otherButtonValues: null,

    /**
     * Contains the tags of all other buttons as strings
     *
     * @type Array
     */
    otherButtonTags: null,

    /**
     * Delay between action sheet slide out animation finished and deleting it from DOM and deleting the object
     */
    deletionDelay: 1000,

    /**
     * If set, contains the dialog's callbacks in sub objects named 'destruction', 'cancel' and 'other' or as  functions named confirm, cancel and other.
     *
     * @type Object
     */
    callbacks: null,

    /**
     * Renders an action sheet dialog as a slide-up.
     *
     * @private
     * @returns {String} The action sheet dialog view's html representation.
     */

    render: function() {
        /* render half transparent grey background */
        this.html = '<div class="tmp-dialog-background"></div>';

        /* render title */
        this.html += '<div id="' + this.id + '" class="tmp-actionsheet">';
        this.html += '<div class="tmp-dialog-header">';
        this.html += this.title ? this.title : '';
        this.html +='</div>';

        /* render footer that contains all buttons */
        this.html += '<div class="tmp-dialog-footer">';

        var that = this;

        var buttons = [];
        if(this.destructiveButtonValue) {
            buttons.push(M.ButtonView.design({
                value: this.destructiveButtonValue,
                tag: 'destruction',
                cssClass: 'a tmp-actionsheet-destructive-button',
                events: {
                    tap: {
                        target: that,
                        action: 'handleCallback'
                    }
                }
            }));
        }
        if(this.otherButtonValues) {
            if(this.otherButtonTags && !(_.isArray(this.otherButtonTags)) && !(_.isArray(this.otherButtonValues))) {
                M.Logger.log('Error in Action Sheet: Values and (optional) tags must be passed as string in an array! Rendering will not proceed.', M.WARN);
                return '';
            }
            /* First check if passed number of values matches number of labels passed */
            /* If not, do not use values, but use incremented buttonNr as value */
            if(this.otherButtonTags && this.otherButtonTags.length !== this.otherButtonValues.length) {
                M.Logger.log('Mismatch in Action Sheet: Number of other button\'s tags doesn\'t match number of values. Will not use given values, but use generated numbers as values.', M.WARN);
                this.otherButtonTags = null;
            }

            var buttonNr = 0;

            _.each(this.otherButtonValues, function(btn) {
                buttons.push(M.ButtonView.design({
                    value: btn,
                    tag: that.otherButtonTags ? that.otherButtonTags[buttonNr++] : buttonNr++,
                    events: {
                        tap: {
                            target: that,
                            action: 'handleCallback'
                        }
                    }
                }));
            });
        }
        
        if(this.cancelButtonValue) {
            buttons.push(M.ButtonView.design({
                value: this.cancelButtonValue,
                tag: 'cancel',
                cssClass: 'a',
                events: {
                    tap: {
                        target: that,
                        action: 'handleCallback'
                    }
                }
            }));
        }


        /* render each button saved in the buttons array */
        for(var i in buttons) {
            this.html += buttons[i].render();
        };

        this.html += '</div>';
        this.html += '</div>';

        $('body').append(this.html);

        /* register events for each designed and rendered button and theme it afterwards
         * must be performed AFTER button has been inserted to DOM
         */
        for(var i in buttons) {
            buttons[i].registerEvents();
            buttons[i].theme();
        };
    },

    show: function() {
        this.render();
        var dialog = $('#' + this.id);
        dialog.removeClass('slideup out reverse');
        dialog.addClass('slideup in');
    },

    hide: function() {
        var dialog = $('#' + this.id);
        dialog.removeClass('slideup in');
        dialog.addClass('slideup out reverse');
        $('.tmp-dialog-background').remove();
        /* destroying the view object and its DOM representation must be performed after the slide animation is finished. */
        var that = this;
        window.setTimeout(that.bindToCaller(that, that.destroy), this.deletionDelay);
    },

    handleCallback: function(viewId, event) {
        this.hide();
        var button = M.ViewManager.getViewById(viewId);
        var buttonType = (button.tag === 'destruction' || button.tag === 'cancel') ? button.tag : 'other';

        if(this.callbacks && buttonType && M.EventDispatcher.checkHandler(this.callbacks[buttonType])){
            this.bindToCaller(this.callbacks[buttonType].target, this.callbacks[buttonType].action, button.tag)();
        }
    }



});
// ==========================================================================
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
     * Determines whether the alert dialog gets a default ok button.
     *
     * @type Boolean
     */
    hasConfirmButton: YES,

    /**
     * Determines the value of the button, means the text label on it.
     *
     * @type String
     */
    confirmButtonValue: 'Ok',

    /**
     * If set, contains the dialog's callback in a sub object named 'confirm' or as a function named confirm.
     *
     * @type Object
     */
    callbacks: null,

    /**
     * Renders an alert dialog as a pop up
     *
     * @private
     * @returns {String} The alert dialog view's html representation.
     */
    render: function() {
        this.html = '<div class="tmp-dialog-background"></div>';
        this.html += '<div id="' + this.id + '" class="tmp-dialog">';
        this.html += '<div class="tmp-dialog-header">';
        this.html += this.title ? this.title : '';
        this.html +='</div>';
        this.html += '<div class="tmp-dialog-content">';
        this.html += this.message;
        this.html +='</div>';
        var button;
        if(this.hasConfirmButton) {
            this.html += '<div class="tmp-dialog-footer">';
            var that = this;
            button = M.ButtonView.design({
                value: this.confirmButtonValue,
                cssClass: 'b tmp-dialog-smallerbtn',
                events: {
                    tap: {
                        target: that,
                        action: 'handleCallback'
                    }
                }
            });
            this.html += button.render();
            this.html += '</div>';
        }
        this.html += '</div>';

        $('body').append(this.html);
        if(button.type) {
            button.registerEvents();
            button.theme();
        }
    },

    show: function() {
        /* call the dialog's render() */
        this.render();
        var dialog = $('#' + this.id);
        var background = $('.tmp-dialog-background')    ;

        this.positionDialog(dialog);
        this.positionBackground(background);

        dialog.addClass('pop in');
    },

    hide: function() {
        var dialog = $('#' + this.id);
        var background = $('.tmp-dialog-background');
        dialog.addClass('pop out');
        background.remove();
        this.destroy();
    },

    handleCallback: function() {
        this.hide();
        if(this.callbacks && M.EventDispatcher.checkHandler(this.callbacks.confirm)){
            this.bindToCaller(this.callbacks.confirm.target, this.callbacks.confirm.action)();
        }
    },

    positionDialog: function(dialog) {
        /* position alert in the center of the possibly scrolled viewport */
        var screenSize = M.Environment.getSize();
        var scrollYOffset = window.pageYOffset;
        var scrollXOffset = window.pageXOffset;
        var dialogHeight = dialog.outerHeight();
        var dialogWidth = dialog.outerWidth();

        var xPos = scrollXOffset + (screenSize[0]/2);
        var yPos = scrollYOffset + (screenSize[1]/2);

        dialog.css('position', 'absolute');
        dialog.css('top', yPos + 'px');
        dialog.css('left', xPos + 'px');
        dialog.css('z-index', 10000);
        dialog.css('margin-top', '-' + (dialogHeight/2) + 'px');
        dialog.css('margin-left', '-' + (dialogWidth/2) + 'px');
    },

    positionBackground: function(background) {
        background.css('height', $(document).height() + 'px');
        background.css('width', $(document).width() + 'px');
    }

});
// ==========================================================================
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
     * Determines the value of the button, means the text label on it.
     *
     * @type String
     */
    confirmButtonValue: 'Ok',

    /**
     * Determines the value of the button, means the text label on it.
     *
     * @type String
     */
    cancelButtonValue: 'Cancel',

    /**
     * If set, contains the dialog's callbacks in  sub objects named 'confirm' and 'cancel' or as  functions named confirm and cancel.
     *
     * @type Object
     */
    callbacks: null,

    /**
     * Renders a confirm dialog as a pop-up.
     *
     * @private
     * @returns {String} The confirm dialog view's html representation.
     */
    render: function() {
        this.html = '<div class="tmp-dialog-background"></div>';
        this.html += '<div id="' + this.id + '" class="tmp-dialog">';
        this.html += '<div class="tmp-dialog-header">';
        this.html += this.title ? this.title : '';
        this.html +='</div>';
        this.html += '<div class="tmp-dialog-content">';
        this.html += this.message;
        this.html +='</div>';
        this.html += '<div class="tmp-dialog-footer">';
        var that = this;
        /* build confirm button */
        var button = M.ButtonView.design({
            value: this.confirmButtonValue,
            cssClass: 'b tmp-dialog-smallerbtn-confirm',
            events: {
                tap: {
                    target: that,
                    action: 'confirmed'
                }
            }
        });
        /* build cancel button */
        var button2 = M.ButtonView.design({
            value: this.cancelButtonValue,
            cssClass: 'd tmp-dialog-smallerbtn-confirm',
            events: {
                tap: {
                    target: that,
                    action: 'canceled'
                }
            }
        });
        /*Grid View for positioning buttons*/
        var grid = M.GridView.design({
            childViews: 'confirm cancel',
            layout: M.TWO_COLUMNS,
            confirm: button,
            cancel: button2
        });
        this.html += grid.render(); // renders also buttons (childViews)
        this.html += '</div>';
        this.html += '</div>';

        $('body').append(this.html);
        if(button.type) {
            button.registerEvents();
            button.theme();
        }
        if(button2.type) {
            button2.registerEvents();
            button2.theme();
        }
    },

    show: function() {
        this.render();
        var dialog = $('#' + this.id);
        var background = $('.tmp-dialog-background')    ;

        this.positionDialog(dialog);
        this.positionBackground(background);

        dialog.addClass('pop in');
    },

    hide: function() {
        var dialog = $('#' + this.id);
        var background = $('.tmp-dialog-background');
        dialog.addClass('pop out');
        background.remove();
        this.destroy();
    },

    confirmed: function() {
        this.hide();
        if(this.callbacks && M.EventDispatcher.checkHandler(this.callbacks.confirm)){
            this.bindToCaller(this.callbacks.confirm.target, this.callbacks.confirm.action)();
        }
    },

    canceled: function() {
        this.hide();
        if(this.callbacks && M.EventDispatcher.checkHandler(this.callbacks.cancel)){
            this.bindToCaller(this.callbacks.cancel.target, this.callbacks.cancel.action)();
        }
    },

    positionDialog: function(dialog) {
        /* position alert in the center of the possibly scrolled viewport */
        var screenSize = M.Environment.getSize();
        var scrollYOffset = window.pageYOffset;
        var scrollXOffset = window.pageXOffset;
        var dialogHeight = dialog.outerHeight();
        var dialogWidth = dialog.outerWidth();

        var xPos = scrollXOffset + (screenSize[0]/2);
        var yPos = scrollYOffset + (screenSize[1]/2);

        dialog.css('position', 'absolute');
        dialog.css('top', yPos + 'px');
        dialog.css('left', xPos + 'px');
        dialog.css('z-index', 10000);
        dialog.css('margin-top', '-' + (dialogHeight/2) + 'px');
        dialog.css('margin-left', '-' + (dialogWidth/2) + 'px');
    },

    positionBackground: function(background) {
        background.css('height', $(document).height() + 'px');
        background.css('width', $(document).width() + 'px');
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * This method triggers the validate() on all child views, respectively on their validators. If
     * a validation error occurs, the showErrors() will be called.
     *
     * @returns {Boolean} The result of the validation process: valid or not.
     */
    validate: function() {
        var ids = this.getIds();
        for(var name in ids) {
            if(!!!(M.ViewManager.getViewById(ids[name]).validators)) {
                delete ids[name];
            }
        }

        var isValid = YES;
        M.Validator.clearErrorBuffer();

        for(var name in ids) {
            var view = M.ViewManager.getViewById(ids[name]);
            if(view && view.validators) {
                _.each(view.validators, function(validator) {
                    if(!validator.validate(view, name)) {
                        isValid = NO;
                    }
                });
            }
        }

        if(!isValid) {
            this.showErrors();
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
            var view = M.ViewManager.getViewById(error.errObj.viewId);
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
     * This method is a wrapper of M.View's clearValues() method.
     */
    clearForm: function() {
        this.clearValues();
    },

    /**
     * This method is a wrapper of M.View's getValues() method.
     */
    getFormValues: function() {
        return this.getValues();
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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

                        this[arr[i]]._name = arr[i];
                        this.html += this[arr[i]].render();

                        this.html += '</div>';
                    }
                }
            } else {
                M.Logger.log('No layout specified for GridView (' + this.id + ')!', M.WARN);
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

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['click', 'tap', 'error', 'load'],

    /**
     * Renders an image view based on the specified layout.
     *
     * @private
     * @returns {String} The image view's html representation.
     */
    render: function() {
        this.computeValue();
        this.html += '<img id="' + this.id + '" src="' + (this.value && typeof(this.value) === 'string' ? this.value : '') + '"' + this.style() + '>';
        return this.html;
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for image views and
     * their internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            error: {
                target: this,
                action: 'sourceIsInvalid'
            },
            load: {
                target: this,
                action: 'sourceIsValid'
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
    },


    /**
     * Updates the value of the label with DOM access by jQuery.
     *
     * @private
     */
    renderUpdate: function() {
        this.computeValue();
        $('#' + this.id).attr('src', this.value);
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the image.
     *
     * @private
     */
    theme: function() {
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
    },

    sourceIsInvalid: function(id, event, nextEvent) {
        M.Logger.log('The source \'' + this.value + '\' is invalid, so we hide the image!', M.WARN);
        $('#' + this.id).hide();

        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }
    },

    sourceIsValid: function(id, event, nextEvent) {
        $('#' + this.id).show();

        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['tap'],

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
    },

    /**
     * This method sets the label's value and initiates its re-rendering.
     *
     * @param {String} value The value to be applied to the label view.
     */
    setValue: function(value) {
        this.value = value;
        this.renderUpdate();
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * This property counts the loader calls to show
     *
     * @type Number
     */
    refCount: 0,

    /**
     * This property can be used to specify the default title of a loader.
     *
     * @type String
     */
    defaultTitle: 'loading',
            
    /**
     * This method initializes the loader by loading it once.
     *
     * @private 
     */
    initialize: function() {
        if(!this.isInitialized) {
            this.refCount = 0;
            this.isInitialized = YES;
        }
    },

    /**
     * This method shows the default loader. You can specify the displayed label with the
     * title parameter.
     *
     * @param {String} title The title for this loader.
     */
    show: function(title) {
        this.refCount++;
        var title = title && typeof(title) === 'string' ? title : this.defaultTitle;
        this.changeTitle(title);
        if(this.refCount == 1){
            $.mobile.pageLoading();

            /* position alert in the center of the possibly scrolled viewport */
            var loader = $('.ui-loader');
            var screenSize = M.Environment.getSize();
            var scrollYOffset = window.pageYOffset;
            var loaderHeight = loader.outerHeight();

            var yPos = scrollYOffset + (screenSize[1]/2);
            loader.css('top', yPos + 'px');
            loader.css('margin-top', '-' + (loaderHeight/2) + 'px');
        }
    },

    /**
     * This method changes the current title.
     *
     * @param {String} title The title for this loader.
     */

    changeTitle: function(title){
        $('.ui-loader h1').html(title);
    },

    /**
     * This method hides the loader.
     *
     * @param {Boolean} force Determines whether to force the hide of the loader.
     */
    hide: function(force) {
        if(force || this.refCount <= 0) {
            this.refCount = 0;
        } else {
            this.refCount--;
        }
        if(this.refCount == 0){
            $.mobile.pageLoading(true);
        }
    }
    
});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for map type: roadmap
 *
 * @type String
 */
M.MAP_ROADMAP = 'ROADMAP';

/**
 * A constant value for map type: hybrid
 *
 * @type String
 */
M.MAP_HYBRID = 'HYBRID';

/**
 * A constant value for map type: satellite
 *
 * @type String
 */
M.MAP_SATELLITE = 'SATELLITE';

/**
 * A constant value for map type: terrain
 *
 * @type String
 */
M.MAP_TERRAIN = 'TERRAIN';

/**
 * A global reference to the first instances of M.MapView. We use this to have a accessible hook
 * to the map we can pass to google as a callback object.
 *
 * @type Object
 */
M.INITIAL_MAP = null;

/**
 * @class
 *
 * M.MapView is the prototype of a map view. It defines a set of methods for
 * displaying a map, setting markers and showing the current location. This
 * map view is based on google maps, but other implementations are possible.
 *
 * @extends M.View
 */
M.MapView = M.View.extend(
/** @scope M.MapView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.MapView',

    /**
     * This property is used to save a reference to the actual google map. It
     * is set automatically when the map is firstly initialized.
     *
     * @type Object
     */
    map: null,

    /**
     * This property is used to store the map's M.MapMarkerViews. If a marker
     * is set within the init() method or by calling the addMarker() method,
     * it is automatically pushed into this array.
     *
     * @type Object
     */
    markers: null,

    /**
     * Determines whether to display the map view 'inset' or at full width.
     *
     * @type Boolean
     */
    isInset: YES,

    /**
     * This property specifies the zoom level for this map view. It is directly
     * mapped to the zoom property of a google map view. For further information
     * see the google maps API specification:
     *
     *   http://code.google.com/intl/de-DE/apis/maps/documentation/javascript/reference.html#MapOptions
     *
     * @type Number
     */
    zoomLevel: 15,

    /**
     * This property specifies the map type for this map view. It is directly
     * mapped to the 'mapTypeId' property of a google map view. Possible values
     * for this property are:
     *
     *   - M.MAP_ROADMAP --> This map type displays a normal street map.
     *   - M.MAP_HYBRID --> This map type displays a transparent layer of major streets on satellite images.
     *   - M.MAP_SATELLITE --> This map type displays satellite images.
     *   - M.MAP_TERRAIN --> This map type displays maps with physical features such as terrain and vegetation.
     *
     * For further information see the google maps API specification:
     *
     *   http://code.google.com/intl/en-US/apis/maps/documentation/javascript/reference.html#MapOptions
     *
     * @type String
     */
    mapType: M.MAP_ROADMAP,

    /**
     * This property specifies whether or not to display the map type controls
     * inside of this map view. For further information see the google maps API
     * specification:
     *
     *   http://code.google.com/intl/en-US/apis/maps/documentation/javascript/reference.html#MapOptions
     *
     * @type Boolean
     */
    showMapTypeControl: NO,

    /**
     * This property specifies whether or not to display the navigation controls
     * inside of this map view. For further information see the google maps API
     * specification:
     *
     *   http://code.google.com/intl/en-US/apis/maps/documentation/javascript/reference.html#MapOptions
     *
     * @type Boolean
     */
    showNavigationControl: NO,

    /**
     * This property specifies whether or not to display the street view controls
     * inside of this map view. For further information see the google maps API
     * specification:
     *
     *   http://code.google.com/intl/en-US/apis/maps/documentation/javascript/reference.html#MapOptions
     *
     * @type Boolean
     */
    showStreetViewControl: NO,

    /**
     * This property specifies whether the map is draggable or not. If set to NO,
     * a user won't be able to move the map, respectively the visible sector. For
     * further information see the google maps API specification:
     *
     *   http://code.google.com/intl/en-US/apis/maps/documentation/javascript/reference.html#MapOptions
     *
     * @type Boolean
     */
    isDraggable: YES,

    /**
     * This property specifies the initial location for this map view, as an M.Location
     * object. Its latitude and longitude properties are directly mapped to the center
     * property of a google map view. For further information see the google maps API
     * specification:
     *
     *   http://code.google.com/intl/en-US/apis/maps/documentation/javascript/reference.html#MapOptions
     *
     * @type M.Location
     */

    initialLocation: M.Location.extend({
        latitude: 48.813338,
        longitude: 9.178463
    }),

    /**
     * This property determines whether or not to show a marker at the map view's
     * initial location. This location can be specified by the initialLocation
     * property of this map view.
     *
     * @type Boolean
     */
    setMarkerAtInitialLocation: NO,

    /**
     * This property can be used to specify the animation type for this map view's
     * markers. The following three values are possible:
     *
     *   M.MAP_MARKER_ANIMATION_NONE --> no animation
     *   M.MAP_MARKER_ANIMATION_DROP --> the marker drops onto the map
     *   M.MAP_MARKER_ANIMATION_BOUNCE --> the marker constantly bounces
     *
     * @type String
     */
    markerAnimationType: M.MAP_MARKER_ANIMATION_NONE,

    /**
     * This property spacifies whether or not this map has already been initialized.
     *
     * @type Boolean
     */
    isInitialized: NO,

    /**
     * This property specifies whether or not to remove all existing markers on a
     * map update. A map update can either be an automatic update due to content
     * binding or a implicit call of the map view's updateMap() method.
     *
     * @type Boolean
     */
    removeMarkersOnUpdate: YES,

    /**
     * If set, contains the map view's callback in sub a object named 'error',
     * which will be called if no connection is available and the map service
     * (google maps api) can not be loaded.
     *
     * @type Object
     */
    callbacks: null,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['click', 'tap'],

    /**
     * Renders a map view, respectively a map view container.
     *
     * @private
     * @returns {String} The map view's html representation.
     */
    render: function() {
        this.html += '<div data-fullscreen="true" id="' + this.id + '"';
        this.html += !this.isInset ? ' class="ui-listview"' : '';
        this.html += '><div id="' + this.id + '_map"' + this.style() + '></div></div>';

        return this.html;
    },

    /**
     * This method is called if the bound content changed. This content must be
     * an array of M.Location objects or M.MapMarkerView objects. This method
     * will take care of a re-rendering of the map view and all of its bound
     * markers.
     *
     * If M.Location objects are passed, the default settings for map markers
     * of this map view are assigned.
     *
     * Note that you can not use individual click events for your markers if
     * you pass M.Location objects.
     */
    renderUpdate: function() {
        /* check if content binding is valid */
        var content = null;
        if(!(this.contentBinding && this.contentBinding.target && typeof(this.contentBinding.target) === 'object' && this.contentBinding.property && typeof(this.contentBinding.property) === 'string' && this.contentBinding.target[this.contentBinding.property])) {
            M.Logger.log('No valid content binding specified for M.MapView (' + this.id + ')!', M.WARN);
            return;
        }

        /* get the marker / location objects from content binding */
        var content = this.contentBinding.target[this.contentBinding.property];
        var markers = [];

        /* save a reference to the map */
        var that = this;

        /* if we got locations, transform to markers */
        if(content && content[0] && content[0].type === 'M.Location') {
            _.each(content, function(location) {
                if(location && typeof(location) === 'object' && location.type === 'M.Location') {
                    markers.push(M.MapMarkerView.init({
                        location: location,
                        map: that
                    }));
                }
            });
        /* otherwise check and filter for map markers */
        } else if(content && content[0] && content[0].type === 'M.MapMarkerView') {
            markers = _.select(content, function(marker) {
                return (marker && marker.type === 'M.MapMarkerView')
            })
        }

        /* remove current markers */
        if(this.removeMarkersOnUpdate) {
            this.removeAllMarkers();
        }

        /* add all new markers */
        _.each(markers, function(marker) {
            that.addMarker(marker);
        })
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * We use this to disable event registration for M.MapView, since we only use the 'events' property
     * for determining the handler for possible map markers of this map.
     */
    registerEvents: function() {

    },

    /**
     * Applies some style-attributes to the map view.
     *
     * @private
     * @returns {String} The maps view's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    },

    /**
     * This method is used to initialize a map view, typically out of a controller.
     * With its options parameter you can set or update almost every parameter of
     * a map view. This allows you to define a map view within your view, but then
     * update its parameters later when you want this view to display a map.
     *
     * The options parameter must be passed as a simple object, containing all of
     * the M.MapView's properties you want to be updated. Such an options object
     * could look like the following:
     *
     *   {
     *     zoomLevel: 12,
     *     mapType: M.MAP_HYBRID,
     *     initialLocation: location
     *   }
     *
     * While all properties of the options parameter can be given as Number, String
     * or a constant value, the location must be a valid M.Location object.
     *
     * @param {Object} options The options for the map view.
     * @param {Boolean} isUpdate Indicates whether this is an update call or not.
     */
    initMap: function(options, isUpdate) {
        if(!this.isInitialized || isUpdate) {
            if(!isUpdate) {
                this.markers = [];
            }

            if(typeof(google) === 'undefined') {
                /* store the passed params and this map globally for further use */
                M.INITIAL_MAP = {
                    map: this,
                    options: options,
                    isUpdate: isUpdate
                };

                /* check the connection status */
                M.Environment.getConnectionStatus({
                    target: this,
                    action: 'didRetrieveConnectionStatus'
                });
            } else {
                this.googleDidLoad(options, isUpdate, true);
            }
        } else {
            M.Logger.log('The M.MapView has already been initialized', M.WARN);
        }
    },

    /**
     * This method is used internally to retrieve the connection status. If there is a connection
     * available, we will include the google maps api.
     *
     * @private
     */
    didRetrieveConnectionStatus: function(connectionStatus) {
        if(connectionStatus === M.ONLINE) {
            $('body').append('<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true&callback=M.INITIAL_MAP.map.googleDidLoad"></script>');
        } else {
            if(this.callbacks && M.EventDispatcher.checkHandler(this.callbacks.error, 'offline')){
                this.bindToCaller(this.callbacks.error.target, this.callbacks.error.action)();
            }
        }
    },

    /**
     * This method is used internally to initialite the map if the google api hasn't been loaded
     * before. If so, we use this method as callback for google.
     *
     * @private
     */
    googleDidLoad: function(options, isUpdate, isInternalCall) {
        if(!isInternalCall) {
            options = M.INITIAL_MAP.options;
            isUpdate = M.INITIAL_MAP.isUpdate;
        }

        for(var i in options) {
             switch (i) {
                 case 'zoomLevel':
                    this[i] = (typeof(options[i]) === 'number' && options[i] > 0) ? (options[i] > 22 ? 22 : options[i]) : this[i];
                    break;
                 case 'mapType':
                    this[i] = (options[i] === M.MAP_ROADMAP || options[i] === M.MAP_HYBRID || options[i] === M.MAP_SATELLITE || options[i] === M.MAP_TERRAIN) ? options[i] : this[i];
                    break;
                 case 'markerAnimationType':
                    this[i] = (options[i] === M.MAP_MARKER_ANIMATION_BOUNCE || options[i] === M.MAP_MARKER_ANIMATION_DROP) ? options[i] : this[i];
                    break;
                 case 'showMapTypeControl':
                 case 'showNavigationControl':
                 case 'showStreetViewControl':
                 case 'isDraggable':
                 case 'setMarkerAtInitialLocation':
                 case 'removeMarkersOnUpdate':
                    this[i] = typeof(options[i]) === 'boolean' ? options[i] : this[i];
                    break;
                 case 'initialLocation':
                    this[i] = (typeof(options[i]) === 'object' && options[i].type === 'M.Location') ? options[i] : this[i];
                    break;
                 default:
                    break;
             }
        };
        if(isUpdate) {
            if(this.removeMarkersOnUpdate) {
                this.removeAllMarkers();
            }
            this.map.setOptions({
                zoom: this.zoomLevel,
                center: new google.maps.LatLng(this.initialLocation.latitude, this.initialLocation.longitude),
                mapTypeId: google.maps.MapTypeId[this.mapType],
                mapTypeControl: this.showMapTypeControl,
                navigationControl: this.showNavigationControl,
                streetViewControl: this.showStreetViewControl,
                draggable: this.isDraggable
            });
        } else {
            this.map = new google.maps.Map($('#' + this.id + '_map')[0], {
                zoom: this.zoomLevel,
                center: new google.maps.LatLng(this.initialLocation.latitude, this.initialLocation.longitude),
                mapTypeId: google.maps.MapTypeId[this.mapType],
                mapTypeControl: this.showMapTypeControl,
                navigationControl: this.showNavigationControl,
                streetViewControl: this.showStreetViewControl,
                draggable: this.isDraggable
            });
        }

        if(this.setMarkerAtInitialLocation) {
            var that = this;
            this.addMarker(M.MapMarkerView.init({
                location: this.initialLocation,
                map: that.map
            }));
        }

        this.isInitialized = YES;
    },

    /**
     * This method is used to update a map view, typically out of a controller.
     * With its options parameter you can update or update almost every parameter
     * of a map view. This allows you to define a map view within your view, but
     * then update its parameters later when you want this view to display a map
     * and to update those options over and over again for this map. 
     *
     * The options parameter must be passed as a simple object, containing all of
     * the M.MapView's properties you want to be updated. Such an options object
     * could look like the following:
     *
     *   {
     *     zoomLevel: 12,
     *     mapType: M.MAP_HYBRID,
     *     initialLocation: location
     *   }
     *
     * While all properties of the options parameter can be given as Number, String
     * or a constant value, the location must be a valid M.Location object.
     *
     * @param {Object} options The options for the map view.
     */
    updateMap: function(options) {
        this.initMap(options, YES);
    },

    /**
     * This method can be used to add a marker to the map view. Simply pass a
     * valid M.MapMarkerView object and a map marker is created automatically,
     * displayed on the map and added to this map view's markers property.
     *
     * @param {M.MapMarkerView} marker The marker to be added.
     */
    addMarker: function(marker) {
        if(marker && typeof(marker) === 'object' && marker.type === 'M.MapMarkerView') {
            var that = this;
            marker.marker = new google.maps.Marker({
                map: that.map,
                draggable: NO,
                animation: google.maps.Animation[marker.markerAnimationType ? marker.markerAnimationType : that.markerAnimationType],
                position: new google.maps.LatLng(marker.location.latitude, marker.location.longitude)
            });
            marker.registerEvents();
            this.markers.push(
                marker
            );
        } else {
            M.Logger.log('No valid M.MapMarkerView passed for addMarker().', M.WARN);
        }
    },

    /**
     * This method can be used to remove a certain marker from the map view. In
     * order to do this, you need to pass the M.MapMarkerView object that you
     * want to be removed from the map view.
     *
     * @param {M.MapMarkerView} marker The marker to be removed.
     */
    removeMarker: function(marker) {
        if(marker && typeof(marker) === 'object' && marker.type === 'M.MapMarkerView') {
            var didRemoveMarker = NO;
            this.markers = _.select(this.markers, function(m) {
                if(marker === m){
                    m.marker.setMap(null);
                    didRemoveMarker = YES;
                }
                return !(marker === m);
            });
            if(!didRemoveMarker) {
                M.Logger.log('No marker found matching the passed marker in removeMarker().', M.WARN);    
            }
        } else {
            M.Logger.log('No valid M.MapMarkerView passed for removeMarker().', M.WARN);
        }
    },

    /**
     * This method removes all markers from this map view. It both cleans up the
     * markers array and deletes the marker's visual representation from the map
     * view.
     */
    removeAllMarkers: function() {
        _.each(this.markers, function(marker) {
            marker.marker.setMap(null);
        });
        this.markers = [];
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      27.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for the map's marker animation type: none
 *
 * @type String
 */
M.MAP_MARKER_ANIMATION_NONE = 'NONE';

/**
 * A constant value for the map's marker animation type: drop
 *
 * @type String
 */
M.MAP_MARKER_ANIMATION_DROP = 'DROP';

/**
 * A constant value for the map's marker animation type: bounce
 *
 * @type String
 */
M.MAP_MARKER_ANIMATION_BOUNCE = 'BOUNCE';

/**
 * @class
 *
 * M.MapMarkerView is the prototype of a map marker view. It defines a set
 * of methods for adding, removing and managing the markers of a M.MapView.
 *
 * The M.MapMarkerView is based on google maps markers.
 *
 * @extends M.View
 */
M.MapMarkerView = M.View.extend(
/** @scope M.MapMarkerView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.MapMarkerView',

    /**
     * This property is used to save a reference to the actual google map marker.
     * It is set automatically when the map marker is firstly initialized.
     *
     * @type Object
     */
    marker: null,

    /**
     * This property can be used to store additional information about a marker.
     * Since this property is an object, you can store pretty much anything in
     * this property.
     *
     * This can be useful especially if you are using the click event for map
     * markers. So you can store any information with a marker and retrieve
     * this information on the click event.
     *
     * @type Object
     */
    data: null,

    /**
     * This property contains a reference to the marker's map view.
     *
     * @type M.MapView
     */
    map: null,

    /**
     * This property specifies the title of a map marker view. It can be used in
     * an annotation.
     *
     * @type String
     */
    title: null,

    /**
     * This property specifies the message of a map marker view respectively for
     * its annotation.
     *
     * @type String
     */
    message: null,

    /**
     * This property can be used to specify whether or not to show the annotation,
     * if title and / or message are defined, automatically on click event.
     *
     * @type Boolean
     */
    showAnnotationOnClick: NO,

    /**
     * This property contains a reference to a google maps info window that is
     * connected to this map marker. By calling either the showAnnotation() or
     * the hideAnnotation() method, this info window can be toggled.
     *
     * Additionally the info window will be automatically set to visible if the
     * showAnnotationOnClick property is set to YES.
     *
     * @type Object
     */
    annotation: null,

    /**
     * This property specifies whether the marker is draggable or not. If set
     * to NO, a user won't be able to move the marker. For further information
     * see the google maps API specification:
     *
     *   http://code.google.com/intl/en-US/apis/maps/documentation/javascript/reference.html#MarkerOptions
     *
     * @type Boolean
     */
    isDraggable: NO,

    /**
     * This property specifies the location for this map marker view, as an M.Location
     * object. Its latitude and longitude properties are directly mapped to the position
     * property of a google maps marker. For further information see the google maps API
     * specification:
     *
     *   http://code.google.com/intl/en-US/apis/maps/documentation/javascript/reference.html#MarkerOptions
     *
     * @type M.Location
     */
    location: M.Location.extend({
        latitude: 48.813338,
        longitude: 9.178463
    }),

    /**
     * This property can be used to specify the animation type for this map marker
     * view. If this property is set, the markerAnimationType property of the parent
     * map view is ignored. The following three values are possible:
     *
     *   M.MAP_MARKER_ANIMATION_NONE --> no animation
     *   M.MAP_MARKER_ANIMATION_DROP --> the marker drops onto the map
     *   M.MAP_MARKER_ANIMATION_BOUNCE --> the marker constantly bounces
     *
     * @type String
     */
    markerAnimationType: null,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['click', 'tap'],

    /**
     * This method initializes an M.MapMarkerView. It connects a map marker directly with
     * the parent map view and returns the created M.MapMarkerView object.
     *
     * Note: By calling this method, the map marker won't be displayed on the map. It only gets
     * initialized and can no be displayed by using the map view's addMarker() method or via
     * content binding.
     *
     * @param {Object} options The options for the map marker view.
     */
    init: function(options) {
        var marker = this.extend(options);

        if(marker.annotation || marker.message) {
            var content = marker.title ? '<h1 class="ui-annotation-header">' + marker.title + '</h1>' : '';
            content += marker.message ? '<p class="ui-annotation-message">' + marker.message + '</p>' : '';
            
            marker.annotation = new google.maps.InfoWindow({
                content: content,
                maxWidth: 100
            });
        }

        return marker;
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for list item views and
     * their internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            tap: {
                target: this,
                action: 'showAnnotation'
            }
        }

        var that = this;
        google.maps.event.addListener(this.marker, 'click', function() {
            M.EventDispatcher.callHandler(that.internalEvents.tap, event, YES);
        });
    },

    /**
     * This method can be used to remove a map marker from a map view.
     */
    remove: function() {
        this.map.removeMarker(this);
    },

    /**
     * This method can be used to show a map markers annotation.
     */
    showAnnotation: function(id, event, nextEvent) {
        if(this.annotation) {
            this.annotation.open(this.map.map, this.marker);
        }

        /* delegate event to external handler, if specified */
        if(this.events || this.map.events) {
            var events = this.events ? this.events : this.map.events;
            for(var e in events) {
                if(e === (event.type === 'click' ? 'tap' : event.type)) {
                    M.EventDispatcher.callHandler(events[e], event, NO, [this]);
                }
            }
        }
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['pagebeforeshow', 'pageshow', 'pagebeforehide', 'pagehide', 'orientationchange'],

    /**
     * This property is used to specify a view's internal events and their corresponding actions. If
     * there are external handlers specified for the same event, the internal handler is called first.
     *
     * @type Object
     */
    internalEvents: null,

    /**
     * An associative array containing all list views used in this page. The key for a list view is
     * its id. We do this to have direct access to a list view, so we can reset its selected item
     * once the page was hidden.
     *
     * @type Object
     */
    listList: null,

    /**
     * This property contains the page's current orientation. This property is only used internally!
     *
     * @private
     * @type Number
     */
    orientation: null,

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
        /* store the currently rendered page as a reference for use in child views */
        M.ViewManager.currentlyRenderedPage = this;
        
        this.html += '<div id="' + this.id + '" data-role="page"' + this.style() + '>';

        this.renderChildViews();

        this.html += '</div>';

        this.writeToDOM();
        this.theme();
        this.registerEvents();
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for page views and its
     * internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            pagebeforeshow: {
                target: this,
                action: 'pageWillLoad'
            },
            pageshow: {
                target: this,
                action: 'pageDidLoad'
            },
            pagebeforehide: {
                target: this,
                action: 'pageWillHide'
            },
            pagehide: {
                target: this,
                action: 'pageDidHide'
            },
            orientationchange: {
                target: this,
                action: 'orientationDidChange'
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
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
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    pageWillLoad: function(id, event, nextEvent) {
        /* initialize the tabbar */
        if(M.Application.isFirstLoad) {
            M.Application.isFirstLoad = NO;
            var currentPage = M.ViewManager.getCurrentPage();
            if(currentPage && currentPage.hasTabBarView) {
                var tabBarView = currentPage.tabBarView;

                if(tabBarView.childViews) {
                    var childViews = tabBarView.getChildViewsAsArray();
                    for(var i in childViews) {
                        if(M.ViewManager.getPage(tabBarView[childViews[i]].page).id === currentPage.id) {
                            tabBarView.setActiveTab(tabBarView[childViews[i]]);
                        }
                    }
                }
            }
        }

        /* initialize the loader for later use (if not already done) */
        if(M.LoaderView) {
            M.LoaderView.initialize();
        }

        /* reset the page's title */
        document.title = M.Application.name;

        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, NO, [this.isFirstLoad]);
        }
    },

    /**
     * This method is called right after the page was loaded. If a onLoad-action is defined
     * for the page, it is now called.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    pageDidLoad: function(id, event, nextEvent) {
        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, NO, [this.isFirstLoad]);
        }

        /* call jqm to fix header/footer */
        $.fixedToolbars.show();

        this.isFirstLoad = NO;
    },

    /**
     * This method is called right before the page is hidden. If a beforeHide-action is defined
     * for the page, it is now called.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    pageWillHide: function(id, event, nextEvent) {
        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, NO, [this.isFirstLoad]);
        }
    },

    /**
     * This method is called right after the page was hidden. If a onHide-action is defined
     * for the page, it is now called.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    pageDidHide: function(id, event, nextEvent) {
        /* if there is a list on the page, reset it: deactivate possible active list items */
        if(this.listList) {
            _.each(this.listList, function(list) {
                list.resetActiveListItem();
            });
        }

        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, NO, [this.isFirstLoad]);
        }
    },

    /**
     * This method is called right after the device's orientation did change. If a action for
     * orientationchange is defined for the page, it is now called.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    orientationDidChange: function(id, event, nextEvent) {
        /* get the orientation */
        var orientation = M.Environment.getOrientation();
        
        /* filter event duplicates (can happen due to event delegation in bootstraping.js) */
        if(orientation === this.orientation) {
            return;
        }

        /* set the current orientation */
        this.orientation = orientation;

        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, NO, [M.Environment.getOrientation()]);
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
    
});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
        this.html += '<div id="' + this.id + '" data-role="content"' + this.style() + '>';

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
        //$('#' + this.id).page();
        this.themeChildViews();
    },

    /**
     * Applies some style-attributes to the scroll view.
     *
     * @private
     * @returns {String} The button's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['focus', 'blur', 'enter', 'keyup'],

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
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for text field views and
     * their internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            focus: {
                target: this,
                action: 'gotFocus'
            },
            blur: {
                target: this,
                action: 'lostFocus'
            },
            keyup: {
                target: this,
                action: 'setValueFromDOM'
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
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
    setValueFromDOM: function(id, event, nextEvent) {
        this.value = this.secure($('#' + this.id).val());
        this.delegateValueUpdate();

        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
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
    },

    /**
     * This method returns the search bar view's value.
     *
     * @returns {String} The search bar view's value.
     */
    getValue: function() {
        return this.value;
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * If the hasSearchBar property is set to YES and the usesDefaultSearchBehaviour is set to YES, this
     * property can be used to specify the inital text for the search bar. This text will be shown as long
     * as nothing else is entered into the search bar text field.
     *
     * @type String
     */
    searchBarInitialText: 'Search...',

    /**
     * An object containing target and action to be triggered if the search string changes.
     *
     * @type Object
     */
    onSearchStringDidChange: null,

    /**
     * An optional String defining the id property that is passed in view as record id
     *
     * @type String
     */
    idName: null,

    /**
     * Contains a reference to the currently selected list item.
     *
     * @type Object
     */
    selectedItem: null,

    /**
     * This method renders the empty list view either as an ordered or as an unordered list. It also applies
     * some styling, if the corresponding properties where set.
     *
     * @private
     * @returns {String} The list view's styling as html representation.
     */
    render: function() {
        /* add the list view to its surrounding page */
        if(!M.ViewManager.currentlyRenderedPage.listList) {
            M.ViewManager.currentlyRenderedPage.listList = [];
        }
        M.ViewManager.currentlyRenderedPage.listList.push(this);

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
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for list views and their
     * internal events.
     */
    registerEvents: function() {
        /*this.internalEvents = {
            focus: {
                target: this,
                action: 'gotFocus'
            },
            blur: {
                target: this,
                action: 'lostFocus'
            },
            keyup: {
                target: this,
                action: 'setValueFromDOM'
            }
        }*/
        this.bindToCaller(this, M.View.registerEvents)();
        if(this.hasSearchBar && !this.usesDefaultSearchBehaviour) {
            this.searchBar.registerEvents();
        }
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
        if(this.contentBinding && typeof(this.contentBinding.target) === 'object' && typeof(this.contentBinding.property) === 'string' && this.contentBinding.target[this.contentBinding.property]) {
            var content = this.contentBinding.target[this.contentBinding.property];
        } else {
            M.Logger.log('The specified content binding for the list view (' + this.id + ') is invalid!', M.WARN);
            return;
        }

        /* Get the list view's template view for each list item */
        var templateView = this.listItemTemplateView;

        /* if there is no template, log error and stop */
        if(!templateView) {
            M.Logger.log('The template view could not be loaded! Maybe you forgot to use m_require to set up the correct load order?', M.ERR);
            return;
        }

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

        /* At last fix the toolbar */
        $.fixedToolbars.show();
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
            } else if(item.id || !isNaN(item.id)) {
                obj.modelId = item.id;
            } else if(item[that.idName] || item[that.idName] === "") {
                obj.modelId = item[that.idName];
            }

            /* Get the child views as an array of strings */
            var childViewsArray = obj.getChildViewsAsArray();

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
                    events: {
                        tap: {
                            target: that.editOptions.target,
                            action: that.editOptions.action
                        }
                    },
                    internalEvents: {
                        tap: {
                            target: that,
                            action: 'removeListItem'
                        }
                    }
                });
            }

            /* set the list view as 'parent' for the current list item view */
            obj.parentView = that;

            /* Add the current list view item to the list view ... */
            that.addItem(obj.render());

            /* register events */
            obj.registerEvents();
            if(obj.deleteButton) {
                obj.deleteButton.registerEvents();
            }

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
            /* JQM-hack: remove multiple search bars */
            if($('#' + this.id) && $('#' + this.id).parent()) {
                var searchBarsFound = 0;
                $('#' + this.id).parent().find('form.ui-listview-filter').each(function() {
                    searchBarsFound += 1;
                    if(searchBarsFound == 1) {
                        return;
                    }
                    $(this).remove();
                });
            }
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
        if(this.contentBinding && typeof(this.contentBinding.target) === 'object' && typeof(this.contentBinding.property) === 'string' && this.contentBinding.target[this.contentBinding.property]) {
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
    setActiveListItem: function(listItemId, event, nextEvent) {
        if(this.selectedItem) {
            this.selectedItem.removeCssClass('ui-btn-active');
        }
        this.selectedItem = M.ViewManager.getViewById(listItemId);

        /* is the selection list items are selectable, activate the right one */
        if(this.listItemTemplateView && this.listItemTemplateView.isSelectable) {
            this.selectedItem.addCssClass('ui-btn-active');
        }

        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, NO, [listItemId, this.selectedItem.modelId]);
        }
    },

    /**
     * This method resets the list by applying the default css style to its currently activated
     * list item.
     *
     * @param {String} listItemId The id of the list item to be set active.
     */
    resetActiveListItem: function() {
        if(this.selectedItem) {
            this.selectedItem.removeCssClass('ui-btn-active');
        }
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
            html += ' data-filter="true" data-filter-placeholder="' + this.searchBarInitialText + '"';
        }
        return html;
    },

    removeListItem: function(id, event, nextEvent) {
        var modelId = M.ViewManager.getViewById(id).modelId;

        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, NO, [id, modelId]);
        }
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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

            if((this.isSelected && typeof(this.isSelected) === 'boolean') || (this.isSelected === String(YES))) {
                if(!this.parentView.selection) {
                    this.html += ' selected="selected"';
                    this.parentView.selection = this;
                }
            }

            this.html += '>';
            
            this.html += this.label ? this.label : this.value;

            this.html += '</option>';
        } else {
            this.html += '<input type="' + this.parentView.selectionMode + '" data-native-menu="false" id="' + this.id + '"';

            if(this.parentView.selectionMode === M.SINGLE_SELECTION) {
                this.html += ' name="' + (this.parentView.name ? this.parentView.name : this.parentView.id) + '"';
            } else if(this.parentView.selectionMode === M.MULTIPLE_SELECTION) {
                this.html += ' name="' + (this.name ? this.name : this.id) + '"';
            }

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
        if(this.parentView) {
            if(this.parentView.selectionMode !== M.SINGLE_SELECTION_DIALOG) {
                $('#' + this.id).checkboxradio();
            }
        }
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * The selected item(s) of this list.
     *
     * @type String, Array
     */
    selection: null,

    /**
     * This property defines the tab bar's name. This is used internally to identify
     * the selection list inside the DOM.
     *
     * @type String
     */
    name: null,

    
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
     * This property is used internally to store the selection list's initial state. This is used to be able
     * to reset the selection list later on using the resetSelection method.
     *
     * Note: This property is only used if the selection list's child views are specified directly (without
     * content binding). Otherwise the state is stored within the content binding and does not need to be
     * stored with this selection list.
     *
     * @private
     * @type Object
     */
    initialState: null,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['change'],

    /**
     * Renders a selection list.
     *
     * @private
     * @returns {String} The selection list view's html representation.
     */
    render: function() {

        /* initialize the initialState property as new array */
        this.initialState = [];

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

            this.html += '<select name="' + (this.name ? this.name : this.id) + '" id="' + this.id + '"' + this.style() + '>';

            this.renderChildViews();

            this.html += '</select>';

        } else {

            this.html += '<fieldset data-role="controlgroup" data-native-menu="false" id="' + this.id + '">';

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
            var childViews = this.getChildViewsAsArray();

            for(var i in childViews) {
                var view = this[childViews[i]];
                if(view.type === 'M.SelectionListItemView') {
                    view.parentView = this;
                    view._name = childViews[i];
                    this.html += view.render();

                    /* store list item in initialState property */
                    this.initialState.push({
                        value: view.value,
                        label: view.label,
                        isSelected: view.isSelected
                    });
                } else {
                    M.Logger.log('Invalid child views specified for SelectionListView. Only SelectionListItemViews accepted.', M.WARN);
                }
            }
        } else if(!this.contentBinding) {
            M.Logger.log('No SelectionListItemViews specified.', M.WARN);
        }
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for text field views and
     * their internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            change: {
                target: this,
                action: 'itemSelected'
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
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
            /* assign the value property to 'items' since this was automatically set by contentDidChange of M.View */
            var items = this.value;
            for(var i in items) {
                var item  = items[i];
                var obj = null;
                obj = M.SelectionListItemView.design({
                    value: item.value ? item.value : '',
                    label: item.label ? item.label : (item.value ? item.value : ''),
                    parentView: this,
                    isSelected: item.isSelected
                });
                if(this.selectionMode !== M.SINGLE_SELECTION_DIALOG) {
                    obj.name = item.name ? item.name : (item.label ? item.label : (item.value ? item.value : ''));
                }

                this.addItem(obj.render());
                obj.theme();
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
        if(this.selectionMode === M.SINGLE_SELECTION_DIALOG) {
            $('#' + this.id).selectmenu();
            if(this.initialText && !this.selection) {
                $('#' + this.id + '_container').find('.ui-btn-text').html(this.initialText);
            }
        } else if(this.selectionMode !== M.SINGLE_SELECTION_DIALOG) {
            $('#' + this.id).controlgroup();
        }
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the selection list.
     *
     * @private
     */
    themeUpdate: function() {
        if(this.selectionMode === M.SINGLE_SELECTION_DIALOG) {
            $('#' + this.id).selectmenu('refresh');
            if(this.initialText && !this.selection) {
                $('#' + this.id + '_container').find('.ui-btn-text').html(this.initialText);
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
     * @param {Object} event The event.
     * @param {Object} nextEvent The application-side event handler.
     */
    itemSelected: function(id, event, nextEvent) {
        var item = null;
        
        if(this.selectionMode === M.SINGLE_SELECTION) {
            item = M.ViewManager.getViewById($('input[name=' + (this.name ? this.name : this.id) + ']:checked').attr('id'));
            
            if(item !== this.selection) {
                this.selection = item;

                if(nextEvent) {
                    M.EventDispatcher.callHandler(nextEvent, event, NO, [this.selection.value, this.selection]);
                }
            }
        } else if(this.selectionMode === M.SINGLE_SELECTION_DIALOG) {
            item = M.ViewManager.getViewById($('#' + this.id + ' :selected').attr('id'));

            if(item !== this.selection) {
                this.selection = item;

                $('#' + this.id + '_container').find('.ui-btn-text').html(item.label ? item.label : item.value);

                if(nextEvent) {
                    M.EventDispatcher.callHandler(nextEvent, event, NO, [this.selection.value, this.selection]);
                }
            }
        } else if(this.selectionMode === M.MULTIPLE_SELECTION) {
            var that = this;
            this.selection = [];
            $('#' + id).find('input:checked').each(function() {
                that.selection.push(M.ViewManager.getViewById($(this).attr('id')));
            });

            var selectionValues = [];
            for(var i in this.selection) {
                selectionValues.push(this.selection[i].value);
            }

            if(nextEvent) {
                M.EventDispatcher.callHandler(nextEvent, event, NO, [selectionValues, this.selection]);
            }
        }
    },

    /**
     * This method returns the selected item's value(s) either as a String (M.SINGLE_SELECTION)
     * or as an Array (M.MULTIPLE_SELECTION).
     *
     * @param {Boolean} returnObject Determines whether to return the selected item(s) as object or not.
     * @returns {String|Object|Array} The selected item's value(s).
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
            return [];
        }
    },

    /**
     * This method can be used to select items programmatically. The given parameter can either
     * be a String (M.SINGLE_SELECTION) or an Array (M.MULTIPLE_SELECTION).
     *
     * @param {String|Array} selection The selection that should be applied to the selection list.
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
                    $(this).siblings('label:first').addClass('ui-radio-on');
                    $(this).siblings('label:first').removeClass('ui-radio-off');
                    $(this).siblings('label:first').find('span .ui-icon-radio-off').addClass('ui-icon-radio-on');
                    $(this).siblings('label:first').find('span .ui-icon-radio-off').removeClass('ui-icon-radio-off');
                }
            });
        } else if(this.selectionMode === M.SINGLE_SELECTION_DIALOG && typeof(selection) === 'string') {
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
                        $(this).siblings('label:first').removeClass('ui-checkbox-off');
                        $(this).siblings('label:first').addClass('ui-checkbox-on');
                        $(this).siblings('label:first').find('span .ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
                        $(this).siblings('label:first').find('span .ui-icon-checkbox-off').removeClass('ui-icon-checkbox-off');
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
        
        if(type !== 'select') {
            $('#' + this.id).find('input').each(function() {
                var item = M.ViewManager.getViewById($(this).attr('id'));
                item.isSelected = NO;
                $(this).removeAttr('checked');
                $(this).siblings('label:first').addClass('ui-' + type + '-off');
                $(this).siblings('label:first').removeClass('ui-' + type + '-on');
                $(this).siblings('label:first').find('span .ui-icon-' + type + '-on').addClass('ui-icon-' + type + '-off');
                $(this).siblings('label:first').find('span .ui-icon-' + type + '-on').removeClass('ui-icon-' + type + '-on');
            });
        } else {
            $('#' + this.id).find('option').each(function() {
                var item = M.ViewManager.getViewById($(this).attr('id'));
                item.isSelected = NO;
            });
        }
    },

    /**
     * This method can be used to reset the selection list. This basically discards
     * all changes made to the selection by the user or any application-sided calls
     * and applies the original state.
     *
     * The 'original state' can either be the bound content or the state, specified
     * by the originally assigned child views.
     */
    resetSelection: function() {
        if(this.contentBinding) {
            this.removeSelection();
            this.renderUpdate();
        } else {
            this.contentBinding = {};
            this.contentBinding.target = this;
            this.contentBinding.property = 'initialState';
            this.removeSelection();
            this.renderUpdate();
            this.contentBinding = null;
        }
    },

    /**
     *  We use this as alias for the form reset function view.clearValues() to reset the selection to its initial state
     */
    clearValue: function(){
        this.resetSelection();
    },

    /**
     * This method returns the selection list view's value.
     *
     * @returns {String|Array} The selected item's value(s).
     */
    getValue: function() {
        return this.getSelection();
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * This property is used internally to count the number of usages of a tab bar.
     */
    usageCounter: 0,

    /**
     * Renders a tab bar as an unordered list.
     *
     * @private
     * @returns {String} The tab bar view's html representation.
     */
    render: function() {
        this.html = '';
        this.usageCounter += 1;

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

        return this.html;
    },

    /**
     * Triggers render() on all children of type M.TabBarItemView.
     *
     * @private
     */
    renderChildViews: function() {
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();

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
                    view._name = childViews[i];
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
        var activeTabMainID = this.activeTab.id.substring(0, this.activeTab.id.lastIndexOf('_'));
        $('[id^=' + activeTabMainID + '_]').each(function() {
            $(this).removeClass('ui-btn-active');
        });

        /* activate new tab */
        tab.isActive = YES;
        this.activeTab = tab;
        var tabMainID = tab.id.substring(0, tab.id.lastIndexOf('_'));
        $('[id^=' + tabMainID + '_]').each(function() {
            $(this).addClass('ui-btn-active');
        });

    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['click', 'tap'],

    /**
     * Renders a tab bar item as a li-element inside of a parent tab bar view.
     *
     * @private
     * @returns {String} The button view's html representation.
     */
    render: function() {
        this.html = '';
        if(this.id.lastIndexOf('_') == 1) {
            this.id = this.id + '_' + this.parentView.usageCounter;
        } else {
            this.id = this.id.substring(0, this.id.lastIndexOf('_')) + '_' + this.parentView.usageCounter;
        }
        M.ViewManager.register(this);

        this.html += '<li><a id="' + this.id + '"' + this.style() + ' href="#">' + this.value + '</a></li>';
        
        return this.html;
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for tab bar item views and
     * their internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            tap: {
                target: this,
                action: 'switchPage'
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
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
    
});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for input type: text
 *
 * @type String
 */
M.INPUT_TEXT = 'text';

/**
 * A constant value for input type: password
 *
 * @type String
 */
M.INPUT_PASSWORD = 'password';

/**
 * A constant value for input type: number
 *
 * @type String
 */
M.INPUT_NUMBER = 'number';

/**
 * A constant value for input type: tel
 *
 * @type String
 */
M.INPUT_TELEPHONE = 'tel';

/**
 * A constant value for input type: url
 *
 * @type String
 */
M.INPUT_URL = 'url';

/**
 * A constant value for input type: email
 *
 * @type String
 */
M.INPUT_EMAIL = 'email';

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
     * If there is no label specified, this property is ignored by default.
     *
     * @type Boolean
     */
    isGrouped: NO,

    /**
     * Defines whether the text field has multiple lines respectively is a text area.
     *
     * @type Boolean
     */
    hasMultipleLines: NO,

    /**
     * This property specifies the input type of this input field. Possible values are:
     *
     *   - M.INPUT_TEXT --> text input (default)
     *   - M.INPUT_PASSWORD --> password
     *   - M.INPUT_NUMBER --> number
     *   - M.INPUT_TELEPHONE --> tel
     *   - M.INPUT_URL --> url
     *   - M.INPUT_EMAIL --> email
     *
     * Note, that these types are not yet supported by all browsers!
     *
     * @type String
     */
    inputType: M.INPUT_TEXT,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['focus', 'blur', 'enter', 'keyup'],

    /**
     * Renders a TextFieldView
     * 
     * @private
     * @returns {String} The text field view's html representation.
     */
    render: function() {
        this.computeValue();
        this.html += '<div';

        if(this.label && this.isGrouped) {
            this.html += ' data-role="fieldcontain"';
        }

        if(this.cssClass) {
            this.html += ' class="' + this.cssClass + '_container"';
        }

        this.html += '>';

        if(this.label) {
            this.html += '<label for="' + (this.name ? this.name : this.id) + '">' + this.label + '</label>';
        }

        if(this.hasMultipleLines) {
            this.html += '<textarea cols="40" rows="8" name="' + (this.name ? this.name : this.id) + '" id="' + this.id + '"' + this.style() + '>' + (this.value ? this.value : this.initialText) + '</textarea>';
            
        } else {
            this.html += '<input type="' + this.inputType + '" name="' + (this.name ? this.name : this.id) + '" id="' + this.id + '"' + this.style() + ' value="' + (this.value ? this.value : this.initialText) + '" />';
        }

        this.html += '</div>';

        return this.html;
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for text field views and
     * their internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            focus: {
                target: this,
                action: 'gotFocus'
            },
            blur: {
                target: this,
                action: 'lostFocus'
            },
            keyup: {
                target: this,
                action: 'setValueFromDOM'
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
    },

    /**
     * The contentDidChange method is automatically called by the observable when the
     * observable's state did change. It then updates the view's value property based
     * on the specified content binding.
     *
     * This is a special implementation for M.TextFieldView.
     */
    contentDidChange: function(){
        /* if the text field has the focus, we do not apply the content binding */
        if(this.hasFocus) {
            return;
        }

        /* let M.View do the real job */
        this.bindToCaller(this, M.View.contentDidChange)();

        this.renderUpdate();
        this.delegateValueUpdate();
    },

    /**
     * Updates a TextFieldView with DOM access by jQuery.
     *
     * @private
     */
    renderUpdate: function() {
        this.computeValue();
        $('#' + this.id).val(this.value);
        this.styleUpdate();
    },

    /**
     * This method is called whenever the view gets the focus.
     * If there is a initial text specified and the value of this text field
     * still equals this initial text, the value is emptied.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    gotFocus: function(id, event, nextEvent) {
        if(this.initialText && (!this.value || this.initialText === this.value)) {
            this.setValue('');
            if(this.cssClassOnInit) {
                this.removeCssClass(this.cssClassOnInit);
            }
        }
        this.hasFocus = YES;

        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }
    },

    /**
     * This method is called whenever the view lost the focus.
     * If there is a initial text specified and the value of this text field
     * is empty, the value is set to the initial text.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    lostFocus: function(id, event, nextEvent) {
        if(this.initialText && !this.value) {
            this.setValue(this.initialText, NO);
            this.value = '';
            if(this.cssClassOnInit) {
                this.addCssClass(this.cssClassOnInit);
            }
        }
        this.hasFocus = NO;

        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }
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
        html += '"';

        if(!this.isEnabled) {
            html += ' disabled="disabled"';
        }
        
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

        /* trigger keyup event to make the text field autogrow */
        if(this.value) {
            $('#'  + this.id).trigger('keyup');
        }
    },

    /**
     * Method to append css styles inline to the rendered view on the fly.
     *
     * @private
     */
    styleUpdate: function() {
        /* trigger keyup event to make the text field autogrow (enable fist, if necessary) */
        if(this.value) {
            $('#' + this.id).removeAttr('disabled');
            $('#'  + this.id).trigger('keyup');
        }

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
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    setValueFromDOM: function(id, event, nextEvent) {
        this.value = this.secure($('#' + this.id).val());
        this.delegateValueUpdate();

        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
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

        /* call lostFocus() to get the initial text displayed */
        this.lostFocus();
    },

    /**
     * This method returns the text field view's value.
     *
     * @returns {String} The text field view's value.
     */
    getValue: function() {
        return this.value;
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * Contains a reference to the currently displayed view.
     *
     * @type M.View
     */
    currentView: null,

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
            var childViews = this.getChildViewsAsArray();

            if(childViews.length !== 2) {
                M.Logger.log('M.ToggleView requires exactly 2 child views, but ' + childViews.length + ' are given (' + (this.name ? this.name + ', ' : '') + this.id + ')!', M.WARN);
            } else {
                for(var i in childViews) {
                    if(this[childViews[i]]) {
                        if(this.toggleOnClick) {
                            this[childViews[i]].internalEvents = {
                                tap: {
                                    target: this,
                                    action: 'toggleView'
                                }
                            }
                        }
                        this[childViews[i]]._name = childViews[i];
                        this[childViews[i]].parentView = this;
                        
                        this.html += '<div id="' + this.id + '_' + i + '">';
                        this.html += this[childViews[i]].render();
                        this.html += '</div>';
                    }
                }
                this.currentView = this[childViews[0]];
            }
        }
    },

    /**
     * This method toggles the child views by first emptying the toggle view's content
     * and then rendering the next child view by calling renderUpdateChildViews().
     */
    toggleView: function(id, event, nextEvent) {
        this.isInFirstState = !this.isInFirstState;
        var currentViewIndex = this.isInFirstState ? 0 : 1;
        $('#' + this.id + '_' + currentViewIndex).show();
        $('#' + this.id + '_' + (currentViewIndex > 0 ? 0 : 1)).hide();

        /* set current view */
        var childViews = this.getChildViewsAsArray();
        if(this[childViews[currentViewIndex]]) {
            this.currentView = this[childViews[currentViewIndex]];
        }

        /* call jqm to fix header/footer */
        $.fixedToolbars.show();

        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }
    },

    /**
     * This method can be used to set on of the toggle view's child views as the active one. Simply pass
     * the view, its id or its name.
     *
     * If a view or id is passed, that does not match on of the toggle view's child views, nothing will be
     * done.
     *
     * @param {Object|String} view The corresponding view.
     */
    setView: function(view) {
        if(typeof(view) === 'string') {
            /* assume a name was given */
            var childViews = this.getChildViewsAsArray();
            if(_.indexOf(childViews, view) >= 0) {
                view = this[view];
            /* assume an id was given */
            } else {
                view = M.ViewManager.getViewById(view) ? M.ViewManager.getViewById(view) : view;
            }
        }

        if(view && typeof(view) === 'object' && view.parentView === this) {
            if(this.currentView !== view) {
                this.toggleView();
            }
        } else {
            M.Logger.log('No valid view passed for toggle view \'' + this._name + '\'.', M.WARN);
        }
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the toggle view respectively
     * its child views.
     *
     * @private
     */
    theme: function() {
        if(this.currentView) {
            this.themeChildViews();
            var currentViewIndex = this.isInFirstState ? 0 : 1;

            $('#' + this.id + '_' + (currentViewIndex > 0 ? 0 : 1)).hide();
        }
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * If the showBackButton property is set to yes, this property will be used to
     * save a reference to the M.ButtonView.
     */
    backButton: null,

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
        this.html += '<div id="' + this.id + '" data-role="' + this.anchorLocation + '"' + this.style();

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
        if(this.value && this.showBackButton) {
            /* create the toolbar's back button */
            this.backButton = M.ButtonView.design({
                value: 'Back',
                icon: 'arrow-l',
                internalEvents: {
                    tap: {
                        action: function() {
                            history.back(-1);
                        }
                    }
                }
            });

            /* render the back button and add it to the toolbar's html*/
            this.html += '<div class="ui-btn-left">';
            this.html += this.backButton.render();
            this.html += '</div>';

            /* render the centered value */
            this.html += '<h1>' + this.value + '</h1>';
        } else if(this.value) {
            this.html += '<h1>' + this.value + '</h1>';
        } else if (this.childViews) {
            var childViews = this.getChildViewsAsArray();

            /* A ToolbarView accepts only 3 childViews, one for each location: left, center, right */
            if(childViews.length > 3) {
                M.Logger.log('To many childViews defined for toolb  arView.', M.WARN);
                return;
            }

            for(var i in childViews) {
                var view = this[childViews[i]];
                view._name = childViews[i];
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
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for list views and their
     * internal events.
     */
    registerEvents: function() {
        if(this.backButton) {
            this.backButton.registerEvents();
        }
        this.bindToCaller(this, M.View.registerEvents)();
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