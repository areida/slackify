'use strict';

var IndexedDB = require('../util/indexed-db');

module.exports = IndexedDB.extend({

    name    : 'slackify',
    tables  : [{
        name    : 'channel',
        key     : 'key',
        indices : [{
            name   : 'key',
            unique : true
        }, {
            name   : 'subdomain',
            unique : true
        }]
    }],
    version : 7

});
