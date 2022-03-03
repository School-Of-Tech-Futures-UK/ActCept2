import './App.css';
import './custom.css';
import NavigationBar from "./Components/nav";
// import BrowserRouter from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import Home from './Components/home';
import Review from './Components/review';
import EventPage from './Components/event_page';
import UserDetails from './Components/signup';

const { BrowserRouter, Route, Routes } = reactRouterDom;

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews/:id" element={<Review />} />
        <Route path="/event-page/:id" element={<EventPage />} />
        <Route path="/signup/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
