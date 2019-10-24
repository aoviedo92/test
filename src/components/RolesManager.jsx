import React, {Component} from "react";
import {Entity} from "./Entity";
import {RoleFromEntity} from "./RoleFromEntity";
import {Role} from "./Role";

export class RolesManager extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <table className="table">
      <thead>
      <tr className="bc">
        <th rowSpan="2" className="bc1">Roles</th>
        <Entity entities={this.props.entities}/>
      </tr>
      <tr>
        <RoleFromEntity entities={this.props.entities} />
      </tr>
      </thead>
      <tbody>
        <Role entities={this.props.entities} roles={this.props.roles} />
      </tbody>
    </table>
  }
}