import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { editArticle, getArticle } from "../../actions/articleActions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import isEmpty from "../../validation/is-empty";

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      imgSource: "",
      image: "",
      text: "",
      category: "",
      errors: {}
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeImgSource = this.onChangeImgSource.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getArticle();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.article) {
      const article = nextProps.article;

      console.log(article);

      // if article field doesnt exist, make field empty string
      article.title = !isEmpty(article.title) ? article.title : "";
      article.imgSource = !isEmpty(article.imgSource) ? article.imgSource : "";
      article.category = !isEmpty(article.category) ? article.category : "";
      article.image = !isEmpty(article.image) ? article.image : "";
      article.text = !isEmpty(article.text) ? article.text : "";

      // set component fields state
      this.setState({
        title: article.title,
        imgSource: article.imgSource,
        category: article.category,
        image: article.image,
        text: article.text
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const editArticle = {
      title: this.state.title,
      imgSource: this.state.imgSource,
      category: this.state.category,
      image: this.state.image,
      text: this.state.title
    };

    const id = this.props.match.params.id;

    this.props.editArticle(editArticle, id, this.props.history);
  };

  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  onChangeImgSource = e => {
    this.setState({ imgSource: e.target.value });
  };

  onChangeImage = e => {
    this.setState({ image: e.target.files[0] });
  };

  handleChange = value => {
    this.setState({ text: value });
  };
  onChangeCategory = e => {
    this.setState({ category: e.target.value });
  };

  render() {
    document.title = "Mind of A Millennial | Edit Article";
    const { errors } = this.state;
    return (
      <div className="form-container">
        <div className="login">
          <h3 className="heading-secondary u-center-text">Edit Article</h3>
          <hr className="article-line" />
          <form
            className="form"
            onSubmit={this.onSubmit}
            encType="multipart/form-data"
          >
            <label className="form__label">Article Title</label>
            <div className="form__group">
              <div className="inputWithIcon">
                <i className="fa fa-pencil icon" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Enter Article Title"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  error={errors.title}
                  className="form__input"
                />
              </div>
            </div>
            <div className="form__group">
              <label className="form__label">Upload Image</label>
              <input type="file" onChange={this.onChangeImage} />
            </div>
            <div className="form__group">
              <label className="form__label">Image Source</label>
              <div className="inputWithIcon">
                <i className="fa fa-pencil icon" />
                <input
                  type="text"
                  placeholder="Enter Image Source"
                  value={this.state.imgSource}
                  onChange={this.onChangeImgSource}
                  error={errors.image}
                  className="form__input"
                />
              </div>
            </div>
            <label className="form__label">Article Category</label>

            <div className="form__group">
              <div className="inputWithIcon">
                <i className="fa fa-pencil icon" />
                <input
                  type="text"
                  placeholder="Enter Article Category"
                  className="form__input"
                  onChange={this.onChangeCategory}
                  value={this.state.category}
                  error={errors.category}
                />
              </div>
            </div>
            <div className="form__group">
              <label className="form__label">Content</label>
              <ReactQuill
                value={this.state.text}
                error={errors.text}
                onChange={this.handleChange}
                modules={EditForm.modules}
                formats={EditForm.formats}
              />
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

EditForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image", "video"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
EditForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video"
];

EditForm.propTypes = {
  editArticle: PropTypes.func.isRequired,
  getArticle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  article: state.article,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editArticle, getArticle }
)(withRouter(EditForm));
