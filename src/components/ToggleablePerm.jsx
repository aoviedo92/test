import React, {Component} from "react";
import styled from 'styled-components';

export class ToggleablePerm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Td = styled.td`
      text-align: center;
      cursor: pointer;
    `;
    return <Td onClick={()=>this.props.onTogglePerm()}>{this.props.hasPerm ? 'X':'-'}</Td>
  }
}