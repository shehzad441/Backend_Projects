import { useState } from "react";
import type { Todo, TodoUpdate } from "./types/todo";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, updates: TodoUpdate) => Promise<void> | void;
  onDelete: (id: number) => Promise<void> | void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const isCompleted = todo.completed === 1 || todo.completed === true;


  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, { title: editTitle });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-white p-5 rounded-xl shadow-sm border-2 border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 group">
      <div className="flex items-center gap-4 flex-1">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() =>
            onUpdate(todo.id, {
              completed: isCompleted ? 0 : 1,
            })
          }
          className="w-6 h-6 rounded-lg text-blue-600 cursor-pointer accent-blue-600 transition-all"
        />

        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave()
              if (e.key === "Escape") handleCancel()
            }}
            autoFocus
            className="flex-1 px-4 py-2 border-2 border-blue-400 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
          />
        ) : (
          <span
            className={`flex-1 cursor-pointer select-none transition-all py-1 px-2 rounded-lg ${
              isCompleted ? "line-through text-slate-400" : "text-slate-900 font-medium hover:bg-slate-50"
            }`}
            onDoubleClick={() => setIsEditing(true)}
            title="Double-click to edit"
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-100 hover:bg-blue-200 transition-colors text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 duration-150"
            title="Edit task"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-100 hover:bg-red-200 transition-colors text-red-700 px-4 py-2 rounded-lg text-sm font-semibold"
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
