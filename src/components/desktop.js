import React, { Component } from "react";
import Cell from "./cell";

export default class Desktop extends Component {
  state = {
    boxes: [],
    handsPlayed : 0
  };

  componentDidMount() {
    const boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    boxes.sort(() => Math.random() - 0.5);
    boxes.push(0);
    this.setState({ boxes: boxes });
    console.log(boxes);
  }

  createRow = (start, end) => {
    const values = this.state.boxes.slice(start, end);
    return this.createCell(values);
  };

  createCell = values => {
    return values.map(value => {
      return <Cell key={value} value={value} clickCell={this.clickCell} />;
    });
  };

  clickCell = value => {
    
    const first = this.state.boxes.slice(0, 4);
    const second = this.state.boxes.slice(4, 8);
    const third = this.state.boxes.slice(8, 12);
    const fourth = this.state.boxes.slice(12, 16);

    this.move(first, value, [], second);
    this.move(second, value, first, third);
    this.move(third, value, second, fourth);
    this.move(fourth, value, third, []);

    var count = this.state.handsPlayed +1;
    this.setState({ handsPlayed: count });
    console.log(this.state.boxes);
  };

  move = (row, value, rowUp, rowDown) => {
    const index = row.indexOf(value);
    if (index === -1 || value === 0) return;

    const marginValue = this.marginCell(row, index);
    if (marginValue !== -1) 
      if (this.moveAndReorder(value, marginValue)) return;            

    const next = row[index + 1];
    if (this.moveAndReorder(value, next)) return;    

    const prev = row[index - 1];
    if (this.moveAndReorder(value, prev)) return;  

    this.moveUpAndDown(index, value, rowUp, rowDown);
  };

  moveAndReorder = (from, to) =>{
    if (this.canMove(to)) {
      this.reorderBoxes(from, to);
      return true;
    }
    return false;
  }

  moveUpAndDown = (index, value, rowUp, rowDown) =>{
      if(rowUp.length !== 0){
        var valueUp = rowUp[index];
        if (this.moveAndReorder(value, valueUp)) return;  
      }
      if(rowDown.length !== 0){
        var valueDown = rowDown[index];
        if (this.moveAndReorder(value, valueDown)) return;  
      }
  }

  marginCell = (row, index) => {
    if (index === 0) return row[index + 1];
    if (index === 4) return row[index - 1];
    return -1;
  };

  canMove = value => {
    return value === 0;
  };

  reorderBoxes = (from, to) => {
    const boxes = this.state.boxes;
    this.swap(
      boxes,
      this.state.boxes.indexOf(from),
      this.state.boxes.indexOf(to)
    );
    this.setState({ boxes: boxes });
  };

  swap = (input, index_A, index_B) => {
    var temp = input[index_A];
    input[index_A] = input[index_B];
    input[index_B] = temp;
  };
  

  render() {
    return (
      <div>
        <div id="title">Fifteen Game</div>
        <div id="handPlayed">Hand Game : {this.state.handsPlayed}</div>
        <table id="desktop">
          <tbody>
            <tr className="row">{this.createRow(0, 4)}</tr>
            <tr className="row">{this.createRow(4, 8)}</tr>
            <tr className="row">{this.createRow(8, 12)}</tr>
            <tr className="row">{this.createRow(12, 16)}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}
