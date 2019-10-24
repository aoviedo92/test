import React, {Component} from "react";

export default class Checkable extends Component {
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
  renderCheckbox() {
    return <input type="checkbox" checked={this.state.checked} onChange={() => this.onChangeCheckbox()}/>
  }
}