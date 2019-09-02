import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/authActions";
import { getArticle, deleteArticle } from "../../actions/articleActions";
import moment from "moment";

class Show extends React.Component {
  componentDidMount() {
    this.props.getArticle(this.props.match.params.id);
  }

  onDeleteClick(id) {
    this.props.deleteArticle(id);
    this.props.history.push("/");
  }

  render() {
    document.title = "Mind of A Millennial";
    const { user } = this.props.auth;
    const { article } = this.props.article;

    const currentArticleAuthor = article.author
      ? article.author.username
      : null;

    return (
      <div className="article-container">
        <h2 className="article-header">{article.title}</h2>
        <img
          className="article-img article-img--show"
          alt="Main Article"
          src={article.image}
        />
        <div>
          <p className="submitted-at">
            Submitted on {moment(article.submittedAt).format("MM-DD-YYYY")}
          </p>

          <p>
            <cite className="img-source">{article.imgSource}</cite>
          </p>
          <p className="username">
            Written By: &nbsp;
            {article.author ? article.author.username : null}
          </p>

          <p className="category">#{article.category}</p>
        </div>
        <div className="article-content">
          <p dangerouslySetInnerHTML={{ __html: article.text }} />
        </div>

        {user.isWriter === true && currentArticleAuthor === user.username ? (
          <React.Fragment>
            <button
              onClick={this.onDeleteClick.bind(this, article._id)}
              type="button"
              className="button2 button2--delete"
            >
              Delete Article
            </button>
          </React.Fragment>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

Show.propTypes = {
  auth: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  getArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  article: state.article
});

export default connect(
  mapStateToProps,
  { setCurrentUser, deleteArticle, getArticle }
)(Show);
