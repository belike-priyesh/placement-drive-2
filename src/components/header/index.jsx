import { Tabs } from "../../constants";
import { NavLink } from "react-router-dom";
import "./header.css";
import RoundedButton from "../roundedButton";
import { Menu, MenuItem } from "@material-ui/core";
// import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

import { useAuth } from "../../screens/auth/context";
import { getAuth } from "@firebase/auth";
export const Header = ({ onClick }) => {
  const { isLoggedIn, currentUser } = useAuth();
  console.log({ isLoggedIn });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    getAuth().signOut();
  };
  return (
    <div className="Header">
      <span>
        {Tabs.map((item) => {
          let { link, title } = item;
          if (isLoggedIn && title === "Sign-In") {
            title = `Hello, ${currentUser?.displayName ?? ""} `;
            link = null;
          }
          return link ? (
            <NavLink
              onClick={() => onClick?.({ item, title })}
              key={title}
              className={({ isActive }) =>
                isActive ? "NavLink ActiveTab" : "NavLink"
              }
              to={link}
            >
              {title}
            </NavLink>
          ) : (
            <>
              <RoundedButton
                key={title}
                onPress={(event) => {
                  console.log(">>>>>");
                  if (isLoggedIn) {
                    handleClick(event);
                  }
                  onClick?.({ title, link });
                }}
                text={title}
                className="NavLink"
                id="button"
              />
              <Menu
                style={{ top: 40, left: 50 }}
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </>
          );
        })}
      </span>
      <div id="ham-icon">
        <span
          id="hamburger"
          onClick={() => {
            onClick?.({
              title: "drawer",
            });
          }}
        >
          &#8801;
        </span>
        <h2 style={{ textAlign: "center", flex: 0.7 }}>
          Placement Drive
        </h2>
        {!!isLoggedIn && (
          <h4 style={{ flex: 0.2 }}>
            {currentUser.displayName}
          </h4>
        )}
      </div>
    </div>
  );
};

export default Header;
