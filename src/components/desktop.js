import React, { Component } from "react";
import Cell from './cell'

export default class Desktop extends Component {
  state = {
    boxes :[]
  }

  componentDidMount(){
    const boxes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    boxes.sort(()=> Math.random()-0.5);
    boxes.push(0);
    this.setState({boxes : boxes});
    console.log(boxes)
  }  

  createRow = (start, end)=>{
    const values = this.state.boxes.slice(start,end);
    return this.createCell(values);
  }

  createCell = (values) =>{
    return values.map((value) => {
        return (<Cell key={value} value={value} clickCell={this.clickCell} />);
    });
  }

  clickCell = (value)=>{
    const indexEl = this.state.boxes.indexOf(value);
    const next = this.state.boxes[indexEl+1];
    const prev = this.state.boxes[indexEl-1];

    console.log(next)
    console.log(prev)
  }

  render() {
    return (
      <div>
        <table id="desktop">
          <tbody>
            <tr className="row">
              {this.createRow(0,4)}
            </tr>
            <tr className="row">
              {this.createRow(4,8)}
            </tr>
            <tr className="row">
              {this.createRow(8,12)}
            </tr>
            <tr className="row">
              {this.createRow(12,15)}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
