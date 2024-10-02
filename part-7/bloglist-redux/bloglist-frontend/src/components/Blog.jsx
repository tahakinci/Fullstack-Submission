import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLikes, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [visibilty, setVisibility] = useState(false);

  const toggleVisibility = { display: visibilty ? "" : "none" };
  const buttonLabel = visibilty ? "hide" : "view";

  return (
    <div style={blogStyle}>
      <div>
        <h3>{blog.title}</h3>
        <button onClick={() => setVisibility(!visibilty)}>{buttonLabel}</button>
      </div>
      <div style={toggleVisibility} className="detailDiv">
        <p>{blog.url}</p>
        <div>
          likes {blog.likes}
          <button onClick={() => handleLikes(blog.id)}>like</button>
        </div>
        <p>{blog.author}</p>
        <button onClick={() => handleDelete(blog.id)}>remove</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  handleLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
