import { Route } from "react-router-dom";
import "./App.css";
import Home from "./views/Home/Home";
import LandingPage from "./views/LandingPage/LandingPage";
import { BrowserRouter } from "react-router-dom";
import GameCreation from "./components/GameCreation/GameCreation.jsx";
import Details from "./components/GameDetail/GameDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path={"/"} component={LandingPage} />
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/videogame"} component={GameCreation} />
        <Route exact path={"/videogames/:id"} component={Details} />
      </div>
    </BrowserRouter>
  );
}

export default App;
