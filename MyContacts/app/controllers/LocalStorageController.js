// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9-pre
//
// Project: MyContacts
// Controller: LocalStorageController
// ==========================================================================

MyContacts.LocalStorageController = M.Controller.extend({

    contacts: null,
    
    currentContact: null,

    currentContactName: '',

    init: function(isFirstLoad) {
        MyContacts.ContactL.find();
        this.setContacts();
    },

    setContacts: function() {
        this.set('contacts', MyContacts.ContactL.records());         
    },

    newContact: function() {
        this.switchToPage(M.ViewManager.getPage('localStorageAdd'));
    },

    addContact: function() {
        var c = MyContacts.ContactL.createRecord({
            firstName: M.ViewManager.getView('localStorageAdd', 'firstNameField').value,
            lastName: M.ViewManager.getView('localStorageAdd', 'lastNameField').value,
            street: M.ViewManager.getView('localStorageAdd', 'streetField').value,
            number: M.ViewManager.getView('localStorageAdd', 'numberField').value,
            zip: M.ViewManager.getView('localStorageAdd', 'zipField').value,
            city: M.ViewManager.getView('localStorageAdd', 'cityField').value,
            phone: M.ViewManager.getView('localStorageAdd', 'phoneField').value
        });
        c.save();
        this.setAndSwitchBack();
    },

    showDetails: function(viewId, modelId) {

        this.currentContact = MyContacts.ContactL.recordManager.getRecordForId(modelId);

        this.set('currentContactName', this.currentContact.get('firstName') + ' ' + this.currentContact.get('lastName'));

        var firstNameField = M.ViewManager.getView('localStorageContactDetails', 'firstNameField');
        firstNameField.setValue(this.currentContact.get('firstName'));

        var lastNameField = M.ViewManager.getView('localStorageContactDetails', 'lastNameField');
        lastNameField.setValue(this.currentContact.get('lastName'));

        var streetField = M.ViewManager.getView('localStorageContactDetails', 'streetField');
        streetField.setValue(this.currentContact.get('street'));

        var numberField = M.ViewManager.getView('localStorageContactDetails', 'numberField');
        numberField.setValue(this.currentContact.get('number'));

        var zipField = M.ViewManager.getView('localStorageContactDetails', 'zipField');
        zipField.setValue(this.currentContact.get('zip'));

        var cityField = M.ViewManager.getView('localStorageContactDetails', 'cityField');
        cityField.setValue(this.currentContact.get('city'));

        var phoneField = M.ViewManager.getView('localStorageContactDetails', 'phoneField');
        phoneField.setValue(this.currentContact.get('phone'));

        this.switchToPage(M.ViewManager.getPage('localStorageContactDetails'));
    },

    updateContact: function() {
        console.log(this.currentContact);

        var firstName = M.ViewManager.getView('localStorageContactDetails', 'firstNameField').value;
        var lastName = M.ViewManager.getView('localStorageContactDetails', 'lastNameField').value;
        var street = M.ViewManager.getView('localStorageContactDetails', 'streetField').value;
        var number = M.ViewManager.getView('localStorageContactDetails', 'numberField').value;
        var zip = M.ViewManager.getView('localStorageContactDetails', 'zipField').value;
        var city = M.ViewManager.getView('localStorageContactDetails', 'cityField').value;
        var phone = M.ViewManager.getView('localStorageContactDetails', 'phoneField').value;

        this.currentContact.set('firstName', firstName);
        this.currentContact.set('lastName', lastName);
        this.currentContact.set('street', street);
        this.currentContact.set('number', number);
        this.currentContact.set('zip', zip);
        this.currentContact.set('city', city);
        this.currentContact.set('phone', phone);

        this.currentContact.save();
        this.setAndSwitchBack();
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
        this.currentContact.del(); // delete in storage
        this.currentContact = null;
        this.setAndSwitchBack();
    },

    doNotDelete: function() {
        M.Logger.log('Contact not deleted.', M.INFO);
    },

    setAndSwitchBack: function() {
        this.setContacts();
        this.switchToPage(M.ViewManager.getPage('localStorageContacts'), null, YES);
    }

});