// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c)2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      03.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

SplitViewSample.MyController = M.Controller.extend({

    menu: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            /*var menu = [
                M.SplitItemView.design({
                    value: 'Item1',
                    view: SplitViewSample.ContentPage1,
                    isActive: YES
                }),

                M.SplitItemView.design({
                    value: 'Item2',
                    view: SplitViewSample.ContentPage2
                }),

                M.SplitItemView.design({
                    value: 'Item3',
                    view: SplitViewSample.ContentPage3
                })
            ];

            this.set('menu', menu);*/

        }
        
    }

});