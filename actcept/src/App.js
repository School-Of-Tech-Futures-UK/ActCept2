import './App.css';
import NavigationBar from "./components/nav";
// import BrowserRouter from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import Home from './components/home';
import Review from './components/review';
import Event from './components/event';

const { BrowserRouter, Route, Routes } = reactRouterDom;

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/events" element={<Event />} />
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
