// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: BindingSample2 
// ==========================================================================

var BindingSample2 = BindingSample2 || {};

BindingSample2.app = M.Application.design({

    entryPage : 'page1',

    page1: M.PageView.design({

        events: {
            pageshow: {
                target: BindingSample2.ApplicationController,
                action: 'init'
            }
        },

        childViews: 'header content',

        header: M.ToolbarView.design({
            value: 'Binding Sample 2'
        }),

        content: M.ScrollView.design({

            childViews: 'buttonGroup image firstnameLabel firstnameValue lastnameLabel lastnameValue streetLabel streetValue cityValue',

            buttonGroup: M.ButtonGroupView.design({
                childViews: 'button1 button2 button3',

                events: {
                    change: {
                        target: BindingSample2.ApplicationController,
                        action: 'changePerson'
                    }
                },

                button1: M.ButtonView.design({
                    tag: '0',
                    value: 'D'
                }),
                button2: M.ButtonView.design({
                    tag: '1',
                    value: 'US'
                }),
                button3: M.ButtonView.design({
                    tag: '2',
                    value: 'F'
                })
            }),

            image: M.ImageView.design({
                computedValue: {
                    contentBinding: {
                        target: BindingSample2.ApplicationController,
                        property: 'person'
                    },
                    operation: function(v) {
                        if(v && typeof(v) === 'object') {
                            return 'theme/images/' + v.firstname.toLocaleLowerCase() + '_' + v.lastname.toLocaleLowerCase() + '.png';
                        } else {
                            return null;
                        }
                    }
                },
                cssClass: 'image'
            }),

            firstnameLabel: M.LabelView.design({
                value: 'Firstname',
                isInline: YES,
                cssClass: 'label'
            }),

            firstnameValue: M.LabelView.design({
                value: '-',
                contentBinding: {
                    target: BindingSample2.ApplicationController,
                    property: 'person.firstname'
                },
                cssClass: 'value'
            }),

            lastnameLabel: M.LabelView.design({
                value: 'Lastname',
                cssClass: 'label'
            }),

            lastnameValue: M.LabelView.design({
                value: '-',
                contentBinding: {
                    target: BindingSample2.ApplicationController,
                    property: 'person.lastname'
                },
                cssClass: 'value'
            }),

            streetLabel: M.LabelView.design({
                value: 'Address',
                cssClass: 'label'
            }),

            streetValue: M.LabelView.design({
                computedValue: {
                    contentBinding: {
                        target: BindingSample2.ApplicationController,
                        property: 'person.address'
                    },
                    operation: function(v) {
                        if(v && typeof(v) === 'object') {
                            return v.street + ' ' + v.houseNumber;
                        } else {
                            return '-';
                        }
                    }
                },
                cssClass: 'value'
            }),

            cityValue: M.LabelView.design({
                computedValue: {
                    contentBinding: {
                        target: BindingSample2.ApplicationController,
                        property: 'person.address'
                    },
                    operation: function(v) {
                        if(v && typeof(v) === 'object') {
                            return v.zip + ' ' + v.city;
                        } else {
                            return '';
                        }
                    }
                },
                cssClass: 'value'
            })

        })

    })

});