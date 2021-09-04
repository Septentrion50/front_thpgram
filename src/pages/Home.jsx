import { Link } from 'react-router-dom';

const Home = ({ posts }) => {

  return (
    <div className="home">
      <h1>Home</h1>
      {posts.map(post => (
        <Link to={`/post/${post.id}`} key={post.id}>
          <h2>{post.title}</h2>
          {post.image_path && <img src={post.image_path} alt={post.title}/>}
        </Link>
      ))}
    </div>
  )
};

export default Home;