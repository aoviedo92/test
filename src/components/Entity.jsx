import React, {Component} from "react";
import Checkable from "./Checkable";

class EntityHeaderCell extends Checkable{

  render() {
    const entityTh = <>
      {this.props.entity.capitalizedEntity}
      {this.renderCheckbox()}
    </>;
    return <th key={this.props.entity.entity} colSpan={this.props.entity.cantPerms} className="fixed-header">
      {this.renderOverableContent(entityTh)}
    </th>;
  }
}
export default class EntityHeader extends Component {

  render() {
    return (this.props.entities.map(entity =>
      <EntityHeaderCell key={entity.entity}
                        entity={entity}
                        toggle={(checked) => this.props.onToggleFullEntity(entity, checked)}/>
    ))
  }
}