/** @jsx React.DOM */
"use strict";
var React = require("react");
var PropTypes = React.PropTypes;
var Button = require("react-bootstrap/Button");

var Disponibility = require("./application/disponibility");
var TaskPreferences = require("./application/tasks-preferences");

module.exports = React.createClass({
  displayName: "ApplicationForm",
  propTypes: {
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool,
    isValid: PropTypes.bool,
  },
  getDefaultProps: function () {
    return {
      isSubmitting: false,
      isValid: true,
    };
  },
  getFormData: function () {
    return {
      tasks: this.refs.taskPreferences.getFormData(),
      hours: this.refs.hourCheckboxes.getFormData(),
    };
  },
  isValid: function () {
    return this.refs.taskPreferences.isValid() && this.this.refs.hourCheckboxes.isValid();
  },
  renderSubmitButton: function () {
    return (
      <Button type="submit" disabled={!this.props.isValid || this.props.isSubmitting} bsStyle="success">
        {this.props.isSubmitting ? "Enregistrement en cours...": "Postuler"}
      </Button>
    );
  },
  render: function() {
    return (
      <form onSubmit={this.props.onSubmit} role="form">
        <fieldset>
          <h4>Postes demandés</h4>
          <TaskPreferences ref="taskPreferences" onChange={this.this.props.onChange}
            tasks={this.props.tasks} />
          <h4>Disponibilités</h4>
          <Disponibility ref="hourCheckboxes" onChange={this.props.onChange}
            startDate={this.props.startDate} endDate={this.props.endDate} />
        {this.renderSubmitButton()}
        </fieldset>
      </form>
    );
  }
});