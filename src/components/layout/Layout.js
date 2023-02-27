import { Fragment } from "react";
import MainNavigtion from "./MainNavigation";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigtion />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
