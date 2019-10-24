import React, {Component} from "react";
import EntityHeader from "./Entity";
import PermFromEntity from "./PermFromEntity";
import RoleRow from "./Role";
import {PERMISSIONS, ROLES} from "../mockData";
import {Entity, Role} from "../models";

export class RolesManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      roles: []
    };
  }
  componentDidMount() {
    const entities = PERMISSIONS.map(p => new Entity(p));
    const roles = ROLES.map(r => new Role(r));
    this.setState({entities, roles})
  }
  handleToggleFullPerm(entity, permToToggle, hasPerm) {
    this.state.roles.forEach(role => {
      role.togglePerm(entity, permToToggle, hasPerm);
      this.handleUpdRole(role)
    })
  }
  handleToggleFullEntity(entity, hasPerm) {
    entity.permissions.forEach(perm => this.handleToggleFullPerm(entity, perm, hasPerm));
  }
  handleToggleFullRoleRow(role, hasPerm) {
    this.state.entities.forEach(entity => entity.permissions.forEach(permToToggle => {
      role.togglePerm(entity, permToToggle, hasPerm);
      this.handleUpdRole(role);
    }))
  }
  /**
   * @type Role
   * */
  handleUpdRole(role) {
    // console.log('handleUpdRole',role)
    const roleIndex = this.state.roles.findIndex(r => r.id === role.id);
    this.setState(state => {
      if (roleIndex !== -1) {
        state.roles[roleIndex] = role;
      }
      return {roles: state.roles, entities: state.entities}
    })
  }
  render() {
    return <table className="table">
      <thead>
      <tr className="bc">
        <th rowSpan="2" className="bc1">Roles</th>
        <EntityHeader entities={this.state.entities} onToggleFullEntity={(entity, hasPerm)=>this.handleToggleFullEntity(entity, hasPerm)} />
      </tr>
      <tr>
        <PermFromEntity entities={this.state.entities} onToggleFullPerm={(entity, permToToggle, hasPerm) => this.handleToggleFullPerm(entity, permToToggle, hasPerm)}/>
      </tr>
      </thead>
      <tbody>
        <RoleRow entities={this.state.entities}
                 roles={this.state.roles}
                 onToggleFullRoleRow={(role, hasPerm)=>this.handleToggleFullRoleRow(role, hasPerm)}
                 onUpdRole={(role) => this.handleUpdRole(role)}/>
      </tbody>
    </table>
  }
}