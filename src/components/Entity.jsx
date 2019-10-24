import React, {Component} from "react";

export class Entity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (this.props.entities.map(entity => <th key={entity.entity} colSpan={entity.cantPerms}>{entity.capitalizedEntity}</th>))
  }
}