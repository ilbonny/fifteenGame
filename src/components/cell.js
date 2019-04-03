import React, { Component }  from 'react'

export default class Cell extends Component {
  
  clickCell = ()=>{
    this.props.clickCell(this.props.value);
  }

  render() {
    const value = this.props.value
    return value === 0 ? (<th/>) :(<th className="cell" onClick={this.clickCell} >{value}</th>)      
    
  }
}