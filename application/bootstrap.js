/* global window */

'use strict';

var Application = require('./application');

// Polyfill for str.contains
if ( ! String.prototype.contains ) {
    String.prototype.contains = function() {
        return String.prototype.indexOf.apply( this, arguments ) !== -1;
    };
}

window.app = new Application();
