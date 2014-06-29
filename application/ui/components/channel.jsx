/** @jsx React.DOM */
'use strict';

var React        = require('react');
var SpotifyMixin = require('../../util/spotify-mixin');
var _            = require('underscore');
var $            = require('jquery');

var emojis = require('../../util/emojis');
var Forms  = require('./forms');
var Form   = Forms.Form;
var Input  = Forms.Input;
var Select = Forms.Select;

module.exports = React.createClass({
    displayName : 'Channel',
    mixins      : [SpotifyMixin],

    propTypes : {
        key       : React.PropTypes.string.isRequired,
        onDestroy : React.PropTypes.func.isRequired,
        user      : React.PropTypes.object.isRequired
    },

    getInitialState : function()
    {
        return {
            editing  : true,
            formData : {}
        };
    },

    componentDidMount : function()
    {
        var storage = global.localStorage.getItem(this.props.key);

        if (storage)
        {
            this.setState($.parseJSON(storage));
        }

        this.setState({
            user : _.clone(this.props.user)
        });
    },

    render : function()
    {
        var children  = [],
            muteClass = this.state.muted ? 'fa-play' : 'fa-pause',
            muteText  = this.state.muted ? 'Unmute'  : 'Mute';

        if (this.state.editing)
        {
            children.push(<Input key='subdomain' label='Subdomain' value={this.state.subdomain} required={true} handleChange={this.handleSubdomainChange} />);
            children.push(<Input key='token' label='Token' value={this.state.token} required={true} handleChange={this.handleTokenChange} />);
            children.push(<Select key='emoji' label='Emoji' value={this.state.emoji} handleChange={this.handleEmojiChange} options={_.map(emojis, this.getEmojiOption)} />);
            children.push(
                <p key='actions'>
                    <i className='fa fa-times' onClick={this.handleDestroy} title='Delete' />
                    <i className='fa fa-save' onClick={this.handleUpdate} title='Save' />
                </p>
            );
        }
        else
        {

            children.push(<p key='subdomain'>Subdomain {this.state.subdomain}</p>);
            children.push(<p key='token'>Token {this.state.token}</p>);
            children.push(
                <p key='emoji' className='emoji'>
                    Emoji <img src={emojis[this.state.emoji]} title={this.state.emoji} />
                </p>
            );
            children.push(
                <p key='actions'>
                    <i key='mute' className={'fa ' + muteClass} onClick={this.handleMute} title={muteText} />
                    <i key='edit' className='fa fa-pencil' onClick={this.handleEdit} title='Edit' />
                </p>
            );
        }

        return (
            <div className='channel'>
                {children}
            </div>
        );
    },

    getEmojiOption : function(image, emoji)
    {
        return {
            label    : emoji,
            selected : emoji === this.state.emoji,
            value    : emoji
        };
    },

    handleDestroy : function()
    {
        global.localStorage.removeItem(this.props.key);
        this.props.onDestroy();
    },

    handleEdit : function()
    {
        this.setState({editing : true});
    },

    handleEmojiChange : function(input, event)
    {
        var formData = _.clone(this.state.formData);

        formData['emoji'] = input;

        this.setState({
            emoji    : input.value,
            formData : formData
        });
    },

    handleMute : function()
    {
        this.setState({muted : ! this.state.muted});
    },

    handleSubdomainChange : function(input, event)
    {
        var formData = _.clone(this.state.formData);

        formData['subdomain'] = input;

        this.setState({
            formData  : formData,
            subdomain : input.value
        });
    },

    handleTokenChange : function(input, event)
    {
        var formData = _.clone(this.state.formData);

        formData['token'] = input;

        this.setState({
            formData : formData,
            token    : input.value
        });
    },

    handleUpdate : function()
    {
        var state = _.clone(this.state);

        if (this.isValid())
        {
            state.editing = false;

            this.setState(state);

            global.localStorage.setItem(this.props.key, JSON.stringify(state));
        }
    },

    isValid : function()
    {
        return _.reduce(_.pluck(this.state.formData, 'validated'), function (memo, fieldValid) {
            return memo && (fieldValid === true);
        }, true);
    }

});