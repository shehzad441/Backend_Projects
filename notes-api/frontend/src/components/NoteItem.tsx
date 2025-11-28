import { useState } from "react";

type Props = {
  id: number;
  title: string;
  content: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string, content: string) => void;
};

export default function NoteItem({
  id,
  title,
  content,
  onDelete,
  onUpdate,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        marginBottom: "10px",
        borderRadius: "8px",
      }}
    >
      {isEditing ? (
        <>
          <input
            style={{ width: "100%", padding: "8px" }}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <textarea
            style={{ width: "100%", padding: "8px", marginTop: "10px" }}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />

          <button
            onClick={() => {
              onUpdate(id, newTitle, newContent);
              setIsEditing(false);
            }}
            style={{ marginTop: "10px", marginRight: "10px" }}
          >
            Save
          </button>

          <button
            onClick={() => setIsEditing(false)}
            style={{ marginTop: "10px" }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2>{title}</h2>
          <p>{content}</p>

          <button
            onClick={() => setIsEditing(true)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </button>

          <button onClick={() => onDelete(id)}>Delete</button>
        </>
      )}
    </div>
  );
}
