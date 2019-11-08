import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends React.Component {
  constructor() {
    super();
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChangeEmail = event => {
    this.setState({
      email: event.target.value
    });
  };

  onChangePassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    document.title = " Login To Your Account | Mind of A Millennial";

    return (
      <section className="section-form">
        <div className="form-container">
          <div className="login">
            <h2 className="heading-secondary u-center-text">Log In</h2>
            <hr className="article-line" />
            <div className="login__form">
              <form className="form" noValidate onSubmit={this.onSubmit}>
                <div className="form__group">
                  <label className="form__label">Email</label>
                  <div className="inputWithIcon">
                    <i className="fa fa-envelope icon" />
                    <input
                      className="form__input"
                      onChange={this.onChangeEmail}
                      value={this.state.email}
                      error={errors.email}
                      type="email"
                    />
                  </div>
                </div>
                <div className="form__group">
                  <label className="form__label">Password</label>
                  <div className="inputWithIcon">
                    <i className="fa fa-lock icon" />
                    <input
                      className="form__input"
                      onChange={this.onChangePassword}
                      value={this.state.password}
                      error={errors.password}
                      type="password"
                    />
                  </div>
                </div>
                <button className="submit-btn">Login</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
