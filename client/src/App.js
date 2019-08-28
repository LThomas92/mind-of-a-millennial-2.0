import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/PrivateRoute";
import SideBar from "../src/components/Sidebar";
import PrivacyPolicy from "../src/components/PrivayPolicy";
import ArticleForm from "../src/components/articles/ArticleForm";
import AllArticles from "../src/components/articles/AllArticles";
import SportsArticles from "../src/components/articles/Sports";
import TVMovies from "../src/components/articles/TV-Movies";
import Music from "../src/components/articles/Music";
import Lifestyle from "../src/components/articles/Lifestyle";
import Misc from "../src/components/articles/Misc";
import Header from "./components/Header";
import Footer from "../src/components/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AboutUs from "../src/components/AboutUs";
import Show from "../src/components/articles/Show";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div id="page-wrap">
            <SideBar />
            <Header />
            <Route path="/api/articles" exact component={AllArticles} />
            <Route
              path="/api/articles/sports"
              exact
              component={SportsArticles}
            />
            <Route path="/api/articles/tv-movies" exact component={TVMovies} />
            <Route path="/api/articles/music" exact component={Music} />
            <Route path="/api/articles/lifestyle" exact component={Lifestyle} />
            <Route path="/api/articles/misc" exact component={Misc} />
            <Route path="/privacy-policy" exact component={PrivacyPolicy} />
            <Route path="/api/articles/:id" exact component={Show} />
            <Switch>
              <PrivateRoute
                path="/api/articles/add"
                exact
                component={ArticleForm}
              />
            </Switch>
            <Route path="/about-us" exact component={AboutUs} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
