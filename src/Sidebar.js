import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SidebarItem({ item, onItemClick, onToggle, isSubMenu }) {
  const navigate = useNavigate();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const handleItemClick = () => {
    onItemClick(item.id);
    navigate(`/item/${item.id}`);
  };

  const handleToggle = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="sidebar-item">
      <button className={isSubMenu ? "subItem" : "sidebar-btn"} onClick={handleItemClick}>
        {item.title}
      </button>
      <button onClick={handleToggle}>
        {subMenuOpen ? "▲" : "▼"}
      </button>
      {subMenuOpen && item.items && item.items.length > 0 && (
        <div className="sub-menu">
          {item.items.map((subItem) => (
            <SidebarItem
              key={subItem.id}
              item={subItem}
              onItemClick={onItemClick}
              onToggle={onToggle}
              isSubMenu={true} // Установка флага для вложенных sub-menu
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Sidebar({ data, onItemClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [openItems, setOpenItems] = useState([]);

  const handleToggle = (itemId) => {
    if (openItems.includes(itemId)) {
      setOpenItems(openItems.filter((id) => id !== itemId));
    } else {
      setOpenItems([...openItems, itemId]);
    }
  };

  const handleItemClick = (item) => {
    onItemClick(item);
    // Пример перехода на другую страницу при клике на элемент сайдбара
    navigate(`/your-path-here/${item.id}`);
  };

  return (
    <div className="sidebar-container">
      {data.map((item) => (
        <SidebarItem
          key={item.id}
          item={item}
          onItemClick={handleItemClick}
          isOpen={openItems.includes(item.id)}
          onToggle={handleToggle}
          // Пример активации элемента в зависимости от текущего пути
          isActive={location.pathname.includes(`/your-path-here/${item.id}`)}
        />
      ))}
    </div>
  );
}

export default Sidebar;