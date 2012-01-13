// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso
//
// Project: Twitter
// Model: TweetModel
// ==========================================================================

Twitter.TweetModel = M.Model.create({
    
    __name__: 'TweetModel',

    userName: M.Model.attr('String', {
        
    }),

    tweet: M.Model.attr('String', {

    }),

    userImage: M.Model.attr('String', {
        
    }),

    createdAt: M.Model.attr('String', {

    })

}, M.DataConsumer.configure({

    appendRecords: NO,

    responsePath: 'results',

    url: function(query, rpp) {
        return '/twitter/search.json?' + query + '&rpp=' + rpp;
    },

    /* map needs to return record obj which can be handled by createRecord */
    map: function(obj) {
        return {
            userName: obj.from_user,
            userImage: obj.profile_image_url,
            createdAt: obj.created_at,
            tweet: obj.text
        };
    }

}));