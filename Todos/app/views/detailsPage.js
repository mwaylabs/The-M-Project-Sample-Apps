// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Todos
// View: DetailsPage
// ==========================================================================

m_require('app/views/tabs.js');

Todos.DetailsPage = M.PageView.design({

    events: {
        pagehide: {
            target: Todos.DetailsController,
            action: 'resetToggleView'
        }
    },

    childViews: 'header content tabs',

    header: M.ToolbarView.design({
        childViews: 'back title toggleButton',

        back: M.ButtonView.design({
            icon: 'arrow-l',
            value: M.I18N.l('back'),
            anchorLocation: M.LEFT,
            events: {
                tap: {
                    target: Todos.DetailsController,
                    action: 'goBack'
                }
            }
        }),

        title: M.LabelView.design({
            computedValue: {
                contentBinding: {
                    target: Todos.DetailsController,
                    property: 'record'
                },
                operation: function(v) {
                    if(v) {
                        return '#' + v.m_id;
                    }
                }
            },
            anchorLocation: M.CENTER
        }),

        toggleButton: M.ToggleView.design({
            childViews: 'button1 button2',
            anchorLocation: M.RIGHT,
            toggleOnClick: YES,

            button1: M.ButtonView.design({
                value: M.I18N.l('edit'),
                events: {
                    tap: {
                        target: Todos.DetailsController,
                        action: 'showEditItem'
                    }
                },
                icon: 'gear'
            }),

            button2: M.ButtonView.design({
                value: M.I18N.l('save'),
                events: {
                    tap: {
                        target: Todos.DetailsController,
                        action: 'saveItem'
                    }
                },
                icon: 'check'
            })
        }),

        anchorLocation: M.TOP
    }),

    content: M.ToggleView.design({

        childViews: 'content1 content2',

        content1: M.ScrollView.design({

            childViews: 'titleLabel title textLabel text dateLabel date',

            titleLabel: M.LabelView.design({
                value: M.I18N.l('title'),
                cssClass: 'detailsLabel'
            }),

            title: M.LabelView.design({
                computedValue: {
                    contentBinding: {
                        target: Todos.DetailsController,
                        property: 'record'
                    },
                    operation: function(v) {
                        if(v) {
                            return v.get('title');
                        }
                    }
                },
                cssClass: 'details'
            }),

            textLabel: M.LabelView.design({
                value: M.I18N.l('details'),
                cssClass: 'detailsSpacer detailsLabel'
            }),

            text: M.LabelView.design({
                computedValue: {
                    contentBinding: {
                        target: Todos.DetailsController,
                        property: 'record'
                    },
                    operation: function(v) {
                        if(v) {
                            return v.get('text');
                        }
                    }
                },
                cssClass: 'details'
            }),

            dateLabel: M.LabelView.design({
                value: M.I18N.l('due_date'),
                cssClass: 'detailsSpacer detailsLabel'
            }),

            date: M.LabelView.design({
                computedValue: {
                    contentBinding: {
                        target: Todos.DetailsController,
                        property: 'record'
                    },
                    operation: function(v) {
                        if(v && v.get('date')) {
                            return v.get('date').format(M.I18N.l('due_date_format'));
                        }
                    }
                },
                cssClass: 'details'
            })
        }),

        content2: M.ScrollView.design({

            childViews: 'form1',

            form1: M.FormView.design({
                childViews: 'title text date buttonSave buttonDelete',
                showAlertDialogOnError: YES,
                alertTitle: M.I18N.l('error'),

                title: M.TextFieldView.design({
                    name: 'title',
                    label: M.I18N.l('title'),
                    validators: [M.PresenceValidator.customize({
                        msg: M.I18N.l('title_req')
                    })],
                    cssClassOnError: 'error',
                    cssClass: 'todos_form',
                    computedValue: {
                        contentBinding: {
                            target: Todos.DetailsController,
                            property: 'record'
                        },
                        operation: function(v) {
                            if(v) {
                                return v.get('title');
                            }
                        }
                    }
                }),

                text: M.TextFieldView.design({
                    hasMultipleLines: YES,
                    name: 'text',
                    label: M.I18N.l('details'),
                    validators: [M.PresenceValidator.customize({
                        msg: M.I18N.l('details_req')
                    })],
                    cssClassOnError: 'error',
                    cssClass: 'todos_form',
                    computedValue: {
                        contentBinding: {
                            target: Todos.DetailsController,
                            property: 'record'
                        },
                        operation: function(v) {
                            if(v) {
                                return v.get('text');
                            }
                        }
                    }
                }),

                date: M.TextFieldView.design({
                    name: 'date',
                    label: M.I18N.l('due_date'),
                    initialText: M.I18N.l('due_date_format'),
                    validators: [M.PresenceValidator.customize({
                        msg: M.I18N.l('due_date_req')
                    }), M.DateValidator.customize({
                        msg: M.I18N.l('due_date_invalid')
                    })],
                    cssClassOnError: 'error',
                    cssClass: 'todos_form',
                    computedValue: {
                        contentBinding: {
                            target: Todos.DetailsController,
                            property: 'record'
                        },
                        operation: function(v) {
                            if(v && v.get('date')) {
                                return v.get('date').format(M.I18N.l('due_date_format'));
                            }
                        }
                    }
                }),

                buttonSave: M.ButtonView.design({
                    value: M.I18N.l('save'),
                    cssClass: 'b',
                    events: {
                        tap: {
                            target: Todos.DetailsController,
                            action: 'saveItem'
                        }
                    }
                }),

                buttonDelete: M.ButtonView.design({
                    value: M.I18N.l('delete'),
                    cssClass: 'e',
                    events: {
                        tap: {
                            target: Todos.DetailsController,
                            action: 'deleteItem'
                        }
                    }
                })
            })
        })
    }),

    tabs: Todos.Tabs

});

