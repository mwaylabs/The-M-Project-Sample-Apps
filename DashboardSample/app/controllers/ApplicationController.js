// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DashboardSample
// Controller: ApplicationController
// ==========================================================================

DashboardSample.ApplicationController = M.Controller.extend({

    items: null,

    events: [],

    init: function() {
        var items = [{
            icon: 'theme/images/icon_settings.png',
            label: 'Settings',
            value: 'settings'
        },
        {
            icon: 'theme/images/icon_edit.png',
            label: 'Edit',
            value: 'edit'
        },
        {
            icon: 'theme/images/icon_wifi.png',
            label: 'WiFi',
            value: 'wifi'
        },
            {
            icon: 'theme/images/icon_clock.png',
            label: 'Clock',
            value: 'clock',
            events: {
                tap: {
                    target: this,
                    action: function(id) {
                        this.events.unshift({
                            label: (this.events.length + 1) + ') ' + M.ViewManager.getViewById(id).label + ' (local)'
                        });
                        this.set('events', this.events);
                    }
                }
            }
        },
        {
            icon: 'theme/images/icon_home.png',
            label: 'Home',
            value: 'home'
        }];

        this.set('items', items);
    }

});
