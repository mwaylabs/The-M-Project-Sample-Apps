/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.TabsView = [
        {
            icon: 'fa-cloud',
            headline: 'Tab1',
            content: M.TabView.extend({
                value: 'Tab1 Content'
            }, {
                c1: M.View.extend({
                    cssClass: 'inner-content',
                    value: 'content content',
                    events: {
                        drag: function( event, element ) {
                            element._setValue('drag did happen');
                            element.render();
                        },
                        dragleft: function( event, element ) {
                            element._setValue('dragleft did happen');
                        },
                        dragright: function( event, element ) {
                            element._setValue('dragright did happen');
                        }
                    }
                })
            })
        },
        {
            icon: 'fa-comment',
            headline: 'Tab2',
            content: M.TabView.extend({
                value: 'Tab2 Content'
            }, {
                c2: M.View.extend({
                    cssClass: 'inner-content',
                    value: 'content content',
                    events: {
                        drag: function( event, element ) {
                            element._setValue('drag did happen');
                            element.render();
                        },
                        dragleft: function( event, element ) {
                            element._setValue('dragleft did happen');
                        },
                        dragright: function( event, element ) {
                            element._setValue('dragright did happen');
                        }
                    }
                })
            })
        },
        {
            icon: 'fa-coffee',
            headline: 'Tab3',
            content: M.TabView.extend({
                value: 'Tab3 Content'
            }, {
                c3: M.View.extend({
                    cssClass: 'inner-content',
                    value: 'content content',
                    events: {
                        drag: function( event, element ) {
                            element._setValue('drag did happen');
                            element.render();
                        },
                        dragleft: function( event, element ) {
                            element._setValue('dragleft did happen');
                        },
                        dragright: function( event, element ) {
                            element._setValue('dragright did happen');
                        }
                    }
                })
            })
        },
        {
            icon: 'fa-bug',
            headline: 'Tab4',
            content: M.TabView.extend({
                value: 'Tab4 Content'
            }, {
                c4: M.View.extend({
                    cssClass: 'inner-content',
                    value: 'content content',
                    events: {
                        drag: function( event, element ) {
                            element._setValue('drag did happen');
                            element.render();
                        },
                        dragleft: function( event, element ) {
                            element._setValue('dragleft did happen');
                        },
                        dragright: function( event, element ) {
                            element._setValue('dragright did happen');
                        }
                    }
                })
            })
        },
        {
            icon: 'fa-square',
            headline: 'Tab5',
            content: M.TabView.extend({
                value: 'Tab5 Content'
            }, {
                c5: M.View.extend({
                    cssClass: 'inner-content',
                    value: 'content content',
                    events: {
                        drag: function( event, element ) {
                            element._setValue('drag did happen');
                            element.render();
                        },
                        dragleft: function( event, element ) {
                            element._setValue('dragleft did happen');
                        },
                        dragright: function( event, element ) {
                            element._setValue('dragright did happen');
                        }
                    }
                })
            })
        },
        {
            icon: 'fa-th',
            headline: 'Tab6',
            content: M.TabView.extend({
                value: 'Tab6 Content'
            }, {
                c6: M.View.extend({
                    cssClass: 'inner-content',
                    value: 'content content',
                    events: {
                        drag: function( event, element ) {
                            element._setValue('drag did happen');
                            element.render();
                        },
                        dragleft: function( event, element ) {
                            element._setValue('dragleft did happen');
                        },
                        dragright: function( event, element ) {
                            element._setValue('dragright did happen');
                        }
                    }
                })
            })
        }
    ];
})();
