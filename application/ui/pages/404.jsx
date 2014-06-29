/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({

    displayName : '404',

    render : function() {
        return (
            <h1>{'404 - Sorry, that page was not found.'}</h1>
        );
    }
});
