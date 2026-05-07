import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/App.css";
import Nav from "./components/Nav.jsx";
import Login from "./components/Login.jsx";
import HomePage from "./pages/HomePage.jsx";
import AlbumPage from "./pages/AlbumPage.jsx";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <div className="app">
      <Router>
        {user ? (
          <>
            <Nav />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/album/:albumName" element={<AlbumPage />} />
            </Routes>
          </>
        ) : (
          <Login />
        )}
      </Router>
    </div>
  );
}

export default App;
