const API_URL = "http://localhost:3000/notes";

export async function getNotes() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createNote(title: string, content: string) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
}

export async function updateNote(id: number, title: string, content: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
}

export async function deleteNote(id: number) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
}
