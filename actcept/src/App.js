import './App.css';
import NavigationBar from "./components/nav";
import RoutesBar from "./components/route";
// import BrowserRouter from "react-router-dom";
import * as reactRouterDom from "react-router-dom";

const {BrowserRouter} = reactRouterDom;

function App() {
  return (
    <BrowserRouter>
    <NavigationBar />
    <RoutesBar />
  </BrowserRouter>
  );
}

export default App;
