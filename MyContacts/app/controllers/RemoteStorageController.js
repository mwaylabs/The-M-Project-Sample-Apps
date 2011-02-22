// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9-pre
//
// Project: MyContacts
// Controller: RemoteStorageController
// ==========================================================================

MyContacts.RemoteStorageController = M.Controller.extend({

    contacts: null,

    currentContact: null,

    currentContactName: '',

    init: function(isFirstLoad) {
        if(isFirstLoad) {
        }
        
        MyContacts.ContactR.find({
            onSuccess: {
                target:this,
                action: 'setContacts'
            }
        });
    },

    setContacts: function() {
        this.set('contacts', MyContacts.ContactR.records());
    },

    newContact: function() {
        this.switchToPage(M.ViewManager.getPage('remoteAdd'));
    },

    addContact: function() {
        var c = MyContacts.ContactR.createRecord({
            firstName: M.ViewManager.getView('remoteAdd', 'firstNameField').value,
            lastName: M.ViewManager.getView('remoteAdd', 'lastNameField').value,
            street: M.ViewManager.getView('remoteAdd', 'streetField').value,
            number: M.ViewManager.getView('remoteAdd', 'numberField').value,
            zip: M.ViewManager.getView('remoteAdd', 'zipField').value,
            city: M.ViewManager.getView('remoteAdd', 'cityField').value,
            phone: M.ViewManager.getView('remoteAdd', 'phoneField').value
        });
        c.save({
            onSuccess: {
                target: this,
                action: 'setAndSwitchBack'
            }
        });
    },

    showDetails: function(viewId, modelId) {

        this.currentContact = MyContacts.ContactR.recordManager.getRecordForId(modelId);

        this.set('currentContactName', this.currentContact.get('firstName') + ' ' + this.currentContact.get('lastName'));

        var firstNameField = M.ViewManager.getView('remoteContactDetails', 'firstNameField');
        firstNameField.setValue(this.currentContact.get('firstName'));

        var lastNameField = M.ViewManager.getView('remoteContactDetails', 'lastNameField');
        lastNameField.setValue(this.currentContact.get('lastName'));

        var streetField = M.ViewManager.getView('remoteContactDetails', 'streetField');
        streetField.setValue(this.currentContact.get('street'));

        var numberField = M.ViewManager.getView('remoteContactDetails', 'numberField');
        numberField.setValue(this.currentContact.get('number'));

        var zipField = M.ViewManager.getView('remoteContactDetails', 'zipField');
        zipField.setValue(this.currentContact.get('zip'));

        var cityField = M.ViewManager.getView('remoteContactDetails', 'cityField');
        cityField.setValue(this.currentContact.get('city'));

        var phoneField = M.ViewManager.getView('remoteContactDetails', 'phoneField');
        phoneField.setValue(this.currentContact.get('phone'));

        this.switchToPage(M.ViewManager.getPage('remoteContactDetails'));
    },

    updateContact: function() {
        var firstName = M.ViewManager.getView('remoteContactDetails', 'firstNameField').value;
        var lastName = M.ViewManager.getView('remoteContactDetails', 'lastNameField').value;
        var street = M.ViewManager.getView('remoteContactDetails', 'streetField').value;
        var number = M.ViewManager.getView('remoteContactDetails', 'numberField').value;
        var zip = M.ViewManager.getView('remoteContactDetails', 'zipField').value;
        var city = M.ViewManager.getView('remoteContactDetails', 'cityField').value;
        var phone = M.ViewManager.getView('remoteContactDetails', 'phoneField').value;

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
            onOk: {
                target: this,
                action: 'doDelete'
            },

            onCancel: {
                target:this,
                action: 'doNotDelete'
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
        this.switchToPage(M.ViewManager.getPage('remoteContacts'), null, YES);
    }

});