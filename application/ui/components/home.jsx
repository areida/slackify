/** @jsx React.DOM */
'use strict';

var React = require('react');
var _     = require('underscore');

var Button   = require('./buttons/button');
var Channel  = require('./channel');

module.exports = React.createClass({
    displayName : 'Home',

    getInitialState : function()
    {
        return {gridItems : this.getItemsFromStorage()};
    },

    render : function()
    {
        return this.transferPropsTo(
            <div>
                <div className='controls'>
                    <Button className='fa fa-plus' onClick={this.addChannel} title='Add Channel' />
                </div>
                {this.state.gridItems.map(this.getChannel)}
            </div>
        );
    },

    addChannel : function()
    {
        var items = _.clone(this.state.gridItems);

        items.push('channel-' + new Date().getTime());

        this.setState({
            gridItems : items
        });
    },

    getItemsFromStorage : function()
    {
        return _.keys(global.localStorage);
    },

    getChannel : function(key)
    {
        return this.transferPropsTo(
            <Channel key={key} localStorageKey={key} onDestroy={this.updateItemsFromStorage} />
        );
    },

    updateItemsFromStorage : function()
    {
        this.setState({gridItems : this.getItemsFromStorage()});
    }

});
