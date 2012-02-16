// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: WebViewSample
// Controller: ApplicationController
// ==========================================================================

WebViewSample.ApplicationController = M.Controller.extend({

    url: null,

    initApp: function() {
        var pageHeight = $('#m_entryPage').outerHeight();
        var headerHeight =  $('#m_entryPage [data-role="header"]').outerHeight();
        $('#' + M.ViewManager.getView('page1', 'webview').id).css('height', pageHeight - headerHeight);
    },

    updateURL: function() {
        var url = M.ViewManager.getView('page1', 'urlBar').value;
        this.set('url', url);
    }

});
