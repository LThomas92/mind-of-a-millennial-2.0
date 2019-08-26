import React from "react";
import { slide as Menu } from "react-burger-menu";

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/about-us">
        About
      </a>

      <a className="menu-item" href="/tv-movies">
        TV/Movies
      </a>

      <a className="menu-item" href="/sports">
        Sports
      </a>

      <a className="menu-item" href="/music">
        Music
      </a>

      <a className="menu-item" href="/lifestyle">
        Lifestyle
      </a>

      <a className="menu-item" href="/misc">
        Misc.
      </a>

      <a className="menu-item" href="/register">
        Register
      </a>

      <a className="menu-item" href="/login">
        Login
      </a>
    </Menu>
  );
};
