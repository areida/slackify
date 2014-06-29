/** @jsx React.DOM */
'use strict';

var React = require('react');
var cx    = require('react/lib/cx');

module.exports = React.createClass({
    displayName : 'Button',

    propTypes : {
        size   : React.PropTypes.oneOf(['tiny', 'small', 'regular', 'large']),
        color  : React.PropTypes.oneOf(['regular', 'subtle', 'plain']),
        expand : React.PropTypes.bool
    },

    getDefaultProps : function()
    {
        return {
            size   : 'regular',
            color  : 'regular',
            expand : false
        };
    },

    render : function()
    {
        var classes = cx({
            'button'           : true,
            'button--large'    : this.props.size === 'large',
            'button--small'    : this.props.size === 'small',
            'button--tiny'     : this.props.size === 'tiny',
            'button--subtle'   : this.props.color === 'subtle',
            'button--plain'    : this.props.color === 'plain',
            'button--expand'   : this.props.expand === true,
            'button--facebook' : this.props.type === 'facebook',
            'button--icon'     : this.props.type === 'icon'
        });

        return this.transferPropsTo(
            <a className={classes}>{this.props.children}</a>
        );
    }
});
