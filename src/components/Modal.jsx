import React, {Component} from "react";
import styled from 'styled-components';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {show: true};
  }
  closeModal() {
    this.setState({show: false});
    setTimeout(()=>this.props.onClose(), 100)
  }
  render() {
    const ModalOverlay = styled.div`
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 500;
      background: #937c7c85;
    `;
    const ModalContent = styled.div`
      margin: 0 auto;
      width: 80%;
      background: #fff;
      margin-top: 50px;
    `;
    const ScrollableContent = styled.div`
      overflow-y: auto;
      height: 60vh;
      padding-left: 10px;
    `;
    const Footer = styled.div`
      background-color: #eee;
      color: #999;
      font-size: 11px;
      text-align: center;
    `;
    const Tile = styled.div`
      border-bottom: 1px solid #eee;
      color: #333;
      padding: 5px;
      span.id {
        color: #999;
        font-size: 12px;
      }
      p {
        margin: 0;
      }
    `;
    const RoleSummTile = ({role}) => (
    <Tile>
      <p>{role.name} <span className="id">ID: {role.id}</span></p>
      <p>Permissions: <span className="id">{role.entities.map(e => e.string_repr).join(', ')}</span></p>
    </Tile>
    );
    return <ModalOverlay onClick={()=>this.closeModal()} className={!this.state.show&&'fade-out'}>
      <ModalContent className={this.state.show&&'fade-in'}>
        <h2 style={{borderBottom: '1px solid #eee', fontWeight: 1, textAlign: 'center', padding: 5, margin: 0}}>Updated Roles</h2>
        <ScrollableContent>
        {this.props.roles.map(r => <RoleSummTile role={r} key={r.id}/>)}
        </ScrollableContent>
        <Footer>Click again to exit...</Footer>
      </ModalContent>
    </ModalOverlay>
  }
}