import React from "react";
import { Link } from "react-router-dom";
import AxiosAPI from "../../components/AxiosAPI";

class Lifestyle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    AxiosAPI.get("/api/articles/lifestyle").then(res => {
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
            src={"https://i.imgur.com/6Y7sJ4g.png"}
          />
        </section>
        <main className="grid">
          {this.state.articles.map(article => {
            return (
              <div key={article._id}>
                <h3 className="u-center-text">{article.title}</h3>
                <Link
                  className="article-link"
                  to={`/api/articles/${article.slug}`}
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
