import React from "react";
import { Link } from "react-router-dom";
import AxiosAPI from "../AxiosAPI";

class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    AxiosAPI.get("/api/articles/music").then(res => {
      this.setState({
        articles: res.data
      });
    });
  }

  render() {
    document.title = "Mind of A Millennial | Music";
    return (
      <div className="container">
        <section>
          <img
            alt="Music Header Created by @_law92"
            className="banner-image"
            src={process.env.PUBLIC_URL + "MoM-Music-Banner@2x.png"}
          />
        </section>
        <main className="grid">
          {this.state.articles.map(article => {
            return (
              <div key={article._id}>
                <h3 className="u-center-text">{article.title}</h3>
                <Link
                  className="article-link"
                  to={`/api/articles/show/${article._id}`}
                >
                  <img className="article-img" alt="" src={article.image} />
                </Link>
              </div>
            );
          })}
        </main>
      </div>
    );
  }
}

export default Music;
