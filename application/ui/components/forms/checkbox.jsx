/** @jsx React.DOM */
'use strict';

var React = require('react');
var cx    = require('react/lib/cx');

module.exports = React.createClass({

    displayName : 'Checkbox',

    propTypes : {
        label         : React.PropTypes.string.isRequired,
        checkboxLabel : React.PropTypes.string,
        handleChange  : React.PropTypes.func.isRequired,
        required      : React.PropTypes.bool
    },

    getValue : function()
    {
        return this.state.checked;
    },

    getDefaultProps : function()
    {
        return {
            checkboxLabel : '',
            required      : false
        };
    },

    getInitialState : function()
    {
        return {
            validated : true,
            checked   : this.props.defaultValue === true
        };
    },

    handleChange : function(event)
    {
        var checked = event.currentTarget.checked;

        this.props.handleChange({
            value     : checked,
            validated : true
        }, event);

        this.setState({
            checked   : checked,
            validated : true
        });
    },

    render : function()
    {
        var labelClasses = cx({
            'form__label'      : true,
            'validate'         : true,
            'validate--failed' : this.state.validated !== true
        });

        var fieldClasses = cx({
            'input'           : true,
            'input--checkbox' : true
        });

        var requiredMark;
        if (this.props.required) {
            requiredMark = <span className="validate__required-mark">*</span>;
        }

        var field = this.transferPropsTo(
            <input onChange={this.handleChange}
                   type='checkbox'
                   className={fieldClasses}
                   checked={this.state.checked}
                   ref='input' />
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
                {this.props.checkboxLabel}
                {validationMessage}
            </label>
        );
    }
});
