import React, {Component} from "react";
import Checkable from "./Checkable";

class PermHeader extends Checkable{
  render() {
    return <th>
      {this.props.perm}
      {this.renderCheckbox()}
    </th>
  }
}

export default class PermFromEntity extends Component {
  render() {
    return (
      this.props.entities.map(entity => entity.permissions.map(p =>
        <PermHeader key={p} perm={p} toggle={(checked) => this.props.onToggleFullPerm(entity, p, checked)} />
      ))
    )
  }
}