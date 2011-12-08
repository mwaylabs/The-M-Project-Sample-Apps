// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso
//
// Project: Twitter2
// Model: TweetStore
// ==========================================================================

Twitter2.TweetStore = M.Store.create({

    model: Twitter2.TweetModel,

    dataConsumer: M.DataConsumer.configure({

        responsePath: 'results',

        /* ID/param for request (provided by store) */
        url: function(query, rpp) {
            return '/twitter/search.json?' + query + '&rpp=' + rpp;
        },

        callbacks: {
            success: {
                action: function() {
                    alert('success');
                }
            },
            error: {
                action: function() {
                    alert('error');
                }
            }
        },

        /* maybe default? */
        httpMethod: 'GET',

        /* map needs to return record obj which can be handled by createRecord */
        map: function(obj) {
            return {
                userName: obj.from_user,
                userImage: obj.profile_image_url,
                createdAt: obj.created_at,
                tweet: obj.text
            };
        }

    })

});