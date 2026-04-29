import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">✨ MailNest</h2>

      <nav>
        <NavLink to="/" end>📇 Contacts</NavLink>
        <NavLink to="/templates">🧾 Templates</NavLink>
        <NavLink to="/campaigns">📤 Campaigns</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;