// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9-pre
//
// Project: MyContacts
// Controller: CouchDbController
// ==========================================================================

MyContacts.CouchDbController = M.Controller.extend({

    contacts: null,

    currentContact: null,

    currentContactName: '',

    init: function(isFirstLoad) {
        if(isFirstLoad) {
        }
        
        MyContacts.ContactC.find({
            onSuccess: {
                target:this,
                action: 'setContacts'
            }
        });
    },

    setContacts: function() {
        this.set('contacts', MyContacts.ContactC.records());
    },


    newContact: function() {
        this.switchToPage(M.ViewManager.getPage('couchDbAdd'));
    },

    addContact: function() {
        var c = MyContacts.ContactC.createRecord({
            firstName: M.ViewManager.getView('couchDbAdd', 'firstNameField').value,
            lastName: M.ViewManager.getView('couchDbAdd', 'lastNameField').value,
            street: M.ViewManager.getView('couchDbAdd', 'streetField').value,
            number: M.ViewManager.getView('couchDbAdd', 'numberField').value,
            zip: M.ViewManager.getView('couchDbAdd', 'zipField').value,
            city: M.ViewManager.getView('couchDbAdd', 'cityField').value,
            phone: M.ViewManager.getView('couchDbAdd', 'phoneField').value
        });
        c.save({
            onSuccess: {
                target: this,
                action: 'setAndSwitchBack'
            }
        });
    },

    showDetails: function(viewId, modelId) {

        this.currentContact = MyContacts.ContactC.recordManager.getRecordForId(modelId);

        this.set('currentContactName', this.currentContact.get('firstName') + ' ' + this.currentContact.get('lastName'));

        var firstNameField = M.ViewManager.getView('couchDbContactDetails', 'firstNameField');
        firstNameField.setValue(this.currentContact.get('firstName'));

        var lastNameField = M.ViewManager.getView('couchDbContactDetails', 'lastNameField');
        lastNameField.setValue(this.currentContact.get('lastName'));

        var streetField = M.ViewManager.getView('couchDbContactDetails', 'streetField');
        streetField.setValue(this.currentContact.get('street'));

        var numberField = M.ViewManager.getView('couchDbContactDetails', 'numberField');
        numberField.setValue(this.currentContact.get('number'));

        var zipField = M.ViewManager.getView('couchDbContactDetails', 'zipField');
        zipField.setValue(this.currentContact.get('zip'));

        var cityField = M.ViewManager.getView('couchDbContactDetails', 'cityField');
        cityField.setValue(this.currentContact.get('city'));

        var phoneField = M.ViewManager.getView('couchDbContactDetails', 'phoneField');
        phoneField.setValue(this.currentContact.get('phone'));

        this.switchToPage(M.ViewManager.getPage('couchDbContactDetails'));
    },

    updateContact: function() {
        var firstName = M.ViewManager.getView('couchDbContactDetails', 'firstNameField').value;
        var lastName = M.ViewManager.getView('couchDbContactDetails', 'lastNameField').value;
        var street = M.ViewManager.getView('couchDbContactDetails', 'streetField').value;
        var number = M.ViewManager.getView('couchDbContactDetails', 'numberField').value;
        var zip = M.ViewManager.getView('couchDbContactDetails', 'zipField').value;
        var city = M.ViewManager.getView('couchDbContactDetails', 'cityField').value;
        var phone = M.ViewManager.getView('couchDbContactDetails', 'phoneField').value;

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
        this.switchToPage(M.ViewManager.getPage('couchDbContacts'), null, YES);
    }

});