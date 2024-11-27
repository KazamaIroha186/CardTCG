import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div>
        <aside className="sidebar">
        <h2 className="sidebar-title">Menu</h2>
        <ul className="sidebar-links">
            <li>
            <a href="/mycollections" className="sidebar-link">My Collection</a>
            </li>
            <li>
            <a href="/decks" className="sidebar-link">Deck Builder</a>
            </li>
        </ul>
        </aside>
    </div>
    
  );
};

export default Sidebar;
