import React, { useEffect, useState } from 'react';

const TodoList = () => {
  const TASKS_STORAGE_KEY = 'tasks';
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editTask, setEditTask] = useState('');
  const [isStorageHydrated, setIsStorageHydrated] = useState(false);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskItem = {
        task: newTask,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const storedTasks = window.localStorage.getItem(TASKS_STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Unable to load tasks from localStorage', error);
    } finally {
      setIsStorageHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isStorageHydrated || typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Unable to save tasks to localStorage', error);
    }
  }, [tasks, isStorageHydrated]);

  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditTask(tasks[index].task);
  };

  const handleUpdateTask = () => {
    if (editTask.trim() !== '') {
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex
          ? { ...task, task: editTask }
          : task
      );
      setTasks(updatedTasks);
      setEditingIndex(-1);
      setEditTask('');
    }
  };

  const formatCreatedAt = (date) => {
    const createdDate = new Date(date);
    const timePart = createdDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const day = String(createdDate.getDate()).padStart(2, '0');
    const month = createdDate.toLocaleString('default', { month: 'short' });
    const year = createdDate.getFullYear();
    return `${timePart} ${day}:${month}:${year}`;
  };


  return (
    <>
      <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow-lg">

        <h1 className="text-2xl mb-4 text-center">Todo List</h1>

        <div className="flex">

          <input
            type="text"
            value={newTask}
            onChange={handleInputChange}
            placeholder="Enter new task..."
            className="flex-grow px-2 py-1 border border-blue-700  focus:outline-blue-700 rounded mr-2"
          />

          <button
            onClick={handleAddTask}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>

        </div>

      </div>


      {/* Tasks Field */}

      <div className="max-w-2xl mx-auto mt-10 p-2 border rounded shadow-lg  border-blue-700">

        <tbody>

          <thead>
            <th className='text-lg pl-20'>Tasks</th>
            <th className='pl-52  text-lg'>Created At</th>
            <th className='pl-28 text-lg'>Action</th>
          </thead>

        </tbody>

        <hr className=' border w-full mt-3' />

        {/* unordered list */}
        <ul className="mt-2">

          {tasks.map((task, index) => (

            <li key={index} className="flex items-center  border-b py-2 bullet-list-item list-items">

             {editingIndex === index ? (
                <>

                  <textarea name="text" id="" cols="1" rows="1"  
                  value={editTask} 
                  onChange={(e) => setEditTask(e.target.value)}
                   className="flex-grow px-2 py-1 border rounded mr-2
                   border-blue-500 focus:outline-blue-600"
                  >
                  </textarea>

                </>
              ) : (
                <>
                  <div className="overflow-hidden overflow-ellipsis w-72 pl-3 flex">{task.task}</div>
                  <div className='pl-10'>{formatCreatedAt(task.createdAt)}</div>
                </>
              )}

              <div className='ml-24'>

                {/* Save Button */}
                {editingIndex === index ? (

                  <button
                    onClick={handleUpdateTask}
                    className="bg-green-600 text-white px-2 py-1 rounded mr-3"
                  >
                    Save
                  </button>

                ) : (

                  // Edit Button
                  <button
                    onClick={() => handleEditTask(index)}
                    className="bg-yellow-600 text-white px-2 py-1 rounded mr-3"
                  >
                    Edit
                  </button>

                )}

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveTask(index)}
                  className="bg-red-600 text-white px-2 py-1 rounded mr-2"
                >
                  Remove
                </button>

              </div>

            </li>
          ))}

        </ul>

      </div>

    </>
  );
};

export default TodoList;