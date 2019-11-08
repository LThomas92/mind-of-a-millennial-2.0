import React from "react";
import lifestyle from "../../img/lifestyle.png";
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
    document.title = "Lifestyle | Mind of A Millennial";
    return (
      <div className="container">
        <section>
          <img
            className="banner-image"
            alt="Lifestyle Banner Created By @law92"
            src={lifestyle}
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
