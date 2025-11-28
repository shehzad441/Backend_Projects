import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import TodoItem from "../TodoItem";

export default function TodoPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch todos on load
  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await API.post("/todos", { title });
      setTodos([res.data, ...todos]);
      setTitle("");
      fetchTodos(); // Refresh to get all todos
    } catch (err) {
      console.error(err);
    }
  };

  // Update todo
  const updateTodo = async (id, updates) => {
    try {
      await API.put(`/todos/${id}`, updates);
      fetchTodos(); // Refresh the list
    } catch (err) {
      console.error(err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      fetchTodos(); // Refresh the list
    } catch (err) {
      console.error(err);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center">
      <div className="w-full max-w-lg bg-white p-6 rounded shadow">
        <div className="flex-1 justify-center items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Todos</h2>
          <button
            onClick={logout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        <form onSubmit={addTodo} className="flex item-center justify-center mb-4">
          <input
            type="text"
            placeholder="Add a new todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-2 border rounded-l outline-none"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r">
            Add
          </button>
        </form>

        {/* todo list */}
        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
