import { useSelector, useDispatch } from "react-redux";
import { initializeComments, makeComment } from "../reducers/commentsReducer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Comments = () => {
  const [comment, setComment] = useState("");
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(initializeComments(id));
  }, []);

  const addComment = (e) => {
    e.preventDefault();
    console.log("comment:", comment);
    dispatch(makeComment(comment, id));
    setComment("");
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
