import React, {Component} from "react";

export class NewRoleInput extends Component {
  BASIC_PLACEHOLDER = "Add new role...";

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      placeholder: this.BASIC_PLACEHOLDER
    };
  }

  render() {
    return <td colSpan={this.props.colspan}>
        <input type="text"
               value={this.state.value}
               onChange={(e) => {this.setState({value: e.target.value})}}
               placeholder={this.state.placeholder}
               id="input-add-role"
               onKeyDown={(e)=>{if (e.keyCode===13) {
                 this.props.onAddNewRol(e.target.value);
                 this.setState({value: ''});
               }}}
               onBlur={()=>this.setState({placeholder: this.BASIC_PLACEHOLDER})}
               onFocus={()=>this.setState({placeholder: "Type the role name and press enter to confirm"})}/>
      </td>
  }
}