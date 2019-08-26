import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../actions/authActions";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...props }) => {
  return (
    <Route
      {...props}
      render={innerProps =>
        auth.isAuthenticated ? (
          <Component {...innerProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser }
)(PrivateRoute);
