'use strict';

var _ = require('underscore');

module.exports = {
    getInitialState : function()
    {
        return {
            formData : {}
        };
    },

    handleFormUpdate : function(name, value, evt)
    {
        var formData = this.state.formData;
        formData[name] = value;

        this.setState({formData : formData});
    },

    getFormValues : function()
    {
        var fields = _.keys(this.formFields);
        var values = {};

        _.each(fields, function(field) {
            values[field] = '';
        });

        _.each(this.state.formData, function(data, name) {
            values[name] = data.value;
        });

        return values;
    },

    isFormValid : function()
    {
        return _.reduce(_.pluck(this.state.formData, 'validated'), function (memo, fieldValid) {
            return memo && (fieldValid === true);
        }, true);
    },

    getFormFields : function()
    {
        return _.map(this.formFields, function(field, name) {
            field  = _.clone(field);
            var el = field.element;
            delete field.element;

            field.handleChange = _.bind(this.handleFormUpdate, this, name);
            field.key          = name;
            field.name         = name;
            field.ref          = name;

            if (this.state.formData[name]) {
                field.value = this.state.formData[name].value;
            }

            return el(field);
        }, this);
    }
};
