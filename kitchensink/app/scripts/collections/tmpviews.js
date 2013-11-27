/*global kitchensink, M*/

kitchensink.Collections = kitchensink.Collections || {};

(function() {
    'use strict';

    kitchensink.Collections.TmpviewsCollection = M.Collection.extend({

        model: kitchensink.Models.TmpviewModel

    });

})();
