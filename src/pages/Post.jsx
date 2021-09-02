import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "redux/actions/postActions";

const Post = ({ posts }) => {
  const { postId } = useParams();
  const [currentPost, setCurrentPost] = useState({});

  const dispatch = useDispatch();
  const post = useSelector(state => state.posts.currentPost)

  useEffect(() => {
    dispatch(getPost(postId));
    setCurrentPost(post)
  }, [post, postId, dispatch]);

  return (
    <>
      {currentPost ? (
        <div className="post">
          {currentPost.image_path && (
            <img src={currentPost.image_path} alt={currentPost.title} />
          )}
          <h1>{currentPost.title}</h1>
          <p>{currentPost.content}</p>
        </div>
      ) : (
        <h1>Post not found</h1>
      )}
    </>
  );
};

export default Post;
