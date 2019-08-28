import React from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

export default props => {
  return (
    <Menu>
      <Link className="menu-item" to="/">
        Home
      </Link>

      <Link className="menu-item" to="/about-us">
        About
      </Link>

      <Link className="menu-item" to="/articles/tv-movies">
        TV/Movies
      </Link>

      <Link className="menu-item" to="/articles/sports">
        Sports
      </Link>

      <Link className="menu-item" to="/articles/music">
        Music
      </Link>

      <Link className="menu-item" to="/articles/lifestyle">
        Lifestyle
      </Link>

      <Link className="menu-item" to="/articles/misc">
        Misc.
      </Link>

      <Link className="menu-item" to="/register">
        Register
      </Link>

      <Link className="menu-item" to="/login">
        Login
      </Link>
    </Menu>
  );
};
