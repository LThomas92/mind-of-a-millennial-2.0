import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllArticles } from "../../actions/articleActions";

class AllArticles extends React.Component {
  componentDidMount() {
    this.props.getAllArticles(this.props.match.params.id);
  }

  render() {
    document.title = "Mind of A Millennial | Home";

    const { articles } = this.props.articles;
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

const mapStateToProps = state => ({
  articles: state.articles
});

export default connect(
  mapStateToProps,
  { getAllArticles }
)(AllArticles);
