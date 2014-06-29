/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName : 'Header',

    propTypes : {},

    render : function()
    {
        return (
            <header className='layout--header'>
            	<h1 className='h3'>Slackify</h1>
                <p>Share your tunes with your fellow slackers.</p>
            </header>
        );
    }
});
