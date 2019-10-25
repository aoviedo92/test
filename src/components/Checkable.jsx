import React, {Component} from "react";

export default class Checkable extends Component {
  static defaultProps = {
    checked: false
  };
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      checked: props.checked
    };
  }
  showCheck(show=true) {
    this.setState({show})
  }
  onChangeCheckbox() {
    const checked = !this.state.checked;
    this.setState({checked});
    this.props.toggle(checked);
  }
  renderCheckbox() {
    return <input type="checkbox"
                  className={this.state.show ? 'toggleable-perms showed' : 'toggleable-perms no-show'}
                  checked={this.state.checked}
                  onChange={() => this.onChangeCheckbox()}/>
  }

  renderOverableContent(Element) {
    return <div onMouseLeave={()=>this.setState({show: false})} onMouseOver={()=>this.setState({show: true})}>
      {Element}
    </div>
  }
}