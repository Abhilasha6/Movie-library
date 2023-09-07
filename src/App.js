import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import SearchResults from './Components/SearchResults'; // Import the SearchResults component

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" component={SearchResults} />
      </Routes>
    </Router>
  );
}

export default App;
