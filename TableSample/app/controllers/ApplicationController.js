// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: TableSample
// Controller: ApplicationController
// ==========================================================================

TableSample.ApplicationController = M.Controller.extend({

    content: null,

    init: function() {

        var searchString = 'HTML5';
        var that = this;
        M.Request.init({
            url: '/twitter/search.json?q=' + searchString + '&rpp=20',
            isJSON: YES,
            timeout: 5000,
            beforeSend: function(req) {
                //...
            },
            onSuccess: function(data){
                M.LoaderView.hide();
                if(data && data.results && data.results.length > 0) {

                    var content = {
//                        header: {
//                            data:['Date', 'User', 'Tweet'],
//                            cols: ['15%', '25%', '60%']
//                        },
                        content: []
                    };

                    _.each(data.results, function(tweet) {
                        content.content.push([
                            D8.create(tweet.created_at).format('mm/dd/yyyy'),
                            tweet.from_user_name,
                            tweet.text
                        ]);
                    });
                    that.set('content', content);
                }
            }
        }).send();

    }

});
