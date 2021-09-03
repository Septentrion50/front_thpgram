import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost, getComments } from "redux/actions/postActions";

const Post = () => {
  const { postId } = useParams();

  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.currentPost) || {};
  const comments = useSelector((state) => state.posts.comments)|| [];
  const [fetchOnce, setFetchOnce] = useState(false);

  useEffect(() => {
    if (!fetchOnce) {
      dispatch(getPost(postId));
      dispatch(getComments(post.id));
      setFetchOnce(true);
    }
  }, [fetchOnce, postId, dispatch]);

  return (
    <>
      {post ? (
        <>
        <div className="post">
          {post.image_path && <img src={post.image_path} alt={post.title} />}
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
        <div className="comments">
          <h2>Comments</h2>
          {comments === [] ? (
            comments.map(comment => (
              <div className="comment">
                <h3>{comment.user}</h3>
                <p>{comment.content}</p>
              </div>
            ))
          ) : (
            <h2>No comments yet</h2>
          )}
        </div>
        </>
      ) : (
        <h1>Post not found</h1>
      )}
    </>
  );
};

export default Post;
