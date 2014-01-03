(function( scope ) {

    Addressbook.Controllers.AddController = M.Controller.extend({

        detailView: null,

        editModel: M.Model.create(),

        applicationStart: function( ) {

            Addressbook.setLayout(M.AppLayout.design(this, null, true));

            this._initView( );

            Addressbook.getLayout().applyViews({
                header: this.header,
                content: this.detailView
            });
        },

        show: function( ) {
            this._initView();

            Addressbook.getLayout().applyViews({
                header: this.header,
                content: this.detailView
            });
            Addressbook.getLayout().startTransition();
        },

        back: function() {
            this.editModel.set('firstname', '');
            this.editModel.set('lastname', '');
            Addressbook.navigate({
                route: '/'
            });
        },

        _initView: function( ) {
            if( !this.detailView ) {
                this.detailView = Addressbook.Views.EditView.create(this, null, true);
            }

            if( !this.header ) {
                this.header = M.ToolbarView.extend({
                    value: M.I18N.get('global.add')
                }, {
                    first: M.ButtonView.extend({
                        cssClass: 'btn-default',
                        value: M.I18N.get('global.back'),
                        useElement: YES,
                        events: {
                            tap: 'back'
                        }
                    }),
                    second: M.View.extend({}, {

                        updateButton: M.ButtonView.extend({
                            cssClass: 'btn-success',
                            value: M.I18N.get('global.save'),
                            useElement: YES,
                            events: {
                                tap: 'addEntry'
                            }
                        })
                    })
                }).create(this, null, true);
            }
        },

        addEntry: function( event, element ) {
            element.scope.set('currentModel', Addressbook.contactCollection.create(element.scope.editModel.attributes));
            this.back();
            //M.Toast.show({text: M.I18N.l('global.succ_add'), timeout: M.Toast.MEDIUM});
        }

    });

})(this);