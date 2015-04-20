"use strict";
import React, { PropTypes } from "react";

import { Button } from "react-bootstrap";

import Availability from "./availability";
import TaskPreferences from "./tasks-preferences";

const ApplicationForm = React.createClass({
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

  getDefaultProps() {
    return {
      isSubmitting: false,
      isValid: true,
    };
  },

  getFormData() {
    return {
      preferredTask: this.refs.taskPreference.getFormData(),
      availabilities: this.refs.hourCheckboxes.getFormData(),
    };
  },

  isValid() {
    return this.refs.taskPreference.isValid() && this.refs.hourCheckboxes.isValid();
  },

  renderSubmitButton() {
    return (
      <Button type="submit" disabled={!this.props.isValid || this.props.isSubmitting} bsStyle="success">
        {this.props.isSubmitting ? "Postulance en cours...": "Postuler"}
      </Button>
    );
  },

  render() {
    return (
      <form onSubmit={this.props.onSubmit} role="form">
        <fieldset>
          <h4>Tâche préférée</h4>
          <TaskPreferences ref="taskPreference" onChange={this.props.onChange}
            tasks={this.props.tasks} />
          <h4>Disponibilités</h4>
          <Availability ref="hourCheckboxes" onChange={this.props.onChange}
            startDate={this.props.startDate} endDate={this.props.endDate} />
        {this.renderSubmitButton()}
        </fieldset>
      </form>
    );
  }
});

export default ApplicationForm;