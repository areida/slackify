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
            <div>
                <Header />
                <div>
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
});
