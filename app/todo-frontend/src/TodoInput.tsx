import type { FormEvent } from "react";
import { useState } from "react";

interface TodoInputProps {
  onAdd: (title: string) => Promise<void> | void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [title, setTitle] = useState<string>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-5 py-3 rounded-xl bg-white border-2 border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:border-slate-300"
      />

      <button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg active:scale-95 duration-150"
      >
        Add
      </button>
    </form>
  );
}
