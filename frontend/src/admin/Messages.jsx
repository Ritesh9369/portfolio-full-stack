import { useEffect, useState } from "react";
import "./Admin.css";


const Messages = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const token = localStorage.getItem("admintoken");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h2>📩 Contact Messages</h2>
      {messages.length === 0 ? (
        <p>No messages found!</p>
      ) : (
        messages.map((m) => (
          <div key={m._id} className="msg-card">
            <h4>
              {m.name} ({m.email})
            </h4>
            <p>{m.message}</p>
            <small>{new Date(m.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
