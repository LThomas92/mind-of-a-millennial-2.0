import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class AllArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    axios.get("/articles").then(res => {
      this.setState({
        articles: res.data
      });
    });
  }

  render() {
    document.title = "Mind of A Millennial | Home";
    return (
      <div className="container">
        <div>
          <section className="leading" />
        </div>
        <main className="grid">
          {this.state.articles.slice(-16).map(article => {
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

export default AllArticles;
