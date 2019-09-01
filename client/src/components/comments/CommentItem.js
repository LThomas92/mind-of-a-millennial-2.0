import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../actions/articleActions";

class CommentItem extends Component {
  onDeleteClick(articleId, commentId) {
    this.props.deleteComment(articleId, commentId);
  }

  render() {
    const { comment, articleId, auth } = this.props;

    return (
      <div className="container">
        <div className="row">
          <br />
          <p className="u-center-text">{comment.name}</p>
        </div>
        <div>
          <p>{comment.text}</p>
          {comment.user === auth.user.id ? (
            <button
              onClick={this.onDeleteClick.bind(this, articleId, comment._id)}
              type="button"
              className="button2 button2--delete"
            >
              Delete Comment
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  articleId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
