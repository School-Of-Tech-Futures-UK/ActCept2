import './App.css';
import './custom.css';
import NavigationBar from "./Components/nav";
// import BrowserRouter from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import Home from './Components/home';
import Review from './Components/review';
import EventPage from './Components/event_page';
import UserDetails from './Components/signup';
import Footer from "./Components/footer"
import MyEventPage from './Components/my_event';

const { BrowserRouter, Route, Routes } = reactRouterDom;

function App() {
  return (<>
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews/:id" element={<Review />} />
        <Route path="/event-page/:id" element={<EventPage />} />
        <Route path="/signup/:id" element={<UserDetails />} />
        <Route path="/my-events" element={<MyEventPage />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </>);
}

export default App;
