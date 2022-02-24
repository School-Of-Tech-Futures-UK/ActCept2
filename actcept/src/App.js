import './App.css';
import NavigationBar from "./Components/nav";
// import BrowserRouter from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import Home from './Components/home';
import Review from './Components/review';
import Event from './Components/event_page';

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
