import React, {Component} from "react";
import EntityHeader from "./Entity";
import PermFromEntity from "./PermFromEntity";
import RoleRow from "./Role";
import Modal from "./Modal";
import {PERMISSIONS, ROLES} from "../mockData";
import {Entity, Role} from "../models";
import {NewRoleInput} from "./NewRoleInput";
import styled from 'styled-components';


export class RolesManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRolesSummary: false,
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
  handleAddNewRol(newRoleName) {
    const role = new Role({id: this.state.roles.length + 1, name: newRoleName, permissions: []});
    role.checked = true; // manually handle full row checked
    this.setState(state => {
      state.roles.push(role);
      return state;
    }, () => this.handleToggleFullRoleRow(role, true))

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
  save() {
    console.log('-----------UPDATED ROLES---------------')
    this.state.roles.forEach(r => r.showRepr())
    this.setState({showRolesSummary: true})
  }
  get amountEntityPerms() {
    return this.state.entities.reduce((carr, entity) => entity.cantPerms + carr, 0)
  }
  render() {
    const Button = styled.button`
      :hover {
        background-color: rgba(40, 33, 31, 0.22);
        color: #333;
        transition: all .5s ease-out;
      }
      transition: all .2s ease-in;
      border-radius: 3px;
      border: none;
      color: #fff;
      background-color: #28211f;
      padding: 5px 1em;
      width: 100%;
      cursor: pointer;
    `;
    const ModalSummary = () => this.state.showRolesSummary && <Modal roles={this.state.roles} onClose={()=>this.setState({showRolesSummary: false})}/>;
    return <><ModalSummary /><table className="table">
      <thead>
      <tr>
        <th rowSpan="2" style={{width: 150}} className="fixed-col">Roles</th>
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
        <tr>
          <NewRoleInput colspan={this.amountEntityPerms} onAddNewRol={(newRoleName) => this.handleAddNewRol(newRoleName)}/>
          <td>
            <Button onClick={() => this.save()}>SAVE</Button>
          </td>
        </tr>
      </tbody>
    </table></>
  }
}