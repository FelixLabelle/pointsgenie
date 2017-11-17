import React, { PropTypes } from "react";
import { Input, Button, Alert, Pager } from "react-bootstrap";
import _ from "lodash";

import request from "../middlewares/request";

const Invoice = React.createClass({
  displayName: "Invoice",
  
    propTypes: {
      user: PropTypes.object,
    },
  
  getInitialState() {
    return {
      user: this.props.user
    };
  },

  renderFacture: function() {
    console.log(this.state.user);
    return(
      <div>
        <div>
          <h4>Cérémonie de remise de jonc: {this.state.user.factureJonc} $</h4>
        </div>
        <div>
          <h4>Voyage: {this.state.user.factureVoyage} $</h4>
        </div>
        <div>
          <h4>Bal: {this.state.user.promInscription.cost} $</h4>
        </div>
        <div>
          <h4>Album de finissants: {this.state.user.factureAlbum} $</h4>
        </div>
        <div>
          <h4>Photos de finissants: {this.state.user.facturePhotos} $</h4>
        </div>
        <div>
          <h4>Manteau: {this.state.user.factureManteau} $</h4>
        </div>
        <div>
          <h4>Déjà payé (photos): {this.state.user.paid.photo} $</h4>
        </div>
      </div>
    );
  },

  renderTotal() {
    const user = this.state.user;
    const total = user.promInscription.cost + user.factureVoyage + user.factureJonc + user.factureAlbum + user.facturePhotos + user.factureManteau;
    return (
      <div style={{paddingBottom: 30}}>
        <h4>TOTAL: {total} $</h4>
      </div>
    );
  },

  render: function() {
    return (
      <form className="form-horizontal">
        {this.renderFacture()}
        {this.renderTotal()}
        <br/>
      </form>
    );
  },
});

export default Invoice;
