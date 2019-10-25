import React, {Component} from "react";

export default class Checkable extends Component {
  static defaultProps = {
    checked: false
  };
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked
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