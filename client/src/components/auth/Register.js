import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends React.Component {
  constructor() {
    super();

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.onChangeWriterCode = this.onChangeWriterCode.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      writerCode: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value
    });
  };

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

  onChangePassword2 = event => {
    this.setState({
      password2: event.target.value
    });
  };

  onChangeWriterCode = event => {
    this.setState({
      writerCode: event.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      writerCode: this.state.writerCode
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    document.title = "Mind of A Millennial | Register A New Account";

    return (
      <section className="section-form">
        <div className="form-container">
          <div className="login">
            <h3 className="heading-secondary u-center-text">
              Create An Account
            </h3>
            <hr className="article-line" />
            <div className="login__form">
              <form className="form" noValidate onSubmit={this.onSubmit}>
                <div className="form__group">
                  <label className="form__label">Username</label>
                  <div className="inputWithIcon">
                    <i className="fa fa-user icon" />
                    <input
                      placeholder="Enter a Username"
                      className="form__input"
                      onChange={this.onChangeUsername}
                      value={this.state.username}
                      errors={errors.name}
                      type="text"
                    />
                  </div>
                </div>
                <div className="form__group">
                  <label className="form__label">Email</label>
                  <div className="inputWithIcon">
                    <i className="fa fa-envelope icon" />
                    <input
                      placeholder="Enter an Email Address"
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
                      placeholder="Enter a Password"
                      className="form__input"
                      onChange={this.onChangePassword}
                      value={this.state.password}
                      error={errors.password}
                      type="password"
                    />
                  </div>
                </div>
                <div className="form__group">
                  <label className="form__label">Confirm Password</label>
                  <div className="inputWithIcon">
                    <i className="fa fa-lock icon" />
                    <input
                      className="form__input"
                      onChange={this.onChangePassword2}
                      value={this.state.password2}
                      error={errors.password2}
                      type="password"
                    />
                  </div>
                </div>
                <div className="form__group">
                  <label className="form__label">Writer Code [OPTIONAL]</label>
                  <div className="inputWithIcon">
                    <i className="fa fa-pencil" />
                    <input
                      className="form__input"
                      onChange={this.onChangeWriterCode}
                      value={this.state.writerCode}
                      type="password"
                    />
                  </div>
                </div>
                <button className="submit-btn" type="submit">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
