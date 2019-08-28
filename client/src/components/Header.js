import React from "react";
import PropTypes from "prop-types";
import "../App.scss";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../actions/authActions";
import { logoutUser } from "../actions/authActions";
import logo from "../logo.svg";

class Header extends React.Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const addArticleButton = (
      <Link to="api/articles/add" className="btn btn--white">
        Add New Article
      </Link>
    );

    return (
      <div className="header">
        <div className="header__logo-box">
          <Link to="/">
            <img src={logo} className="header__logo" alt="Logo" />
          </Link>
        </div>
        {isAuthenticated ? (
          <React.Fragment>
            <div className="login-status">
              <p className="login-status__text">
                Signed In As: {user.username}
              </p>
              <button className="submit-btn" onClick={this.onLogoutClick}>
                Logout
              </button>
            </div>
          </React.Fragment>
        ) : (
          <div />
        )}
        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">Mind of A Millennial</span>
            <span className="heading-primary--sub">
              The People's Opinion on The Culture
            </span>
          </h1>
          <div>{user.isWriter === true ? addArticleButton : <div />}</div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser, logoutUser }
)(withRouter(Header));
