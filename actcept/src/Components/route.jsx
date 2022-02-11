import {Route, Routes} from "react-router-dom";

const RoutesBar = () => (
  <Routes>
    <Route path="/about" render={() => (<h1>About</h1>)} />
    <Route path="/blog" render={() => (<h1>Blog</h1>)} />
    <Route path="/" render={() => (<h1>Home</h1>)} />
  </Routes>
);

export default RoutesBar;