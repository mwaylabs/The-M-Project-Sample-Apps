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
        var width = M.Environment.getTotalWidth();
        var itemSize = width - 30;
        var factor = itemSize / 960;
        $('.myWebView').css('height', (itemSize/16*9) * 1/factor);
        $('.myWebView').css('width', itemSize * (1/factor));
        $('.myWebView').css('-webkit-transform', 'scale(' + factor + ')');
        $('.container').css('height', (itemSize/16*9));
        $('.container').css('width', itemSize);
        $('.ui-page').css('width', width);
    },

    updateURL: function(url) {
        var that = this;
        $('#' + M.ViewManager.getView('page1', 'webview').id).animate({
            opacity: 0
        }, 500, function(){
            that.set('url', url);
        });
    }

});
