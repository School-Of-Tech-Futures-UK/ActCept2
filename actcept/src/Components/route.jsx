import {Route, Routes} from "react-router-dom";

const RoutesBar = () => (
  <Routes>
    <Route path="/about">
      <h1>About</h1>
    </Route>
    <Route path="/blog">
      <h1>Blog</h1>
    </Route>
    <Route path="/">
      <h1>Home</h1>
    </Route>
  </Routes>
);

export default RoutesBar;