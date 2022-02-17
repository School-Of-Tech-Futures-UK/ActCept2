import './App.css';
import NavigationBar from "./components/nav";
// import BrowserRouter from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import Home from './components/home';
import Review from './components/review';

const { BrowserRouter, Route, Routes } = reactRouterDom;

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/events" element={<Home />} />
        <Route path="/" element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
