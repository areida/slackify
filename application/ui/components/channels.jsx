/** @jsx React.DOM */
'use strict';

var React = require('react');
var _     = require('underscore');

var Channel = require('./channel');

var DB = require('../../db/slackify-v1');

module.exports = React.createClass({
    displayName : 'Channels',

    getInitialState : function()
    {
        return {channels : []};
    },

    componentWillMount : function()
    {
        this.db = new DB();
    },

    componentDidMount : function()
    {
        this.getChannelsFromStorage();
    },

    render : function()
    {
        return (
            <div key='channels' className='channels'>
                <div key='controls' className='controls'>
                    <i key='add' className='fa fa-plus' onClick={this.addChannel} title='Add Channel' />
                </div>
                <div key='list' className='list'>
                    {this.state.channels.map(this.getChannel)}
                </div>
            </div>
        );
    },

    addChannel : function()
    {
        var channels = _.clone(this.state.channels),
            key      = 'channel-' + new Date().getTime(),
            self     = this;

        channels.push(key);

        this.db.insert('channel', [{key : key}], function() {
            self.setState({channels : channels});
        });
    },

    getChannel : function(key)
    {
        return this.transferPropsTo(
            <Channel key={key} onDestroy={this.removeChannel} />
        );
    },

    getChannelsFromStorage : function()
    {
        this.db.selectAll('channel', this.updateChannelsFromStorage);
    },

    removeChannel : function(channel)
    {
        var channels = _.clone(this.state.channels);

        this.setState({channels : _.without(channels, channel)});
    },

    updateChannelsFromStorage : function(channel)
    {
        var channels = _.clone(this.state.channels);

        channels.push(channel.key);

        this.setState({channels : channels});
    }

});
