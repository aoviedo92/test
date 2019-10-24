import React, {Component} from "react";
import {ToggleablePerm} from "./ToggleablePerm";


export class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleTogglePerm(role, entity, hasPerm) {
    console.log(role, entity, hasPerm)
  }
  render() {
    return this.props.roles.map(role => {
      return (
        <tr key={role.id}>
          <td>{role.name}</td>
          {this.props.entities.map((entity, index) => entity.permissions.map((eP, i) => {
            const hasPerm = role.hasPerm(entity);
            const key = `${role.name}-${entity.entity}-${index}-${i}`;
            return <ToggleablePerm key={key} hasPerm={hasPerm} onTogglePerm={()=>this.handleTogglePerm(role, entity, !hasPerm)}/>
          })
        )}
        </tr>
      )
    })
  }
}