import React from "react";
import "../App.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo-box">
        <img
          src={"https://i.imgur.com/9z9yIye.png"}
          className="footer__logo"
          alt="Footer Logo"
        />
      </div>
      <div className="row">
        <div className="col-1-of-2">
          <div className="footer__navigation">
            <div className="footer__list">
              <Link to="/register" className="footer__item footer__link">
                Register
              </Link>
              <Link to="/about-us" className="footer__item footer__link">
                About Us
              </Link>
              <Link to="/privacy-policy" className="footer__item footer__link">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="col-1-of-2">
          <a
            href="https://www.instagram.com/mindofamillennial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className=" fa fa-instagram fa-3x footer__link sm-links " />
          </a>
          <a
            href="https://www.twitter.com/mofmillennial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className=" fa fa-twitter fa-3x footer__link sm-links " />
          </a>
        </div>
        <p className="footer__copyright">
          © COPYRIGHT 2019 | All rights resereved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
