/** @jsx React.DOM */
'use strict';

var React = require('react');
var cx    = require('react/lib/cx');

module.exports = React.createClass({

    displayName : 'TextInput',

    propTypes : {
        label        : React.PropTypes.string.isRequired,
        handleChange : React.PropTypes.func.isRequired,
        required     : React.PropTypes.bool,
        validator    : React.PropTypes.func,
        // Array of objects with keys `label`, `value`, and optional `selected`
        options      : React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    getValue : function()
    {
        var element = this.refs.input.getDOMNode();
        return element.options[element.selectedIndex].value;
    },

    getDefaultProps : function()
    {
        return {
            type      : 'text',
            required  : false,
            validator : function() { return true; }
        };
    },

    getInitialState : function()
    {
        return {
            validated : true
        };
    },

    handleChange : function(event)
    {
        var validated = this.props.validator(this.getValue(this));

        this.props.handleChange({
            value     : this.getValue(),
            validated : validated
        }, event);

        this.setState({validated : validated });
    },

    getOption : function(option, idx)
    {
        return <option key={idx} value={option.value}>{option.label}</option>;
    },

    render : function()
    {
        var labelClasses = cx({
            'label'            : true,
            'label--select'    : true,
            'validate'         : true,
            'validate--failed' : this.state.validated !== true
        });

        var fieldClasses = cx({
            'input'           : true,
            'input--select'   : true,
            'validate__input' : this.state.validated !== true
        });

        var requiredMark;
        if (this.props.required) {
            requiredMark = <span className="validate__required-mark">*</span>;
        }

        var field = this.transferPropsTo(
            <select className={fieldClasses} onChange={this.handleChange} ref='input'>
                {this.props.options.map(this.getOption)}
            </select>
        );

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
                {field}
                {validationMessage}
            </label>
        );
    }
});
