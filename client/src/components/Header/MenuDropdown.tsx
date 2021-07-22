import React from "react";
import "./Header.scss";

interface MenuDropdownProps {
  handleLogout: () => void;
}

const MenuDropdown: React.ForwardRefRenderFunction<HTMLDivElement, MenuDropdownProps> = ({ handleLogout }, ref) => {
  return (
    <div className="menuDropdown" ref={ref}>
      <a href="/dashboard" className="menuDropdown__button">
        Dashboard
      </a>
      <a href="/settings" className="menuDropdown__button">
        Settings
      </a>
      <button className="menuDropdown__button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default React.forwardRef(MenuDropdown);
