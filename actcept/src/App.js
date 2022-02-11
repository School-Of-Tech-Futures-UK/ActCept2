import './App.css';
import NavigationBar from "./components/nav";
// import BrowserRouter from "react-router-dom";
import * as reactRouterDom from "react-router-dom";

const {BrowserRouter, Route, Routes} = reactRouterDom;

function App() {
  return (
    <BrowserRouter>
    <NavigationBar />
  <Routes>
    <Route path="/about" render={() => (<h1>About</h1>)} />
    <Route path="/blog" render={() => (<h1>Blog</h1>)} />
    <Route path="/" render={() => (<h1>Home</h1>)} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
