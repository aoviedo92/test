import React, {Component} from "react";
import {ToggleablePerm} from "./ToggleablePerm";
import Checkable from "./Checkable";

class RoleHeader extends Checkable{

  render() {
    const roleTd = <>
      {this.props.role.name} ({this.props.role.amountPerms})
      {this.renderCheckbox()}
    </>;
    return <td>
      {this.renderOverableContent(roleTd)}
    </td>
  }
}
export default class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleTogglePerm(role, entity, permToToggle, hasPerm) {
    role.togglePerm(entity, permToToggle, hasPerm);
    this.props.onUpdRole(role);
    // console.log(role, entity, permToToggle, hasPerm)
  }
  render() {
    return this.props.roles.map(role => {
      return (
        <tr key={role.id}>
          <RoleHeader role={role}
                      checked={role.checked}
                      toggle={(checked) => this.props.onToggleFullRoleRow(role, checked)}/>
          {this.props.entities.map((entity, index) => entity.permissions.map((permToToggle, i) => {
            const hasPerm = role.hasPerm(entity, permToToggle);
            const key = `${role.name}-${entity.entity}-${index}-${i}`;
            return <ToggleablePerm key={key}
                                   hasPerm={hasPerm}
                                   onTogglePerm={()=>this.handleTogglePerm(role, entity, permToToggle, !hasPerm)}/>
          })
        )}
        </tr>
      )
    })
  }
}