import React, { PropTypes } from "react";

import PointsLog from "../components/PointsLog";
import ApplyToEvent from "../components/ApplyToEvent";
import NextSchedule from "../components/NextSchedule";

import { RouteHandler, Link } from "react-router/build/npm/lib";
import { Table, Glyphicon } from "react-bootstrap";
import { sortByOrder as _sortByOrder } from "lodash"
import request from "../middlewares/request";

import connectToStore from "flummox/connect";

import EventStore from "../stores/event.js"

const IndexPage = React.createClass({
  displayName: "IndexPage",

  contextTypes: {
    flux: PropTypes.object,
  },

  getInitialState() {
    return {
      events: EventStore.getEvents(),
    }
  },

  componentWillMount() {
    EventStore.init();
  },

  componentDidMount() {
    EventStore.addChangeListener(this.updateEvents);
  },

  componentWillUnmount() {
    EventStores.removeChangeListener(this.updateEvents);
  },

  updateEvents() {
    if(!this.isMounted()) {
      return;
    }
    this.setState({
      events: EventStore.getEvents(),
    });
  },

  getNextEvent() {
    let events = [2];
    this.state.events.forEach(function(entry) {
      events.push(entry)
      console.log(entry);
      });
    return events
  },

  render() {
    let nextEvent = this.getNextEvent()
    //const user = this.props.user || {};
    //const events = this.props.events || {};
    return (
      <div className= "index-page">
         <NextSchedule event={nextEvent} />
      </div>
    );
  }
});

const ConnectedEventList = connectToStore(IndexPage, {
  auth: store => ({
    user: store.getAuthenticatedUser(),
  })
});

export default ConnectedEventList;


//         <ApplyToEvent promocard={user.promocard} />
//        <PointsLog log={user.points} />
//   auth: store => ({
//    user: store.getAuthenticatedUser(),
//  }),

      //if (entry.isClosed == true & entry.isPointsAttributed == false) {
      //  events.push(entry)