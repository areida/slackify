/** @jsx React.DOM */
'use strict';

var $     = require('jquery');
var _     = require('underscore');
var React = require('react');
var Slack = require('../../util/slack');

var Emojis = require('../../util/emojis');
var Forms  = require('./forms');
var Form   = Forms.Form;
var Input  = Forms.Input;
var Select = Forms.Select;

var DB = require('../../db/slackify-v1');

module.exports = React.createClass({
    displayName : 'Channel',
    mixins      : [Slack],

    propTypes : {
        key       : React.PropTypes.string.isRequired,
        onDestroy : React.PropTypes.func.isRequired,
        user      : React.PropTypes.object.isRequired
    },

    getInitialState : function()
    {
        return {
            editing  : true,
            formData : {},
            loading  : true
        };
    },

    componentWillMount : function()
    {
        this.db = new DB();
    },

    componentDidMount : function()
    {
        var self = this;;

        this.db.select('channel', this.props.key, function(state) {
            state.loading = false;
            state.user    = _.clone(self.props.user);

            self.setState(state);
        });
    },

    render : function()
    {
        var children  = [],
            muteClass = this.state.muted ? 'fa-play' : 'fa-pause',
            muteText  = this.state.muted ? 'Unmute'  : 'Mute';

        if (this.state.loading)
        {
            children.push(<p key='loading' className='loading-spinner'><i className='fa fa-spinner fa-spin' /></p>)
        }
        else if (this.state.editing)
        {
            children.push(<Input key='subdomain' label='Subdomain' value={this.state.subdomain} required={true} handleChange={this.handleSubdomainChange} />);
            children.push(<Input key='token' label='Token' value={this.state.token} required={true} handleChange={this.handleTokenChange} />);
            children.push(<Select key='emoji' label='Emoji' value={this.state.emoji} handleChange={this.handleEmojiChange} options={_.map(Emojis, this.getEmojiOption)} />);
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
                    Emoji <img src={Emojis[this.state.emoji]} title={this.state.emoji} />
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
        var self = this;

        this.db.delete('channel', this.props.key, function() {
            self.props.onDestroy(self.props.key);
        });
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
        var self  = this,
            state = _.clone(this.state);

        if (this.isValid())
        {
            state.editing = false;

            this.db.update('channel', this.props.key, state, function() {
                self.setState(state);
            }, function(event) {
                console.log(event);
            });
        }
    },

    isValid : function()
    {
        return _.reduce(_.pluck(this.state.formData, 'validated'), function (memo, fieldValid) {
            return memo && (fieldValid === true);
        }, true);
    }

});