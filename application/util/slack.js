'use strict';

var React = require('react');
var $     = require('jquery');

var SPOTIFI_URI = 'http://open.spotify.com/track/';
var WEBHOOK_URI = 'slack.com/services/hooks/incoming-webhook?token=';

var linkify = function(uri, text)
{
    var parts = uri.split(':');

    if (parts.length === 3 && parts[1] === 'track')
    {
        uri = SPOTIFI_URI + parts[2];
    }

    return '<' + uri + '|' + text + '>';
};

var webhookUrl = function(subdomain, token)
{
    return 'https://' + subdomain + '.' + WEBHOOK_URI + token;
};

var updateStatus = function(component, track)
{
    var artist, payload;

    if ( ! component.state.subdomain)
    {
        console.log('Missing webhook subdomain');

        return;
    }

    if ( ! component.state.token)
    {
        console.log('Missing webhook token');

        return;
    }

    if (component.state.editing)
        return;

    if ( ! component.state.nowPlaying || component.state.nowPlaying.uri !== track.uri)
    {
        component.setState({nowPlaying : track});

        artist  = track.artists[0];
        payload = {
            icon_emoji : ':' + component.state.emoji + ':',
            text       : linkify(artist.uri, artist.name) + ' - ' + linkify(track.uri, track.name),
            username   : component.state.user.name
        };

        if ( ! component.state.muted)
        {
            $.post(
                webhookUrl(component.state.subdomain, component.state.token),
                JSON.stringify(payload),
                null,
                'json'
            );
        }

        if (window.DEBUG_PAYLOAD)
        {
            console.log(component.props.key, payload);
        }
    }
};

var Mixin = {

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
        var self = this;

        this.props.dispatcher.on('updateStatus', function(track) {
            updateStatus(self, track);
        });
    }

};

module.exports = Mixin;