import React, {Component} from "react";

export class ToggleablePerm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <td onClick={()=>this.props.onTogglePerm()}>{this.props.hasPerm ? 'X':'-'}</td>
  }
}