import React, { Component }  from 'react'

export default class Cell extends Component {
  
  clickCell = ()=>{
    this.props.clickCell(this.props.value);
  }

  render() {
    return (
      <th className="cell" onClick={this.clickCell} >{this.props.value}</th>      
    )
  }
}