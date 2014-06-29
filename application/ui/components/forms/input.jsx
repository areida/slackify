/** @jsx React.DOM */
'use strict';

var React = require('react');
var cx    = require('react/lib/cx');

var getDefaultValidator = function(type)
{
    if (type === 'email') {
        return function(value) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
            if (pattern.test(value)) {
                return true;
            } else {
                return 'Invalid email';
            }
        };
    } else if (type === 'number') {
        return function(value) {
            var pattern = new RegExp(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/);
            if (pattern.test(value)) {
                return true;
            } else {
                return 'Please input a number';
            }
        };
    } else if (type === 'url') {
        return function(value) {
            var pattern = new RegExp(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i);
            if (pattern.test(value)) {
                return true;
            } else {
                return 'Invalid URL';
            }
        };
    } else {
        return function(value) {
            return true;
        };
    }
};

module.exports = React.createClass({

    displayName : 'Input',

    propTypes : {
        label        : React.PropTypes.string.isRequired,
        handleChange : React.PropTypes.func.isRequired,
        validator    : React.PropTypes.func,
        required     : React.PropTypes.bool,
        type         : React.PropTypes.oneOf([
            'text',
            'password',
            'email',
            'search',
            'url',
            'tel',
            'number',
            'date',
            'datetime',
            'month',
            'week',
            'time',
            'color',
            'range'
        ])
    },

    getValue : function()
    {
        return this.refs.input.getDOMNode().value;
    },

    getDefaultProps : function()
    {
        return {
            type      : 'text',
            required  : false,
            validator : getDefaultValidator(this.props.type)
        };
    },

    getInitialState : function()
    {
        return {
            validated      : true,
            showValidation : false
        };
    },

    componentDidMount : function()
    {
        this.setState({ showValidation  : true });
        this.handleChange();
    },

    handleBlur : function(event)
    {
        this.setState({ showValidation  : true });
        this.handleChange();
    },

    handleChange : function(event)
    {
        var validated = this.props.validator(this.getValue(this));

        if (this.getValue(this) === '' && this.props.required === true) {
            validated = 'This field is required';
        }

        this.props.handleChange({
            value     : this.getValue(),
            validated : validated
        }, event);

        this.setState({validated : validated });
    },

    render : function()
    {
        var labelClasses = cx({
            'label'            : true,
            'label--text'      : this.props.type === 'text',
            'label--email'     : this.props.type === 'email',
            'label--search'    : this.props.type === 'search',
            'label--url'       : this.props.type === 'url',
            'label--tel'       : this.props.type === 'tel',
            'label--number'    : this.props.type === 'number',
            'label--date'      : this.props.type === 'date',
            'label--datetime'  : this.props.type === 'datetime',
            'label--month'     : this.props.type === 'month',
            'label--week'      : this.props.type === 'week',
            'label--time'      : this.props.type === 'time',
            'label--color'     : this.props.type === 'color',
            'validate'         : true,
            'validate--failed' : this.state.validated !== true && this.state.showValidation
        });

        var fieldClasses = cx({
            'input'           : true,
            'input--text'     : this.props.type === 'text',
            'input--email'    : this.props.type === 'email',
            'input--search'   : this.props.type === 'search',
            'input--url'      : this.props.type === 'url',
            'input--tel'      : this.props.type === 'tel',
            'input--number'   : this.props.type === 'number',
            'input--date'     : this.props.type === 'date',
            'input--datetime' : this.props.type === 'datetime',
            'input--month'    : this.props.type === 'month',
            'input--week'     : this.props.type === 'week',
            'input--time'     : this.props.type === 'time',
            'input--color'    : this.props.type === 'color',
            'validate__input' : this.state.validated !== true
        });

        var requiredMark;
        if (this.props.required) {
            requiredMark = <span className="validate__required-mark">{' *'}</span>;
        }

        var field = this.transferPropsTo(
            <input onChange={this.handleChange} onBlur={this.handleBlur} className={fieldClasses} ref='input' placeholder={this.props.label} />
        );

        var validationMessage;
        if (this.state.validated !== true && this.state.showValidation) {
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
