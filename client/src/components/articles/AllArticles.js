import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getArticles } from "../../actions/articleActions";

class AllArticles extends React.Component {
  componentDidMount() {
    this.props.getArticles();
  }

  render() {
    document.title = "Mind of A Millennial | Home";
    const { articles } = this.props;

    return (
      <div className="container">
        <div>
          <section className="leading" />
        </div>
        <main className="grid">
          {articles.slice(-16).map(article => {
            return (
              <div key={article._id}>
                <h3 className="u-center-text">{article.title}</h3>
                <Link
                  className="article-link"
                  to={`/api/articles/${article.slug}`}
                >
                  <img
                    className="article-img"
                    alt="Article Img"
                    src={article.image}
                  />
                </Link>
              </div>
            );
          })}
        </main>
      </div>
    );
  }
}

AllArticles.propTypes = {
  getArticles: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getArticles }
)(AllArticles);
