import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Misc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    axios.get("/api/articles/misc").then(res => {
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
            src={process.env.PUBLIC_URL + "MoM-Misc-Banner@2x.png"}
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

export default Misc;
