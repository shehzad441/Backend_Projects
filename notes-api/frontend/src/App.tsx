import { useEffect, useState } from "react";
import { getNotes, createNote, deleteNote, updateNote } from "./api";
import NoteItem from "./components/NoteItem";

function App() {
  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function loadNotes() {
    const data = await getNotes();
    setNotes(data);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function handleAddNote() {
    if (!title || !content) return;

    await createNote(title, content);
    setTitle("");
    setContent("");
    loadNotes();
  }

  async function handleDelete(id: number) {
    await deleteNote(id);
    loadNotes();
  }

  async function handleUpdate(id: number, title: string, content: string) {
    await updateNote(id, title, content);
    loadNotes();
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>Notes App</h1>

      <input
        style={{ width: "100%", padding: "10px", margin: "5px 0" }}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        style={{ width: "100%", padding: "10px", margin: "5px 0" }}
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={handleAddNote}
        style={{ width: "100%", padding: "12px" }}
      >
        Add Note
      </button>

      <div style={{ marginTop: "30px" }}>
        {notes.map((n) => (
          <NoteItem
            key={n.id}
            id={n.id}
            title={n.title}
            content={n.content}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
