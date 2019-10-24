import React, {Component} from "react";
import Checkable from "./Checkable";

class EntityHeaderCell extends Checkable{

  render() {
    return <th key={this.props.entity.entity} colSpan={this.props.entity.cantPerms}>
      {this.props.entity.capitalizedEntity}
      {this.renderCheckbox()}
    </th>
  }
}
export default class EntityHeader extends Component {

  render() {
    return (this.props.entities.map(entity =>
      <EntityHeaderCell key={entity.entity} entity={entity} toggle={(checked) => this.props.onToggleFullEntity(entity, checked)}/>
    ))
  }
}