import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Lifestyle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    axios.get("/api/articles/lifestyle").then(res => {
      this.setState({
        articles: res.data
      });
    });
  }

  render() {
    document.title = "Mind of A Millennial | Lifestyle";
    return (
      <div className="container">
        <section>
          <img
            className="banner-image"
            alt="Lifestyle Banner Created By @law92"
            src={process.env.PUBLIC_URL + "MoM-Lifestyle-Banner@2x.png"}
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
                  <img
                    className="article-img"
                    alt="Lifestyle Article-Img"
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

export default Lifestyle;
