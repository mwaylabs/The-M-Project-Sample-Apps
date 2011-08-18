// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Todos
// Controller: SettingsController
// ==========================================================================

Todos.SettingsController = M.Controller.extend({

    init: function() {
        M.ViewManager.getView('settingsPage', 'langSelection').setSelection(M.Application.currentLanguage);
    },

    changeLanguage: function() {
        var language = M.ViewManager.getView('settingsPage', 'langSelection').getSelection();
        M.LoaderView.show();
        M.I18N.setLanguage(language);
    }

});
