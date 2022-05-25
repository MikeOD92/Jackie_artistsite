import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import CV from "./pages/CV";
import About from "./pages/About";

import ArtworkDetail from "./pages/ArtworkDetail";

function App() {
  return (
    <div className="App">
      <main>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/cv"} element={<CV />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/:id"} element={<ArtworkDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
