import { useContext, useRef } from "react";
import { axiosInstance } from "../Api/axiosInstance";
import { AuthContext } from './../Provider/AuthProvider';

const AddTask = ({ socket }) => {
    const taskTitleRef = useRef(null);
    const taskDescriptionRef = useRef(null);
    const {user} = useContext(AuthContext);
    console.log(user?.email);
    
    const handleAddTodo = async (e) => {
        e.preventDefault();
        const taskTitle = taskTitleRef.current.value;
        const taskDescription = taskDescriptionRef.current.value;

        const todo = { taskTitle, taskDescription, category: "pending", todoDate: new Date().toISOString().split("T")[0], order: 0, userEmail: user?.email };

        const sendTodo = await axiosInstance.post('/tasks', todo);
        console.log(sendTodo);

        socket.emit("createTask", { taskTitle, taskDescription });

        taskTitleRef.current.value = "";
        taskDescriptionRef.current.value = "";
    };

    return (
       
            <div className="bg-white shadow-lg rounded-lg p-8  w-full mx-auto mt-16">
                <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Add a New Task</h1>
                <form className="space-y-4" onSubmit={handleAddTodo}>
                    <div className="grid grid-cols-2 gap-2 ">
                    <div>
                        <label htmlFor="taskTitle" className="block text-gray-600 font-medium">Task Title</label>
                        <input type="text" id="taskTitle" className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300" ref={taskTitleRef} required />
                    </div>
                    <div>
                        <label htmlFor="taskDescription" className="block text-gray-600 font-medium">Task Description</label>
                        <input type="text" id="taskDescription" className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300" ref={taskDescriptionRef} required />
                    </div>
                    </div>
                    <button type="submit" className="w-full bg-[#6C7D47] text-white py-2 rounded-lg shadow hover:bg-blue-700">ADD TODO</button>
                </form>
            </div>
    );
};

export default AddTask;
