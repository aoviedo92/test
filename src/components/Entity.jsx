import React, {Component} from "react";

class EntityHeaderCell extends Component{
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }
  onChangeCheckbox() {
    const checked = !this.state.checked;
    this.setState({checked});
    this.props.toggle(checked);
  }
  render() {
    return <th key={this.props.entity.entity} colSpan={this.props.entity.cantPerms}>
      {this.props.entity.capitalizedEntity}
      <input type="checkbox" checked={this.state.checked} onChange={() => this.onChangeCheckbox()}/>
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