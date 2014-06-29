/** @jsx React.DOM */
'use strict';

var React    = require('react');
var Channels = require('../components/channels');

module.exports = React.createClass({
    displayName : 'Home',

    render : function()
    {
        return (this.transferPropsTo(
            <Channels />
        ));
    }
});
