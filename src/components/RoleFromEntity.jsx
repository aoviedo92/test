import React, {Component} from "react";

export class RoleFromEntity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      this.props.entities.map(entity => entity.permissions.map(p => <th key={p}>{p}</th>))
    )
  }
}