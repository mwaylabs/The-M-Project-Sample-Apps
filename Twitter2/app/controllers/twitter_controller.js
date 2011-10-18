// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: twitter
// Controller: TwitterController
// ==========================================================================

Twitter.TwitterController = M.Controller.extend({

    results: null,

    userResults: null,

    searchString: null,

    username: null,

    search: function() {
        var searchString = M.ViewManager.getView('page1', 'searchField').value;
        if(!searchString) {
            M.DialogView.alert({
                title: 'Error',
                message: 'Please enter a search string!'
            });
            return;
        }
        
        M.LoaderView.show('looking for \'' + searchString + '\'');

        Twitter.TweetStore.find({
            urlParams: {
                query: 'q=' + searchString,
                rpp: 10
            },
            appendRecords: NO,
            callbacks: {
                success: {
                    action: function(records) {
                        M.LoaderView.hide();
                        if(records && records.length === 0) {
                           M.DialogView.alert({
                               title: 'Nothing found...',
                               message: 'Your search for \'' + searchString + '\' didn\'t bring up any results. Please try something else.'
                           });
                        } else {
                            Twitter.TwitterController.set('results', records);
                            Twitter.TwitterController.set('searchString', 'Results for \'' + searchString + '\'');
                            M.Controller.switchToPage(M.ViewManager.getPage('page2'));
                        }
                    }
                },
                error: {
                    action: function(request, error) {
                        M.LoaderView.hide();
                        M.DialogView.alert({
                            title: 'Request failed',
                            message: 'The search could not be performed! Please check your network status, enter a valid search string and try again.'
                        });
                    }
                }
            }
        });
    },

    showUser: function(id) {
        var view = M.ViewManager.getViewById(id);
        var username = M.ViewManager.getView(view, 'label1').value;

        if(!username) {
            return;
        }

        M.LoaderView.show('loading tweets of \'' + username + '\'');

        Twitter.TweetStore.find({
            urlParams: {
                query: 'from=' + username,
                rpp: 10
            },
            appendRecords: NO,
            callbacks: {
                success: {
                    action: function(records) {
                        M.LoaderView.hide();
                        if(records && records.length === 0) {
                           M.DialogView.alert({
                               title: 'Nothing found...',
                               message: 'Your search for tweets of \'' + username + '\' didn\'t bring up any results. Sorry.'
                           });
                        } else {
                            Twitter.TwitterController.set('userResults', records);
                            Twitter.TwitterController.set('username', username);
                            M.Controller.switchToPage(M.ViewManager.getPage('page3'));
                        }
                    }
                },
                error: {
                    action: function(request, error) {
                        M.LoaderView.hide();
                        M.DialogView.alert({
                            title: 'Request failed',
                            message: 'The search could not be performed! Please check your network status and try again.'
                        });
                    }
                }
            }
        });
    }

});