import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addArticle } from "../../actions/articleActions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class ArticleForm extends React.Component {
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


  componentWillReceiveProps(newProps) {
    if (newProps) {
      this.setState({ errors: newProps.errors });
    }
  }

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

  onSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("image", this.state.image);
    formData.append("imgSource", this.state.imgSource);
    formData.append("text", this.state.text);
    formData.append("category", this.state.category);

    this.props.addArticle(formData);
    this.setState({
      title: "",
      imgSource: "",
      image: "",
      text: "",
      category: ""
    });
  }

  render() {
    document.title = "Mind of A Millennial | Add A New Article";
    const { errors } = this.state;
    return (
      <div className="form-container">
        <div className="login">
          <h3 className="heading-secondary u-center-text">
            Create A New Article
          </h3>
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
                <i className="fa fa-pencil icon" aria-hidden="true" />
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
                <i className="fa fa-pencil icon" aria-hidden="true" />
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
                modules={ArticleForm.modules}
                formats={ArticleForm.formats}
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

ArticleForm.modules = {
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
ArticleForm.formats = [
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

ArticleForm.propTypes = {
  addArticle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addArticle }
)(ArticleForm);
