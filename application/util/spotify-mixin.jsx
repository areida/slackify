'use strict';
var React = require('react');
var $     = require('jquery');

var SPOTIFI_URI = 'http://open.spotify.com/track/';
var WEBHOOK_URI = 'slack.com/services/hooks/incoming-webhook?token=';

var Mixin = module.exports = {

    propTypes : {
        dispatcher : React.PropTypes.object.isRequired
    },

    getInitialState : function()
    {
        return {
            emoji      : '100',
            muted      : false,
            nowPlaying : null,
            user       : {}
        };
    },

    componentDidMount: function()
    {
        this.props.dispatcher.on('updateStatus', this.updateStatus);
    },

    linkify : function(uri, text)
    {
        var parts = uri.split(':');

        if (parts.length === 3 && parts[1] === 'track')
        {
            uri = SPOTIFI_URI + parts[2];
        }

        return '<' + uri + '|' + text + '>';
    },

    webhookUrl : function()
    {
        return 'https://' + this.state.subdomain + '.' + WEBHOOK_URI + this.state.token;
    },

    updateStatus : function(track)
    {
        var artist, payload;

        if ( ! this.state.subdomain)
        {
            console.log('Missing webhook subdomain');

            return;
        }

        if ( ! this.state.token)
        {
            console.log('Missing webhook token');

            return;
        }

        if ( ! this.state.nowPlaying || this.state.nowPlaying.uri !== track.uri)
        {
            this.setState({nowPlaying : track});

            artist  = track.artists[0];
            payload = {
                icon_emoji : ':' + this.state.emoji + ':',
                text       : this.linkify(artist.uri, artist.name) + ' - ' + this.linkify(track.uri, track.name),
                username   : this.state.user.name
            };

            if ( ! this.state.muted)
            {
                $.post(
                    this.webhookUrl(),
                    JSON.stringify(payload),
                    null,
                    'json'
                );
            }
            else
            {
                console.log(this.props.localStorageKey, payload);
            }
        }
    }

};
