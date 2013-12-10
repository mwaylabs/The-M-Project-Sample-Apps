/*global kitchensink*/

kitchensink.Collections = kitchensink.Collections || {};

/**
 * A collection is just a list of models and even more.
 * It contains a bunch of helper functions, sync logic
 * and events.
 *
 * For further information go to:
 * http://the-m-project.org/docs/absinthe/Collection.html
 * http://backbonejs.org/#Collection
 */

(function() {
    'use strict';

    // Create a collection which inherits from M.Collection
    kitchensink.Collections.TmpviewsCollection = M.Collection.extend({

        // Assign model for the controller
        model: kitchensink.Models.TmpviewModel

    });

})();
