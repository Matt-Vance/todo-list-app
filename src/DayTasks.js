import React, { Component } from 'react';
import './Header.css';
import Task from './task.js';

class DayTasks extends Component {
  constructor(props) {
  	super(props);

    this.state = {
      taskComplete: [],
      taskSum: 0,
      newTask: "Hit Enter",
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.deleteMode = this.deleteMode.bind(this);
  }


componentDidMount() {
  let taskComplete = [];
  for (let i in this.props.tasks) {
    taskComplete.push(0);
  }
  this.setState({taskComplete: taskComplete});
}

toggleTask(index) {
  let taskComplete = this.state.taskComplete;
  if (taskComplete[index] === 1){
    taskComplete[index] = 0;
  } else {
    taskComplete[index] = 1;
  }
  let taskSum = taskComplete.reduce(function(num, sum){
    return num + sum;
  });
  console.log('Task Sum: ' + taskSum)
  this.setState({taskComplete: taskComplete, taskSum: taskSum});
}

handleAddClick() {
  console.log('add clicked')
}

handleChange(event) {
  this.setState({newTask: event.target.value}, function() {
    console.log(this.state.newTask)
  })
}

deleteMode() {
  this.props.deleteModeFunc();
}

deleteTask(index) {
  if (this.props.time === 'Day'){
    let time = 'daily'
    this.props.deleteFunc(index, time);
    let taskComplete = this.state.taskComplete;
    taskComplete.pop();
    this.setState({taskComplete: taskComplete});
  } 

  else if (this.props.time === 'Week'){
    let time = 'weekly'
    this.props.deleteFunc(index, time);
  }

  else {
    let time = 'monthly'
    this.props.deleteFunc(index, time);    
  }
}

  render() {
    return (
      <div className="content-time" id={this.props.time}>
        <div className="content-header">
          <div className = "filler">
          </div>
          <h1>{this.props.time}</h1>
          <div className="content-stats" id="stats-day">
            <h2>{this.state.taskSum}/{this.state.taskComplete.length}</h2>
          </div>
        </div>
        <p id = 'p-day0'></p>
        {this.props.tasks.map((task, i) => {
          return (
          <Task 
            index = {i}
            task = {task}
            active = {this.state.taskComplete[i]}
            toggleTaskFunc = {this.toggleTask}
            deleteFunc = {this.deleteTask}
            deleteMode = {this.props.deleteMode}
          />
          )
        })}
        <input className="add-button" id = "add-day" type="button" value="add" onClick = {this.handleAddClick}></input>
        <input className="remove-button" id = "delete-day" type="button" value="delete" onClick = {this.deleteMode}></input>

      </div>
    );
  }
}

export default DayTasks;
