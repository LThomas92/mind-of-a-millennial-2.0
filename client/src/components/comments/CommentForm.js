import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../actions/articleActions";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { articleId } = this.props;

    const newComment = {
      text: this.state.text,
      username: user.username
    };

    this.props.addComment(articleId, newComment);
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <h4>Post A Comment</h4>
        <div className="form-container">
          <form onSubmit={this.onSubmit}>
            <div className="form__group">
              <textarea
                rows="40"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Post Comment
            </button>
          </form>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  articleId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
