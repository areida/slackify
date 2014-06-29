/** @jsx React.DOM */
'use strict';

var React = require('react');
var Home  = require('../components/home');

module.exports = React.createClass({

    displayName : 'HomePage',

    render : function()
    {
        return (this.transferPropsTo(
            <Home />
        ));
    }
});
