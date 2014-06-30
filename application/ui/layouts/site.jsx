/** @jsx React.DOM */
'use strict';

var React  = require('react');
var Header = require('./header');
var Footer = require('./footer');

module.exports = React.createClass({
    displayName : 'SiteLayout',

    render : function()
    {
        return (
            <div key='site' className='site'>
                <Header key='header' />
                <div key='main' className='main'>
                    {this.props.children}
                </div>
                <Footer key='footer' />
            </div>
        );
    }
});
