// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Marco
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
M.PaginationView = M.View.extend(
/** @scope M.ListView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.PaginationView',

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
     * An optional String defining the id property that is passed in view as record id
     *
     * @type String
     */
    idName: null,


    /**
     * number of the listelements per page
     *
     * @type Numeric
     */
    itemsPerPage: 50,

    renderListItems: [],

    curPage: 1,

    numberOfPages:0,

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

        this.html += '<div class="pagination pagination_'+ this.id +'">';

        this.html += '</div>';

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
        $('.pageNumbers_' + this.id).empty();
        $('.pagination_' + this.id).empty();

        $('.pagination_' + this.id).html('<div class="pageNumbers pageNumbers_' + this.id + '"></div>');

        /* Remove all list items if the removeItemsOnUpdate property is set to YES */
        if(this.removeItemsOnUpdate) {
            this.removeAllItems();
        }

        /* Save this in variable that for later use within an other scope (e.g. _each()) */
        var that = this;

        var content = '';

        /* Get the list view's content as an object from the assigned content binding */
        if(this.contentBinding && typeof(this.contentBinding.target) === 'object' && typeof(this.contentBinding.property) === 'string') {

            var keyPath = this.contentBinding.property.split('.');

            if(keyPath.length === 1) {
                content = this.contentBinding.target[this.contentBinding.property];
            } else {
                content = (this.contentBinding.target[keyPath[0]] = this.contentBinding.target[keyPath[0]] ? this.contentBinding.target[keyPath[0]] : {});
                for(var i = 1; i <= keyPath.length - 1; i++) {
                    content = (content[keyPath[i]] = content[keyPath[i]] ? content[keyPath[i]] : {});
                }
            }
        } else {
            M.Logger.log('The specified content binding for the list view (' + this.id + ') is invalid!', M.WARN);
            return;
        }

        /* If there is an items property, re-assign this to content, otherwise iterate through content itself */
        if(this.items) {
            content = content[this.items];
        }

        this.renderListItems = [];

        /* Get the list view's template view for each list item */
        var templateView = this.listItemTemplateView;

        //set the current page
        this.curPage = 1;
        //when the number of items is smaller than the pages to show
        if(content.length > this.itemsPerPage){
            this.numberOfPages = Math.ceil(content.length/this.itemsPerPage);

            for(var i = 1; i <= this.numberOfPages; i++){
                //get the current items to display
                if(this.curPage == i){
                    this.renderListItems.push(this.getItemsToDisplay(i));
                }

                //build the navigation ankers
                var paginationId = this.id + ', _page_' + i;
                var a = '<a href="javascript:;" class="pageLink pageLink_' + i + '"';
                a += ' onclick="' + this.type + '.switchPagination(\'' + this.id + '\',\''+ i +'\');"';
                a += '>' + i + '</a>';
                $('.pageNumbers_' + this.id).append(a);
            }

//            var pagination_width = $('.pagination .pageNumbers a').outerWidth()*this.numberOfPages;
//            $('.pagination_' + this.id + ' .pageNumbers').css("width", pagination_width);

            //build the navigation bar
            $('.pagination_' + this.id + ' .pageNumbers .pageLink_1').addClass('active');
            var prevAnker = '<a href="javascript:;" class="prevButton"' + ' onclick="' + this.type + '.switchPagination(\'' + this.id + '\',\'prev\');"' + '></a>';
            var nextAnker = '<a href="javascript:;" class="nextButton"' + ' onclick="' + this.type + '.switchPagination(\'' + this.id + '\',\'next\');"' + '></a>';
            var _html = $('.pagination_' + this.id).html();
            $('.pagination_' + this.id).html(prevAnker + _html + nextAnker);

        }else{
            this.renderListItems.push(content);
        }

        if(this.isDividedList) {
            _.each(this.renderListItems, function(items, divider) {
                that.renderListItemDivider(divider);
                that.renderListItemView(items, templateView);
            });
        } else {
            this.renderListItemView(this.renderListItems[0], templateView);
        }

        /* Finally let the whole list look nice */
        this.themeUpdate();
        this.updatePaginationNavigation(1, this);
    },

    getItemsToDisplay: function(pageNumber, view){
        var that = view;
        if(!that){
            that = this;
        }

        var content = "";
        /* Get the list view's content as an object from the assigned content binding */
        if(that.contentBinding && typeof(that.contentBinding.target) === 'object' && typeof(that.contentBinding.property) === 'string' && that.contentBinding.target[that.contentBinding.property]) {
            content = that.contentBinding.target[that.contentBinding.property];
        } else {
            M.Logger.log('The specified content binding for the list view (' + that.id + ') is invalid!', M.WARN);
            return;
        }
        var tmp = [];
        var startIndex = (pageNumber*that.itemsPerPage)-that.itemsPerPage;
        for(var k = 0; k < that.itemsPerPage; k++){
            var c = content[k+startIndex];
            //if the number of items is lower than itemsperpage
            if(!c){
                break;
            }
            tmp.push(c);
        }
        return tmp;
    }

    ,switchPagination: function(viewId, pageId){
        var view = M.ViewManager.getViewById(viewId);

        var gotoPage = pageId;

        if(gotoPage == 'next'){
            if(view.curPage < view.numberOfPages){
                gotoPage = parseInt(view.curPage, 10) + 1;
            }else{
                return;
            }
        }else if(gotoPage == 'prev'){
            if(view.curPage > 1){
                gotoPage = parseInt(view.curPage, 10) - 1;
            }else{
                return;
            }
        }else{
             gotoPage = parseInt(pageId, 10);
        }
        view.curPage = gotoPage;
        this.updatePaginationNavigation(gotoPage, view);
        view.removeAllItems();
        view.renderListItemView(this.getItemsToDisplay(gotoPage, view), view.listItemTemplateView);
        view.themeUpdate();

        //set active anker
        $('.pagination_' + viewId + ' .pageNumbers a').removeClass('active');
        $('.pagination_' + viewId + ' .pageNumbers .pageLink_' + gotoPage).addClass('active');
    },

    updatePaginationNavigation: function(actPage, view){
        var that = view;
        var pageLinks = $('.pageNumbers_' + that.id + ' .pageLink');

        var numberOfPageLinks = pageLinks.length;
        var offset = 5;

        if(numberOfPageLinks >= offset){
            var firstElem = $('.pageNumbers_' + that.id + ' .pageLink:eq(0)').show();
            var lastElem = $('.pageNumbers_' + that.id + ' .pageLink:eq(' + (numberOfPageLinks-1) + ')');

            var divider = '<span class="divider"> ... </span>';

            $('.pageNumbers_' + that.id + ' .divider').remove();

            actPage = actPage-(offset-1);
            if(actPage < 0){
                actPage = 0;
            }
            if(actPage > numberOfPageLinks-(offset+Math.floor(offset/2))){
                actPage = numberOfPageLinks-(offset+Math.floor(offset/2));
                if(actPage < 0){
                    actPage = 0;
                }
            }
            if(actPage >= 1){
                firstElem.append(divider);
            }
            if(actPage < numberOfPageLinks-(offset+Math.floor(offset/2))){
                lastElem.prepend(divider);
            }


            pageLinks.hide();
            //all pagenumbers in the offset range
            if(numberOfPageLinks <= offset){
                $ ('.pageNumbers_' + that.id + ' .pageLink').show();
            }else{
                $ ('.pageNumbers_' + that.id + ' .pageLink:gt(' + actPage + '):lt(' + offset + ')').show();
            }

            firstElem.show();
            lastElem.show();
        }

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
                    regexResult = /^<%=\s+([.|_|-|$|ß|a-zA-Z]+[0-9]*[.|_|-|$|ß|a-zA-Z]*)\s*%>$/.exec(obj[childViewsArray[i]].computedValue.valuePattern);
                } else {
                    regexResult = /^<%=\s+([.|_|-|$|ß|a-zA-Z]+[0-9]*[.|_|-|$|ß|a-zA-Z]*)\s*%>$/.exec(obj[childViewsArray[i]].valuePattern);
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

            /* set the list view as 'parent' for the current list item view */
            obj.parentView = that;

            /* Add the current list view item to the list view ... */
            that.addItem(obj.render());

            obj.registerEvents();

            /* ... once it is in the DOM, make it look nice */
            for(var i in childViewsArray) {
                obj[childViewsArray[i]].theme();
            }
        });
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
        this.selectedItem.addCssClass('ui-btn-active');

        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, NO, [listItemId, this.selectedItem.modelId]);
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
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
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

});