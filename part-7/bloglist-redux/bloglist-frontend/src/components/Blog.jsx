import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleVote, removeBlog } from "../reducers/blogsReducer";
import Comments from "./Comments";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs).find(
    (blog) => blog.id === id
  );

  const handleLikes = () => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      console.log(updatedBlog);
      dispatch(handleVote(id, updatedBlog));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Do you really want to leave?")) {
        dispatch(removeBlog(id));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <div>
        <h3>{blog.title}</h3>
      </div>
      <div className="detailDiv">
        <p>{blog.url}</p>
        <div>
          likes {blog.likes}
          <button onClick={() => handleLikes(id)}>like</button>
        </div>
        <p>{blog.author}</p>
        <button onClick={() => handleDelete(id)}>remove</button>
      </div>
      <Comments />
    </div>
  );
};

export default Blog;
