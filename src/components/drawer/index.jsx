import React, {
  forwardRef,
  useState,
  useCallback,
  useImperativeHandle,
} from "react";
import "./drawer.css";
import MaterialDrawer from "@material-ui/core/Drawer";
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import { Tabs } from "../../constants";
import { useAuth } from "../../screens/auth/context";
import { getAuth } from "@firebase/auth";
const styles = {
  paper: {},
};
const ListItem = ({ title = "" }) => (
  <span
    style={{
      flex: 1,
      paddingTop: 13,
      paddingBottom: 10,
      paddingLeft: 8,
      fontWeight: "700",
      paddingRight: 8,
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    {title}
  </span>
);
const Drawer = forwardRef((props, ref) => {
  const [visibility, setVisibility] = useState(false);
  const { isLoggedIn } = useAuth();
  const toggleDrawer = useCallback(() => {
    setVisibility((prev) => !prev);
  }, []);

  useImperativeHandle(ref, () => ({
    toggleDrawer: toggleDrawer,
  }));

  let anchor = "left";

  return (
    <React.Fragment key={anchor}>
      <MaterialDrawer
        classes={{ paper: props.classes.paper }}
        anchor={anchor}
        open={visibility}
        onClose={toggleDrawer}
      >
        <div
          role="presentation"
          style={{ width: 250 }}
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            {Tabs.map(({ title, link }) => {
              if (link) {
                return (
                  <NavLink
                    key={title}
                    className={({ isActive }) => {
                      return isActive && link
                        ? "drawer-nav-link-cont drawer-nav-active"
                        : `drawer-nav-link-cont`;
                    }}
                    to={link}
                  >
                    <ListItem title={title} />
                  </NavLink>
                );
              } else {
                const newTitle =
                  isLoggedIn && title === "Sign-In" ? "Logout" : title;
                return (
                  <span
                    key={title}
                    className="drawer-nav-link-cont"
                    onClick={() => {
                      if (isLoggedIn) {
                        getAuth().signOut();
                      } else {
                        props.onClick?.("sign-in");
                      }
                    }}
                  >
                    <ListItem title={newTitle} />
                  </span>
                );
              }
            })}
          </List>
        </div>
      </MaterialDrawer>
    </React.Fragment>
  );
  //   return (
  //     <div className={`drawer-container ${drawerContStateCSS}`}>
  //       <div className={`drawer ${drawerStateCSS}`}>
  //         <h1 onClick={toggleDrawer}>X</h1>
  //         <h1>{"Priyesh"}</h1>
  //       </div>
  //       <div className="remaining" onClick={toggleDrawer} />
  //     </div>
  //   );
});

export default withStyles(styles)(Drawer);
