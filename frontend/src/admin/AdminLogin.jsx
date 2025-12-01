import { useState } from "react";
import "./Admin.css";


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("Please wait...");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message || "Login failed");
        return;
      }

      // Save token to localStorage
      localStorage.setItem("admintoken", data.token);
      setMsg("Login successful 🎉 Redirecting...");

      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1200);
    } catch (error) {
      setMsg("Server error");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {msg && <p className="msg">{msg}</p>}
    </div>
  );
};

export default AdminLogin;
