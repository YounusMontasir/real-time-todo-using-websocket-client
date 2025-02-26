import { useContext, useRef } from "react";
import { axiosInstance } from "../Api/axiosInstance";
import { AuthContext } from './../Provider/AuthProvider';

const AddTask = ({ socket }) => {
    const taskTitleRef = useRef(null);
    const taskDescriptionRef = useRef(null);
    const {user} = useContext(AuthContext)
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
        <form className="form__input" onSubmit={handleAddTodo}>
            <label htmlFor="taskTitle">Task Title</label>
            <input type="text" id="taskTitle" className="input" ref={taskTitleRef} required />

            <label htmlFor="taskDescription">Task Description</label>
            <input type="text" id="taskDescription" className="input" ref={taskDescriptionRef} required />

            <button type="submit" className="addTodoBtn">ADD TODO</button>
        </form>
    );
};

export default AddTask;
