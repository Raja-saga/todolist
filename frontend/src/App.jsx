import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5000/api/notes");
    setNotes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    const res = await axios.post("http://localhost:5000/api/notes", form);
    setNotes([...notes, res.data]);
    setForm({ title: "", content: "" });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    setNotes(notes.filter(note => note._id !== id));
  };

  return (
    <div style={styles.container}>
      
      <h1 style={styles.title}> Note Keeper</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={styles.input}
        />
        <textarea
          placeholder="Write note content..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          style={styles.textarea}
          rows={4}
        />
        <button type="submit" style={styles.addButton}>➕ Add</button>
      </form>

      <div style={styles.noteList}>
        {notes.map((note) => (
          <div key={note._id} style={styles.noteCard}>
            <h4 style={styles.noteTitle}>{note.title}</h4>
            <div style={styles.noteContent}>{note.content}</div>
            <button onClick={() => handleDelete(note._id)} style={styles.deleteBtn}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
const styles = {
  container: {
    fontFamily: "Segoe UI, sans-serif",
    padding: "0", // remove padding
    margin: "0",
    background: "linear-gradient(to right, #ffecd2, #fcb69f)",
    minHeight: "100vh",
    width: "100vw", // full viewport width
    boxSizing: "border-box",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "2.5rem",
    fontSize: "2.5rem",
    maxWidth: "700px",
    margin: "2rem auto 1rem auto"
  },  
  
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
   // margin: "0 auto 2rem auto",
   // width: "calc(30% - 2rem)",
   gap: "1.5rem",
   margin: "1rem",
    width: "30%",
    maxWidth: "800px",
    padding: "1rem",
    backgroundColor: "#ffffffcc",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
  },
  
  input: {
    width: "30%",
    padding: "0.6rem",
    borderRadius: "6px",
    border: "1px solid #aaa",
    
  },
  textarea: {
    width: "30%",
    padding: "0.6rem",
    borderRadius: "6px",
    border: "1px solid #aaa",
    fontFamily: "inherit",
    resize: "vertical",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "0.6rem 1.2rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    alignSelf: "flex-end"
  },
  
  noteList: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    margin: "1rem",
    width: "calc(30% - 2rem)",
  },
  noteCard: {
    backgroundColor: "#fff",
    width: "100%",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    wordBreak: "break-word",
  },
  noteTitle: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "1.4rem",
    color: "#333"
  },
  noteContent: {
    whiteSpace: "pre-wrap",
    fontSize: "1.1rem",
    color: "#444",
  },
  deleteBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer"
  }
};


export default App;
