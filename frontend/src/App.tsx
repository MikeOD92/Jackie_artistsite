import { Routes, Route } from "react-router-dom";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import Header from "./components/Header";
import CV from "./pages/CV";
import About from "./pages/About";
import Login from "./pages/Login";
import ArtworkDetail from "./pages/ArtworkDetail";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <main>
          <Header />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/cv"} element={<CV />} />
            <Route path={"/about"} element={<About />} />
            <Route path={"/:id"} element={<ArtworkDetail />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </main>
      </div>
    </Provider>
  );
}

export default App;
