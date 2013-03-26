// ==========================================================================
// The M-Project - Mobile HTML10 Application Framework
// Generated with: Espresso 
//
// Project: MovableLabel 
// ==========================================================================

var MovableLabel  = MovableLabel || {};

MovableLabel.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage : 'page1',

    page1: M.PageView.design({

        childViews: 'header content',

        header: M.ToolbarView.design({
            childViews: 'hlabel',
            hlabel: M.MovableLabelView.design({
                value: 'This label should move with "time: 15, offset: 4"',
                movable: {
                    time: 15,
                    offset: 4
                },
                anchorLocation: M.CENTER,
                contentBinding: {
                    target: MovableLabel.MovableLabelController,
                    property: 'topLabelValue'
                }
            }),
            anchorLocation: M.TOP
        }),

        content: M.ScrollView.design({

            childViews: 'form1 spacer1 form2 form3 form4',

            form1: M.FormView.design({
                childViews: 'grid',
                grid: M.GridView.design({
                    childViews: 'label1 textfield label2',
                    layout: M.THREE_COLUMNS,
                    label1: M.LabelView.design({
                        value: 'text top label:',
                        cssClass: 'leftGridLabel'
                    }),
                    textfield: M.TextFieldView.design({
                        validators: [M.PresenceValidator],
                        events: {
                            keyup: {
                                target: MovableLabel.MovableLabelController,
                                action: 'setTopLabelValue'
                            }
                        }
                    }),
                    label2: M.LabelView.design({
                        value: ' '
                    })
                })
            }),

            spacer1: M.LabelView.design({
                value: ' ',
                cssClass: 'spacer1'
            }),

            form2: M.FormView.design({
                childViews: 'grid1 label2',
                grid1: M.GridView.design({
                    childViews: 'label1 textfield label2',
                    layout: M.THREE_COLUMNS,
                    label1: M.LabelView.design({
                        value: 'time:',
                        cssClass: 'leftGridLabel blue'
                    }),
                    textfield: M.TextFieldView.design({
                        validators: [M.PresenceValidator],
                        events: {
                            enter: {
                                target: MovableLabel.MovableLabelController,
                                action: 'setTime'
                            },
                            blur: {
                                target: MovableLabel.MovableLabelController,
                                action: 'setTime'
                            }
                        }
                    }),
                    label2: M.LabelView.design({
                        value: 'sec',
                        cssClass: 'rightGridLabel blue'
                    })

                }),
                label2: M.ContainerView.design({
                    childViews: 'label',
                    label: M.MovableLabelView.design({
                        value: 'ACBDEFGHIJKLMNOPQRSTUVWXYZ',
                        movable: {
                            offset: 0,
                            time: 0
                        },
                        computedValue: {
                            contentBinding: {
                                target: MovableLabel.MovableLabelController,
                                property: 'time'
                            },
                            operation: function(v, view){
                                if(v){
                                    view.movable.time = v;
                                }
                                return view.value;
                            }
                        }
                    }),
                    cssClass: 'staticWidth blue'
                })
            }),

            form3: M.FormView.design({
                childViews: 'grid1 label2',
                grid1: M.GridView.design({
                    childViews: 'label1 textfield label2',
                    layout: M.THREE_COLUMNS,
                    label1: M.LabelView.design({
                        value: 'pxPerSec:',
                        cssClass: 'leftGridLabel red'
                    }),
                    textfield: M.TextFieldView.design({
                        validators: [M.PresenceValidator],
                        events: {
                            enter: {
                                target: MovableLabel.MovableLabelController,
                                action: 'setPxPerSec'
                            },
                            blur: {
                                target: MovableLabel.MovableLabelController,
                                action: 'setPxPerSec'
                            }
                        }
                    }),
                    label2: M.LabelView.design({
                        value: 'sec',
                        cssClass: 'rightGridLabel red'
                    })

                }),
                label2: M.ContainerView.design({
                    childViews: 'label',
                    label: M.MovableLabelView.design({
                        value: 'ACBDEFGHIJKLMNOPQRSTUVWXYZ',
                        movable: {
                            offset: 0,
                            pxPerSec: 0
                        },
                        computedValue: {
                            contentBinding: {
                                target: MovableLabel.MovableLabelController,
                                property: 'pxPerSec'
                            },
                            operation: function(v, view){
                                if(v){
                                    view.movable.pxPerSec = v;
                                }
                                return view.value;
                            }
                        }
                    }),
                    cssClass: 'staticWidth red'
                })
            }),

            form4: M.FormView.design({
                childViews: 'grid1 label2',
                grid1: M.GridView.design({
                    childViews: 'label1 textfield label2',
                    layout: M.THREE_COLUMNS,
                    label1: M.LabelView.design({
                        value: 'offset:',
                        cssClass: 'leftGridLabel green'
                    }),
                    textfield: M.TextFieldView.design({
                        validators: [M.PresenceValidator],
                        events: {
                            enter: {
                                target: MovableLabel.MovableLabelController,
                                action: 'setOffset'
                            },
                            blur: {
                                target: MovableLabel.MovableLabelController,
                                action: 'setOffset'
                            }
                        }
                    }),
                    label2: M.LabelView.design({
                        value: 'px',
                        cssClass: 'rightGridLabel green'
                    })

                }),
                label2: M.ContainerView.design({
                    childViews: 'label',
                    label: M.MovableLabelView.design({
                        value: 'ACBDEFGHIJKLMNOPQRSTUVWXYZ',
                        movable: {
                            time: 10
                        },
                        computedValue: {
                            contentBinding: {
                                target: MovableLabel.MovableLabelController,
                                property: 'offset'
                            },
                            operation: function(v, view){
                                if(v){
                                    view.movable.offset = v;
                                }
                                return view.value;
                            }
                        }
                    }),
                    cssClass: 'staticWidth green'
                })
            })
        })

    })

});