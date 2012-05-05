KitchenSink.UtilitiesI18nController = M.Controller.extend({

    i18nList: null,

    language: null,

    language2: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var i18nList = [
                {
                    name: "Localizing a label",
                    page: "utilitiesI18n1"
                },

                {
                    name: "Get the navigator's language",
                    page: "utilitiesI18n2"
                },

                {
                    name: "Get the current language",
                    page: "utilitiesI18n3"
                }
            ];
            this.set('i18nList', i18nList);
        }

    },

    i18nSelected: function(id) {

        var i18nName = M.ViewManager.getView(id, 'name').value;
        var i18n = _.detect(this.i18nList, function(i18n) {
            return i18n.name === i18nName;
        });

        this.switchToPage(i18n.page);
    },

    here: function() {
        this.switchToPage('utilitiesI18n', M.TRANSITION.SLIDE, YES);
    },

    getLanguage: function() {
        var lang = M.I18N.getLanguage(YES);
        this.set('language', lang);
    },

    getLanguage2: function() {
        var lang = M.I18N.getLanguage();
        this.set('language2', lang);
    }

});