import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios'; // Import axios
import Swal from 'sweetalert2';

const UpdateTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [updateTask, setUpdateTask] = useState([]);

    // Fetch task details
    useEffect(() => {
        fetch(`https://real-time-todo-using-websocket-server.onrender.com/tasks/${id}`)
            .then(res => res.json())
            .then(data => setUpdateTask(data))
            .catch(error => console.error("Error fetching task:", error));
    }, [id]);



    // Handle form submission
    const handleEditTodo = async (e) => {
        e.preventDefault();
        const taskTitle = e.target.taskTitle.value;
        const taskDescription = e.target.taskDescription.value;
        console.log(taskTitle, taskDescription);
        
        const updatedTask = {
           taskTitle,
           taskDescription,
        };

    
            axios.patch(`https://real-time-todo-using-websocket-server.onrender.com/tasks/${id}`, updatedTask);
           Swal.fire({
                   position: "center",
                   icon: "success",
                   title: "Successfully Updated",
                   showConfirmButton: false,
                   timer: 1500,
                 });
            navigate('/task'); // Redirect to tasks page
        
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full mx-auto max-w-lg">
            <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Update Task</h1>
            <form className="space-y-4" onSubmit={handleEditTodo}>
                <div>
                    <label htmlFor="taskTitle" className="block text-gray-600 font-medium">Task Title</label>
                    <input
                        type="text"
                        id="taskTitle"
                        name="taskTitle"
                        defaultValue={updateTask.taskTitle}
                       
                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="taskDescription" className="block text-gray-600 font-medium">Task Description</label>
                    <input
                        type="text"
                        id="taskDescription"
                        name="taskDescription"
                        defaultValue={updateTask.taskDescription}
                    
                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-[#6C7D47] text-white py-2 rounded-lg shadow hover:bg-blue-700">
                    Update Task
                </button>
            </form>
        </div>
    );
};

export default UpdateTask;
