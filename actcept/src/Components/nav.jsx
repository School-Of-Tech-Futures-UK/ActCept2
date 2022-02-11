// import * as React from "https://cdn.skypack.dev/react@17.0.1";
// import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import { NavLink, useLocation } from "react-router-dom";

const NavigationBar = () => {
  // For illustration
  const { pathname } = useLocation();

  return (
    <>
      <label>{pathname}</label>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/blog">Blog</NavLink>
      </nav>
    </>
  );
};

export default NavigationBar;
