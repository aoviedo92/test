import React, {Component} from 'react';

import './App.css';
import {RolesManager} from "./components/RolesManager";
import {PERMISSIONS, ROLES} from "./mockData";
import {Entity, Role} from './models'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      roles: []
    }
  }
  componentDidMount() {
    const entities = PERMISSIONS.map(p => new Entity(p));
    const roles = ROLES.map(r => new Role(r));
    this.setState({entities, roles})
  }

  render() {
    return (
      <div>
        <RolesManager entities={this.state.entities} roles={this.state.roles}/>
      </div>
    );
  }
}

export default App;
