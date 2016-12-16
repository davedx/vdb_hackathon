import React from 'react';
import _ from 'lodash';
import {$} from '../lang';
import Errors from '../core/Errors';

class Input extends React.Component {
  constructor (props) {
    super(props);
    this.state = {autoComplete: ''};
  }

  onChange (e) {
    if (this.props.onChangeFunction) {
      const val = this.props.type === 'checkbox' ? e.target.checked : e.target.value;
      this.props.onChangeFunction({[this.props.id]: val});

      if (this.props.autoCompleteList) {
        let first = _.find(this.props.autoCompleteList, (item) => item && val && item.indexOf(val) === 0);

        if (first) {
          this.setState({autoComplete: first});
        } else {
          this.setState({autoComplete: ''});
        }
      }
    }
  }

  onKeyPress (e) {
    if (e.key === 'Enter' &&
      this.state.autoComplete) {

      if (this.props.onChangeFunction) {
        this.props.onChangeFunction({[this.props.id]: this.state.autoComplete});
      }
    }
  }

  render () {
    const type = this.props.type || 'text';
    const label = this.props.label || $(this.props.id);
    const value = this.props.value || '';
    const readOnly = this.props.readOnly || false;
    const errors = Errors.join(this.props.errors);
    let input;
    let autoComplete;

    if (this.props.type === 'checkbox') {
      input = <input type={type} id={this.props.id}
        defaultChecked={value ? true : false}
        onChange={(e) => this.onChange(e)} />
    } else {
      input = <input type={type} id={this.props.id}
        value={value}
        readOnly={this.props.readOnly}
        onChange={(e) => this.onChange(e)}
        onKeyPress={(e) => this.onKeyPress(e)} />;
    
      if (this.props.autoCompleteList) {
        autoComplete = <span className="autocomplete">{this.state.autoComplete}</span>
      }
    }

    return (
      <div>
        <label htmlFor={this.props.id}>{label}: </label>
        <div className="input-container">
          {autoComplete}
          {input}
        </div>
        <div className="general-error">{errors}</div>
      </div>
    )
  }
}

export default Input;