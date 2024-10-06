import { createContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");

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
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>TITLE</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>AUTHOR</Form.Label>
          <Form.Control
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL</Form.Label>
          <Form.Control value={url} onChange={(e) => setUrl(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>LIKES</Form.Label>
          <Form.Control
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
          />
        </Form.Group>
        <Button>CREATE</Button>
      </Form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
