import { createContext, useState } from "react";
import PropTypes from "prop-types";
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
    setLikes("");
  };
  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          author:
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url:
          <input value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div>
          likes:
          <input value={likes} onChange={(e) => setLikes(e.target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
