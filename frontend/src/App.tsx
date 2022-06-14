// import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { store } from "./redux";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import Header from "./components/Header";
import CV from "./pages/CV";
import About from "./pages/About";
import Login from "./pages/Login";
import ArtworkDetail from "./pages/ArtworkDetail";
import NewArtwork from "./pages/NewArtwork";
import EditArtwork from "./pages/EditArtwork";
import UserPage from "./pages/UserPage";
function App() {
  // const [cursor, setCursor] = useState<string>("");

  // useEffect(() => {
  //   let num = Math.floor(Math.random() * 3);
  //   switch (num) {
  //     case 1:
  //       setCursor("floral");
  //       break;
  //     case 2:
  //       setCursor("zshape");
  //       break;
  //     default:
  //       setCursor("flame");
  //       break;
  //   }
  // }, []);

  return (
    <Provider store={store}>
      <div className={`App`}>
        <main>
          <Header />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/cv"} element={<CV />} />
            <Route path={"/about"} element={<About />} />
            <Route path={"/:id"} element={<ArtworkDetail />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/add-work"} element={<NewArtwork />} />
            <Route path={"edit/:id"} element={<EditArtwork />} />
            <Route path={"user"} element={<UserPage />} />
          </Routes>
        </main>
      </div>
    </Provider>
  );
}

export default App;
