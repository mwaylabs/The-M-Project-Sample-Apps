/*global kitchensink, Backbone, JST*/

// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.LoginView
 * @type {*}
 * @extends M.View
 * @example
 *
 M.LoginView.extend({

    // overwrite the placeholder. Default: Password
    passwordPlaceholder:'Placeholder for Password',

    // overwrite the label. Default: Password
    passwordLabel: 'Label for Password',

    // overwrite the placeholder. Default: Username
    userPlaceholder: 'Userinput placeholder',

    // overwrite the label. Default: Username
    userLabel: 'User label',

    // overwrite the value of button. Default: Login
    loginButtonValue: 'Button Text',

    // gets called if the user pressed enter in one of the inputs or tap on the button
    // return true if the credentials are correct or false if they aren't
    login: function( credentials ) {
        return this.scope.login(credentials);
    },

    // gets called if the login method returns false
    onError: function( credentials ) {
        console.log('error', credentials);
    },

    // gets called if the login method returns true
    onSuccess: function( credentials ) {
        console.log('succ', credentials);
    }
 })
 *
 *
 */
M.LoginView = M.View.extend({

    /**
     * The type of the object
     * @type {String}
     * @private
     */
    _type: 'M.LoginView',

    /**
     * Use the M.LoginView as scope for the childViews
     */
    useAsScope: YES,

    /**
     * Apply a grid
     */
    grid: 'col-xs-12',

    /**
     * The model for the login
     */
    value: M.Model.create({
        user: '',
        password: ''
    }),

    /**
     * Initialize the view
     */
    initialize: function() {

        // swap object to extend the user
        var userExtend = {};

        // if a custom label for the user is defined use that one
        if( this.userLabel ) {
            userExtend.label = this.userLabel;
        }

        // if a custom placeholder for the user is defined use that one
        if( this.userPlaceholder ) {
            userExtend.placeholder = this.userPlaceholder;
        }

        // swap object to extend the password
        var passwordExtend = {};

        // if a custom label for the password is defined use that one
        if( this.passwordLabel ) {
            passwordExtend.label = this.passwordLabel;
        }

        // if a custom placeholder for the pasword is defined use that one
        if( this.passwordPlaceholder ) {
            passwordExtend.placeholder = this.passwordPlaceholder;
        }

        // swap object to extend the button
        var loginButtonExtend = {};

        // if a custom value for the button is defined use that one
        if( this.loginButtonValue ) {
            loginButtonExtend.value = this.loginButtonValue;
        }

        // overwrite the user view
        this._childViews.user = this._childViews.user.extend(userExtend);
        // overwrite the password view
        this._childViews.password = this._childViews.password.extend(passwordExtend);
        // overwrite the loginButton view
        this._childViews.loginButton = this._childViews.loginButton.extend(loginButtonExtend);

        M.View.prototype.initialize.apply(this, arguments);
    },

    /**
     * gets called if the user pressed enter in one of the inputs or tap on the button
     * @private
     */
    _login: function() {

        // build the credentials
        var credentials = this._getFormValues();

        // call the out login api
        if( this.login(credentials) ) {
            // if the credentials are correct
            this.onSuccess(credentials);
        } else {
            // if the credentials are invalid
            this._onError(credentials);
        }
    },

    /**
     * Overwrite this method to return the credentials from the view
     * @param credentials
     */
    _getFormValues: function(){
        return {
            user: this.childViews.user.getValue(),
            password: this.childViews.password.getValue()
        };
    },

    /**
     * Overwrite this method to check the credentials
     * return false if the credentials are invalid otherwise true
     * @param credentials
     */
    login: function( credentials ) {
        // if the credentials are empty return false otherwise true
        if( credentials.user === '' || credentials.password === '' ) {
            return false;
        }
        return true;
    },

    /**
     * gets called if the login returns false
     * @param credentials
     * @private
     */
    _onError: function( credentials ) {
        var that = this;
        this.$el.addClass('m-shake');
        setTimeout(function() {
            that.$el.removeClass('m-shake');
        }, 200);
        this.onError(credentials);
    },

    /**
     * overwrite this function - it gets called if the login method returns true
     * @param credentials
     */
    onSuccess: function( credentials ) {
    },

    /**
     * overwrite this method - it gets called if the login method returns false
     * @param credentials
     */
    onError: function( credentials ) {
    }

}, {

    /**
     * The username input
     */
    user: M.TextfieldView.extend({
        useParentValue: YES,
        extendTemplate: '<%= user %>',
        placeholder: 'Username',
        label: 'Username',
        events: {
            enter: '_login'
        }
    }),

    /**
     * The password input
     */
    password: M.TextfieldView.extend({
        useParentValue: YES,
        extendTemplate: '<%= password %>',
        type: 'password',
        label: 'Password',
        placeholder: 'Password',
        events: {
            enter: '_login'
        }
    }),

    /**
     * The submit button
     */
    loginButton: M.ButtonView.extend({
        value: 'Login',
        events: {
            tap: '_login',
            enter: '_login'
        }
    })

});


kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.ValidatesView = M.View.extend({
        // The properties of a view

        // The views grid
        grid: 'col-xs-12'
    }, {


        simpleValidation: M.View.extend({

            value: 'Simple Validation',
            grid: 'col-xs-12'

        }, {

            email1: M.TextfieldView.extend({
                placeholder: 'E-Mail',
                scopeKey: 'validationModel.email',
                validate: function( value, firstRender ) {
                    if( !M.Validator.isEmail(value) ) {
                        this.showError('not a valid mail');
                        return false;
                    } else {
                        this.hideError();
                        return true;
                    }
                }
            }),

            email2: M.TextfieldView.extend({
                placeholder: 'E-Mail',
                scopeKey: 'validationModel.email',
                validate: function( value, firstRender ) {
                    if( !M.Validator.isEmail(value) ) {
                        this.showError('not a valid mail');
                        return false;
                    } else {
                        this.hideError();
                        return true;
                    }
                }
            }),

            b1: M.ButtonView.extend({
                value: 'submit',
                events: {
                    tap: function( event, view ) {
                        view._parentView.childViews.email2.validate();
                    }
                }
            }),


            toggle: M.ToggleSwitchView.extend({
                label: 'Wifi settings: ',
                offLabel: ' ',
                onLabel: ' ',
                scopeKey: 'wifi',
                extendTemplate: '<%= wifi  %>',
                onValue: 'on',
                offValue: 'off',
                validate: function( value ) {
                    if( value === this.offValue ) {
                        this.showError('wifi needs to be enabled');
                    } else {
                        this.hideError();
                    }
                }
            }),

            toggle2: M.ToggleSwitchView.extend({
                label: 'Wifi settings: ',
                offLabel: 'Off',
                onLabel: 'On',
                extendTemplate: '<%= wifi  %>',
                onValue: 'on',
                offValue: 'off',
                validate: function( value ) {
                    if( value !== this.offValue ) {
                        this.showError();
                    } else {
                        this.hideError();
                    }
                }
            })
//
//
//            mulitpleSelectionListViewExample: M.SelectView.extend({
//                label: 'select 2',
//                isMultiple: YES,
//                grid: 'col-xs-12',
//                scopeKey: 'multipleSelectionListModel.water',
//                selectOptions: {
//                    collection: [
//                        {id: 1, name: 'fountain'},
//                        {id: 2, name: 'evian'},
//                        {id: 3, name: 'dasina'}
//                    ],
//                    labelPath: 'name',
//                    valuePath: 'name'
//                },
//                validate: function( value, firstRender ) {
//                    if( value.length > 1 ) {
//                        this.hideError();
//                    } else {
//                        this.showError();
//                    }
//                }
//            })


        })

    });

})();
