import React from "react";
import misc from "../../img/misc.png";
import { Link } from "react-router-dom";
import AxiosAPI from "../../components/AxiosAPI";

class Misc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    AxiosAPI.get("/api/articles/misc").then(res => {
      this.setState({
        articles: res.data
      });
    });
  }

  render() {
    document.title = "Mind of A Millennial | Misc.";
    return (
      <div className="container">
        <section>
          <img
            src={misc}
            alt="Misc. Banner Created by @_law92"
            className="banner-image"
          />
        </section>
        <main className="grid">
          {this.state.articles.map(article => {
            return (
              <div key={article._id}>
                <h3 className="u-center-text">{article.title}</h3>
                <Link
                  className="article-link"
                  to={`/api/articles/show/${article.slug}`}
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

export default Misc;
