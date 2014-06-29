/** @jsx React.DOM */
'use strict';

var _     = require('underscore');
var React = require('react');
var cx    = require('react/lib/cx');

module.exports = React.createClass({

    displayName : 'TextInput',

    propTypes : {
        name         : React.PropTypes.string.isRequired,
        label        : React.PropTypes.string.isRequired,
        handleChange : React.PropTypes.func.isRequired,
        required     : React.PropTypes.bool,
        validator    : React.PropTypes.func,
        // Array of objects with keys `label`, `value`, and optional `selected`
        options      : React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    getValue : function()
    {
        return this.state.value;
    },

    getDefaultProps : function()
    {
        return {
            type      : 'text',
            required  : false
        };
    },

    getInitialState : function()
    {
        return {
            value     : this.props.defaultValue || null,
            validated : true
        };
    },

    handleChange : function(event)
    {
        var value = event.currentTarget.value;

        this.props.handleChange({
            value     : value,
            validated : true
        }, event);

        this.setState({
            value     : value,
            validated : true
        });
    },

    getOption : function(option, idx)
    {
        var name    = this.props.name,
            id      = this.props.name + '-' + idx,
            value   = this.state.value,
            checked = value === option.value;

        return [
            <input className='input input--radio'
                   type='radio'
                   name={name}
                   id={id}
                   key={'input-'+idx}
                   checked={checked}
                   value={option.value}
                   onChange={this.handleChange} />,
            <label className='form__label form__label--radio'
                    key={'label-'+idx}
                   htmlFor={id}>{option.label}</label>
        ];
    },

    render : function()
    {
        var labelClasses = cx({
            'form__label'      : true,
            'validate'         : true,
            'validate--failed' : this.state.validated !== true
        });

        var requiredMark;
        if (this.props.required) {
            requiredMark = <span className="validate__required-mark">*</span>;
        }

        var fields = _.flatten(this.props.options.map(this.getOption));

        var validationMessage;
        if (this.state.validated !== true) {
            validationMessage = (
                <small className='validate__message validate__message--alert'>
                    {this.state.validated}
                </small>
            );
        }

        return (
            <label className={labelClasses}>
                {this.props.label}
                {requiredMark}
                {fields}
                {validationMessage}
            </label>
        );
    }
});
