import React, {Component} from "react";

class PermHeader extends Component{
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
    return <th>
      {this.props.perm}
      <input type="checkbox" checked={this.state.checked} onChange={()=>this.onChangeCheckbox()}/>
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