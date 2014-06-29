/** @jsx React.DOM */
/* global window */
'use strict';

var _           = require('underscore');
var React       = require('react');
var dispatcher  = require('synapse-common/lib/dispatcher');

var SiteLayout = require('./ui/layouts/site');
var HomePage   = require('./ui/pages/home');

window.DEBUG_PAYLOAD = false;
window.PREVENT_SEND  = false;

function Application() {
    this.dispatcher = dispatcher;

    this.stores = {};
}

Application.prototype.start = function(user, track) {
    window.React = React;

    var layout = (
        <SiteLayout>
            <HomePage dispatcher={this.dispatcher} user={user} />
        </SiteLayout>
    );

    React.renderComponent(layout, window.document.body);
};

module.exports = Application;
