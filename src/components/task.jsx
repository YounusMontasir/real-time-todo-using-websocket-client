import React from 'react'
import Nav from './Nav'
import io from "socket.io-client"
import AddTask from './addTask';
import Taskcontainer from './taskcontainer';

const socket = io('http://localhost:5000');

const Task = () => {


  return (
    <div>
        <Nav/>
        <AddTask socket={socket} />
        <Taskcontainer socket={socket} /> 
    </div>
  )
}

export default Task