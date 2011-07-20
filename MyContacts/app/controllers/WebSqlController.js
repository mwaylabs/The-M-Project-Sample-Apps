// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9-pre
//
// Project: MyContacts
// Controller: WebSqlController
// ==========================================================================

MyContacts.WebSqlController = M.Controller.extend({

    contacts: null,

    currentContact: null,

    currentContactName: '',

    init: function(isFirstLoad) {
        if(isFirstLoad) {
        }

        MyContacts.ContactW.find({
            order: 'lastName ASC',
            onSuccess: {
                target:this,
                action: 'setContacts'
            }
        });
    },

    setContacts: function() {
        this.set('contacts', MyContacts.ContactW.records());
    },

    newContact: function() {
        this.switchToPage(M.ViewManager.getPage('webSqlAdd'));
    },

    addContact: function() {
        var c = MyContacts.ContactW.createRecord({
            firstName: M.ViewManager.getView('webSqlAdd', 'firstNameField').value,
            lastName: M.ViewManager.getView('webSqlAdd', 'lastNameField').value,
            street: M.ViewManager.getView('webSqlAdd', 'streetField').value,
            number: M.ViewManager.getView('webSqlAdd', 'numberField').value,
            zip: M.ViewManager.getView('webSqlAdd', 'zipField').value,
            city: M.ViewManager.getView('webSqlAdd', 'cityField').value,
            phone: M.ViewManager.getView('webSqlAdd', 'phoneField').value
        });
        c.save({
            onSuccess: {
                target: this,
                action: 'setAndSwitchBack'
            }
        });
    },

    showDetails: function(viewId, modelId) {

        this.currentContact = MyContacts.ContactW.recordManager.getRecordForId(modelId);

        this.set('currentContactName', this.currentContact.get('firstName') + ' ' + this.currentContact.get('lastName'));

        var firstNameField = M.ViewManager.getView('webSqlContactDetails', 'firstNameField');
        firstNameField.setValue(this.currentContact.get('firstName'));

        var lastNameField = M.ViewManager.getView('webSqlContactDetails', 'lastNameField');
        lastNameField.setValue(this.currentContact.get('lastName'));

        var streetField = M.ViewManager.getView('webSqlContactDetails', 'streetField');
        streetField.setValue(this.currentContact.get('street'));

        var numberField = M.ViewManager.getView('webSqlContactDetails', 'numberField');
        numberField.setValue(this.currentContact.get('number'));

        var zipField = M.ViewManager.getView('webSqlContactDetails', 'zipField');
        zipField.setValue(this.currentContact.get('zip'));

        var cityField = M.ViewManager.getView('webSqlContactDetails', 'cityField');
        cityField.setValue(this.currentContact.get('city'));

        var phoneField = M.ViewManager.getView('webSqlContactDetails', 'phoneField');
        phoneField.setValue(this.currentContact.get('phone'));

        this.switchToPage(M.ViewManager.getPage('webSqlContactDetails'));
    },

    updateContact: function() {
        var firstName = M.ViewManager.getView('webSqlContactDetails', 'firstNameField').value;
        var lastName = M.ViewManager.getView('webSqlContactDetails', 'lastNameField').value;
        var street = M.ViewManager.getView('webSqlContactDetails', 'streetField').value;
        var number = M.ViewManager.getView('webSqlContactDetails', 'numberField').value;
        var zip = M.ViewManager.getView('webSqlContactDetails', 'zipField').value;
        var city = M.ViewManager.getView('webSqlContactDetails', 'cityField').value;
        var phone = M.ViewManager.getView('webSqlContactDetails', 'phoneField').value;

        this.currentContact.set('firstName', firstName);
        this.currentContact.set('lastName', lastName);
        this.currentContact.set('street', street);
        this.currentContact.set('number', number);
        this.currentContact.set('zip', zip);
        this.currentContact.set('city', city);
        this.currentContact.set('phone', phone);

        this.currentContact.save({
            onSuccess: {
                target: this,
                action: 'setAndSwitchBack'
            }
        });
    },

    deleteContact: function(viewId, modelId){

        M.DialogView.confirm({
            title: 'Delete?',
            message: 'Do you really want to delete this contact?',
            callbacks: {
                confirm: {
                    target: this,
                    action: 'doDelete'
                },
                cancel: {
                    target:this,
                    action: 'doNotDelete'
                }
            }
        });
    },

    doDelete: function() {
        this.currentContact.del({
            onSuccess:{
                target: this,
                action: 'setAndSwitchBack'
            }
        }); // delete in storage
        this.currentContact = null;
    },

    doNotDelete: function() {
        M.Logger.log('Contact not deleted.', M.INFO);
    },

    setAndSwitchBack: function() {
        this.setContacts();
        this.switchToPage(M.ViewManager.getPage('webSqlContacts'), null, YES);
    }

});