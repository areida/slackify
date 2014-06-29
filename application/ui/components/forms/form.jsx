/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({

    displayName : 'Form',

    getDefaultProps : function()
    {
        return {
            type     : 'text',
            required : false
        };
    },

    render : function()
    {
        return this.transferPropsTo(
            <form className="form">{this.props.children}</form>
        );
    }
});
