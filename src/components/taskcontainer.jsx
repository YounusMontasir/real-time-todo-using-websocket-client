import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AuthContext } from "../Provider/AuthProvider";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const TaskContainer = ({ socket }) => {
  const [tasks, setTasks] = useState({
    pending: { title: "Pending", items: [] },
    ongoing: { title: "Ongoing", items: [] },
    completed: { title: "Completed", items: [] },
  });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) return; // Don't fetch if user is not ready
  
    function fetchTasks() {
      fetch(`http://localhost:5000/tasks?userEmail=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const formattedTasks = {
            pending: { title: "Pending", items: [] },
            ongoing: { title: "Ongoing", items: [] },
            completed: { title: "Completed", items: [] },
          };
          data.forEach((task) => {
            if (formattedTasks[task.category]) {
              formattedTasks[task.category].items.push(task);
            }
          });
          setTasks(formattedTasks);
        })
        .catch((error) => console.error("Error fetching tasks:", error));
    }
  
    fetchTasks();
  }, [user?.email]); // Re-run when `user.email` is set

  useEffect(() => {
    socket.on("tasks", (data) => {
      // Only update tasks for the logged-in user
      if (!user?.email) return;
  
      const userTasks = data.filter(task => task.userEmail === user.email);
  
      const formattedTasks = {
        pending: { title: "Pending", items: [] },
        ongoing: { title: "Ongoing", items: [] },
        completed: { title: "Completed", items: [] },
      };
  
      userTasks.forEach((task) => {
        if (formattedTasks[task.category]) {
          formattedTasks[task.category].items.push(task);
        }
      });
  
      setTasks(formattedTasks);
    });
  }, [socket, user?.email]);
  
// my code
  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;
  
    // Clone tasks state
    const newTasks = { ...tasks };
    const sourceItems = [...newTasks[source.droppableId].items];
    const destinationItems = [...newTasks[destination.droppableId].items];
  
    // Remove dragged item from source
    const [movedTask] = sourceItems.splice(source.index, 1);
    movedTask.category = destination.droppableId; // Update category locally
  
    // Add dragged item to destination
    destinationItems.splice(destination.index, 0, movedTask);
  
    // Update state
    newTasks[source.droppableId].items = sourceItems;
    newTasks[destination.droppableId].items = destinationItems;
    setTasks(newTasks);
  
    // Emit event with taskId
    socket.emit("taskDragged", {
      taskId: movedTask._id, // Send task ID
      source,
      destination,
    });
  };

const handleDelete = (id) =>{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:5000/tasks/${id}`,{
        method: 'DELETE'
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.deletedCount>0){
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          // const exist = tasks.filter(query=> query._id !== id)
          // setTasks(exist)
        }
      })
    }
  });
}
  return (
    <div className="container">
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(tasks).map(([key, task]) => (
          <div className={`${key}__wrapper`} key={key}>
            <h3>{task.title} Tasks</h3>
            <div className={`${key}__container`}>
              <Droppable droppableId={key}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {task.items.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${key}__items`}
                          >
                            <p>{item.taskTitle}</p>
                            <p>{item.taskDescription}</p>
                            {item.todoDate && <p>Due: {item.todoDate}</p>}
                            <div>
                              <div>
                                <button onClick={()=> handleDelete(item._id)}><Trash2 /></button>
                              </div>
                              <div>
                              <p className="comment">
                              <Link to={`/comments/${key}/${item._id}`}>
                               Update
                              </Link>
                            </p>
                              </div>
                            </div>
                           
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default TaskContainer;
