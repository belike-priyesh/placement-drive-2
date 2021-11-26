import { Tabs } from "../../constants";
import { NavLink } from "react-router-dom";
import "./header.css";
import RoundedButton from "../roundedButton";
export const Header = ({ onClick }) => {
  return (
    <div className="Header">
      <span>
        {Tabs.map((item) =>
          item.link ? (
            <NavLink
              onClick={() => onClick?.(item)}
              key={item.title}
              className={({ isActive }) =>
                isActive ? "NavLink ActiveTab" : "NavLink"
              }
              to={item.link}
            >
              {item.title}
            </NavLink>
          ) : (
            <RoundedButton
              onPress={() => {
                onClick?.(item);
              }}
              text={item.title}
              className="NavLink"
            />
          )
        )}
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
        <h2 style={{ textAlign: "center", flex: 1 }}>Placement Drive</h2>
      </div>
    </div>
  );
};

export default Header;
