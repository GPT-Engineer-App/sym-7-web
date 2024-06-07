import { useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: task }]);
      setTask("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setTask(task.text);
  };

  const handleUpdateTask = () => {
    setTasks(tasks.map((t) => (t.id === currentTask.id ? { ...t, text: task } : t)));
    setTask("");
    setIsEditing(false);
    setCurrentTask({});
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-4">Task Manager</h1>
      <div className="w-full max-w-md">
        <div className="flex mb-4">
          <input type="text" className="flex-grow p-2 border border-gray-300 rounded-l" value={task} onChange={(e) => setTask(e.target.value)} />
          <button className={`p-2 ${isEditing ? "bg-yellow-500" : "bg-blue-500"} text-white rounded-r`} onClick={isEditing ? handleUpdateTask : handleAddTask}>
            {isEditing ? <FaEdit /> : <FaPlus />}
          </button>
        </div>
        <ul className="bg-white shadow rounded-lg">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center p-2 border-b border-gray-200">
              <span>{task.text}</span>
              <div className="flex space-x-2">
                <button className="text-yellow-500" onClick={() => handleEditTask(task)}>
                  <FaEdit />
                </button>
                <button className="text-red-500" onClick={() => handleDeleteTask(task.id)}>
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;
