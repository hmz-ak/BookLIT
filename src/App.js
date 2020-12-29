import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import SingleNovel from "./components/readers_club/stories/SingleNovel";
import SingleChapter from "./components/readers_club/chapters/SingleChapter";
import NewStory from "./components/readers_club/stories/NewStory";
import NewChapter from "./components/readers_club/chapters/NewChapter";
import Genre from "./components/readers_club/genres/Genre";
import GenreSpecificStory from "./components/readers_club/genres/GenreSpecificStory";
import Library from "./components/readers_club/libraries/Library";
import UpdateStory from "./components/readers_club/stories/UpdateStory";

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />

        <NavBar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/genre/:name" component={GenreSpecificStory} />
          <Route path="/novels/update/:id" exact component={UpdateStory} />

          <Route path="/novels/:id" component={SingleNovel} />
          <Route path="/chapter/:id" component={SingleChapter} />
          <Route path="/new/chapter/:id" component={NewChapter} />
          <Route path="/register" component={Register} />
          <Route path="/library" component={Library} />
          <Route path="/genre" component={Genre} />
          <Route path="/newstory" component={NewStory} />
          <Route path="/" exact component={LandingPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
