'use strict';

var store = require('store');

module.exports = {
    set: function(key, val, exp) {
        store.set(key, {
            val  : val,
            exp  : exp,
            time : new Date().getTime() / 1000
        });
    },

    get: function(key) {
        var info = store.get(key);

        if ( ! info) {
            return null;
        }

        if ((new Date().getTime() / 1000) - info.time > info.exp) {
            return null;
        }

        return info.val;
    }
};
