// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: BindingSample2
// Controller: 
// ==========================================================================

BindingSample2.ApplicationController = M.Controller.extend({

    person: null,

    persons: [],
    
    init: function(isFirstLoad) {
        if (isFirstLoad) {
            /* push person 1 */
            this.persons.push({
                firstname: 'Angela',
                lastname: 'Merkel',
                address: {
                    street: {
                        name: 'Willy-Brandt-Straße',
                        houseNumber: '1'
                    },
                    zip: 10557,
                    city: 'Berlin'
                }
            });

            /* push person 2 */
            this.persons.push({
                firstname: 'Barack',
                lastname: 'Obama',
                address: {
                    street: {
                        name: 'Pennsylvania Avenue',
                        houseNumber: '1600'
                    },
                    zip: 20500,
                    city: 'Washington, DC'
                }
            });

            /* push person 3 */
            this.persons.push({
                firstname: 'Nicolas',
                lastname: 'Sarkozy',
                address: {
                    street: {
                        name: 'rue du faubourg Saint-Honoré',
                        houseNumber: '55'
                    },
                    zip: 75008,
                    city: 'Paris'
                }
            });
        }
    },

    changePerson: function(id) {
        var buttonGroup = M.ViewManager.getViewById(id);
        var button = buttonGroup.getActiveButton();

        this.set('person', this.persons[button.tag]);
    }

});
