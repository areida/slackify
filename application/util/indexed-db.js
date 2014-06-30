'use strict';

var _          = require('underscore');
var Extendable = require('synapse-common/lib/extendable');

var DB = null;

module.exports = Extendable.extend({

    name    : '',
    tables  : [],
    version : 1,

    'delete' : function(table, key, success, error)
    {
        var self = this;

        this._connect(function(db) {
            var trans   = self._startTransaction(db, 'readwrite'),
                store   = trans.objectStore(table),
                request = store.delete(key);

            request.onsuccess = success || function(event) {};
            request.onerror   = error || function(event) {
                console.log(event);
            };
        });
    },

    insert : function(table, items, complete, error)
    {
        var self = this;

        this._connect(function(db) {
            var trans = self._startTransaction(db, 'readwrite'),
                store = trans.objectStore(table);

            _.each(items, function(item) {
                store.put(item);
            });

            trans.oncomplete = complete || function(event) {};
            trans.onerror    = error || function(event) {
                console.log(event);
            };
        });
    },

    select : function(table, key, callback)
    {
        var self = this;

        this._connect(function(db) {
            var trans   = self._startTransaction(db, 'readwrite'),
                store   = trans.objectStore(table),
                request = store.get(key);
            
            request.onsuccess = function(event) {
                var result = event.target.result;

                if (result !== undefined)
                {
                    callback(result);
                }
            };
        });
    },

    selectAll : function(table, callback)
    {
        var self = this;

        this._connect(function(db) {
            var trans   = self._startTransaction(db, 'readonly'),
                store   = trans.objectStore(table),
                range   = IDBKeyRange.lowerBound(0),
                request = store.openCursor(range);

            request.onsuccess = function(event) {
                var result = event.target.result;
                
                if( !! result === false)
                    return;

                callback(result.value);
                result.continue();
            };
        });
    },

    update : function(table, key, values, complete, error)
    {
        values[_.findWhere(this.tables, {name : table}).key] = key;

        this.insert(table, [values], complete, error);
    },

    _connect : function(callback)
    {
        var request,
            self = this;

        if (DB)
        {
            callback(DB);
        }
        else
        {
            request = indexedDB.open(this.name, this.version);
            self    = this;

            request.onupgradeneeded = this._upgradeDatabase;

            request.onsuccess = function(event) {
                DB = event.target.result;

                callback(DB);
            };
        }
    },

    _startTransaction : function(db, mode)
    {
        var stores = _.pluck(this.tables, 'name');

        return db.transaction(stores, mode);
    },

    _upgradeDatabase : function(event)
    {
        var db = event.target.result;

        _.each(this.tables, function(table) {
            var store;

            if (db.objectStoreNames.contains(table.name))
            {
                db.deleteObjectStore(table.name);
            }

            store = db.createObjectStore(table.name, {keyPath: table.key});
            
            _.each(table.indices, function(index) {
                store.createIndex('by_' + index.name, index.name, {unique: !! index.unique});
            });
        });
    }

});
