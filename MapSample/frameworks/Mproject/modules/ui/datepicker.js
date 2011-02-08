// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      04.02.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * This defines the prototype fora date picker view.
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

    render: function() {
        this.html += '<input type="date" id="' + this.id + '"' + this.style() + ' />';

        return this.html;
    },

    theme: function() {
        $('.hasDatepicker').hide();
        $('.hasDatepicker td').click(function() {
            $('.hasDatepicker').hide();
        });
    },

    gotFocus: function() {
        $('.hasDatepicker').show();
    },

    setValueFromDOM: function() {
        $('.hasDatepicker').hide();
    }

});