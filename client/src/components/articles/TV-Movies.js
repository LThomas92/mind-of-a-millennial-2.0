import React from "react";
import tvmovies from "../../img/tvmovies.png";
import { Link } from "react-router-dom";
import AxiosAPI from "../../components/AxiosAPI";

class TVMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    AxiosAPI.get("/api/articles/tv-movies").then(res => {
      this.setState({
        articles: res.data
      });
    });
  }

  render() {
    document.title = "Mind of A Millennial | TV-Movies";
    return (
      <div className="container">
        <section>
          <img
            alt="TV-Movies Header Created by @_law92"
            className="banner-image"
            src={tvmovies}
          />
        </section>
        <main className="grid">
          {this.state.articles.slice(-16).map(article => {
            return (
              <div key={article._id}>
                <h3 className="u-center-text">{article.title}</h3>
                <Link
                  className="article-link"
                  to={`/api/articles/show/${article.slug}`}
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

export default TVMovies;
