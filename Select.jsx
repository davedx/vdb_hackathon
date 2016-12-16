import React from 'react';
import {$} from '../lang';

class Select extends React.Component {
  constructor (props) {
    super(props);
  }

  onChange (e) {
    if (this.props.onChangeFunction) {
      this.props.onChangeFunction({[this.props.id]: e.target.value});
    }
  }

  render () {
    const label = this.props.label || $(this.props.id);
    return (
      <div>
        <label htmlFor={this.props.id}>{label}: </label>
        <select id={this.props.id} onChange={(e) => this.onChange(e)} value={this.props.value}>
          {this.props.options.map((option) => {
            return <option key={option.value} value={option.value}>{option.label}</option>
          })}
        </select>
      </div>
    )
  }
}

export default Select;