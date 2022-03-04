// import * as React from "https://cdn.skypack.dev/react@17.0.1";
// import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import { NavLink, useLocation } from "react-router-dom";



const NavigationBar = () => {
  // For illustration
  //const { pathname } = useLocation();
  

  return (
    // <label>{pathname}</label>
    <>
      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/"><b> ActCept </b>| Part of GigStr</a>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
