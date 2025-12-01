import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Admin.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admintoken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <Link to="/admin/messages">📩 Messages</Link>
        <Link to="/admin/projects">📁 Projects</Link>
        <a onClick={logout} style={{ cursor: "pointer" }}>
          🚪 Logout
        </a>
      </aside>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
